// lib/canvas/BaseDixCanvas.tsx
"use client";

import type { BaseDixCanvasData, CanvasFigure } from "@/lib/tutor-v4/types";

// ─── LE MATÉRIEL DE NUMÉRATION DU CYCLE 2 ─────────────────────────────────────
// Ajouté le 10/11/2026 pour le coach CP-CE2. Voir `BaseDixCanvasData`
// (types_canvas.ts) et CATALOGUE.md.
//
// ⭐ ON DOIT POUVOIR RECOMPTER À L'ŒIL. Chaque barre montre ses 10 carreaux,
// chaque plaque ses 10 × 10 ; les cubes unités vont par rangées de 5, avec un
// petit écart toutes les 10 : la dizaine qu'on pourrait former se devine, elle
// n'est pas faite.
//
// ⭐ LES GROUPES SE LISENT DANS L'ORDRE DU NOMBRE : milliers, centaines,
// dizaines, unités, de gauche à droite, posés sur une même ligne de sol.
//
// ⛔ LE DESSIN N'ÉCRIT JAMAIS LE NOMBRE : c'est la réponse. Les `etiquettes`
// nomment les groupes (« dizaines »), jamais leur quantité.

const ECOLE = '"Andika", ui-sans-serif, system-ui, sans-serif';
const ENCRE = "#111827";
const PAD = 8;
/** ⚠️ 14 et pas 12 : à 280 px de carte, 12 tombait à 9,6 px (mesuré le 10/11). */
const FONT_ETIQUETTE = 14;
const FONT_CONSIGNE = 13;
const LH_CONSIGNE = 16;
const ENTRE_GROUPES = 18;

type Props = { figure: CanvasFigure };

function isBaseDix(figure: CanvasFigure): figure is BaseDixCanvasData {
  return figure.kind === "base_dix";
}

const TEINTES = {
  unite: "#fde68a",
  barre: "#86efac",
  plaque: "#93c5fd",
  mille: { face: "#c4b5fd", dessus: "#ddd6fe", cote: "#a78bfa" },
  rouge: "#ef4444",
  bleu: "#3b82f6",
};

function borne(n: number | undefined, max: number) {
  return Math.min(max, Math.max(0, Math.round(n ?? 0)));
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

// ─── Les pièces du matériel ───────────────────────────────────────────────────

const grille = { stroke: ENCRE, strokeWidth: 0.6, strokeOpacity: 0.55 };

function Cube({ x, y, c, fond }: { x: number; y: number; c: number; fond: string }) {
  return <rect x={x} y={y} width={c} height={c} fill={fond} stroke={ENCRE} strokeWidth={1.2} />;
}

/** Une barre de dix, debout (ou couchée), ses 10 carreaux visibles. */
function Barre({
  x,
  y,
  c,
  fond,
  couchee = false,
}: {
  x: number;
  y: number;
  c: number;
  fond: string;
  couchee?: boolean;
}) {
  const w = couchee ? 10 * c : c;
  const h = couchee ? c : 10 * c;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fond} stroke={ENCRE} strokeWidth={1.2} />
      {Array.from({ length: 9 }, (_, i) =>
        couchee ? (
          <line key={i} x1={x + (i + 1) * c} y1={y} x2={x + (i + 1) * c} y2={y + h} {...grille} />
        ) : (
          <line key={i} x1={x} y1={y + (i + 1) * c} x2={x + w} y2={y + (i + 1) * c} {...grille} />
        ),
      )}
    </g>
  );
}

function Plaque({ x, y, c, fond }: { x: number; y: number; c: number; fond: string }) {
  const s = 10 * c;
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} fill={fond} stroke={ENCRE} strokeWidth={1.3} />
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <line x1={x + (i + 1) * c} y1={y} x2={x + (i + 1) * c} y2={y + s} {...grille} />
          <line x1={x} y1={y + (i + 1) * c} x2={x + s} y2={y + (i + 1) * c} {...grille} />
        </g>
      ))}
    </g>
  );
}

