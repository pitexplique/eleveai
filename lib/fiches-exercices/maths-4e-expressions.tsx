// ─── Fiche d'exercices : les expressions littérales (4e) — 20 exercices corrigés
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-expressions-litterales.tsx`
// et sur les cinq micros du coach de 4e (notionId `litteral_expression`). Le fil
// du cours : une lettre est un nombre qu'on ne connaît pas encore ; on sait la
// LIRE (termes, coefficients), la TRADUIRE depuis une phrase, la REMPLACER par un
// nombre, et RÉDUIRE — on n'additionne que ce qui est semblable.
// ⛔ On reste sur ces cinq gestes. La distributivité, les identités
// remarquables et la factorisation ont chacune LEUR feuille : ici, aucune
// parenthèse n'est développée (l'aire (x + 5) × x reste un produit, ex. 9), et
// aucune équation n'est résolue (l'âge où deux formules s'accordent se lit
// dans un tableau, ex. 17 ; les 100 allumettes se trouvent en remontant le
// calcul, ex. 18).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 3x + 5, ni x + 4,
// ni 3x + 2 pour x = 4, ni 3x + 2x, ni 5x + 4 − 2x, ni le taxi, la facture
// d'électricité ou la sortie scolaire. ⛔ Ni ceux de la feuille de calcul
// littéral de 3e (2x + 5, A = 3x² − 5x + 2, 4x + 7 − x + 3, 6x × 3x, le
// rectangle 2x + 3 sur x − 1, les entiers qui se suivent au carré…).
//
// Les pièges nommés : le coefficient de −x pris pour 0 ou 1 (1), x × x = 2x
// (2, 14), « quadruple » confondu avec « augmenté de 4 » (3), 2x lu comme le
// nombre 23 et la soustraction avant le produit (4, 17), −2² sans parenthèses
// (5), réduire ce qui n'est pas semblable (6, 8, 10, 12, 14, 15), additionner
// dans un produit (7, 20), les parenthèses oubliées dans une aire (9), le x seul
// compté pour zéro (10), le double calculé sur le mauvais nombre (11), un signe
// perdu en rangeant les termes (13), « de plus » traduit par un produit (16),
// un essai qui marche pris pour une preuve (14, 18, 19).
//
// Les chiffres du monde, et d'où ils viennent :
// - fréquence cardiaque maximale : 220 − âge (formule dite de Fox, Fox,
//   Naughton et Haskell, 1971) et 208 − 0,7 × âge (Tanaka, Monahan et Seals,
//   « Age-predicted maximal heart rate revisited », Journal of the American
//   College of Cardiology, 2001, vol. 37, n° 1, p. 153-156) — ex. 17 ;
// - débit d'une douche : environ 12 L par minute pour une pomme classique,
//   environ 6 L par minute pour une pomme économe, et un bain d'environ 150 L :
//   ordres de grandeur des fiches de l'ADEME sur l'eau chaude à la maison.
//   ⚠️ À VÉRIFIER avant publication : l'ADEME donne des fourchettes selon les
//   modèles (≈ 12 à 20 L/min contre ≈ 6 à 8 L/min) ; on a pris les bas — ex. 20.
// Tout le reste (la salle d'escalade et ses tarifs, l'âge de Léo, les
// allumettes) est inventé, à l'ordre de grandeur réel.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés sont
// dessinés, et deux énoncés ont leur figure (15, 18). Trois SVG locaux, parce
// qu'aucun canvas du coach ne dessine ces objets :
//   · `rect` : un rectangle À L'ÉCHELLE pour une valeur de x écrite sous le
//     dessin (« dessiné à l'échelle pour x = 3 ») ; côtés étiquetés, morceaux
//     remplis de leur aire (x² en bleu, les x en orange) ;
//   · `tuiles` : les tuiles d'algèbre — une barre pour x, un petit carré pour
//     1, un grand carré pour x², en rouge quand le terme est négatif. Réduire,
//     c'est compter des objets de même forme ;
//   · `allumettes` : la rangée de carrés du problème 18.
// Et des tableaux (`tableau`, `grille`), la trace d'un programme de calcul
// (`trace`), un triangle à l'échelle (`triangle`).
// ⭐ Le script de recalcul RELIT chaque appel : les écrire EN CLAIR, sur une
// ligne, les chaînes entre guillemets doubles.
//
// Les corrigés sont écrits à la première personne (« je range »), comme les
// feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-expressions-4e.mjs`.
//
// Micro-compétences : litteral_expression_comprendre (1, 2, 13, 14, 15),
// litteral_expression_traduire (3, 9, 10, 11, 12, 16, 18, 19, 20),
// litteral_expression_substituer (4, 5, 9, 10, 11, 12, 13, 15, 16, 17, 18, 20),
// litteral_expression_reduire (6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 19, 20),
// litteral_expression_defi (8, 14, 17, 18, 19). 5/5.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau, trace, triangle } from "@/lib/fiches-exercices/figures";

const BLEU_FONCE = "#1d4ed8";
const NOIR = "#0f172a";
const GRIS = "#64748b";

/** Deux dessins côte à côte : l'un sous l'autre sur téléphone, côte à côte à
 *  partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/** Un dessin et sa petite phrase dessous (texte NU). */
const avecLegende = (dessin: ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs text-slate-500">{texte}</p>
  </div>
);

/** −1, 2,5 : un nombre écrit comme au tableau. */
const ecrit = (v: string | number) => (typeof v === "number" ? String(v).replace("-", "−").replace(".", ",") : v);

/** Un tableau de plusieurs lignes (le `tableau()` commun n'en a qu'une).
 *  ⛔ Pas de `label` de ligne : le canvas ajouterait une colonne « Données ». */
const grille = (entete: string[], lignes: (string | number)[][]) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer
      figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((l) => ({ values: l.map(ecrit) })), display: { compact: true, striped: true } }}
    />
  </div>
);

/* ── Le rectangle à l'échelle ───────────────────────────────────────────────
 * `haut` : les morceaux de la longueur (étiquette, longueur dessinée pour
 * x = `pour`), `gauche` : la largeur, `cases` : l'aire de chaque morceau.
 * ⭐ Le script relit l'appel : chaque étiquette, calculée pour x = `pour`, doit
 * valoir la longueur dessinée, et chaque case « morceau × largeur ».
 * ⛔ LISIBLE À 375 PX : viewBox de 280, police de 15, et une largeur minimale de
 * 16,5 rem dans un parent qui défile — 15 × 264 ÷ 280 ≈ 14 px effectifs. */
