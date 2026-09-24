// ─── Fiche d'exercices : calculer un volume (3e) — 20 exercices ──────────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-volumes.tsx` (« Calculer un
// volume : du pavé à la boule ») et sur les huit micros du coach de 3e
// (notionId `volume_solide`). ⛔ `volume_solide_reconnaitre` n'en fait PAS
// partie : elle appartient à `volume_geometrie_espace` (nommer, représenter,
// couper les solides). Ici on CALCULE.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni le pavé 4 × 2 × 3, ni
// le 7 × 4 × 3, ni le cube de 5, ni le prisme 24 × 9, ni le cylindre de rayon 4
// et de hauteur 7, ni la boule de rayon 3 seule (elle revient ici face au cube
// et au cylindre qui l'enferment, ex. 16, et sur le cornet, ex. 20).
//
// Les pièges nommés, et où ils reviennent :
// - additionner les dimensions au lieu de les multiplier (1, 2) ;
// - oublier le 1/3 du cône et de la pyramide (5, 13, 17, 20) ;
// - le diamètre à la place du rayon (4, 6, 12, 16) ;
// - 4πr², l'aire de la sphère, au lieu de 4/3 πr³ (6, 12) ;
// - multiplier le volume par k au lieu de k³ (7, 14, 15, 18) ;
// - m³ ↔ L, et convertir avant de multiplier (8, 9, 11, 15, 19).
//
// Les chiffres du monde, et d'où ils viennent :
// - boule de pétanque : 70,5 à 80 mm de diamètre (règlement FIPJP) — ex. 6 ;
// - bassin sportif de 25 m sur 12,5 m (cinq couloirs de 2,5 m) — ex. 9 ;
// - ballon de taille 5 : circonférence de 68 à 70 cm (Lois du jeu IFAB, loi 2)
//   — ex. 12 ;
// - pyramide de Khéops : base d'environ 230 m de côté, 147 m de haut à
//   l'origine (Encyclopaedia Britannica) — ex. 13 ;
// - rayon moyen de la Terre 6 371 km, de la Lune 1 737,4 km (NASA, Planetary
//   Fact Sheets) — ex. 18 ;
// - masse volumique apparente du blé ≈ 0,78 t/m³ (« on admet ») — ex. 17 ;
// - la boule qui occupe les 2/3 du cylindre : Archimède, De la sphère et du
//   cylindre — ex. 16.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés
// dessinent leur solide, dimensions écrites dessus, hauteur en POINTILLÉS, rayon
// en rouge. Pour k³, le petit et le grand solide côte à côte, À LA MÊME ÉCHELLE
// (`ech` commun) quand c'est lisible. Dessins LOCAUX en SVG (cadre ≤ 270 de
// large, texte à 13) : le canvas `solide_3d` de la fiche de cours demande un
// cadre de 310 et trace toutes les arêtes pleines.
// ⭐ Le script `scripts/verifier-exercices-volumes-3e.mjs` relit les nombres de
// chaque dessin (`pave(55, 35, 30`, `cylindre(3.5, 10`…) : les écrire en clair.
//
// Micro-compétences : volume_comprendre (1, 16), volume_pave (2, 9, 15, 16),
// volume_prisme (3, 10, 13, 19), volume_cylindre (4, 5, 11, 14, 16, 17, 20),
// volume_boule (6, 12, 16, 18, 20), volume_agrandissement_reduction (7, 14, 15,
// 18), volume_unite (8, 9, 11, 12, 15, 19), volume_defi (16 à 20). 8/8.
// Le cône et la pyramide n'ont pas de micro à eux : le cône se range avec le
// cylindre (il en est le tiers), la pyramide avec le prisme.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU_CORPS = "#dbeafe";
const BLEU_DESSUS = "#eff6ff";
const BLEU_COTE = "#bfdbfe";
const GRILLE = "#60a5fa";
const TRAIT = "#0f172a";
const ORANGE_FOND = "#fed7aa";
const ORANGE_TRAIT = "#f97316";
const ROUGE = "#b91c1c";
const F = 13;
const CADRE = "mx-auto w-full max-w-[16rem] print:max-w-[11rem]";
const HALO = { stroke: "white", strokeWidth: 3.5, paintOrder: "stroke" as const };
const POINTILLE = "5 4";

