// ─── Fiche d'exercices : échelles, agrandissements et réductions (4e) — 20 exercices corrigés ─
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-echelles.tsx` et sur les
// sept micros du coach de 4e (notionId prop_echelle). L'angle de la 4e, comme
// le cours : UNE seule idée qui monte d'une dimension à chaque fois. Une
// échelle est une réduction de rapport 1/d ; un rapport k multiplie les
// longueurs par k, donc les aires par k², donc les volumes par k³. ⛔ La
// proportionnalité simple a sa feuille (`prop_proportionnalite`), les
// pourcentages la leur (`prop_ratio_pourcentage`) : ici, rien que des échelles
// et des rapports. Pas de racine carrée écrite : remonter d'une aire à un
// rapport se fait avec des carrés parfaits (« 3 × 3 = 9 »).
//
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni le 1/25 000 et ses
// 4 cm pour 1 km, ni le 1/500, ni la façade de 12 m au 1/200, ni le rapport 3
// sur 5 cm × 4 cm, ni les 3 pots de peinture, ni la maquette au 1/10 de 2 L,
// ni les entraînements (1/50 000, 8 cm au 1/1 000, 15 m au 1/500, 6 → 24 cm,
// 20 cm² × 9, 25 → 5, 12 cm³ × 8, 20 km pour 5 cm). ⛔ Ni ceux des feuilles
// de 3e (le triangle 2-6, le jardin au 1/200, le rectangle 20 → 125 cm², les
// pizzas, le dé de 2 cm, le verre à cocktail, la cuve au 1/20, la Terre et la
// Lune, la tour Eiffel).
//
// Les pièges nommés : « 1 cm pour 20 000 m », les deux nombres d'une échelle
// lus dans deux unités (1, 13) ; le grand dénominateur pris pour une grande
// carte (2, 17) ; la conversion oubliée ou ratée, cm → km par 1 000 (3, 9) ;
// diviser des mètres par un dénominateur en centimètres (4, 12) ; ajouter au
// lieu de multiplier (5, 6, 11) ; l'aire multipliée par k (7, 15, 20) ; le
// volume multiplié par k (8, 16, 18, 19) ; le rapport des aires pris pour
// celui des longueurs (14) ; « 30 cm, c'est presque 29,7 cm » (10).
//
// Les chiffres du monde, et d'où ils viennent :
// - terrain de rugby : 100 m au plus entre les lignes d'essai (World Rugby,
//   Règles du jeu, règle 1) — ex. 4 ;
// - terrain de basket : 28 m × 15 m, cercle central de 1,80 m de rayon (FIBA,
//   Règles officielles 2022, article 2) — ex. 12 ;
// - feuille A4 : 21 cm × 29,7 cm (norme ISO 216) — ex. 10 ;
// - marathon : 42,195 km, distance officielle fixée en 1921 par l'IAAF,
//   aujourd'hui World Athletics — ex. 17 ;
// - bassin olympique : 50 m × 25 m (10 couloirs de 2,5 m), 2 m de profondeur
//   au minimum (World Aquatics, règles des installations, FR 2) — ex. 18 ; le
//   petit bassin de 25 m × 12,5 m × 1 m est IMAGINÉ pour être une réduction
//   exacte ;
// - grêle : un grêlon de 1 cm de diamètre pèse environ 0,5 g (boule de 0,52 cm³
//   à 0,92 g/cm³, la masse volumique de la glace) ; des grêlons de 4 à 8 cm
//   tombent lors des orages violents en France (Keraunos, observatoire des
//   orages) — ex. 19 ;
// - Amazonie : environ 9 000 km² déboisés en Amazonie brésilienne entre août
//   2022 et juillet 2023 (INPE, programme PRODES). ⚠️ À revérifier avant
//   diffusion, comme tout chiffre d'actualité — ex. 20 ;
// - la carte de randonnée, le plan de ville, la maison, la photo, le logo, la
//   pelouse (30 g de graines par m², l'ordre de grandeur des sachets) et
//   l'aquarium sont IMAGINÉS, à des dimensions vraisemblables.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés ont
// leur dessin, et chaque dessin est À L'ÉCHELLE — c'est le sujet de la feuille.
//   · `regle()` : la règle double, centimètres de la carte en haut, réalité en
//     bas, la mesure de l'énoncé en rouge (1, 3, 4, 13) ;
//   · `barres()` : la même longueur sur plusieurs cartes, barres à l'échelle
//     (2, 17) ;
//   · `dessin()` : le modèle et son agrandissement DANS LE MÊME SVG, à la même
//     échelle, avec leurs vraies coordonnées ; le quadrillage (`grille`) fait
//     COMPTER le k² — le modèle tient 9 fois dans l'agrandi de rapport 3 (5-7,
//     10-12, 14, 15, 18, 20) ;
//   · `paves()` : les deux pavés en perspective cavalière, à la même échelle,
//     le grand découpé en k³ petits (8, 16, 19) ;
//   · `tableauEch()` : le tableau carte → réalité (9).
// ⛔ POURQUOI UN SEUL SVG POUR LES DEUX FIGURES, et pas la grille de deux
// colonnes des autres feuilles : chaque colonne remet SA figure à la taille de
// la case — le petit rectangle et le grand y apparaîtraient de la même taille,
// et le dessin mentirait sur la seule chose qu'il doit montrer. La grille
// `deux()` ne sert qu'à poser deux situations différentes côte à côte (10, 11,
// 20).
// ⛔ LISIBLE À 375 px : viewBox de 300 de large, police 15 partout, soit
// 11,75 px quand le dessin tient dans 235 px. Le script de recalcul refait la
// mise en page de chaque dessin et vérifie qu'aucune étiquette ne sort du
// cadre, n'en chevauche une autre ni ne croise un trait.
//
// Les corrigés sont écrits à la première personne (« je convertis »), comme
// les feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-echelles-4e.mjs`.
//
// Micro-compétences : echelle_comprendre (1, 2, 9, 10, 12, 13, 17, 20),
// echelle_distance_reelle (1, 3, 9, 13, 20), echelle_distance_plan (2, 4, 9,
// 10, 12, 17), agrandissement_rapport (5, 6, 11, 14, 18, 19),
// agrandissement_aire (7, 14, 15, 18, 20), agrandissement_volume (8, 16, 18,
// 19), echelle_defi (17, 18, 19, 20). 7/7.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const ENCRE = "#0f172a";
const GRIS = "#64748b";

/** Deux situations côte à côte : l'une sous l'autre sur téléphone, côte à côte
 *  à partir de `sm` et sur papier (mesuré à 375 px sur la feuille de Pythagore). */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/** 1000 → « 1 000 », 2.4 → « 2,4 » : le texte NU des dessins (SVG, pas de KaTeX). */
const nombre = (x: number) => {
  const r = Math.round(x * 1000) / 1000;
  const [e, d] = String(r).split(".");
  return e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
};
/** Largeur estimée d'un texte en police 15 grasse, en unités du viewBox. */
const largeur = (t: string) => [...t].length * 8.6;
const CADRE = "mx-auto w-full max-w-[20rem] print:max-w-[15rem]";

/* ── La règle double ──────────────────────────────────────────────────────────
 * Centimètres de la carte en haut (bleu), réalité en bas (orange), dans l'unité
 * annoncée. `par` : ce que vaut 1 cm. `pas` : une étiquette toutes les `pas`
 * graduations (quatre ou cinq intervalles étiquetés au plus, sinon elles se
 * touchent). `marque` : la mesure de l'énoncé, en rouge, et sa valeur réelle. */