type Bord = [string, number];
const rect = (haut: Bord[], gauche: Bord, pour: number, cases: string[] = [], echelle?: number) => {
  const W = haut.reduce((s, [, l]) => s + l, 0);
  const H = gauche[1];
  const s = echelle ?? Math.min(180 / W, 110 / H);
  const VW = 280;
  const G = 64;
  const T = 28;
  const x0 = G + (VW - G - 12 - W * s) / 2;
  const VH = T + H * s + 30;
  const xs = haut.map((_, j) => x0 + haut.slice(0, j).reduce((a, [, l]) => a + l, 0) * s);
  const fond = (j: number) => {
    const c = cases[j] ?? "";
    if (c.includes("²")) return "#dbeafe";
    if (c.includes("x")) return "#ffedd5";
    if (c) return "#f1f5f9";
    return j % 2 ? "#ffedd5" : "#dbeafe";
  };
  return (
    <div className="mx-auto w-full max-w-[18rem] overflow-x-auto print:max-w-[13rem] print:overflow-visible">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="block h-auto w-full min-w-[16.5rem] print:min-w-0"
        role="img"
        aria-label={`Rectangle de longueur ${haut.map((h) => h[0]).join(" + ")} et de largeur ${gauche[0]}`}
      >
        {haut.map(([t, l], j) => (
          <text key={`h${j}`} x={xs[j] + (l * s) / 2} y={T - 9} textAnchor="middle" fontSize={15} fontWeight={700} fill={BLEU_FONCE}>
            {t}
          </text>
        ))}
        <text x={x0 - 8} y={T + (H * s) / 2 + 5} textAnchor="end" fontSize={15} fontWeight={700} fill={BLEU_FONCE}>
          {gauche[0]}
        </text>
        {haut.map(([, l], j) => (
          <g key={`c${j}`}>
            <rect x={xs[j]} y={T} width={l * s} height={H * s} fill={fond(j)} stroke="#334155" strokeWidth={1.5} />
            {cases[j] ? (
              <text x={xs[j] + (l * s) / 2} y={T + (H * s) / 2 + 5} textAnchor="middle" fontSize={15} fill={NOIR}>
                {cases[j]}
              </text>
            ) : null}
          </g>
        ))}
        <text x={VW / 2} y={VH - 8} textAnchor="middle" fontSize={13} fill={GRIS}>
          {`dessiné à l'échelle pour x = ${String(pour).replace(".", ",")}`}
        </text>
      </svg>
    </div>
  );
};

/* ── Les tuiles d'algèbre ───────────────────────────────────────────────────
 * Une rangée par terme : `c` grands carrés (x²), `x` barres (x), `u` petits
 * carrés (1) ; un nombre NÉGATIF de tuiles les dessine en rouge. `resultat`,
 * s'il est donné, est la rangée réduite, sous un trait.
 * ⭐ Le script relit chaque rangée : son texte doit valoir c x² + x x + u, et la
 * rangée réduite la somme des autres. */
type Tuile = { texte: string; c?: number; x?: number; u?: number };
const tuiles = (rangees: Tuile[], resultat?: Tuile) => {
  const LG = 88;
  const larg = (r: Tuile) => Math.abs(r.c ?? 0) * 34 + Math.abs(r.x ?? 0) * 16 + Math.abs(r.u ?? 0) * 16;
  const toutes = resultat ? [...rangees, resultat] : rangees;
  const VW = Math.max(280, LG + Math.max(...toutes.map(larg)) + 8);
  const HR = 46;
  const y = (i: number) => 8 + i * HR + (resultat && i === rangees.length ? 12 : 0);
  const VH = y(toutes.length - 1) + HR;
  const rangee = (r: Tuile, i: number, gras: boolean) => {
    const formes: ReactNode[] = [];
    let cx = LG;
    const pose = (n: number, w: number, h: number, bleu: string, orange: boolean) => {
      for (let k = 0; k < Math.abs(n); k++) {
        const neg = n < 0;
        formes.push(
          <rect
            key={`${i}-${formes.length}`}
            x={cx}
            y={y(i) + 30 - h}
            width={w}
            height={h}
            rx={2}
            fill={neg ? "#fecaca" : orange ? "#fdba74" : bleu}
            stroke={neg ? "#dc2626" : "#334155"}
            strokeWidth={1.3}
          />,
        );
        cx += w + 4;
      }
    };
    pose(r.c ?? 0, 30, 30, "#93c5fd", false);
    pose(r.x ?? 0, 12, 30, "#bfdbfe", false);
    pose(r.u ?? 0, 12, 12, "", true);
    return (
      <g key={i}>
        <text x={LG - 10} y={y(i) + 21} textAnchor="end" fontSize={15} fontWeight={gras ? 800 : 600} fill={gras ? BLEU_FONCE : NOIR}>
          {gras ? `= ${r.texte}` : r.texte}
        </text>
        {formes}
      </g>
    );
  };
  return (
    <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[14rem] print:overflow-visible">
      <svg viewBox={`0 0 ${VW} ${VH}`} className="block h-auto w-full min-w-[16.5rem] print:min-w-0" role="img" aria-label="Tuiles : une barre pour x, un petit carré pour 1, un grand carré pour x carré">
        {rangees.map((r, i) => rangee(r, i, false))}
        {resultat ? <line x1={12} y1={y(rangees.length) - 8} x2={VW - 12} y2={y(rangees.length) - 8} stroke={GRIS} strokeWidth={1.5} strokeDasharray="4 3" /> : null}
        {resultat ? rangee(resultat, rangees.length, true) : null}
      </svg>
    </div>
  );
};

/* ── Les allumettes (problème 18) ───────────────────────────────────────────
 * `[n, k]` : une rangée de n carrés collés, et le nombre k écrit au-dessus.
 * ⭐ Le script RECOMPTE les allumettes de chaque rangée, côté par côté (les
 * côtés communs une seule fois) et compare à k. */
