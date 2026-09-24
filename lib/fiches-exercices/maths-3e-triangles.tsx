// ─── Fiche d'exercices : les triangles (3e) — 20 exercices corrigés ─────────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-triangles.tsx` et sur les
// micros du coach de 3e (notionId triangle_figure). L'angle de la 3e : la SOMME
// DES ANGLES (180°), les familles de triangles qui s'emboîtent, l'inégalité
// triangulaire, et les données qui déterminent un triangle unique.
// ⛔ Ni Pythagore, ni Thalès, ni trigonométrie : ce sont d'autres notions. Les
// angles donnés « environ » (Louvre, voile) le sont dans l'énoncé, jamais
// calculés par un cosinus.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 55° et 70°, ni
// l'isocèle de sommet 40°, ni 100° + 50° + 40°, ni 90° et 35°.
//
// Les pièges qui reviennent : diviser 180 par deux dans un isocèle sans retirer
// le sommet (3, 4, 16), oublier l'angle droit (2, 13, 20), tester un autre côté
// que le PLUS GRAND (6, 18), prendre l'égalité pour un triangle (10, 15).
//
// Les chiffres du monde, et d'où ils viennent :
// - échelle : l'INRS recommande de l'incliner d'environ 75° (un pied d'écart pour
//   quatre de hauteur) — ex. 2 ;
// - étoile à cinq branches régulière : chaque pointe a un angle de 36° — ex. 3 ;
// - panneaux de danger : triangles équilatéraux (arrêté du 24/11/1967 sur la
//   signalisation, instruction interministérielle, 1re partie) — ex. 8 ;
// - poutre Warren : brevetée en 1848 par James Warren et Willoughby Monzani,
//   triangles équilatéraux alternés — ex. 17 ;
// - pyramide du Louvre (I. M. Pei, 1989) : base carrée de 35,42 m, hauteur
//   21,64 m (musée du Louvre). Apothème √(21,64² + 17,71²) ≈ 27,96 m, d'où un
//   angle à la base des faces de 57,7°, « environ 58° », et des arêtes de
//   ≈ 33,1 m — ex. 18 ;
// - Paris, Lyon, Marseille : distances orthodromiques calculées depuis les
//   coordonnées des trois hôtels de ville (haversine, R = 6 371 km) : 391,5 km,
//   277,6 km, 660,5 km, arrondies à 391, 278 et 660 km — ex. 19.
//
// Les corrigés sont écrits à la première personne (« je retranche »), comme les
// autres feuilles de 3e.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : presque chaque corrigé
// dessine son triangle À L'ÉCHELLE, les angles écrits en degrés, l'angle TROUVÉ
// surligné en orange. `tri()` est un SVG local — le canvas `triangle()` des
// figures écrit tous ses angles de la même couleur, à une place fixe, et ne sait
// pas surligner. Il prend les VRAIES coordonnées, comme `triangle()`.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-triangles-3e.mjs` — le
// script relit chaque `tri(…)`, mesure ses angles par le produit scalaire, et
// vérifie que les étiquettes en degrés, l'angle droit, les côtés codés égaux et
// les longueurs à l'échelle sont ceux du DESSIN.
//
// Micro-compétences : triangle_reconnaitre (3, 4, 5, 8, 9, 13, 16, 17, 18),
// triangle_angle (1, 2, 3, 4, 5, 7, 8, 9, 11, 13, 14, 16, 17, 18, 20),
// triangle_inegalite (6, 10, 12, 15, 18, 19, 20), triangle_construire (7, 11,
// 12, 20), triangle_defi (14, 15, 16, 17, 19). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type P2 = [number, number];
type Sommet = "A" | "B" | "C";
type Cote = "AB" | "BC" | "CA";

const ENCRE = "#0f172a";
const VIOLET = "#7c3aed";
const ORANGE = "#ea580c";
const BLEU = "#0369a1";
const VERT = "#16a34a";

const unit = (x: number, y: number): P2 => {
  const n = Math.hypot(x, y) || 1;
  return [x / n, y / n];
};

