// ─── Fiche d'exercices : nombres premiers et décomposition (4e) ──────────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-nombres-premiers.tsx` et
// sur les quatre micros du coach de 4e (notionId nombre_premier). On reste dans
// le programme de 4e : la définition (exactement deux diviseurs), la liste
// jusqu'à 30 à connaître, la MÉTHODE pour décider jusqu'à 100 (essais par 2, 3,
// 5, 7 et le point d'arrêt), la décomposition en facteurs premiers et ses
// usages — simplifier une fraction, compter les diviseurs.
// ⛔ Ni PGCD ni PPCM : ils arrivent en 3e (`maths-3e-arithmetique.tsx`), et le
// mot n'est pas prononcé. ⛔ Les multiples, critères et la division euclidienne
// ont leur propre feuille (notion `divisibilite`) : ils ne servent ici que
// d'outils.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 91 = 7 × 13 comme
// exemple, ni 83, 97, 12, 60, 84, 126, 36, 45, 225, ni 90/126, ni les faux amis
// 9, 15, 21, 27 comme exercice. ⛔ Ni ceux de la feuille de 3e : ni 28, 100 = 7 ×
// 14 + 2, 31, 39, 49, 53, 87, ni le crible 60-80, ni 90, 150, 132, 360, 72, 221,
// 223, ni la devinette 37, ni les sacs, la terrasse, Jupiter ou le club.
//
// Les pièges nommés : 1 pris pour premier (1, 2), 1 × n pris pour un rectangle
// (3), essayer tous les nombres au lieu de s'arrêter (4), impair pris pour
// premier (5, 12), 49 gardé dans le crible (6), un facteur non premier laissé
// dans la décomposition (7, 8), la recette « 2, 3, 5, 7 » appliquée au-delà de
// 120 (9, 15, 20), une fraction simplifiée à moitié (10), un faux couple de
// jumeaux (11), un exemple pris pour une preuve (12), le choix « zéro fois »
// oublié (13), un facteur présent mais pas assez de fois (14), un carré qui
// n'est pas celui d'un premier (16), un diviseur composé oublié (17, 18), une
// fraction déjà irréductible qu'on veut simplifier (19).
//
// Les chiffres du monde, et d'où ils viennent :
// - cigales périodiques (genre Magicicada) : cycles de 13 et 17 ans (USDA
//   Forest Service, « Periodical cicadas ») ; l'idée que le cycle premier les
//   protège est une HYPOTHÈSE (Goles, Schulz et Markus, « Prime number
//   selection of cycles in a predator-prey model », Complexity 6(4), 2001) ;
//   les prédateurs à cycles de 2 à 6 ans sont imaginés pour l'exercice — ex. 17 ;
// - Tour de France 2025 : 23 équipes de 8 coureurs, 184 partants (ASO, liste
//   des engagés, Grand Départ de Lille Métropole le 5 juillet 2025) ; la photo
//   en rectangle et les deux abandons sont imaginés — ex. 18 ;
// - vélo de route : pédalier 50-34 dents (compact) et cassette 11-30 dents,
//   qui compte des pignons de 15, 24 et 27 dents (Shimano 105 R7100, fiches
//   techniques FC-R7100 et CS-R7100) — ex. 19 ;
// - clés RSA de 2 048 bits, le minimum recommandé (ANSSI, Guide des mécanismes
//   cryptographiques, RGS annexe B1) : 2^2048 a 617 chiffres, recalculé par le
//   vérificateur — ex. 20.
//
// Les corrigés sont écrits à la première personne (« je divise »), comme les
// feuilles de 3e.
//
// ⭐ LES SCHÉMAS : vingt corrigés dessinés sur vingt. L'échelle des divisions
// (`echelles`), le crible (`crible`, et la grille nue `cases` pour l'énoncé de
// l'exercice 2), l'ARBRE de facteurs (`arbreFacteurs`, SVG local : chaque
// nœud est le produit de ses deux branches, les feuilles premières entourées
// en rouge), les jetons rangés en rectangle (`jetons`, SVG local) et des
// tableaux simples (`grille`). Texte nu (2², jamais de `$`). Le script de
// recalcul RELIT leurs arguments : les écrire en clair, en JSON (guillemets
// doubles, sur une ligne).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-nombres-premiers-4e.mjs`
// — les diviseurs par essais un à un, « premier » par comptage des diviseurs,
// les restes par `%`, les fractions irréductibles par fractions exactes.
//
// Micro-compétences : premier_definition (1, 2, 3, 12, 16, 17), premier_determiner
// (4, 5, 6, 11, 15), premier_decomposer (7, 8, 9, 10, 13, 14, 17, 18, 19, 20),
// premier_defi (11, 12, 13, 15, 16, 17, 18, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/** Deux dessins côte à côte : l'un sous l'autre sur téléphone, côte à côte à
 *  partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

