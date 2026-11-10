// lib/canvas/MonnaieCanvas.tsx
"use client";

import type { CanvasFigure, MonnaieCanvasData, MonnaieElement, MonnaieValeur } from "@/lib/tutor-v4/types";

// ─── LA MONNAIE DU CYCLE 2 ────────────────────────────────────────────────────
// Ajoutée le 10/11/2026 pour le coach CP-CE2 (compter une somme, payer, rendre).
// Voir `MonnaieCanvasData` (types_canvas.ts) et CATALOGUE.md.
//
// ⭐ DES DESSINS, PAS DES PHOTOS. Un billet stylisé : sa couleur dominante est
// celle du vrai billet (5 € gris, 10 € rouge, 20 € bleu, 50 € orange, 100 €
// vert), une arche comme sur le billet, et la valeur écrite EN GROS. Les pièces
// gardent leur métal (cuivre, or nordique, bimétal) et l'ORDRE RÉEL de leurs
// diamètres — la pièce de 10 c est plus petite que celle de 5 c : la taille ne
// dit pas la valeur, l'enfant doit LIRE la pièce.
//
// ⭐ CHAQUE EXEMPLAIRE EST DESSINÉ À PART, jamais empilé : on doit pouvoir
// compter les pièces une à une, du doigt, sur l'écran.
//
// ⛔ LE DESSIN N'ÉCRIT JAMAIS LA SOMME : c'est la réponse.

/** La police qui se LIT au cycle 2 (voir ObjetsCanvas : `a` et `g` d'un étage). */
const ECOLE = '"Andika", ui-sans-serif, system-ui, sans-serif';

const ENCRE = "#111827";
const PAD = 8;
const ECART = 10;
const FONT_NOM = 14;
const FONT_CONSIGNE = 13;
const LH_CONSIGNE = 16;
/** Au-delà, le dessin cesse d'être comptable dans une carte de téléphone. */
const MAX_TOTAL = 24;

type Props = { figure: CanvasFigure };

function isMonnaieCanvas(figure: CanvasFigure): figure is MonnaieCanvasData {
  return figure.kind === "monnaie";
}

// ─── Les pièces ───────────────────────────────────────────────────────────────

type Metal = "cuivre" | "or" | "un_euro" | "deux_euros";

/** Diamètres réels en mm (BCE) : seul leur ORDRE compte, l'écart est tassé. */
const PIECES: Partial<Record<MonnaieValeur, { mm: number; metal: Metal; n: string; u: string }>> = {
  "1c": { mm: 16.25, metal: "cuivre", n: "1", u: "c" },
  "2c": { mm: 18.75, metal: "cuivre", n: "2", u: "c" },
  "5c": { mm: 21.25, metal: "cuivre", n: "5", u: "c" },
  "10c": { mm: 19.75, metal: "or", n: "10", u: "c" },
  "20c": { mm: 22.25, metal: "or", n: "20", u: "c" },
  "50c": { mm: 24.25, metal: "or", n: "50", u: "c" },
  "1e": { mm: 23.25, metal: "un_euro", n: "1", u: "€" },
  "2e": { mm: 25.75, metal: "deux_euros", n: "2", u: "€" },
};

/** ⚠️ 17 px de rayon au plus petit : « 1 c » doit rester lisible à 280 px. */
function rayonPiece(mm: number) {
  return 17 + ((mm - 16.25) * 10) / 9.5;
}

const METAUX = {
  cuivre: { fond: "#e39a6b", trait: "#9a3412" },
  or: { fond: "#f4cf5d", trait: "#a16207" },
  argent: { fond: "#dfe3e8", trait: "#64748b" },
};

// ─── Les billets ──────────────────────────────────────────────────────────────