type Pt = [number, number];
const pts = (...p: Pt[]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const plus = ([x, y]: Pt, [a, b]: Pt): Pt => [x + a, y + b];

/**
 * Un pavé droit en perspective cavalière (fuyante à 45°, réduite de moitié).
 * `L` s'écrit dessous, `h` le long du bord gauche, `l` sur la fuyante.
 * Arêtes cachées en pointillés. `grille` : les cubes unités dessinés.
 * `ech` (px par unité) : pour dessiner deux pavés à la même échelle.
 */
const pave = (
  L: number,
  l: number,
  h: number,
  t: { L?: string; l?: string; h?: string } = {},
  o: { ech?: number; grille?: boolean; eau?: boolean } = {},
) => {
  const ech = o.ech ?? Math.min(150 / (L + 0.35 * l), 110 / (h + 0.35 * l));
  const w = L * ech;
  const H = Math.max(h * ech, 18);
  const d = Math.max(l * ech * 0.35, 12);
  const x0 = 30;
  const yb = 16 + d + H;
  const A: Pt = [x0, yb];
  const B: Pt = [x0 + w, yb];
  const C: Pt = [x0 + w, yb - H];
  const D: Pt = [x0, yb - H];
  const fuite: Pt = [d, -d];
  const [A2, B2, C2, D2] = [A, B, C, D].map((p) => plus(p, fuite));
  const largeur = Math.max(210, x0 + w + d + 70);
  const lignes: [Pt, Pt][] = [];
  if (o.grille) {
    for (let i = 1; i < L; i++) {
      const x = x0 + (i * w) / L;
      lignes.push([[x, yb], [x, yb - H]], [[x, yb - H], [x + d, yb - H - d]]);
    }
    for (let j = 1; j < h; j++) {
      const y = yb - (j * H) / h;
      lignes.push([[x0, y], [x0 + w, y]], [[x0 + w, y], [x0 + w + d, y - d]]);
    }
    for (let k = 1; k < l; k++) {
      const e = (k * d) / l;
      lignes.push([[x0 + e, yb - H - e], [x0 + w + e, yb - H - e]], [[x0 + w + e, yb - e], [x0 + w + e, yb - H - e]]);
    }
  }
  const corps = o.eau ? "#93c5fd" : BLEU_CORPS;
  return (
    <svg viewBox={`0 0 ${largeur.toFixed(0)} ${(yb + 26).toFixed(0)}`} role="img" aria-label={`Un pavé droit ${t.L ?? ""} sur ${t.l ?? ""} sur ${t.h ?? ""}`} className={CADRE}>
      <polygon points={pts(A, B, C, D)} fill={corps} stroke={TRAIT} strokeWidth={2} />
      <polygon points={pts(D, C, C2, D2)} fill={o.eau ? "#bfdbfe" : BLEU_DESSUS} stroke={TRAIT} strokeWidth={2} />
      <polygon points={pts(B, B2, C2, C)} fill={o.eau ? "#60a5fa" : BLEU_COTE} stroke={TRAIT} strokeWidth={2} />
      {lignes.map(([p, q], i) => (
        <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={GRILLE} strokeWidth={0.8} />
      ))}
      <polyline points={pts(A, A2, B2)} fill="none" stroke={TRAIT} strokeWidth={1.2} strokeDasharray={POINTILLE} />
      <line x1={A2[0]} y1={A2[1]} x2={D2[0]} y2={D2[1]} stroke={TRAIT} strokeWidth={1.2} strokeDasharray={POINTILLE} />
      {t.L ? <text x={x0 + w / 2} y={yb + 18} textAnchor="middle" fontSize={F} fontWeight={700} fill={TRAIT}>{t.L}</text> : null}
      {t.h ? (
        <text x={x0 - 8} y={yb - H / 2} textAnchor="middle" fontSize={F} fontWeight={700} fill={TRAIT} transform={`rotate(-90 ${x0 - 8} ${yb - H / 2})`}>
          {t.h}
        </text>
      ) : null}
      {t.l ? <text x={x0 + w + d / 2 + 8} y={yb - d / 2 + 8} fontSize={F} fontWeight={700} fill={TRAIT}>{t.l}</text> : null}
    </svg>
  );
};

/**
 * Un prisme droit couché : sa BASE (en orange) est la façade, rectangle de
 * `larg` sur `mur` surmonté d'un triangle de hauteur `toit` (`mur` = 0 : un
 * simple triangle, la tente). `long` est la hauteur du prisme, sur la fuyante.
 */
const prisme = (larg: number, mur: number, toit: number, long: number, t: { larg?: string; mur?: string; toit?: string; long?: string } = {}) => {
  const ech = Math.min(130 / (larg + 0.35 * long), 110 / (mur + toit + 0.35 * long));
  const w = larg * ech;
  const m = mur * ech;
  const tt = toit * ech;
  const d = long * ech * 0.35;
  const x0 = 34;
  const yb = 16 + d + m + tt;
  const A: Pt = [x0, yb];
  const B: Pt = [x0 + w, yb];
  const C: Pt = [x0 + w, yb - m];
  const S: Pt = [x0 + w / 2, yb - m - tt];
  const D: Pt = [x0, yb - m];
  const fuite: Pt = [d, -d];
  const [A2, B2, C2, S2, D2] = [A, B, C, S, D].map((p) => plus(p, fuite));
  const largeur = Math.max(220, x0 + w + d + 70);
  return (
    <svg viewBox={`0 0 ${largeur.toFixed(0)} ${(yb + 26).toFixed(0)}`} role="img" aria-label="Un prisme droit couché, sa base en orange" className={CADRE}>
      {m > 0 ? <polygon points={pts(B, B2, C2, C)} fill={BLEU_COTE} stroke={TRAIT} strokeWidth={2} /> : null}
      <polygon points={pts(C, C2, S2, S)} fill={BLEU_COTE} stroke={TRAIT} strokeWidth={2} />
      <polygon points={pts(D, S, S2, D2)} fill={BLEU_DESSUS} stroke={TRAIT} strokeWidth={2} />
      <polygon points={m > 0 ? pts(A, B, C, S, D) : pts(A, B, S)} fill={ORANGE_FOND} stroke={ORANGE_TRAIT} strokeWidth={2.4} />
      <line x1={A2[0]} y1={A2[1]} x2={B2[0]} y2={B2[1]} stroke={TRAIT} strokeWidth={1.2} strokeDasharray={POINTILLE} />
      {m > 0 ? <polyline points={pts(A, A2, D2)} fill="none" stroke={TRAIT} strokeWidth={1.2} strokeDasharray={POINTILLE} /> : null}
      <line x1={S[0]} y1={S[1]} x2={S[0]} y2={yb - m} stroke={TRAIT} strokeWidth={1.4} strokeDasharray={POINTILLE} />
      {t.toit ? <text x={S[0] + 5} y={yb - m - tt / 2 + 5} fontSize={F} fontWeight={700} fill={TRAIT} {...HALO}>{t.toit}</text> : null}
      {t.mur ? (
        <text x={x0 - 8} y={yb - m / 2} textAnchor="middle" fontSize={F} fontWeight={700} fill={TRAIT} transform={`rotate(-90 ${x0 - 8} ${yb - m / 2})`}>
          {t.mur}
        </text>
      ) : null}
      {t.larg ? <text x={x0 + w / 2} y={yb + 18} textAnchor="middle" fontSize={F} fontWeight={700} fill={TRAIT}>{t.larg}</text> : null}
      {t.long ? <text x={x0 + w + d / 2 + 8} y={yb - d / 2 + 8} fontSize={F} fontWeight={700} fill={TRAIT}>{t.long}</text> : null}
    </svg>
  );
};

/**
 * Un cylindre debout : rayon en rouge sur le disque du haut, hauteur en
 * pointillés sur l'axe. `ech` pour deux solides à la même échelle.
 */
const cylindre = (r: number, h: number, t: { r?: string; h?: string } = {}, o: { ech?: number } = {}) => {
  const ech = o.ech ?? Math.min(80 / r, 120 / h);
  const rx = r * ech;
  const ry = Math.max(rx * 0.28, 5);
  const H = h * ech;
  const cx = 110;
  const yh = 22 + ry;
  const yb = yh + H;
  return (
    <svg viewBox={`0 0 220 ${(yb + ry + 12).toFixed(0)}`} role="img" aria-label={`Un cylindre, ${t.r ?? ""}, ${t.h ?? ""}`} className={CADRE}>
      <path d={`M ${cx - rx} ${yh} L ${cx - rx} ${yb} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yb} L ${cx + rx} ${yh} Z`} fill={BLEU_CORPS} stroke={TRAIT} strokeWidth={2} />
      <path d={`M ${cx - rx} ${yb} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yb}`} fill="none" stroke={TRAIT} strokeWidth={1.2} strokeDasharray={POINTILLE} />
      <ellipse cx={cx} cy={yh} rx={rx} ry={ry} fill={BLEU_DESSUS} stroke={TRAIT} strokeWidth={2} />
      <line x1={cx} y1={yh} x2={cx} y2={yb} stroke={TRAIT} strokeWidth={1.4} strokeDasharray={POINTILLE} />
      <line x1={cx} y1={yh} x2={cx + rx} y2={yh} stroke={ROUGE} strokeWidth={2.4} />
      <circle cx={cx} cy={yh} r={2.5} fill={TRAIT} />
      {t.r ? <text x={cx + rx / 2} y={yh - ry - 5} textAnchor="middle" fontSize={F} fontWeight={700} fill={ROUGE} {...HALO}>{t.r}</text> : null}
      {t.h ? <text x={cx + 6} y={(yh + yb) / 2 + 5} fontSize={F} fontWeight={700} fill={TRAIT} {...HALO}>{t.h}</text> : null}
    </svg>
  );
};

/**
 * Un cône de révolution, pointe en haut ou en bas (cornet, verre). Hauteur en
 * pointillés, rayon en rouge. `niveau` : un liquide jusqu'à cette hauteur
 * depuis la pointe, dessiné en orange (le petit cône de la réduction).
 */
const cone = (r: number, h: number, t: { r?: string; h?: string } = {}, o: { ech?: number; pointeEnBas?: boolean; niveau?: number } = {}) => {
  const ech = o.ech ?? Math.min(80 / r, 130 / h);
  const rx = r * ech;
  const ry = Math.max(rx * 0.28, 5);
  const H = h * ech;
  const cx = 110;
  const bas = !!o.pointeEnBas;
  const yBase = bas ? 22 + ry : 14 + H;
  const yPointe = bas ? yBase + H : 14;
  const hauteurVue = bas ? yPointe + 14 : yBase + ry + 22;
  const liquide = o.niveau ? { y: yPointe - o.niveau * ech * (bas ? 1 : -1), rx: (r * o.niveau * ech) / h } : null;
  return (
    <svg viewBox={`0 0 220 ${hauteurVue.toFixed(0)}`} role="img" aria-label={`Un cône, ${t.r ?? ""}, ${t.h ?? ""}`} className={CADRE}>
      {bas ? (
        <polygon points={pts([cx - rx, yBase], [cx + rx, yBase], [cx, yPointe])} fill={BLEU_CORPS} stroke={TRAIT} strokeWidth={2} />
      ) : (
        <>
          <path d={`M ${cx} ${yPointe} L ${cx - rx} ${yBase} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yBase} Z`} fill={BLEU_CORPS} stroke={TRAIT} strokeWidth={2} />
          <path d={`M ${cx - rx} ${yBase} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yBase}`} fill="none" stroke={TRAIT} strokeWidth={1.2} strokeDasharray={POINTILLE} />
        </>
      )}
      {liquide ? (
        <>
          <polygon points={pts([cx - liquide.rx, liquide.y], [cx + liquide.rx, liquide.y], [cx, yPointe])} fill={ORANGE_FOND} stroke={ORANGE_TRAIT} strokeWidth={1.6} />
          <ellipse cx={cx} cy={liquide.y} rx={liquide.rx} ry={Math.max(liquide.rx * 0.28, 4)} fill={ORANGE_FOND} stroke={ORANGE_TRAIT} strokeWidth={1.6} />
        </>
      ) : null}
      {bas ? <ellipse cx={cx} cy={yBase} rx={rx} ry={ry} fill={liquide ? "none" : BLEU_DESSUS} stroke={TRAIT} strokeWidth={2} /> : null}
      <line x1={cx} y1={yBase} x2={cx} y2={yPointe} stroke={TRAIT} strokeWidth={1.4} strokeDasharray={POINTILLE} />
      <line x1={cx} y1={yBase} x2={cx + rx} y2={yBase} stroke={ROUGE} strokeWidth={2.4} />
      <circle cx={cx} cy={yBase} r={2.5} fill={TRAIT} />
      {t.r ? (
        <text x={cx + rx / 2} y={bas ? yBase - ry - 5 : yBase + ry + 16} textAnchor="middle" fontSize={F} fontWeight={700} fill={ROUGE} {...HALO}>
          {t.r}
        </text>
      ) : null}
      {t.h ? <text x={cx + 6} y={(yBase + yPointe) / 2 + (bas ? -4 : 12)} fontSize={F} fontWeight={700} fill={TRAIT} {...HALO}>{t.h}</text> : null}
    </svg>
  );
};

/**
 * Une boule : l'équateur (arrière en pointillés), le centre O, le rayon en
 * rouge. `tour` s'écrit sous la boule (circonférence). `ech` : deux boules à
 * la même échelle (la Terre et la Lune).
 */
const boule = (r: number, t: { r?: string; tour?: string } = {}, o: { ech?: number } = {}) => {
  const R = o.ech ? r * o.ech : 70;
  const cx = 110;
  const cy = 30 + R;
  const ry = R * 0.28;
  return (
    <svg viewBox={`0 0 220 ${(cy + R + (t.tour ? 26 : 12)).toFixed(0)}`} role="img" aria-label={`Une boule, ${t.r ?? ""}`} className={CADRE}>
      <circle cx={cx} cy={cy} r={R} fill={BLEU_CORPS} stroke={TRAIT} strokeWidth={2} />
      <path d={`M ${cx - R} ${cy} A ${R} ${ry} 0 0 1 ${cx + R} ${cy}`} fill="none" stroke={TRAIT} strokeWidth={1.1} strokeDasharray={POINTILLE} />
      <path d={`M ${cx - R} ${cy} A ${R} ${ry} 0 0 0 ${cx + R} ${cy}`} fill="none" stroke={TRAIT} strokeWidth={1.3} />
      <line x1={cx} y1={cy} x2={cx + R} y2={cy} stroke={ROUGE} strokeWidth={2.4} />
      <circle cx={cx} cy={cy} r={2.5} fill={TRAIT} />
      {R > 25 ? <text x={cx - 14} y={cy + 5} fontSize={F} fontWeight={800} fill={TRAIT}>O</text> : null}
      {t.r ? <text x={cx + R / 2} y={cy - Math.max(ry, 6) - 6} textAnchor="middle" fontSize={F} fontWeight={700} fill={ROUGE} {...HALO}>{t.r}</text> : null}
      {t.tour ? <text x={cx} y={cy + R + 18} textAnchor="middle" fontSize={F} fontWeight={700} fill={TRAIT}>{t.tour}</text> : null}
    </svg>
  );
};

/**
 * Une pyramide à base carrée de côté `c` et de hauteur `h` : arêtes cachées et
 * hauteur en pointillés, la base en orange.
 */
const pyramide = (c: number, h: number, t: { c?: string; h?: string } = {}) => {
  const ech = Math.min(150 / (c * 1.35), 120 / (h + 0.35 * c));
  const w = c * ech;
  const d = w * 0.35;
  const H = h * ech;
  const x0 = 30;
  const yb = 14 + H + d;
  const A: Pt = [x0, yb];
  const B: Pt = [x0 + w, yb];
  const C: Pt = [x0 + w + d, yb - d];
  const D: Pt = [x0 + d, yb - d];
  const G: Pt = [x0 + w / 2 + d / 2, yb - d / 2];
  const S: Pt = [G[0], G[1] - H];
  return (
    <svg viewBox={`0 0 240 ${(yb + 26).toFixed(0)}`} role="img" aria-label={`Une pyramide à base carrée, ${t.c ?? ""}, ${t.h ?? ""}`} className={CADRE}>
      <polygon points={pts(A, B, C, D)} fill={ORANGE_FOND} stroke="none" />
      <polygon points={pts(S, A, B)} fill={BLEU_CORPS} stroke={TRAIT} strokeWidth={2} />
      <polygon points={pts(S, B, C)} fill={BLEU_COTE} stroke={TRAIT} strokeWidth={2} />
      <polyline points={pts(C, D, A)} fill="none" stroke={TRAIT} strokeWidth={1.2} strokeDasharray={POINTILLE} />
      <line x1={S[0]} y1={S[1]} x2={D[0]} y2={D[1]} stroke={TRAIT} strokeWidth={1.2} strokeDasharray={POINTILLE} />
      <line x1={S[0]} y1={S[1]} x2={G[0]} y2={G[1]} stroke={ROUGE} strokeWidth={1.6} strokeDasharray={POINTILLE} />
      {t.h ? <text x={S[0] + 6} y={(S[1] + G[1]) / 2} fontSize={F} fontWeight={700} fill={ROUGE} {...HALO}>{t.h}</text> : null}
      {t.c ? <text x={x0 + w / 2} y={yb + 18} textAnchor="middle" fontSize={F} fontWeight={700} fill={TRAIT}>{t.c}</text> : null}
    </svg>
  );
};

/**
 * Un silo : un cylindre de rayon `r` et de hauteur `hc`, posé sur un cône,
 * pointe en bas, de hauteur `hk`. Les deux hauteurs en pointillés sur l'axe.
 */
const silo = (r: number, hc: number, hk: number, t: { r?: string; hc?: string; hk?: string } = {}) => {
  const ech = Math.min(70 / r, 160 / (hc + hk));
  const rx = r * ech;
  const ry = Math.max(rx * 0.28, 5);
  const cx = 110;
  const yh = 22 + ry;
  const yb = yh + hc * ech;
  const yp = yb + hk * ech;
  return (
    <svg viewBox={`0 0 220 ${(yp + 14).toFixed(0)}`} role="img" aria-label="Un silo : un cylindre posé sur un cône pointe en bas" className={CADRE}>
      <path d={`M ${cx - rx} ${yh} L ${cx - rx} ${yb} L ${cx} ${yp} L ${cx + rx} ${yb} L ${cx + rx} ${yh} Z`} fill={BLEU_CORPS} stroke={TRAIT} strokeWidth={2} />
      <path d={`M ${cx - rx} ${yb} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yb}`} fill="none" stroke={TRAIT} strokeWidth={1.3} />
      <path d={`M ${cx - rx} ${yb} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yb}`} fill="none" stroke={TRAIT} strokeWidth={1.1} strokeDasharray={POINTILLE} />
      <ellipse cx={cx} cy={yh} rx={rx} ry={ry} fill={BLEU_DESSUS} stroke={TRAIT} strokeWidth={2} />
      <line x1={cx} y1={yh} x2={cx} y2={yp} stroke={TRAIT} strokeWidth={1.4} strokeDasharray={POINTILLE} />
      <line x1={cx} y1={yh} x2={cx + rx} y2={yh} stroke={ROUGE} strokeWidth={2.4} />
      {t.r ? <text x={cx + rx / 2} y={yh - ry - 5} textAnchor="middle" fontSize={F} fontWeight={700} fill={ROUGE} {...HALO}>{t.r}</text> : null}
      {t.hc ? <text x={cx + 6} y={(yh + yb) / 2} fontSize={F} fontWeight={700} fill={TRAIT} {...HALO}>{t.hc}</text> : null}
      {t.hk ? <text x={cx + rx / 2 + 8} y={(yb + yp) / 2 + 12} fontSize={F} fontWeight={700} fill={TRAIT} {...HALO}>{t.hk}</text> : null}
    </svg>
  );
};

/** Un dessin et sa légende en HTML dessous (texte nu, pas de `$`). */
const avec = (dessin: ReactNode, legende: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-sm font-bold text-slate-600">{legende}</p>
  </div>
);

/** Deux (ou trois) dessins côte à côte ; l'un sous l'autre sur un téléphone.
 *  ⛔ MESURÉ À 1280 PX (24/09) : trois colonnes à l'écran mettaient les cotes
 *  de l'exercice 16 à 8 px — deux par rangée à l'écran, trois sur papier. */
const ensemble = (...dessins: ReactNode[]) => (
  <div className={dessins.length === 3 ? "grid grid-cols-1 items-end gap-3 sm:grid-cols-2 print:grid-cols-3" :"grid grid-cols-1 items-end gap-3 sm:grid-cols-2 print:grid-cols-2"}>
    {dessins.map((d, i) => (
      <div key={i}>{d}</div>
    ))}
  </div>
);

// Échelles communes des paires à comparer (px par unité).
const ECH_DES = 150 / (6 + 0.35 * 6);
const ECH_VERRE = 130 / 9;
const ECH_TERRE_LUNE = 75 / 6371;
const ECH_TRIO = 110 / 6;
const ECH_CORNET = 130 / 10;

export const exercicesVolumes3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "volume-solide",
  titre: "Calculer un volume",
  accroche:
    "Vingt exercices, du carton de déménagement à la Lune : pavé, prisme, cylindre, cône, pyramide et boule, les litres et les mètres cubes, et ce qui arrive au volume quand on agrandit. Un rappel de cours de quelques lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le solide dessiné et ses dimensions dessus.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/volume-solide", titre: "Calculer un volume : du pavé à la boule" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je reconnais le solide, j'écris sa formule, je remplace par les nombres et j'écris l'unité.",
      rappel: [
        "Un volume compte des cubes : $1$ cm³, c'est un petit cube de $1$ cm d'arête. On MULTIPLIE trois longueurs, on n'additionne jamais.",
        "Pavé droit : $V = L \\times l \\times h$. Prisme droit et cylindre : $V = \\mathcal{B} \\times h$, aire de la base fois hauteur ; l'aire d'un disque vaut $\\pi r^2$.",
        "Cône et pyramide : le TIERS du cylindre ou du prisme de même base et même hauteur. Boule : $V = \\dfrac{4}{3}\\pi r^3$, avec le RAYON.",
        "Agrandir les longueurs par $k$ multiplie le volume par $k^3$. Et $1$ dm³ $= 1$ L, $1$ m³ $= 1\\,000$ L.",
      ],
      exercices: [
        {
          enonce:
            "Une boîte est remplie, sans aucun vide, de petits cubes de $1$ cm d'arête : $6$ cubes dans la longueur, $5$ dans la largeur, et $4$ couches en hauteur (figure).\na) Combien de cubes y a-t-il dans la couche du fond ?\nb) Combien de cubes y a-t-il en tout ?\nc) Quel est le volume de la boîte, en cm³ ?",
          figure: pave(6, 5, 4, {}, { grille: true }),
          correction:
            "a) La couche du fond est un rectangle de $6$ cubes sur $5$ : $6 \\times 5 = 30$ cubes.\nb) Il y a $4$ couches identiques, empilées : $30 \\times 4 = 120$ cubes.\nc) Chaque petit cube occupe $1$ cm³, et la boîte en contient $120$ : son volume est $120$ cm³. C'est exactement $6 \\times 5 \\times 4$, les trois dimensions multipliées. Voilà pourquoi la formule du pavé est un produit, et pourquoi l'unité porte un petit $3$.\n⛔ Le piège : additionner, $6 + 5 + 4 = 15$. On compterait seulement les cubes posés le long de trois arêtes, pas tous ceux qui remplissent la boîte.\nRéponse : $30$ cubes par couche, $120$ cubes en tout, $120$ cm³.",
          schema: avec(pave(6, 5, 4, { L: "6 cm", l: "5 cm", h: "4 cm" }, { grille: true }), "30 cubes par couche, 4 couches : 120 cubes"),
          micros: ["volume_comprendre"],
        },
        {
          enonce: "Un carton de déménagement est un pavé droit de $55$ cm de long, $35$ cm de large et $30$ cm de haut. Calculer son volume en cm³.",
          correction:
            "Le carton est un pavé droit : je multiplie ses trois dimensions.\nJe calcule d'abord l'aire du fond : $55 \\times 35 = 1\\,925$ cm².\nPuis je multiplie par la hauteur : $V = 1\\,925 \\times 30 = 57\\,750$ cm³.\n⛔ Le piège : écrire $55 + 35 + 30 = 120$. Une somme de centimètres donne des centimètres, jamais des cm³ : l'unité trahit l'erreur.\nRéponse : $V = 57\\,750$ cm³.",
          schema: pave(55, 35, 30, { L: "55 cm", l: "35 cm", h: "30 cm" }),
          micros: ["volume_pave"],
        },
        {
          enonce:
            "Une tente canadienne a la forme d'un prisme droit couché. Sa base, l'entrée, est un triangle de $1{,}6$ m de large et $1{,}2$ m de haut ; la tente mesure $2{,}1$ m de long. Calculer son volume.",
          correction:
            "Un prisme droit se calcule en deux temps : l'aire de la base, puis fois la hauteur du prisme, qui est ici la longueur de la tente.\nLa base est le TRIANGLE de l'entrée. Aire d'un triangle : base fois hauteur, divisé par $2$. $1{,}6 \\times 1{,}2 \\div 2 = 0{,}96$ m².\nJe multiplie par la longueur : $V = 0{,}96 \\times 2{,}1 = 2{,}016$ m³.\n⛔ Le piège : oublier la division par $2$ du triangle, et trouver $1{,}6 \\times 1{,}2 \\times 2{,}1 = 4{,}032$ m³. C'est le volume d'une boîte, deux fois plus grande que la tente.\nRéponse : $V = 2{,}016$ m³, environ $2$ m³.",
          schema: avec(prisme(1.6, 0, 1.2, 2.1, { larg: "1,6 m", toit: "1,2 m", long: "2,1 m" }), "en orange, la base : un triangle"),
          micros: ["volume_prisme"],
        },
        {
          enonce: "Un verre a la forme d'un cylindre de $7$ cm de diamètre et de $10$ cm de hauteur, mesurés à l'intérieur. Calculer son volume, arrondi au centième de cm³.",
          correction:
            "La formule du cylindre demande le RAYON, la moitié du diamètre : $r = 7 \\div 2 = 3{,}5$ cm.\nAire du disque de base : $\\pi \\times 3{,}5^2 = 12{,}25\\pi$ cm².\nJe multiplie par la hauteur : $V = 12{,}25\\pi \\times 10 = 122{,}5\\pi \\approx 384{,}85$ cm³.\nJe garde $\\pi$ jusqu'au bout et je n'arrondis qu'à la fin.\n⛔ Le piège : mettre le diamètre dans la formule. $\\pi \\times 7^2 \\times 10 = 490\\pi \\approx 1\\,539{,}38$ cm³ : quatre fois trop, puisque le rayon est élevé au carré.\nRéponse : $V = 122{,}5\\pi \\approx 384{,}85$ cm³.",
          schema: cylindre(3.5, 10, { r: "r = 3,5 cm", h: "10 cm" }),
          micros: ["volume_cylindre"],
        },
        {
          enonce:
            "Un cornet de glace est un cône de révolution : son ouverture est un disque de rayon $2{,}5$ cm, et il mesure $12$ cm de la pointe à l'ouverture. Calculer son volume, arrondi au centième.",
          correction:
            "Un cône a le TIERS du volume du cylindre de même base et de même hauteur : $V = \\dfrac{1}{3} \\times \\pi r^2 \\times h$.\nAire de la base : $\\pi \\times 2{,}5^2 = 6{,}25\\pi$ cm².\nLe cylindre de même base et même hauteur : $6{,}25\\pi \\times 12 = 75\\pi$ cm³.\nLe cône en est le tiers : $V = 75\\pi \\div 3 = 25\\pi \\approx 78{,}54$ cm³.\n⛔ Le piège : oublier le $\\dfrac{1}{3}$ et répondre $75\\pi \\approx 235{,}62$ cm³. C'est le volume d'un gobelet cylindrique, trois fois plus grand que le cornet.\nRéponse : $V = 25\\pi \\approx 78{,}54$ cm³.",
          schema: cone(2.5, 12, { r: "r = 2,5 cm", h: "12 cm" }, { pointeEnBas: true }),
          micros: ["volume_cylindre"],
        },
        {
          enonce:
            "Une boule de pétanque mesure $8$ cm de diamètre (le règlement autorise de $7{,}05$ cm à $8$ cm). Calculer la place qu'elle occupe, c'est-à-dire son volume, arrondi au centième.",
          correction:
            "La formule de la boule demande le rayon : $r = 8 \\div 2 = 4$ cm.\n$V = \\dfrac{4}{3}\\pi r^3$, avec le rayon AU CUBE : $4^3 = 4 \\times 4 \\times 4 = 64$.\n$V = \\dfrac{4}{3} \\times \\pi \\times 64 = \\dfrac{256}{3}\\pi \\approx 268{,}08$ cm³.\n⛔ Le piège : écrire $4\\pi r^2 = 4\\pi \\times 16 = 64\\pi \\approx 201{,}06$. Ça, c'est l'AIRE de la surface de la boule, en cm². Un carré annonce une aire ; un volume demande un cube.\nRéponse : $V = \\dfrac{256}{3}\\pi \\approx 268{,}08$ cm³.",
          schema: boule(4, { r: "r = 4 cm", tour: "diamètre : 8 cm" }),
          micros: ["volume_boule"],
        },
        {
          enonce:
            "Un dé à jouer est un cube de $2$ cm d'arête. Un dé géant, pour jouer dans le jardin, en est un agrandissement : son arête mesure $6$ cm.\na) Quel est le coefficient d'agrandissement $k$ ?\nb) Par combien le volume est-il multiplié ?\nc) Calculer le volume du dé géant de deux façons.",
          correction:
            "a) Toutes les longueurs sont multipliées par $k = 6 \\div 2 = 3$.\nb) Un volume multiplie trois longueurs, et chacune est multipliée par $3$ : le volume est multiplié par $k^3 = 3 \\times 3 \\times 3 = 27$.\nc) Petit dé : $2^3 = 8$ cm³. Avec le coefficient : $8 \\times 27 = 216$ cm³. Directement : $6^3 = 6 \\times 6 \\times 6 = 216$ cm³. Les deux chemins donnent le même résultat.\n⛔ Le piège : multiplier le volume par $k = 3$ et trouver $24$ cm³. Pour remplir le grand dé, il faut $27$ petits dés, pas $3$ : $3$ dans la longueur, $3$ dans la largeur, $3$ en hauteur.\nRéponse : $k = 3$ ; le volume est multiplié par $27$ ; le dé géant fait $216$ cm³.",
          schema: ensemble(
            avec(pave(2, 2, 2, { L: "2 cm" }, { ech: ECH_DES, grille: true }), "8 cm³"),
            avec(pave(6, 6, 6, { L: "6 cm", h: "6 cm", l: "6 cm" }, { ech: ECH_DES, grille: true }), "27 petits dés : 216 cm³"),
          ),
          micros: ["volume_agrandissement_reduction"],
        },
        {
          enonce:
            "Compléter, en se souvenant que $1$ dm³ $= 1$ L.\na) $3{,}4$ m³ $= \\ldots$ L\nb) $750$ cm³ $= \\ldots$ L\nc) $45$ L $= \\ldots$ m³",
          correction:
            "Un cube de $1$ dm d'arête mesure $10$ cm sur $10$ cm sur $10$ cm : il contient $10 \\times 10 \\times 10 = 1\\,000$ petits cubes de $1$ cm³. Donc $1$ dm³ $= 1\\,000$ cm³ $= 1$ L. De même, $1$ m³ $= 1\\,000$ dm³ $= 1\\,000$ L. D'une unité de volume à la suivante, on multiplie par $1\\,000$, pas par $10$.\na) $3{,}4$ m³ $= 3{,}4 \\times 1\\,000$ dm³ $= 3\\,400$ dm³, soit $3\\,400$ L.\nb) $750$ cm³ $= 750 \\div 1\\,000$ dm³ $= 0{,}75$ dm³, soit $0{,}75$ L.\nc) $45$ L $= 45$ dm³ $= 45 \\div 1\\,000$ m³ $= 0{,}045$ m³.\n⛔ Le piège : décaler la virgule d'un seul rang, comme pour des longueurs, et écrire $3{,}4$ m³ $= 34$ L. En volume, chaque rang d'unité compte trois chiffres.\nRéponse : $3\\,400$ L ; $0{,}75$ L ; $0{,}045$ m³.",
          schema: avec(pave(10, 10, 10, { L: "10 cm = 1 dm", h: "1 dm", l: "1 dm" }, { grille: true }), "1 dm³ = 1 000 cm³ = 1 L"),
          micros: ["volume_unite"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au brevet. Je dessine le solide, j'écris ses dimensions dessus, je calcule et je convertis.",
      rappel: [
        "Je repère le solide, j'écris la formule, je remplace, et je garde $\\pi$ jusqu'à l'arrondi final.",
        "Prisme droit et cylindre : $V = \\mathcal{B} \\times h$. Pyramide et cône : $V = \\dfrac{1}{3} \\times \\mathcal{B} \\times h$. Boule : $V = \\dfrac{4}{3}\\pi r^3$.",
        "Réduction ou agrandissement de rapport $k$ : volume multiplié par $k^3$. Unités : $1$ m³ $= 1\\,000$ L, $1$ dm³ $= 1$ L, $1$ L $= 1\\,000$ cm³.",
      ],
      exercices: [
        {
          enonce:
            "Le bassin d'une piscine municipale est un pavé droit de $25$ m de long, $12{,}5$ m de large et $1{,}8$ m de profondeur.\na) Calculer son volume en m³.\nb) Combien de litres d'eau faut-il pour le remplir ?\nc) La pompe débite $50$ m³ par heure. Combien de temps faut-il pour le remplir ? Répondre en heures et minutes.",
          correction:
            "a) Le bassin est un pavé droit. D'abord la surface de l'eau : $25 \\times 12{,}5 = 312{,}5$ m². Puis fois la profondeur : $V = 312{,}5 \\times 1{,}8 = 562{,}5$ m³.\nb) $1$ m³ $= 1\\,000$ L, donc $562{,}5 \\times 1\\,000 = 562\\,500$ L.\nc) Je divise le volume par le débit : $562{,}5 \\div 50 = 11{,}25$ h. Et $0{,}25$ h, c'est $0{,}25 \\times 60 = 15$ min.\n⛔ Le piège : convertir avec $1$ m³ $= 100$ L et annoncer $56\\,250$ L. Un mètre cube, c'est $10 \\times 10 \\times 10 = 1\\,000$ cubes d'un litre. Et $11{,}25$ h ne veut pas dire $11$ h $25$ min.\nRéponse : $562{,}5$ m³, soit $562\\,500$ L, remplis en $11$ h $15$ min.",
          schema: pave(25, 12.5, 1.8, { L: "25 m", l: "12,5 m", h: "1,8 m" }, { eau: true }),
          micros: ["volume_pave", "volume_unite"],
        },
        {
          enonce:
            "Un hangar agricole a la forme d'un prisme droit (figure). Sa façade est un rectangle de $8$ m de large et $3$ m de haut, surmonté d'un toit triangulaire de $2$ m de haut. Le hangar mesure $10$ m de long.\na) Calculer l'aire de la façade.\nb) Calculer le volume du hangar.\nc) Le chauffage prévu convient pour $300$ m³ au plus. Suffit-il ?",
          figure: prisme(8, 3, 2, 10, { larg: "8 m", mur: "3 m", toit: "2 m", long: "10 m" }),
          correction:
            "a) La façade est la BASE du prisme. Je la découpe en un rectangle et un triangle. Rectangle : $8 \\times 3 = 24$ m². Triangle de base $8$ m et de hauteur $2$ m : $8 \\times 2 \\div 2 = 8$ m². Façade : $24 + 8 = 32$ m².\nb) Le prisme est couché : sa hauteur, la distance entre ses deux façades, est la longueur du hangar, $10$ m. $V = 32 \\times 10 = 320$ m³.\nc) $320 > 300$ : le chauffage ne suffit pas.\n⛔ Le piège : prendre pour hauteur du prisme les $3$ m du mur, ou les $5$ m du faîte. La hauteur d'un prisme relie ses deux bases : ici, c'est la longueur.\nRéponse : façade de $32$ m², volume de $320$ m³ ; le chauffage ne suffit pas.",
          schema: avec(prisme(8, 3, 2, 10, { larg: "8 m", mur: "3 m", toit: "2 m", long: "10 m" }), "la base orange : 24 + 8 = 32 m², fois 10 m"),
          micros: ["volume_prisme"],
        },
        {
          enonce:
            "Une cuve de récupération d'eau de pluie est un cylindre de $1{,}2$ m de diamètre et $1{,}5$ m de haut.\na) Calculer son volume exact en m³, puis arrondi au millième.\nb) Combien de litres contient-elle pleine, arrondi au litre ?\nc) Elle est remplie aux trois quarts. Combien de litres contient-elle, arrondi au litre ?",
          correction:
            "a) Rayon : $1{,}2 \\div 2 = 0{,}6$ m. Aire de la base : $\\pi \\times 0{,}6^2 = 0{,}36\\pi$ m². $V = 0{,}36\\pi \\times 1{,}5 = 0{,}54\\pi \\approx 1{,}696$ m³.\nb) $1$ m³ $= 1\\,000$ L : $0{,}54\\pi \\times 1\\,000 = 540\\pi \\approx 1\\,696$ L.\nc) $\\dfrac{3}{4} \\times 540\\pi = 405\\pi \\approx 1\\,272$ L. Je pars de la valeur exacte, pas de l'arrondi.\n⛔ Le piège : oublier de diviser le diamètre par $2$. Avec $1{,}2$ comme rayon, on trouverait $2{,}16\\pi \\approx 6{,}786$ m³, quatre fois trop.\nRéponse : $0{,}54\\pi \\approx 1{,}696$ m³ ; environ $1\\,696$ L pleine ; environ $1\\,272$ L aux trois quarts.",
          schema: cylindre(0.6, 1.5, { r: "r = 0,6 m", h: "1,5 m" }),
          micros: ["volume_cylindre", "volume_unite"],
        },
        {
          enonce:
            "Un ballon de football de taille 5, celle des matchs d'adultes, a une circonférence comprise entre $68$ et $70$ cm (Lois du jeu, loi 2). On prend $69$ cm.\na) Calculer son rayon, arrondi au centième.\nb) Calculer son volume, arrondi au cm³, puis en litres, arrondi au dixième.\nc) Un élève écrit $V = 4\\pi r^2$. Qu'a-t-il calculé ?",
          correction:
            "a) La circonférence est le tour du ballon, le périmètre d'un grand cercle : $2\\pi r = 69$. Donc $r = \\dfrac{69}{2\\pi} \\approx 10{,}98$ cm.\nb) $V = \\dfrac{4}{3}\\pi r^3$. Je tape $r$ avec la valeur gardée par la calculatrice, pas avec l'arrondi : $V \\approx 5\\,547$ cm³. Comme $1\\,000$ cm³ $= 1$ L, $V \\approx 5{,}5$ L.\nc) $4\\pi r^2 \\approx 1\\,515$ : c'est l'AIRE du cuir du ballon, en cm², pas son volume. Il manque le cube du rayon, et le facteur $\\dfrac{1}{3}$.\n⛔ Le piège : prendre $69$ cm pour le diamètre, ou pour le rayon. La circonférence fait le tour : je la divise par $2\\pi$ pour retrouver le rayon.\nRéponse : $r \\approx 10{,}98$ cm ; $V \\approx 5\\,547$ cm³, environ $5{,}5$ L.",
          schema: boule(10.98, { r: "r ≈ 10,98 cm", tour: "le tour : 69 cm" }),
          micros: ["volume_boule", "volume_unite"],
        },
        {
          enonce:
            "La pyramide de Khéops, en Égypte, a une base carrée d'environ $230$ m de côté ; à sa construction, elle mesurait environ $147$ m de haut.\na) Calculer son volume d'origine en m³.\nb) Combien de bassins de piscine de $562{,}5$ m³ pourrait-on remplir avec ce volume ?",
          correction:
            "a) Une pyramide a le TIERS du volume du prisme de même base et même hauteur : $V = \\dfrac{1}{3} \\times \\mathcal{B} \\times h$.\nAire de la base : $230 \\times 230 = 52\\,900$ m².\nLe prisme de même base et même hauteur : $52\\,900 \\times 147 = 7\\,776\\,300$ m³.\nLa pyramide en est le tiers : $V = 7\\,776\\,300 \\div 3 = 2\\,592\\,100$ m³.\nb) $2\\,592\\,100 \\div 562{,}5 \\approx 4\\,608{,}2$ : plus de $4\\,600$ bassins.\n⛔ Le piège : oublier le $\\dfrac{1}{3}$ et annoncer $7\\,776\\,300$ m³, le volume d'une tour carrée de même base et de même hauteur.\nRéponse : environ $2\\,592\\,100$ m³, de quoi remplir plus de $4\\,600$ bassins.",
          schema: pyramide(230, 147, { c: "230 m", h: "147 m" }),
          micros: ["volume_prisme"],
        },
        {
          enonce:
            "Un verre à cocktail est un cône, pointe en bas : $9$ cm de haut, ouverture de rayon $4{,}5$ cm. On y verse du jus jusqu'à $6$ cm de hauteur, mesurés depuis la pointe.\na) Calculer le volume du verre plein, arrondi au centième.\nb) Le jus forme un petit cône, réduction du grand. Quel est le coefficient $k$ ?\nc) En déduire le volume de jus, puis le vérifier par un calcul direct.\nd) Le verre semble rempli aux deux tiers. Quelle part de son volume contient-il vraiment ?",
          correction:
            "a) $V = \\dfrac{1}{3} \\times \\pi \\times 4{,}5^2 \\times 9 = \\dfrac{1}{3} \\times 20{,}25\\pi \\times 9 = 60{,}75\\pi \\approx 190{,}85$ cm³.\nb) Les hauteurs se comptent depuis la pointe, le sommet commun des deux cônes : $k = 6 \\div 9 = \\dfrac{2}{3}$.\nc) Une réduction de rapport $k$ multiplie le volume par $k^3 = \\dfrac{2}{3} \\times \\dfrac{2}{3} \\times \\dfrac{2}{3} = \\dfrac{8}{27}$. Jus : $60{,}75\\pi \\times \\dfrac{8}{27} = 18\\pi \\approx 56{,}55$ cm³. Vérification : le petit cône a pour rayon $4{,}5 \\times \\dfrac{2}{3} = 3$ cm et pour hauteur $6$ cm, donc $\\dfrac{1}{3} \\times \\pi \\times 3^2 \\times 6 = 18\\pi$. Les deux chemins sont d'accord.\nd) $\\dfrac{8}{27} \\approx 0{,}296$ : moins de $30$ % du verre, alors qu'il semble plein aux deux tiers.\n⛔ Le piège : multiplier par $k = \\dfrac{2}{3}$ et trouver $40{,}5\\pi \\approx 127{,}23$ cm³. Le volume se réduit par $k^3$, pas par $k$ : le haut du verre, le plus large, contient presque tout.\nRéponse : $60{,}75\\pi \\approx 190{,}85$ cm³ ; $k = \\dfrac{2}{3}$ ; $18\\pi \\approx 56{,}55$ cm³ ; $\\dfrac{8}{27}$ du verre, moins de $30$ %.",
          schema: ensemble(
            avec(cone(4.5, 9, { r: "4,5 cm", h: "9 cm" }, { ech: ECH_VERRE, pointeEnBas: true, niveau: 6 }), "le verre, le jus en orange"),
            avec(cone(3, 6, { r: "3 cm", h: "6 cm" }, { ech: ECH_VERRE, pointeEnBas: true }), "le jus seul : k = 2/3, volume × 8/27"),
          ),
          micros: ["volume_agrandissement_reduction", "volume_cylindre"],
        },
        {
          enonce:
            "Une cuve à eau est un pavé droit de $2{,}5$ m sur $2$ m sur $1{,}6$ m. Un bureau d'études en fait une maquette à l'échelle $\\dfrac{1}{20}$.\na) Calculer le volume de la vraie cuve, en m³ puis en litres.\nb) Par combien faut-il diviser ce volume pour obtenir celui de la maquette ?\nc) Combien de litres contient la maquette ? Vérifier en calculant ses dimensions.",
          correction:
            "a) $V = 2{,}5 \\times 2 \\times 1{,}6 = 8$ m³, soit $8 \\times 1\\,000 = 8\\,000$ L.\nb) Toutes les longueurs sont divisées par $20$ : $k = \\dfrac{1}{20}$. Le volume est multiplié par $k^3 = \\dfrac{1}{20 \\times 20 \\times 20} = \\dfrac{1}{8\\,000}$ : on le divise par $8\\,000$.\nc) $8\\,000 \\div 8\\,000 = 1$ L. Vérification : la maquette mesure $250 \\div 20 = 12{,}5$ cm, $200 \\div 20 = 10$ cm et $160 \\div 20 = 8$ cm. $12{,}5 \\times 10 \\times 8 = 1\\,000$ cm³ $= 1$ dm³ $= 1$ L.\n⛔ Le piège : diviser le volume par $20$ et annoncer $400$ L pour une maquette qu'on tient dans une main.\nRéponse : $8$ m³, soit $8\\,000$ L ; on divise par $8\\,000$ ; la maquette contient $1$ L.",
          schema: ensemble(
            avec(pave(2.5, 2, 1.6, { L: "2,5 m", l: "2 m", h: "1,6 m" }), "la cuve : 8 m³"),
            avec(pave(12.5, 10, 8, { L: "12,5 cm", l: "10 cm", h: "8 cm" }), "la maquette : 1 L (dessin agrandi)"),
          ),
          micros: ["volume_agrandissement_reduction", "volume_pave", "volume_unite"],
        },
        {
          enonce:
            "On compare trois solides : un cube de $6$ cm d'arête, un cylindre de $6$ cm de diamètre et $6$ cm de haut, une boule de $6$ cm de diamètre.\na) Calculer leurs volumes, en valeur exacte puis arrondis au centième.\nb) Les ranger du plus petit au plus grand.\nc) Quelle fraction du cylindre la boule occupe-t-elle ?",
          correction:
            "a) Cube : $V = 6^3 = 216$ cm³.\nCylindre : le rayon vaut $3$ cm, $V = \\pi \\times 3^2 \\times 6 = 54\\pi \\approx 169{,}65$ cm³.\nBoule : le rayon vaut $3$ cm, $V = \\dfrac{4}{3}\\pi \\times 3^3 = \\dfrac{4}{3} \\times 27\\pi = 36\\pi \\approx 113{,}10$ cm³.\nb) $36\\pi < 54\\pi < 216$ : la boule, puis le cylindre, puis le cube. Chacun tient dans le suivant.\nc) $\\dfrac{36\\pi}{54\\pi} = \\dfrac{2}{3}$ : la boule occupe les deux tiers du cylindre qui l'enferme. Archimède l'avait démontré, il y a plus de $2\\,000$ ans.\n⛔ Le piège : mettre $6$ dans les formules du cylindre et de la boule. C'est le diamètre ; le rayon vaut $3$.\nRéponse : $216$ cm³, $54\\pi \\approx 169{,}65$ cm³ et $36\\pi \\approx 113{,}10$ cm³ ; la boule, le cylindre, le cube ; les deux tiers.",
          schema: ensemble(
            avec(boule(3, { r: "3 cm" }, { ech: ECH_TRIO }), "36π ≈ 113,10 cm³"),
            avec(cylindre(3, 6, { r: "3 cm", h: "6 cm" }, { ech: ECH_TRIO }), "54π ≈ 169,65 cm³"),
            avec(pave(6, 6, 6, { L: "6 cm", h: "6 cm" }, { ech: ECH_TRIO }), "216 cm³"),
          ),
          micros: ["volume_comprendre", "volume_pave", "volume_cylindre", "volume_boule", "volume_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des solides réels. Je dessine, je découpe en solides connus, je calcule en valeur exacte, puis une phrase de réponse.",
      rappel: [
        "Je découpe le solide en morceaux connus, je calcule chaque volume, puis j'additionne ou je soustrais.",
        "Je garde les valeurs exactes, avec $\\pi$, jusqu'au bout. Je convertis les longueurs AVANT de multiplier, et les volumes à la fin : $1$ m³ $= 1\\,000$ L.",
        "Deux solides de même forme : le rapport des volumes est le CUBE du rapport des longueurs.",
      ],
      exercices: [
        {
          titre: "Le silo à grain",
          enonce:
            "Un silo à grain est formé d'un cylindre de $6$ m de diamètre et $10$ m de haut, posé sur un cône, pointe en bas, de même diamètre et de $2{,}4$ m de haut (figure).\na) Calculer le volume du silo, en valeur exacte puis arrondi au dixième de m³.\nb) On admet qu'un mètre cube de blé pèse environ $0{,}78$ tonne. Quelle masse de blé contient le silo plein, arrondie à la tonne ?\nc) Une benne de camion transporte $30$ m³. Combien de bennes faut-il pour vider le silo ?",
          figure: silo(3, 10, 2.4, { r: "6 m de diamètre", hc: "10 m", hk: "2,4 m" }),
          correction:
            "a) Rayon : $6 \\div 2 = 3$ m. La base commune est un disque d'aire $\\pi \\times 3^2 = 9\\pi$ m².\nCylindre : $9\\pi \\times 10 = 90\\pi$ m³.\nCône : le tiers du cylindre de même base et même hauteur, $\\dfrac{1}{3} \\times 9\\pi \\times 2{,}4 = 7{,}2\\pi$ m³.\nSilo : $90\\pi + 7{,}2\\pi = 97{,}2\\pi \\approx 305{,}4$ m³.\nb) $97{,}2\\pi \\times 0{,}78 \\approx 238$ t.\nc) $97{,}2\\pi \\div 30 \\approx 10{,}18$. Dix bennes ne suffisent pas : il en faut $11$.\n⛔ Le piège : oublier le tiers du cône, $9\\pi \\times 2{,}4 = 21{,}6\\pi$, et trouver $111{,}6\\pi \\approx 350{,}6$ m³ : $45$ m³ de blé qui n'existent pas.\nRéponse : $97{,}2\\pi \\approx 305{,}4$ m³ ; environ $238$ tonnes de blé ; $11$ bennes.",
          schema: avec(silo(3, 10, 2.4, { r: "r = 3 m", hc: "10 m", hk: "2,4 m" }), "un cylindre de 90π m³ sur un cône de 7,2π m³"),
          micros: ["volume_cylindre", "volume_defi"],
        },
        {
          titre: "La Terre et la Lune",
          enonce:
            "On assimile la Terre et la Lune à deux boules. Rayon moyen de la Terre : $6\\,371$ km ; rayon moyen de la Lune : $1\\,737{,}4$ km (NASA).\na) Calculer le volume de la Terre, puis celui de la Lune, en km³, en écriture scientifique avec quatre chiffres significatifs.\nb) Combien de Lunes faudrait-il pour faire le volume de la Terre ?\nc) Retrouver ce résultat sans calculer aucun volume, avec le rapport des rayons.\nd) Un élève affirme : « le rayon de la Terre vaut environ $3{,}7$ fois celui de la Lune, donc la Terre contient $3{,}7$ Lunes ». Que lui répondre ?",
          correction:
            "a) $V = \\dfrac{4}{3}\\pi r^3$, avec le rayon au cube.\nTerre : $\\dfrac{4}{3}\\pi \\times 6\\,371^3 \\approx 1{,}083 \\times 10^{12}$ km³, plus de mille milliards de km³.\nLune : $\\dfrac{4}{3}\\pi \\times 1\\,737{,}4^3 \\approx 2{,}197 \\times 10^{10}$ km³.\nb) Je divise, avec les valeurs gardées par la calculatrice : $\\dfrac{V_T}{V_L} \\approx 49{,}3$. Il faudrait environ $49$ Lunes.\nc) Toutes les boules ont la même forme : la Terre est un agrandissement de la Lune, de rapport $k = 6\\,371 \\div 1\\,737{,}4 \\approx 3{,}667$. Le volume est multiplié par $k^3 \\approx 49{,}3$. Même résultat, sans $\\pi$ ni formule.\nd) Le rapport des RAYONS n'est pas celui des volumes. Le volume est multiplié par $k^3$, pas par $k$ : environ $49$ Lunes, pas $3{,}7$.\n⛔ Le piège : appliquer $k$ au volume. D'une longueur à un volume, il y a trois dimensions, donc un cube.\nRéponse : environ $1{,}083 \\times 10^{12}$ km³ et $2{,}197 \\times 10^{10}$ km³ ; environ $49$ Lunes, soit $k^3$ avec $k \\approx 3{,}667$.",
          schema: ensemble(
            avec(boule(6371, { r: "6 371 km" }, { ech: ECH_TERRE_LUNE }), "la Terre"),
            avec(boule(1737.4, { r: "1 737,4 km" }, { ech: ECH_TERRE_LUNE }), "la Lune, à la même échelle"),
          ),
          micros: ["volume_boule", "volume_agrandissement_reduction", "volume_defi"],
        },
        {
          titre: "La pluie sur le toit",
          enonce:
            "Une maison récupère l'eau de pluie de son toit, qui couvre $80$ m² au sol, dans une cuve cylindrique de $1$ m de diamètre et $1{,}2$ m de haut.\na) Calculer le volume de la cuve en litres, arrondi au litre.\nb) Il tombe $12$ mm de pluie. L'eau reçue par le toit forme une couche de $80$ m² de base et de $12$ mm d'épaisseur. Quel volume d'eau cela représente-t-il, en litres ?\nc) Cette pluie suffit-elle à remplir la cuve vide ?\nd) Quelle hauteur de pluie, arrondie au dixième de mm, remplit exactement la cuve ?",
          correction:
            "a) Rayon : $0{,}5$ m. $V = \\pi \\times 0{,}5^2 \\times 1{,}2 = 0{,}3\\pi$ m³. En litres : $0{,}3\\pi \\times 1\\,000 = 300\\pi \\approx 942$ L.\nb) La couche d'eau est un prisme très plat : base de $80$ m², hauteur de $12$ mm. Je convertis AVANT de multiplier : $12$ mm $= 0{,}012$ m. $V = 80 \\times 0{,}012 = 0{,}96$ m³, soit $960$ L. À retenir : $1$ mm de pluie, c'est $1$ L d'eau par m².\nc) $960 > 942$ : oui, la cuve se remplit, et environ $18$ L débordent.\nd) Je cherche l'épaisseur $e$ telle que $80 \\times e = 0{,}3\\pi$ : $e = 0{,}3\\pi \\div 80 \\approx 0{,}011\\,78$ m, soit environ $11{,}8$ mm.\n⛔ Le piège : multiplier $80$ par $12$ sans convertir, et annoncer $960$ m³, mille fois trop. Les longueurs d'un même calcul doivent être dans la même unité.\nRéponse : environ $942$ L ; $960$ L ; oui, de justesse ; environ $11{,}8$ mm.",
          schema: ensemble(
            avec(pave(10, 8, 0.012, { L: "80 m² de toit", h: "12 mm" }, { eau: true }), "la couche de pluie (épaisseur très exagérée)"),
            avec(cylindre(0.5, 1.2, { r: "r = 0,5 m", h: "1,2 m" }), "la cuve : 300π ≈ 942 L"),
          ),
          micros: ["volume_unite", "volume_prisme", "volume_cylindre", "volume_defi"],
        },
        {
          titre: "La boule de glace qui fond",
          enonce:
            "Un cornet est un cône de $3$ cm de rayon et de $10$ cm de profondeur. On pose dessus une boule de glace de $3$ cm de rayon, sans rien mettre à l'intérieur du cornet.\na) Calculer le volume du cornet et celui de la boule, en valeur exacte puis arrondis au centième.\nb) La glace fond, et on admet que son volume ne change pas. Le cornet déborde-t-il ? De combien ?\nc) Quelle profondeur faudrait-il au cornet, avec le même rayon, pour contenir exactement la boule fondue ?",
          correction:
            "a) Cornet : $\\dfrac{1}{3} \\times \\pi \\times 3^2 \\times 10 = 30\\pi \\approx 94{,}25$ cm³.\nBoule : $\\dfrac{4}{3}\\pi \\times 3^3 = 36\\pi \\approx 113{,}10$ cm³.\nb) $36\\pi > 30\\pi$ : le cornet déborde, de $36\\pi - 30\\pi = 6\\pi \\approx 18{,}85$ cm³.\nc) Je cherche $h$ tel que $\\dfrac{1}{3} \\times 9\\pi \\times h = 36\\pi$, c'est-à-dire $3\\pi h = 36\\pi$, donc $h = 12$ cm.\n⛔ Le piège : oublier le tiers du cône. On trouverait $90\\pi$ pour le cornet, et on croirait qu'il peut contenir deux boules et demie.\nRéponse : $30\\pi \\approx 94{,}25$ cm³ et $36\\pi \\approx 113{,}10$ cm³ ; il déborde d'environ $18{,}85$ cm³ ; il faudrait $12$ cm de profondeur.",
          schema: ensemble(
            avec(boule(3, { r: "3 cm" }, { ech: ECH_CORNET }), "la boule : 36π cm³"),
            avec(cone(3, 10, { r: "3 cm", h: "10 cm" }, { ech: ECH_CORNET, pointeEnBas: true }), "le cornet : 30π cm³"),
          ),
          micros: ["volume_boule", "volume_cylindre", "volume_defi"],
        },
      ],
    },
  ],
};