// Un tableau simple : une ligne d'en-tête, des lignes de cases, et les lignes
// à mettre en rouge (numéros à partir de 0).
const grille = (entete: string[], lignes: string[][], surligne: number[] = []) => (
  <div className="mx-auto w-full max-w-[22rem] overflow-x-auto print:max-w-[16rem]">
    <table className="w-full border-collapse text-center text-[13px] print:text-[10px]">
      <thead>
        <tr>
          {entete.map((e, i) => (
            <th key={i} className="border border-slate-300 bg-slate-100 px-2 py-1 font-semibold text-slate-700">
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i}>
            {l.map((v, j) => (
              <td
                key={j}
                className="border border-slate-300 px-2 py-0.5 text-slate-800"
                style={surligne.includes(i) ? { color: "#b91c1c", fontWeight: 700 } : undefined}
              >
                {v}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ⭐ L'ÉCHELLE DES DIVISIONS : à gauche le nombre, à droite le premier qui le
// divise, et on descend jusqu'à 1. `e` : les étapes [nombre, diviseur premier] ;
// `r` : la décomposition lue.
const echelles = (...colonnes: { e: [number, number][]; r: string }[]) => (
  <div className="mx-auto flex w-full max-w-[24rem] flex-wrap items-start justify-center gap-x-6 gap-y-3 print:max-w-[18rem]">
    {colonnes.map((c, k) => (
      <figure key={k} className="text-center">
        <table className="mx-auto border-collapse font-mono text-[14px] print:text-[10px]">
          <tbody>
            {c.e.map(([n, p], i) => (
              <tr key={i}>
                <td className="border-r-2 border-slate-500 px-2 text-right text-slate-800">{n}</td>
                <td className="px-2 text-left font-bold text-red-700">{p}</td>
              </tr>
            ))}
            <tr>
              <td className="border-r-2 border-slate-500 px-2 text-right text-slate-800">1</td>
              <td />
            </tr>
          </tbody>
        </table>
        <figcaption className="mt-1 text-[12px] font-semibold text-slate-700 print:text-[9px]">{c.r}</figcaption>
      </figure>
    ))}
  </div>
);

// La grille des nombres de `de` à `a` : les premiers en rouge, les autres barrés.
const crible = (de: number, a: number, premiers: number[]) => (
  <div
    role="img"
    aria-label={`Les nombres de ${de} à ${a}. Les nombres premiers : ${premiers.join(", ")}`}
    className="mx-auto grid w-full max-w-[18rem] grid-cols-7 gap-1 print:max-w-[13rem]"
  >
    {Array.from({ length: a - de + 1 }, (_, i) => de + i).map((n) => (
      <div
        key={n}
        className={`rounded border py-1 text-center font-mono text-[13px] print:text-[10px] ${
          premiers.includes(n) ? "border-red-600 bg-red-50 font-bold text-red-700" : "border-slate-200 text-slate-400 line-through"
        }`}
      >
        {n}
      </div>
    ))}
  </div>
);

// La même grille, NUE : pour l'énoncé, rien n'est encore barré.
const cases = (de: number, a: number) => (
  <div
    role="img"
    aria-label={`Les nombres de ${de} à ${a}`}
    className="mx-auto grid w-full max-w-[18rem] grid-cols-7 gap-1 print:max-w-[13rem]"
  >
    {Array.from({ length: a - de + 1 }, (_, i) => de + i).map((n) => (
      <div key={n} className="rounded border border-slate-300 py-1 text-center font-mono text-[13px] text-slate-800 print:text-[10px]">
        {n}
      </div>
    ))}
  </div>
);

// ⭐ L'ARBRE DE FACTEURS : un nœud est [valeur, branche gauche, branche droite],
// une feuille est un nombre. Les feuilles (les facteurs premiers) sont
// entourées en rouge. La largeur suit le nombre de feuilles, 44 unités chacune.
type Arbre = number | [number, Arbre, Arbre];
const nbFeuilles = (a: Arbre): number => (typeof a === "number" ? 1 : nbFeuilles(a[1]) + nbFeuilles(a[2]));
const hauteur = (a: Arbre): number => (typeof a === "number" ? 0 : 1 + Math.max(hauteur(a[1]), hauteur(a[2])));
const arbreFacteurs = (racine: Arbre, legende: string) => {
  const L = 44;
  const H = 46;
  const noeuds: { x: number; y: number; v: number; feuille: boolean }[] = [];
  const traits: [number, number, number, number][] = [];
  const placer = (a: Arbre, x0: number, d: number): number => {
    const y = 18 + d * H;
    if (typeof a === "number") {
      const x = x0 + L / 2;
      noeuds.push({ x, y, v: a, feuille: true });
      return x;
    }
    const xg = placer(a[1], x0, d + 1);
    const xd = placer(a[2], x0 + nbFeuilles(a[1]) * L, d + 1);
    const x = (xg + xd) / 2;
    traits.push([x, y + 9, xg, y + H - 11], [x, y + 9, xd, y + H - 11]);
    noeuds.push({ x, y, v: a[0], feuille: false });
    return x;
  };
  placer(racine, 0, 0);
  const W = nbFeuilles(racine) * L;
  const Ht = 18 + hauteur(racine) * H + 16;
  return (
    <figure className="text-center">
      <svg
        viewBox={`0 0 ${W} ${Ht}`}
        role="img"
        aria-label={`Arbre de facteurs : ${legende}`}
        className="mx-auto w-full max-w-[12rem] print:max-w-[9rem]"
      >
        {traits.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth={1.5} />
        ))}
        {noeuds.map((n, i) => (
          <g key={i}>
            {n.feuille && <circle cx={n.x} cy={n.y} r={13} fill="#fef2f2" stroke="#dc2626" strokeWidth={2} />}
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={n.feuille ? "#b91c1c" : "#1e293b"}>
              {n.v}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-1 text-[12px] font-semibold text-slate-700 print:text-[9px]">{legende}</figcaption>
    </figure>
  );
};

// Les JETONS rangés en rectangle : `rangees` lignes de `parRangee` jetons.
const jetons = (rangees: number, parRangee: number, legende: string) => {
  const p = 20;
  const W = parRangee * p + 8;
  const Ht = rangees * p + 8;
  return (
    <figure className="text-center">
      <svg
        viewBox={`0 0 ${W} ${Ht}`}
        role="img"
        aria-label={`${rangees} rangée(s) de ${parRangee} jetons : ${legende}`}
        className="mx-auto w-full max-w-[14rem] print:max-w-[10rem]"
      >
        {Array.from({ length: rangees * parRangee }, (_, i) => (
          <circle key={i} cx={4 + p / 2 + (i % parRangee) * p} cy={4 + p / 2 + Math.floor(i / parRangee) * p} r={7} fill="#fed7aa" stroke="#ea580c" strokeWidth={1.5} />
        ))}
      </svg>
      <figcaption className="mt-1 text-[12px] font-semibold text-slate-700 print:text-[9px]">{legende}</figcaption>
    </figure>
  );
};

export const exercicesNombresPremiers4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "nombre-premier",
  titre: "Nombres premiers et décomposition",
  accroche:
    "Vingt exercices, du geste seul au problème : compter les diviseurs, connaître la liste jusqu'à 30, décider si un nombre est premier sans tout essayer, décomposer avec une échelle ou un arbre, puis s'en servir pour simplifier une fraction ou compter des diviseurs. Des cigales qui sortent de terre tous les 13 ou 17 ans, la photo du Tour de France, les vitesses d'un vélo et le cadenas des sites Internet. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé et un schéma.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/nombre-premier", titre: "Nombres premiers et décomposition" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je justifie par un diviseur trouvé ou par des essais qui échouent, jamais par une impression.",
      rappel: [
        "Un nombre PREMIER a EXACTEMENT deux diviseurs : $1$ et lui-même. $1$ n'est pas premier (un seul diviseur) ; $2$ est le seul premier pair.",
        "À connaître par cœur : $2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$, $29$.",
        "Pour décider jusqu'à $100$ : j'essaie $2$, $3$, $5$ et $7$. Si aucun ne divise, le nombre est premier, car $11 \\times 11 = 121$ dépasse $100$.",
        "DÉCOMPOSER : je divise par le plus petit nombre premier possible, puis je recommence avec le quotient, jusqu'à $1$.",
      ],
      exercices: [
        {
          enonce: "Pour chaque nombre, écrire la liste de TOUS ses diviseurs, puis dire s'il est premier.\na) $17$\nb) $25$\nc) $1$\nd) $33$",
          correction:
            "Je compte les diviseurs : un nombre premier en a EXACTEMENT deux, $1$ et lui-même.\na) Le seul produit égal à $17$ est $1 \\times 17$. Les diviseurs de $17$ sont $1$ et $17$ : deux diviseurs, $17$ est premier.\nb) $25 = 1 \\times 25 = 5 \\times 5$. Les diviseurs de $25$ sont $1$, $5$ et $25$ : trois diviseurs, $25$ n'est pas premier.\nc) Le seul diviseur de $1$ est $1$ : un seul diviseur, $1$ n'est pas premier.\nd) $33 = 1 \\times 33 = 3 \\times 11$. Les diviseurs de $33$ sont $1$, $3$, $11$ et $33$ : quatre diviseurs, $33$ n'est pas premier.\n⛔ Le piège : dire que $1$ est premier parce qu'il n'est divisible « que par $1$ et par lui-même ». Ici, « $1$ » et « lui-même » sont le même nombre : cela fait UN diviseur, pas deux.\nRéponse : seul $17$ est premier ; $25$, $1$ et $33$ ne le sont pas.",
          schema: grille(
            ["nombre", "ses diviseurs", "combien", "premier ?"],
            [["17", "1, 17", "2", "oui"], ["25", "1, 5, 25", "3", "non"], ["1", "1", "1", "non"], ["33", "1, 3, 11, 33", "4", "non"]],
            [0],
          ),
          micros: ["premier_definition"],
        },
        {
          enonce:
            "Voici les nombres de $1$ à $30$.\na) Quels sont les nombres premiers de cette grille ?\nb) Combien y en a-t-il ?\nc) Lequel est pair ?\nd) Pourquoi $1$ n'est-il pas dans la liste ?",
          figure: cases(1, 30),
          correction:
            "Je garde $2$ et je barre tous ses multiples : $4$, $6$, $8$… Je garde $3$ et je barre ses multiples qui restent : $9$, $15$, $21$, $27$. Je garde $5$ et je barre $25$. Je peux m'arrêter là : $7 \\times 7 = 49$ dépasse $30$.\na) Il reste $2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$ et $29$.\nb) Il y en a $10$. Cette liste est à savoir par cœur.\nc) $2$ est le seul nombre premier pair : tous les autres nombres pairs sont des multiples de $2$.\nd) $1$ n'a qu'un seul diviseur, lui-même. Il en faut exactement deux.\n⛔ Le piège : garder $25$, qui n'est ni pair ni multiple de $3$. Il se barre avec $5$ : $25 = 5 \\times 5$.\nRéponse : $2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$ et $29$, soit $10$ nombres premiers.",
          schema: crible(1, 30, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]),
          micros: ["premier_definition"],
        },
        {
          enonce:
            "Léa range des jetons en rectangle complet : au moins $2$ rangées, et au moins $2$ jetons par rangée.\na) Avec $10$ jetons, quel rectangle peut-elle faire ?\nb) Et avec $11$ jetons ?\nc) Quel est le lien avec les nombres premiers ?",
          correction:
            "Un rectangle de $r$ rangées de $j$ jetons contient $r \\times j$ jetons : je dois écrire le nombre de jetons comme un produit.\na) $10 = 2 \\times 5$ : $2$ rangées de $5$ jetons (ou $5$ rangées de $2$, le même rectangle tourné).\nb) $11$ ne s'écrit que $1 \\times 11$ : ni $2$, ni $3$, ni $4$, ni $5$ ne divisent $11$. Aucun rectangle n'est possible, les jetons restent sur une seule ligne.\nc) Si le nombre de jetons est premier, ses seuls diviseurs sont $1$ et lui-même : le seul rangement est une ligne. $11$ est premier, $10$ ne l'est pas.\n⛔ Le piège : compter $1 \\times 11$ comme un rectangle. Une seule rangée, c'est une ligne, et l'énoncé demande au moins $2$ rangées.\nRéponse : a) $2$ rangées de $5$ ; b) aucun rectangle ; c) avec un nombre premier de jetons, aucun rectangle n'est possible.",
          schema: deux(jetons(2, 5, "10 = 2 × 5"), jetons(1, 11, "11 : une seule ligne")),
          micros: ["premier_definition"],
        },
        {
          enonce: "a) Pour savoir si $89$ est premier, quels nombres faut-il essayer comme diviseurs ? Pourquoi peut-on s'arrêter ?\nb) $89$ est-il premier ?",
          correction:
            "a) J'essaie les nombres premiers $2$, $3$, $5$, $7$… tant que leur carré ne dépasse pas $89$. $7 \\times 7 = 49$ ne dépasse pas $89$, mais $11 \\times 11 = 121$ le dépasse : j'essaie $2$, $3$, $5$ et $7$, et je m'arrête.\nPourquoi : si $89$ s'écrivait $a \\times b$, l'un des deux facteurs vaudrait au plus $9$, car $10 \\times 10 = 100$ dépasse $89$. Et un nombre de $2$ à $9$ est divisible par $2$, $3$, $5$ ou $7$.\nb) Par $2$ : $89$ est impair, non. Par $3$ : $8 + 9 = 17$, pas dans la table de $3$, non. Par $5$ : il ne finit ni par $0$ ni par $5$, non. Par $7$ : $89 = 7 \\times 12 + 5$, reste $5$, non.\nAucun essai ne tombe juste : $89$ est premier.\n⛔ Le piège : essayer tous les nombres jusqu'à $88$. Quatre essais suffisent, parce que $11 \\times 11$ dépasse $89$.\nRéponse : on essaie $2$, $3$, $5$ et $7$ ; $89$ est premier.",
          schema: grille(
            ["essai", "division", "reste"],
            [["2", "89 = 2 × 44 + 1", "1"], ["3", "89 = 3 × 29 + 2", "2"], ["5", "89 = 5 × 17 + 4", "4"], ["7", "89 = 7 × 12 + 5", "5"]],
          ),
          micros: ["premier_determiner"],
        },
        {
          enonce: "Parmi ces nombres, lesquels sont premiers ? Justifier.\n$51$ ; $57$ ; $59$ ; $65$ ; $85$",
          correction:
            "Tous ces nombres sont plus petits que $100$ : j'essaie $2$, $3$, $5$ et $7$.\n$51$ : $5 + 1 = 6$, il est divisible par $3$. $51 = 3 \\times 17$, pas premier.\n$57$ : $5 + 7 = 12$, il est divisible par $3$. $57 = 3 \\times 19$, pas premier.\n$59$ : impair ; $5 + 9 = 14$, pas par $3$ ; il ne finit ni par $0$ ni par $5$ ; $59 = 7 \\times 8 + 3$, pas par $7$. Il est premier.\n$65$ finit par $5$ : $65 = 5 \\times 13$, pas premier.\n$85$ finit par $5$ : $85 = 5 \\times 17$, pas premier.\n⛔ Le piège : croire $51$ et $57$ premiers parce qu'ils sont impairs et « ont l'air seuls ». La somme des chiffres les démasque en une seconde.\nRéponse : seul $59$ est premier.",
          schema: grille(
            ["nombre", "plus petit diviseur premier", "premier ?"],
            [["51", "3", "non"], ["57", "3", "non"], ["59", "aucun", "oui"], ["65", "5", "non"], ["85", "5", "non"]],
            [2],
          ),
          micros: ["premier_determiner"],
        },
        {
          enonce: "a) Donner tous les nombres premiers compris entre $31$ et $50$.\nb) Pourquoi faut-il faire l'essai par $7$, et pas seulement par $2$, $3$ et $5$ ?",
          correction:
            "Je barre d'abord les nombres pairs : ils sont divisibles par $2$. Restent $31$, $33$, $35$, $37$, $39$, $41$, $43$, $45$, $47$ et $49$.\nPar $3$ (somme des chiffres) : $33$, $39$ et $45$, barrés.\nPar $5$ : $35$, barré ($45$ l'est déjà).\nPar $7$ : $49 = 7 \\times 7$, barré.\nJe m'arrête : $11 \\times 11 = 121$ dépasse $50$.\na) Il reste $31$, $37$, $41$, $43$ et $47$.\nb) $49$ passe les essais par $2$, $3$ et $5$, et pourtant $49 = 7 \\times 7$. Comme $7 \\times 7$ ne dépasse pas $50$, l'essai par $7$ est obligatoire.\n⛔ Le piège : garder $49$ parce qu'il est impair et que ni $3$ ni $5$ ne le divisent.\nRéponse : $31$, $37$, $41$, $43$ et $47$.",
          schema: crible(31, 50, [31, 37, 41, 43, 47]),
          micros: ["premier_determiner"],
        },
        {
          enonce: "Décomposer en produit de facteurs premiers.\na) $76$\nb) $98$\nc) $117$",
          correction:
            "Je divise par le plus petit nombre premier possible, puis je recommence avec le quotient, jusqu'à $1$.\na) $76 \\div 2 = 38$, $38 \\div 2 = 19$, et $19$ est premier : $19 \\div 19 = 1$. Donc $76 = 2 \\times 2 \\times 19 = 2^2 \\times 19$.\nb) $98 \\div 2 = 49$, $49 \\div 7 = 7$, $7 \\div 7 = 1$. Donc $98 = 2 \\times 7 \\times 7 = 2 \\times 7^2$.\nc) $117$ est impair, et $1 + 1 + 7 = 9$ : il est divisible par $3$. $117 \\div 3 = 39$, $39 \\div 3 = 13$, $13 \\div 13 = 1$. Donc $117 = 3 \\times 3 \\times 13 = 3^2 \\times 13$.\n⭐ Contrôle : je remultiplie. $9 \\times 13 = 117$.\n⛔ Le piège : écrire $117 = 9 \\times 13$ et s'arrêter. $9 = 3 \\times 3$ n'est pas premier : la décomposition n'est finie que lorsque TOUS les facteurs le sont.\nRéponse : $76 = 2^2 \\times 19$ ; $98 = 2 \\times 7^2$ ; $117 = 3^2 \\times 13$.",
          schema: echelles(
            { e: [[76, 2], [38, 2], [19, 19]], r: "76 = 2² × 19" },
            { e: [[98, 2], [49, 7], [7, 7]], r: "98 = 2 × 7²" },
            { e: [[117, 3], [39, 3], [13, 13]], r: "117 = 3² × 13" },
          ),
          micros: ["premier_decomposer"],
        },
        {
          enonce:
            "Tom et Inès décomposent $100$ avec un arbre. Tom commence par $100 = 4 \\times 25$, Inès par $100 = 10 \\times 10$.\na) Terminer les deux arbres.\nb) Écrire la décomposition obtenue par chacun. Que remarque-t-on ?",
          correction:
            "Dans un arbre, j'écris sous chaque nombre deux facteurs dont il est le produit, et je continue tant qu'un facteur n'est pas premier. Les facteurs premiers sont les feuilles de l'arbre.\na) Tom : $4 = 2 \\times 2$ et $25 = 5 \\times 5$. Inès : chaque $10$ donne $2 \\times 5$.\nb) Tom : $100 = 2 \\times 2 \\times 5 \\times 5$. Inès : $100 = 2 \\times 5 \\times 2 \\times 5$. En rangeant les facteurs, c'est la même écriture : $100 = 2^2 \\times 5^2$.\n⭐ Quel que soit le premier pas, on arrive à la même décomposition : elle est UNIQUE, à l'ordre des facteurs près.\n⛔ Le piège : s'arrêter à $100 = 10 \\times 10$. $10$ n'est pas premier ; l'arbre n'est fini que lorsque toutes ses feuilles sont des nombres premiers.\nRéponse : les deux arbres donnent $100 = 2^2 \\times 5^2$.",
          schema: deux(
            arbreFacteurs([100, [4, 2, 2], [25, 5, 5]], "Tom : 100 = 2² × 5²"),
            arbreFacteurs([100, [10, 2, 5], [10, 2, 5]], "Inès : 100 = 2² × 5²"),
          ),
          micros: ["premier_decomposer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je décompose d'abord, je conclus ensuite, et je vérifie en remultipliant.",
      rappel: [
        "Tout entier plus grand que $1$ se décompose en produit de facteurs premiers d'UNE seule façon, à l'ordre près. Un nombre divise $N$ quand tous ses facteurs premiers sont dans $N$, avec au moins autant d'exemplaires.",
        "Simplifier une fraction : je décompose le haut et le bas, puis je barre les facteurs communs. Ce qui reste est irréductible.",
        "Compter les diviseurs : pour chaque facteur premier, j'ai « nombre d'apparitions plus un » choix, et je multiplie ces choix.",
        "Au-delà de $100$, je continue les essais tant que le carré du nombre premier essayé ne dépasse pas le nombre testé.",
      ],
      exercices: [
        {
          enonce:
            "a) Décomposer $2\\,024$ en produit de facteurs premiers.\nb) Décomposer $2\\,025$.\nc) En rangeant ses facteurs en deux paquets identiques, montrer que $2\\,025$ est le carré d'un entier.",
          correction:
            "a) $2\\,024$ est pair : $2\\,024 \\div 2 = 1\\,012$, $1\\,012 \\div 2 = 506$, $506 \\div 2 = 253$.\n$253$ est impair, $2 + 5 + 3 = 10$ (pas par $3$), il ne finit ni par $0$ ni par $5$, et $253 = 7 \\times 36 + 1$ (pas par $7$). J'essaie $11$ : $253 = 11 \\times 23$, et $23$ est premier.\nDonc $2\\,024 = 2 \\times 2 \\times 2 \\times 11 \\times 23 = 2^3 \\times 11 \\times 23$.\nb) $2\\,025$ est impair et $2 + 0 + 2 + 5 = 9$ : je commence par $3$. $2\\,025 \\div 3 = 675$, $675 \\div 3 = 225$, $225 \\div 3 = 75$, $75 \\div 3 = 25$, $25 \\div 5 = 5$, $5 \\div 5 = 1$.\nDonc $2\\,025 = 3 \\times 3 \\times 3 \\times 3 \\times 5 \\times 5 = 3^4 \\times 5^2$.\nc) Je fais deux paquets identiques : $(3 \\times 3 \\times 5) \\times (3 \\times 3 \\times 5) = 45 \\times 45$. Donc $2\\,025 = 45^2$.\n⭐ Contrôle : $45 \\times 45 = 2\\,025$.\n⛔ Le piège au a) : croire $253$ premier parce que ni $2$, ni $3$, ni $5$, ni $7$ ne le divisent. $253$ dépasse $100$ : il faut aussi essayer $11$, car $11 \\times 11 = 121$ ne dépasse pas $253$.\nRéponse : $2\\,024 = 2^3 \\times 11 \\times 23$ ; $2\\,025 = 3^4 \\times 5^2 = 45^2$.",
          schema: echelles(
            { e: [[2024, 2], [1012, 2], [506, 2], [253, 11], [23, 23]], r: "2024 = 2³ × 11 × 23" },
            { e: [[2025, 3], [675, 3], [225, 3], [75, 3], [25, 5], [5, 5]], r: "2025 = 3⁴ × 5²" },
          ),
          micros: ["premier_decomposer"],
        },
        {
          enonce: "Rendre chaque fraction irréductible, en décomposant le numérateur et le dénominateur.\na) $\\dfrac{105}{147}$\nb) $\\dfrac{182}{286}$",
          correction:
            "Je décompose le haut et le bas, puis je barre les facteurs premiers communs, un par un.\na) $105 = 3 \\times 5 \\times 7$ et $147 = 3 \\times 7 \\times 7$. En commun : un $3$ et un $7$. Je les barre : $\\dfrac{105}{147} = \\dfrac{5}{7}$.\nb) $182 = 2 \\times 7 \\times 13$ et $286 = 2 \\times 11 \\times 13$. En commun : $2$ et $13$. Je les barre : $\\dfrac{182}{286} = \\dfrac{7}{11}$.\n⭐ Contrôle : $5$ et $7$ n'ont plus de facteur commun, ni $7$ et $11$ : les deux fractions sont irréductibles.\n⛔ Le piège au b) : simplifier par $2$ et s'arrêter à $\\dfrac{91}{143}$, qui a l'air irréductible. Or $91 = 7 \\times 13$ et $143 = 11 \\times 13$ : il reste un $13$ à barrer.\nRéponse : $\\dfrac{5}{7}$ et $\\dfrac{7}{11}$.",
          schema: grille(
            ["nombre", "facteurs premiers"],
            [["105", "3 × 5 × 7"], ["147", "3 × 7 × 7"], ["il reste", "5 / 7"], ["182", "2 × 7 × 13"], ["286", "2 × 11 × 13"], ["il reste", "7 / 11"]],
            [2, 5],
          ),
          micros: ["premier_decomposer"],
        },
        {
          enonce:
            "Deux nombres premiers dont la différence vaut $2$ sont appelés « jumeaux ».\na) Trouver tous les nombres premiers compris entre $40$ et $75$.\nb) En déduire tous les couples de nombres premiers jumeaux entre $40$ et $75$.\nc) Pourquoi le nombre placé entre deux jumeaux est-il toujours pair ?",
          correction:
            "a) Je barre les nombres pairs. Parmi les impairs, je barre par $3$ : $45$, $51$, $57$, $63$, $69$, $75$ ; par $5$ : $55$ et $65$ ; par $7$ : $49$. Je m'arrête : $11 \\times 11 = 121$ dépasse $75$.\nIl reste $41$, $43$, $47$, $53$, $59$, $61$, $67$, $71$ et $73$.\nb) Je cherche dans la liste deux nombres séparés de $2$ : $41$ et $43$, $59$ et $61$, $71$ et $73$.\nc) Deux nombres premiers plus grands que $2$ sont impairs. Entre deux nombres impairs qui se suivent, il y a toujours un nombre pair : $42$, $60$, $72$.\n⛔ Le piège : prendre $47$ et $49$. $49 = 7 \\times 7$ n'est pas premier : il faut l'essai par $7$.\nRéponse : $41$ et $43$, $59$ et $61$, $71$ et $73$.",
          schema: crible(40, 75, [41, 43, 47, 53, 59, 61, 67, 71, 73]),
          micros: ["premier_determiner", "premier_defi"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifier par un contre-exemple ou par une explication.\na) Tout nombre impair est premier.\nb) $2$ est le seul nombre premier pair.\nc) La somme de deux nombres premiers est toujours un nombre premier.\nd) Le produit de deux nombres premiers n'est jamais premier.",
          correction:
            "Pour montrer qu'une phrase est FAUSSE, un seul contre-exemple suffit. Pour montrer qu'elle est VRAIE, il faut une explication qui marche pour tous les nombres.\na) FAUX. $35$ est impair, et $35 = 5 \\times 7$ : il n'est pas premier.\nb) VRAI. Un nombre pair plus grand que $2$ est divisible par $1$, par $2$ et par lui-même : il a au moins trois diviseurs, il n'est pas premier.\nc) FAUX. $3$ et $5$ sont premiers, mais $3 + 5 = 8$ ne l'est pas.\nd) VRAI. Si $p$ et $q$ sont premiers, $p \\times q$ est divisible par $1$, par $p$ et par lui-même : au moins trois diviseurs, puisque $p$ n'est ni $1$ ni $p \\times q$.\n⛔ Le piège au c) : essayer $2 + 3 = 5$ et conclure « vrai ». Un exemple qui marche ne prouve rien ; un contre-exemple, lui, suffit à dire faux.\nRéponse : a) faux ; b) vrai ; c) faux ; d) vrai.",
          schema: grille(
            ["phrase", "exemple testé", "verdict"],
            [["a) impair, donc premier", "35 = 5 × 7", "faux"], ["b) seul premier pair", "2", "vrai"], ["c) somme de premiers", "3 + 5 = 8", "faux"], ["d) produit de premiers", "3 × 5 = 15", "vrai"]],
          ),
          micros: ["premier_definition", "premier_defi"],
        },
        {
          enonce:
            "a) Décomposer $40$, $30$ et $81$ en produits de facteurs premiers.\nb) Sans les lister, trouver combien chacun a de diviseurs.\nc) Vérifier pour $40$ en écrivant la liste de ses diviseurs.\nd) Le plus grand des trois nombres a-t-il le plus de diviseurs ?",
          correction:
            "a) $40 = 2 \\times 2 \\times 2 \\times 5 = 2^3 \\times 5$ ; $30 = 2 \\times 3 \\times 5$ ; $81 = 3 \\times 3 \\times 3 \\times 3 = 3^4$.\nb) Un diviseur se fabrique en choisissant combien de fois je prends chaque facteur premier, de zéro fois jusqu'à son nombre d'apparitions.\n$40$ : le $2$ apparaît $3$ fois, donc $4$ choix (zéro, une, deux ou trois fois) ; le $5$ apparaît $1$ fois, donc $2$ choix. $4 \\times 2 = 8$ diviseurs.\n$30$ : trois facteurs qui apparaissent chacun $1$ fois, donc $2$ choix chacun. $2 \\times 2 \\times 2 = 8$ diviseurs.\n$81$ : le $3$ apparaît $4$ fois, donc $5$ choix. $5$ diviseurs.\nc) Les diviseurs de $40$ sont $1$, $2$, $4$, $5$, $8$, $10$, $20$ et $40$ : il y en a bien $8$.\nd) Non : $81$ est le plus grand, mais il n'a que $5$ diviseurs, contre $8$ pour $40$ et pour $30$.\n⛔ Le piège : oublier le choix « zéro fois ». Pour $40$, on trouverait $3 \\times 1 = 3$ diviseurs, alors que $1$ (aucun facteur pris) en est un.\nRéponse : $40$ et $30$ ont $8$ diviseurs chacun, $81$ en a $5$.",
          schema: grille(
            ["nombre", "décomposition", "choix", "diviseurs"],
            [["40", "2³ × 5", "4 × 2", "8"], ["30", "2 × 3 × 5", "2 × 2 × 2", "8"], ["81", "3⁴", "5", "5"]],
          ),
          micros: ["premier_decomposer", "premier_defi"],
        },
        {
          enonce:
            "Un nombre $N$ s'écrit $N = 2 \\times 3^2 \\times 11$.\na) Calculer $N$.\nb) Sans poser de division, dire si $N$ est divisible par $22$, par $4$, par $33$, par $27$.\nc) Décomposer $6 \\times N$ en produit de facteurs premiers.",
          correction:
            "a) $N = 2 \\times 9 \\times 11 = 18 \\times 11 = 198$.\nb) Un nombre divise $N$ quand tous ses facteurs premiers se trouvent dans $2 \\times 3 \\times 3 \\times 11$, avec au moins autant d'exemplaires.\n$22 = 2 \\times 11$ : les deux y sont. Oui, $198 = 22 \\times 9$.\n$4 = 2 \\times 2$ demande deux $2$ ; $N$ n'en a qu'un. Non.\n$33 = 3 \\times 11$ : les deux y sont. Oui, $198 = 33 \\times 6$.\n$27 = 3 \\times 3 \\times 3$ demande trois $3$ ; $N$ n'en a que deux. Non.\nc) $6 = 2 \\times 3$ : j'ajoute ses facteurs à ceux de $N$. $6 \\times N = 2 \\times 3 \\times 2 \\times 3^2 \\times 11 = 2^2 \\times 3^3 \\times 11$, soit $1\\,188$.\n⛔ Le piège au b) : dire oui pour $4$ parce que $2$ divise $N$. Il faut AUTANT de $2$ que $4$ en demande.\nRéponse : $N = 198$ ; divisible par $22$ et par $33$, pas par $4$ ni par $27$ ; $6 \\times N = 2^2 \\times 3^3 \\times 11$.",
          schema: echelles(
            { e: [[198, 2], [99, 3], [33, 3], [11, 11]], r: "198 = 2 × 3² × 11" },
            { e: [[1188, 2], [594, 2], [297, 3], [99, 3], [33, 3], [11, 11]], r: "1188 = 2² × 3³ × 11" },
          ),
          micros: ["premier_decomposer"],
        },
        {
          enonce:
            "Mathis veut savoir si $143$ est premier. Il essaie $2$, $3$, $5$ et $7$ : aucun ne divise $143$. Il conclut : « $143$ est premier. »\na) Pourquoi ces quatre essais suffisent-ils pour un nombre plus petit que $100$, mais pas ici ?\nb) $143$ est-il premier ?\nc) $149$ est-il premier ? Jusqu'où faut-il essayer ?",
          correction:
            "a) Les essais s'arrêtent quand le carré du nombre premier essayé dépasse le nombre testé. Pour un nombre plus petit que $100$, $11 \\times 11 = 121$ dépasse toujours : $2$, $3$, $5$ et $7$ suffisent. Mais $121$ ne dépasse pas $143$ : il faut aussi essayer $11$.\nb) Par $11$ : $143 = 11 \\times 13$. $143$ n'est pas premier.\nc) $11 \\times 11 = 121$ ne dépasse pas $149$, mais $13 \\times 13 = 169$ le dépasse : j'essaie $2$, $3$, $5$, $7$ et $11$.\nPar $2$ : impair. Par $3$ : $1 + 4 + 9 = 14$, non. Par $5$ : non. Par $7$ : $149 = 7 \\times 21 + 2$, non. Par $11$ : $149 = 11 \\times 13 + 6$, non.\nAucun essai ne tombe juste : $149$ est premier.\n⛔ Le piège : appliquer « $2$, $3$, $5$, $7$ » comme une recette. Elle ne vaut que jusqu'à $120$ ; au-delà, je continue tant que le carré de l'essai ne dépasse pas le nombre.\nRéponse : $143 = 11 \\times 13$ n'est pas premier ; $149$ est premier (essais jusqu'à $11$).",
          schema: grille(
            ["essai", "reste pour 143", "reste pour 149"],
            [["2", "1", "1"], ["3", "2", "2"], ["5", "3", "4"], ["7", "3", "2"], ["11", "0", "6"]],
            [4],
          ),
          micros: ["premier_determiner", "premier_defi"],
        },
        {
          enonce:
            "a) Écrire les diviseurs de $4$, de $9$ et de $25$. Combien chacun en a-t-il ?\nb) Expliquer pourquoi le carré d'un nombre premier a toujours exactement trois diviseurs.\nc) Trouver tous les nombres jusqu'à $100$ qui ont exactement trois diviseurs.",
          correction:
            "a) Diviseurs de $4$ : $1$, $2$, $4$. De $9$ : $1$, $3$, $9$. De $25$ : $1$, $5$, $25$. Chacun en a trois.\nb) Si $p$ est premier, $p \\times p$ ne contient que le facteur $p$, deux fois. Un diviseur prend $p$ zéro, une ou deux fois : c'est $1$, $p$ ou $p \\times p$. Trois choix, donc trois diviseurs.\nc) Le nombre de diviseurs est un produit de « nombres de choix ». Pour obtenir $3$, qui est premier, il faut un seul facteur premier, présent deux fois : le nombre est le carré d'un nombre premier.\n$2 \\times 2 = 4$, $3 \\times 3 = 9$, $5 \\times 5 = 25$, $7 \\times 7 = 49$ ; puis $11 \\times 11 = 121$ dépasse $100$.\n⛔ Le piège : prendre n'importe quel carré. $16 = 2^4$ est un carré, mais il a cinq diviseurs : $1$, $2$, $4$, $8$ et $16$.\nRéponse : $4$, $9$, $25$ et $49$.",
          schema: grille(
            ["nombre", "diviseurs", "combien"],
            [["4", "1, 2, 4", "3"], ["9", "1, 3, 9", "3"], ["25", "1, 5, 25", "3"], ["49", "1, 7, 49", "3"], ["16", "1, 2, 4, 8, 16", "5"]],
            [0, 1, 2, 3],
          ),
          micros: ["premier_defi", "premier_definition"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je traduis en diviseurs ou en facteurs premiers, je calcule, puis j'écris une phrase de réponse.",
      rappel: [
        "Ranger $n$ objets en rectangle, c'est écrire $n = a \\times b$ : les rectangles se lisent dans les diviseurs. Avec un nombre premier d'objets, seule une ligne est possible.",
        "Un cycle qui DIVISE un autre cycle retombe dessus à chaque fois.",
        "Une fraction irréductible donne les plus petits entiers qui gardent le même rapport.",
      ],
      exercices: [
        {
          titre: "Les cigales à cycle premier",
          enonce:
            "En Amérique du Nord, certaines cigales passent $13$ ans ou $17$ ans sous terre, puis sortent toutes la même année. Des biologistes y voient une protection contre les prédateurs. Imaginons des prédateurs dont la population culmine tous les $2$, $3$, $4$, $5$ ou $6$ ans : si le cycle d'un prédateur DIVISE celui des cigales, il est au rendez-vous à chacune de leurs sorties.\na) Pour chaque cycle de $12$ à $18$ ans, donner sa décomposition en facteurs premiers, ou dire qu'il est premier.\nb) Pour chaque cycle, quels prédateurs sont au rendez-vous à chaque sortie ?\nc) Quels cycles échappent à tous ces prédateurs ? Qu'ont-ils en commun ?",
          correction:
            "a) $12 = 2^2 \\times 3$ ; $13$ est premier ; $14 = 2 \\times 7$ ; $15 = 3 \\times 5$ ; $16 = 2^4$ ; $17$ est premier ; $18 = 2 \\times 3^2$.\nb) Un prédateur est au rendez-vous si son cycle divise celui des cigales, donc si ses facteurs premiers se trouvent dans la décomposition.\n$12$ : $2$, $3$, $4$ et $6$. $13$ : aucun. $14$ : $2$. $15$ : $3$ et $5$. $16$ : $2$ et $4$. $17$ : aucun. $18$ : $2$, $3$ et $6$.\nc) Seuls $13$ et $17$ n'ont aucun prédateur à chaque sortie. Ce sont les deux nombres premiers de la liste : leurs seuls diviseurs sont $1$ et eux-mêmes, donc aucun cycle de $2$ à $6$ ans ne peut les diviser.\n⛔ Le piège au b) : oublier $6$ pour $12$ ou pour $18$. $6 = 2 \\times 3$, et $2$ et $3$ sont tous deux dans $12$ et dans $18$.\nRéponse : $13$ et $17$, les deux nombres premiers entre $12$ et $18$, échappent à tous les prédateurs.",
          schema: grille(
            ["cycle", "décomposition", "prédateurs"],
            [["12", "2² × 3", "2, 3, 4, 6"], ["13", "premier", "aucun"], ["14", "2 × 7", "2"], ["15", "3 × 5", "3, 5"], ["16", "2⁴", "2, 4"], ["17", "premier", "aucun"], ["18", "2 × 3²", "2, 3, 6"]],
            [1, 5],
          ),
          micros: ["premier_definition", "premier_decomposer", "premier_defi"],
        },
        {
          titre: "La photo du Tour de France",
          enonce:
            "Au départ du Tour de France 2025, $23$ équipes de $8$ coureurs, soit $184$ coureurs, posent pour la photo. On les range en rectangle complet : au moins $2$ rangs, et plus de coureurs par rang que de rangs.\na) Décomposer $184$ en produit de facteurs premiers.\nb) Donner tous les rectangles possibles.\nc) Après deux abandons, il reste $182$ coureurs. Quels rectangles sont possibles ? Lequel est le plus proche d'un carré ?",
          correction:
            "a) $184 \\div 2 = 92$, $92 \\div 2 = 46$, $46 \\div 2 = 23$, et $23$ est premier. Donc $184 = 2^3 \\times 23$.\nb) Le nombre de rangs doit diviser $184$ : il se fabrique avec les facteurs $2$, $2$, $2$ et $23$. Avec plus de coureurs par rang que de rangs : $2$ rangs de $92$, $4$ rangs de $46$, $8$ rangs de $23$.\nJe m'arrête : $23$ rangs de $8$, c'est le dernier rectangle, tourné.\nc) $182 \\div 2 = 91$, $91 \\div 7 = 13$ : $182 = 2 \\times 7 \\times 13$. Les rangs possibles : $2$ rangs de $91$, $7$ rangs de $26$, $13$ rangs de $14$.\nLe plus proche d'un carré : $13$ rangs de $14$ coureurs.\n⛔ Le piège au b) : oublier $4$ rangs de $46$, en ne prenant que les facteurs premiers $2$ et $23$. Un nombre de rangs peut être un PRODUIT de facteurs premiers : $4 = 2 \\times 2$ et $8 = 2 \\times 2 \\times 2$.\nRéponse : $184 = 2^3 \\times 23$ ; $2$ rangs de $92$, $4$ de $46$ ou $8$ de $23$ ; avec $182$ coureurs, $2$ rangs de $91$, $7$ de $26$ ou $13$ de $14$, le plus proche d'un carré.",
          schema: grille(
            ["coureurs", "rangs", "par rang"],
            [["184", "2", "92"], ["184", "4", "46"], ["184", "8", "23"], ["182", "2", "91"], ["182", "7", "26"], ["182", "13", "14"]],
            [5],
          ),
          micros: ["premier_decomposer", "premier_defi"],
        },
        {
          titre: "Les vitesses du vélo",
          enonce:
            "Sur un vélo de route, la chaîne relie un plateau (à l'avant) à un pignon (à l'arrière). Les plateaux ont $50$ et $34$ dents ; la cassette compte, entre autres, des pignons de $15$, $24$ et $27$ dents. Le rapport $\\dfrac{\\text{dents du plateau}}{\\text{dents du pignon}}$ donne le nombre de tours de roue pour un tour de pédalier.\na) Décomposer $50$, $34$, $15$, $24$ et $27$ en produits de facteurs premiers.\nb) Écrire les rapports $\\dfrac{50}{15}$, $\\dfrac{34}{24}$ et $\\dfrac{34}{27}$ sous forme irréductible.\nc) Avec le rapport $\\dfrac{50}{15}$, combien de tours de pédalier faut-il au minimum pour que la roue fasse un nombre entier de tours ?",
          correction:
            "a) $50 = 2 \\times 5^2$ ; $34 = 2 \\times 17$ ; $15 = 3 \\times 5$ ; $24 = 2^3 \\times 3$ ; $27 = 3^3$.\nb) Je barre les facteurs communs au haut et au bas.\n$\\dfrac{50}{15} = \\dfrac{2 \\times 5 \\times 5}{3 \\times 5} = \\dfrac{10}{3}$ : un $5$ en commun.\n$\\dfrac{34}{24} = \\dfrac{2 \\times 17}{2 \\times 2 \\times 2 \\times 3} = \\dfrac{17}{12}$ : un $2$ en commun.\n$\\dfrac{34}{27}$ : $34$ n'a que les facteurs $2$ et $17$, $27$ n'a que des $3$. Aucun facteur commun : $\\dfrac{34}{27}$ est déjà irréductible.\nc) $\\dfrac{50}{15} = \\dfrac{10}{3}$ : pour $3$ tours de pédalier, la roue fait exactement $10$ tours. Avec $1$ ou $2$ tours de pédalier, elle en fait $\\dfrac{10}{3}$ ou $\\dfrac{20}{3}$, qui ne sont pas des nombres entiers.\n⛔ Le piège au b) : chercher à « simplifier » $\\dfrac{34}{27}$ à tout prix. Les décompositions montrent d'un coup qu'il n'y a rien à barrer.\nRéponse : $\\dfrac{10}{3}$, $\\dfrac{17}{12}$ et $\\dfrac{34}{27}$ ; il faut $3$ tours de pédalier, et la roue en fait alors $10$.",
          schema: grille(
            ["rapport", "plateau", "pignon", "irréductible"],
            [["50/15", "2 × 5 × 5", "3 × 5", "10/3"], ["34/24", "2 × 17", "2 × 2 × 2 × 3", "17/12"], ["34/27", "2 × 17", "3 × 3 × 3", "34/27"]],
          ),
          micros: ["premier_decomposer"],
        },
        {
          titre: "Le cadenas des sites Internet",
          enonce:
            "Le cadenas d'un site Internet repose sur un produit de deux très grands nombres premiers : multiplier est rapide, retrouver les deux facteurs à partir du produit est très long. Une clé actuelle est un nombre de $617$ chiffres. Voici une version miniature.\na) Calculer $13 \\times 29$.\nb) Le nombre $391$ est le produit de deux nombres premiers. Les retrouver.\nc) Pourquoi était-on sûr de trouver un facteur avant d'arriver à $20$ ?\nd) Léo propose $391 = 1 \\times 391$. Pourquoi sa réponse ne convient-elle pas ?",
          correction:
            "a) $13 \\times 29 = 377$ : un seul calcul.\nb) Dans l'autre sens, je dois chercher. J'essaie les nombres premiers dans l'ordre.\nPar $2$ : impair. Par $3$ : $3 + 9 + 1 = 13$, non. Par $5$ : non. Par $7$ : $391 = 7 \\times 55 + 6$. Par $11$ : $391 = 11 \\times 35 + 6$. Par $13$ : $391 = 13 \\times 30 + 1$. Par $17$ : $391 = 17 \\times 23$, reste $0$.\n$17$ et $23$ sont premiers : $391 = 17 \\times 23$.\nc) $20 \\times 20 = 400$ dépasse $391$. Si les deux facteurs valaient au moins $20$, leur produit dépasserait $391$ : le plus petit des deux est donc plus petit que $20$.\nd) $1$ n'est pas un nombre premier, et $391$ non plus, puisque $391 = 17 \\times 23$.\n⭐ Il a fallu sept essais pour un nombre de trois chiffres. Pour un nombre de $617$ chiffres, même un ordinateur n'y arrive pas : c'est ce déséquilibre qui protège les paiements en ligne.\n⛔ Le piège : s'arrêter après $2$, $3$, $5$ et $7$ en concluant « $391$ est premier ». $17 \\times 17 = 289$ ne dépasse pas $391$ : il faut pousser les essais plus loin.\nRéponse : $13 \\times 29 = 377$ ; $391 = 17 \\times 23$.",
          schema: grille(
            ["essai", "division", "reste"],
            [["2", "391 = 2 × 195 + 1", "1"], ["3", "391 = 3 × 130 + 1", "1"], ["5", "391 = 5 × 78 + 1", "1"], ["7", "391 = 7 × 55 + 6", "6"], ["11", "391 = 11 × 35 + 6", "6"], ["13", "391 = 13 × 30 + 1", "1"], ["17", "391 = 17 × 23 + 0", "0"]],
            [6],
          ),
          micros: ["premier_decomposer", "premier_defi"],
        },
      ],
    },
  ],
};