const BILLETS: Partial<Record<MonnaieValeur, { w: number; h: number; clair: string; fonce: string; n: string }>> = {
  "5e": { w: 78, h: 44, clair: "#e2e8f0", fonce: "#94a3b8", n: "5" },
  "10e": { w: 82, h: 45, clair: "#fecaca", fonce: "#ef4444", n: "10" },
  "20e": { w: 86, h: 46, clair: "#bfdbfe", fonce: "#3b82f6", n: "20" },
  "50e": { w: 90, h: 47, clair: "#fed7aa", fonce: "#f97316", n: "50" },
  "100e": { w: 94, h: 48, clair: "#bbf7d0", fonce: "#22c55e", n: "100" },
};

type Item = { valeur: MonnaieValeur; marque: boolean; cache: boolean; w: number; h: number };

function tailleDe(valeur: MonnaieValeur): { w: number; h: number } {
  const p = PIECES[valeur];
  if (p) {
    const d = 2 * rayonPiece(p.mm);
    return { w: d, h: d };
  }
  const b = BILLETS[valeur];
  if (b) return { w: b.w, h: b.h };
  return { w: 0, h: 0 };
}

function deplier(elements: MonnaieElement[], reste: { n: number }): Item[] {
  const items: Item[] = [];
  for (const e of elements ?? []) {
    if (!PIECES[e.valeur] && !BILLETS[e.valeur]) continue;
    const n = Math.min(10, Math.max(1, Math.round(e.nombre ?? 1)));
    for (let k = 0; k < n && reste.n > 0; k++, reste.n--) {
      const t = tailleDe(e.valeur);
      // La marque se dessine 6 px autour : on lui réserve sa place.
      const m = e.marque ? 12 : 0;
      items.push({ valeur: e.valeur, marque: !!e.marque, cache: !!e.cache, w: t.w + m, h: t.h + m });
    }
  }
  return items;
}

/** Rangement en lignes : on remplit, on passe à la ligne, chaque ligne centrée. */
function ranger(items: Item[], largeurUtile: number) {
  const lignes: Item[][] = [];
  let courante: Item[] = [];
  let large = 0;
  for (const it of items) {
    const besoin = courante.length ? large + ECART + it.w : it.w;
    if (courante.length && besoin > largeurUtile) {
      lignes.push(courante);
      courante = [it];
      large = it.w;
    } else {
      courante.push(it);
      large = besoin;
    }
  }
  if (courante.length) lignes.push(courante);
  return lignes;
}

function largeurTexte(texte: string, fontSize: number) {
  return texte.length * fontSize * 0.52;
}

function couper(texte: string, largeurDispo: number, fontSize: number, maxLignes = 3) {
  if (largeurTexte(texte, fontSize) <= largeurDispo) return [texte];
  const lignes: string[] = [];
  let courante = "";
  for (const mot of texte.split(" ")) {
    const essai = courante ? `${courante} ${mot}` : mot;
    if (courante && largeurTexte(essai, fontSize) > largeurDispo) {
      lignes.push(courante);
      courante = mot;
    } else {
      courante = essai;
    }
  }
  if (courante) lignes.push(courante);
  return lignes.slice(0, maxLignes);
}

/** « 50 c » : le nombre en gros, l'unité plus petite, sur une seule ligne. */
function Valeur({
  x,
  y,
  n,
  u,
  taille,
  cache,
}: {
  x: number;
  y: number;
  n: string;
  u: string;
  taille: number;
  cache: boolean;
}) {
  if (cache) {
    return (
      <text
        x={x}
        y={y + taille * 0.36}
        fontSize={taille * 1.05}
        fontWeight={700}
        fill={ENCRE}
        textAnchor="middle"
        fontFamily={ECOLE}
      >
        ?
      </text>
    );
  }
  return (
    <text
      x={x}
      y={y + taille * 0.36}
      fontSize={taille}
      fontWeight={700}
      fill={ENCRE}
      textAnchor="middle"
      fontFamily={ECOLE}
    >
      {n}
      {/* ⚠️ Jamais sous 14 : à 280 px de carte, l'unité tombait à 8,5 px (10/11). */}
      <tspan fontSize={Math.min(taille * 0.9, Math.max(14, taille * 0.66))} dx={taille * 0.08}>
        {u}
      </tspan>
    </text>
  );
}