/** Le cube de mille, en perspective : 10 × 10 sur chaque face visible. */
function Mille({ x, y, s, coloriage }: { x: number; y: number; s: number; coloriage: boolean }) {
  const d = s * 0.4;
  const c = s / 10;
  const t = coloriage ? { face: "#fff", dessus: "#fff", cote: "#fff" } : TEINTES.mille;
  const fy = y + d; // haut de la face avant
  const lignes: React.ReactNode[] = [];
  for (let i = 1; i < 10; i++) {
    // face avant
    lignes.push(<line key={`fv${i}`} x1={x + i * c} y1={fy} x2={x + i * c} y2={fy + s} {...grille} />);
    lignes.push(<line key={`fh${i}`} x1={x} y1={fy + i * c} x2={x + s} y2={fy + i * c} {...grille} />);
    // dessus
    lignes.push(<line key={`dv${i}`} x1={x + i * c} y1={fy} x2={x + i * c + d} y2={y} {...grille} />);
    const k = (i * d) / 10;
    lignes.push(<line key={`dh${i}`} x1={x + k} y1={fy - k} x2={x + s + k} y2={fy - k} {...grille} />);
    // côté droit
    lignes.push(<line key={`cv${i}`} x1={x + s + k} y1={fy - k} x2={x + s + k} y2={fy - k + s} {...grille} />);
    lignes.push(<line key={`ch${i}`} x1={x + s} y1={fy + i * c} x2={x + s + d} y2={y + i * c} {...grille} />);
  }
  return (
    <g>
      <rect x={x} y={fy} width={s} height={s} fill={t.face} stroke={ENCRE} strokeWidth={1.3} />
      <path
        d={`M ${x} ${fy} L ${x + d} ${y} L ${x + s + d} ${y} L ${x + s} ${fy} Z`}
        fill={t.dessus}
        stroke={ENCRE}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <path
        d={`M ${x + s} ${fy} L ${x + s + d} ${y} L ${x + s + d} ${y + s} L ${x + s} ${fy + s} Z`}
        fill={t.cote}
        stroke={ENCRE}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      {lignes}
    </g>
  );
}

// ─── Un groupe = une boîte (w, h) qui sait se dessiner ────────────────────────

type Groupe = { w: number; h: number; etiquette: string; dessiner: (x: number, y: number) => React.ReactNode };

function grouper(n: number, wObjet: number, hObjet: number, gap: number, parLigne: number, gapLigne: number) {
  // Lignes ÉQUILIBRÉES : 9 plaques font 3 × 3, pas 4 + 4 + 1 ; 13 barres font
  // 7 + 6, pas 10 + 3 (une ligne de 10 barres soufflerait « 1 centaine »).
  const max = Math.max(1, Math.min(n, parLigne));
  const cols = Math.ceil(n / Math.ceil(n / max));
  const lignes = Math.ceil(n / cols);
  return {
    cols,
    lignes,
    w: cols * wObjet + (cols - 1) * gap,
    h: lignes * hObjet + (lignes - 1) * gapLigne,
  };
}

