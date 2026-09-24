// ─── Les figures des feuilles d'exercices (bloc « Fonctions » de seconde) ─────
//
// Réunies le 21/09/2026 au soir, à la deuxième feuille du bloc : les mêmes
// aides servaient à cinq feuilles. Ce sont les canvas du coach, servis tels
// quels — l'élève retrouve dans sa feuille la figure de ses questions.
//
// ⭐ Le script de recalcul RELIT ces appels dans le source de chaque feuille
// (`repere(…)`, `tableau(…)`, `const NOM: Courbe[]`) : écrire les coefficients
// et les points EN CLAIR dans l'appel, jamais calculés ailleurs.

import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

export const BLEU = "#2563eb";
export const ORANGE = "#ea580c";

/** `q: [a, b, c]` pour ax² + bx + c (a = 0 : une droite) ; `p: [coefficients]`
 *  pour un polynôme (du plus haut degré au plus bas), échantillonné ; `pts`
 *  pour une ligne brisée. */
export type Courbe = { q?: [number, number, number]; p?: number[]; pts?: [number, number][]; couleur?: string };

const polynome = (coefs: number[], x: number) => coefs.reduce((s, c) => s * x + c, 0);

/**
 * Un repère et ses courbes.
 * ⛔ CADRE 215 DE LARGE (mesuré le 21/09 sur la feuille des réels) : dans une
 * correction, le dessin fait ~209 px à 375 ; au-delà de 215, les graduations
 * (écrites en 12) passent sous 11 px. Le canvas gradue les ENTIERS seulement.
 * ⛔ `ymin` < 0 toujours : à `ymin = 0`, l'axe des abscisses est le bord du bas
 * et ses nombres sortent du cadre.
 */
export const repere = (
  cadre: [number, number, number, number],
  courbes: Courbe[],
  marques: { x: number; y: number; label?: string }[] = [],
  horizontale?: number | number[],
) => {
  const [xmin, xmax, ymin, ymax] = cadre;
  const horizontales = horizontale === undefined ? [] : Array.isArray(horizontale) ? horizontale : [horizontale];
  return (
    <div className="mx-auto w-full max-w-[16rem] print:max-w-[12rem]">
      <CanvasRenderer
        figure={{
          kind: "fonctionGraphique",
          size: { width: 215, height: 200 },
          xmin,
          xmax,
          ymin,
          ymax,
          grille: true,
          courbes: courbes.map((c, i) => {
            const couleur = c.couleur ?? BLEU;
            if (c.q) return { id: `c${i}`, type: "quadratique" as const, a: c.q[0], b: c.q[1], c: c.q[2], couleur };
            if (c.p) {
              const coefs = c.p;
              // 120 pas sur le cadre ; on ne garde que ce qui reste près du cadre.
              const points = Array.from({ length: 121 }, (_, k) => xmin + ((xmax - xmin) * k) / 120)
                .map((x) => ({ x, y: polynome(coefs, x) }))
                .filter((pt) => pt.y >= ymin - 1 && pt.y <= ymax + 1);
              return { id: `c${i}`, type: "points" as const, points, couleur };
            }
            // ⛔ Une ligne brisée s'arrête au cadre : la racine relue jusqu'à 9
            // dans un repère qui s'arrête à 4 traçait 184 px hors du dessin
            // (rogné, mais compté comme débordement à 360 px, 22/09).
            const points = (c.pts ?? []).filter(([x]) => x >= xmin && x <= xmax).map(([x, y]) => ({ x, y }));
            return { id: `c${i}`, type: "points" as const, points, couleur };
          }),
          misesEnEvidence: [
            ...horizontales.map((y) => ({ horizontale: { y } })),
            ...marques.map((pt) => ({ point: { x: pt.x, y: pt.y, label: pt.label, couleur: "#dc2626" } })),
          ],
        }}
      />
    </div>
  );
};

/** Une flèche `de` → `vers`, couleur facultative (bleu par défaut).
 *  `pointe: false` : un simple SEGMENT, le côté d'une figure (feuille du repère). */
export type Fleche = { de: [number, number]; vers: [number, number]; couleur?: string; pointe?: boolean };

