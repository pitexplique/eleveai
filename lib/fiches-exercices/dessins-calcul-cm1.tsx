// ─── Les dessins des trois feuilles de calcul du CM1 (10/11/2026) ─────────────
//
// Partagés par `maths-cm1-tables-multiplication.tsx`, `maths-cm1-multiplication.tsx`
// et `maths-cm1-division.tsx`.
// ⭐ Frédéric (07/10) ADORE les billes : 12 billes en 3 rangées de 4, encadrées
// par colonnes (12 ÷ 4 = 3) puis par rangées (12 ÷ 3 = 4). On ne bouge aucune
// bille : la multiplication et ses deux divisions sont le même rectangle lu de
// trois façons (`Jetons` de `app/tables-de-multiplication/TablesClient.tsx`).
// ⭐ ×10, ×100 par la VALEUR DES CHIFFRES (05/10) : le tableau de numération
// `numeration`, chaque chiffre monte d'une colonne.
// ⛔ Texte NU dans les SVG (KaTeX n'y passe pas).

import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";
const NOIR = "#0f172a";
const GRIS = "#cbd5e1";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export type PanneauBilles = {
  rangees: number;
  colonnes: number;
  /** Les cadres : par colonne (vert) ou par rangée (orange). */
  cadre?: "aucun" | "colonnes" | "rangees";
  /** Les colonnes à partir de `coupe` sont orange, après un trait pointillé (4 × 12 = 4 × 10 + 4 × 2). */
  coupe?: number;
  /** Des billes grises en plus, sur une ligne à part : le reste. */
  reste?: number;
  legende?: string;
};

/**
 * DES RECTANGLES DE BILLES côte à côte. Un panneau = `rangees` × `colonnes`
 * billes bleues, encadrées ou non ; `reste` billes grises dessous.
 */