const R0 = 50;
const R1 = 274;
const regle = (o: { n: number; par: number; unite: string; pas?: number; marque?: number }) => {
  const { n, par, unite, pas = 1, marque } = o;
  const X = (i: number) => R0 + ((R1 - R0) * i) / n;
  const H = marque === undefined ? 90 : 116;
  const txt = marque === undefined ? "" : `${nombre(marque)} cm → ${nombre(marque * par)} ${unite}`;
  const xm = marque === undefined ? 0 : Math.min(Math.max(X(marque), 4 + largeur(txt) / 2), 290 - largeur(txt) / 2);
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Règle double : 1 cm sur la carte représente ${nombre(par)} ${unite} en vrai`}>
        <text x="4" y="31" fontSize={15} fontWeight={800} fill={BLEU}>cm</text>
        <text x="4" y="79" fontSize={15} fontWeight={800} fill={ORANGE}>{unite}</text>
        <line x1={X(0)} y1={48} x2={X(n)} y2={48} stroke={ENCRE} strokeWidth={3} />
        {marque !== undefined && <line x1={X(0)} y1={48} x2={X(marque)} y2={48} stroke={ROUGE} strokeWidth={6} />}
        {Array.from({ length: n + 1 }, (_, i) => (
          <g key={i}>
            <line x1={X(i)} y1={i % pas === 0 ? 39 : 43} x2={X(i)} y2={i % pas === 0 ? 57 : 53} stroke={ENCRE} strokeWidth={2} />
            {i % pas === 0 && (
              <>
                <text x={X(i)} y={31} textAnchor="middle" fontSize={15} fontWeight={700} fill={BLEU}>{nombre(i)}</text>
                <text x={X(i)} y={79} textAnchor="middle" fontSize={15} fontWeight={700} fill={ORANGE}>{nombre(i * par)}</text>
              </>
            )}
          </g>
        ))}
        {marque !== undefined && (
          <>
            <line x1={X(marque)} y1={36} x2={X(marque)} y2={60} stroke={ROUGE} strokeWidth={3} />
            <text x={xm} y={107} textAnchor="middle" fontSize={15} fontWeight={800} fill={ROUGE}>{txt}</text>
          </>
        )}
      </svg>
    </div>
  );
};

/* ── La même longueur, en barres à l'échelle ──────────────────────────────────
 * Une barre par carte, toutes à la même échelle ; `limite` : un trait rouge en
 * tirets (la table de 50 cm), coupé entre les barres pour ne croiser aucun texte. */
const barres = (lignes: { label: string; cm: number }[], limite?: { cm: number; label: string }) => {
  const max = Math.max(...lignes.map((l) => l.cm), limite?.cm ?? 0);
  const s = 280 / max;
  const haut = limite ? 24 : 0;
  const H = haut + lignes.length * 44 + 4;
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Longueurs dessinées à l'échelle">
        {limite && (
          <text x={Math.min(Math.max(10 + limite.cm * s, 4 + largeur(limite.label) / 2), 290 - largeur(limite.label) / 2)} y={17} textAnchor="middle" fontSize={15} fontWeight={800} fill={ROUGE}>
            {limite.label}
          </text>
        )}
        {lignes.map((l, i) => {
          const y = haut + i * 44;
          return (
            <g key={i}>
              <text x={10} y={y + 17} fontSize={15} fontWeight={700} fill={ENCRE}>{l.label}</text>
              <rect x={10} y={y + 24} width={l.cm * s} height={14} rx={3} fill={i % 2 ? ORANGE : BLEU} />
              {limite && <line x1={10 + limite.cm * s} y1={y + 21} x2={10 + limite.cm * s} y2={y + 41} stroke={ROUGE} strokeWidth={2.5} strokeDasharray="4 3" />}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ── Des figures À L'ÉCHELLE, dans un même SVG ────────────────────────────────
 * On donne les VRAIES coordonnées, dans l'unité des étiquettes, y vers le haut.
 * `cotes[i]` nomme le côté pts[i] → pts[i + 1] ; l'étiquette se pose dehors,
 * à l'opposé du centre de la figure. `grille: [colonnes, rangées]` découpe un
 * rectangle : c'est ce qui fait COMPTER le k². `droit` : l'indice du sommet
 * qui porte un angle droit. Le script de recalcul relit ces appels. */
type Pt = [number, number];
type Fond = "bleu" | "orange" | "vert";
type Forme =
  | { pts: Pt[]; cotes?: string[]; nom?: string; fond?: Fond; tirets?: boolean; grille?: [number, number]; droit?: number }
  | { cercle: [number, number, number] };
const TEINTE: Record<Fond, string> = { bleu: BLEU, orange: ORANGE, vert: VERT };
const D_ML = 70;
const D_AW = 160;
const D_AH = 130;

const dessin = (formes: Forme[]) => {
  const geo: Pt[] = formes.flatMap((f) => ("pts" in f ? f.pts : [[f.cercle[0] - f.cercle[2], f.cercle[1] - f.cercle[2]] as Pt, [f.cercle[0] + f.cercle[2], f.cercle[1] + f.cercle[2]] as Pt]));
  const xs = geo.map((p) => p[0]);
  const ys = geo.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(D_AW / (x1 - x0 || 1), D_AH / (y1 - y0 || 1));
  const MT = formes.some((f) => "pts" in f && f.nom) ? 32 : 16;
  const H = MT + (y1 - y0) * s + 30;
  const dx = D_ML + (D_AW - (x1 - x0) * s) / 2;
  const P = ([x, y]: Pt): Pt => [dx + (x - x0) * s, MT + (y1 - y) * s];

  const traces: ReactNode[] = [];
  const textes: ReactNode[] = [];
  formes.forEach((f, k) => {
    if (!("pts" in f)) {
      const [cx, cy] = P([f.cercle[0], f.cercle[1]]);
      traces.push(<circle key={`c${k}`} cx={cx} cy={cy} r={f.cercle[2] * s} fill="none" stroke={BLEU} strokeWidth={2} />);
      return;
    }
    const couleur = f.tirets ? GRIS : TEINTE[f.fond ?? "bleu"];
    const px = f.pts.map(P);
    const ferme = f.pts.length > 2;
    traces.push(
      ferme ? (
        <polygon key={`p${k}`} points={px.map((p) => p.join(",")).join(" ")} fill={f.tirets ? "none" : couleur} fillOpacity={0.16} stroke={couleur} strokeWidth={f.tirets ? 2 : 2.5} strokeDasharray={f.tirets ? "6 4" : undefined} />
      ) : (
        <line key={`p${k}`} x1={px[0][0]} y1={px[0][1]} x2={px[1][0]} y2={px[1][1]} stroke={couleur} strokeWidth={2} />
      ),
    );
    if (f.grille) {
      const [nx, ny] = f.grille;
      const [gx0, gx1] = [Math.min(...px.map((p) => p[0])), Math.max(...px.map((p) => p[0]))];
      const [gy0, gy1] = [Math.min(...px.map((p) => p[1])), Math.max(...px.map((p) => p[1]))];
      for (let i = 1; i < nx; i++) traces.push(<line key={`gx${k}-${i}`} x1={gx0 + ((gx1 - gx0) * i) / nx} y1={gy0} x2={gx0 + ((gx1 - gx0) * i) / nx} y2={gy1} stroke={couleur} strokeWidth={1} strokeOpacity={0.7} />);
      for (let j = 1; j < ny; j++) traces.push(<line key={`gy${k}-${j}`} x1={gx0} y1={gy0 + ((gy1 - gy0) * j) / ny} x2={gx1} y2={gy0 + ((gy1 - gy0) * j) / ny} stroke={couleur} strokeWidth={1} strokeOpacity={0.7} />);
    }
    if (f.droit !== undefined) {
      const n = px.length;
      const S = px[f.droit];
      const [A, B] = [px[(f.droit + n - 1) % n], px[(f.droit + 1) % n]];
      const u = (Q: Pt): Pt => {
        const L = Math.hypot(Q[0] - S[0], Q[1] - S[1]);
        return [((Q[0] - S[0]) / L) * 9, ((Q[1] - S[1]) / L) * 9];
      };
      const [a, b] = [u(A), u(B)];
      traces.push(<polyline key={`d${k}`} points={`${S[0] + a[0]},${S[1] + a[1]} ${S[0] + a[0] + b[0]},${S[1] + a[1] + b[1]} ${S[0] + b[0]},${S[1] + b[1]}`} fill="none" stroke={couleur} strokeWidth={1.5} />);
    }
    const cx = px.reduce((t, p) => t + p[0], 0) / px.length;
    const cy = px.reduce((t, p) => t + p[1], 0) / px.length;
    (f.cotes ?? []).forEach((t, i) => {
      if (!t) return;
      const [A, B] = [px[i], px[(i + 1) % px.length]];
      const M: Pt = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      const L = Math.hypot(B[0] - A[0], B[1] - A[1]);
      let nrm: Pt = [(B[1] - A[1]) / L, -(B[0] - A[0]) / L];
      if ((M[0] - cx) * nrm[0] + (M[1] - cy) * nrm[1] < 0) nrm = [-nrm[0], -nrm[1]];
      const ancre = nrm[0] > 0.35 ? "start" : nrm[0] < -0.35 ? "end" : "middle";
      const x = M[0] + nrm[0] * 8;
      const y = M[1] + nrm[1] * 8 + 5 + (ancre === "middle" ? nrm[1] * 8 : 0);
      textes.push(<text key={`t${k}-${i}`} x={x} y={y} textAnchor={ancre} fontSize={15} fontWeight={700} fill={ENCRE}>{t}</text>);
    });
    if (f.nom) {
      const [gx0, gx1] = [Math.min(...px.map((p) => p[0])), Math.max(...px.map((p) => p[0]))];
      const haut = Math.min(...px.map((p) => p[1]));
      textes.push(<text key={`n${k}`} x={(gx0 + gx1) / 2} y={haut - 9} textAnchor="middle" fontSize={15} fontWeight={800} fill={couleur}>{f.nom}</text>);
    }
  });
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 300 ${Math.round(H)}`} className="block h-auto w-full" role="img" aria-label="Figures dessinées à l'échelle">
        {traces}
        {textes}
      </svg>
    </div>
  );
};

