// ─── Les dessins des feuilles « nombres et calcul » du CE1 (17/11/2026) ───────
//
// Partagés par les sept feuilles du CE1 : `maths-ce1-nombre-entier.tsx`,
// `maths-ce1-suite-nombre.tsx`, `maths-ce1-addition-soustraction.tsx`,
// `maths-ce1-multiplication.tsx`, `maths-ce1-division-partage.tsx`,
// `maths-ce1-calcul-mental.tsx` et `maths-ce1-fraction.tsx`.
// Les billes, la droite graduée, l'opération posée et les fractions viennent
// des feuilles du CM1 et du CM2 (`dessins-calcul-cm1.tsx`,
// `dessins-cm1-nombres.tsx`, `dessins-fractions-cm2.tsx`) ; ici, les dessins
// propres au CE1 : le matériel de numération (plaques, barres, cubes), les
// paquets et les jetons à compter, les assiettes d'un partage, la file
// d'attente des ordinaux, la frise de formes, les cases d'une suite, les
// bandes partagées (en parts égales ou non).
// ⭐ Des enfants de 6-7 ans qui lisent mal : le dessin porte la situation. Il
// montre ce qu'on SAIT, jamais la réponse (aucun total, aucun rang écrit).
// ⛔ Texte NU dans les SVG (KaTeX n'y passe pas). Rien en largeur fixe :
// chaque SVG prend `w-full` dans un cadre `max-w`, il tient à 375 px.

import type { ReactNode } from "react";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";
import { posee } from "@/lib/fiches-exercices/dessins-calcul-cm1";

const NOIR = "#0f172a";
const GRIS = "#64748b";
const VERT = "#16a34a";
const JAUNE = "#facc15";
const ROSE = "#db2777";
const VIDE = "#f1f5f9";
const BLEU_CLAIR = "#bfdbfe";

/** Un cadre qui ne s'étire pas au-delà de 1,3 px par unité du dessin. */
const cadre = (W: number, H: number, label: string, contenu: ReactNode, max = "max-w-[22rem] print:max-w-[15rem]") => (
  <div className={`mx-auto w-full ${max}`}>
    <div className="mx-auto w-full" style={{ maxWidth: Math.round(W * 1.3) }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={label}>
        {contenu}
      </svg>
    </div>
  </div>
);

/**
 * LE MATÉRIEL DE NUMÉRATION : `c` plaques de cent (carrés de 10 × 10), `d`
 * barres de dix, `u` cubes. Rien d'écrit : l'enfant compte. 9 de chaque au plus.
 */
export const baseDix = (c: number, d: number, u: number) => {
  const P = 46; // côté d'une plaque
  const gap = 8;
  const parLigne = 5;
  const lignesP = Math.max(1, Math.ceil(c / parLigne));
  const H = Math.max(lignesP * (P + gap), P + gap) + 12;
  const largP = c ? Math.min(c, parLigne) * (P + gap) : 0;
  const xB = 8 + largP + (c ? 12 : 0);
  const largB = d * 11;
  const xU = xB + largB + (d ? 14 : 0);
  const largU = u ? Math.ceil(u / 3) * 12 : 0;
  const W = xU + largU + 8;
  const yBas = 8 + P; // le bas des barres et des cubes, aligné sur la 1re rangée de plaques
  return cadre(
    W,
    H,
    "Matériel de numération : plaques, barres et cubes",
    <>
      {Array.from({ length: c }, (_, k) => {
        const x = 8 + (k % parLigne) * (P + gap);
        const y = 8 + Math.floor(k / parLigne) * (P + gap);
        return (
          <g key={`p${k}`}>
            <rect x={x} y={y} width={P} height={P} fill={BLEU_CLAIR} stroke={BLEU} strokeWidth={1.6} />
            {Array.from({ length: 9 }, (_, i) => (
              <g key={i}>
                <line x1={x + ((i + 1) * P) / 10} y1={y} x2={x + ((i + 1) * P) / 10} y2={y + P} stroke={BLEU} strokeWidth={0.5} />
                <line x1={x} y1={y + ((i + 1) * P) / 10} x2={x + P} y2={y + ((i + 1) * P) / 10} stroke={BLEU} strokeWidth={0.5} />
              </g>
            ))}
          </g>
        );
      })}
      {Array.from({ length: d }, (_, k) => (
        <g key={`b${k}`}>
          <rect x={xB + k * 11} y={yBas - P} width={8} height={P} fill="#fed7aa" stroke={ORANGE} strokeWidth={1.4} />
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={xB + k * 11} y1={yBas - P + ((i + 1) * P) / 10} x2={xB + k * 11 + 8} y2={yBas - P + ((i + 1) * P) / 10} stroke={ORANGE} strokeWidth={0.6} />
          ))}
        </g>
      ))}
      {Array.from({ length: u }, (_, k) => (
        <rect key={`u${k}`} x={xU + Math.floor(k / 3) * 12} y={yBas - 9 - (k % 3) * 12} width={9} height={9} fill="#bbf7d0" stroke={VERT} strokeWidth={1.4} />
      ))}
    </>,
  );
};