/**
 * Des VECTEURS sur un quadrillage (23/09/2026, feuille des vecteurs de seconde).
 * Aucun canvas ne trace de flèche entre deux points : on reprend le geste de la
 * fiche de cours (`lib/fiches/maths-seconde-vecteurs.tsx`) — trois polylignes
 * de même couleur, la hampe et deux barbes, dans un `fonctionGraphique`.
 * ⛔ FENÊTRE CARRÉE (`[min, max]` sert aux deux axes) : le canvas met x et y à
 * l'échelle séparément, une fenêtre rectangulaire tord la pointe.
 * ⛔ `min` < 0, et aucun point sur le bord : son étiquette sortirait du cadre.
 * ⭐ Le script de recalcul RELIT `de`, `vers` et les points : les écrire en clair.
 */
export const vecteurs = (
  fenetre: [number, number],
  fleches: Fleche[],
  points: { x: number; y: number; label: string }[] = [],
) => {
  const [min, max] = fenetre;
  const courbes = fleches.flatMap(({ de, vers, couleur = BLEU, pointe: avecPointe = true }, i) => {
    const hampe = { id: `v${i}`, type: "points" as const, couleur, points: [{ x: de[0], y: de[1] }, { x: vers[0], y: vers[1] }] };
    if (!avecPointe) return [hampe];
    const [dx, dy] = [vers[0] - de[0], vers[1] - de[1]];
    const L = Math.hypot(dx, dy);
    const [ux, uy] = [dx / L, dy / L];
    // La pointe : deux barbes en arrière, à 30° de part et d'autre de la hampe.
    const r = Math.min(0.5, L * 0.3) * ((max - min) / 8);
    const barbe = (a: number) => ({
      x: +(vers[0] + r * (ux * Math.cos(a) - uy * Math.sin(a))).toFixed(3),
      y: +(vers[1] + r * (ux * Math.sin(a) + uy * Math.cos(a))).toFixed(3),
    });
    const pointe = { x: vers[0], y: vers[1] };
    return [
      hampe,
      { id: `v${i}a`, type: "points" as const, couleur, points: [pointe, barbe((5 * Math.PI) / 6)] },
      { id: `v${i}b`, type: "points" as const, couleur, points: [pointe, barbe((-5 * Math.PI) / 6)] },
    ];
  });
  return (
    <div className="mx-auto w-full max-w-[16rem] print:max-w-[12rem]">
      <CanvasRenderer
        figure={{
          kind: "fonctionGraphique",
          size: { width: 215, height: 215 },
          xmin: min,
          xmax: max,
          ymin: min,
          ymax: max,
          grille: true,
          courbes,
          points: points.map((p) => ({ ...p, couleur: "#dc2626" })),
        }}
      />
    </div>
  );
};

/**
 * Des DROITES données par leur équation cartésienne `a x + b y + c = 0`
 * (23/09/2026, feuille « Droites du plan » de seconde), coupées au cadre.
 * ⭐ Une droite VERTICALE (b = 0) se trace comme les autres — c'est ce que
 * `repere()`, qui ne dessine que des fonctions, ne sait pas faire.
 * Des flèches (vecteurs directeurs) peuvent s'y ajouter.
 * ⭐ Le script de recalcul RELIT `{ a, b, c }` et les points : en clair.
 */
export const droites = (
  fenetre: [number, number],
  lignes: { a: number; b: number; c: number; couleur?: string }[],
  points: { x: number; y: number; label: string }[] = [],
  fleches: Fleche[] = [],
) => {
  const [min, max] = fenetre;
  const segments: Fleche[] = lignes.flatMap(({ a, b, c, couleur }) => {
    const pts: [number, number][] = [];
    const garde = (x: number, y: number) => {
      if (x >= min - 1e-9 && x <= max + 1e-9 && y >= min - 1e-9 && y <= max + 1e-9 && !pts.some(([u, v]) => Math.abs(u - x) < 1e-9 && Math.abs(v - y) < 1e-9)) pts.push([x, y]);
    };
    if (b !== 0) for (const x of [min, max]) garde(x, -(a * x + c) / b);
    if (a !== 0) for (const y of [min, max]) garde(-(b * y + c) / a, y);
    return pts.length >= 2 ? [{ de: pts[0], vers: pts[1], couleur, pointe: false }] : [];
  });
  return vecteurs(fenetre, [...segments, ...fleches], points);
};