const allumettes = (rangees: [number, number][]) => {
  const U = 30;
  const X0 = 20;
  const HB = 68;
  const VW = 280;
  const VH = rangees.length * HB + 4;
  const baton = (x1: number, y1: number, x2: number, y2: number, key: string) => {
    const [dx, dy] = [x2 - x1, y2 - y1];
    const L = Math.hypot(dx, dy);
    const [a, b] = [x1 + (dx / L) * 3, y1 + (dy / L) * 3];
    const [c, d] = [x2 - (dx / L) * 3, y2 - (dy / L) * 3];
    return (
      <g key={key}>
        <line x1={a} y1={b} x2={c} y2={d} stroke="#a16207" strokeWidth={4} strokeLinecap="round" />
        <circle cx={c} cy={d} r={3.6} fill="#dc2626" />
      </g>
    );
  };
  return (
    <div className="mx-auto w-full max-w-[18rem] overflow-x-auto print:max-w-[13rem] print:overflow-visible">
      <svg viewBox={`0 0 ${VW} ${VH}`} className="block h-auto w-full min-w-[16.5rem] print:min-w-0" role="img" aria-label="Rangées de carrés en allumettes">
        {rangees.map(([n, k], r) => {
          const y0 = r * HB + 26;
          const batons: ReactNode[] = [];
          for (let i = 0; i < n; i++) {
            batons.push(baton(X0 + i * U, y0, X0 + (i + 1) * U, y0, `${r}h${i}`));
            batons.push(baton(X0 + i * U, y0 + U, X0 + (i + 1) * U, y0 + U, `${r}b${i}`));
          }
          for (let i = 0; i <= n; i++) batons.push(baton(X0 + i * U, y0 + U, X0 + i * U, y0, `${r}v${i}`));
          return (
            <g key={r}>
              <text x={X0 - 4} y={y0 - 8} fontSize={14} fontWeight={700} fill={NOIR}>
                {`${n} carré${n > 1 ? "s" : ""} : ${k} allumettes`}
              </text>
              {batons}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesExpressions4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "litteral-expression",
  titre: "Les expressions littérales",
  accroche:
    "Vingt exercices, du geste seul au problème : lire une expression, écrire sans le signe ×, traduire une phrase, remplacer la lettre par un nombre, réduire. Puis le périmètre d'un rectangle ou d'un triangle, un programme de calcul, deux tarifs d'escalade, la fréquence cardiaque d'un sportif, des carrés en allumettes et l'eau d'une douche. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi, le piège nommé, et un dessin — un rectangle à l'échelle, des tuiles qu'on compte, un tableau.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/litteral-expression", titre: "Les expressions littérales" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : lire, traduire, remplacer ou réduire. Je vérifie en remplaçant la lettre par un nombre.",
      rappel: [
        "Une expression littérale est un calcul où une lettre remplace un nombre qu'on ne connaît pas encore. La lettre vaut la même chose partout dans l'expression.",
        "Devant une lettre, le signe × ne s'écrit pas : $7 \\times x$ s'écrit $7x$, le coefficient $1$ ne s'écrit pas, et une lettre multipliée par elle-même s'écrit avec un carré.",
        "REMPLACER la lettre : je remets le signe ×, je mets un nombre négatif entre parenthèses, puis je respecte les priorités.",
        "RÉDUIRE : je n'additionne que des termes SEMBLABLES. Les $x^2$ ensemble, les $x$ ensemble, les nombres ensemble.",
      ],
      exercices: [
        {
          enonce:
            "On donne l'expression $E = 8x^2 - x + 6$.\na) Combien a-t-elle de termes ? Les écrire, chacun avec son signe.\nb) Quel est le coefficient de $x^2$ ? Celui de $x$ ?\nc) Quel est le terme constant ?\nd) Réécrire $E$ en remettant tous les signes $\\times$.",
          correction:
            "Un terme est un morceau séparé des autres par un $+$ ou un $-$ ; je garde le signe avec lui.\na) Trois termes : $8x^2$, $-x$ et $6$.\nb) Le coefficient est le nombre écrit devant la lettre. Devant $x^2$, c'est $8$. Devant $x$, seul le signe est écrit : $-x$ veut dire $-1 \\times x$, donc le coefficient de $x$ est $-1$.\nc) Le terme constant est $6$ : il ne contient pas de $x$.\nd) $E = 8 \\times x \\times x - 1 \\times x + 6$.\n⭐ Je vérifie avec $x = 2$ : $8 \\times 2 \\times 2 - 1 \\times 2 + 6 = 32 - 2 + 6 = 36$.\n⛔ Le piège : dire que le coefficient de $x$ est $0$, ou $1$. Quand aucun nombre n'est écrit, le coefficient est $1$ ; ici, le signe moins en fait $-1$.\nRéponse : trois termes ; coefficients $8$ et $-1$ ; terme constant $6$.",
          schema: tableau(["terme", "8x²", "−x", "6"], ["coefficient", 8, -1, "sans x"]),
          micros: ["litteral_expression_comprendre"],
        },
        {
          enonce: "Écrire le plus simplement possible.\na) $4 \\times x$\nb) $x \\times 9$\nc) $3 \\times x \\times x$\nd) $1 \\times x$\ne) $x \\times 2 \\times x \\times 5$",
          correction:
            "Deux conventions : devant une lettre, le signe $\\times$ ne s'écrit pas, et le nombre se place EN PREMIER. Une lettre multipliée par elle-même s'écrit avec un carré.\na) $4 \\times x = 4x$.\nb) Je mets le nombre devant : $x \\times 9 = 9x$.\nc) $x \\times x$ s'écrit $x^2$, donc $3 \\times x \\times x = 3x^2$.\nd) Le coefficient $1$ ne s'écrit pas : $1 \\times x = x$.\ne) Je range les nombres ensemble et les lettres ensemble : $2 \\times 5 = 10$ et $x \\times x = x^2$, donc $x \\times 2 \\times x \\times 5 = 10x^2$.\n⭐ Le dessin : un carré de côté $x$ a pour aire $x \\times x = x^2$ ; un rectangle de côtés $x$ et $2$ a pour aire $2x$. Pour $x = 5$ : $25$ contre $10$, ce ne sont pas les mêmes.\n⛔ Le piège : écrire $x \\times x = 2x$. $2x$, c'est $x + x$ ; $x \\times x$, c'est $x^2$.\nRéponse : $4x$ ; $9x$ ; $3x^2$ ; $x$ ; $10x^2$.",
          schema: deux(rect([["x", 5]], ["x", 5], 5, ["x²"], 20), rect([["x", 5]], ["2", 2], 5, ["2x"], 20)),
          micros: ["litteral_expression_comprendre"],
        },
        {
          enonce:
            "Traduire chaque phrase par une expression, avec la lettre $x$.\na) Le quadruple de $x$.\nb) $x$ diminué de $7$.\nc) Le carré de $x$.\nd) La moitié de $x$.\ne) Le double de la somme de $x$ et de $6$.\nf) Calculer chaque expression pour $x = 10$.",
          correction:
            "Je traduis chaque mot par son opération : « quadruple » veut dire $4$ fois, « diminué de » veut dire moins, « le carré » veut dire multiplié par lui-même, « la moitié » veut dire divisé par $2$.\na) $4x$.\nb) $x - 7$.\nc) $x^2$.\nd) $\\dfrac{x}{2}$.\ne) La somme se calcule d'abord : je la mets entre parenthèses, $2(x + 6)$.\nf) Pour $x = 10$ : $4 \\times 10 = 40$ ; $10 - 7 = 3$ ; $10^2 = 100$ ; $\\dfrac{10}{2} = 5$ ; $2 \\times (10 + 6) = 32$.\n⛔ Le piège : confondre « le quadruple de $x$ » avec « $x$ augmenté de $4$ », ou « le carré de $x$ » avec « le double de $x$ ». Pour $x = 10$, le carré vaut $100$, le double seulement $20$.\nRéponse : $4x$ ; $x - 7$ ; $x^2$ ; $\\dfrac{x}{2}$ ; $2(x + 6)$.",
          schema: tableau(["pour x = 10", "4x", "x − 7", "x²", "x ÷ 2", "2(x + 6)"], ["valeur", 40, 3, 100, 5, 32], true),
          micros: ["litteral_expression_traduire"],
        },
        {
          enonce: "On donne $B = 7 - 2x$. Calculer $B$ pour :\na) $x = 3$\nb) $x = 0$\nc) $x = -4$\nd) $x = 2{,}5$",
          correction:
            "Je remplace $x$ par sa valeur et je REMETS le signe $\\times$ que l'écriture $2x$ cachait. Un nombre négatif se met entre parenthèses. Puis la multiplication passe avant la soustraction.\na) $7 - 2 \\times 3 = 7 - 6 = 1$.\nb) $7 - 2 \\times 0 = 7 - 0 = 7$.\nc) $7 - 2 \\times (-4) = 7 + 8 = 15$.\nd) $7 - 2 \\times 2{,}5 = 7 - 5 = 2$.\n⛔ Le piège au a) : remplacer sans remettre le signe $\\times$, et lire $2x$ comme le nombre $23$. Pour $x = 3$, $2x$ vaut $2 \\times 3 = 6$.\n⛔ Autre piège, au c) : calculer $7 - 2 = 5$ d'abord. La multiplication passe avant : on trouverait $5 \\times (-4) = -20$ au lieu de $15$.\nRéponse : $B = 1$ ; $B = 7$ ; $B = 15$ ; $B = 2$.",
          schema: tableau(["x", "3", "0", "−4", "2,5"], ["B", 1, 7, 15, 2]),
          micros: ["litteral_expression_substituer"],
        },
        {
          enonce: "On donne $D = x^2 - 3x$. Calculer $D$ pour :\na) $x = 5$\nb) $x = -2$\nc) $x = 1$\nd) Que remarque-t-on aux questions a) et b) ?",
          correction:
            "Je remplace $x$ partout, entre parenthèses quand il est négatif. D'abord le carré, puis le produit, enfin la soustraction.\na) $5^2 - 3 \\times 5 = 25 - 15 = 10$.\nb) $(-2)^2 - 3 \\times (-2) = 4 + 6 = 10$.\nc) $1^2 - 3 \\times 1 = 1 - 3 = -2$.\nd) Deux nombres différents, $5$ et $-2$, donnent le même résultat, $10$. Une expression peut prendre la même valeur pour deux nombres.\n⛔ Le piège au b) : taper $-2^2$ sans parenthèses. Le carré ne porte alors que sur le $2$ : $-2^2 = -4$, et on trouverait $-4 + 6 = 2$.\n⛔ Autre piège : lire $x^2$ comme $2x$. Pour $x = 5$, $x^2 = 25$ mais $2x = 10$.\nRéponse : $D = 10$ ; $D = 10$ ; $D = -2$.",
          schema: tableau(["x", "5", "−2", "1"], ["D", 10, 10, -2]),
          micros: ["litteral_expression_substituer"],
        },
        {
          enonce: "Réduire, si c'est possible.\na) $6x + 9x$\nb) $4x - 11x$\nc) $x + x + x + x$\nd) $2x + 6 + 3x - 4$\ne) $8x + 1$",
          correction:
            "Réduire, c'est regrouper les termes SEMBLABLES : les termes en $x$ entre eux, les nombres entre eux. J'additionne les coefficients ; la lettre ne change pas.\na) $6 + 9 = 15$, donc $6x + 9x = 15x$.\nb) $4 - 11 = -7$, donc $4x - 11x = -7x$.\nc) Chaque $x$ compte pour $1x$ : $x + x + x + x = 4x$.\nd) Les $x$ : $2x + 3x = 5x$. Les nombres : $6 - 4 = 2$. Donc $2x + 6 + 3x - 4 = 5x + 2$.\ne) $8x$ et $1$ ne sont pas semblables : $8x + 1$ est déjà réduite.\n⭐ Le dessin du d) : une barre pour chaque $x$, un petit carré pour chaque unité. Cinq barres en tout ; parmi les petits carrés, les quatre rouges (le $-4$) annulent quatre des six orange, il en reste $2$.\n⛔ Le piège au e) : écrire $8x + 1 = 9x$. Pour $x = 10$ : $8 \\times 10 + 1 = 81$, mais $9 \\times 10 = 90$.\nRéponse : $15x$ ; $-7x$ ; $4x$ ; $5x + 2$ ; $8x + 1$ ne se réduit pas.",
          schema: tuiles([{ texte: "2x", x: 2 }, { texte: "+ 6", u: 6 }, { texte: "+ 3x", x: 3 }, { texte: "− 4", u: -4 }], { texte: "5x + 2", x: 5, u: 2 }),
          micros: ["litteral_expression_reduire"],
        },
        {
          enonce: "Réduire chaque produit.\na) $3 \\times 5x$\nb) $2x \\times 4$\nc) $x \\times 6x$\nd) $-2x \\times 5x$\ne) $7x \\times 0$",
          correction:
            "Dans un produit, je multiplie les nombres entre eux, puis les lettres entre elles. Pas besoin de termes semblables : dans un produit, tout se multiplie.\na) $3 \\times 5 = 15$, donc $3 \\times 5x = 15x$.\nb) $2 \\times 4 = 8$, donc $2x \\times 4 = 8x$.\nc) $1 \\times 6 = 6$ et $x \\times x = x^2$, donc $x \\times 6x = 6x^2$.\nd) $-2 \\times 5 = -10$ et $x \\times x = x^2$, donc $-2x \\times 5x = -10x^2$.\ne) Un produit par $0$ vaut $0$ : $7x \\times 0 = 0$.\n⭐ Le dessin du c) : un rectangle de côtés $x$ et $6x$ contient six carrés de côté $x$, soit $6x^2$.\n⛔ Le piège au c) : additionner au lieu de multiplier, et écrire $7x$. Pour $x = 2$ : $2 \\times 12 = 24$, alors que $7 \\times 2 = 14$.\nRéponse : $15x$ ; $8x$ ; $6x^2$ ; $-10x^2$ ; $0$.",
          schema: rect([["x", 2], ["x", 2], ["x", 2], ["x", 2], ["x", 2], ["x", 2]], ["x", 2], 2, ["x²", "x²", "x²", "x²", "x²", "x²"]),
          micros: ["litteral_expression_reduire"],
        },
        {
          enonce: "Réduire, si c'est possible.\na) $x^2 + x^2$\nb) $2x^2 - 3x + x^2$\nc) $3x + 3x^2$\nd) $x^2 + 4 - 2x^2 + x - 1$",
          correction:
            "Trois familles ne se mélangent pas : les $x^2$, les $x$ et les nombres seuls. Je range chaque terme dans sa famille, avec son signe.\na) Deux fois le même terme : $x^2 + x^2 = 2x^2$.\nb) Les $x^2$ : $2x^2 + x^2 = 3x^2$. Le terme $-3x$ est seul de sa famille. Donc $2x^2 - 3x + x^2 = 3x^2 - 3x$.\nc) $3x$ et $3x^2$ ne sont pas de la même famille : l'expression est déjà réduite.\nd) Les $x^2$ : $x^2 - 2x^2 = -x^2$. Les $x$ : $x$. Les nombres : $4 - 1 = 3$. Donc $x^2 + 4 - 2x^2 + x - 1 = -x^2 + x + 3$.\n⭐ Le dessin du c) : trois barres $x$ et trois grands carrés $x^2$ n'ont pas la même forme. On ne peut pas les compter ensemble.\n⛔ Le piège au c) : écrire $6x^2$, ou $6x$. Pour $x = 2$ : $3 \\times 2 + 3 \\times 2^2 = 6 + 12 = 18$, mais $6 \\times 2^2 = 24$.\nRéponse : $2x^2$ ; $3x^2 - 3x$ ; $3x + 3x^2$ ne se réduit pas ; $-x^2 + x + 3$.",
          schema: tuiles([{ texte: "3x", x: 3 }, { texte: "+ 3x²", c: 3 }]),
          micros: ["litteral_expression_reduire", "litteral_expression_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme en contrôle. J'écris l'expression, je la réduis, puis je la vérifie avec un nombre.",
      rappel: [
        "Le PÉRIMÈTRE est le tour de la figure : j'ajoute tous les côtés, puis je réduis. L'AIRE d'un rectangle est longueur × largeur.",
        "Un programme de calcul se traduit étape par étape : j'écris ce que devient $x$ à chaque ligne.",
        "Un terme emporte TOUJOURS le signe écrit devant lui : dans $7 - 9x$, le terme en $x$ est $-9x$.",
      ],
      exercices: [
        {
          enonce:
            "Un rectangle a pour longueur $x + 5$ et pour largeur $x$, en centimètres.\na) Écrire son périmètre comme la somme de ses quatre côtés, puis réduire.\nb) Écrire son aire sous la forme d'un produit.\nc) Calculer le périmètre et l'aire pour $x = 3$.",
          correction:
            "a) Le périmètre est le tour du rectangle : j'ajoute ses quatre côtés, deux longueurs et deux largeurs.\n$P = x + 5 + x + x + 5 + x$. Je regroupe : les $x$ font $4x$, les nombres $5 + 5 = 10$. Donc $P = 4x + 10$.\nb) L'aire est longueur × largeur : $A = (x + 5) \\times x$. Les parenthèses sont obligatoires : c'est toute la longueur qui est multipliée.\nc) Pour $x = 3$ : $P = 4 \\times 3 + 10 = 22$ cm et $A = (3 + 5) \\times 3 = 24$ cm².\n⭐ Contrôle avec le dessin, fait pour $x = 3$ : le rectangle mesure $8$ cm sur $3$ cm ; $8 + 3 + 8 + 3 = 22$ et $8 \\times 3 = 24$.\n⛔ Le piège : écrire $A = x + 5 \\times x$, sans parenthèses. Pour $x = 3$, on calculerait $3 + 15 = 18$ au lieu de $24$.\nRéponse : $P = 4x + 10$ ; $A = (x + 5) \\times x$ ; pour $x = 3$, $22$ cm et $24$ cm².",
          schema: rect([["x + 5", 8]], ["x", 3], 3),
          micros: ["litteral_expression_traduire", "litteral_expression_reduire", "litteral_expression_substituer"],
        },
        {
          enonce:
            "Un triangle a trois côtés de longueurs $x$, $2x$ et $x + 4$, en centimètres.\na) Exprimer son périmètre en fonction de $x$, et réduire.\nb) Calculer le périmètre pour $x = 3$, de deux façons.\nc) Calculer le périmètre pour $x = 4{,}5$.",
          correction:
            "a) J'ajoute les trois côtés : $P = x + 2x + x + 4$. Les $x$ : $1 + 2 + 1 = 4$, donc $4x$. Le nombre : $4$. Donc $x + 2x + x + 4 = 4x + 4$.\nb) Avec la forme réduite : $4 \\times 3 + 4 = 16$ cm. Avec les côtés : ils mesurent $3$, $6$ et $7$ cm, et $3 + 6 + 7 = 16$ cm. Les deux calculs concordent.\nc) $4 \\times 4{,}5 + 4 = 18 + 4 = 22$ cm.\n⛔ Le piège : compter le $x$ seul pour zéro, et trouver $3x + 4$. Un $x$ tout seul, c'est $1x$. Pour $x = 3$, $3x + 4$ donnerait $13$ cm, pas $16$.\n⛔ Autre piège : réduire $4x + 4$ en $8x$. $4x$ et $4$ ne sont pas semblables.\nRéponse : $P = 4x + 4$ ; $16$ cm pour $x = 3$ ; $22$ cm pour $x = 4{,}5$.",
          schema: avecLegende(triangle({ A: [0, 0], B: [7, 0], C: [1.5714, 2.5555] }, { cotes: { AB: "x + 4", BC: "2x", CA: "x" } }), "dessiné à l'échelle pour x = 3 : côtés de 3, 6 et 7 cm"),
          micros: ["litteral_expression_traduire", "litteral_expression_reduire", "litteral_expression_substituer"],
        },
        {
          enonce:
            "Voici un programme de calcul.\n• Choisir un nombre.\n• Le multiplier par $5$.\n• Ajouter $8$.\n• Soustraire le double du nombre de départ.\na) Tester le programme avec $4$, puis avec $-2$.\nb) On note $x$ le nombre de départ. Écrire le résultat en fonction de $x$, puis le réduire.\nc) Vérifier la forme réduite avec les deux tests du a).",
          correction:
            "a) Avec $4$ : $4 \\times 5 = 20$, puis $20 + 8 = 28$, puis $28 - 2 \\times 4 = 28 - 8 = 20$.\nAvec $-2$ : $-2 \\times 5 = -10$, puis $-10 + 8 = -2$, puis $-2 - 2 \\times (-2) = -2 + 4 = 2$.\nb) J'écris chaque étape avec $x$ : $5x$, puis $5x + 8$, puis $5x + 8 - 2x$.\nJe réduis : $5x - 2x = 3x$, donc le résultat est $5x + 8 - 2x = 3x + 8$.\nc) Pour $x = 4$ : $3 \\times 4 + 8 = 20$. Pour $x = -2$ : $3 \\times (-2) + 8 = 2$. Ce sont bien les résultats du a).\n⛔ Le piège au a) : calculer « le double » sur le résultat de l'étape d'avant. Le double du nombre de DÉPART, c'est $2 \\times 4 = 8$, pas $2 \\times 28 = 56$.\nRéponse : $20$ et $2$ ; le programme donne $3x + 8$.",
          schema: trace(["étape", "avec 4", "avec −2", "avec x"], [["choisir", "4", "−2", "x"], ["× 5", "20", "−10", "5x"], ["+ 8", "28", "−2", "5x + 8"], ["− 2 × départ", "20", "2", "5x + 8 − 2x"], ["réduit", "20", "2", "3x + 8"]]),
          micros: ["litteral_expression_traduire", "litteral_expression_substituer", "litteral_expression_reduire"],
        },
        {
          enonce:
            "Une salle d'escalade propose deux formules.\nFormule A : une carte d'adhésion à $25$ € par an, puis $7$ € la séance.\nFormule B : $11$ € la séance, sans adhésion.\nOn note $n$ le nombre de séances dans l'année.\na) Écrire le prix payé avec chaque formule, en fonction de $n$.\nb) Calculer les deux prix pour $5$ séances, puis pour $8$ séances.\nc) Léna prévoit une séance par semaine pendant $12$ semaines. Quelle formule doit-elle choisir ?",
          correction:
            "a) Avec la formule A, je paie $25$ € une seule fois, plus $7$ € pour chacune des $n$ séances : $A = 25 + 7n$. Avec la formule B : $B = 11n$.\nb) Pour $n = 5$ : $A = 25 + 7 \\times 5 = 60$ € et $B = 11 \\times 5 = 55$ €. La formule B est moins chère.\nPour $n = 8$ : $A = 25 + 7 \\times 8 = 81$ € et $B = 11 \\times 8 = 88$ €. Cette fois, c'est la formule A.\nc) Pour $n = 12$ : $A = 25 + 7 \\times 12 = 109$ € et $B = 11 \\times 12 = 132$ €. Léna choisit la formule A, et économise $23$ €.\n⛔ Le piège : écrire $A = 32n$, en additionnant $25$ et $7$. L'adhésion se paie UNE fois, elle n'est pas multipliée par le nombre de séances : $25$ et $7n$ ne sont pas semblables.\nRéponse : $A = 25 + 7n$ et $B = 11n$ ; $60$ € et $55$ € pour $5$ séances, $81$ € et $88$ € pour $8$ ; pour $12$ séances, la formule A.",
          schema: grille(["séances", "5", "8", "12"], [["25 + 7n", 60, 81, 109], ["11n", 55, 88, 132]]),
          micros: ["litteral_expression_traduire", "litteral_expression_substituer"],
        },
        {
          enonce:
            "On donne $A = 7x - 3 + 2x^2 - 9x + 10 - x^2$.\na) Réduire $A$.\nb) Calculer $A$ pour $x = 2$, d'abord avec l'expression de départ, puis avec la forme réduite.\nc) Pourquoi est-il plus prudent de réduire avant de calculer ?",
          correction:
            "a) Je range chaque terme dans sa famille, AVEC le signe écrit devant lui.\nLes $x^2$ : $2x^2 - x^2 = x^2$.\nLes $x$ : $7x - 9x = -2x$.\nLes nombres : $-3 + 10 = 7$.\nDonc $A = x^2 - 2x + 7$.\nb) Avec l'expression de départ : $7 \\times 2 - 3 + 2 \\times 2^2 - 9 \\times 2 + 10 - 2^2 = 14 - 3 + 8 - 18 + 10 - 4 = 7$.\nAvec la forme réduite : $2^2 - 2 \\times 2 + 7 = 4 - 4 + 7 = 7$. Même résultat : la réduction est juste.\nc) La forme réduite a trois termes au lieu de six : deux fois moins d'occasions de se tromper de signe.\n⛔ Le piège : perdre le signe moins devant $9x$ ou devant $x^2$, et trouver $3x^2 + 16x + 7$. Un terme emporte TOUJOURS le signe écrit devant lui.\nRéponse : $A = x^2 - 2x + 7$ ; $A = 7$ pour $x = 2$.",
          schema: grille(["famille", "les termes", "réduit"], [["x²", "2x² et −x²", "x²"], ["x", "7x et −9x", "−2x"], ["nombres", "−3 et 10", "7"]]),
          micros: ["litteral_expression_reduire", "litteral_expression_substituer", "litteral_expression_comprendre"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifier.\na) Pour tout nombre $x$, $x + x = x^2$.\nb) Pour tout nombre $x$, $3x \\times 2 = 6x$.\nc) Pour tout nombre $x$, $5x - 5 = x$.\nd) Pour tout nombre $x$, $7x - x = 6x$.\ne) Pour tout nombre $x$, $4 + 2x = 6x$.",
          correction:
            "Pour montrer qu'une égalité est FAUSSE, un seul contre-exemple suffit. Pour montrer qu'elle est VRAIE pour tout $x$, j'utilise les règles de calcul, pas des essais.\na) FAUX. Pour $x = 3$ : $3 + 3 = 6$, mais $3^2 = 9$. En fait, $x + x = 2x$ : deux barres ne font pas un carré.\nb) VRAI. Je multiplie les nombres : $3 \\times 2 = 6$, donc $3x \\times 2 = 6x$.\nc) FAUX. Pour $x = 2$ : $5 \\times 2 - 5 = 5$, alors que le membre de droite vaut $2$. $5x$ et $5$ ne sont pas semblables : on ne peut pas les soustraire.\nd) VRAI. $-x$, c'est $-1x$ : $7x - x = 7x - 1x = 6x$.\ne) FAUX. Pour $x = 0$ : $4 + 2 \\times 0 = 4$, mais $6 \\times 0 = 0$.\n⛔ Le piège au c) : essayer $x = 1{,}25$, et conclure « vrai ». $5 \\times 1{,}25 - 5 = 1{,}25$ : ça marche, mais pour ce nombre-là seulement. Un essai qui marche ne prouve rien ; un seul essai qui rate prouve « faux ».\nRéponse : faux, vrai, faux, vrai, faux.",
          schema: tuiles([{ texte: "x + x", x: 2 }, { texte: "x²", c: 1 }]),
          micros: ["litteral_expression_defi", "litteral_expression_reduire", "litteral_expression_comprendre"],
        },
        {
          enonce:
            "La figure est un rectangle découpé en trois morceaux : deux carrés de côté $x$, et un rectangle de côtés $x$ et $3$, en mètres.\na) Écrire la longueur du grand rectangle, puis son périmètre, et réduire.\nb) Écrire l'aire de chaque morceau, puis l'aire totale, et réduire.\nc) Calculer le périmètre et l'aire pour $x = 4$.",
          figure: rect([["x", 4], ["x", 4], ["3", 3]], ["x", 4], 4),
          correction:
            "a) La longueur est faite de trois morceaux mis bout à bout : $x + x + 3 = 2x + 3$. La largeur est $x$.\nLe périmètre ajoute les quatre côtés : $2x + 3 + x + 2x + 3 + x = 6x + 6$.\nb) Chaque carré a pour aire $x \\times x = x^2$ ; le petit rectangle, $3 \\times x = 3x$.\nL'aire totale est la somme des trois : $x^2 + x^2 + 3x = 2x^2 + 3x$.\nc) Pour $x = 4$ : $P = 6 \\times 4 + 6 = 30$ m et $A = 2 \\times 4^2 + 3 \\times 4 = 32 + 12 = 44$ m².\n⭐ Contrôle : pour $x = 4$, le grand rectangle mesure $11$ m sur $4$ m ; $11 + 4 + 11 + 4 = 30$ et $11 \\times 4 = 44$.\n⛔ Le piège au b) : réduire $2x^2 + 3x$ en $5x^2$, ou en $5x$. Les carrés et le petit rectangle n'ont pas la même forme : $x^2$ et $x$ sont deux familles.\nRéponse : $P = 6x + 6$ ; $A = 2x^2 + 3x$ ; pour $x = 4$, $30$ m et $44$ m².",
          schema: rect([["x", 4], ["x", 4], ["3", 3]], ["x", 4], 4, ["x²", "x²", "3x"]),
          micros: ["litteral_expression_comprendre", "litteral_expression_reduire", "litteral_expression_substituer"],
        },
        {
          enonce:
            "Léo a $x$ ans. Sa sœur a $3$ ans de plus que lui. Son père a le triple de l'âge de Léo. Sa grand-mère a le double de l'âge du père, moins $4$ ans.\na) Exprimer l'âge de chacun en fonction de $x$, en réduisant.\nb) Exprimer la somme des quatre âges, et la réduire.\nc) Léo a $12$ ans. Calculer chaque âge, puis la somme, de deux façons.",
          correction:
            "a) Je traduis chaque phrase, mot à mot.\nLéo : $x$. Sa sœur, « $3$ ans de plus » : $x + 3$. Son père, « le triple » : $3x$.\nSa grand-mère, « le double de l'âge du père, moins $4$ » : $2 \\times 3x - 4 = 6x - 4$.\nb) $x + x + 3 + 3x + 6x - 4 = 11x - 1$ : les $x$ font $1 + 1 + 3 + 6 = 11$, les nombres $3 - 4 = -1$.\nc) Pour $x = 12$ : Léo a $12$ ans, sa sœur $15$ ans, son père $36$ ans, sa grand-mère $6 \\times 12 - 4 = 68$ ans.\nLa somme : $12 + 15 + 36 + 68 = 131$, et avec la forme réduite $11 \\times 12 - 1 = 131$. Les deux calculs concordent.\n⛔ Le piège : traduire « $3$ ans de plus » par $3x$. « De plus » ajoute : la sœur n'a pas trois fois l'âge de Léo. Avec $3x$, elle aurait $36$ ans au lieu de $15$.\nRéponse : $x$, $x + 3$, $3x$, $6x - 4$ ; la somme vaut $11x - 1$, soit $131$ ans pour $x = 12$.",
          schema: tableau(["pour x = 12", "Léo : x", "sœur : x + 3", "père : 3x", "grand-mère : 6x − 4", "somme : 11x − 1"], ["âge", 12, 15, 36, 68, 131], true),
          micros: ["litteral_expression_traduire", "litteral_expression_reduire", "litteral_expression_substituer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je nomme ce qui varie avec une lettre, j'écris l'expression, je la teste, puis je réponds par une phrase.",
      rappel: [
        "Une formule est une expression qui attend ses nombres : on l'écrit une fois, et elle répond pour toutes les valeurs.",
        "Des essais montrent des exemples ; seul un calcul avec la lettre prouve qu'une propriété est vraie pour TOUS les nombres. Un seul contre-exemple prouve qu'elle est fausse.",
      ],
      exercices: [
        {
          titre: "Le cœur du sportif",
          enonce:
            "Pour régler l'intensité d'un entraînement, on estime la fréquence cardiaque maximale, en battements par minute, à partir de l'âge $a$ en années. Deux formules sont utilisées :\n• la formule classique : $F = 220 - a$ ;\n• la formule de Tanaka : $T = 208 - 0{,}7a$.\na) Calculer $F$ et $T$ pour une élève de $14$ ans.\nb) Calculer $F$ et $T$ pour $a = 20$, $a = 40$ et $a = 60$.\nc) Pour quel âge du tableau les deux formules donnent-elles le même résultat ? Laquelle donne le plus grand nombre avant cet âge ? Et après ?",
          correction:
            "a) Je remplace $a$ par $14$, en remettant le signe $\\times$ dans $0{,}7a$.\n$F = 220 - 14 = 206$ battements par minute.\n$T = 208 - 0{,}7 \\times 14 = 208 - 9{,}8 = 198{,}2$ battements par minute.\nb) Pour $a = 20$ : $F = 220 - 20 = 200$ et $T = 208 - 0{,}7 \\times 20 = 208 - 14 = 194$.\nPour $a = 40$ : $F = 220 - 40 = 180$ et $T = 208 - 0{,}7 \\times 40 = 208 - 28 = 180$.\nPour $a = 60$ : $F = 220 - 60 = 160$ et $T = 208 - 0{,}7 \\times 60 = 208 - 42 = 166$.\nc) À $40$ ans, les deux formules donnent $180$. Avant $40$ ans, la formule classique donne le plus grand nombre ; après, c'est celle de Tanaka.\n⛔ Le piège : calculer $208 - 0{,}7$ d'abord, puis multiplier par $14$. On trouverait plus de $2\\,900$ battements par minute, un cœur impossible. La multiplication $0{,}7 \\times 14$ passe AVANT la soustraction.\nRéponse : pour $14$ ans, $F = 206$ et $T = 198{,}2$ ; les deux formules s'accordent à $40$ ans, avec $180$ battements par minute.",
          schema: grille(["âge", "20", "40", "60"], [["220 − a", 200, 180, 160], ["208 − 0,7a", 194, 180, 166]]),
          micros: ["litteral_expression_substituer", "litteral_expression_defi"],
        },
        {
          titre: "Des carrés en allumettes",
          enonce:
            "Avec des allumettes, on construit une rangée de carrés collés les uns aux autres, comme sur la figure.\na) Combien faut-il d'allumettes pour $4$ carrés ? Pour $5$ carrés ?\nb) Pour $n$ carrés, Tom propose $4n$ allumettes et Inès propose $3n + 1$. Qui a raison ? Expliquer d'où vient l'expression juste.\nc) Combien faut-il d'allumettes pour une rangée de $50$ carrés ?\nd) Avec exactement $100$ allumettes, combien de carrés construit-on ?",
          figure: allumettes([[1, 4], [2, 7], [3, 10]]),
          correction:
            "a) Je compte sur la figure : $4$ allumettes pour $1$ carré, $7$ pour $2$, $10$ pour $3$. Chaque carré ajouté en demande $3$ de plus, car il partage un côté avec le précédent. Donc $13$ allumettes pour $4$ carrés, et $16$ pour $5$.\nb) Inès a raison. Il y a $1$ allumette tout à gauche, puis chaque carré en ajoute $3$ : en haut, en bas et à droite. Pour $n$ carrés : $1 + 3n$, c'est-à-dire $3n + 1$.\nTom compte $4$ allumettes par carré, mais il compte deux fois chaque côté commun. Pour $n = 2$ : $4 \\times 2 = 8$, alors que la figure en montre $7$.\nc) Pour $n = 50$ : $3 \\times 50 + 1 = 151$ allumettes.\nd) Je remonte le calcul : j'enlève l'allumette de gauche, $100 - 1 = 99$, puis je fais des paquets de $3$ : $99 \\div 3 = 33$. Vérification : $3 \\times 33 + 1 = 100$.\n⛔ Le piège : donner raison à Tom après avoir essayé $n = 1$ seulement, car $4 \\times 1 = 4$ et $3 \\times 1 + 1 = 4$. Un essai qui marche ne prouve rien ; celui de $n = 2$ les départage.\nRéponse : $13$ et $16$ allumettes ; Inès a raison, $3n + 1$ ; $151$ allumettes pour $50$ carrés ; $33$ carrés avec $100$ allumettes.",
          schema: tableau(["carrés", "1", "2", "3", "4", "5"], ["allumettes", 4, 7, 10, 13, 16]),
          micros: ["litteral_expression_traduire", "litteral_expression_substituer", "litteral_expression_defi"],
        },
        {
          titre: "Trois entiers qui se suivent",
          enonce:
            "Maé choisit trois nombres entiers qui se suivent, comme $8$, $9$ et $10$, et les additionne.\na) Faire le calcul pour $8$, $9$, $10$, puis pour $30$, $31$, $32$. Comparer chaque somme au nombre du milieu.\nb) On note $n$ le plus petit des trois. Écrire les deux suivants, puis leur somme à tous les trois, et la réduire.\nc) Montrer que cette somme est toujours le triple du nombre du milieu.\nd) Trois entiers qui se suivent ont pour somme $72$. Quels sont-ils ?",
          correction:
            "a) $8 + 9 + 10 = 27$, et $27 = 3 \\times 9$. $30 + 31 + 32 = 93$, et $93 = 3 \\times 31$. Les deux fois, la somme est le triple du nombre du milieu.\nb) Si le premier est $n$, les suivants sont $n + 1$ et $n + 2$. Leur somme : $n + n + 1 + n + 2 = 3n + 3$.\nc) Le nombre du milieu est $n + 1$. Son triple, c'est lui ajouté trois fois : $n + 1 + n + 1 + n + 1 = 3n + 3$. C'est la même expression que la somme du b) : la propriété est vraie pour TOUS les entiers, pas seulement pour ceux qu'on a essayés.\nd) La somme est le triple du nombre du milieu : le milieu vaut $72 \\div 3 = 24$. Les trois entiers sont $23$, $24$ et $25$, et $23 + 24 + 25 = 72$.\n⛔ Le piège : conclure dès le a) que « c'est toujours vrai ». Deux essais montrent deux exemples ; seul le calcul avec la lettre $n$ couvre tous les entiers d'un coup.\n⛔ Autre piège : appeler les trois nombres $n$, $m$ et $p$. Trois lettres différentes désignent trois nombres quelconques, qui ne se suivent pas forcément.\nRéponse : la somme vaut $3n + 3$, le triple du nombre du milieu $n + 1$ ; les entiers cherchés sont $23$, $24$ et $25$.",
          schema: grille(["les trois entiers", "leur somme"], [["8 + 9 + 10", "27 = 3 × 9"], ["30 + 31 + 32", "93 = 3 × 31"], ["23 + 24 + 25", "72 = 3 × 24"]]),
          micros: ["litteral_expression_traduire", "litteral_expression_reduire", "litteral_expression_defi"],
        },
        {
          titre: "L'eau de la douche",
          enonce:
            "Une pomme de douche classique débite environ $12$ litres d'eau par minute ; une pomme de douche économe, environ $6$ litres par minute.\na) Écrire le volume d'eau utilisé pendant une douche de $t$ minutes, avec chaque pomme.\nb) Calculer ces volumes pour une douche de $5$ minutes, puis de $10$ minutes. Un bain demande environ $150$ litres : une douche classique de $15$ minutes en utilise-t-elle plus ou moins ?\nc) Une famille prend $4$ douches de $5$ minutes par jour. Écrire, en fonction du nombre $j$ de jours, l'eau utilisée avec chaque pomme, puis l'économie réalisée, en réduisant.\nd) Calculer l'économie sur une année de $365$ jours.",
          correction:
            "a) Chaque minute ajoute le même volume. Pour $t$ minutes, la pomme classique utilise $12t$ litres, la pomme économe $6t$ litres.\nb) Pour $t = 5$ : $12 \\times 5 = 60$ L et $6 \\times 5 = 30$ L. Pour $t = 10$ : $12 \\times 10 = 120$ L et $6 \\times 10 = 60$ L.\nUne douche classique de $15$ minutes : $12 \\times 15 = 180$ L, c'est plus qu'un bain de $150$ L.\nc) Chaque jour, la famille se douche $4 \\times 5 = 20$ minutes. En $j$ jours, avec la pomme classique : $20 \\times 12j = 240j$ litres ; avec la pomme économe : $20 \\times 6j = 120j$ litres.\nL'économie est la différence : $240j - 120j = 120j$ litres.\nd) Pour $j = 365$ : $120 \\times 365 = 43\\,800$ L, soit près de $44$ m³ d'eau (un mètre cube, c'est $1\\,000$ L).\n⛔ Le piège au c) : additionner $4 + 5 + 12 = 21$ au lieu de multiplier. Quatre douches de cinq minutes, c'est $4 \\times 5$ minutes, et chaque minute coûte $12$ litres.\nRéponse : $12t$ et $6t$ litres ; $60$ L et $30$ L pour $5$ minutes, $120$ L et $60$ L pour $10$ minutes ; l'économie vaut $120j$ litres, soit $43\\,800$ L en un an.",
          schema: grille(["douche de", "5 min", "10 min", "15 min"], [["12t", 60, 120, 180], ["6t", 30, 60, 90]]),
          micros: ["litteral_expression_traduire", "litteral_expression_substituer", "litteral_expression_reduire"],
        },
      ],
    },
  ],
};