/** Des points rangés par lignes de 5 dans une case (x, y) : le contenu d'un paquet. */
const points = (n: number, x: number, y: number, couleur: string, cle: string, parLigne = 5, pas = 15, r = 5.5) =>
  Array.from({ length: n }, (_, i) => (
    <circle key={`${cle}${i}`} cx={x + (i % parLigne) * pas + pas / 2} cy={y + Math.floor(i / parLigne) * pas + pas / 2} r={r} fill={couleur} stroke={NOIR} strokeWidth={1} />
  ));

/**
 * DES PAQUETS ÉGAUX (boîtes, bouquets, nids) : un cadre par paquet, ses objets
 * dedans, puis `seuls` objets hors paquet. Le total n'est jamais écrit.
 */
export const paquets = (liste: number[], opts: { seuls?: number; couleur?: string } = {}) => {
  const couleur = opts.couleur ?? ORANGE;
  const pas = 15;
  const colonnes = Math.min(Math.max(...liste, 1), 5);
  const rangs = Math.ceil(Math.max(...liste, 1) / 5);
  const larg = colonnes * pas + 10;
  const haut = rangs * pas + 10;
  // Les objets seuls prennent la case qui suit le dernier paquet (sans cadre).
  const seuls = opts.seuls ?? 0;
  const cases = liste.length + (seuls ? 1 : 0);
  const parLigne = Math.max(1, Math.min(cases, Math.floor(300 / (larg + 10))));
  const lignes = Math.ceil(cases / parLigne);
  const xSeuls = 8 + (liste.length % parLigne) * (larg + 10);
  const ySeuls = 8 + Math.floor(liste.length / parLigne) * (haut + 10);
  const W = 8 + parLigne * (larg + 10) + 4;
  const H = 8 + lignes * (haut + 10) + 4;
  return cadre(
    W,
    H,
    "Des paquets égaux et des objets seuls",
    <>
      {liste.map((n, k) => {
        const x = 8 + (k % parLigne) * (larg + 10);
        const y = 8 + Math.floor(k / parLigne) * (haut + 10);
        return (
          <g key={`q${k}`}>
            <rect x={x} y={y} width={larg} height={haut} rx={8} fill="#fff7ed" stroke={NOIR} strokeWidth={1.4} />
            {points(n, x + 5, y + 5, couleur, `q${k}-`)}
          </g>
        );
      })}
      {points(seuls, xSeuls + 5, ySeuls + 5, couleur, "s")}
    </>,
  );
};

/** UN TAS DE JETONS rangés par lignes de dix (un petit écart après cinq) : le tout d'un partage. */
export const jetons = (n: number, couleur: string = BLEU) => {
  const pas = 22;
  const lignes = Math.ceil(n / 10);
  const W = 10 * pas + 8 + 16;
  const H = lignes * pas + 16;
  return cadre(
    W,
    H,
    "Des jetons rangés par lignes de dix",
    <>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={8 + (i % 10) * pas + pas / 2 + (i % 10 >= 5 ? 8 : 0)} cy={8 + Math.floor(i / 10) * pas + pas / 2} r={8} fill={couleur} stroke={NOIR} strokeWidth={1.2} />
      ))}
    </>,
    "max-w-[18rem] print:max-w-[13rem]",
  );
};

/**
 * DES PARTAGES à comparer : une ligne par proposition (son nom à gauche), une
 * assiette par part, les objets posés dessus.
 */
