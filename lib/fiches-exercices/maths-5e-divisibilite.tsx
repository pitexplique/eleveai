// ─── Fiche d'exercices : multiples, diviseurs et divisibilité (5e) — 20 exercices corrigés
//
// Feuille du lot de 5e (29/09/2026), sur la forme de l'étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-divisibilite.tsx` et sur la
// banque `lib/tutor-v4/questionBank/5e/maths/divisibilite.bank.ts`, notionId
// divisibilite : multiple et diviseur, critères par 2, 5 et 10, critères par 3
// et 9, liste des diviseurs par paires, défis (chiffre caché, plus grand
// diviseur commun trouvé EN LISTANT, simplification d'une fraction — la banque
// les pose tous).
// ⛔ LIMITES DE LA 5e : ni nombres premiers nommés, ni décomposition en
// facteurs (la banque ne cite le mot « premier » que dans une explication), ni
// division euclidienne comme objet d'étude (c'est la 4e), ni critère par 4, ni
// les sigles PGCD et PPCM. Les multiples communs de l'exercice 16 se LISENT sur
// deux listes, comme dans la banque de la notion.
// ⛔ Aucun exemple de la fiche de cours n'est repris (42 = 7 × 6, 375, 4 152,
// les diviseurs de 24 et de 18, 13, 738, zéro multiple de 7), ni de la banque
// (12, 7, 24 et 36, 36 élèves, 35/40), ni de la feuille de 4e
// (`maths-4e-divisibilite.tsx` : 161, 117, 68, 4 370, 5 742, 45, 358□, 2□71,
// 4□6, 84, 100, 1 080, 90 et 75, la piste, les cigales, le vélo, 96 panneaux,
// les œufs).
//
// Les pièges nommés : multiple et diviseur échangés (1), une borne comptée à
// tort (2), le chiffre des dizaines regardé pour 2 (3), le dernier chiffre
// regardé pour 3 (4, 12), les grands diviseurs oubliés (5), « aucun critère ne
// marche, donc aucune table » (6), la mauvaise règle d'un intrus (7), la somme
// des chiffres utilisée pour 2 ou 5 (8), le 0 oublié parmi les chiffres (9), un
// diviseur d'un seul des deux nombres (10, 20), une contrainte de l'énoncé
// oubliée (11), un diviseur compté deux fois (12), enlever ou ajouter : le
// mauvais multiple (13), « il commence par 9 » (14), le 0 des unités qui
// rendrait divisible par 10 (15), s'arrêter trop tôt dans les listes (16), le 5
// impair (17), rangées et chaises échangées (18), une règle prise pour un tour
// de magie (19).
//
// Fait réel : 2 520 est le plus petit nombre divisible par tous les entiers de
// 1 à 10 (fait arithmétique, recalculé par le script) — ex. 8. Tout le reste
// (jetons, maraîcher, robots, cadenas, chaises, mur carrelé) est un MODÈLE.
//
// ⭐ LES DESSINS : des JETONS rangés en rectangle (`rangement`, la dernière
// rangée incomplète en orange : c'est le reste), la grille des nombres
// (`centaine`, les multiples en couleur), l'arc-en-ciel des diviseurs par
// paires (`paires`), la somme des chiffres posée (`sommeChiffres`), la frise
// des multiples de la feuille de 4e (`frise`), un mur carrelé (`carrelage`), le
// diagramme à deux cercles (`venn`, commun) et des tableaux (`table`).
// 14 dessins imprimés ; ceux qui redisent le corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je regarde le dernier
// chiffre »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-divisibilite.mjs`.
//
// Micro-compétences : div_multiple_diviseur (1, 2, 6, 11, 13, 16, 19, 20),
// div_critere_2_5_10 (3, 6, 7, 8, 9, 12, 14, 15, 17, 18), div_critere_3_9 (4,
// 7, 8, 9, 12, 14, 15, 17, 18, 19), div_lister_diviseurs (5, 10, 11, 12, 13,
// 18, 20), div_defi (6, 9, 10, 12, 13, 15, 17, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, venn } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/**
 * ⭐ UN MULTIPLE EST UN RECTANGLE QUI SE FERME : `n` jetons rangés par rangées
 * de `colonnes`. Les rangées pleines en bleu, la dernière rangée incomplète en
 * orange — c'est le reste, donc la non-divisibilité. La légende est CALCULÉE à
 * partir de n et de colonnes : elle ne peut pas mentir.
 */
const rangement = (n: number, colonnes: number) => {
  const c = Math.min(18, 260 / colonnes);
  const rangs = Math.ceil(n / colonnes);
  const plein = Math.floor(n / colonnes) * colonnes;
  const W = 300;
  const x0 = (W - colonnes * c) / 2;
  const H = rangs * c + 34;
  const reste = n % colonnes;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`${n} jetons en rangées de ${colonnes}`}>
        {Array.from({ length: n }, (_, i) => (
          <circle key={i} cx={x0 + (i % colonnes) * c + c / 2} cy={6 + Math.floor(i / colonnes) * c + c / 2} r={c * 0.38} fill={i < plein ? BLEU : ORANGE} />
        ))}
        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="14" fontWeight="800" fill={reste ? ORANGE : NOIR}>
          {`${Math.floor(n / colonnes)} rangées de ${colonnes}${reste ? ` + ${reste} en trop` : ", rien en trop"}`}
        </text>
      </svg>
    </div>
  );
};