/**
 * Un TRIANGLE (24/09/2026, feuille « Problèmes de géométrie plane » de seconde) :
 * le canvas `triangle` du coach, qui marque l'angle droit, nomme côtés et
 * angles, et trace une HAUTEUR (le projeté orthogonal d'un sommet).
 * ⭐ On donne les VRAIES coordonnées (en unités) : l'aide les met à l'échelle
 * du cadre, y vers le haut. Un triangle 3-4-5 est donc dessiné 3-4-5, et le
 * script de recalcul peut vérifier l'angle droit et les rapports des côtés.
 * ⛔ Texte NU dans les étiquettes (« 5 cm », « 35° ») : SVG, pas de KaTeX.
 * Les clés restent A, B, C (celles du canvas) ; `noms` les renomme à l'écran.
 */
export const triangle = (
  pts: { A: [number, number]; B: [number, number]; C: [number, number] },
  opts: {
    noms?: Partial<Record<"A" | "B" | "C", string>>;
    cotes?: Partial<Record<"AB" | "BC" | "CA", string>>;
    angles?: Partial<Record<"A" | "B" | "C", string>>;
    droit?: "A" | "B" | "C";
    hauteur?: { depuis: "A" | "B" | "C"; label?: string };
  } = {},
) => {
  const W = 260, H = 210, m = 34;
  const xs = [pts.A[0], pts.B[0], pts.C[0]], ys = [pts.A[1], pts.B[1], pts.C[1]];
  const [x0, y0] = [Math.min(...xs), Math.min(...ys)];
  const s = Math.min((W - 2 * m) / (Math.max(...xs) - x0 || 1), (H - 2 * m) / (Math.max(...ys) - y0 || 1));
  const px = ([x, y]: [number, number]) => ({ x: +(m + (x - x0) * s).toFixed(1), y: +(H - m - (y - y0) * s).toFixed(1) });
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <CanvasRenderer
        figure={{
          kind: "triangle",
          size: { width: W, height: H },
          points: { A: px(pts.A), B: px(pts.B), C: px(pts.C) },
          display: { showPoints: true, showLabels: true, showSides: true, showAngles: !!opts.angles },
          labels: opts.noms,
          sideLabels: opts.cotes,
          angleLabels: opts.angles,
          marks: opts.droit ? { rightAngleAt: opts.droit } : undefined,
          height: opts.hauteur ? { fromVertex: opts.hauteur.depuis, label: opts.hauteur.label } : undefined,
        }}
      />
    </div>
  );
};

/**
 * Plusieurs INTERVALLES sur une même droite graduée (24/09/2026, feuille
 * « Logique et ensembles ») : « et » (intersection), « ou » (réunion),
 * complémentaire. Chaque intervalle a sa couleur et son étiquette.
 * ⛔ Même cadre que `droite()` : 260 de large, dix graduations au plus.
 */
export const intervalles = (
  min: number,
  max: number,
  ivs: { de?: number; a?: number; deInclus?: boolean; aInclus?: boolean; label?: string; color?: string }[],
  step = 1,
) => {
  // ⛔ MESURÉ LE 24/09 : sur UNE droite, deux intervalles qui se chevauchent
  // posent leurs étiquettes l'une sur l'autre (« J » sur « I ∩ J »). On fait
  // comme au tableau : une droite par intervalle, empilées, mêmes graduations —
  // l'œil lit l'intersection à la verticale. Les morceaux de même étiquette
  // (une réunion) restent sur la même droite.
  const groupes = [...new Set(ivs.map((iv) => iv.label ?? ""))].map((l) => ivs.filter((iv) => (iv.label ?? "") === l));
  return (
    <div className="mx-auto grid w-full max-w-[20rem] gap-0 print:max-w-[14rem]">
      {groupes.map((g, i) => (
        <CanvasRenderer key={i} figure={{ kind: "number_line", min, max, step, size: { width: 260, height: 80 }, intervalles: g, display: { showPoints: false } }} />
      ))}
    </div>
  );
};

/**
 * Un DIAGRAMME DE VENN (24/09/2026, feuille « Logique et ensembles »). Le coach
 * n'en a pas : deux cercles A et B dans le rectangle de l'univers E, et les
 * éléments écrits dans leur zone — A seul, A ∩ B, B seul, hors de A ∪ B.
 * SVG simple, texte NU. ⭐ Le script de recalcul relit les quatre zones.
 */