/**
 * ⭐ UN TRIANGLE À L'ÉCHELLE, ses angles écrits en degrés, l'angle TROUVÉ
 * surligné (secteur orange, nombre en orange). Coordonnées VRAIES, y vers le
 * haut ; les étiquettes se placent vers l'extérieur (côtés, sommets) ou sur la
 * bissectrice (angles). `egaux` code les côtés égaux d'un trait ; `exterieur`
 * prolonge un côté en pointillés et marque l'angle extérieur.
 * ⛔ Texte NU (« 35° », « 8 cm ») : SVG, pas de KaTeX.
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
    exterieur?: { en: Sommet; depuis: Sommet; label: string };
  } = {},
) => {
  const W = 260, H = 200, m = 36;
  const reels: P2[] = [pts.A, pts.B, pts.C];
  const ext = opts.exterieur;
  let bout: P2 | null = null;
  if (ext) {
    const [e, d] = [pts[ext.en], pts[ext.depuis]];
    bout = [e[0] + (e[0] - d[0]) * 0.4, e[1] + (e[1] - d[1]) * 0.4];
    reels.push(bout);
  }
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * m) / (x1 - x0 || 1), (H - 2 * m) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const P: Record<Sommet, P2> = { A: px(pts.A), B: px(pts.B), C: px(pts.C) };
  const G: P2 = [(P.A[0] + P.B[0] + P.C[0]) / 3, (P.A[1] + P.B[1] + P.C[1]) / 3];
  const voisins: Record<Sommet, [Sommet, Sommet]> = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };
  const trouve = new Set(opts.trouve ?? []);
  type Ancre = "start" | "middle" | "end";
  const ancre = (dx: number): Ancre => (dx > 0.45 ? "start" : dx < -0.45 ? "end" : "middle");

  const arc = (V: P2, u1: P2, u2: P2, r: number, plein: boolean, couleur: string, key: string) => {
    const a: P2 = [V[0] + u1[0] * r, V[1] + u1[1] * r];
    const b: P2 = [V[0] + u2[0] * r, V[1] + u2[1] * r];
    const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
    const d = `M ${a[0].toFixed(1)} ${a[1].toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
    return (
      <g key={key}>
        {plein ? <path d={`M ${V[0].toFixed(1)} ${V[1].toFixed(1)} L ${d.slice(2)} Z`} fill={ORANGE} fillOpacity={0.3} /> : null}
        <path d={d} fill="none" stroke={couleur} strokeWidth={plein ? 2.4 : 1.6} />
      </g>
    );
  };
  const etiquette = (x: number, y: number, t: string, couleur: string, taille: number, anchor: Ancre, key: string, gras = true) => (
    <text key={key} x={x.toFixed(1)} y={y.toFixed(1)} textAnchor={anchor} dominantBaseline="middle" fontSize={taille} fontWeight={gras ? 800 : 600} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
      {t}
    </text>
  );

  const cotes = (["AB", "BC", "CA"] as Cote[]).map((c) => [c, P[c[0] as Sommet], P[c[1] as Sommet]] as const);

  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Triangle dessiné à l'échelle">
        <polygon points={`${P.A.join(",")} ${P.B.join(",")} ${P.C.join(",")}`} fill="#f8fafc" stroke={ENCRE} strokeWidth={2.4} strokeLinejoin="round" />
        {ext && bout ? (() => {
          const E = P[ext.en], Bt = px(bout);
          const autre = voisins[ext.en].find((v) => v !== ext.depuis) as Sommet;
          const u1 = unit(Bt[0] - E[0], Bt[1] - E[1]);
          const u2 = unit(P[autre][0] - E[0], P[autre][1] - E[1]);
          const bi = unit(u1[0] + u2[0], u1[1] + u2[1]);
          return (
            <g>
              <line x1={E[0]} y1={E[1]} x2={Bt[0]} y2={Bt[1]} stroke="#64748b" strokeWidth={1.8} strokeDasharray="5 4" />
              {arc(E, u1, u2, 16, false, VIOLET, "ext")}
              {etiquette(E[0] + bi[0] * 32, E[1] + bi[1] * 32, ext.label, VIOLET, 14, "middle", "extl")}
            </g>
          );
        })() : null}
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
          // ⛔ VU AU RENDU (24/09) : un angle de moins de 25° n'a pas la place
          // de son nombre, qui chevauchait un côté (l'échelle, la voile). On
          // l'écrit À CÔTÉ du coin, du côté gauche, aligné à droite.
          let perp = unit(-bi[1], bi[0]);
          if (perp[0] > 0) perp = [-perp[0], -perp[1]];
          const [lx, ly, la]: [number, number, Ancre] =
            ouvert < 25 ? [V[0] + bi[0] * (r + 12) + perp[0] * 8, V[1] + bi[1] * (r + 12) + perp[1] * 8, "end"] : [V[0] + bi[0] * loin, V[1] + bi[1] * loin, "middle"];
          return (
            <g key={k}>
              {k === opts.droit ? null : arc(V, u1, u2, r, t, t ? ORANGE : VIOLET, `a${k}`)}
              {etiquette(lx, ly, opts.angles?.[k] ?? "", t ? ORANGE : VIOLET, 14, la, `l${k}`)}
            </g>
          );
        })}
        {opts.droit ? (() => {
          const V = P[opts.droit];
          const [p, q] = voisins[opts.droit].map((v) => P[v]);
          const u1 = unit(p[0] - V[0], p[1] - V[1]);
          const u2 = unit(q[0] - V[0], q[1] - V[1]);
          const c = 11;
          return (
            <path
              d={`M ${V[0] + u1[0] * c} ${V[1] + u1[1] * c} L ${V[0] + (u1[0] + u2[0]) * c} ${V[1] + (u1[1] + u2[1]) * c} L ${V[0] + u2[0] * c} ${V[1] + u2[1] * c}`}
              fill="none"
              stroke="#dc2626"
              strokeWidth={2.2}
            />
          );
        })() : null}
        {(opts.egaux ?? []).map((c) => {
          const [p, q] = [P[c[0] as Sommet], P[c[1] as Sommet]];
          const M: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
          const n = unit(-(q[1] - p[1]), q[0] - p[0]);
          return <line key={`e${c}`} x1={M[0] - n[0] * 6} y1={M[1] - n[1] * 6} x2={M[0] + n[0] * 6} y2={M[1] + n[1] * 6} stroke={ENCRE} strokeWidth={2.2} />;
        })}
        {cotes.map(([c, p, q]) => {
          const t = opts.cotes?.[c];
          if (!t) return null;
          const M: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
          let n = unit(-(q[1] - p[1]), q[0] - p[0]);
          if (n[0] * (M[0] - G[0]) + n[1] * (M[1] - G[1]) < 0) n = [-n[0], -n[1]];
          return etiquette(M[0] + n[0] * 14, M[1] + n[1] * 14, t, BLEU, 14, ancre(n[0]), `c${c}`);
        })}
        {(["A", "B", "C"] as Sommet[]).map((k) => {
          const V = P[k];
          const d = unit(V[0] - G[0], V[1] - G[1]);
          return (
            <g key={`s${k}`}>
              <circle cx={V[0]} cy={V[1]} r={3.5} fill={ENCRE} />
              {etiquette(V[0] + d[0] * 15, V[1] + d[1] * 15, opts.noms?.[k] ?? k, ENCRE, 15, ancre(d[0]), `n${k}`, true)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Deux dessins côte à côte (l'un sous l'autre sur téléphone). */
const deux = (a: ReactNode, b: ReactNode) => <div className="grid gap-2 sm:grid-cols-2">{a}{b}</div>;

const nombre = (x: number) => String(x).replace(".", ",");

/**
 * ⭐ L'INÉGALITÉ TRIANGULAIRE, VUE : en haut le plus grand côté (bleu), en
 * dessous les deux autres mis bout à bout (orange, vert), à la même échelle.
 * Le pointillé marque le bout du grand côté : les deux petits l'atteignent-ils ?
 * ⭐ Le script de recalcul relit `{ grand, petits }` : en clair.
 */