/** La GRILLE DES NOMBRES de `de` à `a`, dix par ligne, les multiples de `k` en bleu. */
const centaine = (de: number, a: number, k: number) => {
  const [cw, ch] = [29, 26];
  const n = a - de + 1;
  const H = Math.ceil(n / 10) * ch + 8;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Les nombres de ${de} à ${a}, multiples de ${k} en couleur`}>
        {Array.from({ length: n }, (_, i) => {
          const v = de + i;
          const m = v % k === 0;
          const [x, y] = [5 + (i % 10) * cw, 4 + Math.floor(i / 10) * ch];
          return (
            <g key={v}>
              <rect x={x} y={y} width={cw} height={ch} fill={m ? "#dbeafe" : "#fff"} stroke="#cbd5e1" strokeWidth={1} />
              <text x={x + cw / 2} y={y + ch / 2 + 5} textAnchor="middle" fontSize="14" fontWeight={m ? 900 : 500} fill={m ? BLEU : "#64748b"}>
                {v}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * ⭐ L'ARC-EN-CIEL DES DIVISEURS : les diviseurs de `n` rangés dans l'ordre sur
 * une ligne, et un arc relie chaque paire dont le produit vaut `n` (le premier
 * et le dernier, le deuxième et l'avant-dernier…). Un diviseur seul au milieu
 * (une paire comme 4 × 4) est entouré. ⛔ Douze diviseurs au plus.
 */
const paires = (n: number, diviseurs: number[]) => {
  const [W, m, Y] = [300, 18, 122];
  const k = diviseurs.length;
  const X = (i: number) => (k === 1 ? W / 2 : m + (i * (W - 2 * m)) / (k - 1));
  const couleurs = [BLEU, ORANGE, VERT, ROUGE, "#7c3aed", "#0891b2"];
  const arcs = Array.from({ length: Math.floor(k / 2) }, (_, i) => i);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${Y + 30}`} className="block h-auto w-full" role="img" aria-label={`Les diviseurs de ${n}, par paires`}>
        {arcs.map((i) => {
          const [x1, x2] = [X(i), X(k - 1 - i)];
          const h = 10 + (x2 - x1) * 0.33;
          return <path key={i} d={`M ${x1} ${Y - 16} Q ${(x1 + x2) / 2} ${Y - 16 - 2 * h} ${x2} ${Y - 16}`} fill="none" stroke={couleurs[i % couleurs.length]} strokeWidth={2.4} />;
        })}
        {k % 2 === 1 ? <circle cx={X((k - 1) / 2)} cy={Y - 5} r={14} fill="none" stroke={couleurs[arcs.length % couleurs.length]} strokeWidth={2.4} /> : null}
        {diviseurs.map((d, i) => (
          <text key={d} x={X(i)} y={Y} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
            {d}
          </text>
        ))}
        <text x={W / 2} y={Y + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill="#475569">
          {`produit de chaque paire : ${n}`}
        </text>
      </svg>
    </div>
  );
};

/**
 * LA SOMME DES CHIFFRES, POSÉE : chaque chiffre de `nombre` dans sa case, les
 * « + » entre eux, la somme au bout, et le verdict pour `diviseur` dessous. La
 * somme et le verdict sont CALCULÉS : le dessin ne peut pas se tromper, le
 * corrigé, lui, est vérifié par le script.
 */
const sommeChiffres = (nombre: string, diviseur: number) => {
  const chiffres = nombre.replace(/\s/g, "").split("").map(Number);
  const S = chiffres.reduce((a, b) => a + b, 0);
  const [w, g] = [30, 20];
  const large = chiffres.length * w + (chiffres.length - 1) * g + 56;
  const x0 = (300 - large) / 2;
  const ok = S % diviseur === 0;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 96" className="block h-auto w-full" role="img" aria-label={`Somme des chiffres de ${nombre}`}>
        {chiffres.map((ch, i) => (
          <g key={i}>
            <rect x={x0 + i * (w + g)} y={8} width={w} height={34} rx={6} fill="#eff6ff" stroke={BLEU} strokeWidth={1.8} />
            <text x={x0 + i * (w + g) + w / 2} y={31} textAnchor="middle" fontSize="18" fontWeight="800" fill={NOIR}>
              {ch}
            </text>
            {i < chiffres.length - 1 ? (
              <text x={x0 + i * (w + g) + w + g / 2} y={31} textAnchor="middle" fontSize="16" fontWeight="800" fill="#475569">
                +
              </text>
            ) : null}
          </g>
        ))}
        <text x={x0 + chiffres.length * (w + g) - g + 8} y={31} fontSize="18" fontWeight="900" fill={ok ? VERT : ROUGE}>
          {`= ${S}`}
        </text>
        <text x={150} y={72} textAnchor="middle" fontSize="14" fontWeight="800" fill={ok ? VERT : ROUGE}>
          {`${S} ${ok ? "est" : "n'est pas"} dans la table de ${diviseur}`}
        </text>
      </svg>
    </div>
  );
};

/**
 * LA FRISE DES MULTIPLES (celle de la feuille de 4e) : de 0 à `max`, les
 * multiples de `a` au-dessus (bleu), ceux de `b` au-dessous (orange), les
 * multiples COMMUNS en rouge, reliés par un trait. Deux étages quand ils sont
 * serrés. viewBox de 260, nombres en 12,5 (≈ 11,3 px à 375).
 */
