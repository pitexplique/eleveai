// lib/canvas/ObjetsCanvas.tsx
"use client";

import type { CanvasFigure, ObjetId, ObjetsCanvasData } from "@/lib/tutor-v4/types";

// ─── LA BIBLIOTHÈQUE D'OBJETS ─────────────────────────────────────────────────
// Voir le bloc de commentaire de `ObjetsCanvasData` (types_canvas.ts) pour ce
// qu'elle montre et pourquoi elle existe à côté de `personnage`. Ici : comment
// elle se dessine.
//
// ⭐ CHAQUE OBJET TIENT DANS UNE BOITE DE 60 × 60, ET RIEN D'AUTRE N'EST À
// SAVOIR POUR EN AJOUTER UN. Le placement, l'échelle, la répétition, l'étiquette
// et la marque sont gérés une fois pour toutes par le composant : un objet neuf,
// c'est une entrée dans `DESSINS` et une couleur dans `TEINTES`. C'est ce qui
// rend la bibliothèque extensible sans y repenser.
//
// ⭐ TOUTES LES FORMES SONT FERMÉES, comme dans `PersonnageCanvas` — un trait
// épais est un trait NOIR, et on ne colorie pas un trait. Les détails qui
// doivent rester noirs (un œil, une nervure) sont dessinés APRÈS, en trait fin.

type Props = { figure: CanvasFigure };

function isObjetsCanvas(figure: CanvasFigure): figure is ObjetsCanvasData {
  return figure.kind === "objets";
}

const ENCRE = "#111827";
const TRAIT = 2.2;

const FONT_LABEL = 14;
const FONT_CONSIGNE = 13;
const LH_CONSIGNE = 16;
const PAD = 8;
const BOITE = 60;

/** ⭐ LA COULEUR NE VIENT JAMAIS DE L'APPELANT, ici non plus. La fiche écrit
 *  `quoi: "pomme"` : la pomme est rouge sur les 45 notions du cycle 2, et deux
 *  fiches ne peuvent pas la faire changer de teinte. */
type Teinte = { a: string; b: string; c: string };

const TEINTES: Record<ObjetId, Teinte> = {
  bateau: { a: "#b45309", b: "#ffffff", c: "#ef4444" },
  verre: { a: "#e0f2fe", b: "#38bdf8", c: "#ffffff" },
  tasse: { a: "#ffffff", b: "#7c3aed", c: "#a16207" },
  livre: { a: "#2563eb", b: "#ffffff", c: "#fbbf24" },
  cartable: { a: "#b45309", b: "#fcd34d", c: "#78350f" },
  cle: { a: "#facc15", b: "#facc15", c: "#ffffff" },
  ballon: { a: "#ffffff", b: "#111827", c: "#ffffff" },
  voiture: { a: "#ef4444", b: "#bae6fd", c: "#334155" },
  maison: { a: "#fef3c7", b: "#b91c1c", c: "#7c2d12" },
  chapeau: { a: "#1d4ed8", b: "#fbbf24", c: "#ffffff" },
  pomme: { a: "#ef4444", b: "#16a34a", c: "#78350f" },
  banane: { a: "#fde047", b: "#a16207", c: "#ffffff" },
  arbre: { a: "#22c55e", b: "#92400e", c: "#ffffff" },
  fleur: { a: "#ec4899", b: "#fbbf24", c: "#16a34a" },
  feuille: { a: "#4ade80", b: "#15803d", c: "#ffffff" },
  soleil: { a: "#fde047", b: "#f59e0b", c: "#ffffff" },
  nuage: { a: "#ffffff", b: "#93c5fd", c: "#ffffff" },
  etoile: { a: "#fbbf24", b: "#f59e0b", c: "#ffffff" },
  poisson: { a: "#38bdf8", b: "#0284c7", c: "#ffffff" },
  oiseau: { a: "#fca5a5", b: "#f59e0b", c: "#ffffff" },
  papillon: { a: "#f97316", b: "#7c3aed", c: "#ffffff" },
  chat: { a: "#94a3b8", b: "#ffffff", c: "#f9a8d4" },
};

