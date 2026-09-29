// ─── Fiche d'exercices : angles et constructibilité du triangle (6e) ──────────
//
// Lot de 6e (30/09/2026), sur le modèle de la feuille de 5e voisine
// `maths-5e-triangle-figure.tsx` (aides `tri()` et `longueurs()`) et de la
// feuille des angles de 6e (aide `geo()`, pour deux figures sans triangle
// fermé) : dessins écrits EN CLAIR, relus par le script de recalcul.
//
// Pas de fiche de cours de 6e pour cette notion (au 30/09) : `fichesCours: []`
// (la fiche `maths/6e/triangle-figure` énonce la somme de 180° et
// l'inégalité triangulaire, mais sa clé est celle de la notion voisine).
// Alignée sur la banque `lib/tutor-v4/questionBank/6e/maths/triangles.bank.ts`,
// notionId triangle_propriete : somme des angles (180°), angle manquant,
// triangle possible ou non, défis (deux angles droits, deux obtus, un angle de
// 179°, trois angles ne donnent pas les longueurs). ⭐ La banque pose bien la
// somme des angles en 6e (micros triangle_somme_angle et
// triangle_angle_manquant, séparées de triangle_figure le 21/08), ainsi que
// les angles à la base d'un isocèle (« angle au sommet 40° → angles à la
// base ? »). Le cas limite « somme ÉGALE au grand côté » est traité comme la
// banque le fait : triangle impossible, « aplati », points alignés.
// ⛔ LIMITES : aucune équation (un angle se trouve par soustraction), pas de
// parallèles, pas d'angle extérieur en tant que propriété (il se calcule par
// l'angle plat, notion de 6e).
// ⛔ Aucun exemple de la fiche `maths-6e-triangles.tsx` n'est repris : ni
// 60° et 70°, ni 90° et 40°, ni 2-3-6 ou 3-4-8, ni deux angles droits.
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : phrases de 12 mots en moyenne, une
// idée par phrase, rappels très courts.
//
// Les pièges nommés : croire que la somme dépend du triangle (1), retirer un
// seul angle (2, 6), oublier l'angle droit (3, 13), s'arrêter au premier
// calcul (4), une somme « presque » 180 (5), ajouter au lieu de retirer (7),
// deux angles obtus (8), ne pas reconnaître le rectangle (9), partager 180 au
// lieu de retirer (10), la somme égale au grand côté (11, 18), accuser le
// compas (12), prendre l'angle extérieur pour un angle du triangle (14),
// croire que les angles donnent les longueurs (15), oublier de vérifier la
// somme dans CHAQUE triangle (16), l'angle du poteau (17), oublier un triangle
// (19), croire que le 180 est un hasard de mesure (20).
//
// Aucun fait réel chiffré : l'échelle, la charpente, les villages et les
// bâtonnets sont des MODÈLES.
//
// ⭐ LES DESSINS : `tri()` (coordonnées VRAIES, angles écrits en degrés, arcs
// `libres`), `longueurs()` (le grand côté contre les deux autres bout à bout)
// et `geo()` (des demi-droites et leurs arcs). Le script MESURE chaque angle
// et chaque côté étiqueté, et relit les longueurs de `longueurs()`. 14 dessins
// imprimés ; ceux qui redisent le corrigé sont `ecranSeulement` (PDF ≤ 12
// pages).
//
// Les corrigés sont écrits à la première personne (« je retire »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-triangle-propriete.mjs`.
//
// Micro-compétences : triangle_somme_angle (1, 5, 7, 16, 17, 20),
// triangle_angle_manquant (2, 3, 6, 9, 10, 13, 14, 16, 17, 20),
// triangle_possible_ou_non (4, 11, 12, 17, 18, 19), triangle_propriete_defi
// (5, 8, 11, 15, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type P2 = [number, number];
type Sommet = "A" | "B" | "C";
type Cote = "AB" | "BC" | "CA";
type Ancre = "start" | "middle" | "end";

const ENCRE = "#0f172a";
const VIOLET = "#7c3aed";
const ORANGE = "#ea580c";
const BLEU = "#0369a1";
const VERT = "#16a34a";
const GRIS = "#64748b";
const COULEURS = { orange: ORANGE, bleu: BLEU, vert: VERT, gris: GRIS } as const;

/** Un segment en plus du triangle : prolongement d'un côté, segment intérieur. */
type Ligne = { de: P2; vers: P2; couleur?: keyof typeof COULEURS; pointilles?: boolean };
/** Un arc posé n'importe où : en `en`, de `de` vers `vers`, sens inverse des aiguilles d'une montre. */
type Libre = { en: P2; de: P2; vers: P2; label: string; plein?: boolean };

