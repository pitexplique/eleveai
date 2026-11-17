// ─── Les dessins des feuilles CE2 du lot G (17/11/2026) ───────────────────────
//
// Partagés par `maths-ce2-masse.tsx`, `maths-ce2-longueur.tsx`,
// `maths-ce2-contenance.tsx`, `maths-ce2-probleme.tsx` (les fractions prennent
// les dessins du CM2 : `dessins-fractions-cm2.tsx`, plus la bande unité d'ici).
// La balance à plateaux, la règle graduée en centimètres ET en millimètres
// (le millimètre arrive au CE2), des récipients étiquetés, un pichet gradué en
// décilitres, la bande unité, le schéma en barres à plusieurs lignes et le
// tableau des associations (produit cartésien).
// ⛔ Le dessin montre ce qu'on SAIT, jamais la réponse : aucun total, aucune
// mesure cherchée écrite, ni dans le SVG, ni dans l'`aria-label`.
// ⛔ Texte NU dans les SVG (KaTeX n'y passe pas). Rien en largeur fixe :
// chaque SVG prend `w-full` dans un cadre `max-w`, il tient à 375 px.

import type { ReactNode } from "react";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const GRIS = "#64748b";
const VIDE = "#f1f5f9";
const EAU = "#93c5fd";

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

// ───────────────────────────────── Masses ──────────────────────────────────

/**
 * UNE BALANCE À PLATEAUX. `gauche`, `droite` : les étiquettes empilées sur
 * chaque plateau (objets en orange, masses marquées « … g » / « … kg » en
 * bleu). `penche` : le plateau qui DESCEND ("gauche", "droite") ou "egal".
 */
export const balance = (gauche: string[], droite: string[], penche: "gauche" | "droite" | "egal" = "egal") => {
  const [cx, cy, demi] = [160, 112, 104];
  const a = penche === "egal" ? 0 : ((penche === "gauche" ? 9 : -9) * Math.PI) / 180;
  const g = { x: cx - demi * Math.cos(a), y: cy + demi * Math.sin(a) };
  const d = { x: cx + demi * Math.cos(a), y: cy - demi * Math.sin(a) };
  const estMasse = (t: string) => /^\d[\d\s]*\s?(g|kg|t)$/.test(t);
  const haut = Math.max(gauche.length, droite.length);
  const dy = Math.max(0, haut - 3) * 24;
  const plateau = (p: { x: number; y: number }, objets: string[], cle: string) => (
    <g key={cle}>
      <line x1={p.x} y1={p.y + dy} x2={p.x} y2={p.y + dy - 8} stroke={NOIR} strokeWidth={2} />
      <line x1={p.x - 46} y1={p.y + dy - 8} x2={p.x + 46} y2={p.y + dy - 8} stroke={NOIR} strokeWidth={3.5} strokeLinecap="round" />
      {objets.map((t, k) => (
        <g key={k}>
          <rect x={p.x - 42} y={p.y + dy - 32 - k * 24} width={84} height={22} rx={estMasse(t) ? 3 : 10} fill={estMasse(t) ? BLEU : ORANGE} />
          <text x={p.x} y={p.y + dy - 16 - k * 24} textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">
            {t}
          </text>
        </g>
      ))}
    </g>
  );
  return cadre(
    320,
    170 + dy,
    "Balance à plateaux",
    <g>
      <rect x={110} y={156 + dy} width={100} height={10} rx={3} fill={GRIS} />
      <rect x={155} y={cy + dy} width={10} height={46} fill={GRIS} />
      <line x1={g.x} y1={g.y + dy} x2={d.x} y2={d.y + dy} stroke={NOIR} strokeWidth={4} strokeLinecap="round" />
      <circle cx={cx} cy={cy + dy} r={6} fill={NOIR} />
      {plateau(g, gauche, "g")}
      {plateau(d, droite, "d")}
    </g>,
  );
};

/** Deux balances nommées (« Balance 1 », « Balance 2 ») : côte à côte sur grand écran, l'une sous l'autre sur téléphone. */
export const deuxBalances = (liste: { nom: string; gauche: string[]; droite: string[]; penche?: "gauche" | "droite" | "egal" }[]) => (
  <div className="mx-auto grid w-full max-w-[36rem] gap-3 sm:grid-cols-2 print:max-w-[24rem] print:grid-cols-2">
    {liste.map((b, k) => (
      <div key={k}>
        <p className="mb-1 text-center text-sm font-extrabold text-slate-700">{b.nom}</p>
        {balance(b.gauche, b.droite, b.penche)}
      </div>
    ))}
  </div>
);

// ──────────────────────────────── Longueurs ────────────────────────────────