function Piece({
  cx,
  cy,
  valeur,
  coloriage,
  cache,
}: {
  cx: number;
  cy: number;
  valeur: MonnaieValeur;
  coloriage: boolean;
  cache: boolean;
}) {
  const p = PIECES[valeur]!;
  const r = rayonPiece(p.mm);
  const blanc = { fond: "#ffffff", trait: "#6b7280" };
  const exterieur = coloriage
    ? blanc
    : p.metal === "cuivre"
      ? METAUX.cuivre
      : p.metal === "or" || p.metal === "un_euro"
        ? METAUX.or
        : METAUX.argent;
  const interieur = coloriage ? blanc : p.metal === "un_euro" ? METAUX.argent : METAUX.or;
  const bimetal = p.metal === "un_euro" || p.metal === "deux_euros";
  const taille = p.n.length === 1 ? r * 0.95 : r * 0.78;

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={exterieur.fond} stroke={ENCRE} strokeWidth={1.8} />
      {bimetal ? (
        <circle cx={cx} cy={cy} r={r * 0.66} fill={interieur.fond} stroke={ENCRE} strokeWidth={1.3} />
      ) : (
        <circle cx={cx} cy={cy} r={r - 3.2} fill="none" stroke={exterieur.trait} strokeWidth={1} />
      )}
      <Valeur x={cx} y={cy} n={p.n} u={p.u} taille={bimetal ? r * 0.8 : taille} cache={cache} />
    </g>
  );
}

function Billet({
  x,
  y,
  valeur,
  coloriage,
  cache,
}: {
  x: number;
  y: number;
  valeur: MonnaieValeur;
  coloriage: boolean;
  cache: boolean;
}) {
  const b = BILLETS[valeur]!;
  const clair = coloriage ? "#ffffff" : b.clair;
  const fonce = coloriage ? "#ffffff" : b.fonce;
  // L'arche, motif des billets en euros : une fenêtre à gauche.
  const ax = x + 8;
  const aw = 18;
  const haut = y + 15;
  const bas = y + b.h - 7;
  const taille = b.n.length === 3 ? 19 : 22;
  const zone = x + 8 + aw;
  return (
    <g>
      <rect x={x} y={y} width={b.w} height={b.h} rx={5} fill={clair} stroke={ENCRE} strokeWidth={1.8} />
      <path
        d={`M ${ax} ${bas} L ${ax} ${haut} A ${aw / 2} ${aw / 2} 0 0 1 ${ax + aw} ${haut} L ${ax + aw} ${bas} Z`}
        fill={fonce}
        stroke={ENCRE}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      {/* Un filet sous la valeur, comme la bande du billet. */}
      <path
        d={`M ${zone + 6} ${y + b.h - 8} L ${x + b.w - 8} ${y + b.h - 8}`}
        stroke={coloriage ? "#9ca3af" : b.fonce}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Valeur x={zone + (x + b.w - zone) / 2} y={y + b.h / 2 - 3} n={b.n} u="€" taille={taille} cache={cache} />
    </g>
  );
}