const frise = (max: number, a: number, b: number, nomA: string, nomB: string) => {
  const W = 260;
  const g = 16;
  const fs = 12.5;
  const X = (v: number) => g + (v / max) * (W - 2 * g);
  const ma = Array.from({ length: Math.floor(max / a) }, (_, k) => (k + 1) * a);
  const mb = Array.from({ length: Math.floor(max / b) }, (_, k) => (k + 1) * b);
  const serreA = X(a) - X(0) < 26;
  const serreB = X(b) - X(0) < 26;
  const y = serreA ? 50 : 36;
  const H = y + (serreB ? 50 : 36);
  const commun = (v: number) => ma.includes(v) && mb.includes(v);
  return (
    <figure className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Les multiples de ${a} et de ${b} jusqu'à ${max}`} className="block h-auto w-full">
        <line x1={g} y1={y} x2={W - g} y2={y} stroke="#334155" strokeWidth={1.5} />
        <line x1={g} y1={y - 5} x2={g} y2={y + 5} stroke="#334155" strokeWidth={1.5} />
        <text x={g - 4} y={y + 4} textAnchor="end" fontSize={fs} fill="#334155">
          0
        </text>
        {ma.filter(commun).map((v) => (
          <line key={`c${v}`} x1={X(v)} y1={y - 12} x2={X(v)} y2={y + 12} stroke={ROUGE} strokeWidth={2} />
        ))}
        {ma.map((v, k) => (
          <g key={`a${v}`}>
            <circle cx={X(v)} cy={y - 10} r={3.5} fill={commun(v) ? ROUGE : BLEU} />
            <text x={X(v)} y={y - 18 - (serreA && k % 2 === 1 ? 14 : 0)} textAnchor="middle" fontSize={fs} fontWeight={commun(v) ? 700 : 400} fill={commun(v) ? ROUGE : BLEU}>
              {v}
            </text>
          </g>
        ))}
        {mb.map((v, k) => (
          <g key={`b${v}`}>
            <circle cx={X(v)} cy={y + 10} r={3.5} fill={commun(v) ? ROUGE : ORANGE} />
            <text x={X(v)} y={y + 28 + (serreB && k % 2 === 1 ? 14 : 0)} textAnchor="middle" fontSize={fs} fontWeight={commun(v) ? 700 : 400} fill={commun(v) ? ROUGE : ORANGE}>
              {v}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-1 flex flex-wrap justify-center gap-x-4 text-[12px] font-semibold print:text-[9px]">
        <span style={{ color: BLEU }}>● au-dessus : {nomA}</span>
        <span style={{ color: ORANGE }}>● au-dessous : {nomB}</span>
      </figcaption>
    </figure>
  );
};

/** UN MUR CARRELÉ : un rectangle de `longueur` sur `hauteur` (en cm), couvert
 *  de carreaux carrés de `cote` cm, en damier. Les cotes écrites autour. */
const carrelage = (longueur: number, hauteur: number, cote: number) => {
  const s = Math.min(220 / longueur, 150 / hauteur);
  const [L, H] = [longueur * s, hauteur * s];
  const [x0, y0] = [(300 - L) / 2 + 8, 10];
  const nx = Math.round(longueur / cote);
  const ny = Math.round(hauteur / cote);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H + 44}`} className="block h-auto w-full" role="img" aria-label={`Mur de ${longueur} cm sur ${hauteur} cm, carreaux de ${cote} cm`}>
        {Array.from({ length: nx * ny }, (_, i) => {
          const [cx, cy] = [i % nx, Math.floor(i / nx)];
          return <rect key={i} x={x0 + cx * cote * s} y={y0 + cy * cote * s} width={cote * s} height={cote * s} fill={(cx + cy) % 2 ? "#dbeafe" : "#fff7ed"} stroke="#94a3b8" strokeWidth={1} />;
        })}
        <rect x={x0} y={y0} width={L} height={H} fill="none" stroke={NOIR} strokeWidth={2.2} />
        <text x={x0 + L / 2} y={y0 + H + 20} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
          {`${longueur} cm`}
        </text>
        <text x={x0 - 8} y={y0 + H / 2 + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
          {`${hauteur} cm`}
        </text>
        <text x={x0 + (cote * s) / 2} y={y0 + (cote * s) / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={ROUGE}>
          {`${cote}`}
        </text>
      </svg>
    </div>
  );
};

export const exercicesDivisibilite5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "divisibilite",
  titre: "Multiples, diviseurs et divisibilité",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître un multiple et un diviseur, appliquer les critères par 2, 5 et 10, puis par 3 et 9, lister tous les diviseurs par paires, trouver un chiffre caché. Des jetons en rectangle, une plantation de salades, deux robots sur une règle, le code d'un cadenas, les chaises de la fête du collège, un mur à carreler, et pourquoi la règle du 9 marche. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le dessin.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/divisibilite", titre: "Multiples, diviseurs et divisibilité" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je justifie par un produit, un critère ou une division, jamais par une impression.",
      rappel: [
        "Si $a = b \\times k$ avec $k$ entier, alors $a$ est un MULTIPLE de $b$, et $b$ est un DIVISEUR de $a$ : la division de $a$ par $b$ tombe juste.",
        "Par $2$ : le dernier chiffre est $0$, $2$, $4$, $6$ ou $8$. Par $5$ : il est $0$ ou $5$. Par $10$ : il est $0$.",
        "Par $3$ (ou par $9$) : la somme des chiffres est dans la table de $3$ (ou de $9$).",
        "Les diviseurs vont par PAIRES : je pars de $1$, et je m'arrête quand les paires se croisent.",
      ],
      exercices: [
        {
          enonce: "On sait que $8 \\times 9 = 72$. Complète par « multiple » ou « diviseur ».\na) $72$ est un … de $8$.\nb) $9$ est un … de $72$.\nc) $72$ est un … de $9$.\nd) $72$ est-il aussi un multiple de $7$ ?",
          correction:
            "L'égalité $8 \\times 9 = 72$ dit que $72$ jetons se rangent en $8$ rangées de $9$, sans qu'il en reste : c'est le dessin.\na) $72$ s'obtient en multipliant $8$ par un nombre entier : $72$ est un multiple de $8$.\nb) La division de $72$ par $9$ tombe juste ($72 \\div 9 = 8$) : $9$ est un diviseur de $72$.\nc) $72$ est aussi un multiple de $9$ : la même égalité se lit dans les deux sens.\nd) Je cherche $72$ dans la table de $7$ : $7 \\times 10 = 70$ et $7 \\times 11 = 77$. $72$ tombe entre les deux : $72 = 7 \\times 10 + 2$, il reste $2$. Ce n'est pas un multiple de $7$.\n⛔ Le piège : échanger les deux mots. Le multiple est le GRAND nombre ($72$), le diviseur est le petit ($8$ ou $9$).\nRéponse : a) multiple ; b) diviseur ; c) multiple ; d) non.",
          schema: rangement(72, 9),
          micros: ["div_multiple_diviseur"],
        },
        {
          enonce: "a) Écris tous les multiples de $7$ compris entre $50$ et $100$.\nb) Parmi eux, lesquels sont pairs ?\nc) Combien y a-t-il de multiples de $7$ entre $50$ et $100$ ?",
          correction:
            "a) Je récite la table de $7$ à partir d'un produit proche de $50$ : $7 \\times 7 = 49$, c'est juste en dessous. Puis $7 \\times 8 = 56$, $7 \\times 9 = 63$, $7 \\times 10 = 70$, $7 \\times 11 = 77$, $7 \\times 12 = 84$, $7 \\times 13 = 91$, $7 \\times 14 = 98$. Et $7 \\times 15 = 105$ dépasse $100$.\nb) Un nombre pair se termine par $0$, $2$, $4$, $6$ ou $8$ : $56$, $70$, $84$ et $98$. Un sur deux : on ajoute $7$, un nombre impair, à chaque pas.\nc) Je les compte sur la grille : il y en a $7$.\n⛔ Le piège : compter $49$ ou $105$. $49$ est plus petit que $50$ et $105$ plus grand que $100$ : ils sont en dehors.\nRéponse : a) $56$, $63$, $70$, $77$, $84$, $91$, $98$ ; b) $56$, $70$, $84$, $98$ ; c) $7$.",
          schema: centaine(51, 100, 7),
          micros: ["div_multiple_diviseur"],
        },
        {
          enonce: "Range ces nombres dans un diagramme à deux cercles : « divisible par $2$ » et « divisible par $5$ ».\n$64$ ; $85$ ; $130$ ; $318$ ; $245$ ; $500$ ; $777$\nQue peut-on dire des nombres qui sont dans les deux cercles à la fois ?",
          correction:
            "Pour $2$ et pour $5$, je ne regarde QUE le chiffre des unités.\nDivisibles par $2$ (unités $0$, $2$, $4$, $6$ ou $8$) : $64$, $130$, $318$, $500$.\nDivisibles par $5$ (unités $0$ ou $5$) : $85$, $130$, $245$, $500$.\nDans les deux cercles : $130$ et $500$. Ils se terminent par $0$ : ils sont divisibles par $10$.\n$777$ se termine par $7$ : il n'est dans aucun cercle.\n⭐ Un nombre qui se termine par $0$ est divisible par $2$, par $5$ et par $10$ à la fois.\n⛔ Le piège : ranger $85$ avec les nombres pairs parce que $8$ est pair. Seul le DERNIER chiffre compte.\nRéponse : par $2$ seulement : $64$, $318$ ; par $5$ seulement : $85$, $245$ ; dans les deux : $130$, $500$ ; dehors : $777$.",
          schema: venn({ aSeul: ["64", "318"], commun: ["130", "500"], bSeul: ["85", "245"], dehors: ["777"] }, { a: "par 2", b: "par 5", e: "nombres" }),
          micros: ["div_critere_2_5_10"],
        },
        {
          enonce: "Calcule la somme des chiffres de chaque nombre, puis dis s'il est divisible par $3$ et s'il est divisible par $9$.\n$471$ ; $2\\,088$ ; $5\\,101$ ; $369$",
          correction:
            "Pour $3$ et $9$, je ne pose pas la division : j'additionne les chiffres, et je regarde si cette somme est dans la table de $3$ ou de $9$.\n$471$ : $4 + 7 + 1 = 12$. $12$ est dans la table de $3$, pas dans celle de $9$ : divisible par $3$ seulement.\n$2\\,088$ : $2 + 0 + 8 + 8 = 18$. $18$ est dans les deux tables : divisible par $3$ et par $9$.\n$5\\,101$ : $5 + 1 + 0 + 1 = 7$ : ni par $3$, ni par $9$.\n$369$ : $3 + 6 + 9 = 18$ : divisible par $3$ et par $9$.\n⭐ Un nombre divisible par $9$ l'est toujours par $3$, puisque $9 = 3 \\times 3$. L'inverse est faux : regarde $471$.\n⛔ Le piège : regarder le dernier chiffre. $471$ se termine par $1$, et il est pourtant divisible par $3$ : $471 = 3 \\times 157$.\nRéponse : $471$ par $3$ seulement ; $2\\,088$ et $369$ par $3$ et par $9$ ; $5\\,101$ par aucun des deux.",
          schema: ecranSeulement(
            table(["nombre", "somme", "par 3 ; par 9"], [
              ["471", "12", "oui ; non"],
              ["2 088", "18", "oui ; oui"],
              ["5 101", "7", "non ; non"],
              ["369", "18", "oui ; oui"],
            ]),
          ),
          micros: ["div_critere_3_9"],
        },
        {
          enonce: "Trouve tous les diviseurs de $40$, en les cherchant par paires. Combien y en a-t-il ?",
          correction:
            "Je pars de $1$ et j'avance. Chaque diviseur trouvé en donne un deuxième : celui qui complète le produit.\n$1 \\times 40 = 40$ : $1$ et $40$.\n$2 \\times 20 = 40$ : $2$ et $20$ ($40$ est pair).\n$3$ : non, $4 + 0 = 4$ n'est pas dans la table de $3$.\n$4 \\times 10 = 40$ : $4$ et $10$.\n$5 \\times 8 = 40$ : $5$ et $8$ ($40$ se termine par $0$).\n$6$ : non, $6 \\times 6 = 36$ et $6 \\times 7 = 42$. $7$ : non, $7 \\times 5 = 35$ et $7 \\times 6 = 42$.\nJe m'arrête : après $7$ vient $8$, qui est déjà dans ma liste. Les paires se croisent.\n⛔ Le piège : ne garder que les petits, $1$, $2$, $4$ et $5$. Chaque petit diviseur amène son partenaire : $40$, $20$, $10$ et $8$.\nRéponse : $1$, $2$, $4$, $5$, $8$, $10$, $20$ et $40$ : huit diviseurs.",
          schema: paires(40, [1, 2, 4, 5, 8, 10, 20, 40]),
          micros: ["div_lister_diviseurs"],
        },
        {
          enonce:
            "Paul affirme : « $91$ n'est dans aucune table de multiplication. Il est impair, il ne se termine ni par $0$ ni par $5$, et $9 + 1 = 10$ n'est pas dans la table de $3$. »\na) Qu'est-ce que Paul a vérifié exactement ?\nb) Essaie de diviser $91$ par $7$. Que conclus-tu ?\nc) Écris une phrase avec « multiple » et une phrase avec « diviseur ».",
          correction:
            "a) Paul a vérifié que $91$ n'est divisible ni par $2$, ni par $5$, ni par $10$, ni par $3$ (donc ni par $9$). C'est juste, mais il n'a pas essayé les autres nombres.\nb) $7 \\times 13 = 91$ : la division de $91$ par $7$ tombe juste. $91$ est dans la table de $7$, et dans celle de $13$.\nc) $91$ est un multiple de $7$. $13$ est un diviseur de $91$.\n⛔ Le piège : croire que les critères disent tout. Pour $7$, il n'y a pas de critère simple : il faut essayer la division.\nRéponse : $91 = 7 \\times 13$ : Paul a tort.",
          schema: rangement(91, 7),
          micros: ["div_multiple_diviseur", "div_critere_2_5_10", "div_defi"],
        },
        {
          enonce: "Dans chaque liste, un seul nombre ne suit pas la règle des autres. Trouve la règle et l'intrus.\na) $35$ ; $70$ ; $105$ ; $142$ ; $205$\nb) $18$ ; $54$ ; $81$ ; $99$ ; $108$ ; $115$\nc) $120$ ; $450$ ; $1\\,000$ ; $2\\,005$ ; $3\\,070$",
          correction:
            "a) Tous se terminent par $0$ ou $5$, sauf $142$ : la règle est « divisible par $5$ », et l'intrus est $142$.\nb) Les sommes des chiffres : $1 + 8 = 9$ ; $5 + 4 = 9$ ; $8 + 1 = 9$ ; $9 + 9 = 18$ ; $1 + 0 + 8 = 9$ ; $1 + 1 + 5 = 7$. La règle est « divisible par $9$ », et l'intrus est $115$.\nc) Tous se terminent par $0$, sauf $2\\,005$ : la règle est « divisible par $10$ », et l'intrus est $2\\,005$.\n⛔ Le piège du b) : chercher « pair ou impair ». $81$, $99$ et $115$ sont impairs : il y aurait trois intrus, ce n'est pas la bonne règle.\nRéponse : a) $142$ ; b) $115$ ; c) $2\\,005$.",
          schema: ecranSeulement(
            table(["liste", "la règle", "l'intrus"], [
              ["a", "par 5", "142"],
              ["b", "par 9", "115"],
              ["c", "par 10", "2 005"],
            ]),
          ),
          micros: ["div_critere_2_5_10", "div_critere_3_9"],
        },
        {
          enonce: "Le nombre $2\\,520$ est-il divisible par $2$ ? par $3$ ? par $5$ ? par $9$ ? par $10$ ? Réponds sans poser de division, en disant quel critère tu utilises.",
          correction:
            "Pour $2$, $5$ et $10$, je regarde le chiffre des unités : c'est $0$. Donc $2\\,520$ est divisible par $2$, par $5$ et par $10$.\nPour $3$ et $9$, j'additionne les chiffres : $2 + 5 + 2 + 0 = 9$. $9$ est dans la table de $3$ et dans celle de $9$ : $2\\,520$ est divisible par $3$ et par $9$.\n⭐ $2\\,520$ passe les cinq tests. C'est même le plus petit nombre divisible par tous les nombres de $1$ à $10$.\n⛔ Le piège : utiliser la somme des chiffres pour $2$ ou pour $5$. Elle vaut $9$, un nombre impair, et pourtant $2\\,520$ est pair.\nRéponse : $2\\,520$ est divisible par $2$, $3$, $5$, $9$ et $10$.",
          schema: sommeChiffres("2 520", 9),
          micros: ["div_critere_2_5_10", "div_critere_3_9"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'écris le critère ou le produit qui justifie chaque réponse, puis je vérifie.",
      rappel: [
        "Un chiffre caché : j'écris la condition du critère, puis j'essaie les chiffres de $0$ à $9$.",
        "Un diviseur commun à deux nombres est dans les deux listes de diviseurs. Pour partager deux quantités sans reste, il en faut un.",
        "Les multiples communs à deux nombres sont dans les deux listes de multiples.",
      ],
      exercices: [
        {
          enonce: "Trouve toutes les valeurs possibles du chiffre caché.\na) $5\\square4$ est divisible par $9$.\nb) $72\\square$ est divisible par $3$ et par $5$.\nc) $1\\square6\\triangle$ est divisible par $10$ et par $9$ (deux chiffres cachés).",
          correction:
            "a) Divisible par $9$ : la somme des chiffres doit être dans la table de $9$. Sans le chiffre caché : $5 + 4 = 9$. Il faut $9 + \\square = 9$ ou $18$ : $\\square = 0$ ou $\\square = 9$. Les nombres sont $504$ et $594$.\nb) Divisible par $5$ : le chiffre caché vaut $0$ ou $5$. Je teste la somme pour $3$ : $7 + 2 + 0 = 9$, oui ; $7 + 2 + 5 = 14$, non. Seul $720$ convient.\nc) Divisible par $10$ : $\\triangle = 0$. Puis $1 + \\square + 6 + 0 = 7 + \\square$ doit être dans la table de $9$ : c'est $9$, donc $\\square = 2$ ($18$ demanderait $\\square = 11$, qui n'est pas un chiffre). Le nombre est $1\\,260$.\n⛔ Le piège du a) : oublier $\\square = 0$. $504$ a bien un zéro au milieu, et $5 + 0 + 4 = 9$.\nRéponse : a) $504$ ou $594$ ; b) $720$ ; c) $1\\,260$.",
          schema: ecranSeulement(
            table(["nombre", "condition", "réponse"], [
              ["5□4", "par 9", "504 ; 594"],
              ["72□", "par 3 et 5", "720"],
              ["1□6△", "par 10 et 9", "1 260"],
            ]),
          ),
          micros: ["div_critere_3_9", "div_critere_2_5_10", "div_defi"],
        },
        {
          enonce: "a) Liste les diviseurs de $32$, puis ceux de $48$.\nb) Quels sont leurs diviseurs communs ? Quel est le plus grand ?\nc) Utilise-le pour simplifier la fraction $\\dfrac{32}{48}$ en une seule étape.",
          correction:
            "a) Par paires. $32 = 1 \\times 32 = 2 \\times 16 = 4 \\times 8$ ; $3$ et $5$ ne tombent pas juste, et $6 \\times 6 = 36$ dépasse $32$. Diviseurs de $32$ : $1$, $2$, $4$, $8$, $16$, $32$.\n$48 = 1 \\times 48 = 2 \\times 24 = 3 \\times 16 = 4 \\times 12 = 6 \\times 8$. Diviseurs de $48$ : $1$, $2$, $3$, $4$, $6$, $8$, $12$, $16$, $24$, $48$.\nb) Les nombres présents dans les deux listes : $1$, $2$, $4$, $8$ et $16$. Le plus grand est $16$.\nc) Je divise le haut et le bas par $16$ : $32 \\div 16 = 2$ et $48 \\div 16 = 3$. Donc $\\dfrac{32}{48} = \\dfrac{2}{3}$.\n⭐ Diviser par $2$ quatre fois de suite marche aussi, mais en quatre étapes.\n⛔ Le piège : prendre $32$ comme diviseur commun parce qu'il divise $32$. $48 = 32 \\times 1 + 16$ : il reste $16$.\nRéponse : b) $1$, $2$, $4$, $8$, $16$ ; le plus grand est $16$ ; c) $\\dfrac{32}{48} = \\dfrac{2}{3}$.",
          schema: venn({ aSeul: ["32"], commun: ["1", "2", "4", "8", "16"], bSeul: ["3", "6", "12", "24", "48"] }, { a: "de 32", b: "de 48", e: "diviseurs" }),
          micros: ["div_lister_diviseurs", "div_defi"],
        },
        {
          enonce:
            "Un maraîcher veut planter $60$ salades en rangées qui ont toutes le même nombre de salades. Il veut au moins $3$ rangées, et au moins $3$ salades par rangée.\na) Liste les diviseurs de $60$ par paires.\nb) Donne toutes les plantations possibles.\nc) Laquelle est la plus proche d'un carré ?",
          correction:
            "a) $60 = 1 \\times 60 = 2 \\times 30 = 3 \\times 20 = 4 \\times 15 = 5 \\times 12 = 6 \\times 10$. $7$ ne tombe pas juste, et $8 \\times 8 = 64$ dépasse $60$ : je m'arrête. Les diviseurs de $60$ sont $1$, $2$, $3$, $4$, $5$, $6$, $10$, $12$, $15$, $20$, $30$, $60$.\nb) Le nombre de rangées doit diviser $60$, valoir au moins $3$, et laisser au moins $3$ salades par rangée : $3$, $4$, $5$, $6$, $10$, $12$, $15$ ou $20$ rangées.\nSoit $3$ rangées de $20$, $4$ de $15$, $5$ de $12$, $6$ de $10$, $10$ de $6$, $12$ de $5$, $15$ de $4$, $20$ de $3$ : huit plantations.\nc) Un carré a autant de rangées que de salades par rangée. Les deux nombres les plus proches sont $6$ et $10$ : $6$ rangées de $10$, ou $10$ rangées de $6$.\n⛔ Le piège : garder $2$ rangées de $30$, ou $60$ rangées de $1$. L'énoncé demande au moins $3$ de chaque.\nRéponse : huit plantations, de $3$ rangées de $20$ à $20$ rangées de $3$ ; la plus proche d'un carré : $6$ rangées de $10$.",
          schema: paires(60, [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60]),
          micros: ["div_lister_diviseurs", "div_multiple_diviseur"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifie par une explication ou par un contre-exemple.\na) Un nombre qui se termine par $3$ est divisible par $3$.\nb) Un nombre divisible par $2$ et par $5$ est divisible par $10$.\nc) Un nombre dont la somme des chiffres vaut $9$ est divisible par $9$.\nd) Un nombre a toujours un nombre pair de diviseurs.",
          correction:
            "a) Faux. Contre-exemple : $43$ se termine par $3$, mais $4 + 3 = 7$ n'est pas dans la table de $3$. Pour $3$, le dernier chiffre ne dit rien.\nb) Vrai. Par $2$ : le dernier chiffre est pair. Par $5$ : il vaut $0$ ou $5$. Le seul qui convient aux deux est $0$, et un nombre qui se termine par $0$ est divisible par $10$.\nc) Vrai : c'est le critère de divisibilité par $9$, puisque $9$ est dans la table de $9$.\nd) Faux. Contre-exemple : $16$. Par paires : $1 \\times 16$, $2 \\times 8$, $4 \\times 4$. La paire $4 \\times 4$ ne donne qu'un seul diviseur : $16$ a cinq diviseurs, $1$, $2$, $4$, $8$ et $16$.\n⛔ Le piège du d) : compter $4$ deux fois. Dans la liste des diviseurs, chaque nombre ne s'écrit qu'une fois.\nRéponse : a) faux ; b) vrai ; c) vrai ; d) faux.",
          schema: ecranSeulement(paires(16, [1, 2, 4, 8, 16])),
          micros: ["div_defi", "div_critere_3_9", "div_critere_2_5_10", "div_lister_diviseurs"],
        },
        {
          enonce:
            "Noé a $38$ jetons. Il veut les ranger en un rectangle plein de $6$ colonnes, sans qu'il en reste.\na) Est-ce possible ? Explique avec la table de $6$.\nb) Combien de jetons doit-il enlever, au minimum, pour y arriver ? Et combien doit-il en ajouter, au minimum ?\nc) Avec ses $38$ jetons, quels nombres de colonnes permettent un rectangle plein, avec au moins $2$ colonnes et $2$ rangées ?",
          correction:
            "a) $6 \\times 6 = 36$ et $6 \\times 7 = 42$ : $38$ est entre les deux, ce n'est pas un multiple de $6$. $38 = 6 \\times 6 + 2$ : avec $6$ rangées de $6$, il reste $2$ jetons, comme sur le dessin.\nb) Enlever : je descends au multiple de $6$ juste en dessous, $36$. Il enlève $38 - 36 = 2$ jetons.\nAjouter : je monte au multiple de $6$ juste au-dessus, $42$. Il ajoute $42 - 38 = 4$ jetons.\nc) Les diviseurs de $38$ : $1 \\times 38$, $2 \\times 19$. $3$, $4$, $5$ et $6$ ne tombent pas juste, et $7 \\times 7 = 49$ dépasse $38$. Avec au moins $2$ colonnes et $2$ rangées : $2$ colonnes (de $19$ jetons de haut) ou $19$ colonnes (de $2$ jetons de haut).\n⛔ Le piège du b) : répondre $4$ pour « enlever » en visant $42$. Enlever fait DESCENDRE : le multiple de $6$ visé est $36$.\nRéponse : a) non, il reste $2$ jetons ; b) enlever $2$ jetons, ou en ajouter $4$ ; c) $2$ ou $19$ colonnes.",
          schema: rangement(38, 6),
          micros: ["div_multiple_diviseur", "div_lister_diviseurs", "div_defi"],
        },
        {
          enonce: "Pour chaque nombre, écris par lesquels des nombres $2$, $3$, $5$, $9$ et $10$ il est divisible.\n$1\\,350$ ; $2\\,718$ ; $4\\,005$ ; $994$",
          correction:
            "Je fais deux tests pour chaque nombre : le dernier chiffre (pour $2$, $5$ et $10$), puis la somme des chiffres (pour $3$ et $9$).\n$1\\,350$ : il se termine par $0$, donc par $2$, $5$ et $10$. $1 + 3 + 5 + 0 = 9$ : par $3$ et par $9$.\n$2\\,718$ : il se termine par $8$, donc par $2$, mais ni par $5$ ni par $10$. $2 + 7 + 1 + 8 = 18$ : par $3$ et par $9$.\n$4\\,005$ : il se termine par $5$, donc par $5$, mais ni par $2$ ni par $10$. $4 + 0 + 0 + 5 = 9$ : par $3$ et par $9$.\n$994$ : il se termine par $4$, donc par $2$ seulement. $9 + 9 + 4 = 22$ : ni par $3$, ni par $9$.\n⛔ Le piège : dire $994$ divisible par $9$ parce qu'il commence par deux $9$. On additionne TOUS les chiffres.\nRéponse : $1\\,350$ par $2$, $3$, $5$, $9$ et $10$ ; $2\\,718$ par $2$, $3$ et $9$ ; $4\\,005$ par $3$, $5$ et $9$ ; $994$ par $2$ seulement.",
          schema: ecranSeulement(
            table(["nombre", "divisible par", "pas par"], [
              ["1 350", "2, 3, 5, 9, 10", "—"],
              ["2 718", "2, 3, 9", "5, 10"],
              ["4 005", "3, 5, 9", "2, 10"],
              ["994", "2", "3, 5, 9, 10"],
            ]),
          ),
          micros: ["div_critere_2_5_10", "div_critere_3_9"],
        },
        {
          enonce: "Je suis un nombre de trois chiffres, compris entre $300$ et $400$. Je suis divisible par $5$ et par $9$, mais pas par $10$. Qui suis-je ?",
          correction:
            "Divisible par $5$ mais pas par $10$ : mon chiffre des unités est $5$. Avec $0$, je serais divisible par $10$.\nEntre $300$ et $400$ : mon chiffre des centaines est $3$. Je m'écris $3\\square5$.\nDivisible par $9$ : $3 + \\square + 5 = 8 + \\square$ doit être dans la table de $9$. Avec un seul chiffre, seul $9$ est possible : $\\square = 1$.\nJe suis $315$. Contrôle : $3 + 1 + 5 = 9$, et $315 = 9 \\times 35$.\n⛔ Le piège : choisir $0$ pour les unités parce que « $0$ marche pour $5$ ». Le nombre serait alors divisible par $10$, ce que l'énoncé interdit.\nRéponse : je suis $315$.",
          schema: ecranSeulement(sommeChiffres("315", 9)),
          micros: ["div_defi", "div_critere_2_5_10", "div_critere_3_9"],
        },
        {
          enonce:
            "Deux petits robots, programmés en cours de technologie, avancent sur une règle graduée. Tous deux partent de $0$. Le robot A fait des pas de $3$ cm, le robot B des pas de $5$ cm.\na) Écris les graduations où le robot A se pose, jusqu'à $50$ cm.\nb) Même question pour le robot B.\nc) Sur quelles graduations se posent-ils tous les deux ? Quelle est la première ?",
          correction:
            "a) Le robot A se pose sur les multiples de $3$ : $3$, $6$, $9$, $12$, $15$, $18$, $21$, $24$, $27$, $30$, $33$, $36$, $39$, $42$, $45$, $48$.\nb) Le robot B se pose sur les multiples de $5$ : $5$, $10$, $15$, $20$, $25$, $30$, $35$, $40$, $45$, $50$.\nc) Ils se posent tous les deux sur les nombres des deux listes : $15$, $30$ et $45$. Ce sont les multiples communs à $3$ et à $5$. Le premier est $15$.\n⭐ $15$, $30$ et $45$ sont les multiples de $15$ : les deux robots se retrouvent tous les $15$ cm.\n⛔ Le piège : comparer seulement le début des deux listes et répondre « jamais ». Il faut aller assez loin : la première rencontre est à $15$ cm.\nRéponse : c) sur $15$, $30$ et $45$ cm ; la première est $15$ cm.",
          schema: frise(50, 3, 5, "robot A : pas de 3 cm", "robot B : pas de 5 cm"),
          micros: ["div_multiple_diviseur"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je traduis en multiples ou en diviseurs, puis je réponds par une phrase.",
      rappel: [
        "Partager ou ranger sans reste : je cherche des DIVISEURS. Se retrouver au même endroit : je cherche des MULTIPLES.",
        "Pour montrer qu'un nombre N'EST PAS divisible, un critère suffit ; sinon, je pose la division.",
        "Je vérifie en remultipliant, et j'écris une phrase de réponse.",
      ],
      exercices: [
        {
          titre: "Le code du cadenas",
          enonce:
            "Le code du cadenas de Lina a quatre chiffres. Elle a laissé des indices.\nIndice 1 : le code est divisible par $2$ et par $5$.\nIndice 2 : il est divisible par $9$.\nIndice 3 : son premier chiffre est $7$, et ses deux chiffres du milieu sont égaux.\na) Grâce à l'indice 1, trouve le dernier chiffre.\nb) Écris le code avec les indices 1 et 3, en notant $\\square$ les deux chiffres du milieu.\nc) Trouve le code.\nd) Vérifie en divisant le code par $9$.",
          correction:
            "a) Divisible par $2$ : le dernier chiffre est pair. Par $5$ : il vaut $0$ ou $5$. Le seul chiffre qui convient aux deux est $0$.\nb) Le code s'écrit $7\\square\\square0$.\nc) Divisible par $9$ : $7 + \\square + \\square + 0$ doit être dans la table de $9$.\nSi $\\square = 1$ : $7 + 1 + 1 + 0 = 9$, oui.\nPour arriver à $18$, il faudrait $\\square + \\square = 11$ : impossible, deux chiffres égaux font une somme paire. Pour $27$, il faudrait $\\square + \\square = 20$, soit $\\square = 10$ : ce n'est pas un chiffre.\nLe code est $7\\,110$.\nd) $7\\,110 = 9 \\times 790$ : la division tombe juste.\n⛔ Le piège du a) : choisir $5$ pour le dernier chiffre. $5$ est impair : le code ne serait pas divisible par $2$.\nRéponse : le code est $7\\,110$.",
          schema: sommeChiffres("7 110", 9),
          micros: ["div_defi", "div_critere_2_5_10", "div_critere_3_9"],
        },
        {
          titre: "Les chaises de la fête du collège",
          enonce:
            "Pour la fête du collège, on installe $120$ chaises en rangées qui ont toutes le même nombre de chaises. Une rangée doit compter entre $8$ et $20$ chaises.\na) Liste les diviseurs de $120$ compris entre $8$ et $20$.\nb) Donne toutes les installations possibles, avec le nombre de rangées.\nc) On veut un nombre de rangées pair, pour faire une allée au milieu. Quelles installations restent ?\nd) Sept chaises de plus arrivent : $127$ chaises. Peut-on encore les ranger en rangées égales de $8$ à $20$ chaises ?",
          correction:
            "a) Je teste les nombres de $8$ à $20$ un par un.\n$120 = 8 \\times 15$, $120 = 10 \\times 12$, $120 = 12 \\times 10$, $120 = 15 \\times 8$, $120 = 20 \\times 6$.\n$9$ : non, $1 + 2 + 0 = 3$ n'est pas dans la table de $9$. $11$, $13$, $14$, $16$, $17$, $18$ et $19$ : aucun ne tombe juste (par exemple $120 = 11 \\times 10 + 10$).\nLes diviseurs de $120$ entre $8$ et $20$ sont $8$, $10$, $12$, $15$ et $20$.\nb) $15$ rangées de $8$ ; $12$ rangées de $10$ ; $10$ rangées de $12$ ; $8$ rangées de $15$ ; $6$ rangées de $20$.\nc) Nombre de rangées pair : $12$, $10$, $8$ ou $6$ rangées. Seule l'installation en $15$ rangées de $8$ disparaît.\nd) $127$ est impair : ni $8$, ni $10$, ni $12$, ni $14$, ni $16$, ni $18$, ni $20$. Il se termine par $7$ : ni $15$. $1 + 2 + 7 = 10$ : ni $9$. Il reste à essayer $11$, $13$, $17$ et $19$ : $127 = 11 \\times 11 + 6$ ; $127 = 13 \\times 9 + 10$ ; $127 = 17 \\times 7 + 8$ ; $127 = 19 \\times 6 + 13$. Aucune division ne tombe juste.\n⛔ Le piège du c) : confondre le nombre de rangées et le nombre de chaises par rangée. « $8$ rangées de $15$ » a bien un nombre de rangées pair.\nRéponse : b) cinq installations ; c) $12$ rangées de $10$, $10$ de $12$, $8$ de $15$ et $6$ de $20$ ; d) non, c'est impossible.",
          schema: table(["par rangée", "rangées", "pair ?"], [
            ["8", "15", "non"],
            ["10", "12", "oui"],
            ["12", "10", "oui"],
            ["15", "8", "oui"],
            ["20", "6", "oui"],
          ]),
          micros: ["div_lister_diviseurs", "div_critere_2_5_10", "div_critere_3_9", "div_defi"],
        },
        {
          titre: "Pourquoi la règle du 9 marche",
          enonce:
            "On veut comprendre pourquoi la somme des chiffres dit si un nombre est divisible par $9$. On prend $5\\,427$.\na) Vérifie que $10 = 9 + 1$, $100 = 99 + 1$ et $1\\,000 = 999 + 1$. Les nombres $9$, $99$ et $999$ sont-ils des multiples de $9$ ?\nb) On écrit $5\\,427 = 5 \\times 1\\,000 + 4 \\times 100 + 2 \\times 10 + 7$. Montre que $5\\,427$ s'écrit $5 \\times 999 + 4 \\times 99 + 2 \\times 9$, plus la somme de ses chiffres $5 + 4 + 2 + 7$.\nc) Pourquoi $5 \\times 999 + 4 \\times 99 + 2 \\times 9$ est-il un multiple de $9$ ?\nd) Conclus : $5\\,427$ est-il divisible par $9$ ?",
          correction:
            "a) $9 + 1 = 10$, $99 + 1 = 100$, $999 + 1 = 1\\,000$. Et $9 = 9 \\times 1$, $99 = 9 \\times 11$, $999 = 9 \\times 111$ : ce sont des multiples de $9$.\nb) Je remplace $1\\,000$ par $999 + 1$, $100$ par $99 + 1$, $10$ par $9 + 1$.\n$5 \\times 1\\,000 = 5 \\times 999 + 5$ ; $4 \\times 100 = 4 \\times 99 + 4$ ; $2 \\times 10 = 2 \\times 9 + 2$.\nEn regroupant : $5 \\times 999 + 4 \\times 99 + 2 \\times 9$, plus $5 + 4 + 2 + 7$. Les chiffres du nombre se retrouvent seuls, additionnés.\nc) $5 \\times 999$, $4 \\times 99$ et $2 \\times 9$ sont des multiples de $9$. Leur somme aussi : $4\\,995 + 396 + 18 = 5\\,409$, et $5\\,409 = 9 \\times 601$.\nd) Il reste la somme des chiffres : $5 + 4 + 2 + 7 = 18$, un multiple de $9$. Un multiple de $9$ plus un multiple de $9$, cela donne un multiple de $9$ : $5\\,427$ est divisible par $9$. Contrôle : $5\\,427 = 9 \\times 603$.\n⭐ Le même raisonnement marche pour $3$, puisque $9$, $99$ et $999$ sont aussi des multiples de $3$.\n⛔ Le piège : croire que la règle est un tour de magie. Elle vient de ce que $10$, $100$ et $1\\,000$ valent « un multiple de $9$, plus $1$ ».\nRéponse : $5\\,427 = 9 \\times 603$ : il est divisible par $9$, et c'est la somme de ses chiffres, $18$, qui le dit.",
          schema: table(["morceau", "valeur", "table de 9"], [
            ["5 × 999", "4 995", "9 × 555"],
            ["4 × 99", "396", "9 × 44"],
            ["2 × 9", "18", "9 × 2"],
            ["5 + 4 + 2 + 7", "18", "9 × 2"],
          ]),
          micros: ["div_critere_3_9", "div_defi", "div_multiple_diviseur"],
        },
        {
          titre: "Le mur de la salle de bains",
          enonce:
            "Un mur rectangulaire de $120$ cm sur $90$ cm doit être couvert de carreaux carrés tous identiques, sans en couper aucun. Le côté d'un carreau est un nombre entier de centimètres.\na) Peut-on utiliser des carreaux de $20$ cm de côté ? Et de $15$ cm ?\nb) Combien faut-il de carreaux de $15$ cm ?\nc) Quel est le plus grand carreau possible ? Combien en faut-il ?",
          correction:
            "Le côté du carreau doit tenir un nombre entier de fois dans $120$ ET dans $90$ : c'est un diviseur commun aux deux.\na) $120 = 20 \\times 6$, mais $90 = 20 \\times 4 + 10$ : il resterait une bande de $10$ cm. Pas de carreaux de $20$ cm.\n$120 = 15 \\times 8$ et $90 = 15 \\times 6$ : les carreaux de $15$ cm conviennent.\nb) $8$ carreaux dans la longueur, $6$ dans la hauteur : $8 \\times 6 = 48$ carreaux.\nc) Je liste les diviseurs de $90$, le plus petit des deux nombres : $1$, $2$, $3$, $5$, $6$, $9$, $10$, $15$, $18$, $30$, $45$, $90$. Je les teste dans $120$, en partant du plus grand : $90$ et $45$ ne tombent pas juste ($120 = 45 \\times 2 + 30$), $30$ oui : $120 = 30 \\times 4$.\nLe plus grand carreau fait $30$ cm de côté. Il en faut $4 \\times 3 = 12$.\n⛔ Le piège : vérifier une seule des deux longueurs. $20$ divise $120$, mais pas $90$.\nRéponse : a) non pour $20$ cm, oui pour $15$ cm ; b) $48$ carreaux ; c) des carreaux de $30$ cm, $12$ en tout.",
          schema: carrelage(120, 90, 30),
          micros: ["div_lister_diviseurs", "div_multiple_diviseur", "div_defi"],
        },
      ],
    },
  ],
};