export const billes = (panneaux: PanneauBilles[]) => {
  const pas = 26;
  const r = 9;
  const marge = 12;
  const ecart = 18;
  const tailles = panneaux.map((p) => {
    const largeurGrille = p.colonnes * pas + 2 * marge + (p.coupe ? 10 : 0);
    const largeurReste = (p.reste ?? 0) * pas + 2 * marge;
    const largeur = Math.max(largeurGrille, largeurReste, p.legende ? p.legende.length * 8 + 8 : 0);
    const hauteur = p.rangees * pas + 2 * marge + (p.reste ? pas + 14 : 0) + (p.legende ? 24 : 0);
    return { largeur, hauteur };
  });
  const W = tailles.reduce((s, t) => s + t.largeur, 0) + ecart * (panneaux.length - 1);
  const H = Math.max(...tailles.map((t) => t.hauteur));
  let x = 0;
  const largeurMax = W > 320 ? "max-w-[26rem] print:max-w-[18rem]" : "max-w-[20rem] print:max-w-[14rem]";
  return (
    // ⭐ Un petit rectangle ne s'étire pas sur toute la largeur : ses billes
    // deviendraient énormes (vu au rendu, 10/11) — 1,25 px par unité au plus.
    <div className={`mx-auto w-full ${largeurMax}`}>
      <div className="mx-auto w-full" style={{ maxWidth: Math.round(W * 1.25) }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Billes rangées en rectangle">
        {panneaux.map((p, k) => {
          const { largeur } = tailles[k];
          const largeurGrille = p.colonnes * pas + (p.coupe ? 10 : 0);
          const gx = x + (largeur - largeurGrille) / 2;
          const gy = marge;
          const cx = (c: number) => gx + c * pas + pas / 2 + (p.coupe && c >= p.coupe ? 10 : 0);
          const cy = (l: number) => gy + l * pas + pas / 2;
          const yReste = gy + p.rangees * pas + 14;
          const g = (
            <g key={k}>
              {p.cadre === "colonnes" &&
                Array.from({ length: p.colonnes }, (_, c) => (
                  <rect key={`c${c}`} x={cx(c) - r - 3} y={gy - 1} width={2 * r + 6} height={p.rangees * pas + 2} rx={9} fill="none" stroke={VERT} strokeWidth={2} />
                ))}
              {p.cadre === "rangees" &&
                Array.from({ length: p.rangees }, (_, l) => (
                  <rect key={`l${l}`} x={gx - 1} y={cy(l) - r - 3} width={largeurGrille + 2} height={2 * r + 6} rx={9} fill="none" stroke={ORANGE} strokeWidth={2} />
                ))}
              {p.coupe ? (
                <line x1={gx + p.coupe * pas + 5} y1={gy - 4} x2={gx + p.coupe * pas + 5} y2={gy + p.rangees * pas + 4} stroke={NOIR} strokeWidth={1.5} strokeDasharray="4 3" />
              ) : null}
              {Array.from({ length: p.rangees * p.colonnes }, (_, i) => {
                const l = Math.floor(i / p.colonnes);
                const c = i % p.colonnes;
                return <circle key={i} cx={cx(c)} cy={cy(l)} r={r} fill={p.coupe && c >= p.coupe ? ORANGE : BLEU} stroke={NOIR} strokeWidth={1.2} />;
              })}
              {Array.from({ length: p.reste ?? 0 }, (_, i) => (
                <circle key={`r${i}`} cx={gx + i * pas + pas / 2} cy={yReste + pas / 2} r={r} fill={GRIS} stroke={NOIR} strokeWidth={1.2} />
              ))}
              {p.legende ? (
                <text x={x + largeur / 2} y={H - 6} textAnchor="middle" fontSize="15" fontWeight="700" fill={NOIR}>
                  {p.legende}
                </text>
              ) : null}
            </g>
          );
          x += largeur + ecart;
          return g;
        })}
      </svg>
      </div>
    </div>
  );
};

/**
 * UN MORCEAU DE LA TABLE DE PYTHAGORE : `lignes` × `colonnes`, chaque case le
 * produit, sauf celles de `cache` (clé « 7x8 ») qui portent une lettre.
 */
export const tablePythagore = (lignes: number[], colonnes: number[], cache: Record<string, string>) => {
  const c = 42;
  const W = (colonnes.length + 1) * c + 4;
  const H = (lignes.length + 1) * c + 4;
  const fond = (l: number, k: number) => (l === 0 || k === 0 ? "#e0e7ff" : "#ffffff");
  return (
    <div className="mx-auto w-full max-w-[16rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Morceau de la table de multiplication">
        {Array.from({ length: lignes.length + 1 }, (_, l) =>
          Array.from({ length: colonnes.length + 1 }, (_, k) => {
            const lettre = l && k ? cache[`${lignes[l - 1]}x${colonnes[k - 1]}`] : undefined;
            const texte = l === 0 && k === 0 ? "×" : l === 0 ? String(colonnes[k - 1]) : k === 0 ? String(lignes[l - 1]) : lettre ?? String(lignes[l - 1] * colonnes[k - 1]);
            return (
              <g key={`${l}-${k}`}>
                <rect x={2 + k * c} y={2 + l * c} width={c} height={c} fill={lettre ? "#fef3c7" : fond(l, k)} stroke={NOIR} strokeWidth={1.2} />
                <text x={2 + k * c + c / 2} y={2 + l * c + c / 2 + 6} textAnchor="middle" fontSize="17" fontWeight={l === 0 || k === 0 || lettre ? "800" : "500"} fill={lettre ? ORANGE : NOIR}>
                  {texte}
                </text>
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
};

/**
 * LE TABLEAU DE NUMÉRATION : une ligne par nombre, les chiffres rangés à
 * droite (dernier chiffre dans la dernière colonne). « ? » pour une case à trouver.
 */
export const numeration = (colonnes: string[], lignes: { label: string; chiffres: string }[]) => {
  const c = 38;
  const gauche = 110;
  const W = gauche + colonnes.length * c + 4;
  const H = (lignes.length + 1) * 34 + 6;
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Tableau de numération">
        {colonnes.map((nom, k) => (
          <g key={nom}>
            <rect x={gauche + k * c} y={2} width={c} height={34} fill="#e0e7ff" stroke={NOIR} strokeWidth={1.2} />
            <text x={gauche + k * c + c / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="800" fill={NOIR}>
              {nom}
            </text>
          </g>
        ))}
        {lignes.map((ligne, l) => {
          const y = 2 + (l + 1) * 34;
          const chiffres = ligne.chiffres.split("");
          const debut = colonnes.length - chiffres.length;
          return (
            <g key={l}>
              <text x={gauche - 8} y={y + 23} textAnchor="end" fontSize="15" fontWeight="700" fill={NOIR}>
                {ligne.label}
              </text>
              {colonnes.map((_, k) => (
                <rect key={k} x={gauche + k * c} y={y} width={c} height={34} fill="#ffffff" stroke={NOIR} strokeWidth={1.2} />
              ))}
              {chiffres.map((ch, k) => (
                <text key={k} x={gauche + (debut + k) * c + c / 2} y={y + 24} textAnchor="middle" fontSize="19" fontWeight="800" fill={ch === "?" ? ORANGE : BLEU}>
                  {ch}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * UNE OPÉRATION POSÉE en colonnes : chaque ligne rangée à droite, un caractère
 * par colonne. `signe` devant la ligne 1 (« × »), un trait sous les lignes de
 * `traits` (indices), `retenues` en petit au-dessus de la ligne 0.
 */
export const posee = (lignes: string[], opts: { signe?: string; traits?: number[]; retenues?: string; plus?: number } = {}) => {
  const w = 20;
  const h = 30;
  const n = Math.max(...lignes.map((l) => l.length)) + 1;
  const haut = opts.retenues ? 20 : 4;
  const W = n * w + 24;
  const H = haut + lignes.length * h + 10;
  const x = (k: number, long: number) => 12 + (n - long + k) * w + w / 2;
  return (
    <div className="mx-auto w-full max-w-[9rem] print:max-w-[7rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Opération posée">
        {opts.retenues
          ? opts.retenues.split("").map((ch, k) =>
              ch === " " ? null : (
                <text key={`r${k}`} x={x(k, opts.retenues!.length)} y={16} textAnchor="middle" fontSize="12" fontWeight="700" fill={ORANGE} fontFamily={MONO}>
                  {ch}
                </text>
              ),
            )
          : null}
        {lignes.map((ligne, l) => {
          const y = haut + (l + 1) * h - 8;
          return (
            <g key={l}>
              {(l === 1 && opts.signe) || l === opts.plus ? (
                <text x={14} y={y} fontSize="20" fontWeight="700" fill={NOIR}>
                  {l === 1 && opts.signe ? opts.signe : "+"}
                </text>
              ) : null}
              {ligne.split("").map((ch, k) =>
                ch === " " ? null : (
                  <text key={k} x={x(k, ligne.length)} y={y} textAnchor="middle" fontSize="20" fontWeight="700" fill={ch === "?" || /[A-Z■]/.test(ch) ? ORANGE : NOIR} fontFamily={MONO}>
                    {ch}
                  </text>
                ),
              )}
              {opts.traits?.includes(l) ? <line x1={10} y1={y + 8} x2={W - 6} y2={y + 8} stroke={NOIR} strokeWidth={1.8} /> : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * UNE DIVISION POSÉE (la potence). À gauche le dividende, puis les lignes de
 * calcul (`fin` = colonne de leur dernier chiffre, comptée dans le dividende ;
 * `moins` : un « − » devant et un trait dessous). À droite le diviseur, le
 * trait, puis le quotient (« ? » s'il est à trouver).
 */
export const potence = (dividende: string, diviseur: string, quotient: string, lignes: { t: string; fin: number; moins?: boolean }[] = []) => {
  const w = 20;
  const h = 30;
  const x0 = 26;
  const xBarre = x0 + dividende.length * w + 12;
  const W = xBarre + Math.max(diviseur.length, quotient.length) * w + 30;
  const H = Math.max(lignes.length + 1, 2) * h + 14; // le quotient est sur la 2e ligne
  const ecrire = (t: string, fin: number, y: number, couleur = NOIR) =>
    t.split("").map((ch, k) => (
      <text key={k} x={x0 + (fin - t.length + 1 + k) * w + w / 2} y={y} textAnchor="middle" fontSize="20" fontWeight="700" fill={couleur} fontFamily={MONO}>
        {ch}
      </text>
    ));
  return (
    <div className="mx-auto w-full max-w-[12rem] print:max-w-[9rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Division posée">
        <g>{ecrire(dividende, dividende.length - 1, h - 6)}</g>
        <line x1={xBarre} y1={6} x2={xBarre} y2={H - 4} stroke={NOIR} strokeWidth={2} />
        <line x1={xBarre} y1={h + 2} x2={W - 4} y2={h + 2} stroke={NOIR} strokeWidth={2} />
        {diviseur.split("").map((ch, k) => (
          <text key={`d${k}`} x={xBarre + 12 + k * w + w / 2} y={h - 6} textAnchor="middle" fontSize="20" fontWeight="700" fill={NOIR} fontFamily={MONO}>
            {ch}
          </text>
        ))}
        {quotient.split("").map((ch, k) => (
          <text key={`q${k}`} x={xBarre + 12 + k * w + w / 2} y={2 * h - 2} textAnchor="middle" fontSize="20" fontWeight="800" fill={ch === "?" ? ORANGE : BLEU} fontFamily={MONO}>
            {ch}
          </text>
        ))}
        {lignes.map((l, i) => {
          const y = (i + 2) * h - 6;
          return (
            <g key={i}>
              {l.moins ? (
                <>
                  <text x={x0 + (l.fin - l.t.length + 1) * w - 4} y={y} textAnchor="end" fontSize="20" fontWeight="700" fill={NOIR}>
                    −
                  </text>
                  <line x1={x0 + (l.fin - l.t.length + 1) * w - 16} y1={y + 7} x2={x0 + (l.fin + 1) * w + 2} y2={y + 7} stroke={NOIR} strokeWidth={1.6} />
                </>
              ) : null}
              {ecrire(l.t, l.fin, y, l.t.includes("?") ? ORANGE : NOIR)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