function Materiel({ figure, width }: { figure: BaseDixCanvasData; width: number }) {
  const coloriage = figure.mode === "coloriage";
  const fond = (f: string) => (coloriage ? "#ffffff" : f);
  const M = borne(figure.milliers, 9);
  const C = borne(figure.centaines, 12);
  const D = borne(figure.dizaines, 30);
  const U = borne(figure.unites, 30);
  const largeurUtile = width - 2 * PAD;

  const avecEtiquettes = !!figure.etiquettes;
  const hEtiquette = avecEtiquettes ? FONT_ETIQUETTE + 8 : 0;

  /* ⭐ LA TAILLE DU CARREAU SE CHOISIT : le plus GROS qui tient sur une seule
     ligne. Sans plaque (CP : barres et cubes), on monte jusqu'à 12 px — un cube
     de 8 px se voyait à peine dans une carte de téléphone (vu au rendu le
     10/11). Avec des plaques, 8 px au plus (une plaque fait déjà 80 px). Si
     rien ne tient sur une ligne, on prend 7 et les groupes passent à la ligne. */
  /* ⛔ Et les plaques peuvent passer sur deux ou trois rangées pour laisser les
     barres et les cubes À CÔTÉ d'elles : sans ça, 3 plaques + 1 barre + 4 cubes
     étiquetés finissaient sur trois lignes, les cubes seuls en bas (vu au rendu
     le 10/11). On essaie toutes les combinaisons et on garde celle qui fait le
     moins de lignes, puis le plus gros carreau. */
  const tailles = C || M ? [8, 7, 6] : [12, 11, 10, 9, 8];
  const parLigneCentaines = C ? [99, 4, 3, 2, 1].filter((p) => p === 99 || Math.ceil(C / p) <= 3) : [99];
  const essais = tailles.flatMap((c) => parLigneCentaines.map((p) => ({ c, ...disposer(c, p) })));
  const minLignes = Math.min(...essais.map((e) => e.lignes.length));
  // À nombre de lignes égal : le plus compact RAPPORTÉ AU CARREAU (une hauteur
  // en carreaux), et à égalité le plus gros carreau (le tri est stable).
  const choix = essais
    .filter((e) => e.lignes.length === minLignes)
    .sort((a, b) => hauteur(a.lignes) / a.c - hauteur(b.lignes) / b.c)[0];
  const { lignes } = choix;

  function hauteur(ls: { h: number }[][]) {
    return ls.reduce((s, l) => s + Math.max(...l.map((b) => b.h)), 0);
  }

  function disposer(c: number, maxCentaines: number) {
    const groupes: Groupe[] = [];

    if (M) {
      const s = 44;
      const taille = s + s * 0.4;
      const g = grouper(M, taille, taille, 6, Math.floor((largeurUtile + 6) / (taille + 6)), 6);
      groupes.push({
        w: g.w,
        h: g.h,
        etiquette: "milliers",
        dessiner: (x, y) =>
          Array.from({ length: M }, (_, i) => (
            <Mille
              key={`m${i}`}
              x={x + (i % g.cols) * (taille + 6)}
              y={y + Math.floor(i / g.cols) * (taille + 6)}
              s={s}
              coloriage={coloriage}
            />
          )),
      });
    }
    if (C) {
      const P = 10 * c;
      const g = grouper(C, P, P, 6, Math.min(maxCentaines, Math.floor((largeurUtile + 6) / (P + 6))), 6);
      groupes.push({
        w: g.w,
        h: g.h,
        etiquette: "centaines",
        dessiner: (x, y) =>
          Array.from({ length: C }, (_, i) => (
            <Plaque
              key={`p${i}`}
              x={x + (i % g.cols) * (P + 6)}
              y={y + Math.floor(i / g.cols) * (P + 6)}
              c={c}
              fond={fond(TEINTES.plaque)}
            />
          )),
      });
    }
    if (D) {
      const g = grouper(D, c, 10 * c, 3, 10, 8);
      groupes.push({
        w: g.w,
        h: g.h,
        etiquette: "dizaines",
        dessiner: (x, y) =>
          Array.from({ length: D }, (_, i) => (
            <Barre
              key={`b${i}`}
              x={x + (i % g.cols) * (c + 3)}
              y={y + Math.floor(i / g.cols) * (10 * c + 8)}
              c={c}
              fond={fond(TEINTES.barre)}
            />
          )),
      });
    }
    if (U) {
      // Rangées de 5 ; un écart de plus toutes les 2 rangées (toutes les 10).
      const pas = c + 3;
      const cols = Math.min(5, U);
      const rangees = Math.ceil(U / 5);
      const paquets = Math.ceil(rangees / 2);
      const h = rangees * pas - 3 + (paquets - 1) * 5;
      groupes.push({
        w: cols * pas - 3,
        h,
        etiquette: "unités",
        dessiner: (x, y) =>
          Array.from({ length: U }, (_, i) => {
            const r = Math.floor(i / 5);
            return (
              <Cube
                key={`u${i}`}
                x={x + (i % 5) * pas}
                y={y + r * pas + Math.floor(r / 2) * 5}
                c={c}
                fond={fond(TEINTES.unite)}
              />
            );
          }),
      });
    }

    // Une étiquette plus large que son groupe élargit la boîte, jamais l'inverse.
    const boites = groupes.map((g) => ({
      ...g,
      wBoite: Math.max(g.w, avecEtiquettes ? largeurTexte(g.etiquette, FONT_ETIQUETTE) + 4 : 0),
    }));

    // Rangement en lignes, chaque ligne centrée, groupes posés sur le même sol.
    const lignes: (typeof boites)[] = [];
    let courante: typeof boites = [];
    let large = 0;
    for (const b of boites) {
      const besoin = courante.length ? large + ENTRE_GROUPES + b.wBoite : b.wBoite;
      if (courante.length && besoin > largeurUtile) {
        lignes.push(courante);
        courante = [b];
        large = b.wBoite;
      } else {
        courante.push(b);
        large = besoin;
      }
    }
    if (courante.length) lignes.push(courante);
    return { lignes };
  }

  const dessins: React.ReactNode[] = [];
  let y = PAD;
  lignes.forEach((ligne, l) => {
    const hMax = Math.max(...ligne.map((b) => b.h));
    const total = ligne.reduce((s, b) => s + b.wBoite + ENTRE_GROUPES, -ENTRE_GROUPES);
    let x = (width - total) / 2;
    ligne.forEach((b, k) => {
      const xg = x + (b.wBoite - b.w) / 2;
      dessins.push(<g key={`g${l}-${k}`}>{b.dessiner(xg, y + hMax - b.h)}</g>);
      if (avecEtiquettes) {
        dessins.push(
          <text
            key={`e${l}-${k}`}
            x={x + b.wBoite / 2}
            y={y + hMax + FONT_ETIQUETTE + 4}
            fontSize={FONT_ETIQUETTE}
            fill="#334155"
            textAnchor="middle"
            fontFamily={ECOLE}
          >
            {b.etiquette}
          </text>,
        );
      }
      x += b.wBoite + ENTRE_GROUPES;
    });
    y += hMax + hEtiquette + (l < lignes.length - 1 ? 14 : 0);
  });

  // ── La règle d'échange, dans un encadré sous le matériel ──
  if (figure.echange === "unites" || figure.echange === "dizaines") {
    y += 14;
    const ce = 10;
    const pasE = ce + 2;
    const gauche = 10 * pasE - 2; // 10 cubes ou 10 barres
    const egal = 30;
    const droite = 10 * ce; // 1 barre couchée ou 1 plaque
    const hContenu = figure.echange === "unites" ? ce : 10 * ce;
    const wTotal = gauche + egal + droite;
    const texte = figure.echange === "unites" ? "10 unités = 1 dizaine" : "10 dizaines = 1 centaine";
    const hCadre = 10 + hContenu + 8 + FONT_ETIQUETTE + 8;
    const x0 = (width - wTotal) / 2;
    dessins.push(
      <rect
        key="ech-cadre"
        x={x0 - 12}
        y={y}
        width={wTotal + 24}
        height={hCadre}
        rx={10}
        fill={coloriage ? "#ffffff" : "#f8fafc"}
        stroke="#94a3b8"
        strokeWidth={1.2}
        strokeDasharray="5 4"
      />,
    );
    const yc = y + 10;
    for (let i = 0; i < 10; i++) {
      dessins.push(
        figure.echange === "unites" ? (
          <Cube key={`ech${i}`} x={x0 + i * pasE} y={yc} c={ce} fond={fond(TEINTES.unite)} />
        ) : (
          <Barre key={`ech${i}`} x={x0 + i * pasE} y={yc} c={ce} fond={fond(TEINTES.barre)} />
        ),
      );
    }
    dessins.push(
      <text
        key="ech-egal"
        x={x0 + gauche + egal / 2}
        y={yc + hContenu / 2 + 7}
        fontSize={20}
        fontWeight={700}
        fill={ENCRE}
        textAnchor="middle"
        fontFamily={ECOLE}
      >
        =
      </text>,
    );
    dessins.push(
      figure.echange === "unites" ? (
        <Barre key="ech-d" x={x0 + gauche + egal} y={yc} c={ce} fond={fond(TEINTES.barre)} couchee />
      ) : (
        <Plaque key="ech-d" x={x0 + gauche + egal} y={yc} c={ce} fond={fond(TEINTES.plaque)} />
      ),
    );
    dessins.push(
      <text
        key="ech-t"
        x={width / 2}
        y={yc + hContenu + 8 + FONT_ETIQUETTE}
        fontSize={FONT_ETIQUETTE + 1}
        fontWeight={700}
        fill="#334155"
        textAnchor="middle"
        fontFamily={ECOLE}
      >
        {texte}
      </text>,
    );
    y += hCadre;
  }

  return { dessins, y };
}