export default function MonnaieCanvas({ figure }: Props) {
  if (!isMonnaieCanvas(figure)) return null;

  const coloriage = figure.mode === "coloriage";
  const width = Math.max(200, figure.size?.width ?? 320);
  const largeurUtile = width - 2 * PAD;

  const sources = figure.groupes?.length
    ? figure.groupes
    : [{ nom: undefined as string | undefined, elements: figure.elements ?? [] }];

  const reste = { n: MAX_TOTAL };
  const blocs = sources
    .map((g) => ({ nom: g.nom, lignes: ranger(deplier(g.elements, reste), largeurUtile) }))
    .filter((b) => b.lignes.length || b.nom);
  if (!blocs.length) return null;

  const H_NOM = FONT_NOM + 8;
  const ENTRE_LIGNES = 8;
  const ENTRE_BLOCS = 14;

  // On calcule toutes les positions, puis la hauteur totale.
  const dessins: React.ReactNode[] = [];
  let y = PAD;
  blocs.forEach((bloc, b) => {
    if (b > 0) {
      const ys = y + ENTRE_BLOCS / 2 - 4;
      dessins.push(
        <line
          key={`sep-${b}`}
          x1={PAD}
          y1={ys}
          x2={width - PAD}
          y2={ys}
          stroke="#cbd5e1"
          strokeWidth={1.2}
          strokeDasharray="5 4"
        />,
      );
      y += ENTRE_BLOCS;
    }
    if (bloc.nom) {
      dessins.push(
        <text
          key={`nom-${b}`}
          x={PAD}
          y={y + FONT_NOM}
          fontSize={FONT_NOM}
          fontWeight={700}
          fill={ENCRE}
          fontFamily={ECOLE}
        >
          {bloc.nom}
        </text>,
      );
      y += H_NOM;
    }
    bloc.lignes.forEach((ligne, l) => {
      const hLigne = Math.max(...ligne.map((it) => it.h));
      const large = ligne.reduce((s, it) => s + it.w + ECART, -ECART);
      let x = (width - large) / 2;
      ligne.forEach((it, k) => {
        const cx = x + it.w / 2;
        const cy = y + hLigne / 2;
        const t = tailleDe(it.valeur);
        const cle = `${b}-${l}-${k}`;
        if (PIECES[it.valeur]) {
          dessins.push(<Piece key={cle} cx={cx} cy={cy} valeur={it.valeur} coloriage={coloriage} cache={it.cache} />);
          if (it.marque) {
            dessins.push(
              <circle
                key={`${cle}-m`}
                cx={cx}
                cy={cy}
                r={t.w / 2 + 5}
                fill="none"
                stroke={ENCRE}
                strokeWidth={2}
                strokeDasharray="5 3.5"
              />,
            );
          }
        } else {
          dessins.push(
            <Billet
              key={cle}
              x={cx - t.w / 2}
              y={cy - t.h / 2}
              valeur={it.valeur}
              coloriage={coloriage}
              cache={it.cache}
            />,
          );
          if (it.marque) {
            dessins.push(
              <rect
                key={`${cle}-m`}
                x={cx - t.w / 2 - 6}
                y={cy - t.h / 2 - 6}
                width={t.w + 12}
                height={t.h + 12}
                rx={8}
                fill="none"
                stroke={ENCRE}
                strokeWidth={2}
                strokeDasharray="6 4"
              />,
            );
          }
        }
        x += it.w + ECART;
      });
      y += hLigne + (l < bloc.lignes.length - 1 ? ENTRE_LIGNES : 0);
    });
  });

  const lignesConsigne = figure.consigne ? couper(figure.consigne, largeurUtile, FONT_CONSIGNE, 3) : [];
  const yConsigne = y + 10;
  const height = y + (lignesConsigne.length ? 10 + lignesConsigne.length * LH_CONSIGNE : 0) + PAD;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      // ⭐ 10/11/2026 — vu dans le vrai coach : à 320 px dans un cadre de 768, un
      // billet faisait la taille d'un mot. Le dessin peut grandir de moitié.
      style={{ maxWidth: Math.round(width * 1.5), height: "auto", display: "block", margin: "0 auto" }}
      role="img"
      aria-label={figure.consigne ?? "Des pièces et des billets en euros"}
    >
      <rect x={0} y={0} width={width} height={height} fill="#ffffff" />
      {dessins}
      {lignesConsigne.map((ligne, i) => (
        <text
          key={i}
          x={width / 2}
          y={yConsigne + 12 + i * LH_CONSIGNE}
          fontSize={FONT_CONSIGNE}
          fill="#334155"
          textAnchor="middle"
          fontFamily={ECOLE}
        >
          {ligne}
        </text>
      ))}
    </svg>
  );
}