/**
 * UNE RÈGLE GRADUÉE de `debut` à `fin` cm, avec les millimètres (`mm`) ou
 * seulement les demi-centimètres. Des objets posés dessus : une barre de `de`
 * à `a` (en MILLIMÈTRES), son nom à droite, des pointillés jusqu'à la règle.
 * ⛔ Jamais la longueur écrite.
 */
export const regle = (objets: { de: number; a: number; label: string; couleur: string }[], fin = 6, debut = 0, mm = true) => {
  const x0 = 16;
  const pas = Math.min(44, 270 / (fin - debut));
  const x = (millimetres: number) => x0 + ((millimetres - debut * 10) / 10) * pas;
  const yR = objets.length * 26 + 12;
  const H = yR + 46;
  const W = x0 + (fin - debut) * pas + 40;
  const traits = [];
  for (let k = debut * 10; k <= fin * 10; k++) {
    if (!mm && k % 5 !== 0) continue;
    const long = k % 10 === 0 ? 16 : k % 5 === 0 ? 11 : 7;
    traits.push(<line key={k} x1={x(k)} y1={yR} x2={x(k)} y2={yR + long} stroke={NOIR} strokeWidth={k % 10 === 0 ? 1.5 : 0.7} />);
  }
  return cadre(
    W,
    H,
    "Règle graduée en centimètres",
    <g>
      <rect x={x0 - 8} y={yR} width={(fin - debut) * pas + 16} height={40} fill="#fef9c3" stroke={NOIR} strokeWidth={1.2} rx={3} />
      {traits}
      {Array.from({ length: fin - debut + 1 }, (_, k) => (
        <text key={k} x={x((debut + k) * 10)} y={yR + 33} textAnchor="middle" fontSize="13" fontWeight="800" fill={NOIR}>
          {debut + k}
        </text>
      ))}
      <text x={x(fin * 10) + 12} y={yR + 33} fontSize="12" fill={NOIR}>
        cm
      </text>
      {objets.map((o, i) => {
        const y = 6 + i * 26;
        return (
          <g key={i}>
            <rect x={x(o.de)} y={y} width={x(o.a) - x(o.de)} height={14} rx={4} fill={o.couleur} />
            <line x1={x(o.de)} y1={y + 14} x2={x(o.de)} y2={yR} stroke={o.couleur} strokeWidth={1} strokeDasharray="3 3" />
            <line x1={x(o.a)} y1={y + 14} x2={x(o.a)} y2={yR} stroke={o.couleur} strokeWidth={1} strokeDasharray="3 3" />
            <text x={Math.min(x(o.a) + 5, W - 4)} y={y + 12} textAnchor={x(o.a) + 50 > W ? "end" : "start"} fontSize="13" fontWeight="700" fill={NOIR}>
              {o.label}
            </text>
          </g>
        );
      })}
    </g>,
    "max-w-[24rem] print:max-w-[17rem]",
  );
};

// ─────────────────────────────── Contenances ───────────────────────────────

export type Recipient = "bouteille" | "saladier" | "seau" | "verre" | "bidon" | "arrosoir";

/** Le contour d'un récipient, posé sur la ligne y = 150, centré en cx. */
const contour = (forme: Recipient, cx: number): ReactNode => {
  const s = { fill: "#e0f2fe", stroke: NOIR, strokeWidth: 2 };
  switch (forme) {
    case "bouteille":
      return <path d={`M ${cx - 12} 150 L ${cx - 12} 60 Q ${cx - 12} 46 ${cx - 5} 40 L ${cx - 5} 22 L ${cx + 5} 22 L ${cx + 5} 40 Q ${cx + 12} 46 ${cx + 12} 60 L ${cx + 12} 150 Z`} {...s} />;
    case "saladier":
      return <path d={`M ${cx - 42} 112 L ${cx + 42} 112 Q ${cx + 38} 150 ${cx} 150 Q ${cx - 38} 150 ${cx - 42} 112 Z`} {...s} />;
    case "seau":
      return (
        <g>
          <path d={`M ${cx - 28} 92 L ${cx + 28} 92 L ${cx + 22} 150 L ${cx - 22} 150 Z`} {...s} />
          <path d={`M ${cx - 26} 92 Q ${cx} 62 ${cx + 26} 92`} fill="none" stroke={NOIR} strokeWidth={2} />
        </g>
      );
    case "verre":
      return <path d={`M ${cx - 16} 108 L ${cx + 16} 108 L ${cx + 12} 150 L ${cx - 12} 150 Z`} {...s} />;
    case "bidon":
      return (
        <g>
          <rect x={cx - 26} y={74} width={52} height={76} rx={6} {...s} />
          <rect x={cx + 6} y={64} width={14} height={10} fill={GRIS} />
          <path d={`M ${cx - 18} 74 L ${cx - 18} 62 L ${cx} 62 L ${cx} 74`} fill="none" stroke={NOIR} strokeWidth={2} />
        </g>
      );
    case "arrosoir":
      return (
        <g>
          <rect x={cx - 22} y={90} width={44} height={60} rx={5} {...s} />
          <path d={`M ${cx + 22} 128 L ${cx + 42} 96`} stroke={NOIR} strokeWidth={4} />
          <path d={`M ${cx - 22} 102 Q ${cx - 40} 112 ${cx - 22} 132`} fill="none" stroke={NOIR} strokeWidth={2} />
        </g>
      );
  }
};

