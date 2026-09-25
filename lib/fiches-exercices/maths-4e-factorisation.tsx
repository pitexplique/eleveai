// ─── Fiche d'exercices : la factorisation (4e) — 20 exercices corrigés ────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-factorisation.tsx` et sur
// les cinq micros du coach de 4e (notionId litteral_factorisation). Le fil du
// cours : factoriser, c'est DÉVELOPPER À L'ENVERS — d'une somme vers un
// produit —, le facteur commun divise TOUS les termes (un nombre, une lettre,
// le « 1 » caché), et une factorisation se VÉRIFIE en développant.
// ⛔⛔ FRÉDÉRIC, 25/09 : EN 4e, LES IDENTITÉS REMARQUABLES NE SONT PAS DES
// FORMULES À APPLIQUER. « (x + 2)² = (x + 2)(x + 2), puis on distribue. » Aucune
// factorisation par une identité « lue à l'envers », aucun (a + b)², a² − b² ou
// 2ab écrit comme règle dans le texte élève (le script le refuse). La micro
// `litteral_factoriser_identite` est traitée SANS formule (ex. 6, 11, 18) : je
// DÉVELOPPE (x − 3)(x + 3) par double distributivité, je constate x² − 9, et
// j'en DÉDUIS une écriture factorisée de x² − 9 ; le rectangle découpé montre les
// deux bandes qui s'annulent.
// ⛔ On reste sur la factorisation : développer (la distributivité) a sa propre
// feuille. Pas de facteur commun entre parenthèses, pas d'équation produit
// nul : c'est la 3e.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 3x + 12, 6x + 9,
// x² + 5x, 5x − 20, 7x + 21, 2x² + 6x, ni x² + 6x + 9, x² − 8x + 16, x² − 25,
// x² − 49, x² − 1, ni 4x + 12 = 4(x + 3), 3x + 15, 5x + 20, ni 17 × 25 + 3 × 25.
// ⛔ Ni ceux de la feuille de 3e : 8x + 20, 9x² − 15x, x² + x, 4x² − 9, 49 − x²,
// 10x + 25, x² − 36, x² − 81.
//
// ⭐⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : LE RECTANGLE DESSINÉ.
// Aire = longueur × largeur : une somme est l'aire d'un rectangle découpé en
// morceaux, un par terme ; la factoriser, c'est lire ses deux CÔTÉS sur les
// bords. (x + 4)(x + 4) est un carré découpé en quatre, (x − 3)(x + 3) un
// rectangle où deux bandes s'annulent : c'est le DESSIN qui explique, pas une
// formule. Les contrôles « je développe » sont posés dans un tableau
// (proposition, développement, verdict), les programmes et les essais dans un
// `tableau()`.
// 20 corrigés dessinés sur 20.
//
// Les pièges nommés : le premier facteur venu au lieu du plus grand (1, 3, 9,
// 12), le second terme non divisé (2, 5, 13, 14, 19), le « 1 » qui disparaît
// quand un terme EST le facteur commun (4, 8, 13, 16), le signe dans la
// parenthèse quand le facteur est négatif (7), la lettre prise pour commune
// alors qu'un terme ne l'a pas (10, 12), x² − 9 pris pour (x − 3)(x − 3) (6),
// les deux bandes oubliées de (x + 4)(x + 4) (11), « vérifier » en relisant au
// lieu de développer (5), des essais qui ne prouvent rien (15), une bande
// oubliée (17), le coin du carré oublié (18), le coin pris pour tout (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - terrain de handball : 40 m sur 20 m, zone de sécurité d'au moins 1 m le
//   long des lignes de touche (IHF, Règles du jeu, règle 1:1) — ex. 17 ; le
//   gymnase de 960 m² est imaginé ;
// - le potager et sa bande fleurie, la parcelle replantée après une tempête,
//   l'étang et sa roselière sont IMAGINÉS, à des tailles vraisemblables —
//   ex. 18, 19 et 20.
//
// Les corrigés sont écrits à la première personne (« je repère »), comme les
// autres feuilles.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-factorisation-4e.mjs` —
// chaque forme est lue telle qu'elle est écrite et comparée à l'expression de
// départ en neuf valeurs de x ; chaque case des rectangles dessinés est relue et
// recalculée comme « côté × côté », les longueurs dessinées respectent l'ordre
// des nombres, et chaque tableau est rejoué.
//
// Micro-compétences : litteral_facteur_commun (1, 3, 7, 8, 9, 10, 12, 17, 20),
// litteral_factoriser_simple (2, 3, 4, 7, 10, 14, 15, 16, 17, 18, 19, 20),
// litteral_factoriser_identite (6, 11, 18 — par développement, sans formule),
// litteral_factoriser_verifier (4, 5, 6, 9, 11, 12, 13, 14, 18, 19),
// litteral_factorisation_defi (8, 9, 12, 13, 15, 16, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { tableau } from "@/lib/fiches-exercices/figures";

// ⭐ LE RECTANGLE DÉCOUPÉ (repris de la feuille de 3e, `maths-3e-calcul-litteral`).
// `haut` = les morceaux du côté du haut (étiquette, longueur dessinée), `cote` =
// ceux du côté gauche, `cases` = l'aire de chaque morceau, ligne par ligne. Un
// carré (même étiquette en ligne et en colonne) en bleu, un morceau négatif en
// rose, les autres en orange. Texte NU (x², pas `$`).
// ⛔ LISIBLE À 375 PX : le dessin garde au moins 16,5rem de large (il défile
// plutôt que de rétrécir) et son viewBox ne dépasse pas 300 : le texte, écrit en
// 13, reste au-dessus de 11 px effectifs. Le script le contrôle.
// ⛔ Le script de recalcul relit l'appel `aires(…)` : l'écrire sur UNE ligne, en
// tableaux JSON ; chaque case doit valoir « ligne × colonne », et un nombre plus
// grand est dessiné plus long.
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
    <div className="mx-auto w-full max-w-[18rem] overflow-x-auto print:max-w-[13rem] print:overflow-visible">
      <svg
        viewBox={`0 0 ${G + W + 6} ${T + H + 6}`}
        role="img"
        aria-label={`Rectangle de côtés ${haut.map((h) => h[0]).join(" + ")} et ${cote.map((c) => c[0]).join(" + ")}, découpé en morceaux d'aires ${cases.flat().join(", ")}`}
        className="w-full min-w-[16.5rem] print:min-w-0"
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
              <text x={xs[j] + w / 2} y={ys[i] + h / 2 + 4} textAnchor="middle" fontSize={13} fill="#0f172a">
                {cases[i][j]}
              </text>
            </g>
          )),
        )}
      </svg>
    </div>
  );
};

