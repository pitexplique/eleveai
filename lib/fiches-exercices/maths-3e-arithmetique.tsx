// ─── Fiche d'exercices : multiples, diviseurs et facteurs premiers (3e) ────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-arithmetique.tsx` et sur
// les micros du coach de 3e (notionId entier_arithmetique). On reste dans le
// programme de 3e : multiples et diviseurs, critères de divisibilité, nombres
// premiers, décomposition en facteurs premiers, et ses usages — PGCD, fraction
// irréductible, parts sans reste, pavage. ⛔ Pas de démonstration littérale
// avec 2k + 1 ni d'algorithme d'Euclide : c'est la feuille de seconde
// (`maths-seconde-arithmetique.tsx`).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 42 en 6 × 7, ni 135,
// 250, 738, 123, ni 60 = 2² × 3 × 5, 45 = 3² × 5, ni PGCD(12 ; 18), ni les
// 24 bonbons et 36 biscuits, ni le test de 97.
//
// Les chiffres du monde, et d'où ils viennent :
// - joueurs sur le terrain : 5 au basket (FIBA, Règles officielles, art. 4),
//   7 au handball (IHF, Règles du jeu, règle 4), 11 au football (IFAB, Lois du
//   jeu, loi 3), 15 au rugby à XV (World Rugby, règle 3) — ex. 20 ;
// - période de révolution sidérale : Jupiter 11,86 ans, Saturne 29,46 ans
//   (NASA, Planetary Fact Sheet), arrondies à 12 et 30 ans dans l'énoncé.
//   5 × 11,86 = 59,3 et 2 × 29,46 = 58,9 : le cycle d'environ 60 ans est réel — ex. 19 ;
// - dalles de terrasse 60 × 60 cm : le format courant du carrelage extérieur — ex. 18.
// Les quantités du ravitaillement (ex. 17) sont inventées.
//
// Les corrigés sont écrits à la première personne (« je divise »), comme la
// feuille de la racine carrée de 3e.
//
// ⭐ LES SCHÉMAS : l'échelle des divisions successives (`echelles`), la grille
// des nombres premiers (`crible`), le rectangle pavé de carrés (`pavage`) et des
// tableaux simples (`grille`). Du HTML/SVG local, texte nu (2², jamais de `$`).
// Le script de recalcul RELIT leurs arguments : les écrire en clair, en JSON
// (guillemets doubles, sur une ligne).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-arithmetique-3e.mjs` —
// les diviseurs par essais un à un, les premiers par comptage des diviseurs, le
// PGCD par balayage des diviseurs communs, le multiple commun par balayage.
//
// Micro-compétences : entier_multiple_diviseur (1, 2, 9, 14, 15),
// entier_critere_divisibilite (3, 4, 6, 12, 13), entier_nombre_premier (5, 6,
// 8, 12, 13, 16), entier_decomposer_facteur (7, 8, 9, 10, 14, 17, 19, 20),
// entier_pgcd_ppcm (10, 11, 15, 17, 18, 19, 20), entier_arithmetique_defi (13,
// 16, 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

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
// divise, et on descend jusqu'à 1. C'est le geste du cahier, dessiné tel quel.
// `e` : les étapes [nombre, diviseur premier] ; `r` : la décomposition lue.
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

// ⭐ LE RECTANGLE PAVÉ : longueur × largeur couvertes de carrés de côté `cote`,
// à l'échelle. La première dalle est en orange, avec son côté écrit dedans.
const pavage = (longueur: number, largeur: number, cote: number, unite = "cm") => {
  const L = 230;
  const k = L / longueur;
  const H = largeur * k;
  const s = cote * k;
  const nx = Math.round(longueur / cote);
  const ny = Math.round(largeur / cote);
  return (
    <svg
      viewBox={`0 0 ${L + 60} ${(H + 34).toFixed(0)}`}
      role="img"
      aria-label={`Un rectangle de ${longueur} ${unite} sur ${largeur} ${unite}, couvert par ${nx} fois ${ny} carrés de ${cote} ${unite} de côté`}
      className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]"
    >
      <g transform="translate(52 6)">
        {Array.from({ length: nx * ny }, (_, i) => (
          <rect key={i} x={(i % nx) * s} y={Math.floor(i / nx) * s} width={s} height={s} fill={i === 0 ? "#fed7aa" : "#dbeafe"} stroke="#2563eb" strokeWidth={1} />
        ))}
        <rect x={0} y={0} width={L} height={H} fill="none" stroke="#1e3a8a" strokeWidth={2} />
        <text x={s / 2} y={s / 2 + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#9a3412">
          {cote}
        </text>
        <text x={L / 2} y={H + 18} textAnchor="middle" fontSize={12} fill="#1e3a8a">
          {longueur} {unite}
        </text>
        <text x={-6} y={H / 2 + 4} textAnchor="end" fontSize={12} fill="#1e3a8a">
          {largeur} {unite}
        </text>
      </g>
    </svg>
  );
};