// ─── La variante « cadres de dix » (CP) ───────────────────────────────────────

function Cadres({ figure, width }: { figure: BaseDixCanvasData; width: number }) {
  const coloriage = figure.mode === "coloriage";
  const n = borne(figure.nombre, 100);
  const a = borne(figure.ajout, 100 - n);
  const nb = Math.min(10, Math.max(1, Math.ceil((n + a) / 10), borne(figure.cadres, 10)));
  // Le plus grand qui tient : un cadre seul en 30 px, deux côte à côte en 28.
  const case_ = nb === 1 ? 30 : nb <= 4 ? 28 : 22;
  const rJeton = case_ * 0.36;
  const wC = 5 * case_;
  const hC = 2 * case_;
  const gap = 12;
  const largeurUtile = width - 2 * PAD;
  const cols = Math.max(1, Math.min(nb, Math.floor((largeurUtile + gap) / (wC + gap))));
  const lignes = Math.ceil(nb / cols);

  const dessins: React.ReactNode[] = [];
  for (let f = 0; f < nb; f++) {
    const l = Math.floor(f / cols);
    const dansLigne = Math.min(cols, nb - l * cols);
    const x0 = (width - (dansLigne * wC + (dansLigne - 1) * gap)) / 2 + (f % cols) * (wC + gap);
    const y0 = PAD + l * (hC + gap);
    dessins.push(
      <g key={`f${f}`}>
        <rect x={x0} y={y0} width={wC} height={hC} fill="#ffffff" stroke={ENCRE} strokeWidth={2} rx={2} />
        {[1, 2, 3, 4].map((i) => (
          <line key={i} x1={x0 + i * case_} y1={y0} x2={x0 + i * case_} y2={y0 + hC} stroke={ENCRE} strokeWidth={1.1} />
        ))}
        <line x1={x0} y1={y0 + case_} x2={x0 + wC} y2={y0 + case_} stroke={ENCRE} strokeWidth={1.1} />
      </g>,
    );
    for (let i = 0; i < 10; i++) {
      const k = f * 10 + i;
      if (k >= n + a) break;
      const cx = x0 + (i % 5) * case_ + case_ / 2;
      const cy = y0 + Math.floor(i / 5) * case_ + case_ / 2;
      const bleu = k >= n;
      dessins.push(
        coloriage ? (
          <g key={`j${k}`}>
            <circle cx={cx} cy={cy} r={rJeton} fill="#ffffff" stroke={ENCRE} strokeWidth={1.6} />
            {bleu && <circle cx={cx} cy={cy} r={rJeton * 0.38} fill={ENCRE} />}
          </g>
        ) : (
          <circle
            key={`j${k}`}
            cx={cx}
            cy={cy}
            r={rJeton}
            fill={bleu ? TEINTES.bleu : TEINTES.rouge}
            stroke={ENCRE}
            strokeWidth={1.3}
          />
        ),
      );
    }
  }
  return { dessins, y: PAD + lignes * hC + (lignes - 1) * gap };
}

export default function BaseDixCanvas({ figure }: Props) {
  if (!isBaseDix(figure)) return null;
  const width = Math.max(200, figure.size?.width ?? 320);

  const rendu = figure.variante === "cadres" ? Cadres({ figure, width }) : Materiel({ figure, width });
  if (!rendu.dessins.length) return null;

  const lignesConsigne = figure.consigne ? couper(figure.consigne, width - 2 * PAD, FONT_CONSIGNE, 3) : [];
  const height = rendu.y + (lignesConsigne.length ? 10 + lignesConsigne.length * LH_CONSIGNE : 0) + PAD + 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ maxWidth: width, height: "auto", display: "block", margin: "0 auto" }}
      role="img"
      aria-label={figure.consigne ?? "Du matériel de numération"}
    >
      <rect x={0} y={0} width={width} height={height} fill="#ffffff" />
      {rendu.dessins}
      {lignesConsigne.map((ligne, i) => (
        <text
          key={i}
          x={width / 2}
          y={rendu.y + 22 + i * LH_CONSIGNE}
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