export const venn = (
  zones: { aSeul: string[]; commun: string[]; bSeul: string[]; dehors?: string[] },
  noms: { a?: string; b?: string; e?: string } = {},
  surligne?: "aSeul" | "commun" | "bSeul" | "dehors" | "union",
) => {
  const bleu = surligne === "aSeul" || surligne === "union" ? 0.35 : 0.12;
  const orange = surligne === "bSeul" || surligne === "union" ? 0.35 : 0.12;
  const colonne = (els: string[], x: number) =>
    els.map((t, i) => (
      <text key={i} x={x} y={92 + (i - (els.length - 1) / 2) * 17} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">
        {t}
      </text>
    ));
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 180" className="block h-auto w-full" role="img" aria-label="Diagramme de Venn">
        <rect x="4" y="4" width="292" height="172" rx="12" fill={surligne === "dehors" ? "#fef3c7" : "#fff"} stroke="#94a3b8" strokeWidth="2" />
        {/* L'univers en bas à gauche : en haut, un nom long touchait le « A ». */}
        <text x="14" y="168" fontSize="13" fontWeight="900" fill="#475569">{noms.e ?? "E"}</text>
        <circle cx="118" cy="92" r="66" fill="#2563eb" fillOpacity={bleu} stroke="#2563eb" strokeWidth="2.5" />
        <circle cx="182" cy="92" r="66" fill="#ea580c" fillOpacity={orange} stroke="#ea580c" strokeWidth="2.5" />
        {surligne === "commun" ? (
          <path d="M150,34.3 A66,66 0 0 1 150,149.7 A66,66 0 0 1 150,34.3 Z" fill="#16a34a" fillOpacity="0.35" />
        ) : null}
        <text x="72" y="36" fontSize="15" fontWeight="900" fill="#2563eb">{noms.a ?? "A"}</text>
        <text x="222" y="36" fontSize="15" fontWeight="900" fill="#ea580c" textAnchor="end">{noms.b ?? "B"}</text>
        {colonne(zones.aSeul, 88)}
        {colonne(zones.commun, 150)}
        {colonne(zones.bSeul, 212)}
        {(zones.dehors ?? []).map((t, i) => (
          <text key={i} x={286 - i * 26} y="166" textAnchor="end" fontSize="13" fontWeight="700" fill="#475569">
            {t}
          </text>
        ))}
      </svg>
    </div>
  );
};

/**
 * Les canvas de PROBABILITÉS du coach (24/09/2026, feuille des probabilités de
 * seconde) : l'arbre pondéré, et le canvas `probabilites` en quatre variantes.
 * ⛔ Texte NU partout (SVG) : « 1/4 », « 0,6 », jamais de `$`.
 * ⭐ Le script de recalcul relit les probabilités des branches, les poids de
 * la roue, les billes et les cases du tableau : les écrire en clair.
 */
type Noeud = { label: string; proba?: string; enfants?: Noeud[] };
/* ⛔ MESURÉ LE 24/09 À 375 PX : l'arbre est dessiné pour 360 de large ; tassé
   dans une carte de 250, ses probabilités tombaient à 8 px. Et le tableau du
   canvas a un cadre `overflow-hidden` : une ligne plus large que la carte
   était COUPÉE, sans défilement. D'où une largeur minimale — sa largeur
   naturelle — dans un conteneur qui défile sur téléphone (pas sur papier). */