export const exercicesArithmetique3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "entier-arithmetique",
  titre: "Multiples, diviseurs et facteurs premiers",
  accroche:
    "Vingt exercices, du calcul seul au problème : trouver les diviseurs, appliquer les critères, reconnaître un nombre premier, décomposer un entier en facteurs premiers, puis s'en servir pour le PGCD, une fraction irréductible, des sacs de ravitaillement, une terrasse à carreler, deux planètes et les équipes d'un club. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape, le piège nommé et un schéma.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/entier-arithmetique", titre: "Multiples, diviseurs et facteurs premiers" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je justifie par une égalité ou par un critère, jamais par une impression.",
      rappel: [
        "$b$ est un DIVISEUR de $a$ (et $a$ un MULTIPLE de $b$) quand $a = b \\times k$, avec $k$ entier : la division tombe juste.",
        "Critères : par $2$, le dernier chiffre est pair ; par $5$, il vaut $0$ ou $5$ ; par $10$, il vaut $0$ ; par $3$ ou par $9$, c'est la SOMME des chiffres qui l'est.",
        "PREMIER : exactement deux diviseurs, $1$ et lui-même. $1$ n'est pas premier. Pour tester $n$, j'essaie $2$, $3$, $5$, $7$… tant que leur carré ne dépasse pas $n$.",
        "DÉCOMPOSER : je divise par le plus petit nombre premier possible, et je recommence avec le quotient, jusqu'à obtenir $1$.",
      ],
      exercices: [
        {
          enonce:
            "a) On sait que $104 = 8 \\times 13$. Compléter par « diviseur » ou « multiple » : $13$ est un … de $104$ ; $104$ est un … de $8$.\nb) Donner tous les diviseurs de $28$.\nc) $96$ est-il un multiple de $8$ ?\nd) $5$ est-il un diviseur de $52$ ?",
          correction:
            "a) L'égalité $104 = 8 \\times 13$ dit que la division de $104$ par $13$ tombe juste : $13$ est un diviseur de $104$. Et $104$ est un multiple de $8$.\nb) Je cherche les produits qui donnent $28$, en partant de $1$ : $1 \\times 28$, $2 \\times 14$, $4 \\times 7$. $3$, $5$ et $6$ ne divisent pas $28$, et je m'arrête là, car $6 \\times 6 = 36$ dépasse déjà $28$.\nLes diviseurs de $28$ sont $1$, $2$, $4$, $7$, $14$ et $28$.\nc) $96 = 8 \\times 12$ : oui, $96$ est un multiple de $8$.\nd) $52 = 5 \\times 10 + 2$ : il reste $2$, la division ne tombe pas juste. $5$ n'est pas un diviseur de $52$ (d'ailleurs, $52$ ne finit ni par $0$ ni par $5$).\n⛔ Le piège : inverser les deux mots. Le DIVISEUR est le petit ($13$), le MULTIPLE est le grand ($104$).\nRéponse : a) diviseur, multiple ; b) $1$, $2$, $4$, $7$, $14$, $28$ ; c) oui ; d) non.",
          schema: grille(["produit égal à 28", "diviseurs trouvés"], [["1 × 28", "1 et 28"], ["2 × 14", "2 et 14"], ["4 × 7", "4 et 7"]]),
          micros: ["entier_multiple_diviseur"],
        },
        {
          enonce:
            "a) Écrire la division euclidienne de $100$ par $7$.\nb) $100$ est-il un multiple de $7$ ?\nc) Quel est le multiple de $7$ le plus proche de $100$ ?\nd) Donner les multiples de $7$ compris entre $50$ et $80$.",
          correction:
            "a) Je cherche combien de fois $7$ tient dans $100$ : $7 \\times 14 = 98$, et $7 \\times 15 = 105$ est trop grand. Donc $100 = 7 \\times 14 + 2$, avec un reste $2$ plus petit que $7$.\nb) Le reste vaut $2$, pas $0$ : $100$ n'est pas un multiple de $7$.\nc) $100$ est entre $98$ et $105$. $100 - 98 = 2$ et $105 - 100 = 5$ : le plus proche est $98$.\nd) J'écris la table de $7$ : $7 \\times 8 = 56$, $7 \\times 9 = 63$, $7 \\times 10 = 70$, $7 \\times 11 = 77$. Puis $7 \\times 12 = 84$ dépasse $80$.\n⛔ Le piège au d) : oublier $56$ en commençant la table à $7 \\times 10$. $7 \\times 7 = 49$ est juste sous $50$, donc le premier multiple de la liste est $56$.\nRéponse : $100 = 7 \\times 14 + 2$ ; non ; $98$ ; $56$, $63$, $70$ et $77$.",
          schema: grille(
            ["produit", "multiple de 7"],
            [["7 × 7", "49"], ["7 × 8", "56"], ["7 × 9", "63"], ["7 × 10", "70"], ["7 × 11", "77"], ["7 × 12", "84"], ["7 × 14", "98"], ["7 × 15", "105"]],
            [1, 2, 3, 4, 6],
          ),
          micros: ["entier_multiple_diviseur"],
        },
        {
          enonce:
            "Chaque nombre est-il divisible par $2$ ? par $3$ ? par $5$ ? par $9$ ? par $10$ ? Répondre par oui ou non.\n$1\\,530$ ; $2\\,745$ ; $8\\,124$",
          correction:
            "J'applique les critères, sans poser une seule division : le dernier chiffre pour $2$, $5$ et $10$ ; la somme des chiffres pour $3$ et $9$.\n$1\\,530$ finit par $0$ : divisible par $2$, par $5$ et par $10$. Somme des chiffres : $1 + 5 + 3 + 0 = 9$, divisible par $3$ et par $9$.\n$2\\,745$ finit par $5$ : divisible par $5$, mais ni par $2$ ni par $10$. Somme des chiffres : $2 + 7 + 4 + 5 = 18$, divisible par $3$ et par $9$.\n$8\\,124$ finit par $4$, un chiffre pair : divisible par $2$, mais ni par $5$ ni par $10$. Somme des chiffres : $8 + 1 + 2 + 4 = 15$, divisible par $3$ mais pas par $9$.\n⛔ Le piège : croire que « divisible par $3$ » entraîne « divisible par $9$ ». $8\\,124$ l'est par $3$ ($8\\,124 = 3 \\times 2\\,708$), pas par $9$.\nRéponse : $1\\,530$ est divisible par les cinq ; $2\\,745$ par $3$, $5$ et $9$ ; $8\\,124$ par $2$ et $3$.",
          schema: grille(
            ["nombre", "2", "3", "5", "9", "10"],
            [["1 530", "oui", "oui", "oui", "oui", "oui"], ["2 745", "non", "oui", "oui", "oui", "non"], ["8 124", "oui", "oui", "non", "non", "non"]],
          ),
          micros: ["entier_critere_divisibilite"],
        },
        {
          enonce:
            "Trouver le chiffre caché $\\square$, en donnant toutes les possibilités.\na) $34\\square2$ est divisible par $9$.\nb) $5\\square8$ est divisible par $3$.\nc) $71\\square$ est divisible par $2$ et par $3$.",
          correction:
            "a) Divisible par $9$ : la somme des chiffres doit l'être. $3 + 4 + 2 = 9$, donc la somme vaut $9 + \\square$. Il faut $\\square = 0$ (somme $9$) ou $\\square = 9$ (somme $18$) : $3\\,402$ ou $3\\,492$.\nb) Divisible par $3$ : $5 + 8 = 13$, et $13 + \\square$ doit être dans la table de $3$, donc valoir $15$, $18$ ou $21$. $\\square = 2$, $5$ ou $8$ : $528$, $558$ ou $588$.\nc) Divisible par $2$ : le dernier chiffre est pair, $\\square$ vaut $0$, $2$, $4$, $6$ ou $8$. Divisible par $3$ : $7 + 1 + \\square = 8 + \\square$ doit être dans la table de $3$. Parmi les chiffres pairs, seul $4$ convient ($8 + 4 = 12$) : $714$.\n⛔ Le piège au a) : oublier $\\square = 9$. Un chiffre va de $0$ à $9$, et $18$ est aussi dans la table de $9$.\nRéponse : a) $3\\,402$ ou $3\\,492$ ; b) $528$, $558$ ou $588$ ; c) $714$.",
          schema: grille(
            ["chiffre pair", "7 + 1 + chiffre", "divisible par 3 ?"],
            [["0", "8", "non"], ["2", "10", "non"], ["4", "12", "oui"], ["6", "14", "non"], ["8", "16", "non"]],
            [2],
          ),
          micros: ["entier_critere_divisibilite"],
        },
        {
          enonce: "Parmi ces nombres, lesquels sont premiers ? Justifier.\n$31$ ; $39$ ; $49$ ; $53$ ; $87$ ; $91$",
          correction:
            "Pour chaque nombre, j'essaie de le diviser par $2$, $3$, $5$, $7$…, et je m'arrête dès que le carré de l'essai dépasse le nombre.\n$31$ : ni $2$, ni $3$, ni $5$ ne le divisent, et $7^2 = 49$ dépasse $31$. Il est premier.\n$39 = 3 \\times 13$ (somme des chiffres : $12$). Pas premier.\n$49 = 7 \\times 7$. Pas premier.\n$53$ : ni $2$, ni $3$, ni $5$, ni $7$ ($7 \\times 7 = 49$, reste $4$), et $11^2 = 121$ dépasse $53$. Il est premier.\n$87 = 3 \\times 29$ (somme des chiffres : $15$). Pas premier.\n$91 = 7 \\times 13$. Pas premier.\n⛔ Le piège : croire que $91$ ou $87$ sont premiers parce qu'ils sont impairs et « ont l'air seuls ». Impair ne veut pas dire premier : il faut essayer $3$, puis $7$.\nRéponse : $31$ et $53$ sont premiers ; les autres non.",
          schema: grille(
            ["nombre", "plus petit diviseur premier", "premier ?"],
            [["31", "aucun", "oui"], ["39", "3", "non"], ["49", "7", "non"], ["53", "aucun", "oui"], ["87", "3", "non"], ["91", "7", "non"]],
            [0, 3],
          ),
          micros: ["entier_nombre_premier"],
        },
        {
          enonce: "a) Donner tous les nombres premiers compris entre $60$ et $80$.\nb) Pourquoi n'y a-t-il aucun nombre pair dans cette liste ?",
          correction:
            "a) Les nombres pairs s'éliminent d'un coup : ils sont divisibles par $2$. Restent les impairs : $61$, $63$, $65$, $67$, $69$, $71$, $73$, $75$, $77$, $79$.\nPar $5$ : $65$ et $75$ finissent par $5$, éliminés.\nPar $3$ (somme des chiffres) : $63$ ($6 + 3 = 9$) et $69$ ($6 + 9 = 15$), éliminés.\nPar $7$ : $77 = 7 \\times 11$, éliminé.\nJe peux m'arrêter à $7$ : $11^2 = 121$ dépasse $80$. Les nombres qui restent sont premiers.\nb) Un nombre pair plus grand que $2$ a au moins trois diviseurs : $1$, $2$ et lui-même. Il n'est donc pas premier.\n⛔ Le piège : garder $77$, parce que $7$ n'a pas de critère simple. Il faut poser la division.\nRéponse : $61$, $67$, $71$, $73$ et $79$.",
          schema: crible(60, 80, [61, 67, 71, 73, 79]),
          micros: ["entier_nombre_premier", "entier_critere_divisibilite"],
        },
        {
          enonce: "Décomposer en produit de facteurs premiers.\na) $90$\nb) $150$\nc) $132$",
          correction:
            "Je divise par le plus petit nombre premier possible, et je recommence avec le quotient, jusqu'à $1$.\na) $90 \\div 2 = 45$, $45 \\div 3 = 15$, $15 \\div 3 = 5$, $5 \\div 5 = 1$. Donc $90 = 2 \\times 3 \\times 3 \\times 5 = 2 \\times 3^2 \\times 5$.\nb) $150 \\div 2 = 75$, $75 \\div 3 = 25$, $25 \\div 5 = 5$, $5 \\div 5 = 1$. Donc $150 = 2 \\times 3 \\times 5 \\times 5 = 2 \\times 3 \\times 5^2$.\nc) $132 \\div 2 = 66$, $66 \\div 2 = 33$, $33 \\div 3 = 11$, $11 \\div 11 = 1$. Donc $132 = 2 \\times 2 \\times 3 \\times 11 = 2^2 \\times 3 \\times 11$.\n⭐ Contrôle : je remultiplie. $4 \\times 3 \\times 11 = 132$.\n⛔ Le piège : s'arrêter à $132 = 4 \\times 33$. Ni $4$ ni $33$ ne sont premiers : la décomposition n'est finie que lorsque TOUS les facteurs le sont.\nRéponse : $90 = 2 \\times 3^2 \\times 5$ ; $150 = 2 \\times 3 \\times 5^2$ ; $132 = 2^2 \\times 3 \\times 11$.",
          schema: echelles(
            { e: [[90, 2], [45, 3], [15, 3], [5, 5]], r: "90 = 2 × 3² × 5" },
            { e: [[150, 2], [75, 3], [25, 5], [5, 5]], r: "150 = 2 × 3 × 5²" },
            { e: [[132, 2], [66, 2], [33, 3], [11, 11]], r: "132 = 2² × 3 × 11" },
          ),
          micros: ["entier_decomposer_facteur"],
        },
        {
          enonce:
            "Chaque écriture est-elle une décomposition en produit de facteurs premiers ? Sinon, la corriger.\na) $350 = 2 \\times 7 \\times 25$\nb) $52 = 2^2 \\times 13$\nc) $44 = 4 \\times 11$\nd) $195 = 3 \\times 5 \\times 13$\ne) $34 = 1 \\times 2 \\times 17$",
          correction:
            "Une décomposition n'a droit qu'à des facteurs PREMIERS. Je contrôle chaque facteur, puis je vérifie le produit.\na) Non : $25 = 5 \\times 5$ n'est pas premier. $350 = 2 \\times 5^2 \\times 7$.\nb) Oui : $2$ et $13$ sont premiers, et $2^2 \\times 13 = 4 \\times 13 = 52$.\nc) Non : $4 = 2 \\times 2$ n'est pas premier. $44 = 2^2 \\times 11$.\nd) Oui : $3$, $5$ et $13$ sont premiers, et $3 \\times 5 \\times 13 = 195$.\ne) Non : $1$ n'est pas un nombre premier, il n'a rien à faire là. $34 = 2 \\times 17$.\n⛔ Le piège au e) : laisser le $1$. Il ne change pas le produit, mais $1$ n'a qu'un seul diviseur : il n'est pas premier.\nRéponse : b) et d) sont des décompositions ; les autres se corrigent en $350 = 2 \\times 5^2 \\times 7$, $44 = 2^2 \\times 11$ et $34 = 2 \\times 17$.",
          schema: grille(
            ["écriture", "facteur non premier", "décomposition"],
            [["350 = 2 × 7 × 25", "25", "2 × 5² × 7"], ["52 = 2² × 13", "aucun", "2² × 13"], ["44 = 4 × 11", "4", "2² × 11"], ["195 = 3 × 5 × 13", "aucun", "3 × 5 × 13"], ["34 = 1 × 2 × 17", "1", "2 × 17"]],
          ),
          micros: ["entier_decomposer_facteur", "entier_nombre_premier"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au brevet. Je décompose d'abord, je conclus ensuite, et je vérifie en remultipliant.",
      rappel: [
        "Un entier s'écrit d'UNE seule façon comme produit de facteurs premiers (à l'ordre près). Un nombre $d$ divise $n$ quand tous les facteurs de $d$ se trouvent dans ceux de $n$.",
        "Le PGCD de deux entiers est leur plus grand diviseur commun. Je décompose les deux, et je garde les facteurs PRÉSENTS DANS LES DEUX, chacun avec la plus petite puissance.",
        "Une fraction est IRRÉDUCTIBLE quand son numérateur et son dénominateur n'ont plus que $1$ comme diviseur commun : je divise les deux par leur PGCD.",
      ],
      exercices: [
        {
          enonce:
            "a) Décomposer $360$ en produit de facteurs premiers.\nb) Sans poser de division, dire si $360$ est divisible par $8$, par $7$, par $27$, par $40$.",
          correction:
            "a) $360 \\div 2 = 180$, $180 \\div 2 = 90$, $90 \\div 2 = 45$, $45 \\div 3 = 15$, $15 \\div 3 = 5$, $5 \\div 5 = 1$. Donc $360 = 2^3 \\times 3^2 \\times 5$.\nb) Un nombre divise $360$ quand tous ses facteurs premiers se trouvent dans $2^3 \\times 3^2 \\times 5$.\n$8 = 2^3$ : les trois $2$ sont là. Oui, $360 = 8 \\times 45$.\n$7$ n'apparaît pas dans la décomposition : non.\n$27 = 3^3$ : il faudrait trois $3$, et $360$ n'en a que deux. Non.\n$40 = 2^3 \\times 5$ : tout y est. Oui, $360 = 40 \\times 9$.\n⛔ Le piège : dire oui pour $27$ parce que $3$ divise $360$. Il faut autant de $3$ qu'en demande $27$.\nRéponse : $360 = 2^3 \\times 3^2 \\times 5$ ; divisible par $8$ et par $40$, pas par $7$ ni par $27$.",
          schema: echelles({ e: [[360, 2], [180, 2], [90, 2], [45, 3], [15, 3], [5, 5]], r: "360 = 2³ × 3² × 5" }),
          micros: ["entier_decomposer_facteur", "entier_multiple_diviseur"],
        },
        {
          enonce:
            "a) Décomposer $168$ et $120$ en produits de facteurs premiers.\nb) En déduire le PGCD de $168$ et $120$.\nc) Vérifier en écrivant $168$ et $120$ comme des multiples de ce PGCD.",
          correction:
            "a) $168 \\div 2 = 84$, $84 \\div 2 = 42$, $42 \\div 2 = 21$, $21 \\div 3 = 7$, $7 \\div 7 = 1$ : $168 = 2^3 \\times 3 \\times 7$.\n$120 \\div 2 = 60$, $60 \\div 2 = 30$, $30 \\div 2 = 15$, $15 \\div 3 = 5$, $5 \\div 5 = 1$ : $120 = 2^3 \\times 3 \\times 5$.\nb) Je garde ce qui est dans les DEUX : $2^3$ et $3$. Le $7$ n'est que dans $168$, le $5$ que dans $120$. Donc $\\text{PGCD}(168 ; 120) = 2^3 \\times 3 = 24$.\nc) $168 = 24 \\times 7$ et $120 = 24 \\times 5$. Les quotients $7$ et $5$ n'ont plus que $1$ comme diviseur commun : on ne peut pas trouver plus grand que $24$.\n⛔ Le piège : prendre TOUS les facteurs, $2^3 \\times 3 \\times 5 \\times 7 = 840$. Ce nombre est un multiple des deux, pas un diviseur.\nRéponse : $\\text{PGCD}(168 ; 120) = 24$.",
          schema: echelles(
            { e: [[168, 2], [84, 2], [42, 2], [21, 3], [7, 7]], r: "168 = 2³ × 3 × 7" },
            { e: [[120, 2], [60, 2], [30, 2], [15, 3], [5, 5]], r: "120 = 2³ × 3 × 5" },
          ),
          micros: ["entier_decomposer_facteur", "entier_pgcd_ppcm"],
        },
        {
          enonce: "Rendre chaque fraction irréductible, en passant par les décompositions.\na) $\\dfrac{140}{196}$\nb) $\\dfrac{234}{390}$",
          correction:
            "a) $140 = 2^2 \\times 5 \\times 7$ et $196 = 2^2 \\times 7^2$. En commun : $2^2$ et un $7$, soit $\\text{PGCD} = 4 \\times 7 = 28$.\n$140 = 28 \\times 5$ et $196 = 28 \\times 7$, donc $\\dfrac{140}{196} = \\dfrac{5}{7}$.\nb) $234 = 2 \\times 3^2 \\times 13$ et $390 = 2 \\times 3 \\times 5 \\times 13$. En commun : $2$, un $3$ et $13$, soit $\\text{PGCD} = 2 \\times 3 \\times 13 = 78$.\n$234 = 78 \\times 3$ et $390 = 78 \\times 5$, donc $\\dfrac{234}{390} = \\dfrac{3}{5}$.\n⭐ Diviser par le PGCD rend la fraction irréductible en UNE étape.\n⛔ Le piège : simplifier par $2$ et s'arrêter, $\\dfrac{140}{196} = \\dfrac{70}{98}$. $70$ et $98$ sont encore tous deux divisibles par $14$.\nRéponse : $\\dfrac{5}{7}$ et $\\dfrac{3}{5}$.",
          schema: grille(
            ["nombre", "facteurs premiers"],
            [["140", "2 × 2 × 5 × 7"], ["196", "2 × 2 × 7 × 7"], ["en commun", "2 × 2 × 7 = 28"], ["234", "2 × 3 × 3 × 13"], ["390", "2 × 3 × 5 × 13"], ["en commun", "2 × 3 × 13 = 78"]],
            [2, 5],
          ),
          micros: ["entier_pgcd_ppcm"],
        },
        {
          enonce:
            "a) Expliquer pourquoi, pour savoir si $221$ est premier, il suffit d'essayer les diviseurs premiers jusqu'à $13$.\nb) $221$ est-il premier ?\nc) $223$ est-il premier ?",
          correction:
            "a) Si $221$ s'écrit $a \\times b$, l'un des deux facteurs vaut au plus $14$ : si les deux valaient au moins $15$, le produit dépasserait $15 \\times 15 = 225$. Le plus grand nombre premier jusqu'à $14$ est $13$ : essayer $2$, $3$, $5$, $7$, $11$ et $13$ suffit.\nb) $221$ est impair (pas $2$), la somme de ses chiffres vaut $5$ (pas $3$), il ne finit ni par $0$ ni par $5$. Par $7$ : $7 \\times 31 = 217$, reste $4$. Par $11$ : $11 \\times 20 = 220$, reste $1$. Par $13$ : $13 \\times 17 = 221$, reste $0$. Donc $221 = 13 \\times 17$ : il n'est pas premier.\nc) Même méthode, car $15 \\times 15 = 225$ dépasse encore $223$. Impair, somme des chiffres $7$, ne finit ni par $0$ ni par $5$. Par $7$ : reste $6$. Par $11$ : reste $3$. Par $13$ : reste $2$. Aucun essai ne tombe juste : $223$ est premier.\n⛔ Le piège : s'arrêter aux critères de $2$, $3$ et $5$. $221$ les passe tous, et pourtant $221 = 13 \\times 17$.\nRéponse : $221$ n'est pas premier ; $223$ est premier.",
          schema: grille(
            ["essai", "reste pour 221", "reste pour 223"],
            [["2", "1", "1"], ["3", "2", "1"], ["5", "1", "3"], ["7", "4", "6"], ["11", "1", "3"], ["13", "0", "2"]],
            [5],
          ),
          micros: ["entier_nombre_premier", "entier_critere_divisibilite"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifier par une preuve ou par un contre-exemple.\na) La somme de deux nombres premiers est toujours paire.\nb) Un nombre divisible par $9$ est toujours divisible par $3$.\nc) Un nombre divisible par $4$ et par $6$ est toujours divisible par $24$.\nd) Tout nombre premier plus grand que $2$ est impair.",
          correction:
            "a) FAUX. Un contre-exemple suffit : $2 + 3 = 5$, qui est impair. $2$ est le seul nombre premier pair : c'est lui qui casse la règle.\nb) VRAI. Si $n = 9 \\times k$, alors $n = 3 \\times 3 \\times k = 3 \\times (3k)$ : $n$ est un multiple de $3$.\nc) FAUX. $12$ est divisible par $4$ ($12 = 4 \\times 3$) et par $6$ ($12 = 6 \\times 2$), mais pas par $24$.\nd) VRAI. Un nombre pair plus grand que $2$ est divisible par $1$, par $2$ et par lui-même : il a au moins trois diviseurs, il n'est pas premier.\n⛔ Le piège au c) : multiplier $4 \\times 6 = 24$. $4 = 2^2$ et $6 = 2 \\times 3$ partagent un $2$ : il suffit de $2^2 \\times 3 = 12$.\nRéponse : faux, vrai, faux, vrai.",
          micros: ["entier_critere_divisibilite", "entier_nombre_premier", "entier_arithmetique_defi"],
        },
        {
          enonce:
            "a) Décomposer $72$ en produit de facteurs premiers.\nb) En déduire tous les diviseurs de $72$. Combien y en a-t-il ?\nc) $72$ est-il divisible par $16$ ?",
          correction:
            "a) $72 \\div 2 = 36$, $36 \\div 2 = 18$, $18 \\div 2 = 9$, $9 \\div 3 = 3$, $3 \\div 3 = 1$. Donc $72 = 2^3 \\times 3^2$.\nb) Un diviseur de $72$ est fait de facteurs pris dans $2^3 \\times 3^2$ : au plus trois $2$ et au plus deux $3$. Je les range par paires dont le produit vaut $72$ : $1 \\times 72$, $2 \\times 36$, $3 \\times 24$, $4 \\times 18$, $6 \\times 12$, $8 \\times 9$.\nLes diviseurs de $72$ sont $1$, $2$, $3$, $4$, $6$, $8$, $9$, $12$, $18$, $24$, $36$ et $72$ : il y en a $12$.\n⭐ Contrôle : $4$ choix pour le nombre de $2$ (de zéro à trois), $3$ choix pour le nombre de $3$ (de zéro à deux), et $4 \\times 3 = 12$.\nc) $16 = 2^4$ demande quatre $2$ ; $72$ n'en a que trois. Non.\n⛔ Le piège au b) : oublier $1$ et $72$. Tout nombre est divisible par $1$ et par lui-même.\nRéponse : $72 = 2^3 \\times 3^2$ ; il a $12$ diviseurs ; il n'est pas divisible par $16$.",
          schema: grille(
            ["petit diviseur", "grand diviseur", "produit"],
            [["1", "72", "72"], ["2", "36", "72"], ["3", "24", "72"], ["4", "18", "72"], ["6", "12", "72"], ["8", "9", "72"]],
          ),
          micros: ["entier_decomposer_facteur", "entier_multiple_diviseur"],
        },
        {
          enonce:
            "a) Écrire la liste des diviseurs de $48$, puis celle des diviseurs de $80$.\nb) Quels sont les diviseurs communs à $48$ et $80$ ? Quel est le plus grand ?\nc) Retrouver ce résultat avec les décompositions de $48$ et de $80$.",
          correction:
            "a) Par paires : $48 = 1 \\times 48 = 2 \\times 24 = 3 \\times 16 = 4 \\times 12 = 6 \\times 8$. Diviseurs de $48$ : $1$, $2$, $3$, $4$, $6$, $8$, $12$, $16$, $24$, $48$.\n$80 = 1 \\times 80 = 2 \\times 40 = 4 \\times 20 = 5 \\times 16 = 8 \\times 10$. Diviseurs de $80$ : $1$, $2$, $4$, $5$, $8$, $10$, $16$, $20$, $40$, $80$.\nb) Les diviseurs communs sont $1$, $2$, $4$, $8$ et $16$. Le plus grand : $\\text{PGCD}(48 ; 80) = 16$.\nc) $48 = 2^4 \\times 3$ et $80 = 2^4 \\times 5$. En commun : $2^4 = 16$. Même résultat.\n⭐ Les diviseurs communs sont exactement les diviseurs du PGCD : $1$, $2$, $4$, $8$ et $16$ divisent tous $16$.\n⛔ Le piège : répondre $80$ ou $48$. $80$ ne divise pas $48$ : il est trop grand pour être un diviseur commun.\nRéponse : les diviseurs communs sont $1$, $2$, $4$, $8$, $16$ ; le PGCD vaut $16$.",
          schema: grille(
            ["", "diviseurs"],
            [["de 48", "1, 2, 3, 4, 6, 8, 12, 16, 24, 48"], ["de 80", "1, 2, 4, 5, 8, 10, 16, 20, 40, 80"], ["communs", "1, 2, 4, 8, 16"]],
            [2],
          ),
          micros: ["entier_multiple_diviseur", "entier_pgcd_ppcm"],
        },
        {
          enonce:
            "Je suis un nombre premier à deux chiffres. La somme de mes chiffres vaut $10$. Si on échange mes deux chiffres, on obtient encore un nombre premier. Et mon chiffre des dizaines est plus petit que mon chiffre des unités. Qui suis-je ?",
          correction:
            "Je liste les nombres à deux chiffres dont la somme des chiffres vaut $10$ : $19$, $28$, $37$, $46$, $55$, $64$, $73$, $82$, $91$.\nJe barre les pairs ($28$, $46$, $64$, $82$), puis $55 = 5 \\times 11$ et $91 = 7 \\times 13$. Restent les premiers : $19$, $37$ et $73$.\nJ'échange les chiffres : $19$ devient $91 = 7 \\times 13$, pas premier. $37$ devient $73$, premier. $73$ devient $37$, premier.\nDernier indice : les dizaines plus petites que les unités. $3 < 7$ pour $37$ ; pour $73$, c'est l'inverse.\n⭐ $37$ et $73$ forment une paire : chacun est le renversé de l'autre, et tous les deux sont premiers.\n⛔ Le piège : garder $91$, impair et « qui a l'air premier ». $91 = 7 \\times 13$.\nRéponse : je suis $37$.",
          schema: grille(
            ["nombre", "premier ?", "renversé premier ?"],
            [["19", "oui", "non (91)"], ["28", "non", "—"], ["37", "oui", "oui (73)"], ["46", "non", "—"], ["55", "non", "—"], ["64", "non", "—"], ["73", "oui", "oui (37)"], ["82", "non", "—"], ["91", "non", "—"]],
            [2],
          ),
          micros: ["entier_nombre_premier", "entier_arithmetique_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je traduis en diviseurs ou en multiples, je décompose, puis j'écris une phrase de réponse.",
      rappel: [
        "Partager deux quantités en parts IDENTIQUES, sans reste : le nombre de parts divise les deux. Le plus grand nombre de parts possible est leur PGCD.",
        "Couvrir un rectangle de carrés identiques, sans découpe : le côté du carré divise la longueur ET la largeur. Le plus grand carré a pour côté leur PGCD.",
        "Deux cycles qui repartent ensemble se retrouvent au bout d'un multiple commun des deux durées. Pour le plus petit, je prends tous les facteurs, chacun avec la plus GRANDE puissance.",
      ],
      exercices: [
        {
          titre: "Les sacs du ravitaillement",
          enonce:
            "À l'arrivée d'un trail, les organisateurs préparent des sacs de ravitaillement tous identiques avec $210$ bouteilles d'eau et $294$ bananes, sans qu'il reste rien.\na) Peuvent-ils faire $35$ sacs ?\nb) Décomposer $210$ et $294$ en produits de facteurs premiers.\nc) Quel est le plus grand nombre de sacs possible ? Que contient alors chaque sac ?",
          correction:
            "a) $210 = 35 \\times 6$ : les bouteilles se partagent. Mais $294 = 35 \\times 8 + 14$ : il resterait $14$ bananes. Non, $35$ sacs ne conviennent pas.\nb) $210 \\div 2 = 105$, $105 \\div 3 = 35$, $35 \\div 5 = 7$, $7 \\div 7 = 1$ : $210 = 2 \\times 3 \\times 5 \\times 7$.\n$294 \\div 2 = 147$, $147 \\div 3 = 49$, $49 \\div 7 = 7$, $7 \\div 7 = 1$ : $294 = 2 \\times 3 \\times 7^2$.\nc) Le nombre de sacs doit diviser $210$ ET $294$ ; le plus grand est leur PGCD. En commun : $2$, $3$ et un seul $7$, soit $\\text{PGCD}(210 ; 294) = 2 \\times 3 \\times 7 = 42$.\nChaque sac reçoit $210 \\div 42 = 5$ bouteilles et $294 \\div 42 = 7$ bananes.\n⭐ Contrôle : $42 \\times 5 = 210$ et $42 \\times 7 = 294$.\n⛔ Le piège : garder les deux $7$ de $294$. $210$ n'en a qu'un : $2 \\times 3 \\times 7^2 = 294$ ne divise pas $210$.\nRéponse : $42$ sacs au plus, avec $5$ bouteilles d'eau et $7$ bananes dans chacun.",
          schema: echelles(
            { e: [[210, 2], [105, 3], [35, 5], [7, 7]], r: "210 = 2 × 3 × 5 × 7" },
            { e: [[294, 2], [147, 3], [49, 7], [7, 7]], r: "294 = 2 × 3 × 7²" },
          ),
          micros: ["entier_decomposer_facteur", "entier_pgcd_ppcm"],
        },
        {
          titre: "Les dalles de la terrasse",
          enonce:
            "Une terrasse rectangulaire mesure $4{,}80$ m sur $3{,}00$ m. On veut la couvrir de dalles carrées toutes identiques, les plus grandes possibles, sans en découper aucune.\na) Pourquoi des dalles de $45$ cm de côté ne conviennent-elles pas ?\nb) Quelle est la longueur du côté des dalles ?\nc) Combien de dalles faut-il ?",
          correction:
            "Je travaille en centimètres, pour n'avoir que des entiers : $480$ cm sur $300$ cm.\na) $480 = 45 \\times 10 + 30$ : la division ne tombe pas juste, il faudrait découper la dernière rangée. Et $300 = 45 \\times 6 + 30$, pas mieux.\nb) Le côté de la dalle doit diviser $480$ ET $300$ ; le plus grand est leur PGCD.\n$480 = 2^5 \\times 3 \\times 5$ et $300 = 2^2 \\times 3 \\times 5^2$. En commun : $2^2$, $3$ et $5$, soit $\\text{PGCD}(480 ; 300) = 4 \\times 3 \\times 5 = 60$. Les dalles mesurent $60$ cm de côté.\nc) Dans la longueur : $480 \\div 60 = 8$ dalles. Dans la largeur : $300 \\div 60 = 5$ dalles. Il en faut $8 \\times 5 = 40$.\n⭐ Contrôle par les aires : $480 \\times 300 = 144\\,000$ cm², et une dalle couvre $60 \\times 60 = 3\\,600$ cm². $144\\,000 \\div 3\\,600 = 40$.\n⛔ Le piège : garder $2^5$ ou $5^2$. Il faut la plus PETITE puissance commune, sinon la dalle ne divise plus l'un des côtés.\nRéponse : des dalles de $60$ cm de côté, $40$ en tout.",
          schema: pavage(480, 300, 60),
          micros: ["entier_pgcd_ppcm", "entier_arithmetique_defi"],
        },
        {
          titre: "Jupiter et Saturne",
          enonce:
            "Jupiter fait le tour du Soleil en $12$ ans environ, Saturne en $30$ ans environ (valeurs arrondies). On note la place de chacune parmi les étoiles une année donnée.\na) Décomposer $12$ et $30$ en produits de facteurs premiers.\nb) Au bout de combien d'années, au plus tôt, les deux planètes sont-elles revenues ensemble à leur place de départ ?\nc) Combien de tours chacune a-t-elle faits ?",
          correction:
            "a) $12 = 2^2 \\times 3$ et $30 = 2 \\times 3 \\times 5$.\nb) Jupiter revient à sa place au bout de $12$, $24$, $36$… ans : les multiples de $12$. Saturne, au bout des multiples de $30$. Je cherche le plus petit multiple COMMUN.\nIl doit contenir tous les facteurs de $12$ et tous ceux de $30$ : $2^2$, $3$ et $5$. Soit $2^2 \\times 3 \\times 5 = 60$.\nContrôle par les listes : $12$, $24$, $36$, $48$, $60$ d'un côté ; $30$, $60$ de l'autre. $60$ est le premier nombre commun.\nc) Jupiter fait $60 \\div 12 = 5$ tours, Saturne $60 \\div 30 = 2$ tours.\n⛔ Le piège : multiplier $12 \\times 30 = 360$. C'est bien un multiple commun, mais pas le plus petit : $12$ et $30$ partagent déjà $2 \\times 3 = 6$.\n⭐ Pour un multiple commun, je prends les facteurs avec la plus GRANDE puissance ; pour un diviseur commun, avec la plus petite.\nRéponse : au bout de $60$ ans environ, après $5$ tours de Jupiter et $2$ tours de Saturne.",
          schema: grille(["planète", "retours à sa place (années)"], [["Jupiter", "12, 24, 36, 48, 60"], ["Saturne", "30, 60"]]),
          micros: ["entier_decomposer_facteur", "entier_pgcd_ppcm", "entier_arithmetique_defi"],
        },
        {
          titre: "Les équipes du club",
          enonce:
            "Un club omnisports compte $330$ licenciés. Sur le terrain, une équipe compte $5$ joueurs au basket, $7$ au handball, $11$ au football et $15$ au rugby à XV.\na) Décomposer $330$ en produit de facteurs premiers.\nb) Pour quels sports peut-on répartir tous les licenciés en équipes complètes, sans personne sur le banc ? Combien d'équipes ?\nc) Pour l'entraînement, on veut des groupes de même effectif, entre $20$ et $40$ personnes. Quelles tailles de groupe sont possibles ?",
          correction:
            "a) $330 \\div 2 = 165$, $165 \\div 3 = 55$, $55 \\div 5 = 11$, $11 \\div 11 = 1$. Donc $330 = 2 \\times 3 \\times 5 \\times 11$.\nb) Une taille d'équipe convient si elle divise $330$, c'est-à-dire si ses facteurs se trouvent dans $2 \\times 3 \\times 5 \\times 11$.\nBasket : $5$ y est, et $330 = 5 \\times 66$ : $66$ équipes.\nHandball : $7$ n'y est pas, et $330 = 7 \\times 47 + 1$ : un licencié resterait sur le banc.\nFootball : $11$ y est, et $330 = 11 \\times 30$ : $30$ équipes.\nRugby : $15 = 3 \\times 5$, les deux facteurs y sont, et $330 = 15 \\times 22$ : $22$ équipes.\nc) Je cherche les diviseurs de $330$ entre $20$ et $40$, en assemblant ses facteurs : $2 \\times 11 = 22$, $2 \\times 3 \\times 5 = 30$, $3 \\times 11 = 33$. Les autres tombent en dehors : $15$ est trop petit, $55$ déjà trop grand.\n⛔ Le piège au b) : écarter $15$ parce qu'il n'est pas premier. Il suffit que ses facteurs, $3$ et $5$, soient tous les deux dans $330$.\nRéponse : basket ($66$ équipes), football ($30$) et rugby ($22$), mais pas le handball ; des groupes de $22$, $30$ ou $33$ personnes.",
          schema: grille(
            ["sport", "joueurs", "équipes"],
            [["basket", "5", "66"], ["handball", "7", "impossible"], ["football", "11", "30"], ["rugby à XV", "15", "22"]],
            [1],
          ),
          micros: ["entier_decomposer_facteur", "entier_pgcd_ppcm", "entier_arithmetique_defi"],
        },
      ],
    },
  ],
};