const longueurs = (cas: { grand: number; petits: [number, number] }[], unite = "cm") => {
  const s = 200 / Math.max(...cas.map((c) => Math.max(c.grand, c.petits[0] + c.petits[1])));
  const h = 78;
  return (
    <div className="mx-auto w-full max-w-[19rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 260 ${h * cas.length}`} className="block h-auto w-full" role="img" aria-label="Le plus grand côté comparé aux deux autres mis bout à bout">
        {cas.map(({ grand, petits: [a, b] }, i) => {
          const y = i * h;
          const x0 = 22;
          const somme = a + b;
          const verdict = somme > grand ? "triangle" : somme === grand ? "aplati" : "pas de triangle";
          return (
            <g key={i}>
              <rect x={x0} y={y + 16} width={grand * s} height={9} rx={2} fill={BLEU} />
              <text x={x0 + (grand * s) / 2} y={y + 10} textAnchor="middle" fontSize={13} fontWeight={800} fill={BLEU}>
                {`${nombre(grand)} ${unite}`}
              </text>
              <rect x={x0} y={y + 38} width={a * s} height={9} rx={2} fill={ORANGE} />
              <rect x={x0 + a * s} y={y + 38} width={b * s} height={9} rx={2} fill={VERT} />
              <text x={x0 + (a * s) / 2} y={y + 62} textAnchor="middle" fontSize={13} fontWeight={800} fill={ORANGE}>
                {nombre(a)}
              </text>
              <text x={x0 + a * s + (b * s) / 2} y={y + 62} textAnchor="middle" fontSize={13} fontWeight={800} fill={VERT}>
                {nombre(b)}
              </text>
              <line x1={x0 + grand * s} y1={y + 12} x2={x0 + grand * s} y2={y + 52} stroke={ENCRE} strokeWidth={1.4} strokeDasharray="3 3" />
              <text x={254} y={y + 62} textAnchor="end" fontSize={12} fontWeight={700} fill={somme > grand ? VERT : "#dc2626"}>
                {verdict}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * ⭐ LA POUTRE EN TREILLIS (ex. 17) : quatre triangles isocèles pointe en haut,
 * trois pointe en bas, base 2, hauteur `hauteur` (en unités). Au nœud du haut
 * n° 2, les trois angles sous la barre : base, sommet, base.
 * ⭐ Le script de recalcul retrouve ces angles depuis la hauteur.
 */
const treillis = (hauteur: number, angles: [string, string, string]) => {
  const s = 29, x0 = 14, marge = 14;
  const H = hauteur * s + 2 * marge;
  const pt = (x: number, y: number): P2 => [x0 + x * s, marge + (hauteur - y) * s];
  const bas = [0, 2, 4, 6, 8].map((x) => pt(x, 0));
  const haut = [1, 3, 5, 7].map((x) => pt(x, hauteur));
  const zig = [bas[0], haut[0], bas[1], haut[1], bas[2], haut[2], bas[3], haut[3], bas[4]];
  const N = haut[1];
  const dirs: P2[] = [haut[0], bas[1], bas[2], haut[2]].map((p) => unit(p[0] - N[0], p[1] - N[1]));
  return (
    <div className="mx-auto w-full max-w-[19rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 260 ${H.toFixed(0)}`} className="block h-auto w-full" role="img" aria-label="Poutre en treillis : triangles alternés">
        <line x1={bas[0][0]} y1={bas[0][1]} x2={bas[4][0]} y2={bas[4][1]} stroke={ENCRE} strokeWidth={3} />
        <line x1={haut[0][0]} y1={haut[0][1]} x2={haut[3][0]} y2={haut[3][1]} stroke={ENCRE} strokeWidth={3} />
        <polyline points={zig.map((p) => p.join(",")).join(" ")} fill="none" stroke={ENCRE} strokeWidth={2} />
        {[0, 1, 2].map((i) => {
          const [u1, u2] = [dirs[i], dirs[i + 1]];
          const r = 12;
          const a: P2 = [N[0] + u1[0] * r, N[1] + u1[1] * r];
          const b: P2 = [N[0] + u2[0] * r, N[1] + u2[1] * r];
          const bi = unit(u1[0] + u2[0], u1[1] + u2[1]);
          const couleur = i === 1 ? ORANGE : VIOLET;
          return (
            <g key={i}>
              <path d={`M ${N[0]} ${N[1]} L ${a[0]} ${a[1]} A ${r} ${r} 0 0 0 ${b[0]} ${b[1]} Z`} fill={couleur} fillOpacity={0.25} stroke={couleur} strokeWidth={1.4} />
              <text x={N[0] + bi[0] * 27} y={N[1] + bi[1] * 27} textAnchor="middle" dominantBaseline="middle" fontSize={12} fontWeight={800} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
                {angles[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesTriangles3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "triangle-figure",
  titre: "Les triangles : angles, familles et existence",
  accroche:
    "Vingt exercices, du calcul seul au problème : trouver un angle manquant, reconnaître un triangle isocèle, équilatéral ou rectangle, tester si trois longueurs ou trois angles forment un triangle, puis raisonner sur un pont, la pyramide du Louvre, une voile ou la carte de France. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le triangle dessiné à l'échelle, l'angle trouvé en orange, et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/triangle-figure", titre: "Les triangles : angles, familles et existence" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je vérifie toujours que mes trois angles font bien 180 degrés.",
      rappel: [
        "Dans TOUT triangle, les trois angles font $180°$ au total : $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180°$. Pour trouver le troisième, je retranche les deux connus de $180$.",
        "Triangle rectangle : l'angle droit prend $90°$, les deux angles aigus se partagent les $90°$ qui restent.",
        "Isocèle : deux côtés égaux, et les deux angles à la base égaux. Équilatéral : trois côtés égaux et trois angles de $60°$ — il est aussi isocèle.",
        "Inégalité triangulaire : trois longueurs forment un triangle seulement si la PLUS GRANDE est plus petite que la somme des deux autres.",
      ],
      exercices: [
        {
          enonce: "Dans le triangle $ABC$, $\\widehat{A} = 48°$ et $\\widehat{B} = 67°$.\na) Calculer $\\widehat{C}$.\nb) Le triangle est-il isocèle ?",
          correction:
            "a) Les trois angles d'un triangle font toujours $180°$. Il ne m'en manque qu'un : je retranche les deux connus.\nJ'additionne d'abord les deux angles connus : $48 + 67 = 115$.\nJe retranche de $180$ : $\\widehat{C} = 180° - 115° = 65°$.\nJe vérifie : $48 + 67 + 65 = 180$. C'est juste.\nb) Les trois angles $48°$, $67°$ et $65°$ sont tous différents : aucun couple d'angles égaux, donc le triangle n'est pas isocèle.\n⛔ Le piège : retrancher de $360°$, le tour complet. On trouverait $245°$ : plus qu'un angle plat, impossible dans un triangle.\nRéponse : $\\widehat{C} = 65°$, et le triangle n'est pas isocèle.",
          schema: tri({ A: [0, 0], B: [6, 0], C: [4.078, 4.529] }, { angles: { A: "48°", B: "67°", C: "65°" }, trouve: ["C"] }),
          micros: ["triangle_angle"],
        },
        {
          enonce:
            "Une échelle $[PH]$ est posée contre un mur vertical : son pied $P$ est sur le sol horizontal, son sommet $H$ contre le mur. Avec $M$ le pied du mur, le triangle $PMH$ est rectangle en $M$. Pour qu'elle ne glisse pas, l'échelle fait un angle de $75°$ avec le sol.\nQuel angle fait-elle avec le mur ?",
          correction:
            "Le triangle $PMH$ est rectangle en $M$ : l'angle droit prend déjà $90°$ sur les $180°$.\nIl reste $180 - 90 = 90$ degrés pour les deux autres angles, $\\widehat{P}$ et $\\widehat{H}$.\nDonc $\\widehat{H} = 90° - 75° = 15°$.\nJe vérifie : $75 + 90 + 15 = 180$.\n⛔ Le piège : calculer $180° - 75° = 105°$ en oubliant l'angle droit. Un angle de plus de $90°$ ne tient pas à côté d'un angle droit dans un triangle.\nRéponse : l'échelle fait un angle de $15°$ avec le mur.",
          schema: tri({ A: [0, 0], B: [1, 0], C: [1, 3.732] }, { noms: { A: "P", B: "M", C: "H" }, angles: { A: "75°", C: "15°" }, trouve: ["C"], droit: "B" }),
          micros: ["triangle_angle"],
        },
        {
          enonce: "Chaque pointe d'une étoile régulière à cinq branches est un triangle isocèle dont l'angle au sommet mesure $36°$.\nCalculer ses deux angles à la base.",
          correction:
            "Le triangle est isocèle : ses deux angles à la base sont ÉGAUX.\nJe retire d'abord l'angle au sommet : $180 - 36 = 144$. Il reste $144°$ pour les deux angles à la base.\nJe partage en deux parts égales : $144 \\div 2 = 72$.\nJe vérifie : $36 + 72 + 72 = 180$.\n⛔ Le piège : diviser $180$ par deux, soit $90°$ chacun, sans retirer le sommet. Contrôle : $36 + 90 + 90 = 216$, beaucoup trop.\nRéponse : les deux angles à la base mesurent $72°$ chacun.",
          schema: tri({ A: [0, 0], B: [3, 0], C: [1.5, 4.617] }, { angles: { A: "72°", B: "72°", C: "36°" }, trouve: ["A", "B"], egaux: ["BC", "CA"] }),
          micros: ["triangle_angle", "triangle_reconnaitre"],
        },
        {
          enonce: "Le pignon d'un chalet est un triangle isocèle. Ses deux angles à la base mesurent chacun $38°$.\nCalculer l'angle au sommet, sous le faîte du toit. Quelle est la nature de ce triangle ?",
          correction:
            "Les deux angles à la base sont égaux : ensemble, ils font $38 + 38 = 76$ degrés.\nL'angle au sommet prend le reste : $180 - 76 = 104$.\nJe vérifie : $38 + 38 + 104 = 180$.\n$104°$ dépasse $90°$ : le triangle est isocèle ET obtusangle.\n⛔ Le piège : calculer $180 - 38 = 142$, en ne retirant qu'UN angle à la base. Il y en a deux.\nRéponse : l'angle au sommet mesure $104°$ ; le pignon est un triangle isocèle obtusangle.",
          schema: tri({ A: [0, 0], B: [6, 0], C: [3, 2.344] }, { angles: { A: "38°", B: "38°", C: "104°" }, trouve: ["C"], egaux: ["BC", "CA"] }),
          micros: ["triangle_angle", "triangle_reconnaitre"],
        },
        {
          enonce:
            "Donner la nature de chaque triangle (il peut en avoir deux).\na) $DEF$ avec $DE = EF = FD = 7$ cm.\nb) $GHI$ avec $\\widehat{G} = 30°$, $\\widehat{H} = 75°$ et $\\widehat{I} = 75°$.\nc) $JKL$ avec $\\widehat{J} = 45°$ et $\\widehat{K} = 45°$.\nd) $MNO$ avec $MN = 6$ cm, $NO = 6$ cm et $MO = 8$ cm.",
          correction:
            "Je regarde les côtés (des côtés égaux ?), puis les angles (un angle droit ? deux angles égaux ?).\na) Trois côtés égaux : $DEF$ est équilatéral. Il est AUSSI isocèle, puisqu'il a au moins deux côtés égaux.\nb) Deux angles égaux, $\\widehat{H} = \\widehat{I} = 75°$ : $GHI$ est isocèle en $G$, le sommet de l'angle différent.\nc) Je calcule le troisième angle : $\\widehat{L} = 180° - 45° - 45° = 90°$. $JKL$ est rectangle en $L$, et ses deux angles de $45°$ sont égaux : il est aussi isocèle. C'est un triangle rectangle isocèle.\nd) $MN = NO$ : $MNO$ est isocèle en $N$. Pas équilatéral : le troisième côté mesure $8$ cm.\n⛔ Le piège au c) : s'arrêter à « isocèle ». Un triangle peut cumuler deux natures : je calcule toujours le troisième angle.\nRéponse : a) équilatéral, donc isocèle ; b) isocèle en $G$ ; c) rectangle isocèle en $L$ ; d) isocèle en $N$.",
          schema: deux(
            tri({ A: [5.598, 1.5], B: [5.598, -1.5], C: [0, 0] }, { noms: { A: "H", B: "I", C: "G" }, angles: { A: "75°", B: "75°", C: "30°" }, egaux: ["BC", "CA"] }),
            tri({ A: [0, 0], B: [4, 0], C: [2, 2] }, { noms: { A: "J", B: "K", C: "L" }, angles: { A: "45°", B: "45°", C: "90°" }, trouve: ["C"], droit: "C", egaux: ["BC", "CA"] }),
          ),
          micros: ["triangle_reconnaitre", "triangle_angle"],
        },
        {
          enonce: "Peut-on construire un triangle avec ces trois longueurs ?\na) $4$ cm, $6$ cm et $11$ cm.\nb) $5$ cm, $7$ cm et $9$ cm.\nc) $10$ cm, $2$ cm et $9$ cm.",
          correction:
            "Je repère la PLUS GRANDE longueur, et je la compare à la somme des deux autres.\na) La plus grande est $11$. $4 + 6 = 10$, et $10 < 11$ : les deux petits côtés, mis bout à bout, n'atteignent pas l'autre bout du grand. Pas de triangle.\nb) La plus grande est $9$. $5 + 7 = 12$, et $12 > 9$ : le triangle existe.\nc) La plus grande est $10$, même écrite en premier. $2 + 9 = 11$, et $11 > 10$ : le triangle existe.\n⛔ Le piège : tester un autre côté que le plus grand. Au a), $4 < 6 + 11$ est vrai, et pourtant le triangle n'existe pas. Seul le plus grand côté décide.\nRéponse : a) non ; b) oui ; c) oui.",
          schema: longueurs([{ grand: 11, petits: [4, 6] }, { grand: 9, petits: [5, 7] }, { grand: 10, petits: [2, 9] }]),
          micros: ["triangle_inegalite"],
        },
        {
          enonce: "Existe-t-il un triangle qui a ces trois angles ?\na) $62°$, $58°$ et $60°$.\nb) $95°$, $45°$ et $45°$.\nc) $30°$, $90°$ et $60°$.",
          correction:
            "Un triangle existe avec ces angles seulement si leur somme vaut EXACTEMENT $180°$.\na) $62 + 58 + 60 = 180$ : oui.\nb) $95 + 45 + 45 = 185$ : non, $5°$ de trop. Avec $95°$ et $45°$, le troisième angle est forcé : $180 - 95 - 45 = 40$, pas $45$.\nc) $30 + 90 + 60 = 180$ : oui, c'est un triangle rectangle.\n⛔ Le piège au b) : « $185$, c'est presque $180$, ça passe ». La somme vaut $180$ exactement : à $185°$, les côtés ne se referment pas.\nRéponse : a) oui ; b) non ; c) oui.",
          schema: deux(
            tri({ A: [0, 0], B: [5, 0], C: [2.299, 4.323] }, { angles: { A: "62°", B: "58°", C: "60°" } }),
            tri({ A: [0, 0], B: [5, 0], C: [5, 2.887] }, { angles: { A: "30°", B: "90°", C: "60°" }, droit: "B" }),
          ),
          micros: ["triangle_angle", "triangle_construire"],
        },
        {
          enonce:
            "Les panneaux de danger du code de la route sont des triangles équilatéraux.\na) Deux angles d'un triangle mesurent $60°$. Calculer le troisième.\nb) Combien mesure chaque angle d'un panneau de danger ?\nc) Un grand panneau d'autoroute a-t-il de plus grands angles qu'un petit panneau de ville ?",
          correction:
            "a) $180 - 60 - 60 = 60$ : le troisième angle mesure lui aussi $60°$. Trois angles égaux : ce triangle est équilatéral.\nb) Un triangle équilatéral a trois angles égaux qui se partagent $180°$ : $180 \\div 3 = 60$. Chaque angle mesure $60°$.\nc) Non. Les deux sont équilatéraux : leurs angles mesurent tous $60°$. La taille change les CÔTÉS, jamais les angles.\n⛔ Le piège : croire qu'un plus grand triangle a de plus grands angles. La somme reste $180°$ quelle que soit la taille.\nRéponse : chaque angle mesure $60°$, sur tous les panneaux de danger.",
          schema: tri({ A: [0, 0], B: [4, 0], C: [2, 3.464] }, { angles: { A: "60°", B: "60°", C: "60°" }, trouve: ["C"], egaux: ["AB", "BC", "CA"] }),
          micros: ["triangle_reconnaitre", "triangle_angle"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au brevet. Je fais un schéma à main levée, je code ce que je sais, puis je calcule.",
      rappel: [
        "Un angle inconnu s'appelle $x$ : j'écris que la somme des trois angles vaut $180$, puis je résous l'équation.",
        "L'inégalité, dans les deux sens : un côté est plus PETIT que la somme des deux autres, et plus GRAND que leur différence.",
        "Un seul triangle possible avec : trois côtés ; deux côtés et l'angle compris entre eux ; un côté et ses deux angles. Trois angles seuls fixent la FORME, pas la taille.",
        "Deux angles côte à côte qui forment un angle plat font $180°$ ensemble.",
      ],
      exercices: [
        {
          enonce:
            "Les angles d'un triangle $ABC$ mesurent, en degrés, $\\widehat{A} = x$, $\\widehat{B} = 2x$ et $\\widehat{C} = 3x$.\na) Écrire une équation et trouver $x$.\nb) En déduire les trois angles.\nc) Quelle est la nature du triangle ?",
          correction:
            "a) La somme des trois angles vaut $180°$ : $x + 2x + 3x = 180$, soit $6x = 180$, donc $x = 180 \\div 6 = 30$.\nb) $\\widehat{A} = 30°$, $\\widehat{B} = 2 \\times 30° = 60°$ et $\\widehat{C} = 3 \\times 30° = 90°$.\nJe vérifie : $30 + 60 + 90 = 180$.\nc) $\\widehat{C} = 90°$ : le triangle est rectangle en $C$.\n⛔ Le piège : s'arrêter à $x = 30$. L'inconnue n'est pas la réponse : il faut encore calculer $2x$ et $3x$.\nRéponse : $30°$, $60°$ et $90°$ ; le triangle $ABC$ est rectangle en $C$.",
          schema: tri({ A: [0, 0], B: [6, 0], C: [4.5, 2.598] }, { angles: { A: "30°", B: "60°", C: "90°" }, trouve: ["A", "B", "C"], droit: "C" }),
          micros: ["triangle_angle", "triangle_reconnaitre"],
        },
        {
          enonce:
            "Un triangle a deux côtés de $5$ cm et $9$ cm. Son troisième côté mesure $L$ cm, un nombre entier.\na) Montrer que $L$ doit être plus grand que $4$ et plus petit que $14$.\nb) Combien de valeurs de $L$ sont possibles ? Les donner.\nc) Pour quelles valeurs de $L$ le triangle est-il isocèle ?",
          correction:
            "a) Le côté $L$ doit être plus petit que la somme des deux autres : $L < 5 + 9$, soit $L < 14$.\nLe côté de $9$ cm doit lui aussi être plus petit que la somme des deux autres : $9 < 5 + L$, soit $L > 4$.\nb) Les entiers strictement entre $4$ et $14$ : $5$, $6$, $7$, $8$, $9$, $10$, $11$, $12$, $13$. Il y en a $13 - 5 + 1 = 9$.\nc) Isocèle : deux côtés égaux. $L = 5$ (deux côtés de $5$ cm) ou $L = 9$ (deux côtés de $9$ cm).\n⛔ Le piège : garder $L = 4$ ou $L = 14$. Avec $4 + 5 = 9$, les trois sommets sont alignés : le triangle est aplati, ce n'en est plus un.\nRéponse : $9$ valeurs, de $5$ à $13$ cm ; isocèle pour $L = 5$ ou $L = 9$.",
          schema: deux(
            tri({ A: [0, 0], B: [9, 0], C: [4.5, 2.179] }, { cotes: { AB: "9 cm", CA: "5 cm", BC: "5 cm" }, egaux: ["BC", "CA"] }),
            tri({ A: [0, 0], B: [9, 0], C: [-3.5, 3.571] }, { cotes: { AB: "9 cm", CA: "5 cm", BC: "13 cm" } }),
          ),
          micros: ["triangle_inegalite"],
        },
        {
          enonce:
            "On veut construire un triangle $ABC$ avec $AB = 8$ cm, $\\widehat{A} = 35°$ et $\\widehat{B} = 50°$.\na) Calculer $\\widehat{C}$. Quelle est la nature du triangle ?\nb) Décrire les étapes de la construction, à la règle et au rapporteur.\nc) Un camarade veut aussi imposer $\\widehat{C} = 90°$. Est-ce possible ?",
          correction:
            "a) $\\widehat{C} = 180° - 35° - 50° = 95°$. Un angle de plus de $90°$ : le triangle est obtusangle en $C$.\nb) Je trace le segment $[AB]$ de $8$ cm. Au rapporteur, je trace en $A$ une demi-droite qui fait $35°$ avec $[AB]$, puis en $B$ une demi-droite qui fait $50°$ avec $[BA]$, du MÊME côté. Elles se coupent en $C$.\nc) Non. Dès que $\\widehat{A}$ et $\\widehat{B}$ sont choisis, $\\widehat{C}$ est forcé : c'est $95°$. On ne choisit pas le troisième angle, on le calcule.\n⭐ Contrôle sur ma figure : je mesure $\\widehat{C}$ au rapporteur, je dois lire environ $95°$.\n⛔ Le piège au b) : tracer les deux demi-droites de part et d'autre de $[AB]$. Elles ne se couperaient jamais.\nRéponse : $\\widehat{C} = 95°$, le triangle est obtusangle ; un côté et ses deux angles suffisent à le construire.",
          schema: tri({ A: [0, 0], B: [8, 0], C: [5.039, 3.529] }, { cotes: { AB: "8 cm" }, angles: { A: "35°", B: "50°", C: "95°" }, trouve: ["C"] }),
          micros: ["triangle_construire", "triangle_angle"],
        },
        {
          enonce:
            "Dans chaque cas, les données déterminent-elles UN SEUL triangle, à la position près ?\na) Trois côtés : $6$ cm, $8$ cm et $9$ cm.\nb) Deux côtés, $5$ cm et $7$ cm, et l'angle de $30°$ compris entre eux.\nc) Trois angles : $40°$, $65°$ et $75°$.\nd) Trois angles : $40°$, $65°$ et $80°$.",
          correction:
            "a) Oui. $9 < 6 + 8 = 14$ : le triangle existe, et trois longueurs le fixent entièrement. C'est pour ça qu'une charpente en triangles ne se déforme pas.\nb) Oui. Je trace l'angle de $30°$, je reporte $5$ cm sur un côté et $7$ cm sur l'autre : le troisième côté est imposé.\nc) Non. $40 + 65 + 75 = 180$ : ces angles conviennent, mais à une infinité de triangles, petits ou grands, qui ont tous la même FORME. Il manque une longueur.\nd) Aucun : $40 + 65 + 80 = 185$, pas $180$. Ce triangle n'existe pas.\n⛔ Le piège au c) : croire que trois données suffisent toujours. Les angles fixent la forme ; seule une longueur fixe la taille.\nRéponse : a) oui ; b) oui ; c) non, une infinité ; d) aucun.",
          schema: deux(
            tri({ A: [0, 0], B: [4, 0], C: [2.875, 2.412] }, { cotes: { AB: "4 cm" }, angles: { A: "40°", B: "65°", C: "75°" } }),
            tri({ A: [0, 0], B: [7, 0], C: [5.031, 4.222] }, { cotes: { AB: "7 cm" }, angles: { A: "40°", B: "65°", C: "75°" } }),
          ),
          micros: ["triangle_construire", "triangle_inegalite"],
        },
        {
          enonce:
            "Un élève a deux équerres dans sa trousse.\na) La première a un angle droit, et ses deux côtés de l'angle droit ont la même longueur. Donner sa nature et ses trois angles.\nb) La seconde a un angle droit et un angle de $30°$. Calculer son troisième angle.\nc) En posant un angle de chaque équerre côte à côte, peut-on former un angle de $75°$ ? de $105°$ ?",
          correction:
            "a) Deux côtés égaux : elle est isocèle. Un angle droit : elle est rectangle. C'est un triangle rectangle isocèle.\nSes deux angles à la base sont égaux et se partagent $180 - 90 = 90$ degrés : $90 \\div 2 = 45$. Ses angles : $90°$, $45°$ et $45°$.\nb) $180 - 90 - 30 = 60$ : le troisième angle mesure $60°$.\nc) $45 + 30 = 75$ et $45 + 60 = 105$ : les deux sont possibles.\n⛔ Le piège au a) : croire qu'un triangle rectangle ne peut pas être isocèle. Les familles se cumulent : ici, les deux côtés égaux sont ceux de l'angle droit.\nRéponse : a) rectangle isocèle, $90°$, $45°$ et $45°$ ; b) $60°$ ; c) oui pour les deux.",
          schema: deux(
            tri({ A: [0, 0], B: [4, 0], C: [2, 2] }, { angles: { A: "45°", B: "45°" }, trouve: ["A", "B"], droit: "C", egaux: ["BC", "CA"] }),
            tri({ A: [0, 0], B: [4, 0], C: [3, 1.732] }, { angles: { A: "30°", B: "60°" }, trouve: ["B"], droit: "C" }),
          ),
          micros: ["triangle_reconnaitre", "triangle_angle"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $\\widehat{A} = 45°$. On prolonge le côté $[AC]$ au-delà de $C$ : l'angle formé en $C$ par ce prolongement et le côté $[CB]$ mesure $120°$.\na) Calculer $\\widehat{ACB}$.\nb) Calculer $\\widehat{B}$.\nc) Comparer $120°$ et $\\widehat{A} + \\widehat{B}$. Est-ce un hasard ?",
          correction:
            "a) L'angle $\\widehat{ACB}$ et l'angle de $120°$ sont côte à côte sur la droite $(AC)$ : ensemble, ils forment un angle plat. $\\widehat{ACB} = 180° - 120° = 60°$.\nb) $\\widehat{B} = 180° - 45° - 60° = 75°$.\nc) $\\widehat{A} + \\widehat{B} = 45 + 75 = 120$ : exactement l'angle extérieur. Ce n'est pas un hasard : l'angle extérieur et $\\widehat{A} + \\widehat{B}$ complètent tous les deux $\\widehat{ACB}$ pour faire $180°$. Ils sont donc égaux, dans tout triangle.\n⛔ Le piège au a) : prendre $120°$ pour un angle du triangle. Il est DEHORS ; l'angle du triangle est son voisin.\nRéponse : $\\widehat{ACB} = 60°$ et $\\widehat{B} = 75°$ ; $45 + 75 = 120$, et c'est vrai dans tout triangle.",
          schema: tri({ A: [0, 0], B: [6, 0], C: [4.732, 4.732] }, { angles: { A: "45°", B: "75°", C: "60°" }, trouve: ["B", "C"], exterieur: { en: "C", depuis: "A", label: "120°" } }),
          micros: ["triangle_angle", "triangle_defi"],
        },
        {
          enonce:
            "Sur le plan d'une ville, trois stations de tramway $A$, $B$ et $C$ vérifient $AB = 4$ km, $BC = 6$ km et $AC = 10$ km.\na) Ces trois longueurs forment-elles un vrai triangle ?\nb) Où se trouve la station $B$ ?\nc) Et si l'on avait $AC = 10{,}5$ km ? Et $AC = 9$ km ?",
          correction:
            "a) La plus grande longueur est $AC = 10$. $AB + BC = 4 + 6 = 10$ : la somme est ÉGALE au plus grand côté, pas plus grande. Le triangle est aplati.\nb) Passer par $B$ ne rallonge pas le trajet de $A$ à $C$ : $B$ est SUR le segment $[AC]$, à $4$ km de $A$. Les trois stations sont alignées.\nc) Avec $10{,}5$ : $4 + 6 = 10$ et $10 < 10{,}5$, impossible, même aplati. Avec $9$ : $10 > 9$, un vrai triangle existe.\n⛔ Le piège : conclure « égal, donc ça marche ». Un vrai triangle demande une inégalité STRICTE ; l'égalité, ce sont trois points alignés.\nRéponse : les stations sont alignées, $B$ est sur $[AC]$ ; $10{,}5$ km est impossible, $9$ km donne un vrai triangle.",
          schema: longueurs([{ grand: 10, petits: [4, 6] }, { grand: 10.5, petits: [4, 6] }, { grand: 9, petits: [4, 6] }], "km"),
          micros: ["triangle_inegalite", "triangle_defi"],
        },
        {
          enonce: "a) Un triangle isocèle a un angle de $110°$. Calculer ses deux autres angles.\nb) Un autre triangle isocèle a un angle de $54°$. Montrer qu'il y a DEUX triangles possibles, et donner leurs angles.",
          correction:
            "a) Un angle de $110°$ ne peut pas être un angle à la base : il y en aurait deux, et $110 + 110 = 220$ dépasse $180$. C'est donc l'angle au sommet. Les deux angles à la base se partagent $180 - 110 = 70$ degrés : $70 \\div 2 = 35$ chacun.\nb) Premier cas : $54°$ est l'angle au sommet. Les angles à la base valent $(180 - 54) \\div 2 = 126 \\div 2 = 63$ degrés. Angles : $54°$, $63°$, $63°$.\nSecond cas : $54°$ est un angle à la base. L'autre angle à la base vaut aussi $54°$, et le sommet $180 - 54 - 54 = 72$ degrés. Angles : $54°$, $54°$, $72°$.\n⛔ Le piège au b) : ne voir qu'un cas. L'énoncé ne dit pas OÙ est l'angle de $54°$ : je teste les deux places.\nRéponse : a) $35°$ et $35°$ ; b) $54°$, $63°$, $63°$ ou bien $54°$, $54°$, $72°$.",
          schema: deux(
            tri({ A: [0, 0], B: [4, 0], C: [2, 3.925] }, { angles: { A: "63°", B: "63°", C: "54°" }, trouve: ["A", "B"], egaux: ["BC", "CA"] }),
            tri({ A: [0, 0], B: [4, 0], C: [2, 2.753] }, { angles: { A: "54°", B: "54°", C: "72°" }, trouve: ["B", "C"], egaux: ["BC", "CA"] }),
          ),
          micros: ["triangle_angle", "triangle_reconnaitre", "triangle_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je dessine, je code les égalités, je calcule, puis je réponds par une phrase.",
      rappel: [
        "Somme des angles : $180°$ dans tout triangle ; les deux angles aigus d'un triangle rectangle font $90°$ ensemble.",
        "Isocèle : les deux angles à la base sont égaux. Trois angles côte à côte qui font $180°$ forment un angle plat : leurs côtés extrêmes sont alignés.",
        "Inégalité triangulaire : le plus grand côté est plus petit que la somme des deux autres. Égalité : les trois points sont alignés.",
      ],
      exercices: [
        {
          titre: "Le pont en treillis",
          enonce:
            "Beaucoup de ponts métalliques portent une poutre en treillis « Warren », brevetée en 1848 : une rangée de triangles, pointe en haut puis pointe en bas, entre deux barres horizontales. Dans le modèle d'origine, tous les triangles sont équilatéraux.\na) Quel angle fait une barre oblique avec la barre du bas ?\nb) En un nœud de la barre du haut, trois angles sont côte à côte sous la barre, chacun pris dans un triangle différent. Calculer leur somme. Qu'en déduire pour la barre du haut ?\nc) Un ingénieur remplace les triangles équilatéraux par des triangles isocèles identiques, d'angle au sommet $50°$. Calculer leurs angles à la base, puis refaire le b).",
          correction:
            "a) Chaque triangle est équilatéral : ses trois angles mesurent $180 \\div 3 = 60$ degrés. La barre oblique fait $60°$ avec la barre du bas.\nb) Au nœud, je trouve l'angle d'un triangle pointe en bas, l'angle au sommet d'un triangle pointe en haut, puis l'angle d'un autre triangle pointe en bas : $60 + 60 + 60 = 180$. Trois angles côte à côte qui font $180°$ forment un angle plat : les morceaux de barre à gauche et à droite du nœud sont dans le prolongement l'un de l'autre. La barre du haut est bien droite.\nc) Angles à la base : $(180 - 50) \\div 2 = 130 \\div 2 = 65$ degrés chacun. Au nœud : un angle à la base, l'angle au sommet, un angle à la base, soit $65 + 50 + 65 = 180$. Encore un angle plat : la barre reste droite.\n⭐ Ce n'est pas un hasard : au nœud, je retrouve les trois angles d'UN triangle, dont la somme vaut toujours $180°$.\n⛔ Le piège au c) : croire que seuls les triangles équilatéraux s'emboîtent en ligne droite. Des triangles isocèles identiques, alternés, le font aussi.\nRéponse : $60°$ ; au nœud, la somme vaut $180°$ et la barre est droite ; avec $50°$ au sommet, les angles à la base valent $65°$ et la barre reste droite.",
          schema: (
            <div className="grid gap-3">
              {treillis(1.732, ["60°", "60°", "60°"])}
              {treillis(2.145, ["65°", "50°", "65°"])}
            </div>
          ),
          micros: ["triangle_angle", "triangle_reconnaitre", "triangle_defi"],
        },
        {
          titre: "La pyramide du Louvre",
          enonce:
            "La pyramide du Louvre, à Paris, a une base carrée de $35{,}42$ m de côté. Ses quatre faces sont des triangles isocèles identiques, dont les angles à la base mesurent environ $58°$.\na) Calculer l'angle au sommet d'une face.\nb) Les deux arêtes obliques d'une face ont la même longueur. Un touriste affirme qu'elles mesurent $17$ m. Est-ce possible ?\nc) Montrer que chaque arête mesure forcément plus de $17{,}71$ m.",
          correction:
            "a) Les deux angles à la base sont égaux : $58 + 58 = 116$. L'angle au sommet vaut $180 - 116 = 64$ degrés.\nb) La base est ici le plus grand côté. Pour que la face existe, elle doit être plus petite que la somme des deux arêtes : $17 + 17 = 34$, et $34 < 35{,}42$. Deux arêtes de $17$ m, partant des deux bouts de la base, ne se rejoindraient pas. Impossible.\nc) Avec deux arêtes de longueur $a$, il faut $a + a > 35{,}42$, soit $2a > 35{,}42$, donc $a > 35{,}42 \\div 2 = 17{,}71$ m.\n⭐ En réalité, chaque arête mesure environ $33$ m : bien plus que $17{,}71$ m.\n⛔ Le piège au b) : tester un petit côté. $17 < 17 + 35{,}42$ est vrai, et pourtant la face n'existe pas. C'est le PLUS GRAND côté, la base, qu'il faut comparer à la somme des deux autres.\nRéponse : l'angle au sommet mesure environ $64°$ ; des arêtes de $17$ m sont impossibles, il leur faut plus de $17{,}71$ m.",
          schema: tri({ A: [0, 0], B: [35.42, 0], C: [17.71, 28.342] }, { cotes: { AB: "35,42 m" }, angles: { A: "58°", B: "58°", C: "64°" }, trouve: ["C"], egaux: ["BC", "CA"] }),
          micros: ["triangle_reconnaitre", "triangle_angle", "triangle_inegalite"],
        },
        {
          titre: "Paris, Lyon, Marseille",
          enonce:
            "À vol d'oiseau, Paris est à $391$ km de Lyon, Lyon à $278$ km de Marseille, et Paris à $660$ km de Marseille.\na) Ces trois villes forment-elles un vrai triangle ?\nb) Un avion va de Paris à Marseille avec une escale à Lyon, en ligne droite à chaque fois. Combien de kilomètres fait-il de plus que le vol direct ?\nc) Que peut-on dire de la position de Lyon ?\nd) Un site affiche : Paris-Lyon $391$ km, Lyon-Marseille $278$ km, Paris-Marseille $680$ km. Pourquoi est-ce forcément faux ?",
          correction:
            "a) Le plus grand côté est Paris-Marseille, $660$ km. $391 + 278 = 669$, et $669 > 660$ : c'est un vrai triangle, de justesse.\nb) Avec l'escale : $391 + 278 = 669$ km. En direct : $660$ km. Il fait $669 - 660 = 9$ km de plus.\nc) La somme dépasse à peine le grand côté : le triangle est presque aplati. Lyon est presque sur la ligne droite de Paris à Marseille, le détour ne fait que $9$ km sur $660$.\nd) $391 + 278 = 669$, et $669 < 680$ : le trajet avec escale serait plus COURT que le vol direct. Or la ligne droite est le plus court chemin : c'est impossible.\n⛔ Le piège : croire que « presque plat » veut dire « pas un triangle ». Tant que $669 > 660$, même de peu, les trois villes ne sont pas alignées.\nRéponse : un vrai triangle, très aplati ; l'escale à Lyon rallonge le trajet de $9$ km seulement.",
          schema: tri({ A: [0, 0], B: [233.2, -617.4], C: [187.2, -343.3] }, { noms: { A: "Paris", B: "Marseille", C: "Lyon" }, cotes: { AB: "660 km", CA: "391 km", BC: "278 km" } }),
          micros: ["triangle_inegalite", "triangle_defi"],
        },
        {
          titre: "La voile du dériveur",
          enonce:
            "La grand-voile d'un petit voilier est un triangle $ATE$ : $A$ est le point d'amure, en bas du mât ; $T$ la tête, en haut du mât ; $E$ le point d'écoute, au bout de la bôme. Le mât est perpendiculaire à la bôme. Le guindant $AT$ mesure $9$ m et la bordure $AE$ mesure $3{,}6$ m.\na) L'angle en tête mesure environ $22°$. Calculer l'angle au point d'écoute.\nb) Entre quelles valeurs la chute $TE$, le troisième côté, doit-elle se trouver ?\nc) Le voilier commande une chute de $12{,}8$ m. Qu'en penser ?\nd) Pour découper la voile, le voilier connaît $AT$, $AE$ et l'angle droit entre eux. Y a-t-il un seul triangle possible ?",
          correction:
            "a) Le triangle $ATE$ est rectangle en $A$ : ses deux angles aigus font $90°$ ensemble. $\\widehat{E} = 90° - 22° = 68°$.\nb) La chute est plus petite que la somme des deux autres côtés : $TE < 9 + 3{,}6 = 12{,}6$.\nEt le guindant, $9$ m, doit être plus petit que $3{,}6 + TE$ : $TE > 9 - 3{,}6 = 5{,}4$.\nDonc $5{,}4 < TE < 12{,}6$, en mètres.\nc) $12{,}8 > 12{,}6$ : impossible, les trois côtés ne se refermeraient pas.\nd) Oui : deux côtés et l'angle compris entre eux déterminent un seul triangle. La chute n'est pas à choisir, elle est imposée.\n⛔ Le piège au b) : ne donner que la borne du haut. La chute doit aussi être assez LONGUE : trop courte, elle ne relierait pas le haut du mât au bout de la bôme.\nRéponse : l'angle au point d'écoute mesure $68°$ ; la chute est entre $5{,}4$ m et $12{,}6$ m, donc $12{,}8$ m est impossible ; les données fixent une seule voile.",
          schema: tri({ A: [0, 0], B: [3.6, 0], C: [0, 9] }, { noms: { A: "A", B: "E", C: "T" }, cotes: { AB: "3,6 m", CA: "9 m" }, angles: { B: "68°", C: "22°" }, trouve: ["B"], droit: "A" }),
          micros: ["triangle_angle", "triangle_inegalite", "triangle_construire"],
        },
      ],
    },
  ],
};