const DEFILE = "mx-auto w-full overflow-x-auto print:overflow-visible";
export const arbre = (racine: Noeud[]) => (
  <div className={`${DEFILE} max-w-[23rem] print:max-w-[14rem]`}>
    <div className="min-w-[22.5rem] print:min-w-0">
      <CanvasRenderer figure={{ kind: "arbre_proba", racineEnfants: racine }} />
    </div>
  </div>
);
const PROBA_CADRE = "mx-auto w-full max-w-[18rem] print:max-w-[12rem]";
export const de = (surligne: (1 | 2 | 3 | 4 | 5 | 6)[] = []) => (
  <div className={PROBA_CADRE}>
    <CanvasRenderer figure={{ kind: "probabilites", variant: "de", de: { faces: [1, 2, 3, 4, 5, 6], surligne } }} />
  </div>
);
export const roue = (segments: { label: string; poids: number; couleur?: string }[]) => (
  <div className={PROBA_CADRE}>
    <CanvasRenderer figure={{ kind: "probabilites", variant: "roue", roue: { segments } }} />
  </div>
);
export const billes = (elements: { label?: string; couleur: string }[]) => (
  <div className={PROBA_CADRE}>
    <CanvasRenderer figure={{ kind: "probabilites", variant: "billes", billes: { elements } }} />
  </div>
);
export const tableauProba = (entetes: string[], lignes: string[][], surligne: [number, number][] = []) => (
  <div className={`${DEFILE} max-w-[22rem] print:max-w-[15rem]`}>
    <div className="min-w-[21rem] print:min-w-0">
      <CanvasRenderer figure={{ kind: "probabilites", variant: "tableau", tableau: { entetes, lignes, casesSurlignees: surligne } }} />
    </div>
  </div>
);

/**
 * Le diagramme en boîte (23/09/2026, feuille des statistiques de seconde) : le
 * canvas `diagramme_boite` de la fiche de cours, une ou deux séries.
 * ⛔ Texte NU dans `label` (SVG : KaTeX n'y passe pas).
 * ⭐ Le script de recalcul RELIT les cinq nombres : les écrire en clair.
 */
export const boite = (
  series: { label?: string; min: number; q1: number; mediane: number; q3: number; max: number; couleur?: string }[],
  axe?: { min?: number; max?: number; step?: number },
) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[16rem]">
    <CanvasRenderer figure={{ kind: "diagramme_boite", series, min: axe?.min, max: axe?.max, step: axe?.step, size: { width: 320 } }} />
  </div>
);

/** Diagramme en bâtons, en barres ou circulaire (canvas `stat_graph` du coach).
 *  ⛔ Texte NU dans `label`. Le recalcul relit `{ label, value }`. */
export const diagramme = (graphType: "barres" | "batons" | "camembert", data: { label: string; value: number }[], surligne?: number) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer figure={{ kind: "stat_graph", graphType, data, size: { width: 300, height: 220 }, display: { showValues: true, showLabels: true, highlightIndex: surligne } }} />
  </div>
);

/**
 * Un PROGRAMME Python (23/09/2026, feuille d'algorithmique de seconde) : le
 * geste de `code()` de la fiche de cours, mais imprimable (fond clair sur
 * papier). Une ligne peut être mise en couleur.
 * ⛔ `whitespace-pre` : l'indentation EST la syntaxe, une ligne ne se replie
 * pas — 30 signes au plus, pour tenir à 375 px.
 * ⛔ Guillemets SIMPLES dans le code : un `\"` laisserait un antislash dans le
 * source, que le contrôle commun prendrait pour du LaTeX hors formule.
 * ⭐ Le script de recalcul EXÉCUTE ces lignes avec Python.
 */
export const programme = (lignes: string[], enCouleur?: number) => (
  <div className="mx-auto w-full max-w-[22rem] rounded-xl border border-slate-200 bg-slate-900 p-3 print:max-w-[16rem] print:border-slate-400 print:bg-white print:p-2">
    <pre className="overflow-x-auto whitespace-pre font-mono text-[13px] leading-6 text-slate-100 print:text-[10px] print:leading-4 print:text-slate-900">
      {lignes.map((l, i) => (
        <div key={i} style={i === enCouleur ? { color: "#fca5a5", fontWeight: 700 } : undefined}>
          {l || " "}
        </div>
      ))}
    </pre>
  </div>
);