export const partages = (lignes: { nom: string; parts: number[] }[]) => {
  const largA = 92;
  const hautA = 48;
  const nParts = Math.max(...lignes.map((l) => l.parts.length));
  const W = 34 + nParts * (largA + 8);
  const H = lignes.length * (hautA + 10) + 6;
  return cadre(
    W,
    H,
    "Des objets partagés sur des assiettes",
    <>
      {lignes.map((l, k) => {
        const y = 6 + k * (hautA + 10);
        return (
          <g key={k}>
            <text x={14} y={y + hautA / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="800" fill={NOIR}>
              {l.nom}
            </text>
            {l.parts.map((n, j) => {
              const x = 30 + j * (largA + 8);
              return (
                <g key={j}>
                  <ellipse cx={x + largA / 2} cy={y + hautA / 2} rx={largA / 2} ry={hautA / 2} fill="#ffffff" stroke={GRIS} strokeWidth={2} />
                  {points(n, x + largA / 2 - (Math.min(n, 4) * 14) / 2, y + hautA / 2 - (Math.ceil(n / 4) * 14) / 2, ORANGE, `a${k}-${j}-`, 4, 14, 5)}
                </g>
              );
            })}
          </g>
        );
      })}
    </>,
  );
};

/** Des ASSIETTES vides, prêtes pour un partage. */
export const assiettesVides = (n: number) => {
  const largA = 80;
  const W = 8 + n * (largA + 10);
  return cadre(
    W,
    56,
    `${n} assiettes vides`,
    <>
      {Array.from({ length: n }, (_, j) => (
        <ellipse key={j} cx={8 + j * (largA + 10) + largA / 2} cy={28} rx={largA / 2} ry={22} fill="#ffffff" stroke={GRIS} strokeWidth={2} />
      ))}
    </>,
    "max-w-[16rem] print:max-w-[11rem]",
  );
};

const COULEURS_FILE = [BLEU, ORANGE, VERT, ROSE, "#7c3aed", "#0891b2", "#ca8a04", "#dc2626", "#475569", "#16a34a"];

/**
 * UNE FILE D'ATTENTE de `n` personnes, la caisse à GAUCHE (le premier est
 * celui qui la touche). `marque` : l'indice (0 = premier) d'une personne
 * coiffée d'une étoile — sans son rang écrit.
 */
export const file = (n: number, opts: { marque?: number; lieu?: string } = {}) => {
  const pas = 34;
  const x0 = 70;
  const W = x0 + n * pas + 10;
  const H = 96;
  return cadre(
    W,
    H,
    `Une file de ${n} personnes devant ${opts.lieu ?? "la caisse"}`,
    <>
      <rect x={6} y={30} width={52} height={50} rx={6} fill={VIDE} stroke={NOIR} strokeWidth={1.6} />
      <text x={32} y={60} textAnchor="middle" fontSize="12" fontWeight="800" fill={NOIR}>
        {opts.lieu ?? "caisse"}
      </text>
      {Array.from({ length: n }, (_, i) => {
        const cx = x0 + i * pas + pas / 2;
        const c = COULEURS_FILE[i % COULEURS_FILE.length];
        return (
          <g key={i}>
            <circle cx={cx} cy={40} r={8} fill="#fde68a" stroke={NOIR} strokeWidth={1.2} />
            <rect x={cx - 11} y={50} width={22} height={30} rx={8} fill={c} stroke={NOIR} strokeWidth={1.2} />
            {opts.marque === i ? (
              <path d={`M ${cx} 12 L ${cx + 3} 20 L ${cx + 11} 20 L ${cx + 5} 25 L ${cx + 7} 33 L ${cx} 28 L ${cx - 7} 33 L ${cx - 5} 25 L ${cx - 11} 20 L ${cx - 3} 20 Z`} fill={JAUNE} stroke={NOIR} strokeWidth={1} />
            ) : null}
          </g>
        );
      })}
      <path d={`M ${x0 + 30} 90 L ${x0 + 4} 90`} stroke={NOIR} strokeWidth={2} />
      <path d={`M ${x0 + 10} 85 L ${x0 + 4} 90 L ${x0 + 10} 95`} fill="none" stroke={NOIR} strokeWidth={2} />
    </>,
  );
};

export type Forme = "triangle" | "rond" | "carre";

/** UNE FRISE DE FORMES qui se répète (perles d'un collier), sans numéros. */
export const formes = (liste: Forme[]) => {
  const pas = 40;
  const W = liste.length * pas + 16;
  const couleur: Record<Forme, string> = { triangle: ORANGE, rond: BLEU, carre: VERT };
  return cadre(
    W,
    56,
    "Une frise de formes",
    <>
      <line x1={4} y1={28} x2={W - 4} y2={28} stroke={GRIS} strokeWidth={2} />
      {liste.map((f, i) => {
        const cx = 8 + i * pas + pas / 2;
        if (f === "rond") return <circle key={i} cx={cx} cy={28} r={14} fill={couleur.rond} stroke={NOIR} strokeWidth={1.4} />;
        if (f === "carre") return <rect key={i} x={cx - 13} y={15} width={26} height={26} fill={couleur.carre} stroke={NOIR} strokeWidth={1.4} />;
        return <path key={i} d={`M ${cx} 12 L ${cx + 15} 42 L ${cx - 15} 42 Z`} fill={couleur.triangle} stroke={NOIR} strokeWidth={1.4} />;
      })}
    </>,
    "max-w-[20rem] print:max-w-[14rem]",
  );
};

/** LES CASES D'UNE SUITE reliées par des flèches ; « ? » en orange. */
export const suite = (termes: string[]) => {
  const larg = 52;
  const pas = larg + 16;
  const W = termes.length * pas - 16 + 8;
  return cadre(
    W,
    48,
    "Les cases d'une suite de nombres",
    <>
      {termes.map((t, i) => {
        const x = 4 + i * pas;
        const cache = t === "?";
        return (
          <g key={i}>
            <rect x={x} y={6} width={larg} height={34} rx={8} fill={cache ? "#fff7ed" : "#ffffff"} stroke={cache ? ORANGE : NOIR} strokeWidth={1.8} />
            <text x={x + larg / 2} y={29} textAnchor="middle" fontSize="16" fontWeight="800" fill={cache ? ORANGE : NOIR}>
              {t}
            </text>
            {i < termes.length - 1 ? (
              <g>
                <line x1={x + larg + 2} y1={23} x2={x + larg + 13} y2={23} stroke={GRIS} strokeWidth={2} />
                <path d={`M ${x + larg + 9} 19 L ${x + larg + 14} 23 L ${x + larg + 9} 27`} fill="none" stroke={GRIS} strokeWidth={2} />
              </g>
            ) : null}
          </g>
        );
      })}
    </>,
  );
};

/**
 * DES BANDES PARTAGÉES, l'une sous l'autre, toutes de la même longueur :
 * `parts` = les largeurs relatives des morceaux (égales ou non), `colorie` =
 * les indices des morceaux coloriés. Le nom à gauche.
 */
export const bandes = (liste: { nom: string; parts: number[]; colorie: number[] }[]) => {
  const x0 = 36;
  const L = 240;
  const h = 34;
  const pas = 46;
  const H = liste.length * pas + 4;
  return cadre(
    x0 + L + 8,
    H,
    "Des bandes partagées",
    <>
      {liste.map((b, k) => {
        const y = 6 + k * pas;
        const total = b.parts.reduce((s, p) => s + p, 0);
        let x = x0;
        return (
          <g key={k}>
            <text x={16} y={y + h / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="800" fill={NOIR}>
              {b.nom}
            </text>
            {b.parts.map((p, j) => {
              const w = (p / total) * L;
              const r = <rect key={j} x={x} y={y} width={w} height={h} fill={b.colorie.includes(j) ? BLEU : VIDE} stroke={NOIR} strokeWidth={1.6} />;
              x += w;
              return r;
            })}
          </g>
        );
      })}
    </>,
  );
};

/** DEUX OPÉRATIONS POSÉES côte à côte, nommées A et B (« laquelle est bien posée ? »). */
export const deuxPoses = (a: string[], b: string[], signe = "+") => (
  <div className="mx-auto grid w-full max-w-[18rem] grid-cols-2 gap-4 print:max-w-[13rem]">
    {[a, b].map((lignes, k) => (
      <div key={k}>
        <p className="text-center text-lg font-extrabold text-slate-900">{k === 0 ? "A" : "B"}</p>
        {posee(lignes, { signe, traits: [1] })}
      </div>
    ))}
  </div>
);