const BLANC: Teinte = { a: "#ffffff", b: "#ffffff", c: "#ffffff" };

/** Les traits communs à toutes les formes pleines. */
function forme(fill: string) {
  return {
    fill,
    stroke: ENCRE,
    strokeWidth: TRAIT,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };
}

/** Le détail qui reste noir quoi qu'il arrive : un œil, une nervure, une anse.
 *  ⛔ Ne jamais en faire une zone à colorier — un enfant ne colorie pas un œil. */
function detail(epaisseur = 1.6) {
  return {
    fill: "none",
    stroke: ENCRE,
    strokeWidth: epaisseur,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

// ─── Les vingt-deux dessins, chacun dans sa boite de 60 × 60 ──────────────────

const DESSINS: Record<ObjetId, (t: Teinte) => React.ReactNode> = {
  bateau: (t) => (
    <>
      <path d="M 30 8 L 30 40" {...detail(2.2)} />
      <path d="M 32 12 L 32 40 L 50 40 Z" {...forme(t.b)} />
      <path d="M 28 20 L 28 40 L 14 40 Z" {...forme(t.c)} />
      <path d="M 8 42 L 52 42 L 45 54 L 15 54 Z" {...forme(t.a)} />
    </>
  ),
  verre: (t) => (
    <>
      <path d="M 19 12 L 41 12 L 37 52 L 23 52 Z" {...forme(t.c)} />
      <path d="M 20.5 26 L 39.5 26 L 37 52 L 23 52 Z" {...forme(t.a)} />
      <path d="M 24 17 L 24 24" {...detail(1.4)} />
    </>
  ),
  tasse: (t) => (
    <>
      <path d="M 42 24 a 9 9 0 0 1 0 14" {...forme(t.a)} />
      <path d="M 14 20 L 42 20 L 39 46 L 17 46 Z" {...forme(t.a)} />
      <ellipse cx={28} cy={20} rx={14} ry={4} {...forme(t.b)} />
      <ellipse cx={28} cy={51} rx={20} ry={4} {...forme(t.c)} />
    </>
  ),
  livre: (t) => (
    <>
      <path d="M 10 14 L 30 18 L 30 48 L 10 44 Z" {...forme(t.a)} />
      <path d="M 50 14 L 30 18 L 30 48 L 50 44 Z" {...forme(t.a)} />
      <path d="M 30 18 L 30 48" {...detail(2)} />
      <path d="M 15 24 L 25 26 M 15 30 L 25 32" {...detail(1.3)} />
    </>
  ),
  cartable: (t) => (
    <>
      <path d="M 22 14 a 8 7 0 0 1 16 0" {...detail(2.2)} />
      <rect x={11} y={20} width={38} height={32} rx={5} {...forme(t.a)} />
      <path d="M 11 26 L 49 26 L 49 34 L 11 34 Z" {...forme(t.b)} />
      <rect x={26} y={31} width={8} height={7} rx={1.5} {...forme(t.c)} />
    </>
  ),
  cle: (t) => (
    <>
      <path d="M 30 30 L 52 30 L 52 36 L 48 36 L 48 32 L 43 32 L 43 38 L 38 38 L 38 32 L 30 32 Z" {...forme(t.b)} />
      <circle cx={20} cy={31} r={13} {...forme(t.a)} />
      <circle cx={20} cy={31} r={5} fill="#ffffff" stroke={ENCRE} strokeWidth={TRAIT} />
    </>
  ),
  ballon: (t) => (
    <>
      <circle cx={30} cy={31} r={20} {...forme(t.a)} />
      <path d="M 30 18 L 40 26 L 36 38 L 24 38 L 20 26 Z" {...forme(t.b)} />
      <path d="M 30 11 L 30 18 M 12 25 L 20 26 M 48 25 L 40 26 M 19 47 L 24 38 M 41 47 L 36 38" {...detail(1.6)} />
    </>
  ),
  voiture: (t) => (
    <>
      <path d="M 6 44 L 6 32 L 16 32 L 22 20 L 42 20 L 48 32 L 54 32 L 54 44 Z" {...forme(t.a)} />
      <path d="M 24 23 L 29 23 L 29 32 L 19 32 Z" {...forme(t.b)} />
      <path d="M 33 23 L 39 23 L 44 32 L 33 32 Z" {...forme(t.b)} />
      <circle cx={18} cy={45} r={7} {...forme(t.c)} />
      <circle cx={43} cy={45} r={7} {...forme(t.c)} />
      <circle cx={18} cy={45} r={2.4} fill="#ffffff" stroke={ENCRE} strokeWidth={1.4} />
      <circle cx={43} cy={45} r={2.4} fill="#ffffff" stroke={ENCRE} strokeWidth={1.4} />
    </>
  ),
  maison: (t) => (
    <>
      <path d="M 30 8 L 54 28 L 6 28 Z" {...forme(t.b)} />
      <rect x={12} y={28} width={36} height={26} {...forme(t.a)} />
      <rect x={26} y={38} width={11} height={16} rx={1} {...forme(t.c)} />
      <rect x={16} y={33} width={8} height={8} {...forme(t.c)} />
    </>
  ),
  chapeau: (t) => (
    <>
      <ellipse cx={30} cy={42} rx={24} ry={7} {...forme(t.a)} />
      <path d="M 17 42 L 19 18 a 11 6 0 0 1 22 0 L 43 42 Z" {...forme(t.a)} />
      <path d="M 17 36 L 43 36 L 43 42 L 17 42 Z" {...forme(t.b)} />
    </>
  ),
  pomme: (t) => (
    <>
      <path d="M 30 18 a 15 16 0 1 0 0.1 0 Z" {...forme(t.a)} />
      <path d="M 30 18 L 30 10" {...detail(2.2)} />
      <path d="M 31 12 a 10 7 0 0 1 13 -2 a 10 7 0 0 1 -13 2 Z" {...forme(t.b)} />
    </>
  ),
  // ⛔ La première banane était un croissant de 4 px d'épaisseur : à la taille
  // d'une cellule, on n'y lisait pas un fruit mais un trait de crayon égaré.
  banane: (t) => (
    <>
      <path d="M 13 14 A 36 36 0 0 0 49 50 A 24 24 0 0 1 25 18 Z" {...forme(t.a)} />
      <path d="M 13 14 L 11 8" {...forme(t.b)} />
      <path d="M 49 50 L 55 52" {...forme(t.b)} />
    </>
  ),
  arbre: (t) => (
    <>
      <rect x={26} y={34} width={8} height={20} {...forme(t.b)} />
      <circle cx={30} cy={22} r={15} {...forme(t.a)} />
      <circle cx={18} cy={30} r={10} {...forme(t.a)} />
      <circle cx={42} cy={30} r={10} {...forme(t.a)} />
    </>
  ),
  fleur: (t) => (
    <>
      <path d="M 30 30 L 30 54" {...detail(2.4)} />
      <path d="M 30 42 a 11 7 0 0 1 13 -3 a 11 7 0 0 1 -13 3 Z" {...forme(t.c)} />
      <circle cx={30} cy={16} r={8} {...forme(t.a)} />
      <circle cx={16} cy={26} r={8} {...forme(t.a)} />
      <circle cx={44} cy={26} r={8} {...forme(t.a)} />
      <circle cx={21} cy={40} r={8} {...forme(t.a)} />
      <circle cx={39} cy={40} r={8} {...forme(t.a)} />
      <circle cx={30} cy={30} r={7.5} {...forme(t.b)} />
    </>
  ),
  feuille: (t) => (
    <>
      <path d="M 12 48 C 12 22 30 8 48 10 C 50 30 34 48 12 48 Z" {...forme(t.a)} />
      <path d="M 14 47 L 44 15 M 26 27 L 30 34 M 34 21 L 38 28" {...detail(1.5)} />
    </>
  ),
  soleil: (t) => (
    <>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = 30 + Math.cos(a) * 17;
        const y1 = 30 + Math.sin(a) * 17;
        const x2 = 30 + Math.cos(a) * 27;
        const y2 = 30 + Math.sin(a) * 27;
        const n = { x: -Math.sin(a) * 5, y: Math.cos(a) * 5 };
        return (
          <path
            key={i}
            d={`M ${x1 + n.x} ${y1 + n.y} L ${x2} ${y2} L ${x1 - n.x} ${y1 - n.y} Z`}
            {...forme(t.b)}
          />
        );
      })}
      <circle cx={30} cy={30} r={16} {...forme(t.a)} />
    </>
  ),
  nuage: (t) => (
    <>
      <path
        d="M 14 42 a 10 10 0 0 1 1 -20 a 13 13 0 0 1 24 -4 a 11 11 0 0 1 7 24 Z"
        {...forme(t.a)}
      />
      <path d="M 20 36 a 7 7 0 0 1 9 -4" {...detail(1.4)} />
    </>
  ),
  etoile: (t) => {
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 === 0 ? 24 : 10;
      pts.push(`${(30 + Math.cos(a) * r).toFixed(1)},${(30 + Math.sin(a) * r).toFixed(1)}`);
    }
    return <polygon points={pts.join(" ")} {...forme(t.a)} />;
  },
  poisson: (t) => (
    <>
      <path d="M 50 18 L 50 44 L 34 31 Z" {...forme(t.b)} />
      <ellipse cx={26} cy={31} rx={20} ry={13} {...forme(t.a)} />
      <path d="M 24 18 a 9 6 0 0 1 12 3" {...forme(t.b)} />
      <circle cx={14} cy={28} r={2.4} fill={ENCRE} />
      <path d="M 8 31 a 8 8 0 0 0 5 6" {...detail(1.4)} />
    </>
  ),
  oiseau: (t) => (
    <>
      <path d="M 12 30 L 4 20 L 8 34 Z" {...forme(t.a)} />
      <ellipse cx={28} cy={34} rx={17} ry={12} {...forme(t.a)} />
      <circle cx={43} cy={22} r={9} {...forme(t.a)} />
      <path d="M 51 20 L 59 23 L 51 26 Z" {...forme(t.b)} />
      <circle cx={45} cy={20} r={2.1} fill={ENCRE} />
      <path d="M 20 30 a 12 8 0 0 1 16 3 a 12 8 0 0 1 -16 -3 Z" {...forme(t.a)} />
      <path d="M 24 46 L 24 54 M 33 46 L 33 54" {...detail(2)} />
    </>
  ),
  papillon: (t) => (
    <>
      <path d="M 28 30 C 12 8 2 22 10 32 C 2 42 14 52 28 32 Z" {...forme(t.a)} />
      <path d="M 32 30 C 48 8 58 22 50 32 C 58 42 46 52 32 32 Z" {...forme(t.a)} />
      <ellipse cx={30} cy={31} rx={3.4} ry={15} {...forme(t.b)} />
      <path d="M 28 16 L 22 6 M 32 16 L 38 6" {...detail(1.6)} />
    </>
  ),
  // ⛔ Le premier chat était vu de profil, tête et corps en deux ovales qui se
  // recouvraient : on y voyait un phoque. Assis et de face, il se reconnait —
  // et de face, c'est aussi la vue de toute la troupe.
  chat: (t) => (
    <>
      <path d="M 40 52 C 53 52 57 41 52 32 C 59 41 54 57 40 57 Z" {...forme(t.a)} />
      <path d="M 30 32 C 18 32 14 44 16 54 L 44 54 C 46 44 42 32 30 32 Z" {...forme(t.a)} />
      <path d="M 21 17 L 18 5 L 31 13 Z" {...forme(t.a)} />
      <path d="M 39 17 L 42 5 L 29 13 Z" {...forme(t.a)} />
      <circle cx={30} cy={26} r={14} {...forme(t.a)} />
      <circle cx={25} cy={24} r={2.2} fill={ENCRE} />
      <circle cx={35} cy={24} r={2.2} fill={ENCRE} />
      <path d="M 27 30 L 33 30 L 30 33 Z" {...forme(t.c)} />
      <path d="M 30 33 L 30 35 M 30 35 a 4 3 0 0 1 -5 1 M 30 35 a 4 3 0 0 0 5 1" {...detail(1.3)} />
      <path d="M 16 27 L 5 25 M 16 30 L 5 32 M 44 27 L 55 25 M 44 30 L 55 32" {...detail(1.2)} />
    </>
  ),
};

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