/* ── Des pavés, à la même échelle, en perspective cavalière ───────────────────
 * `dims: [longueur, profondeur, hauteur]`, `cotes` dans le même ordre ; la
 * profondeur fuit à 45°, réduite à 0,35. `grille: k` découpe les trois faces
 * vues en k × k : le grand pavé est fait de k³ petits. */
const PC = 0.35;
const P_ML = 56;
const P_GAP = 84;
type Pave = { dims: [number, number, number]; cotes?: [string, string, string]; nom?: string; grille?: number };
const paves = (liste: Pave[]) => {
  const w = liste.map((p) => p.dims[0] + p.dims[1] * PC);
  const ht = liste.map((p) => p.dims[2] + p.dims[1] * PC);
  const s = Math.min((300 - P_ML - 52 - P_GAP * (liste.length - 1)) / w.reduce((a, b) => a + b, 0), 140 / Math.max(...ht));
  const MT = liste.some((p) => p.nom) ? 32 : 14;
  const base = MT + Math.max(...ht) * s;
  const H = base + 30;
  let x = P_ML;
  const dessins = liste.map((p, k) => {
    const [l, pr, h] = p.dims.map((d) => d * s);
    const e = pr * PC;
    const X = x;
    x += w[k] * s + P_GAP;
    const couleur = k === 0 ? BLEU : ORANGE;
    const g = p.grille ?? 1;
    const lignes: ReactNode[] = [];
    for (let i = 1; i < g; i++) {
      const t = i / g;
      // face avant
      lignes.push(<line key={`a${i}`} x1={X + l * t} y1={base} x2={X + l * t} y2={base - h} />, <line key={`b${i}`} x1={X} y1={base - h * t} x2={X + l} y2={base - h * t} />);
      // dessus
      lignes.push(<line key={`c${i}`} x1={X + l * t} y1={base - h} x2={X + l * t + e} y2={base - h - e} />, <line key={`d${i}`} x1={X + e * t} y1={base - h - e * t} x2={X + l + e * t} y2={base - h - e * t} />);
      // côté
      lignes.push(<line key={`e${i}`} x1={X + l + e * t} y1={base - e * t} x2={X + l + e * t} y2={base - h - e * t} />, <line key={`f${i}`} x1={X + l} y1={base - h * t} x2={X + l + e} y2={base - h * t - e} />);
    }
    const [cl, cp, ch] = p.cotes ?? ["", "", ""];
    return (
      <g key={k}>
        <polygon points={`${X},${base} ${X + l},${base} ${X + l},${base - h} ${X},${base - h}`} fill={couleur} fillOpacity={0.22} stroke={couleur} strokeWidth={2} />
        <polygon points={`${X},${base - h} ${X + l},${base - h} ${X + l + e},${base - h - e} ${X + e},${base - h - e}`} fill={couleur} fillOpacity={0.1} stroke={couleur} strokeWidth={2} />
        <polygon points={`${X + l},${base} ${X + l + e},${base - e} ${X + l + e},${base - h - e} ${X + l},${base - h}`} fill={couleur} fillOpacity={0.34} stroke={couleur} strokeWidth={2} />
        <g stroke={couleur} strokeWidth={1} strokeOpacity={0.8}>{lignes}</g>
        {cl && <text x={X + l / 2} y={base + 21} textAnchor="middle" fontSize={15} fontWeight={700} fill={ENCRE}>{cl}</text>}
        {ch && <text x={X - 8} y={base - h / 2 + 5} textAnchor="end" fontSize={15} fontWeight={700} fill={ENCRE}>{ch}</text>}
        {cp && <text x={X + l + e / 2 + 8} y={base - e / 2 + 14} textAnchor="start" fontSize={15} fontWeight={700} fill={ENCRE}>{cp}</text>}
        {p.nom && <text x={X + (w[k] * s) / 2} y={base - h - e - 10} textAnchor="middle" fontSize={15} fontWeight={800} fill={couleur}>{p.nom}</text>}
      </g>
    );
  });
  return (
    <div className={CADRE}>
      <svg viewBox={`0 0 300 ${Math.round(H)}`} className="block h-auto w-full" role="img" aria-label="Pavés dessinés à la même échelle">
        {dessins}
      </svg>
    </div>
  );
};

/* ── Le tableau carte → réalité ────────────────────────────────────────────────
 * Du HTML : il suit la largeur de sa case et ne rogne jamais. ⛔ Pas de
 * formule dans les cases (elles ne passent pas par KaTeX). */