/**
 * DES RÉCIPIENTS côte à côte, chacun avec son nom (A, B…) et son étiquette
 * (la contenance DONNÉE par l'énoncé, ou rien). La forme ne dit rien de la
 * contenance : c'est tout le piège.
 */
export const recipients = (liste: { nom: string; forme: Recipient; etiquette?: string }[]) => {
  const pas = 100;
  const W = liste.length * pas;
  return cadre(
    W,
    196,
    "Des récipients",
    <g>
      <line x1={4} y1={150} x2={W - 4} y2={150} stroke={GRIS} strokeWidth={1.5} />
      {liste.map((r, k) => {
        const cx = pas / 2 + k * pas;
        return (
          <g key={k}>
            {contour(r.forme, cx)}
            <text x={cx} y={170} textAnchor="middle" fontSize="16" fontWeight="900" fill={NOIR}>
              {r.nom}
            </text>
            {r.etiquette ? (
              <text x={cx} y={190} textAnchor="middle" fontSize="14" fontWeight="800" fill={BLEU}>
                {r.etiquette}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>,
  );
};

/**
 * UN PICHET GRADUÉ en décilitres, de 0 à `max` dL, rempli jusqu'à `niveau`.
 * Les graduations sont écrites ; la quantité, jamais.
 */
export const pichet = (niveau: number, max = 10) => {
  const [x0, y0, larg, haut] = [56, 36, 90, 200];
  const y = (dl: number) => y0 + haut - (dl / max) * haut;
  return cadre(
    210,
    248,
    "Un pichet gradué en décilitres",
    <g>
      <rect x={x0} y={y(niveau)} width={larg} height={y(0) - y(niveau)} fill={EAU} />
      <path d={`M ${x0} ${y0 - 6} L ${x0} ${y0 + haut} L ${x0 + larg} ${y0 + haut} L ${x0 + larg} ${y0 - 6}`} fill="none" stroke={NOIR} strokeWidth={2.4} />
      <path d={`M ${x0 + larg} ${y0 + 30} Q ${x0 + larg + 40} ${y0 + 40} ${x0 + larg + 34} ${y0 + 100} Q ${x0 + larg + 30} ${y0 + 130} ${x0 + larg} ${y0 + 140}`} fill="none" stroke={NOIR} strokeWidth={4} />
      {Array.from({ length: max + 1 }, (_, k) => (
        <g key={k}>
          <line x1={x0} y1={y(k)} x2={x0 + (k % 5 === 0 ? 24 : 14)} y2={y(k)} stroke={NOIR} strokeWidth={1.6} />
          <text x={x0 - 8} y={y(k) + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
            {k}
          </text>
        </g>
      ))}
      <text x={x0 - 8} y={y0 - 16} textAnchor="end" fontSize="14" fontWeight="800" fill={GRIS}>
        dL
      </text>
    </g>,
    "max-w-[15rem] print:max-w-[10rem]",
  );
};

// ──────────────────────────────── Fractions ────────────────────────────────

/**
 * LA BANDE UNITÉ partagée en `d` parts égales (en haut), et un ruban (en
 * bas, orange) qui couvre `k` de ces parts. Les pointillés aident à compter ;
 * la fraction n'est écrite nulle part.
 */
export const bandeUnite = (d: number, k: number, nom = "ruban") => {
  const [x0, L] = [86, 200];
  const w = L / d;
  return cadre(
    300,
    112,
    "Une bande unité et un ruban",
    <g>
      <text x={x0 - 8} y={36} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
        unité
      </text>
      {Array.from({ length: d }, (_, j) => (
        <rect key={j} x={x0 + j * w} y={16} width={w} height={30} fill={VIDE} stroke={NOIR} strokeWidth={1.6} />
      ))}
      {Array.from({ length: d + 1 }, (_, j) => (
        <line key={`p${j}`} x1={x0 + j * w} y1={46} x2={x0 + j * w} y2={66} stroke={GRIS} strokeWidth={1} strokeDasharray="3 3" />
      ))}
      <text x={x0 - 8} y={86} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
        {nom}
      </text>
      <rect x={x0} y={68} width={k * w} height={26} rx={4} fill={ORANGE} />
    </g>,
  );
};

// ──────────────────────────────── Problèmes ────────────────────────────────

/**
 * UN SCHÉMA EN BARRES À PLUSIEURS LIGNES (comparaison, parts) : une barre par
 * ligne, faite de morceaux de longueur relative `n`, chacun avec son texte
 * (« ? » en orange pour ce qu'on cherche). `total` : écrit à droite, sous une
 * accolade qui prend toutes les lignes.
 */
export const schema = (lignes: { nom: string; morceaux: { n: number; texte: string }[] }[], total?: string) => {
  const avecNoms = lignes.some((l) => l.nom);
  const [x0, L, h, pas] = [avecNoms ? 74 : 10, total ? 170 : 210, 30, 40];
  const max = Math.max(...lignes.map((l) => l.morceaux.reduce((s, m) => s + m.n, 0)));
  const H = lignes.length * pas + 8;
  const couleurs = [BLEU, "#16a34a", "#7c3aed"];
  return cadre(
    310,
    H,
    "Schéma en barres",
    <g>
      {lignes.map((l, i) => {
        const y = 6 + i * pas;
        let x = x0;
        return (
          <g key={i}>
            <text x={x0 - 8} y={y + h / 2 + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
              {l.nom}
            </text>
            {l.morceaux.map((m, k) => {
              const w = (m.n * L) / max;
              const cherche = m.texte === "?";
              const g = (
                <g key={k}>
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    rx={3}
                    fill={cherche ? "#ffedd5" : couleurs[k % 3]}
                    fillOpacity={cherche ? 1 : 0.28}
                    stroke={cherche ? ORANGE : NOIR}
                    strokeWidth={1.5}
                    strokeDasharray={cherche ? "5 3" : undefined}
                  />
                  <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="900" fill={cherche ? ORANGE : NOIR}>
                    {m.texte}
                  </text>
                </g>
              );
              x += w;
              return g;
            })}
          </g>
        );
      })}
      {total ? (
        <g>
          <path d={`M ${x0 + L + 8} 6 Q ${x0 + L + 18} 6 ${x0 + L + 18} ${H / 2} Q ${x0 + L + 18} ${H - 2} ${x0 + L + 8} ${H - 2}`} fill="none" stroke={NOIR} strokeWidth={1.6} />
          <text x={x0 + L + 24} y={H / 2 + 5} fontSize="15" fontWeight="900" fill={total === "?" ? ORANGE : NOIR}>
            {total}
          </text>
        </g>
      ) : null}
    </g>,
  );
};

/**
 * LE TABLEAU DES ASSOCIATIONS (produit cartésien) : les choix de la 1re sorte
 * en lignes, ceux de la 2e en colonnes, les cases VIDES — l'enfant les compte
 * ou les remplit au brouillon.
 */
export const tableauAssociations = (lignes: string[], colonnes: string[]) => {
  const [g, c, h] = [76, Math.min(64, 232 / colonnes.length), 32];
  const taille = colonnes.some((t) => t.length > 6) ? 12 : 13;
  const W = g + colonnes.length * c + 4;
  const H = (lignes.length + 1) * h + 4;
  return cadre(
    W,
    H,
    "Tableau des associations",
    <g>
      {colonnes.map((t, j) => (
        <g key={`c${j}`}>
          <rect x={g + j * c} y={2} width={c} height={h} fill="#dbeafe" stroke={NOIR} strokeWidth={1.2} />
          <text x={g + j * c + c / 2} y={2 + h / 2 + 5} textAnchor="middle" fontSize={taille} fontWeight="800" fill={NOIR}>
            {t}
          </text>
        </g>
      ))}
      {lignes.map((t, i) => (
        <g key={`l${i}`}>
          <rect x={2} y={2 + (i + 1) * h} width={g - 2} height={h} fill="#ffedd5" stroke={NOIR} strokeWidth={1.2} />
          <text x={g / 2 + 1} y={2 + (i + 1) * h + h / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={NOIR}>
            {t}
          </text>
          {colonnes.map((_, j) => (
            <rect key={j} x={g + j * c} y={2 + (i + 1) * h} width={c} height={h} fill="#ffffff" stroke={NOIR} strokeWidth={1.2} />
          ))}
        </g>
      ))}
    </g>,
  );
};