// ⭐ LE CONTRÔLE POSÉ : une ligne par factorisation proposée, le développement
// du produit, et le verdict. C'est la règle d'or du cours, « on vérifie
// toujours en développant », mise en tableau. Texte NU, sans `$`.
// ⛔ Le script relit l'appel `controle(…)` : UNE ligne, en tableaux JSON.
const controle = (lignes: [string, string, string][]) => (
  <div className="mx-auto w-full max-w-[24rem] print:max-w-[16rem]">
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        headers: ["la factorisation proposée", "je développe", "verdict"],
        rows: lignes.map((l) => ({ values: l })),
        display: { compact: true, striped: true },
      }}
    />
  </div>
);

/** Deux dessins côte à côte (exercice 14) : l'un sous l'autre sur téléphone,
 *  côte à côte à partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

export const exercicesFactorisation4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "litteral-factorisation",
  titre: "La factorisation",
  accroche:
    "Vingt exercices, du geste seul au problème : trouver le plus grand facteur commun, factoriser par un nombre, par une lettre, faire apparaître le « 1 » caché, mettre en facteur un nombre négatif, trouver un produit en développant deux parenthèses, et toujours vérifier en développant. Puis un terrain de handball, un potager, une forêt replantée, un étang. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi, le piège nommé, et le rectangle dessiné dont l'aire est ta somme et les côtés ton produit.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/litteral-factorisation", titre: "La factorisation" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je vérifie chaque réponse en développant.",
      rappel: [
        "Factoriser, c'est transformer une SOMME en PRODUIT : $ka + kb = k(a + b)$. C'est le développement lu à l'envers.",
        "Le facteur commun divise TOUS les termes, et je prends le plus grand : un nombre, une lettre, ou les deux. Puis je divise chaque terme par lui.",
        "Quand un terme EST le facteur commun, il reste $1$ : $3x + 3 = 3 \\times x + 3 \\times 1 = 3(x + 1)$.",
        "Je vérifie TOUJOURS en développant le produit. Avec deux parenthèses, chaque terme de la première multiplie chaque terme de la seconde.",
      ],
      exercices: [
        {
          enonce:
            "Pour chaque expression, trouver le PLUS GRAND facteur commun à tous les termes.\na) $4x + 18$\nb) $15x - 10$\nc) $x^2 - 9x$\nd) $12x^2 + 8x$",
          correction:
            "J'écris chaque terme comme un produit, puis je garde ce qui se retrouve dans TOUS les termes.\na) $4x = 2 \\times 2x$ et $18 = 2 \\times 9$. Le facteur commun est $2$.\nb) $15x = 5 \\times 3x$ et $10 = 5 \\times 2$. Le facteur commun est $5$.\nc) $x^2 = x \\times x$ et $9x = 9 \\times x$. Le facteur commun est $x$ : une lettre peut être un facteur commun.\nd) $12x^2 = 4x \\times 3x$ et $8x = 4x \\times 2$. Le nombre $4$ divise $12$ et $8$, et la lettre $x$ est dans les deux termes : le facteur commun est $4x$.\n⛔ Le piège au a) : répondre $4$, le nombre qu'on voit en premier. Or $18$ n'est pas dans la table de $4$ : un facteur commun doit diviser TOUS les termes.\n⛔ Autre piège au d) : s'arrêter à $4$, ou à $x$. Les deux sont communs, donc leur produit $4x$ aussi.\nRéponse : $2$ ; $5$ ; $x$ ; $4x$.",
          schema: tableau(["expression", "4x + 18", "15x − 10", "x² − 9x", "12x² + 8x"], ["plus grand facteur commun", "2", "5", "x", "4x"], true),
          micros: ["litteral_facteur_commun"],
        },
        {
          enonce: "Factoriser.\na) $6x + 42$\nb) $9x - 36$\nc) $14 + 21x$\nd) $10x - 25$",
          correction:
            "Je trouve le facteur commun, je l'écris devant la parenthèse, puis je DIVISE chaque terme par lui.\na) $6x + 42 = 6 \\times x + 6 \\times 7 = 6(x + 7)$.\nb) $9x - 36 = 9 \\times x - 9 \\times 4 = 9(x - 4)$. Le signe moins reste dans la parenthèse.\nc) $14 + 21x = 7 \\times 2 + 7 \\times 3x = 7(2 + 3x)$.\nd) $10x - 25 = 5 \\times 2x - 5 \\times 5 = 5(2x - 5)$.\n⭐ Le dessin du a) : un rectangle de hauteur $6$, coupé en deux morceaux d'aires $6x$ et $42$. Sa longueur est $x + 7$ : factoriser, c'est retrouver les côtés à partir de l'aire.\n⭐ Je vérifie en développant : $6(x + 7) = 6x + 42$, c'est bien le départ.\n⛔ Le piège au d) : ne diviser que le premier terme, et écrire $5(2x - 25)$. En développant, $5(2x - 25) = 10x - 125$ : le $25$ devait être divisé par $5$ lui aussi.\nRéponse : $6(x + 7)$ ; $9(x - 4)$ ; $7(2 + 3x)$ ; $5(2x - 5)$.",
          schema: aires([["x", 120], ["7", 70]], [["6", 60]], [["6x", "42"]]),
          micros: ["litteral_factoriser_simple"],
        },
        {
          enonce: "Factoriser : cette fois, la lettre fait partie du facteur commun.\na) $x^2 + 8x$\nb) $3x^2 - 7x$\nc) $6x^2 + 15x$\nd) $10x^2 - 4x$",
          correction:
            "Je regarde les nombres ET la lettre : $x$ est dans tous les termes, donc il fait partie du facteur commun.\na) $x^2 + 8x = x \\times x + x \\times 8 = x(x + 8)$.\nb) $3$ ne divise pas $7$ : seul $x$ est commun. $3x^2 - 7x = x \\times 3x - x \\times 7 = x(3x - 7)$.\nc) $3$ divise $6$ et $15$, et $x$ est dans les deux termes : le facteur commun est $3x$. $6x^2 + 15x = 3x \\times 2x + 3x \\times 5 = 3x(2x + 5)$.\nd) $2$ divise $10$ et $4$ : le facteur commun est $2x$. $10x^2 - 4x = 2x \\times 5x - 2x \\times 2 = 2x(5x - 2)$.\n⭐ Le dessin du c) : un rectangle de hauteur $3x$ et de longueur $2x + 5$. Ses deux morceaux ont pour aires $6x^2$ et $15x$.\n⛔ Le piège au c) : factoriser par $3$ seulement, $3(2x^2 + 5x)$. C'est juste, mais pas fini : $x$ est encore commun dans la parenthèse.\nRéponse : $x(x + 8)$ ; $x(3x - 7)$ ; $3x(2x + 5)$ ; $2x(5x - 2)$.",
          schema: aires([["2x", 100], ["5", 50]], [["3x", 150]], [["6x²", "15x"]]),
          micros: ["litteral_facteur_commun", "litteral_factoriser_simple"],
        },
        {
          enonce: "Factoriser. Attention : l'un des termes EST le facteur commun.\na) $7x + 7$\nb) $x^2 - x$\nc) $8x + 4$\nd) $5x^2 + x$",
          correction:
            "Quand un terme est égal au facteur commun, je le fais apparaître en l'écrivant « fois $1$ ».\na) $7 = 7 \\times 1$ : $7x + 7 = 7 \\times x + 7 \\times 1 = 7(x + 1)$.\nb) $x = x \\times 1$ : $x^2 - x = x \\times x - x \\times 1 = x(x - 1)$.\nc) $8x = 4 \\times 2x$ et $4 = 4 \\times 1$ : $8x + 4 = 4 \\times 2x + 4 \\times 1 = 4(2x + 1)$.\nd) $5x^2 + x = x \\times 5x + x \\times 1 = x(5x + 1)$.\n⭐ Le dessin du c) : le morceau de droite a une aire de $4$ et une hauteur de $4$, donc une largeur de $1$. C'est ce $1$ qu'on oublie.\n⭐ Je vérifie le c) en développant : $4(2x + 1) = 8x + 4$.\n⛔ Le piège : écrire $7(x)$ ou $4(2x)$. En développant, on trouve $7x$ et $8x$ : le terme seul a disparu. Diviser $7$ par $7$ donne $1$, pas $0$.\nRéponse : $7(x + 1)$ ; $x(x - 1)$ ; $4(2x + 1)$ ; $x(5x + 1)$.",
          schema: aires([["2x", 150], ["1", 25]], [["4", 60]], [["8x", "4"]]),
          micros: ["litteral_factoriser_simple", "litteral_factoriser_verifier"],
        },
        {
          enonce:
            "Chaque factorisation est-elle juste ? Développer pour le savoir, et corriger si besoin.\na) $12x + 30 = 6(2x + 5)$\nb) $8x - 24 = 4(2x - 6)$\nc) $21x + 14 = 7(3x + 7)$",
          correction:
            "Une factorisation ne se croit pas, elle se CONTRÔLE : je développe le produit et je compare au départ.\na) $6(2x + 5) = 6 \\times 2x + 6 \\times 5 = 12x + 30$. Je retrouve le départ : c'est juste.\nb) $4(2x - 6) = 4 \\times 2x - 4 \\times 6 = 8x - 24$. C'est juste… mais pas fini : $2x$ et $6$ ont encore $2$ en commun. Le plus grand facteur commun est $8$ : $8x - 24 = 8(x - 3)$.\nc) $7(3x + 7) = 7 \\times 3x + 7 \\times 7 = 21x + 49$. Ce n'est pas $21x + 14$ : c'est faux. Le $14$ n'a pas été divisé par $7$. La bonne factorisation : $21x + 14 = 7(3x + 2)$.\n⛔ Le piège : « vérifier » en relisant sa factorisation. Seul le développement dit si c'est juste : au c), il fait apparaître $49$ au lieu de $14$.\nRéponse : a) juste ; b) juste mais pas finie, $8(x - 3)$ ; c) fausse, $7(3x + 2)$.",
          schema: controle([["12x + 30 = 6(2x + 5)", "12x + 30", "juste"], ["8x − 24 = 4(2x − 6)", "8x − 24", "juste, pas finie"], ["21x + 14 = 7(3x + 7)", "21x + 49", "fausse"]]),
          micros: ["litteral_factoriser_verifier"],
        },
        {
          enonce:
            "a) Développer $(x - 3)(x + 3)$ : chaque terme de la première parenthèse multiplie chaque terme de la seconde.\nb) En déduire une écriture factorisée de $x^2 - 9$.\nc) De la même façon, développer $(x - 8)(x + 8)$, puis en déduire une écriture factorisée de $x^2 - 64$.",
          correction:
            "a) Je distribue les deux termes de la première parenthèse : $(x - 3)(x + 3) = x \\times x + x \\times 3 - 3 \\times x - 3 \\times 3 = x^2 + 3x - 3x - 9 = x^2 - 9$. Les termes $3x$ et $-3x$ s'annulent.\nb) Je lis le a) dans l'autre sens : $x^2 - 9 = (x - 3)(x + 3)$. C'est une écriture factorisée, un produit de deux parenthèses.\nc) $(x - 8)(x + 8) = x^2 + 8x - 8x - 64 = x^2 - 64$, donc $x^2 - 64 = (x - 8)(x + 8)$.\n⭐ Le dessin du a) : un rectangle de côtés $x + 3$ et $x - 3$, découpé en quatre morceaux. La bande $3x$ et la bande $-3x$ s'annulent : il ne reste que $x^2$ et $-9$.\n⛔ Le piège : croire que $x^2 - 9$ s'écrit $(x - 3)(x - 3)$. En développant, $(x - 3)(x - 3) = x^2 - 3x - 3x + 9 = x^2 - 6x + 9$ : ce n'est pas $x^2 - 9$.\nRéponse : $x^2 - 9 = (x - 3)(x + 3)$ et $x^2 - 64 = (x - 8)(x + 8)$.",
          schema: aires([["x", 120], ["3", 45]], [["x", 120], ["−3", 45]], [["x²", "3x"], ["−3x", "−9"]]),
          micros: ["litteral_factoriser_identite", "litteral_factoriser_verifier"],
        },
        {
          enonce: "Factoriser en mettant en facteur un nombre NÉGATIF.\na) $-5x - 15$\nb) $-2x + 8$\nc) $-3x^2 - 12x$",
          correction:
            "Je mets le signe moins DANS le facteur commun, puis je divise chaque terme par lui, signe compris.\na) $-15 = (-5) \\times 3$ : $-5x - 15 = -5 \\times x + (-5) \\times 3 = -5(x + 3)$.\nb) $8 = (-2) \\times (-4)$ : $-2x + 8 = -2 \\times x + (-2) \\times (-4) = -2(x - 4)$.\nc) $-12x = (-3x) \\times 4$ : $-3x^2 - 12x = -3x \\times x + (-3x) \\times 4 = -3x(x + 4)$.\n⭐ Le dessin du a) : une hauteur de $-5$ et deux morceaux, $-5x$ et $-15$, négatifs comme elle. La longueur est $x + 3$.\n⭐ Je vérifie le b) en développant : $-2(x - 4) = -2x + 8$.\n⛔ Le piège : garder les signes de départ dans la parenthèse, et écrire $-5(x - 15)$ ou $-5(x - 3)$. En développant, $-5(x - 3) = -5x + 15$ : moins par moins donne plus, le signe du second terme est faux.\nRéponse : $-5(x + 3)$ ; $-2(x - 4)$ ; $-3x(x + 4)$.",
          schema: aires([["x", 110], ["3", 45]], [["−5", 70]], [["−5x", "−15"]]),
          micros: ["litteral_facteur_commun", "litteral_factoriser_simple"],
        },
        {
          enonce: "Calculer de tête, en factorisant.\na) $37 \\times 8 + 63 \\times 8$\nb) $4{,}5 \\times 13 - 2{,}5 \\times 13$\nc) $99 \\times 7 + 7$",
          correction:
            "Le même nombre revient dans chaque produit : c'est le facteur commun. Je le mets à part, et je fais d'abord le calcul facile.\na) $8$ est commun : $37 \\times 8 + 63 \\times 8 = (37 + 63) \\times 8 = 100 \\times 8 = 800$.\nb) $13$ est commun : $4{,}5 \\times 13 - 2{,}5 \\times 13 = (4{,}5 - 2{,}5) \\times 13 = 2 \\times 13 = 26$.\nc) Le $7$ seul, c'est $1 \\times 7$ : $99 \\times 7 + 7 = (99 + 1) \\times 7 = 100 \\times 7 = 700$.\n⭐ Le dessin du a) : deux rectangles de même hauteur $8$, posés côte à côte, d'aires $296$ et $504$. Ensemble, ils forment un rectangle de longueur $37 + 63 = 100$.\n⛔ Le piège au c) : écrire $99 \\times 14$, en doublant le $7$. Le second $7$ compte « une fois $7$ » : j'ajoute $1$ à $99$, je ne touche pas au $7$. Et $99 \\times 14 = 1\\,386$, bien loin de $700$.\nRéponse : $800$ ; $26$ ; $700$.",
          schema: aires([["37", 90], ["63", 150]], [["8", 40]], [["296", "504"]]),
          micros: ["litteral_facteur_commun", "litteral_factorisation_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme en contrôle. Je cherche le plus grand facteur commun, puis je développe pour vérifier.",
      rappel: [
        "Le PLUS GRAND facteur commun : le plus grand nombre qui divise tous les coefficients, et la lettre si elle est dans TOUS les termes.",
        "Une factorisation est FINIE quand plus rien de commun ne reste dans la parenthèse : $2(5x + 10)$ n'est pas finie, $10(x + 2)$ l'est.",
        "Pour prouver qu'un nombre est toujours un multiple de $3$, je l'écris $3 \\times (\\ldots)$ avec un nombre entier dans la parenthèse.",
      ],
      exercices: [
        {
          enonce:
            "Lina doit factoriser $24x + 36$. Elle écrit $24x + 36 = 2(12x + 18)$.\na) Sa factorisation est-elle juste ? Est-elle finie ?\nb) Factoriser complètement $24x + 36$.\nc) Factoriser complètement $18x^2 - 12x$.",
          correction:
            "a) Je développe : $2(12x + 18) = 24x + 36$. C'est juste. Mais $12x$ et $18$ ont encore $6$ en commun : la factorisation n'est pas finie.\nb) Je cherche le PLUS GRAND nombre qui divise $24$ et $36$. Leurs diviseurs communs sont $1$, $2$, $3$, $4$, $6$ et $12$ : je prends $12$.\n$24x + 36 = 12 \\times 2x + 12 \\times 3 = 12(2x + 3)$. Dans la parenthèse, $2x$ et $3$ n'ont plus rien en commun : c'est fini.\nc) Le plus grand nombre qui divise $18$ et $12$ est $6$, et la lettre $x$ est dans les deux termes : le facteur commun est $6x$. $18x^2 - 12x = 6x \\times 3x - 6x \\times 2 = 6x(3x - 2)$.\n⭐ Le dessin du b) : un rectangle de hauteur $12$ et de longueur $2x + 3$, d'aires $24x$ et $36$. Contrôle en développant : $12 \\times 2x + 12 \\times 3 = 24x + 36$.\n⛔ Le piège : s'arrêter au premier facteur trouvé. $2(12x + 18)$ ou $3x(6x - 4)$ sont justes, mais pas finis : il faudra les reprendre.\nRéponse : a) juste mais pas finie ; b) $12(2x + 3)$ ; c) $6x(3x - 2)$.",
          schema: aires([["2x", 140], ["3", 30]], [["12", 120]], [["24x", "36"]]),
          micros: ["litteral_facteur_commun", "litteral_factoriser_verifier", "litteral_factorisation_defi"],
        },
        {
          enonce: "Factoriser.\na) $6x^2 + 9x - 3$\nb) $4x^2 + 3x - x^2 + 6x$, en réduisant d'abord.",
          correction:
            "a) Trois termes : le facteur commun doit diviser les TROIS. $3$ divise $6$, $9$ et $3$. La lettre $x$ n'est pas dans le dernier terme : elle n'est pas commune.\n$6x^2 + 9x - 3 = 3 \\times 2x^2 + 3 \\times 3x - 3 \\times 1 = 3(2x^2 + 3x - 1)$.\nb) Je réduis d'abord : $4x^2 - x^2 = 3x^2$ et $3x + 6x = 9x$. Puis $3x$ est commun : $4x^2 + 3x - x^2 + 6x = 3x^2 + 9x = 3x(x + 3)$.\n⭐ Le dessin du a) : un rectangle de hauteur $3$ coupé en TROIS morceaux, un par terme. Le dernier, $-3$, donne le $-1$ de la parenthèse : c'est lui qu'on oublie.\n⛔ Le piège au a) : mettre $3x$ en facteur. Le terme $-3$ ne contient pas $x$ : $3x$ ne le divise pas.\n⛔ Le piège au b) : factoriser avant de réduire, et garder quatre termes. Je réduis toujours en premier.\nRéponse : $3(2x^2 + 3x - 1)$ ; $3x(x + 3)$.",
          schema: aires([["2x²", 90], ["3x", 90], ["−1", 24]], [["3", 50]], [["6x²", "9x", "−3"]]),
          micros: ["litteral_facteur_commun", "litteral_factoriser_simple"],
        },
        {
          enonce:
            "a) Développer et réduire $(x + 4)(x + 4)$, en distribuant chaque terme de la première parenthèse.\nb) En déduire une écriture factorisée de $x^2 + 8x + 16$.\nc) Contrôler avec $x = 1$, puis avec $x = 6$.\nd) De la même façon, développer $(x - 5)(x - 5)$, puis en déduire une écriture factorisée de $x^2 - 10x + 25$.",
          correction:
            "a) Chaque terme de la première parenthèse multiplie chaque terme de la seconde : $(x + 4)(x + 4) = x \\times x + x \\times 4 + 4 \\times x + 4 \\times 4 = x^2 + 4x + 4x + 16 = x^2 + 8x + 16$.\nb) Je lis le a) dans l'autre sens : $x^2 + 8x + 16 = (x + 4)(x + 4)$.\nc) Pour $x = 1$ : $1^2 + 8 \\times 1 + 16 = 25$ et $5 \\times 5 = 25$. Pour $x = 6$ : $6^2 + 8 \\times 6 + 16 = 100$ et $10 \\times 10 = 100$.\nd) $(x - 5)(x - 5) = x^2 - 5x - 5x + 25 = x^2 - 10x + 25$, donc $x^2 - 10x + 25 = (x - 5)(x - 5)$.\n⭐ Le dessin du a) : un carré de côté $x + 4$, découpé en $x^2$, deux bandes de $4x$ et un petit carré de $16$. Les deux bandes font le $8x$ du milieu.\n⛔ Le piège : oublier les deux bandes, et croire que $(x + 4)(x + 4)$ vaut $x^2 + 16$. Pour $x = 1$ : $5 \\times 5 = 25$, mais $1^2 + 16 = 17$.\nRéponse : $x^2 + 8x + 16 = (x + 4)(x + 4)$ ; $x^2 - 10x + 25 = (x - 5)(x - 5)$.",
          schema: aires([["x", 120], ["4", 50]], [["x", 120], ["4", 50]], [["x²", "4x"], ["4x", "16"]]),
          micros: ["litteral_factoriser_identite", "litteral_factoriser_verifier"],
        },
        {
          enonce: "Factoriser quand c'est possible, puis vérifier en développant.\na) $x^2 - 11x$\nb) $22x - 121$\nc) $16x^2 - 64x$\nd) $5x^2 + 3$",
          correction:
            "Pour chaque expression, je cherche ce qui divise TOUS les termes : le plus grand nombre, et la lettre si elle est partout.\na) $x$ est dans les deux termes, et aucun nombre plus grand que $1$ ne divise $1$ et $11$ : $x^2 - 11x = x \\times x - x \\times 11 = x(x - 11)$.\nb) $22 = 11 \\times 2$ et $121 = 11 \\times 11$ : $22x - 121 = 11 \\times 2x - 11 \\times 11 = 11(2x - 11)$.\nc) $16$ divise $16$ et $64$, et $x$ est dans les deux termes : $16x^2 - 64x = 16x \\times x - 16x \\times 4 = 16x(x - 4)$.\nd) $x$ n'est pas dans le terme $3$, et seul $1$ divise $5$ et $3$ : il n'y a pas de facteur commun. Je laisse $5x^2 + 3$ tel quel.\n⭐ Contrôle du c) en développant : $16x(x - 4) = 16x^2 - 64x$.\n⛔ Le piège au d) : écrire $x(5x + 3)$. En développant, $x(5x + 3) = 5x^2 + 3x$ : ce n'est pas $5x^2 + 3$.\n⛔ Le piège au c) : s'arrêter à $4x(4x - 16)$ ou à $16(x^2 - 4x)$. C'est juste, mais pas fini.\nRéponse : $x(x - 11)$ ; $11(2x - 11)$ ; $16x(x - 4)$ ; $5x^2 + 3$ n'a pas de facteur commun.",
          schema: tableau(["expression", "x² − 11x", "22x − 121", "16x² − 64x", "5x² + 3"], ["forme factorisée", "x(x − 11)", "11(2x − 11)", "16x(x − 4)", "aucune"], true),
          micros: ["litteral_facteur_commun", "litteral_factoriser_verifier", "litteral_factorisation_defi"],
        },
        {
          enonce:
            "Voici la copie de Hugo. Pour chaque ligne, dire si elle est juste en développant, puis corriger les erreurs.\na) $16x + 40 = 8(2x + 5)$\nb) $9x^2 + 3x = 3x(3x)$\nc) $12x^2 - 8x = 4x(3x - 8)$\nd) $6x - 6 = 6(x - 1)$",
          correction:
            "Pour chaque ligne, je développe le membre de droite et je compare au membre de gauche.\na) $8(2x + 5) = 16x + 40$ : juste. Et c'est fini, $2x$ et $5$ n'ont rien en commun.\nb) $3x(3x) = 9x^2$ : le terme $3x$ a disparu. Faux. Ce terme est égal au facteur commun, il reste donc $1$ : $9x^2 + 3x = 3x \\times 3x + 3x \\times 1 = 3x(3x + 1)$.\nc) $4x(3x - 8) = 12x^2 - 32x$ : le second terme est faux. Hugo a recopié le $8$ sans le diviser par $4x$ ; or $8x = 4x \\times 2$. Donc $12x^2 - 8x = 4x \\times 3x - 4x \\times 2 = 4x(3x - 2)$.\nd) $6(x - 1) = 6x - 6$ : juste. Hugo a bien pensé au $1$.\n⭐ Deux lignes sur quatre sont fausses, et Hugo ne pouvait pas le voir en relisant : seul le développement fait apparaître ce qui manque.\n⛔ Le piège : oublier le terme qui EST le facteur commun (le b), ou recopier un terme sans le diviser (le c).\nRéponse : a) juste ; b) faux, $3x(3x + 1)$ ; c) faux, $4x(3x - 2)$ ; d) juste.",
          schema: controle([["16x + 40 = 8(2x + 5)", "16x + 40", "juste"], ["9x² + 3x = 3x(3x)", "9x²", "faux"], ["12x² − 8x = 4x(3x − 8)", "12x² − 32x", "faux"], ["6x − 6 = 6(x − 1)", "6x − 6", "juste"]]),
          micros: ["litteral_factoriser_verifier", "litteral_factorisation_defi"],
        },
        {
          enonce:
            "Les longueurs sont en centimètres.\na) Un rectangle a une aire de $6x + 18$ cm² et une largeur de $6$ cm. Exprimer sa longueur en fonction de $x$.\nb) Un rectangle a une aire de $x^2 + 7x$ cm² et une longueur de $x + 7$ cm. Quelle est sa largeur ?\nc) Un rectangle a une aire de $5x^2 + 10x$ cm² et une largeur de $5x$ cm. Exprimer sa longueur en fonction de $x$.\nd) Contrôler les trois réponses pour $x = 5$.",
          correction:
            "L'aire d'un rectangle, c'est longueur × largeur : si j'écris l'aire comme un PRODUIT, je lis les deux côtés.\na) $6x + 18 = 6 \\times x + 6 \\times 3 = 6(x + 3)$. La largeur est $6$, donc la longueur est $x + 3$ cm.\nb) $x^2 + 7x = x \\times x + x \\times 7 = x(x + 7)$. La longueur est $x + 7$, donc la largeur est $x$ cm.\nc) $5x^2 + 10x = 5x \\times x + 5x \\times 2 = 5x(x + 2)$. La largeur est $5x$, donc la longueur est $x + 2$ cm.\nd) Pour $x = 5$ : au a), $6 \\times 5 + 18 = 48$ et $6 \\times 8 = 48$ ; au b), $5^2 + 7 \\times 5 = 60$ et $5 \\times 12 = 60$ ; au c), $5 \\times 5^2 + 10 \\times 5 = 175$ et $25 \\times 7 = 175$.\n⭐ Les dessins : le rectangle du a) et celui du c), découpés en morceaux. L'aire est la somme des morceaux ; les côtés se lisent sur les bords.\n⛔ Le piège au a) : répondre $x + 18$, en oubliant de diviser le $18$ par $6$. Le contrôle le montre : $6 \\times (5 + 18) = 138$, pas $48$.\nRéponse : a) $x + 3$ cm ; b) $x$ cm ; c) $x + 2$ cm.",
          schema: deux(
            aires([["x", 110], ["3", 40]], [["6", 80]], [["6x", "18"]]),
            aires([["x", 90], ["2", 45]], [["5x", 150]], [["5x²", "10x"]]),
          ),
          micros: ["litteral_factoriser_simple", "litteral_factoriser_verifier"],
        },
        {
          enonce:
            "Voici un programme de calcul.\n• Choisir un nombre entier.\n• Le multiplier par $4$.\n• Soustraire $10$ au résultat.\na) Tester le programme avec $1$, $3$, $6$ et $10$.\nb) Inès affirme : « le résultat est toujours un multiple de $4$ ». A-t-elle raison ?\nc) On note $x$ le nombre choisi. Écrire le résultat en fonction de $x$, le factoriser, et prouver que le résultat est toujours un nombre pair.",
          correction:
            "a) Avec $1$ : $4 \\times 1 - 10 = -6$. Avec $3$ : $4 \\times 3 - 10 = 2$. Avec $6$ : $4 \\times 6 - 10 = 14$. Avec $10$ : $4 \\times 10 - 10 = 30$.\nb) Non : $2$ et $-6$ ne sont pas des multiples de $4$. Un seul contre-exemple suffit pour dire « faux ».\nc) Le résultat s'écrit $4x - 10$. Le nombre $2$ divise $4$ et $10$ : $4x - 10 = 2 \\times 2x - 2 \\times 5 = 2(2x - 5)$.\nSi $x$ est entier, $2x - 5$ est entier : le résultat est $2$ fois un entier, donc un nombre pair.\n⭐ Le tableau montre quatre essais, tous pairs. Mais c'est la forme $2(2x - 5)$ qui le PROUVE pour tous les entiers.\n⛔ Le piège : croire que le $4x$ rend le résultat multiple de $4$. Le $10$ n'est pas un multiple de $4$ : seul $2$ est commun aux deux termes.\nRéponse : $-6$, $2$, $14$, $30$ ; Inès a tort ; $4x - 10 = 2(2x - 5)$, toujours pair.",
          schema: tableau(["nombre choisi", "1", "3", "6", "10"], ["résultat", -6, 2, 14, 30]),
          micros: ["litteral_factoriser_simple", "litteral_factorisation_defi"],
        },
        {
          enonce:
            "a) Calculer la somme de trois entiers qui se suivent : $4 + 5 + 6$, puis $10 + 11 + 12$.\nb) On note $n$ le plus petit des trois entiers. Écrire les deux suivants, puis leur somme, et la réduire.\nc) Factoriser cette somme. Prouver qu'elle est toujours un multiple de $3$.\nd) Que représente le nombre dans la parenthèse ? Calculer de tête $99 + 100 + 101$.",
          correction:
            "a) $4 + 5 + 6 = 15$ et $10 + 11 + 12 = 33$.\nb) Les deux entiers qui suivent $n$ sont $n + 1$ et $n + 2$. Leur somme : $n + (n + 1) + (n + 2) = 3n + 3$.\nc) $3$ divise $3n$ et $3$ : $3n + 3 = 3 \\times n + 3 \\times 1 = 3(n + 1)$. Si $n$ est entier, $n + 1$ l'est aussi : la somme est $3$ fois un entier, donc un multiple de $3$.\nd) $n + 1$ est l'entier du MILIEU. La somme de trois entiers qui se suivent vaut donc $3$ fois celui du milieu : $99 + 100 + 101 = 3 \\times 100 = 300$.\n⭐ Le tableau le confirme sur quatre essais : $15 = 3 \\times 5$, $33 = 3 \\times 11$, $78 = 3 \\times 26$, $300 = 3 \\times 100$.\n⛔ Le piège : factoriser $3n + 3$ en $3n$, ou en $3(n)$. Le second terme $3$ vaut $3 \\times 1$ : il reste $1$ dans la parenthèse.\nRéponse : $3n + 3 = 3(n + 1)$, toujours un multiple de $3$ ; $99 + 100 + 101 = 300$.",
          schema: tableau(["plus petit entier", "4", "10", "25", "99"], ["somme des trois", 15, 33, 78, 300]),
          micros: ["litteral_factoriser_simple", "litteral_factorisation_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je nomme l'inconnue, je factorise, puis je réponds par une phrase.",
      rappel: [
        "L'aire d'un rectangle, c'est longueur × largeur : une aire écrite comme un PRODUIT donne directement les deux côtés.",
        "Je nomme l'inconnue avec une lettre, j'écris l'expression, je la factorise, puis je réponds par une phrase, avec l'unité.",
      ],
      exercices: [
        {
          titre: "Le terrain de handball",
          enonce:
            "Un terrain de handball est un rectangle de $40$ m sur $20$ m. Le long de chacune des deux grandes lignes, les lignes de touche, on ajoute une bande de sécurité de $x$ mètres de large.\na) Exprimer l'aire totale (le terrain et les deux bandes) en fonction de $x$, sous forme d'une somme.\nb) Factoriser cette aire par $40$. Que représente chaque facteur ?\nc) Le règlement impose au moins $1$ m le long des lignes de touche. Calculer l'aire totale pour $x = 1$.\nd) Une salle offre $960$ m² sur la même longueur de $40$ m. Quelle largeur de bande peut-on prévoir ?",
          correction:
            "a) Le terrain : $40 \\times 20 = 800$ m². Chaque bande est un rectangle de $40$ m sur $x$ m : $40x$ m². Il y en a deux. L'aire totale est $800 + 40x + 40x = 800 + 80x$.\nb) $40$ divise $800$ et $80x$ : $800 + 80x = 40 \\times 20 + 40 \\times 2x = 40(20 + 2x)$.\nC'est « longueur × largeur » : la longueur reste $40$ m, et la largeur totale est $20 + 2x$ m, le terrain plus une bande de chaque côté.\nc) Pour $x = 1$ : $40 \\times (20 + 2 \\times 1) = 40 \\times 22 = 880$ m². Avec la somme : $800 + 80 \\times 1 = 880$ m². Les deux formes donnent le même nombre.\nd) La forme factorisée le dit tout de suite : la largeur totale vaut $960 \\div 40 = 24$ m. Le terrain en prend $20$, il reste $4$ m pour les deux bandes, soit $2$ m chacune.\n⭐ Le dessin : le terrain au milieu, une bande de $40x$ au-dessus et une en dessous. Les trois morceaux ont la même longueur, $40$ : c'est le facteur commun.\n⛔ Le piège : n'écrire qu'une bande, $800 + 40x$. Les lignes de touche sont DEUX, une de chaque côté du terrain.\nRéponse : l'aire totale est $800 + 80x = 40(20 + 2x)$ m² ; $880$ m² pour $x = 1$ ; des bandes de $2$ m.",
          schema: aires([["40", 160]], [["x", 24], ["20", 80], ["x", 24]], [["40x"], ["800"], ["40x"]]),
          micros: ["litteral_factoriser_simple", "litteral_facteur_commun"],
        },
        {
          titre: "Le potager et sa bande fleurie",
          enonce:
            "Un potager carré mesure $x$ mètres de côté. Sur deux de ses côtés qui se touchent, on sème une bande de fleurs de $2$ m de large, pour attirer les abeilles et les autres pollinisateurs. Le potager et sa bande forment un grand carré.\na) Exprimer l'aire totale en fonction de $x$, en additionnant quatre morceaux : le potager, les deux bandes et le coin.\nb) Quel est le côté du grand carré ? En déduire une écriture factorisée de l'aire totale, et la vérifier en développant.\nc) L'aire totale est de $144$ m². Quel est le côté du potager ?\nd) Exprimer l'aire de la bande fleurie seule, puis la factoriser.",
          correction:
            "a) Le potager : $x^2$. Les deux bandes : deux rectangles de $x$ m sur $2$ m, soit $2x$ chacun. Le coin : un carré de $2$ m sur $2$ m, soit $4$. L'aire totale est $x^2 + 2x + 2x + 4 = x^2 + 4x + 4$.\nb) Le grand carré a pour côté $x + 2$ mètres : le potager plus la bande. Son aire est donc aussi $(x + 2)(x + 2)$. Je vérifie en développant : $(x + 2)(x + 2) = x^2 + 2x + 2x + 4 = x^2 + 4x + 4$. Donc $x^2 + 4x + 4 = (x + 2)(x + 2)$ : c'est une écriture factorisée de l'aire.\nc) $(x + 2)(x + 2) = 144$ et $144 = 12 \\times 12$ : le grand côté mesure $12$ m, donc $x = 12 - 2 = 10$. Le potager mesure $10$ m de côté.\nd) La bande seule, c'est l'aire totale moins le potager : $x^2 + 4x + 4 - x^2 = 4x + 4 = 4(x + 1)$. Pour $x = 10$ : $4 \\times 11 = 44$ m², et $144 - 100 = 44$.\n⭐ Le dessin : le potager en bleu, deux bandes de $2x$ et le petit coin de $4$. Sans le coin, le grand carré ne se refermerait pas.\n⛔ Le piège : oublier le coin, et écrire $x^2 + 4x$. Ce n'est plus un carré : le coin de $4$ m² est indispensable.\nRéponse : l'aire totale est $(x + 2)(x + 2)$ m² ; le potager mesure $10$ m de côté ; la bande fleurie mesure $4(x + 1)$ m², soit $44$ m².",
          schema: aires([["x", 130], ["2", 36]], [["x", 130], ["2", 36]], [["x²", "2x"], ["2x", "4"]]),
          micros: ["litteral_factoriser_identite", "litteral_factoriser_simple", "litteral_factoriser_verifier"],
        },
        {
          titre: "Replanter une forêt",
          enonce:
            "Après une tempête, une équipe forestière replante une parcelle en $12$ rangées. Dans chaque rangée, elle plante $x$ chênes, puis $5$ hêtres.\na) Écrire le nombre total d'arbres de deux façons : en comptant tous les chênes puis tous les hêtres, puis en comptant rangée par rangée.\nb) Expliquer pourquoi les deux écritures sont égales.\nc) Combien d'arbres pour $x = 15$ ? Calculer avec les deux écritures.\nd) L'équipe dispose de $300$ plants en tout. Combien de chênes par rangée ?",
          correction:
            "a) Les chênes : $12$ rangées de $x$, soit $12x$. Les hêtres : $12$ rangées de $5$, soit $12 \\times 5 = 60$. En tout : $12x + 60$.\nRangée par rangée : chaque rangée compte $x + 5$ arbres, et il y a $12$ rangées : $12(x + 5)$.\nb) C'est une factorisation : $12x + 60 = 12 \\times x + 12 \\times 5 = 12(x + 5)$. Je vérifie en développant : $12(x + 5) = 12x + 60$.\nc) Pour $x = 15$ : $12 \\times 15 + 60 = 240$, et $12 \\times (15 + 5) = 12 \\times 20 = 240$. La parcelle compte $240$ arbres.\nd) La forme factorisée compte par rangée : chaque rangée a $300 \\div 12 = 25$ arbres. Il y a $5$ hêtres, donc $25 - 5 = 20$ chênes par rangée.\n⭐ Le dessin : la parcelle vue comme un rectangle de $12$ rangées ; la partie des chênes ($12x$) et celle des hêtres ($60$) sont côte à côte.\n⛔ Le piège : écrire $12x + 5$, en comptant les hêtres d'une seule rangée. Il y a $5$ hêtres dans CHAQUE rangée : $12 \\times 5 = 60$.\nRéponse : $12x + 60 = 12(x + 5)$ arbres ; $240$ arbres pour $x = 15$ ; $20$ chênes par rangée.",
          schema: aires([["x", 130], ["5", 50]], [["12", 120]], [["12x", "60"]]),
          micros: ["litteral_factoriser_simple", "litteral_factoriser_verifier"],
        },
        {
          titre: "L'étang et sa roselière",
          enonce:
            "Dans un parc naturel, un terrain carré de $53$ m de côté contient, dans un coin, un étang carré de $47$ m de côté. Le reste du terrain est une roselière, où nichent les oiseaux : deux bandes de $47$ m sur $6$ m, et un coin carré de $6$ m de côté.\na) Écrire l'aire de la roselière comme une somme de trois produits, puis la calculer de tête en mettant $6$ en facteur.\nb) Plus généralement, le terrain a un côté de $x$ mètres et l'étang un côté de $x - 6$ mètres. Exprimer l'aire de la roselière en fonction de $x$, la réduire, puis la factoriser.\nc) Vérifier le résultat du a) avec la forme factorisée du b).",
          correction:
            "a) Les deux bandes : $47 \\times 6$ chacune ; le coin : $6 \\times 6$. Le $6$ est dans les trois produits : $47 \\times 6 + 47 \\times 6 + 6 \\times 6 = (47 + 47 + 6) \\times 6 = 100 \\times 6 = 600$. La roselière mesure $600$ m².\nb) Les bandes mesurent maintenant $x - 6$ sur $6$, et le coin toujours $6$ sur $6$. L'aire de la roselière est $6(x - 6) + 6(x - 6) + 36 = 6x - 36 + 6x - 36 + 36 = 12x - 36$.\nJe factorise par $12$ : $12x - 36 = 12 \\times x - 12 \\times 3 = 12(x - 3)$.\nc) Pour $x = 53$ : $12 \\times (53 - 3) = 12 \\times 50 = 600$. Même résultat qu'au a).\n⭐ Le dessin : le grand carré de $53$ m découpé. L'étang ($2\\,209$ m²), deux bandes de $282$ m² et un coin de $36$ m² : $282 + 282 + 36 = 600$. Et $53 \\times 53 - 47 \\times 47 = 2\\,809 - 2\\,209 = 600$ le confirme.\n⛔ Le piège : calculer $53 - 47 = 6$, puis $6 \\times 6 = 36$, et croire que c'est la roselière. $36$ m², c'est seulement le petit coin : il manque les deux bandes.\nRéponse : la roselière mesure $600$ m² ; son aire est $12x - 36 = 12(x - 3)$.",
          schema: aires([["47", 150], ["6", 40]], [["47", 150], ["6", 40]], [["2 209", "282"], ["282", "36"]]),
          micros: ["litteral_facteur_commun", "litteral_factoriser_simple", "litteral_factorisation_defi"],
        },
      ],
    },
  ],
};