/** La TRACE d'un programme : une ligne par étape, une colonne par variable. */
export const trace = (entete: string[], lignes: (string | number)[][]) => (
  <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[14rem]">
    <table className="w-full border-collapse text-center font-mono text-[13px] print:text-[10px]">
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
              <td key={j} className="border border-slate-300 px-2 py-0.5 text-slate-800" style={i === lignes.length - 1 ? { color: "#dc2626", fontWeight: 700 } : undefined}>
                {v}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const signe = (v: string | number) => (typeof v === "number" ? String(v).replace("-", "−").replace(".", ",") : v);

/** Un tableau de valeurs, en HTML : lisible à toutes les largeurs.
 *  ⛔ Pas de `label` de ligne : le composant ajouterait une colonne « Données ».
 *  ⛔ MESURÉ À 375 PX (21/09) : la case utile fait 226 px. Six colonnes d'années
 *  à quatre chiffres en demandaient 303 — d'où `vertical`, une ligne par valeur. */
export const tableau = (entete: string[], ligne: (string | number)[], vertical: boolean | "ecran" = false) => {
  const cases = ligne.map(signe);
  const horizontal = (
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: [{ values: cases }], display: { compact: true } }} />
  );
  if (!vertical) return <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">{horizontal}</div>;
  // ⭐ Vertical sur TÉLÉPHONE seulement : sur papier, dix lignes d'un tableau
  // prenaient une demi-page (feuilles de 13 et 14 pages, 22/09). À partir de
  // `sm` et à l'impression, la place est là : on repasse à l'horizontale.
  // `"ecran"` : vertical sur TOUT écran, horizontal sur papier seulement — les
  // onze colonnes du 100 m de Bolt demandaient 475 px dans une carte de 394.
  const surTelephoneSeulement = vertical === true;
  return (
    <>
      <div className={`mx-auto w-full max-w-[20rem] print:hidden ${surTelephoneSeulement ? "sm:hidden" : ""}`}>
        <CanvasRenderer
          figure={{ kind: "tableau_donnees", headers: [entete[0], cases[0]], rows: entete.slice(1).map((e, i) => ({ values: [e, cases[i + 1]] })), display: { compact: true, striped: true } }}
        />
      </div>
      <div className={`mx-auto hidden w-full max-w-[34rem] print:block ${surTelephoneSeulement ? "sm:block" : ""}`}>{horizontal}</div>
    </>
  );
};

/** Une droite graduée et UN intervalle dessus.
 *  ⛔ Cadre 260 et dix graduations au plus : mesuré le 21/09 sur la feuille des
 *  équations, c'est ce qui garde les nombres au-dessus de 11 px à 375. */
export const droite = (min: number, max: number, iv: { de?: number; a?: number; deInclus?: boolean; aInclus?: boolean; label?: string }) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step: 1,
        size: { width: 260, height: 80 },
        intervalles: [iv],
        display: { showPoints: false },
      }}
    />
  </div>
);

/**
 * Le tableau de signes : une ligne par facteur, `[libellé, signes, marques]`.
 * ⭐ Ce canvas est en HTML et passe ses libellés par `TexteMath` : on y écrit
 * `$2x - 8$` et `$\dfrac{x - 5}{2x + 2}$`. Les bornes aussi (`$\dfrac{1}{2}$`).
 * ⛔ Marques : « 0 » sous une valeur qui annule, « || » sous une valeur
 * INTERDITE, « » sous une borne où ce facteur ne s'annule pas.
 * ⚠️ Des tableaux, pas des objets `{ label: … }` : le contrôle commun des
 * feuilles refuse un `$` sur une ligne `label:`, faite pour les canvas SVG.
 */
export const tableauSignes = (
  bornes: string[],
  lignes: [string, ("+" | "-")[], ("0" | "||" | "")[]?][],
  variable?: string,
) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer
      figure={{
        kind: "tableau_signes",
        bornes,
        variable,
        lignes: lignes.map(([texte, signes, marques]) => ({ label: texte, signes, marques })),
      }}
    />
  </div>
);

/**
 * Le tableau de variations, sans ligne de dérivée (la seconde n'en a pas).
 * ⛔ Le canvas se dimensionne seul : 54 par intervalle. TROIS intervalles au
 * plus (quatre bornes) — au-delà, ses nombres passent sous 11 px à 375.
 * ⛔ Texte NU : « −3 », jamais « $-3$ » (SVG, KaTeX n'y passe pas).
 */
export const tableauVariations = (bornes: (string | number)[], valeurs: (string | number)[], label = "f", variable?: string) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer
      figure={{
        kind: "tableau_variations",
        // « x » par défaut ; « t » pour un temps, « v » pour une vitesse — un
        // tableau qui annonce x au-dessus de P(v) mélange deux noms (vu au rendu).
        variable,
        bornes: bornes.map(signe),
        variations: { label, valeurs: valeurs.map(signe) },
      }}
    />
  </div>
);