const unit = (x: number, y: number): P2 => {
  const n = Math.hypot(x, y) || 1;
  return [x / n, y / n];
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins : l'un sous l'autre sur téléphone, côte à côte à partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

const W = 260, H = 200, MARGE = 36;

/**
 * ⭐ UN TRIANGLE À L'ÉCHELLE, ses angles écrits en degrés, l'angle TROUVÉ
 * surligné en orange (`trouve`), l'angle droit, les côtés codés égaux
 * (`egaux`), les arcs de compas qui placent C (`arcs`), des segments en plus
 * (`lignes`), des points nommés, et des arcs `libres`.
 * ⛔ Texte NU (« 64° », « 7,5 cm ») : SVG, pas de KaTeX.
 * ⭐ Le script de recalcul relit cet appel : l'écrire sur UNE ligne, en clair.
 */
const tri = (
  pts: { A: P2; B: P2; C: P2 },
  opts: {
    noms?: Partial<Record<Sommet, string>>;
    cotes?: Partial<Record<Cote, string>>;
    angles?: Partial<Record<Sommet, string>>;
    trouve?: Sommet[];
    droit?: Sommet;
    egaux?: Cote[];
    lignes?: Ligne[];
    points?: { en: P2; nom: string; vers?: "haut" | "bas" | "gauche" | "droite" }[];
    arcs?: boolean;
    libres?: Libre[];
  } = {},
) => {
  const reels: P2[] = [pts.A, pts.B, pts.C];
  for (const l of opts.lignes ?? []) reels.push(l.de, l.vers);
  for (const p of opts.points ?? []) reels.push(p.en);
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * MARGE) / (x1 - x0 || 1), (H - 2 * MARGE) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const P: Record<Sommet, P2> = { A: px(pts.A), B: px(pts.B), C: px(pts.C) };
  const G: P2 = [(P.A[0] + P.B[0] + P.C[0]) / 3, (P.A[1] + P.B[1] + P.C[1]) / 3];
  const voisins: Record<Sommet, [Sommet, Sommet]> = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };
  const trouve = new Set(opts.trouve ?? []);
  const ancre = (dx: number): Ancre => (dx > 0.45 ? "start" : dx < -0.45 ? "end" : "middle");

  const etiquette = (x: number, y: number, t: string, couleur: string, taille: number, a: Ancre, key: string) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = Math.min(Math.max(x, 4 + ga), W - 4 - dr);
    const by = Math.min(Math.max(y, 10), H - 8);
    return (
      <text key={key} x={bx.toFixed(1)} y={by.toFixed(1)} textAnchor={a} dominantBaseline="middle" fontSize={taille} fontWeight={800} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
        {t}
      </text>
    );
  };
  const arcDessin = (V: P2, u1: P2, u2: P2, r: number, plein: boolean, key: string) => {
    const a: P2 = [V[0] + u1[0] * r, V[1] + u1[1] * r];
    const b: P2 = [V[0] + u2[0] * r, V[1] + u2[1] * r];
    const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
    const d = `M ${a[0].toFixed(1)} ${a[1].toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
    return (
      <g key={key}>
        {plein ? <path d={`M ${V[0].toFixed(1)} ${V[1].toFixed(1)} L ${d.slice(2)} Z`} fill={ORANGE} fillOpacity={0.3} /> : null}
        <path d={d} fill="none" stroke={plein ? ORANGE : VIOLET} strokeWidth={plein ? 2.4 : 1.6} />
      </g>
    );
  };
  const equerre = (V: P2, p: P2, q: P2, key: string) => {
    const u1 = unit(p[0] - V[0], p[1] - V[1]);
    const u2 = unit(q[0] - V[0], q[1] - V[1]);
    const c = 10;
    return <path key={key} d={`M ${V[0] + u1[0] * c} ${V[1] + u1[1] * c} L ${V[0] + (u1[0] + u2[0]) * c} ${V[1] + (u1[1] + u2[1]) * c} L ${V[0] + u2[0] * c} ${V[1] + u2[1] * c}`} fill="none" stroke="#dc2626" strokeWidth={2.2} />;
  };
  /** Un petit trait au milieu de [pq] : le codage des côtés égaux. */
  const trait = (p: P2, q: P2, key: string) => {
    const M: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    const t = unit(q[0] - p[0], q[1] - p[1]);
    return <line key={key} x1={M[0] + t[1] * 6} y1={M[1] - t[0] * 6} x2={M[0] - t[1] * 6} y2={M[1] + t[0] * 6} stroke={ENCRE} strokeWidth={2.2} />;
  };
  const cotes = (["AB", "BC", "CA"] as Cote[]).map((c) => [c, P[c[0] as Sommet], P[c[1] as Sommet]] as const);

  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Triangle dessiné à l'échelle">
        <polygon points={`${P.A.join(",")} ${P.B.join(",")} ${P.C.join(",")}`} fill="#f8fafc" stroke={ENCRE} strokeWidth={2.4} strokeLinejoin="round" />
        {opts.arcs
          ? (["A", "B"] as Sommet[]).map((k) => {
              const V = P[k], Cp = P.C;
              const R = Math.hypot(Cp[0] - V[0], Cp[1] - V[1]);
              const t = Math.atan2(Cp[1] - V[1], Cp[0] - V[0]);
              const [a, b] = [t - 0.3, t + 0.3].map((u) => [V[0] + R * Math.cos(u), V[1] + R * Math.sin(u)] as P2);
              return <path key={`arc${k}`} d={`M ${a[0].toFixed(1)} ${a[1].toFixed(1)} A ${R.toFixed(1)} ${R.toFixed(1)} 0 0 1 ${b[0].toFixed(1)} ${b[1].toFixed(1)}`} fill="none" stroke={VERT} strokeWidth={1.8} />;
            })
          : null}
        {(opts.lignes ?? []).map((l, i) => {
          const [a, b] = [px(l.de), px(l.vers)];
          return <line key={`l${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={COULEURS[l.couleur ?? "orange"]} strokeWidth={l.pointilles ? 1.8 : 2.4} strokeDasharray={l.pointilles ? "5 4" : undefined} />;
        })}
        {(Object.keys(opts.angles ?? {}) as Sommet[]).map((k) => {
          const V = P[k];
          const [p, q] = voisins[k].map((v) => P[v]);
          const u1 = unit(p[0] - V[0], p[1] - V[1]);
          const u2 = unit(q[0] - V[0], q[1] - V[1]);
          const ouvert = (Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))) * 180) / Math.PI;
          const bi = unit(u1[0] + u2[0], u1[1] + u2[1]);
          const r = 17;
          const loin = r + (ouvert < 35 ? 26 : ouvert < 60 ? 19 : 15);
          const t = trouve.has(k);
          return (
            <g key={k}>
              {k === opts.droit ? null : arcDessin(V, u1, u2, r, t, `a${k}`)}
              {etiquette(V[0] + bi[0] * loin, V[1] + bi[1] * loin, opts.angles?.[k] ?? "", t ? ORANGE : VIOLET, 14, "middle", `la${k}`)}
            </g>
          );
        })}
        {(opts.libres ?? []).map((a, i) => {
          const V = px(a.en);
          const a1 = Math.atan2(a.de[1] - a.en[1], a.de[0] - a.en[0]);
          const d = (((Math.atan2(a.vers[1] - a.en[1], a.vers[0] - a.en[0]) - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const r = d < 0.7 ? 30 : 20;
          const pt = (ang: number, rr: number): P2 => [V[0] + rr * Math.cos(ang), V[1] - rr * Math.sin(ang)];
          const [p, q] = [pt(a1, r), pt(a1 + d, r)];
          const arc = `M ${p[0].toFixed(1)} ${p[1].toFixed(1)} A ${r} ${r} 0 ${d > Math.PI ? 1 : 0} 0 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
          const am = a1 + d / 2;
          const [lx, ly] = pt(am, r + (d < 0.7 ? 16 : 14));
          const c = a.plein ? ORANGE : VIOLET;
          return (
            <g key={`lb${i}`}>
              {a.plein ? <path d={`M ${V[0].toFixed(1)} ${V[1].toFixed(1)} L ${arc.slice(2)} Z`} fill={ORANGE} fillOpacity={0.28} /> : null}
              <path d={arc} fill="none" stroke={c} strokeWidth={a.plein ? 2.4 : 1.8} />
              {etiquette(lx, ly, a.label, c, 14, ancre(Math.cos(am)), `lbl${i}`)}
            </g>
          );
        })}
        {opts.droit ? equerre(P[opts.droit], P[voisins[opts.droit][0]], P[voisins[opts.droit][1]], "droit") : null}
        {(opts.egaux ?? []).map((c) => trait(P[c[0] as Sommet], P[c[1] as Sommet], `e${c}`))}
        {cotes.map(([c, p, q]) => {
          const t = opts.cotes?.[c];
          if (!t) return null;
          const M: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
          let n = unit(-(q[1] - p[1]), q[0] - p[0]);
          if (n[0] * (M[0] - G[0]) + n[1] * (M[1] - G[1]) < 0) n = [-n[0], -n[1]];
          return etiquette(M[0] + n[0] * 14, M[1] + n[1] * 14, t, BLEU, 14, ancre(n[0]), `c${c}`);
        })}
        {(opts.points ?? []).map((p, i) => {
          const [x, y] = px(p.en);
          const [dx, dy, a]: [number, number, Ancre] =
            p.vers === "haut" ? [0, -14, "middle"] : p.vers === "gauche" ? [-10, 0, "end"] : p.vers === "droite" ? [10, 0, "start"] : [0, 15, "middle"];
          return (
            <g key={`p${i}`}>
              <circle cx={x} cy={y} r={3} fill={ENCRE} />
              {etiquette(x + dx, y + dy, p.nom, ENCRE, 15, a, `pn${i}`)}
            </g>
          );
        })}
        {(["A", "B", "C"] as Sommet[]).map((k) => {
          const V = P[k];
          const d = unit(V[0] - G[0], V[1] - G[1]);
          return (
            <g key={`s${k}`}>
              <circle cx={V[0]} cy={V[1]} r={3.5} fill={ENCRE} />
              {etiquette(V[0] + d[0] * 15, V[1] + d[1] * 15, opts.noms?.[k] ?? k, ENCRE, 15, ancre(d[0]), `n${k}`)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const nombre = (x: number) => String(x).replace(".", ",");

/**
 * ⭐ L'INÉGALITÉ TRIANGULAIRE, VUE : en haut le plus grand côté (bleu), en
 * dessous les deux autres mis bout à bout (orange, vert), à la même échelle.
 * Le pointillé marque le bout du grand côté : les deux petits l'atteignent-ils ?
 * ⭐ Le script de recalcul relit `{ grand, petits }` : en clair.
 */
const longueurs = (cas: { grand: number; petits: [number, number] }[], unite = "cm") => {
  const s = 200 / Math.max(...cas.map((c) => Math.max(c.grand, c.petits[0] + c.petits[1])));
  const h = 98;
  return (
    <div className="mx-auto w-full max-w-[19rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 260 ${h * cas.length}`} className="block h-auto w-full" role="img" aria-label="Le plus grand côté comparé aux deux autres mis bout à bout">
        {cas.map(({ grand, petits: [a, b] }, i) => {
          const y = i * h;
          const x0 = 22;
          const somme = Math.round((a + b) * 1000) / 1000;
          const verdict = somme > grand ? "triangle" : somme === grand ? "plat" : "pas de triangle";
          return (
            <g key={i}>
              <rect x={x0} y={y + 24} width={grand * s} height={9} rx={2} fill={BLEU} />
              <text x={x0 + (grand * s) / 2} y={y + 18} textAnchor="middle" fontSize={14} fontWeight={800} fill={BLEU}>
                {`${nombre(grand)} ${unite}`}
              </text>
              <rect x={x0} y={y + 44} width={a * s} height={9} rx={2} fill={ORANGE} />
              <rect x={x0 + a * s} y={y + 44} width={b * s} height={9} rx={2} fill={VERT} />
              <text x={x0 + (a * s) / 2} y={y + 72} textAnchor="middle" fontSize={14} fontWeight={800} fill={ORANGE}>
                {nombre(a)}
              </text>
              <text x={x0 + a * s + (b * s) / 2} y={y + 72} textAnchor="middle" fontSize={14} fontWeight={800} fill={VERT}>
                {nombre(b)}
              </text>
              <line x1={x0 + grand * s} y1={y + 20} x2={x0 + grand * s} y2={y + 58} stroke={ENCRE} strokeWidth={1.4} strokeDasharray="3 3" />
              <text x={254} y={y + 92} textAnchor="end" fontSize={14} fontWeight={800} fill={somme > grand ? VERT : "#dc2626"}>
                {verdict}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ─── Les figures d'angles sans triangle fermé : `geo()` de la feuille des angles de 6e ───
/** Un trait : demi-droite, droite, aiguille. `chevrons` : le codage des parallèles. */
type Trait = { de: P2; vers: P2; couleur?: string; pointilles?: boolean; chevrons?: number; nom?: string; ou?: P2 };
/** Un arc d'angle en `en`, tourné dans le sens inverse des aiguilles d'une montre, de `de` vers `vers`. */
type Arc = { en: P2; de: P2; vers: P2; label?: string; plein?: boolean; droit?: boolean; rayon?: number };
type Pt = { en: P2; nom: string; vers?: "haut" | "bas" | "gauche" | "droite" | "hg" | "hd" | "bg" | "bd" };
type Geo = { traits: Trait[]; arcs?: Arc[]; points?: Pt[]; rapporteur?: { centre: P2; rayon: number }; horloge?: { centre: P2; rayon: number } };

/**
 * ⭐ UNE FIGURE D'ANGLES À L'ÉCHELLE (coordonnées vraies, y vers le haut),
 * dans un viewBox de 300 de large. Les arcs tournent de `de` vers `vers` dans
 * le sens inverse des aiguilles d'une montre : la mesure est celle de cet arc.
 * `plein` : l'angle TROUVÉ, en orange. `droit` : le petit carré.
 * ⛔ Texte NU (« 38° ») : SVG, pas de KaTeX. Étiquettes bornées au cadre.
 * (Copie conforme de `geo()` de `maths-5e-angle-mesure.tsx`.)
 */
const geo = (f: Geo) => {
  const W = 300, HMAX = 232, m = 28;
  const reels: P2[] = [];
  for (const t of f.traits) reels.push(t.de, t.vers);
  for (const p of f.points ?? []) reels.push(p.en);
  for (const a of f.arcs ?? []) reels.push(a.en);
  if (f.rapporteur) {
    const { centre: [cx, cy], rayon: r } = f.rapporteur;
    reels.push([cx - r, cy], [cx + r, cy + r]);
  }
  if (f.horloge) {
    const { centre: [cx, cy], rayon: r } = f.horloge;
    reels.push([cx - r, cy - r], [cx + r, cy + r]);
  }
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * m) / (x1 - x0 || 1), (HMAX - 2 * m) / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 2 * m);
  const ox = (W - (x1 - x0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - m - (p[1] - y0) * s];
  const dir = (a: P2, b: P2) => Math.atan2(b[1] - a[1], b[0] - a[0]);
  const ancre = (c: number): Ancre => (c > 0.4 ? "start" : c < -0.4 ? "end" : "middle");

  const etiquette = (x: number, y: number, t: string, couleur: string, a: Ancre, key: string, taille = 14) => {
    const l = t.length * taille * 0.6;
    const [gauche, droite] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = Math.min(Math.max(x, 4 + gauche), W - 4 - droite);
    const by = Math.min(Math.max(y, 10), H - 8);
    return (
      <text key={key} x={bx.toFixed(1)} y={by.toFixed(1)} textAnchor={a} dominantBaseline="middle" fontSize={taille} fontWeight={800} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
        {t}
      </text>
    );
  };

  const rapporteur = () => {
    if (!f.rapporteur) return null;
    const C = px(f.rapporteur.centre);
    const R = f.rapporteur.rayon * s;
    const pt = (deg: number, r: number): P2 => [C[0] + r * Math.cos((deg * Math.PI) / 180), C[1] - r * Math.sin((deg * Math.PI) / 180)];
    return (
      <g>
        <path d={`M ${C[0] - R} ${C[1]} A ${R} ${R} 0 0 1 ${C[0] + R} ${C[1]} Z`} fill="#e0f2fe" fillOpacity={0.55} stroke={GRIS} strokeWidth={1.4} />
        {Array.from({ length: 37 }, (_, k) => k * 5).map((d) => {
          const L = d % 30 === 0 ? 11 : d % 10 === 0 ? 7 : 4;
          const [a, b] = [pt(d, R), pt(d, R - L)];
          return <line key={d} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={GRIS} strokeWidth={1} />;
        })}
        {[0, 30, 60, 90, 120, 150, 180].map((d) => {
          const [ex, ey] = pt(d, R + 12);
          const [ix, iy] = pt(d, R - 20);
          const leve = d === 0 || d === 180 ? -10 : 0;
          return (
            <g key={`n${d}`}>
              <text x={ex} y={ey + leve} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={700} fill={GRIS}>
                {180 - d}
              </text>
              <text x={ix} y={iy + leve} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={800} fill={BLEU}>
                {d}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  const horloge = () => {
    if (!f.horloge) return null;
    const C = px(f.horloge.centre);
    const R = f.horloge.rayon * s;
    return (
      <g>
        <circle cx={C[0]} cy={C[1]} r={R} fill="#f8fafc" stroke={ENCRE} strokeWidth={2.2} />
        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => {
          const a = ((90 - 30 * h) * Math.PI) / 180;
          return (
            <g key={h}>
              <line x1={C[0] + R * Math.cos(a)} y1={C[1] - R * Math.sin(a)} x2={C[0] + (R - 6) * Math.cos(a)} y2={C[1] - (R - 6) * Math.sin(a)} stroke={ENCRE} strokeWidth={1.6} />
              <text x={C[0] + (R - 17) * Math.cos(a)} y={C[1] - (R - 17) * Math.sin(a)} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={700} fill={GRIS}>
                {h}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  /** `n` chevrons vers la fin du trait, tournés vers la droite. */
  const chevrons = (p: P2, q: P2, n: number, key: string) => {
    const M: P2 = [p[0] + 0.86 * (q[0] - p[0]), p[1] + 0.86 * (q[1] - p[1])];
    const L = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
    let t: P2 = [(q[0] - p[0]) / L, (q[1] - p[1]) / L];
    if (t[0] < -1e-9) t = [-t[0], -t[1]];
    const nn: P2 = [-t[1], t[0]];
    return (
      <g key={key}>
        {Array.from({ length: n }, (_, i) => {
          const d = (i - (n - 1) / 2) * 5 + 3;
          const c: P2 = [M[0] + t[0] * d, M[1] + t[1] * d];
          const a: P2 = [c[0] - t[0] * 6 + nn[0] * 5, c[1] - t[1] * 6 + nn[1] * 5];
          const b: P2 = [c[0] - t[0] * 6 - nn[0] * 5, c[1] - t[1] * 6 - nn[1] * 5];
          return <polyline key={i} points={`${a.join(",")} ${c.join(",")} ${b.join(",")}`} fill="none" stroke={VERT} strokeWidth={2.2} />;
        })}
      </g>
    );
  };

  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Figure d'angles dessinée à l'échelle">
        {rapporteur()}
        {horloge()}
        {f.traits.map((t, i) => {
          const [a, b] = [px(t.de), px(t.vers)];
          return (
            <g key={`t${i}`}>
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={t.couleur ?? ENCRE} strokeWidth={t.pointilles ? 1.8 : 2.4} strokeDasharray={t.pointilles ? "6 4" : undefined} strokeLinecap="round" />
              {t.chevrons ? chevrons(a, b, t.chevrons, `c${i}`) : null}
            </g>
          );
        })}
        {(f.arcs ?? []).map((a, i) => {
          const V = px(a.en);
          const a1 = dir(a.en, a.de);
          const d = (((dir(a.en, a.vers) - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const pt = (ang: number, r: number): P2 => [V[0] + r * Math.cos(ang), V[1] - r * Math.sin(ang)];
          if (a.droit) {
            const [u, w] = [pt(a1, 11), pt(a1 + d, 11)];
            return <path key={`a${i}`} d={`M ${u[0]} ${u[1]} L ${u[0] + w[0] - V[0]} ${u[1] + w[1] - V[1]} L ${w[0]} ${w[1]}`} fill="none" stroke="#dc2626" strokeWidth={2.2} />;
          }
          const couleur = a.plein ? ORANGE : VIOLET;
          const r = a.rayon ?? (d < 0.7 ? 30 : 21);
          const [p, q] = [pt(a1, r), pt(a1 + d, r)];
          const arc = `M ${p[0].toFixed(1)} ${p[1].toFixed(1)} A ${r} ${r} 0 ${d > Math.PI ? 1 : 0} 0 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
          const am = a1 + d / 2;
          const [lx, ly] = pt(am, r + (d < 0.5 ? 17 : 14));
          return (
            <g key={`a${i}`}>
              {a.plein ? <path d={`M ${V[0].toFixed(1)} ${V[1].toFixed(1)} L ${arc.slice(2)} Z`} fill={ORANGE} fillOpacity={0.28} /> : null}
              <path d={arc} fill="none" stroke={couleur} strokeWidth={a.plein ? 2.4 : 1.8} />
              {a.label ? etiquette(lx, ly, a.label, couleur, ancre(Math.cos(am)), `al${i}`) : null}
            </g>
          );
        })}
        {f.traits.map((t, i) => (t.nom && t.ou ? etiquette(px(t.ou)[0], px(t.ou)[1], t.nom, t.couleur ?? GRIS, "middle", `tn${i}`) : null))}
        {(f.points ?? []).map((p, i) => {
          const [x, y] = px(p.en);
          const decal: Record<NonNullable<Pt["vers"]>, [number, number, Ancre]> = {
            haut: [0, -13, "middle"],
            bas: [0, 15, "middle"],
            gauche: [-9, 0, "end"],
            droite: [9, 0, "start"],
            hg: [-7, -11, "end"],
            hd: [7, -11, "start"],
            bg: [-7, 13, "end"],
            bd: [7, 13, "start"],
          };
          const [dx, dy, an] = decal[p.vers ?? "bas"];
          return (
            <g key={`p${i}`}>
              <circle cx={x} cy={y} r={3.2} fill={ENCRE} />
              {etiquette(x + dx, y + dy, p.nom, ENCRE, an, `pn${i}`, 15)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesTrianglePropriete6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "triangle-propriete",
  titre: "Les angles du triangle et le triangle possible",
  accroche:
    "Vingt exercices, du geste seul au problème. Utiliser la somme des angles d'un triangle, 180°. Trouver un angle qui manque. Savoir si trois longueurs font un triangle. Puis chercher les triangles impossibles. Une échelle contre un mur, une charpente, trois villages, des bâtonnets, trois coins de papier. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et la figure.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/triangle-propriete", titre: "Les angles du triangle et le triangle possible" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une seule chose à faire. J'additionne ou je retire, puis je vérifie.",
      rappel: [
        "Dans tout triangle, les trois angles font $180°$ ensemble.",
        "Angle qui manque : je retire les deux autres de $180$.",
        "Triangle possible : le plus grand côté est plus PETIT que la somme des deux autres.",
      ],
      exercices: [
        {
          enonce: "Voici le triangle $GEM$ et ses trois angles.\na) Additionne les trois angles.\nb) Trace un autre triangle, mesure ses angles, et additionne. Que remarques-tu ?",
          figure: tri({ A: [0, 0], B: [6, 0], C: [4.382, 4.6991] }, { noms: { A: "G", B: "E", C: "M" }, angles: { A: "47°", B: "71°", C: "62°" } }),
          correction:
            "a) J'additionne : $47 + 71 = 118$, puis $118 + 62 = 180$.\nLes trois angles font $180°$.\nb) Avec un autre triangle, je trouve encore $180°$, ou presque, à cause des erreurs de mesure.\nC'est une règle : dans TOUT triangle, les trois angles font $180°$.\n⛔ Le piège : croire que la somme change avec la taille ou la forme. Elle vaut toujours $180°$.\nRéponse : a) $180°$ ; b) on trouve toujours $180°$.",
          micros: ["triangle_somme_angle"],
        },
        {
          enonce: "Dans le triangle $HIP$, l'angle en $H$ mesure $38°$ et l'angle en $I$ mesure $85°$.\nCombien mesure l'angle en $P$ ?",
          correction:
            "Les trois angles font $180°$. Il m'en manque un.\nJ'additionne les deux angles connus : $38 + 85 = 123$.\nJe retire de $180$ : $180 - 123 = 57$.\nL'angle en $P$ mesure $57°$.\nJe vérifie : $38 + 85 + 57 = 180$.\n⛔ Le piège : retirer un seul angle, $180 - 38 = 142$. Il faut retirer les DEUX angles connus.\nRéponse : $57°$.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [6, 0], C: [5.6161, 4.3878] }, { noms: { A: "H", B: "I", C: "P" }, angles: { A: "38°", B: "85°", C: "57°" }, trouve: ["C"] })),
          micros: ["triangle_angle_manquant"],
        },
        {
          enonce: "Le triangle $JUS$ est rectangle en $U$. L'angle en $J$ mesure $27°$.\nCombien mesure l'angle en $S$ ?",
          correction:
            "Rectangle en $U$ : l'angle en $U$ mesure $90°$.\nJ'additionne les deux angles connus : $90 + 27 = 117$.\nJe retire de $180$ : $180 - 117 = 63$.\nL'angle en $S$ mesure $63°$.\n⭐ Dans un triangle rectangle, les deux autres angles font $90°$ ensemble : $27 + 63 = 90$.\n⛔ Le piège : oublier l'angle droit. Il compte, même s'il n'est pas écrit en degrés.\nRéponse : $63°$.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [5, 0], C: [0, 2.5476] }, { noms: { A: "U", B: "J", C: "S" }, droit: "A", angles: { B: "27°", C: "63°" }, trouve: ["C"] })),
          micros: ["triangle_angle_manquant"],
        },
        {
          enonce: "Peut-on construire un triangle avec ces trois longueurs ?\na) $5$ cm, $7$ cm et $13$ cm.\nb) $6$ cm, $9$ cm et $11$ cm.\nc) $4$ cm, $6$ cm et $10$ cm.",
          correction:
            "Je prends le plus grand côté. Je le compare aux deux autres mis bout à bout.\na) $5 + 7 = 12$. Et $12$ est plus petit que $13$. Les deux petits côtés ne se rejoignent pas : non.\nb) $6 + 9 = 15$. Et $15$ est plus grand que $11$ : oui.\nc) $4 + 6 = 10$. C'est ÉGAL au grand côté. Les trois points sont alignés : le triangle est « aplati ». Non.\n⛔ Le piège au c) : répondre oui. Il faut une somme PLUS GRANDE, pas égale.\nRéponse : a) non ; b) oui ; c) non.",
          schema: longueurs([{ grand: 13, petits: [5, 7] }, { grand: 11, petits: [6, 9] }, { grand: 10, petits: [4, 6] }]),
          micros: ["triangle_possible_ou_non"],
        },
        {
          enonce: "Ces trois angles peuvent-ils être ceux d'un triangle ?\na) $95°$, $48°$ et $41°$.\nb) $72°$, $54°$ et $54°$.",
          correction:
            "Je vérifie si la somme fait exactement $180°$.\na) $95 + 48 = 143$, puis $143 + 41 = 184$. Ce n'est pas $180$ : non.\nb) $72 + 54 = 126$, puis $126 + 54 = 180$ : oui.\n⛔ Le piège au a) : dire oui car $184$ est « presque » $180$. Il faut $180$ tout juste.\nRéponse : a) non ; b) oui.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [6, 0], C: [3, 4.1291] }, { angles: { A: "54°", B: "54°", C: "72°" } })),
          micros: ["triangle_somme_angle", "triangle_propriete_defi"],
        },
        {
          enonce: "Un triangle a un angle de $104°$ et un angle de $29°$.\nCombien mesure son troisième angle ?",
          correction:
            "J'additionne les deux angles connus : $104 + 29 = 133$.\nJe retire de $180$ : $180 - 133 = 47$.\nLe troisième angle mesure $47°$.\nJe vérifie : $104 + 29 + 47 = 180$.\n⛔ Le piège : retirer un seul angle. $180 - 104 = 76$ ne suffit pas : il reste l'angle de $29°$.\nRéponse : $47°$.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [5, 0], C: [-0.8018, 3.216] }, { angles: { A: "104°", B: "29°", C: "47°" }, trouve: ["C"] })),
          micros: ["triangle_angle_manquant"],
        },
        {
          enonce: "Le triangle $ABC$ est rectangle en $A$.\nCombien font ses deux autres angles, $a$ et $b$, ensemble ?",
          correction:
            "Les trois angles font $180°$.\nL'angle droit en $A$ en prend $90°$.\nIl reste $180 - 90 = 90$ pour les deux autres angles.\nEnsemble, $a$ et $b$ font $90°$.\n⭐ Chacun des deux est donc plus petit que $90°$ : ils sont aigus.\n⛔ Le piège : ajouter l'angle droit au lieu de le retirer.\nRéponse : $90°$.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [5, 0], C: [0, 3.2] }, { droit: "A", angles: { B: "a", C: "b" } })),
          micros: ["triangle_somme_angle"],
        },
        {
          enonce: "Nina veut tracer un triangle avec un angle de $100°$ et un angle de $95°$, sur un côté $[AB]$.\nPeut-elle y arriver ?",
          figure: geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [-0.5209, 2.9544] }, { de: [5, 0], vers: [5.2615, 2.9886] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [-0.5209, 2.9544], label: "100°" }, { en: [5, 0], de: [5.2615, 2.9886], vers: [0, 0], label: "95°" }], points: [{ en: [0, 0], nom: "A", vers: "bg" }, { en: [5, 0], nom: "B", vers: "bd" }] }),
          correction:
            "J'additionne les deux angles : $100 + 95 = 195$.\nC'est déjà plus que $180°$. Il ne reste rien pour le troisième angle.\nSur le dessin, les deux côtés s'écartent : ils ne se rencontreront jamais.\nNon, ce triangle est impossible.\n⭐ Un triangle a au plus UN angle obtus.\n⛔ Le piège : croire qu'il suffit de tracer plus long. Les côtés s'éloignent de plus en plus.\nRéponse : non.",
          micros: ["triangle_propriete_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'écris chaque calcul, puis je vérifie que tout fait 180°.",
      rappel: [
        "Isocèle : les deux angles à la base sont égaux.",
        "Angle plat : $180°$. Angle droit : $90°$.",
        "Somme ÉGALE au grand côté : triangle aplati, donc impossible.",
      ],
      exercices: [
        {
          enonce: "Dans le triangle $LUX$, l'angle en $L$ mesure $28°$ et l'angle en $U$ mesure $62°$.\na) Calcule l'angle en $X$.\nb) Que remarques-tu ?",
          correction:
            "a) $28 + 62 = 90$. Puis $180 - 90 = 90$.\nL'angle en $X$ mesure $90°$.\nb) C'est un angle droit : le triangle $LUX$ est rectangle en $X$.\n⛔ Le piège : ne pas voir l'angle droit caché. Un angle de $90°$ calculé est un vrai angle droit.\nRéponse : a) $90°$ ; b) le triangle est rectangle en $X$.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [6, 0], C: [4.6776, 2.4871] }, { noms: { A: "L", B: "U", C: "X" }, angles: { A: "28°", B: "62°" }, droit: "C" })),
          micros: ["triangle_angle_manquant"],
        },
        {
          enonce: "Le triangle $ABC$ est isocèle en $A$. L'angle en $B$ mesure $67°$.\na) Combien mesure l'angle en $C$ ?\nb) Combien mesure l'angle en $A$ ?",
          figure: tri({ A: [0, 0], B: [5, 0], C: [2.5, 5.8896] }, { noms: { A: "B", B: "C", C: "A" }, angles: { A: "67°", C: "?" }, trouve: ["C"], egaux: ["BC", "CA"] }),
          correction:
            "a) Isocèle en $A$ : les angles à la base, en $B$ et en $C$, sont égaux.\nL'angle en $C$ mesure aussi $67°$.\nb) J'additionne les deux angles à la base : $67 + 67 = 134$.\nJe retire de $180$ : $180 - 134 = 46$. L'angle en $A$ mesure $46°$.\nJe vérifie : $46 + 67 + 67 = 180$.\n⛔ Le piège : partager $180$ en trois. Les trois angles ne sont égaux que dans un triangle équilatéral.\nRéponse : a) $67°$ ; b) $46°$.",
          micros: ["triangle_angle_manquant"],
        },
        {
          enonce: "Deux côtés d'un triangle mesurent $4$ cm et $9$ cm.\nLe troisième côté peut-il mesurer :\na) $3$ cm ? b) $5$ cm ? c) $8$ cm ? d) $14$ cm ?",
          correction:
            "Chaque fois, je compare le plus grand côté aux deux autres.\na) Plus grand : $9$. $4 + 3 = 7$, plus petit que $9$ : non.\nb) Plus grand : $9$. $4 + 5 = 9$, égal : triangle aplati, non.\nc) Plus grand : $9$. $4 + 8 = 12$, plus grand que $9$ : oui.\nd) Plus grand : $14$. $4 + 9 = 13$, plus petit que $14$ : non.\n⛔ Le piège au d) : comparer à $9$ par habitude. Ici, le plus grand côté est le NOUVEAU, $14$ cm.\nRéponse : a) non ; b) non ; c) oui ; d) non.",
          schema: ecranSeulement(longueurs([{ grand: 9, petits: [4, 3] }, { grand: 9, petits: [4, 5] }, { grand: 9, petits: [4, 8] }, { grand: 14, petits: [4, 9] }])),
          micros: ["triangle_possible_ou_non", "triangle_propriete_defi"],
        },
        {
          enonce: "Léo veut construire un triangle de côtés $3$ cm, $5$ cm et $9$ cm.\nIl trace $[AB]$ de $9$ cm, puis deux arcs au compas. Les arcs ne se coupent pas.\na) Son compas est-il cassé ?\nb) Explique pourquoi.",
          correction:
            "a) Non, le compas n'y est pour rien.\nb) Les deux petits côtés, bout à bout, font $3 + 5 = 8$ cm.\nC'est moins que $9$ cm. Ils ne peuvent pas relier les deux bouts de $[AB]$.\nLes arcs ne se touchent donc jamais : ce triangle est impossible.\n⛔ Le piège : recommencer la construction. Je vérifie AVANT de construire.\nRéponse : a) non ; b) $3 + 5 = 8$, plus petit que $9$.",
          schema: ecranSeulement(longueurs([{ grand: 9, petits: [3, 5] }])),
          micros: ["triangle_possible_ou_non"],
        },
        {
          enonce: "Une échelle est posée contre un mur vertical. Le sol est horizontal.\nL'échelle fait un angle de $74°$ avec le sol.\nQuel angle fait-elle avec le mur ?",
          figure: tri({ A: [0, 0], B: [1, 0], C: [0, 3.4874] }, { noms: { A: "M", B: "P", C: "H" }, droit: "A", angles: { B: "74°", C: "?" }, trouve: ["C"] }),
          correction:
            "Le mur, le sol et l'échelle forment un triangle $MPH$.\nLe mur est vertical, le sol horizontal : l'angle en $M$ est droit, $90°$.\nJ'additionne : $90 + 74 = 164$.\nJe retire de $180$ : $180 - 164 = 16$.\nL'échelle fait un angle de $16°$ avec le mur.\n⛔ Le piège : oublier l'angle droit entre le mur et le sol.\nRéponse : $16°$.",
          micros: ["triangle_angle_manquant"],
        },
        {
          enonce: "Dans le triangle $ABC$, on prolonge le côté $[BC]$ jusqu'au point $D$.\nL'angle $\\widehat{ACD}$ mesure $128°$. L'angle en $A$ mesure $57°$.\na) Calcule l'angle du triangle en $C$.\nb) Calcule l'angle en $B$.",
          figure: tri({ A: [0, 0], B: [5, 0], C: [1.5295, 4.442] }, { noms: { A: "B", B: "C", C: "A" }, angles: { C: "57°", A: "?" }, trouve: ["A"], lignes: [{ de: [5, 0], vers: [7, 0], couleur: "gris" }], points: [{ en: [7, 0], nom: "D", vers: "bas" }], libres: [{ en: [5, 0], de: [7, 0], vers: [1.5295, 4.442], label: "128°" }] }),
          correction:
            "a) $B$, $C$ et $D$ sont alignés : l'angle $\\widehat{BCD}$ est plat, $180°$.\nL'angle du triangle en $C$ et l'angle de $128°$ sont côte à côte.\nAngle en $C$ : $180 - 128 = 52$, soit $52°$.\nb) Dans le triangle : $57 + 52 = 109$. Puis $180 - 109 = 71$.\nL'angle en $B$ mesure $71°$.\nJe vérifie : $57 + 52 + 71 = 180$.\n⛔ Le piège : prendre $128°$ pour l'angle du triangle en $C$. Il est DEHORS.\nRéponse : a) $52°$ ; b) $71°$.",
          micros: ["triangle_angle_manquant"],
        },
        {
          enonce: "Vrai ou faux ? Justifie.\na) Un triangle rectangle a toujours deux angles aigus.\nb) Si je connais deux angles d'un triangle, je connais le troisième.\nc) Si je connais les trois angles, je connais les longueurs des côtés.",
          figure: deux(
            tri({ A: [0, 0], B: [5, 0], C: [3.7693, 2.6393] }, { angles: { A: "35°", B: "65°", C: "80°" } }),
            tri({ A: [0, 0], B: [8, 0], C: [6.0309, 4.2228] }, { noms: { A: "D", B: "E", C: "F" }, angles: { A: "35°", B: "65°", C: "80°" } }),
          ),
          correction:
            "a) Vrai. L'angle droit prend $90°$. Les deux autres se partagent $90°$ : chacun est plus petit que $90°$.\nb) Vrai. Je retire les deux angles connus de $180°$.\nc) Faux. Regarde la figure : les deux triangles ont les mêmes angles, $35°$, $65°$ et $80°$.\nMais le triangle $DEF$ est plus grand. Ses côtés sont plus longs.\n⛔ Le piège : croire que les angles donnent la taille. Les angles donnent la FORME, pas la taille.\nRéponse : a) vrai ; b) vrai ; c) faux.",
          micros: ["triangle_propriete_defi"],
        },
        {
          enonce: "Dans le triangle $ABC$, le point $D$ est sur $[BC]$.\nL'angle en $B$ mesure $48°$. $\\widehat{BAD} = 37°$ et $\\widehat{DAC} = 29°$.\na) Combien mesure l'angle du triangle $ABC$ en $A$ ?\nb) Combien mesure l'angle en $C$ ?\nc) Que remarques-tu pour les angles en $A$ et en $C$ ?",
          figure: tri({ A: [0, 0], B: [6, 0], C: [4.0148, 4.4589] }, { noms: { A: "B", B: "C", C: "A" }, angles: { A: "48°", B: "?" }, trouve: ["B"], lignes: [{ de: [4.0148, 4.4589], vers: [3.6247, 0] }], points: [{ en: [3.6247, 0], nom: "D", vers: "bas" }], libres: [{ en: [4.0148, 4.4589], de: [0, 0], vers: [3.6247, 0], label: "37°" }, { en: [4.0148, 4.4589], de: [3.6247, 0], vers: [6, 0], label: "29°" }] }),
          correction:
            "a) L'angle en $A$ est fait des deux petits angles : $37 + 29 = 66$. Il mesure $66°$.\nb) Dans le triangle $ABC$ : $48 + 66 = 114$. Puis $180 - 114 = 66$.\nL'angle en $C$ mesure $66°$.\nc) Les angles en $A$ et en $C$ sont égaux : $66°$ chacun.\n⭐ Contrôle dans le petit triangle $ABD$ : $180 - 48 - 37 = 95$. Et dans $ADC$ : $180 - 66 - 29 = 85$. Or $95 + 85 = 180$ : l'angle plat en $D$ est bien là.\n⛔ Le piège : utiliser $37°$ ou $29°$ comme angle en $A$. L'angle du grand triangle, ce sont les DEUX réunis.\nRéponse : a) $66°$ ; b) $66°$ ; c) ils sont égaux.",
          micros: ["triangle_somme_angle", "triangle_angle_manquant"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je dessine le triangle au brouillon, puis je réponds par une phrase.",
      rappel: [
        "Trois angles d'un triangle : $180°$ ensemble.",
        "Trois longueurs : le plus grand côté doit être plus petit que la somme des deux autres.",
      ],
      exercices: [
        {
          titre: "La charpente",
          enonce: "La charpente d'un toit forme un triangle isocèle. L'angle du haut mesure $104°$. Un poteau vertical part du haut et tombe au milieu de la poutre du bas, à angle droit. Les mesures sont des modèles.\na) Combien mesure chacun des deux angles du bas ?\nb) Quel angle fait le poteau avec un des côtés du toit ?\nc) Peut-on faire ce toit avec deux côtés de $3$ m et une poutre de $6{,}5$ m ?",
          figure: tri({ A: [0, 0], B: [6, 0], C: [3, 2.3439] }, { angles: { C: "104°", A: "?", B: "?" }, trouve: ["A", "B"], egaux: ["BC", "CA"], lignes: [{ de: [3, 2.3439], vers: [3, 0], couleur: "gris", pointilles: true }] }),
          correction:
            "a) Les deux angles du bas sont égaux (triangle isocèle).\nIls se partagent $180 - 104 = 76$. Donc $76 \\div 2 = 38$ : chacun mesure $38°$.\nb) Je regarde le petit triangle de gauche : un angle de $38°$, un angle droit, et l'angle cherché.\n$38 + 90 = 128$. Puis $180 - 128 = 52$. Le poteau fait $52°$ avec le côté du toit.\n⭐ Contrôle : $52 + 52 = 104$, l'angle du haut.\nc) $3 + 3 = 6$ m. C'est plus petit que $6{,}5$ m : les deux côtés ne se rejoignent pas. Non.\n⛔ Le piège au b) : oublier l'angle droit entre le poteau et la poutre.\nRéponse : a) $38°$ ; b) $52°$ ; c) non.",
          micros: ["triangle_angle_manquant", "triangle_somme_angle", "triangle_possible_ou_non"],
        },
        {
          titre: "Les trois villages",
          enonce: "Trois villages $A$, $B$ et $C$ sont reliés par des routes droites. De $A$ à $B$ : $12$ km. De $B$ à $C$ : $5$ km.\na) La route de $A$ à $C$ peut-elle mesurer $6$ km ? $15$ km ? $17$ km ? $19$ km ?\nb) Si $AC = 17$ km, où est le village $B$ ?\nc) Si $AC = 15$ km, de combien le détour par $B$ allonge-t-il le trajet ?",
          correction:
            "a) Je compare chaque fois le plus grand côté aux deux autres.\n$6$ km : $5 + 6 = 11$, plus petit que $12$. Non.\n$15$ km : $12 + 5 = 17$, plus grand que $15$. Oui.\n$17$ km : $12 + 5 = 17$, égal. Les trois villages sont alignés.\n$19$ km : $12 + 5 = 17$, plus petit que $19$. Non.\nb) Avec $17$ km, le triangle est aplati : $B$ est sur la route de $A$ à $C$.\nc) Par $B$ : $12 + 5 = 17$ km. Tout droit : $15$ km. Le détour allonge de $17 - 15 = 2$ km.\n⛔ Le piège : oublier le cas égal. $17$ km marche, mais il n'y a plus de triangle.\nRéponse : a) $6$ non, $15$ oui, $17$ alignés, $19$ non ; b) sur la route ; c) $2$ km.",
          schema: ecranSeulement(longueurs([{ grand: 12, petits: [5, 6] }, { grand: 15, petits: [12, 5] }, { grand: 17, petits: [12, 5] }, { grand: 19, petits: [12, 5] }], "km")),
          micros: ["triangle_possible_ou_non", "triangle_propriete_defi"],
        },
        {
          titre: "Les dix bâtonnets",
          enonce: "Sami a $10$ bâtonnets identiques. Il veut faire un triangle avec TOUS les bâtonnets.\nChaque côté est fait d'un nombre entier de bâtonnets.\na) Peut-il faire un triangle de côtés $1$, $4$ et $5$ bâtonnets ?\nb) Trouve tous les triangles possibles.\nc) Quelle est leur nature ?",
          schema: longueurs([{ grand: 5, petits: [1, 4] }, { grand: 4, petits: [2, 4] }, { grand: 4, petits: [3, 3] }], "bâtonnets"),
          correction:
            "a) $1 + 4 = 5$ : égal au grand côté. Triangle aplati : non.\nb) J'écris toutes les façons de faire $10$ avec trois nombres, du plus petit au plus grand.\n$1+1+8$, $1+2+7$, $1+3+6$, $1+4+5$, $2+2+6$, $2+3+5$, $2+4+4$, $3+3+4$.\nJe teste chacune. Seules deux marchent :\n$2$, $4$, $4$ : $2 + 4 = 6$, plus grand que $4$. Oui.\n$3$, $3$, $4$ : $3 + 3 = 6$, plus grand que $4$. Oui.\nc) Les deux ont deux côtés égaux : ils sont isocèles.\n⛔ Le piège : oublier une façon. Je les range dans l'ordre pour n'en rater aucune.\nRéponse : a) non ; b) $2$-$4$-$4$ et $3$-$3$-$4$ ; c) isocèles.",
          micros: ["triangle_possible_ou_non", "triangle_propriete_defi"],
        },
        {
          titre: "Les trois coins de papier",
          enonce: "Emma découpe un triangle en papier. Deux de ses angles mesurent $52°$ et $75°$.\nElle déchire les trois coins et les colle côte à côte, les sommets au même point.\na) Combien mesure le troisième angle ?\nb) Que forment les trois coins collés ?\nc) Est-ce un hasard ?",
          figure: deux(
            tri({ A: [0, 0], B: [6, 0], C: [4.4677, 5.7185] }, { angles: { A: "52°", B: "75°", C: "?" }, trouve: ["C"] }),
            geo({ traits: [{ de: [-4, 0], vers: [4, 0] }, { de: [0, 0], vers: [1.847, 2.364] }, { de: [0, 0], vers: [-1.8054, 2.3959] }], arcs: [{ en: [0, 0], de: [4, 0], vers: [1.847, 2.364], label: "52°", rayon: 34 }, { en: [0, 0], de: [1.847, 2.364], vers: [-1.8054, 2.3959], label: "75°", rayon: 26 }, { en: [0, 0], de: [-1.8054, 2.3959], vers: [-4, 0], label: "?", plein: true, rayon: 34 }] }),
          ),
          correction:
            "a) $52 + 75 = 127$. Puis $180 - 127 = 53$. Le troisième angle mesure $53°$.\nb) Les trois coins font $52 + 75 + 53 = 180$. Ensemble, ils forment un angle plat.\nLeurs bords extérieurs sont alignés : une ligne droite.\nc) Non. Avec n'importe quel triangle, les trois coins forment un angle plat.\nC'est une façon de VOIR la règle des $180°$.\n⛔ Le piège : croire que ça ne marche qu'avec ce triangle. Essaie avec le tien !\nRéponse : a) $53°$ ; b) un angle plat ; c) non, c'est toujours vrai.",
          micros: ["triangle_somme_angle", "triangle_angle_manquant", "triangle_propriete_defi"],
        },
      ],
    },
  ],
};