export default function ObjetsCanvas({ figure }: Props) {
  if (!isObjetsCanvas(figure)) return null;

  const coloriage = (figure.mode ?? "coloriage") === "coloriage";
  const elements = figure.elements ?? [];
  if (!elements.length) return null;

  const width = Math.max(160, figure.size?.width ?? 250);
  const largeurUtile = width - 2 * PAD;

  // ⭐ LA RÉPÉTITION SE SERRE, ELLE NE S'ÉTALE PAS. Trois pommes côte à côte à
  // pleine taille demanderaient 180 px ; elles se chevauchent d'un tiers, comme
  // des objets posés les uns devant les autres, et la cellule reste lisible.
  const nombreDe = (i: number) => Math.min(5, Math.max(1, elements[i].nombre ?? 1));
  const largeurCellule = (i: number) => BOITE + (nombreDe(i) - 1) * BOITE * 0.62;

  /* ⛔ L'ÉCART ENTRE CELLULES DÉPEND DES ÉTIQUETTES (mesuré le 02/09/2026).
     Avec 10 px d'écart, « une maison » et « un chapeau » se rejoignaient en
     « une maisonun chapeau » : chaque mot restait bien dans le CADRE du dessin,
     et c'est pour ça que le vérificateur de débordement ne disait rien — ils se
     touchaient l'un l'autre, pas le bord. ⭐ Un mot est presque toujours plus
     large que l'objet qu'il nomme : c'est l'étiquette qui fixe l'écart, jamais
     le dessin. */
  const aDesLabels = elements.some((e) => e.label);
  const ECART = aDesLabels ? 18 : 10;

  /* ⛔⛔ C'EST LE MOT LE PLUS LONG QUI DÉCIDE DU NOMBRE DE COLONNES, PAS LE
     DESSIN (mesuré le 02/09/2026, après deux réglages qui n'ont pas suffi).
     Sur cinq colonnes de 360 px, chaque objet reçoit 73 px de pas — quand
     « une banane » en occupe 73 à lui seul. Élargir l'écart, puis rapetisser la
     police, ne faisaient que déplacer le chevauchement : la ligne était TROP
     PLEINE, il fallait retirer une colonne, pas gagner des pixels.
     ⭐ Compter environ 90 px par objet dès qu'il porte une étiquette.
     ⚠️ Une valeur explicite dans `colonnes` reste respectée — c'est un plafond
     calculé, pas une décision prise à la place de la fiche. */
  const largeurLabelMax = Math.max(
    0,
    ...elements.map((e) => (e.label ? largeurTexte(e.label, FONT_LABEL) : 0))
  );
  const colonnesTenables = largeurLabelMax
    ? Math.floor(largeurUtile / (largeurLabelMax + 10))
    : Infinity;

  const colonnes = Math.max(
    1,
    Math.min(
      figure.colonnes ?? elements.length,
      colonnesTenables,
      Math.floor(largeurUtile / Math.max(...elements.map((_, i) => largeurCellule(i))))
    ) || 1
  );

  // L'échelle : la ligne la plus large doit tenir dans la largeur utile.
  const largeurLigneMax = Math.max(
    ...Array.from({ length: Math.ceil(elements.length / colonnes) }, (_, l) =>
      elements
        .slice(l * colonnes, (l + 1) * colonnes)
        .reduce((s, _, k) => s + largeurCellule(l * colonnes + k) + ECART, -ECART)
    )
  );
  const echelle = Math.min(1.5, largeurUtile / Math.max(1, largeurLigneMax));

  const hLabel = aDesLabels ? FONT_LABEL + 8 : 0;
  const hLigne = BOITE * echelle + hLabel + 12;
  const lignes = Math.ceil(elements.length / colonnes);

  const lignesConsigne = figure.consigne
    ? couper(figure.consigne, largeurUtile, FONT_CONSIGNE, 3)
    : [];
  const hConsigne = lignesConsigne.length ? lignesConsigne.length * LH_CONSIGNE + 10 : 0;

  const height = PAD + lignes * hLigne + hConsigne + PAD;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ maxWidth: width, height: "auto", display: "block", margin: "0 auto" }}
      role="img"
      aria-label={figure.consigne ?? elements.map((e) => e.label ?? e.quoi).join(", ")}
    >
      <rect x={0} y={0} width={width} height={height} fill="#ffffff" />

      {Array.from({ length: lignes }).map((_, l) => {
        const dansLaLigne = elements.slice(l * colonnes, (l + 1) * colonnes);
        const largeurTotale =
          dansLaLigne.reduce((s, _, k) => s + largeurCellule(l * colonnes + k) * echelle + ECART, -ECART);
        let x = (width - largeurTotale) / 2;
        const y = PAD + l * hLigne;

        return dansLaLigne.map((el, k) => {
          const i = l * colonnes + k;
          const n = nombreDe(i);
          const t = coloriage ? BLANC : TEINTES[el.quoi];
          const wCell = largeurCellule(i) * echelle;
          const xCell = x;
          x += wCell + ECART;

          return (
            <g key={`${l}-${k}`}>
              {el.marque && (
                <rect
                  x={xCell - 3}
                  y={y - 3}
                  width={wCell + 6}
                  height={BOITE * echelle + hLabel + 4}
                  rx={10}
                  fill="none"
                  stroke={ENCRE}
                  strokeWidth={2}
                  strokeDasharray="6 4"
                />
              )}
              {/* Les exemplaires, du fond vers l'avant : le dernier dessiné est
                  celui de devant, et c'est celui qu'on voit en entier. */}
              {Array.from({ length: n }).map((__, j) => (
                <g
                  key={j}
                  transform={`translate(${xCell + j * BOITE * 0.62 * echelle}, ${y}) scale(${echelle})`}
                >
                  {DESSINS[el.quoi](t)}
                </g>
              ))}
              {/* ⛔ L'ÉTIQUETTE EST PLUS LARGE QUE SON OBJET, ET C'EST LA RÈGLE
                  PLUTÔT QUE L'EXCEPTION (mesuré le 02/09/2026). « un cartable »
                  sous un dessin de 60 px occupait [279 ; 364] dans un cadre de
                  360 : un SVG masque ce qui dépasse, donc le mot n'était pas mal
                  placé, il était COUPÉ — et rien à l'écran ne le disait.
                  Deux gardes, dans cet ordre : on réduit la police jusqu'à ce
                  que le mot tienne dans sa cellule élargie, puis on ramène le
                  centre à l'intérieur du cadre. ⚠️ Jamais sous 11 px : c'est le
                  plancher de lisibilité de tout le dépôt. */}
              {el.label && (() => {
                const dispo = wCell + ECART - 6;
                const brut = largeurTexte(el.label, FONT_LABEL);
                const police = Math.max(11, Math.min(FONT_LABEL, (FONT_LABEL * dispo) / brut));
                const demi = largeurTexte(el.label, police) / 2;
                const cx = Math.min(
                  Math.max(xCell + wCell / 2, demi + 2),
                  width - demi - 2
                );
                return (
                  <text
                    x={cx}
                    y={y + BOITE * echelle + FONT_LABEL}
                    fontSize={police}
                    fill={ENCRE}
                    textAnchor="middle"
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                  >
                    {el.label}
                  </text>
                );
              })()}
            </g>
          );
        });
      })}

      {lignesConsigne.map((ligne, i) => (
        <text
          key={i}
          x={width / 2}
          y={PAD + lignes * hLigne + 12 + i * LH_CONSIGNE}
          fontSize={FONT_CONSIGNE}
          fill="#334155"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {ligne}
        </text>
      ))}
    </svg>
  );
}