// ⚠️ UNE COLONNE PAR GRANDEUR, une ligne par distance : dans l'autre sens, les
// « 1 350 000 » côte à côte demandaient ~270 px, plus que les 235 d'un
// téléphone. La dernière colonne (la réponse) est en rouge.
const tableauEch = (entetes: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:overflow-visible">
    <table className="mx-auto border-collapse text-sm">
      <thead>
        <tr>
          {entetes.map((e) => (
            <th key={e} className="border border-slate-400 bg-slate-100 px-2 py-1 text-center font-semibold text-slate-800">{e}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i}>
            {l.map((c, j) => (
              <td key={j} className={`whitespace-nowrap border border-slate-400 px-2 py-1 text-center ${j === l.length - 1 ? "font-bold text-red-700" : "text-slate-900"}`}>
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const exercicesEchelles4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "prop-echelle",
  titre: "Échelles, agrandissements et réductions",
  accroche:
    "Vingt exercices, du geste seul au problème : lire une échelle, passer de la carte au terrain et du terrain au plan, trouver un rapport, puis comprendre pourquoi doubler les longueurs quadruple l'aire et multiplie le volume par huit. Un terrain de basket, un marathon au bout d'une ficelle, un bassin olympique, des grêlons, la forêt amazonienne. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et un dessin à l'échelle.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/prop-echelle", titre: "Agrandissement, réduction et échelles" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je me demande d'abord si je vais vers le plus grand ou vers le plus petit, puis je calcule avec les unités.",
      rappel: [
        "Une échelle $\\dfrac{1}{d}$ : $1$ cm sur le plan représente $d$ cm en vrai. Les deux nombres sont dans la MÊME unité.",
        "Du plan vers la réalité, je MULTIPLIE par $d$. De la réalité vers le plan, je DIVISE par $d$, après avoir converti.",
        "Un agrandissement ou une réduction de rapport $k$ multiplie toutes les longueurs par $k$ et ne change aucun angle. Les aires sont multipliées par $k^2$, les volumes par $k^3$.",
        "Conversions : $1$ m $= 100$ cm et $1$ km $= 100\\,000$ cm.",
      ],
      exercices: [
        {
          enonce:
            "Une carte de randonnée est à l'échelle $\\dfrac{1}{20\\,000}$.\na) Que représente $1$ cm sur cette carte, en centimètres, puis en mètres ?\nb) Que représentent $5$ cm sur cette carte ?\nc) Cette carte est-elle une réduction ou un agrandissement de la réalité ?",
          correction:
            "a) L'échelle $\\dfrac{1}{20\\,000}$ se lit : $1$ cm sur la carte pour $20\\,000$ cm en vrai, dans la même unité.\nJe convertis : $1$ m $= 100$ cm, donc $20\\,000$ cm $= 20\\,000 \\div 100 = 200$ m.\nb) Je vais vers la réalité, donc je multiplie : $5 \\times 200 = 1\\,000$ m, soit $1$ km.\nc) La réalité est $20\\,000$ fois plus grande que la carte : c'est une réduction, de rapport $\\dfrac{1}{20\\,000}$, un nombre plus petit que $1$.\n⛔ Le piège : lire « $1$ cm pour $20\\,000$ m ». Les deux nombres de l'échelle sont dans la MÊME unité : $20\\,000$ m feraient $20$ km pour un seul centimètre.\nRéponse : $1$ cm représente $20\\,000$ cm, soit $200$ m ; $5$ cm représentent $1$ km ; c'est une réduction.",
          schema: regle({ n: 5, par: 200, unite: "m", pas: 1, marque: 5 }),
          micros: ["echelle_comprendre", "echelle_distance_reelle"],
        },
        {
          enonce:
            "Un lac mesure $1$ km de long. On le cherche sur trois cartes : au $\\dfrac{1}{10\\,000}$, au $\\dfrac{1}{40\\,000}$ et au $\\dfrac{1}{200\\,000}$.\na) Quelle longueur, en cm, le lac a-t-il sur chaque carte ?\nb) Sur quelle carte paraît-il le plus grand ? Laquelle montre le plus de détails ?",
          correction:
            "a) Je convertis d'abord : $1$ km $= 100\\,000$ cm. Puis je vais vers la carte, donc je divise.\nAu $\\dfrac{1}{10\\,000}$ : $100\\,000 \\div 10\\,000 = 10$ cm.\nAu $\\dfrac{1}{40\\,000}$ : $100\\,000 \\div 40\\,000 = 2{,}5$ cm.\nAu $\\dfrac{1}{200\\,000}$ : $100\\,000 \\div 200\\,000 = 0{,}5$ cm.\nb) Le lac paraît le plus grand au $\\dfrac{1}{10\\,000}$ : la carte au PLUS PETIT dénominateur est celle qui montre le plus de détails.\n⛔ Le piège : croire qu'un grand nombre fait une grande carte. Plus le dénominateur est grand, plus la réalité a été réduite : au $\\dfrac{1}{200\\,000}$, le lac ne fait qu'un demi-centimètre.\nRéponse : $10$ cm, $2{,}5$ cm et $0{,}5$ cm ; la carte au $\\dfrac{1}{10\\,000}$ est la plus détaillée.",
          schema: barres([{ label: "au 1/10 000 : 10 cm", cm: 10 }, { label: "au 1/40 000 : 2,5 cm", cm: 2.5 }, { label: "au 1/200 000 : 0,5 cm", cm: 0.5 }]),
          micros: ["echelle_comprendre", "echelle_distance_plan"],
        },
        {
          enonce: "Sur un plan de ville à l'échelle $\\dfrac{1}{5\\,000}$, la gare et le stade sont à $7{,}4$ cm l'un de l'autre. Quelle est la distance réelle, en mètres ?",
          correction:
            "Je vais du plan vers la réalité : la réalité est plus grande, donc je multiplie par $5\\,000$.\n$7{,}4 \\times 5\\,000 = 37\\,000$ cm.\nJe convertis : $37\\,000 \\div 100 = 370$ m.\n⭐ Contrôle : au $\\dfrac{1}{5\\,000}$, $1$ cm vaut $50$ m ; $7{,}4$ cm valent donc un peu moins de $8 \\times 50 = 400$ m.\n⛔ Le piège : oublier la conversion et répondre « $37\\,000$ m », soit $37$ km entre la gare et le stade d'une même ville.\nRéponse : la gare et le stade sont à $370$ m l'un de l'autre.",
          schema: regle({ n: 8, par: 50, unite: "m", pas: 2, marque: 7.4 }),
          micros: ["echelle_distance_reelle"],
        },
        {
          enonce: "Un terrain de rugby mesure $100$ m entre ses deux lignes d'essai. On le dessine sur un plan à l'échelle $\\dfrac{1}{2\\,000}$. Quelle est sa longueur sur le plan, en cm ?",
          correction:
            "Je vais de la réalité vers le plan : le plan est plus petit, donc je divise par $2\\,000$.\nMais d'abord je convertis, pour avoir les deux longueurs dans la même unité : $100$ m $= 100 \\times 100 = 10\\,000$ cm.\n$10\\,000 \\div 2\\,000 = 5$ cm.\n⛔ Le piège : diviser les mètres directement, $100 \\div 2\\,000 = 0{,}05$, et écrire « $0{,}05$ cm ». Ce $0{,}05$ est en MÈTRES : $0{,}05$ m, ce sont bien $5$ cm. Je convertis AVANT de diviser.\nRéponse : le terrain mesure $5$ cm sur le plan.",
          schema: regle({ n: 5, par: 20, unite: "m", pas: 1, marque: 5 }),
          micros: ["echelle_distance_plan"],
        },
        {
          enonce: "Un rectangle mesure $3$ cm sur $2$ cm. On l'agrandit : dans le nouveau rectangle, la longueur mesure $7{,}5$ cm.\na) Quel est le rapport d'agrandissement ?\nb) Quelle est la largeur du nouveau rectangle ?",
          correction:
            "a) Je trouve le rapport en DIVISANT une longueur de l'agrandissement par la longueur qui lui correspond : $k = 7{,}5 \\div 3 = 2{,}5$.\nb) Toutes les longueurs sont multipliées par le même rapport : largeur $= 2 \\times 2{,}5 = 5$ cm.\n⭐ Contrôle : $\\dfrac{7{,}5}{3} = \\dfrac{5}{2} = 2{,}5$ ; les deux côtés ont bien le même rapport, la forme est conservée.\n⛔ Le piège : ajouter. La longueur a gagné $4{,}5$ cm, mais la largeur ne gagne pas $4{,}5$ cm : $2 + 4{,}5 = 6{,}5$ cm donnerait un rectangle d'une autre forme, presque carré.\nRéponse : $k = 2{,}5$ et la largeur mesure $5$ cm.",
          schema: dessin([{ pts: [[0, 0], [3, 0], [3, 2], [0, 2]], cotes: ["3 cm", "", "", "2 cm"], nom: "modèle" }, { pts: [[5, 0], [12.5, 0], [12.5, 5], [5, 5]], cotes: ["7,5 cm", "5 cm"], nom: "× 2,5", fond: "orange" }]),
          micros: ["agrandissement_rapport"],
        },
        {
          enonce: "Un triangle rectangle a des côtés de $12$ cm, $16$ cm et $20$ cm. On le réduit avec le rapport $\\dfrac{3}{4}$.\na) Calculer les longueurs des côtés du triangle réduit.\nb) Le triangle réduit est-il encore rectangle ? Pourquoi ?",
          correction:
            "a) Réduire avec le rapport $\\dfrac{3}{4}$, c'est multiplier chaque longueur par $\\dfrac{3}{4} = 0{,}75$.\n$12 \\times 0{,}75 = 9$ cm ; $16 \\times 0{,}75 = 12$ cm ; $20 \\times 0{,}75 = 15$ cm.\nb) Oui : une réduction change les longueurs, mais JAMAIS les angles. L'angle droit reste droit.\n⭐ Contrôle avec Pythagore : $9^2 + 12^2 = 81 + 144 = 225 = 15^2$.\n⛔ Le piège : enlever $3$ ou $4$ cm à chaque côté. Un rapport se MULTIPLIE : on n'enlève pas la même longueur partout, on garde les mêmes proportions.\nRéponse : $9$ cm, $12$ cm et $15$ cm ; le triangle réduit est rectangle, comme le modèle.",
          schema: dessin([{ pts: [[0, 0], [16, 0], [0, 12]], cotes: ["16 cm", "20 cm", "12 cm"], nom: "modèle", droit: 0 }, { pts: [[34, 0], [46, 0], [34, 9]], cotes: ["12 cm", "15 cm", "9 cm"], nom: "× 3/4", fond: "orange", droit: 0 }]),
          micros: ["agrandissement_rapport"],
        },
        {
          enonce: "Un rectangle de $4$ cm sur $1$ cm est agrandi avec le rapport $3$.\na) Quelles sont les dimensions du rectangle agrandi ?\nb) Calculer l'aire de chacun des deux rectangles.\nc) Par combien l'aire a-t-elle été multipliée ?",
          correction:
            "a) Je multiplie chaque longueur par $3$ : $4 \\times 3 = 12$ cm et $1 \\times 3 = 3$ cm.\nb) Petit rectangle : $4 \\times 1 = 4$ cm². Grand rectangle : $12 \\times 3 = 36$ cm².\nc) $36 \\div 4 = 9$ : l'aire a été multipliée par $9$, c'est-à-dire par $3 \\times 3 = 3^2$.\n⭐ Le dessin le montre sans calcul : le petit rectangle tient $3$ fois dans la longueur ET $3$ fois dans la largeur, soit $9$ fois en tout.\n⛔ Le piège : multiplier l'aire par $3$ et répondre $12$ cm². La longueur ET la largeur sont multipliées par $3$ : l'aire l'est donc deux fois.\nRéponse : $12$ cm sur $3$ cm ; $4$ cm² et $36$ cm² ; l'aire est multipliée par $9$.",
          schema: dessin([{ pts: [[0, 0], [4, 0], [4, 1], [0, 1]], cotes: ["4 cm", "", "", "1 cm"], nom: "modèle" }, { pts: [[6, 0], [18, 0], [18, 3], [6, 3]], cotes: ["12 cm", "3 cm"], nom: "rapport 3", fond: "orange", grille: [3, 3] }]),
          micros: ["agrandissement_aire"],
        },
        {
          enonce: "Une boîte en forme de pavé droit mesure $2$ cm de long, $1$ cm de large et $1$ cm de haut. On l'agrandit avec le rapport $3$.\na) Quelles sont les dimensions de la grande boîte ?\nb) Calculer les deux volumes.\nc) Par combien le volume a-t-il été multiplié ?",
          correction:
            "a) Je multiplie chaque longueur par $3$ : $2 \\times 3 = 6$ cm, $1 \\times 3 = 3$ cm et $1 \\times 3 = 3$ cm.\nb) Petite boîte : $2 \\times 1 \\times 1 = 2$ cm³. Grande boîte : $6 \\times 3 \\times 3 = 54$ cm³.\nc) $54 \\div 2 = 27$ : le volume est multiplié par $27 = 3 \\times 3 \\times 3 = 3^3$.\n⭐ Pourquoi : un volume est le produit de TROIS longueurs, et chacune a été multipliée par $3$. Le dessin le montre : la grande boîte est faite de $27$ petites.\n⛔ Le piège : répondre « trois fois plus grand, donc $3 \\times 2 = 6$ cm³ ». Le rapport $3$ porte sur les longueurs, pas sur le volume.\nRéponse : $6$ cm, $3$ cm et $3$ cm ; $2$ cm³ et $54$ cm³ ; le volume est multiplié par $27$.",
          schema: paves([{ dims: [2, 1, 1], cotes: ["2 cm", "1 cm", "1 cm"], nom: "modèle" }, { dims: [6, 3, 3], cotes: ["6 cm", "3 cm", "3 cm"], nom: "rapport 3", grille: 3 }]),
          micros: ["agrandissement_volume"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. Je convertis, je nomme la grandeur, puis je justifie chaque calcul.",
      rappel: [
        "Retrouver une échelle : je mets les deux longueurs dans la MÊME unité, puis je divise la longueur réelle par celle du plan. Le quotient est le dénominateur $d$.",
        "Retrouver un rapport $k$ : je DIVISE une longueur de la nouvelle figure par la longueur correspondante de l'ancienne. Jamais de soustraction.",
        "Je nomme la grandeur avant de calculer : une longueur se multiplie par $k$, une aire (gazon, peinture, tissu) par $k^2$, un volume (eau, contenance) par $k^3$.",
        "Si l'aire est multipliée par $9$, les longueurs l'ont été par $3$, car $3 \\times 3 = 9$.",
      ],
      exercices: [
        {
          enonce:
            "Sur une carte à l'échelle $\\dfrac{1}{100\\,000}$, un itinéraire à vélo mesure $13{,}5$ cm.\na) Quelle est sa longueur réelle, en cm puis en km ?\nb) Un autre itinéraire fait $21$ km. Quelle longueur a-t-il sur la carte ?\nc) Compléter : sur cette carte, $1$ cm représente…",
          correction:
            "a) Je vais vers la réalité : je multiplie. $13{,}5 \\times 100\\,000 = 1\\,350\\,000$ cm.\nJe convertis : $1$ km $= 100\\,000$ cm, donc $1\\,350\\,000 \\div 100\\,000 = 13{,}5$ km.\nb) Je vais vers la carte : je convertis, puis je divise. $21$ km $= 2\\,100\\,000$ cm, et $2\\,100\\,000 \\div 100\\,000 = 21$ cm.\nc) $1$ cm représente $100\\,000$ cm, c'est-à-dire exactement $1$ km. Sur cette carte, les centimètres se lisent directement en kilomètres.\n⛔ Le piège : diviser par $1\\,000$ pour passer des cm aux km. $1\\,350\\,000 \\div 1\\,000 = 1\\,350$ : une balade à vélo de $1\\,350$ km ! Des cm aux km, il y a DEUX conversions : $\\div 100$ vers les mètres, puis $\\div 1\\,000$.\nRéponse : $13{,}5$ km ; $21$ cm ; $1$ cm représente $1$ km.",
          schema: tableauEch(["carte (cm)", "réel (cm)", "réel (km)"], [
            ["1", "100 000", "1"],
            ["13,5", "1 350 000", "13,5"],
            ["21", "2 100 000", "21"],
          ]),
          micros: ["echelle_distance_reelle", "echelle_distance_plan", "echelle_comprendre"],
        },
        {
          enonce:
            "Un architecte doit dessiner le plan d'une maison rectangulaire de $15$ m sur $9{,}6$ m, sur une feuille A4 de $29{,}7$ cm sur $21$ cm. Il hésite entre les échelles $\\dfrac{1}{50}$ et $\\dfrac{1}{100}$.\na) Calculer les dimensions de la maison sur le plan, pour chaque échelle.\nb) Quelle échelle doit-il choisir ?\nc) Laquelle donnerait le plan le plus détaillé, si la feuille était assez grande ?",
          correction:
            "a) Je convertis d'abord : $15$ m $= 1\\,500$ cm et $9{,}6$ m $= 960$ cm. Vers le plan, je divise.\nAu $\\dfrac{1}{50}$ : $1\\,500 \\div 50 = 30$ cm et $960 \\div 50 = 19{,}2$ cm.\nAu $\\dfrac{1}{100}$ : $1\\,500 \\div 100 = 15$ cm et $960 \\div 100 = 9{,}6$ cm.\nb) Au $\\dfrac{1}{50}$, la maison fait $30$ cm de long : plus que les $29{,}7$ cm de la feuille. Il doit choisir le $\\dfrac{1}{100}$ : $15$ cm sur $9{,}6$ cm tiennent largement.\nc) Le $\\dfrac{1}{50}$ : le plus petit dénominateur donne le plus grand dessin, donc le plus de détails.\n⛔ Le piège : garder le $\\dfrac{1}{50}$ parce que « $30$ cm, c'est presque $29{,}7$ cm ». Un plan qui dépasse de $3$ mm est coupé, et il faut encore des marges.\nRéponse : $30$ cm sur $19{,}2$ cm au $\\dfrac{1}{50}$, $15$ cm sur $9{,}6$ cm au $\\dfrac{1}{100}$ ; il choisit le $\\dfrac{1}{100}$.",
          schema: deux(
            dessin([{ pts: [[0, 0], [29.7, 0], [29.7, 21], [0, 21]], nom: "au 1/50 : trop long", tirets: true }, { pts: [[0, 0], [30, 0], [30, 19.2], [0, 19.2]], cotes: ["30 cm", "19,2 cm"], fond: "orange" }]),
            dessin([{ pts: [[0, 0], [29.7, 0], [29.7, 21], [0, 21]], nom: "au 1/100 : ça tient", tirets: true }, { pts: [[0, 0], [15, 0], [15, 9.6], [0, 9.6]], cotes: ["15 cm", "9,6 cm"], fond: "vert" }]),
          ),
          micros: ["echelle_distance_plan", "echelle_comprendre"],
        },
        {
          enonce:
            "Une photo mesure $10$ cm sur $15$ cm. On veut l'agrandir en poster, sans la déformer : la largeur du poster doit être de $40$ cm.\na) Quel est le rapport d'agrandissement ?\nb) Quelle sera la longueur du poster ?\nc) Léo propose d'ajouter $30$ cm à chaque côté. Quelles dimensions obtient-il ? Pourquoi sa photo sera-t-elle déformée ?",
          correction:
            "a) Je divise la nouvelle largeur par l'ancienne : $k = 40 \\div 10 = 4$.\nb) Toutes les longueurs sont multipliées par $4$ : $15 \\times 4 = 60$ cm.\nc) Léo obtient $10 + 30 = 40$ cm sur $15 + 30 = 45$ cm. Mais $45 \\div 15 = 3$, alors que $40 \\div 10 = 4$ : les deux côtés n'ont pas été multipliés par le même nombre. La photo est étirée en largeur, les visages sont élargis.\n⭐ Le signe : chez Léo, le poster est presque carré ($40$ sur $45$), alors que la photo est nettement plus longue que large.\n⛔ Le piège : ajouter la même longueur partout. Un agrandissement MULTIPLIE toutes les longueurs par le même nombre ; ajouter garde les écarts, pas la forme.\nRéponse : $k = 4$ ; le poster mesure $40$ cm sur $60$ cm ; Léo obtiendrait $40$ cm sur $45$ cm, une image déformée.",
          schema: deux(
            dessin([{ pts: [[0, 0], [10, 0], [10, 15], [0, 15]], cotes: ["10 cm", "", "", "15 cm"], nom: "photo" }, { pts: [[16, 0], [56, 0], [56, 60], [16, 60]], cotes: ["40 cm", "60 cm"], nom: "poster × 4", fond: "vert" }]),
            dessin([{ pts: [[0, 0], [10, 0], [10, 15], [0, 15]], cotes: ["10 cm", "", "", "15 cm"], nom: "photo" }, { pts: [[16, 0], [56, 0], [56, 45], [16, 45]], cotes: ["40 cm", "45 cm"], nom: "Léo : + 30 cm", fond: "orange" }]),
          ),
          micros: ["agrandissement_rapport"],
        },
        {
          enonce:
            "Un terrain de basket mesure $28$ m sur $15$ m. Sur un plan, sa longueur est de $11{,}2$ cm.\na) À quelle échelle le plan est-il dessiné ?\nb) Quelle est la largeur du terrain sur le plan ?\nc) Le cercle central a un rayon de $1{,}8$ m. Quel est son rayon sur le plan, en mm ?",
          correction:
            "a) Je mets les deux longueurs dans la même unité : $28$ m $= 2\\,800$ cm. Puis je divise la réalité par le plan : $2\\,800 \\div 11{,}2 = 250$. L'échelle est $\\dfrac{1}{250}$.\nb) Vers le plan, je divise : $15$ m $= 1\\,500$ cm, et $1\\,500 \\div 250 = 6$ cm.\nc) $1{,}8$ m $= 180$ cm, et $180 \\div 250 = 0{,}72$ cm, soit $7{,}2$ mm.\n⭐ Contrôle : $11{,}2 \\div 6 \\approx 1{,}87$ et $28 \\div 15 \\approx 1{,}87$. Le plan a bien la forme du terrain.\n⛔ Le piège : diviser $28$ par $11{,}2$ et annoncer une échelle $\\dfrac{1}{2{,}5}$. Des mètres et des centimètres ne se divisent pas entre eux : je convertis d'abord.\nRéponse : l'échelle est $\\dfrac{1}{250}$ ; la largeur mesure $6$ cm ; le rayon mesure $7{,}2$ mm.",
          schema: dessin([{ pts: [[0, 0], [11.2, 0], [11.2, 6], [0, 6]], cotes: ["11,2 cm", "", "", "6 cm"], nom: "le plan au 1/250" }, { pts: [[5.6, 0], [5.6, 6]] }, { cercle: [5.6, 3, 0.72] }]),
          micros: ["echelle_comprendre", "echelle_distance_plan"],
        },
        {
          enonce:
            "Au bas d'une carte, l'échelle est dessinée : un segment de $3$ cm porte l'indication « $2{,}4$ km ».\na) Que représente $1$ cm sur cette carte ?\nb) Écrire l'échelle de la carte sous la forme $\\dfrac{1}{d}$.\nc) Sur la carte, deux refuges sont à $8{,}5$ cm l'un de l'autre. Quelle distance les sépare, en km ?",
          correction:
            "a) $3$ cm pour $2{,}4$ km : je ramène à $1$ cm en divisant par $3$. $2{,}4 \\div 3 = 0{,}8$ km, soit $800$ m.\nb) Je convertis dans la même unité : $0{,}8$ km $= 80\\,000$ cm. Donc $1$ cm représente $80\\,000$ cm : l'échelle est $\\dfrac{1}{80\\,000}$.\nc) Je vais vers la réalité : $8{,}5 \\times 0{,}8 = 6{,}8$ km.\n⭐ Autre chemin : $8{,}5 \\times 80\\,000 = 680\\,000$ cm $= 6{,}8$ km.\n⛔ Le piège : écrire l'échelle « $\\dfrac{3}{2{,}4}$ ». Une échelle compare deux longueurs dans la MÊME unité, avec $1$ en haut.\nRéponse : $1$ cm représente $800$ m ; l'échelle est $\\dfrac{1}{80\\,000}$ ; les refuges sont à $6{,}8$ km.",
          schema: regle({ n: 9, par: 0.8, unite: "km", pas: 3, marque: 8.5 }),
          micros: ["echelle_comprendre", "echelle_distance_reelle"],
        },
        {
          enonce:
            "Un logo carré est imprimé sur un tee-shirt : son aire est de $36$ cm². Sur une casquette, on imprime une réduction du même logo, d'aire $4$ cm².\na) Par combien l'aire a-t-elle été divisée ?\nb) Par combien les longueurs ont-elles été divisées ? Quel est le rapport de réduction ?\nc) Quelle est la longueur du côté de chaque logo ?",
          correction:
            "a) $36 \\div 4 = 9$ : l'aire a été divisée par $9$.\nb) Les aires se multiplient par $k^2$ : je cherche le nombre qui, multiplié par lui-même, donne $9$. C'est $3$, car $3 \\times 3 = 9$. Les longueurs ont été divisées par $3$ : le rapport de réduction est $k = \\dfrac{1}{3}$.\nc) Grand logo : $6 \\times 6 = 36$, son côté mesure $6$ cm. Petit logo : $2 \\times 2 = 4$, son côté mesure $2$ cm. Et $6 \\div 3 = 2$ : c'est cohérent.\n⛔ Le piège : dire « l'aire est divisée par $9$, donc le rapport est $\\dfrac{1}{9}$ ». Le côté mesurerait $6 \\div 9 \\approx 0{,}67$ cm, et l'aire $0{,}67 \\times 0{,}67 \\approx 0{,}45$ cm², pas $4$.\nRéponse : l'aire est divisée par $9$, les longueurs par $3$ ; $k = \\dfrac{1}{3}$ ; les côtés mesurent $6$ cm et $2$ cm.",
          schema: dessin([{ pts: [[0, 0], [6, 0], [6, 6], [0, 6]], cotes: ["6 cm", "", "", "6 cm"], nom: "36 cm²", grille: [3, 3] }, { pts: [[8, 0], [10, 0], [10, 2], [8, 2]], cotes: ["2 cm", "2 cm"], nom: "4 cm²", fond: "orange" }]),
          micros: ["agrandissement_aire", "agrandissement_rapport"],
        },
        {
          enonce:
            "Une pelouse rectangulaire mesure $8$ m sur $5$ m. Pour la semer, on compte $30$ g de graines par m². On l'agrandit en multipliant ses deux dimensions par $1{,}5$.\na) Quelles sont les nouvelles dimensions ?\nb) Calculer l'aire de l'ancienne et de la nouvelle pelouse. Par combien l'aire a-t-elle été multipliée ?\nc) Quelle masse de graines faut-il pour la nouvelle pelouse ?",
          correction:
            "a) $8 \\times 1{,}5 = 12$ m et $5 \\times 1{,}5 = 7{,}5$ m.\nb) Ancienne : $8 \\times 5 = 40$ m². Nouvelle : $12 \\times 7{,}5 = 90$ m². $90 \\div 40 = 2{,}25$ : l'aire est multipliée par $2{,}25$, c'est $1{,}5 \\times 1{,}5 = 1{,}5^2$.\nc) Les graines se comptent à l'AIRE : $90 \\times 30 = 2\\,700$ g, soit $2{,}7$ kg.\n⭐ Autre chemin : l'ancienne pelouse demandait $40 \\times 30 = 1\\,200$ g ; avec le facteur $k^2$, $1\\,200 \\times 2{,}25 = 2\\,700$ g.\n⛔ Le piège : multiplier les graines par $1{,}5$, comme les longueurs : $1\\,200 \\times 1{,}5 = 1\\,800$ g. Il manquerait $900$ g de graines : un tiers de la pelouse resterait nu.\nRéponse : $12$ m sur $7{,}5$ m ; $40$ m² puis $90$ m², soit $2{,}25$ fois plus ; il faut $2{,}7$ kg de graines.",
          schema: dessin([{ pts: [[0, 0], [8, 0], [8, 5], [0, 5]], cotes: ["8 m", "", "", "5 m"], nom: "40 m²" }, { pts: [[11, 0], [23, 0], [23, 7.5], [11, 7.5]], cotes: ["12 m", "7,5 m"], nom: "90 m²", fond: "vert" }]),
          micros: ["agrandissement_aire"],
        },
        {
          enonce:
            "Un aquarium a la forme d'un pavé droit de $40$ cm de long, $25$ cm de large et $30$ cm de haut.\na) Calculer son volume en cm³, puis en litres.\nb) Le magasin vend un modèle agrandi avec le rapport $2$. Quelles sont ses dimensions et son volume, en litres ?\nc) Le vendeur dit : « deux fois plus grand, donc deux fois plus d'eau ». A-t-il raison ?",
          correction:
            "a) $40 \\times 25 \\times 30 = 30\\,000$ cm³. Comme $1$ L $= 1\\,000$ cm³, cela fait $30$ L.\nb) Chaque dimension est multipliée par $2$ : $80$ cm, $50$ cm et $60$ cm. Volume : $80 \\times 50 \\times 60 = 240\\,000$ cm³, soit $240$ L.\nc) Non : $240 \\div 30 = 8$. Le grand aquarium contient $8$ fois plus d'eau, car $2 \\times 2 \\times 2 = 2^3 = 8$.\n⛔ Le piège : croire le vendeur et prévoir $60$ L. Il manquerait $180$ L d'eau ; et $240$ L d'eau pèsent environ $240$ kg, que le meuble doit porter.\nRéponse : $30$ L ; $80$ cm, $50$ cm et $60$ cm pour $240$ L ; le vendeur a tort, il y a $8$ fois plus d'eau.",
          schema: paves([{ dims: [40, 25, 30], cotes: ["40 cm", "25 cm", "30 cm"], nom: "30 L" }, { dims: [80, 50, 60], cotes: ["80 cm", "50 cm", "60 cm"], nom: "240 L", grille: 2 }]),
          micros: ["agrandissement_volume"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je repère ce qui est à l'échelle, je nomme la grandeur, je calcule, puis une phrase de réponse.",
      rappel: [
        "Dans un problème, je repère d'abord ce qui est à l'échelle (une carte, un plan, une maquette) et le rapport qui relie les deux mondes.",
        "Je nomme la grandeur demandée : une longueur ($\\times k$), une surface ($\\times k^2$), une contenance ou la masse d'un même matériau ($\\times k^3$).",
        "Sur une carte au $\\dfrac{1}{d}$, $1$ cm² ne représente pas $d$ cm², mais $d \\times d$ cm² : une aire se lit avec le carré du rapport.",
      ],
      exercices: [
        {
          titre: "Le marathon au bout d'une ficelle",
          enonce:
            "Un marathon mesure $42{,}195$ km. Un club veut reporter le tracé de la course, déplié, sur une ficelle, à l'échelle d'une carte.\na) Convertir $42{,}195$ km en cm.\nb) Quelle longueur de ficelle faut-il pour une carte au $\\dfrac{1}{25\\,000}$ ? au $\\dfrac{1}{50\\,000}$ ? au $\\dfrac{1}{100\\,000}$ ? Arrondir au cm.\nc) La ficelle doit tenir sur une table de $50$ cm. Quelle carte choisir ?\nd) À quelle échelle la ficelle mesurerait-elle exactement $1$ m ?",
          correction:
            "a) $1$ km $= 100\\,000$ cm, donc $42{,}195 \\times 100\\,000 = 4\\,219\\,500$ cm.\nb) Vers la carte, je divise par le dénominateur.\nAu $\\dfrac{1}{25\\,000}$ : $4\\,219\\,500 \\div 25\\,000 = 168{,}78$, environ $169$ cm.\nAu $\\dfrac{1}{50\\,000}$ : $4\\,219\\,500 \\div 50\\,000 = 84{,}39$, environ $84$ cm.\nAu $\\dfrac{1}{100\\,000}$ : $4\\,219\\,500 \\div 100\\,000 = 42{,}195$, environ $42$ cm.\nc) Seule la carte au $\\dfrac{1}{100\\,000}$ donne une ficelle plus courte que $50$ cm. Doubler le dénominateur divise la longueur par deux.\nd) Je veux $100$ cm de ficelle : $4\\,219\\,500 \\div 100 = 42\\,195$. L'échelle serait $\\dfrac{1}{42\\,195}$.\n⛔ Le piège : choisir la carte au plus petit dénominateur « parce qu'elle est plus précise ». Elle l'est, mais son tracé fait $1{,}69$ m : il ne tient pas sur la table.\nRéponse : $4\\,219\\,500$ cm ; environ $169$ cm, $84$ cm et $42$ cm ; il faut la carte au $\\dfrac{1}{100\\,000}$ ; à l'échelle $\\dfrac{1}{42\\,195}$, la ficelle mesurerait $1$ m.",
          schema: barres([{ label: "au 1/25 000 : 169 cm", cm: 168.78 }, { label: "au 1/50 000 : 84 cm", cm: 84.39 }, { label: "au 1/100 000 : 42 cm", cm: 42.195 }], { cm: 50, label: "table : 50 cm" }),
          micros: ["echelle_distance_plan", "echelle_comprendre", "echelle_defi"],
        },
        {
          titre: "Le bassin olympique et le petit bassin",
          enonce:
            "Un bassin olympique mesure $50$ m de long, $25$ m de large et $2$ m de profondeur. Une piscine de quartier a un bassin de $25$ m sur $12{,}5$ m, profond de $1$ m.\na) Montrer que le petit bassin est une réduction du grand. Quel est le rapport $k$ ?\nb) Calculer l'aire de la surface de l'eau de chaque bassin. Retrouver le rapport des aires avec $k$.\nc) Calculer le volume d'eau de chaque bassin. Retrouver le rapport des volumes avec $k$.\nd) Une bâche couvre exactement le petit bassin. Combien de bâches identiques faut-il pour couvrir le grand ?",
          correction:
            "a) Je divise chaque dimension du petit bassin par celle du grand : $25 \\div 50 = 0{,}5$ ; $12{,}5 \\div 25 = 0{,}5$ ; $1 \\div 2 = 0{,}5$. Les trois rapports sont égaux : c'est une réduction de rapport $k = 0{,}5$, c'est-à-dire $\\dfrac{1}{2}$.\nb) Grand : $50 \\times 25 = 1\\,250$ m². Petit : $25 \\times 12{,}5 = 312{,}5$ m². $312{,}5 \\div 1\\,250 = 0{,}25$, et $k^2 = 0{,}5 \\times 0{,}5 = 0{,}25$ : l'aire est divisée par $4$.\nc) Grand : $50 \\times 25 \\times 2 = 2\\,500$ m³. Petit : $25 \\times 12{,}5 \\times 1 = 312{,}5$ m³. $312{,}5 \\div 2\\,500 = 0{,}125$, et $k^3 = 0{,}5 \\times 0{,}5 \\times 0{,}5 = 0{,}125$ : le volume est divisé par $8$.\nd) Une bâche couvre une AIRE : il en faut $4$ pour le grand bassin, comme le montre le dessin.\n⭐ En litres, avec $1$ m³ $= 1\\,000$ L : le grand bassin contient $2\\,500\\,000$ L, le petit $312\\,500$ L.\n⛔ Le piège : croire qu'un bassin « deux fois plus petit » contient deux fois moins d'eau. Deux fois moins long, moins large ET moins profond : huit fois moins d'eau.\nRéponse : $k = 0{,}5$ ; $1\\,250$ m² et $312{,}5$ m², rapport $0{,}25$ ; $2\\,500$ m³ et $312{,}5$ m³, rapport $0{,}125$ ; il faut $4$ bâches.",
          schema: dessin([{ pts: [[0, 0], [50, 0], [50, 25], [0, 25]], cotes: ["50 m", "", "", "25 m"], nom: "bassin olympique", grille: [2, 2] }, { pts: [[56, 0], [81, 0], [81, 12.5], [56, 12.5]], cotes: ["25 m", "12,5 m"], nom: "petit", fond: "orange" }]),
          micros: ["agrandissement_rapport", "agrandissement_aire", "agrandissement_volume", "echelle_defi"],
        },
        {
          titre: "Les grêlons",
          enonce:
            "Un grêlon de $1$ cm de diamètre pèse environ $0{,}5$ g. Lors des orages violents, on ramasse des grêlons de $4$ cm, parfois de $8$ cm. On considère que tous les grêlons ont la même forme et sont faits de la même glace.\na) Un grêlon de $4$ cm est un agrandissement de celui de $1$ cm. Quel est le rapport $k$ ?\nb) Par combien son volume est-il multiplié ? En déduire sa masse.\nc) Même question pour un grêlon de $8$ cm.\nd) Le grêlon de $8$ cm n'est que deux fois plus large que celui de $4$ cm. Combien de fois plus lourd est-il ?",
          correction:
            "a) $k = 4 \\div 1 = 4$ : toutes les longueurs sont multipliées par $4$.\nb) Le volume est multiplié par $k^3 = 4 \\times 4 \\times 4 = 64$. La glace est la même : la masse suit le volume, elle est aussi multipliée par $64$. $0{,}5 \\times 64 = 32$ g.\n⭐ Le dessin range chaque grêlon dans une boîte cubique : la grande boîte contient $4 \\times 4 \\times 4 = 64$ petites.\nc) $k = 8$, et $8^3 = 8 \\times 8 \\times 8 = 512$. Masse : $0{,}5 \\times 512 = 256$ g, plus qu'une plaquette de beurre de $250$ g.\nd) De $4$ cm à $8$ cm, le rapport n'est que $2$, mais la masse est multipliée par $2^3 = 8$ : $32 \\times 8 = 256$ g. Doubler la taille, c'est multiplier la masse par huit.\n⛔ Le piège : penser qu'un grêlon $4$ fois plus large pèse $4$ fois plus, soit $2$ g. Il pèse $32$ g : une masse se compte au VOLUME, avec $k^3$.\nRéponse : $k = 4$ ; volume et masse multipliés par $64$, soit $32$ g ; par $512$ pour $8$ cm, soit $256$ g ; $8$ fois plus lourd.",
          schema: paves([{ dims: [1, 1, 1], cotes: ["1 cm", "", ""], nom: "0,5 g" }, { dims: [4, 4, 4], cotes: ["4 cm", "", ""], nom: "32 g", grille: 4 }]),
          micros: ["agrandissement_volume", "agrandissement_rapport", "echelle_defi"],
        },
        {
          titre: "La forêt qui disparaît",
          enonce:
            "Entre août 2022 et juillet 2023, environ $9\\,000$ km² de forêt ont été détruits en Amazonie brésilienne. On veut représenter cette surface sur une carte au $\\dfrac{1}{1\\,000\\,000}$.\na) Que représente $1$ cm sur cette carte, en km ?\nb) Que représente un carré de $1$ cm de côté sur la carte ? Donner son aire réelle en km².\nc) Quelle aire, en cm², les $9\\,000$ km² occupent-ils sur la carte ? Donner la largeur d'un rectangle de $10$ cm de long qui la représente.\nd) Inès répond : « $1$ cm pour $10$ km, donc $9\\,000$ km² font $900$ cm² ». Quelle est son erreur ?",
          correction:
            "a) $1$ cm représente $1\\,000\\,000$ cm. Je convertis : $1\\,000\\,000 \\div 100\\,000 = 10$ km.\nb) Chaque côté du carré représente $10$ km : c'est un carré de $10$ km sur $10$ km, d'aire $10 \\times 10 = 100$ km².\nc) Chaque cm² de carte vaut $100$ km², donc $9\\,000 \\div 100 = 90$ cm². Un rectangle de $10$ cm de long doit avoir une largeur de $90 \\div 10 = 9$ cm.\nd) Inès a divisé l'aire par $10$, le rapport des LONGUEURS. Une aire se divise par $10 \\times 10 = 100$. Sa carte montrerait une forêt détruite dix fois trop grande.\n⭐ Contrôle : $10$ cm sur la carte font $100$ km, $9$ cm font $90$ km, et $100 \\times 90 = 9\\,000$ km².\n⛔ Le piège : traiter une aire comme une longueur. Sur une carte, les aires se lisent avec le carré du rapport.\nRéponse : $1$ cm représente $10$ km ; $1$ cm² représente $100$ km² ; $90$ cm², par exemple un rectangle de $10$ cm sur $9$ cm ; Inès a oublié de mettre le rapport au carré.",
          schema: deux(
            dessin([{ pts: [[0, 0], [10, 0], [10, 10], [0, 10]], cotes: ["10 km", "", "", "10 km"], nom: "1 cm² de carte", grille: [10, 10] }]),
            dessin([{ pts: [[0, 0], [10, 0], [10, 9], [0, 9]], cotes: ["10 cm", "", "", "9 cm"], nom: "90 cm² : 9 000 km²", fond: "vert", grille: [10, 9] }]),
          ),
          micros: ["echelle_distance_reelle", "echelle_comprendre", "agrandissement_aire", "echelle_defi"],
        },
      ],
    },
  ],
};
