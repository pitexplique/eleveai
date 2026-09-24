// ─── Fiche d'exercices : le théorème de Thalès (3e) — 20 exercices corrigés ────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-thales.tsx` et sur les
// micros du coach de 3e (notionId thales_theoreme). Le programme de 3e : les deux
// configurations (triangles emboîtés et papillon), les quotients, le calcul
// d'une longueur, la réciproque (avec l'ORDRE des points) et la contraposée, et
// la rédaction du brevet.
// ⛔ Aucun nombre de la fiche de cours n'est repris : ni AM = 2, AB = 3, AN = 4,
// AC = 6, ni la pyramide de Khéops.
//
// Les pièges qui reviennent : les quotients qui ne suivent pas le même triangle
// (2, 4, 10), AM/MB au lieu de AM/AB (6, 13, 16, 18), la réciproque sans l'ordre
// des points (11, 12), le papillon qu'on ne reconnaît pas (1, 3, 10, 20), les
// quotients comparés après arrondi (8).
//
// Les chiffres du monde, et d'où ils viennent :
// - la Mausefalle, sur la Streif (Kitzbühel, Autriche) : pente maximale de 85 %,
//   chiffre publié par le Kitzbüheler Ski Club, organisateur du Hahnenkamm-Rennen
//   — ex. 19 ;
// - capteur « plein format » : 36 mm × 24 mm, le format du film 135 ; l'objectif
//   « standard » d'un tel appareil a une focale de 50 mm — ex. 20 ;
// - la tour Eiffel mesure 330 m depuis la pose d'une nouvelle antenne en 2022
//   (Société d'exploitation de la tour Eiffel) — ex. 20 ;
// - le jalon de 2 m et la rivière (ex. 17 et 18) : nombres choisis, méthode réelle
//   des arpenteurs.
//
// ⭐ LES SCHÉMAS : presque chaque corrigé dessine SA configuration à l'échelle,
// depuis de vraies coordonnées — les parallèles en bleu, avec leurs chevrons, les
// longueurs écrites dessus, la longueur trouvée en orange. Le helper `thales()`
// est local : le canvas `thales` du coach place ses étiquettes à des décalages
// fixes, calés sur SES points par défaut, et ne sait pas dessiner une figure à
// l'échelle de l'énoncé. Du SVG simple, texte nu (pas de `$`), police 13 dans un
// cadre de 300 de large.
// ⭐ Le script de recalcul relit chaque appel `thales({ … })` : les coordonnées
// et les étiquettes s'écrivent EN CLAIR, sur une seule ligne.
//
// Les corrigés sont écrits à la première personne (« je cherche »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-thales-3e.mjs` — chaque
// longueur est recalculée en fractions exactes ET mesurée sur la figure dessinée
// (distance entre les points), chaque parallélisme vérifié sur les coordonnées.
//
// Micro-compétences : thales_configuration (1, 2, 3, 10, 20), thales_rapport (2,
// 3, 4, 6, 16), thales_calculer_longueur (4, 5, 6, 9, 10, 13, 14, 15, 17, 18, 19,
// 20), thales_reciproque (7, 8, 11, 12, 15), thales_rediger (9, 10, 12, 13, 14,
// 15, 17), thales_defi (11, 14, 16, 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

type Pt = [number, number];
type Sommet = "A" | "B" | "C" | "M" | "N";
type Cote = "AM" | "AB" | "AN" | "AC" | "MN" | "BC" | "MB" | "NC";

const ENCRE = "#1e293b";
const ROUGE = "#dc2626";

const EXTREMITES: Record<Cote, [Sommet, Sommet]> = {
  AM: ["A", "M"],
  AB: ["A", "B"],
  AN: ["A", "N"],
  AC: ["A", "C"],
  MN: ["M", "N"],
  BC: ["B", "C"],
  MB: ["M", "B"],
  NC: ["N", "C"],
};
// L'étiquette d'un côté se pose du côté OPPOSÉ à ce point : hors des triangles.
const REPOUSSE: Record<Cote, Sommet> = { AM: "N", AB: "C", MB: "C", AN: "M", AC: "B", NC: "B", MN: "A", BC: "A" };
const VOISINS: Record<Sommet, Sommet[]> = {
  A: ["M", "B", "N", "C"],
  B: ["A", "C", "M"],
  C: ["A", "B", "N"],
  M: ["A", "B", "N"],
  N: ["A", "C", "M"],
};

/**
 * ⭐ UNE CONFIGURATION DE THALÈS À L'ÉCHELLE. Les deux sécantes se coupent en A ;
 * M est sur la droite (AB), N sur la droite (AC). Coordonnées réelles (y vers le
 * haut), dans l'unité de l'énoncé : la figure est mise à l'échelle du cadre.
 * - `cotes` : le texte écrit le long de chaque côté (sans `$`) ;
 * - `trouve` : les longueurs calculées dans le corrigé, écrites en orange ;
 * - `paralleles: false` : (MN) et (BC) NE sont PAS parallèles — rouge et bleu,
 *   sans chevrons ;
 * - `echelle: false` : figure de principe (la photo : le capteur serait invisible) ;
 * - `remplir` : le petit triangle AMN teinté d'orange, le grand ABC de bleu ;
 * - `interieur` : l'étiquette de [MN] dans le petit triangle (trapèze étroit).
 */
const thales = (f: {
  A: Pt;
  B: Pt;
  C: Pt;
  M: Pt;
  N: Pt;
  noms?: Partial<Record<Sommet, string>>;
  cotes?: Partial<Record<Cote, string>>;
  trouve?: Cote[];
  paralleles?: boolean;
  echelle?: boolean;
  remplir?: boolean;
  titre?: string;
  /** L'étiquette de [MN] côté A (dans le petit triangle) : pour un trapèze étroit. */
  interieur?: boolean;
}) => {
  const P: Record<Sommet, Pt> = { A: f.A, B: f.B, C: f.C, M: f.M, N: f.N };
  const tous = Object.values(P);
  const xs = tous.map((p) => p[0]);
  const ys = tous.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const W = 300;
  const mx = 52;
  const my = 40;
  const haut = f.titre ? 20 : 0;
  const s = Math.min((W - 2 * mx) / Math.max(x1 - x0, 1e-9), (290 - 2 * my) / Math.max(y1 - y0, 1e-9));
  const H = (y1 - y0) * s + 2 * my + haut + (f.echelle === false ? 18 : 0);
  const dx = (W - (x1 - x0) * s) / 2;
  const E = (k: Sommet): [number, number] => [dx + (P[k][0] - x0) * s, haut + my + (y1 - P[k][1]) * s];
  const nom = (k: Sommet) => f.noms?.[k] ?? k;
  const paralleles = f.paralleles !== false;

  // Le paramètre de r sur la droite (p q) : 0 en p, 1 en q.
  const t = (p: Sommet, q: Sommet, r: Sommet) => {
    const [ux, uy] = [P[q][0] - P[p][0], P[q][1] - P[p][1]];
    return ((P[r][0] - P[p][0]) * ux + (P[r][1] - P[p][1]) * uy) / (ux * ux + uy * uy);
  };
  const tM = t("A", "B", "M");
  const tN = t("A", "C", "N");

  // Chaque sécante tracée d'un bout à l'autre de ses trois points.
  const bouts = (trio: Sommet[]) => {
    let meilleur: [Sommet, Sommet] = [trio[0], trio[1]];
    let d = -1;
    for (const a of trio)
      for (const b of trio) {
        const l = Math.hypot(P[a][0] - P[b][0], P[a][1] - P[b][1]);
        if (l > d) {
          d = l;
          meilleur = [a, b];
        }
      }
    return meilleur;
  };

  // ⭐ Les étiquettes des côtés d'abord, les noms des points ensuite : un nom
  // fuit ses voisins ET les étiquettes posées à moins de 45 px de lui.
  const cotes = Object.entries(f.cotes ?? {}) as [Cote, string][];
  const placeCote = (cle: Cote, texte: string): [number, number] => {
    const [u, v] = EXTREMITES[cle];
    // AB quand M est entre A et B : la cote « totale » passe sur une deuxième
    // rangée, sous celles de AM et MB (comme sur un plan). Idem pour AC.
    const totale = (cle === "AB" && tM > 0 && tM < 1) || (cle === "AC" && tN > 0 && tN < 1);
    const [ax, ay] = E(u);
    const [bx, by] = E(v);
    const l = Math.hypot(bx - ax, by - ay) || 1;
    let [nx, ny] = [-(by - ay) / l, (bx - ax) / l];
    const [mx0, my0] = [(ax + bx) / 2, (ay + by) / 2];
    const [rx, ry] = E(cle === "MN" && f.interieur ? "B" : REPOUSSE[cle]);
    if (nx * (rx - mx0) + ny * (ry - my0) > 0) [nx, ny] = [-nx, -ny];
    const w = 7.2 * texte.length;
    const d = 8 + (Math.abs(nx) * w) / 2 + Math.abs(ny) * 7 + (totale ? 17 : 0);
    const x = Math.min(Math.max(mx0 + nx * d, 4 + w / 2), W - 4 - w / 2);
    return [x, my0 + ny * d + 4.5];
  };
  const posCotes = cotes.map(([cle, texte]) => placeCote(cle, texte));

  const placeNom = (k: Sommet): [number, number] => {
    const [px, py] = E(k);
    const angles = [
      ...VOISINS[k].map((v) => E(v)),
      ...posCotes.map(([x, y]) => [x, y - 4.5] as [number, number]).filter(([x, y]) => Math.hypot(x - px, y - py) < 45),
    ]
      .filter(([qx, qy]) => Math.hypot(qx - px, qy - py) > 1e-6)
      .map(([qx, qy]) => Math.atan2(qy - py, qx - px));
    let best = 0;
    let score = -1;
    for (let i = 0; i < 24; i++) {
      const a = (i * Math.PI) / 12;
      const sc = Math.min(
        ...angles.map((b) => {
          const d = Math.abs(a - b) % (2 * Math.PI);
          return d > Math.PI ? 2 * Math.PI - d : d;
        }),
      );
      if (sc > score) {
        score = sc;
        best = a;
      }
    }
    return [px + 13 * Math.cos(best), py + 13 * Math.sin(best) + 5];
  };

  const chevron = (p: Sommet, q: Sommet, key: string) => {
    const [ax, ay] = E(p);
    const [bx, by] = E(q);
    // Le chevron au tiers du côté, pas au milieu : le milieu porte l'étiquette.
    const [cx, cy] = [ax + 0.3 * (bx - ax), ay + 0.3 * (by - ay)];
    const [bBx, bBy] = E("B");
    const [bCx, bCy] = E("C");
    const l = Math.hypot(bCx - bBx, bCy - bBy) || 1;
    const [ux, uy] = [(bCx - bBx) / l, (bCy - bBy) / l];
    const [nx, ny] = [-uy, ux];
    return (
      <polyline
        key={key}
        points={`${cx - ux * 3 + nx * 5},${cy - uy * 3 + ny * 5} ${cx + ux * 3},${cy + uy * 3} ${cx - ux * 3 - nx * 5},${cy - uy * 3 - ny * 5}`}
        fill="none"
        stroke={BLEU}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  };

  const ligne = ([p, q]: [Sommet, Sommet], couleur: string, epaisseur: number, key: string) => {
    const [ax, ay] = E(p);
    const [bx, by] = E(q);
    return <line key={key} x1={ax} y1={ay} x2={bx} y2={by} stroke={couleur} strokeWidth={epaisseur} strokeLinecap="round" />;
  };
  const poly = (ks: Sommet[]) => ks.map((k) => E(k).map((z) => z.toFixed(1)).join(",")).join(" ");
  const halo = { stroke: "white", strokeWidth: 3.5, paintOrder: "stroke" as const, strokeLinejoin: "round" as const };

  const decrit =
    `Configuration de Thalès${tM < 0 ? " en papillon" : ""} : ${nom("A")}, ${nom("M")}, ${nom("B")} alignés ; ${nom("A")}, ${nom("N")}, ${nom("C")} alignés ; ` +
    `(${nom("M")}${nom("N")}) et (${nom("B")}${nom("C")}) ${paralleles ? "parallèles" : "non parallèles"}` +
    (cotes.length ? `. ${cotes.map(([k, v]) => `${nom(EXTREMITES[k][0])}${nom(EXTREMITES[k][1])} : ${v}`).join(", ")}` : "");

  return (
    <svg
      viewBox={`0 0 ${W} ${H.toFixed(0)}`}
      role="img"
      aria-label={decrit}
      className="mx-auto block w-full max-w-[19rem] rounded-lg bg-white print:max-w-[13rem]"
    >
      {f.titre ? (
        <text x={8} y={16} fontSize={13} fontWeight={700} fill={ENCRE}>
          {f.titre}
        </text>
      ) : null}
      {f.remplir ? (
        <>
          <polygon points={poly(["A", "B", "C"])} fill={BLEU} fillOpacity={0.1} />
          <polygon points={poly(["A", "M", "N"])} fill={ORANGE} fillOpacity={0.18} />
        </>
      ) : null}
      {ligne(bouts(["A", "M", "B"]), ENCRE, 2, "s1")}
      {ligne(bouts(["A", "N", "C"]), ENCRE, 2, "s2")}
      {ligne(["M", "N"], paralleles ? BLEU : ROUGE, 3, "mn")}
      {ligne(["B", "C"], BLEU, 3, "bc")}
      {paralleles ? [chevron("M", "N", "c1"), chevron("B", "C", "c2")] : null}
      {(["A", "B", "C", "M", "N"] as Sommet[]).map((k) => {
        const [px, py] = E(k);
        const [lx, ly] = placeNom(k);
        return (
          <g key={k}>
            <circle cx={px} cy={py} r={3} fill={ENCRE} />
            <text x={lx} y={ly} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE} {...halo}>
              {nom(k)}
            </text>
          </g>
        );
      })}
      {cotes.map(([cle, texte], i) => {
        const [x, y] = posCotes[i];
        const trouve = f.trouve?.includes(cle);
        const couleur = trouve ? ORANGE : cle === "MN" || cle === "BC" ? BLEU : ENCRE;
        return (
          <text key={cle} x={x} y={y} textAnchor="middle" fontSize={13} fontWeight={trouve ? 800 : 600} fill={couleur} {...halo}>
            {texte}
          </text>
        );
      })}
      {f.echelle === false ? (
        <text x={W / 2} y={H - 6} textAnchor="middle" fontSize={13} fontStyle="italic" fill="#64748b">
          (pas à l'échelle)
        </text>
      ) : null}
    </svg>
  );
};

export const exercicesThales3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "thales-theoreme",
  titre: "Le théorème de Thalès",
  accroche:
    "Vingt exercices, de la figure seule au problème : reconnaître la configuration, même en papillon, écrire les bons quotients, calculer une longueur, prouver que deux droites sont parallèles (ou qu'elles ne le sont pas), puis mesurer un arbre par son ombre, une rivière sans la traverser, une piste de ski et le champ d'un appareil photo. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est rédigée comme au brevet, étape par étape, avec la figure à l'échelle et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/thales-theoreme", titre: "Le théorème de Thalès" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je repère le sommet commun, puis le petit et le grand triangle.",
      rappel: [
        "Deux droites sécantes en $A$, coupées par deux droites parallèles $(MN)$ et $(BC)$ : c'est une configuration de Thalès. Les triangles sont soit emboîtés, soit en papillon, de part et d'autre de $A$.",
        "LE THÉORÈME : si $M \\in (AB)$, $N \\in (AC)$ et $(MN) // (BC)$, alors $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.",
        "En haut, les côtés du triangle $AMN$ ; en bas, ceux du triangle $ABC$, dans le même ordre. Chaque longueur des deux premiers quotients part de $A$.",
        "LA RÉCIPROQUE : si $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ et si les points $A$, $M$, $B$ et $A$, $N$, $C$ sont dans le même ordre, alors $(MN) // (BC)$.",
      ],
      exercices: [
        {
          enonce:
            "Les droites $(BM)$ et $(CN)$ se coupent en $A$, et $(MN) // (BC)$.\na) $M$ est sur le segment $[AB]$ et $N$ sur le segment $[AC]$. Quelle est la configuration ?\nb) Cette fois, $A$ est sur le segment $[MB]$ et sur le segment $[NC]$. Quelle est la configuration ?\nc) Dans chaque cas, nommer les deux triangles que l'on compare.",
          correction:
            "Je regarde où se trouvent $M$ et $N$ par rapport au point commun $A$.\na) $M$ et $N$ sont du MÊME côté de $A$ que $B$ et $C$ : le petit triangle $AMN$ est dans le grand triangle $ABC$. Ce sont des triangles emboîtés.\nb) $M$ et $N$ sont de l'AUTRE côté de $A$ : les deux triangles se touchent par la pointe $A$, comme les deux ailes d'un papillon. C'est la configuration papillon.\nc) Dans les deux cas, je compare le triangle $AMN$ au triangle $ABC$ : ils ont le sommet $A$ en commun, et leurs côtés $[MN]$ et $[BC]$ sont parallèles.\n⛔ Le piège : croire que le théorème ne marche pas en papillon. Les deux conditions sont là (deux droites sécantes en $A$, deux droites parallèles) : c'est la même configuration, retournée.\nRéponse : a) triangles emboîtés ; b) papillon ; c) $AMN$ et $ABC$ dans les deux cas.",
          schema: (
            <div className="space-y-2">
              {thales({ A: [0, 0], B: [10, 0], C: [6, 8], M: [4, 0], N: [2.4, 3.2], remplir: true, titre: "a) triangles emboîtés" })}
              {thales({ A: [0, 0], B: [6, 0], C: [3.6, 4.8], M: [-3, 0], N: [-1.8, -2.4], remplir: true, titre: "b) papillon" })}
            </div>
          ),
          micros: ["thales_configuration"],
        },
        {
          enonce:
            "Sur la figure, les points $E$, $R$, $S$ sont alignés, ainsi que $E$, $T$, $U$, et $(RT) // (SU)$.\na) Quel est le point commun des deux sécantes ?\nb) Écrire les trois quotients égaux donnés par le théorème de Thalès.",
          figure: thales({ A: [0, 0], B: [9, 0], C: [5.4, 7.2], M: [3, 0], N: [1.8, 2.4], noms: { A: "E", M: "R", B: "S", N: "T", C: "U" } }),
          correction:
            "a) Les droites $(RS)$ et $(TU)$ passent toutes les deux par $E$ : c'est le sommet commun, il joue le rôle de $A$.\nb) Je nomme les deux triangles : le petit $ERT$ et le grand $ESU$. Je range leurs côtés face à face : $ER$ va avec $ES$ (même droite), $ET$ avec $EU$ (même droite), et $RT$ avec $SU$ (les parallèles).\nJ'écris le petit triangle en haut, le grand en bas, dans le même ordre.\n⛔ Le piège : écrire $\\dfrac{ER}{ES} = \\dfrac{EU}{ET}$. Le premier quotient a le petit en haut, le second le grand en haut : l'égalité est fausse.\nRéponse : $\\dfrac{ER}{ES} = \\dfrac{ET}{EU} = \\dfrac{RT}{SU}$.",
          schema: thales({ A: [0, 0], B: [9, 0], C: [5.4, 7.2], M: [3, 0], N: [1.8, 2.4], noms: { A: "E", M: "R", B: "S", N: "T", C: "U" }, remplir: true }),
          micros: ["thales_configuration", "thales_rapport"],
        },
        {
          enonce:
            "Les droites $(KL)$ et $(PQ)$ se coupent en $O$, et $(KP) // (LQ)$. Le point $O$ est entre $K$ et $L$, et entre $P$ et $Q$.\na) Quelle est la configuration ?\nb) Écrire les trois quotients égaux.\nc) On a $OK = 4$ cm et $OL = 8$ cm. Que vaut le quotient $\\dfrac{OP}{OQ}$ ?",
          correction:
            "a) $O$ est entre les points : les triangles $OKP$ et $OLQ$ sont de part et d'autre de $O$. C'est un papillon.\nb) Le triangle $OKP$ d'un côté, le triangle $OLQ$ de l'autre. $OK$ et $OL$ sont sur la même droite, $OP$ et $OQ$ aussi, et $KP$ va avec $LQ$ : $\\dfrac{OK}{OL} = \\dfrac{OP}{OQ} = \\dfrac{KP}{LQ}$.\nc) $\\dfrac{OP}{OQ} = \\dfrac{OK}{OL} = \\dfrac{4}{8} = 0{,}5$. Le triangle $OKP$ est deux fois plus petit que le triangle $OLQ$.\n⛔ Le piège : écrire $\\dfrac{OK}{KL}$. En papillon, $[KL]$ traverse $O$ : ce n'est un côté d'aucun des deux triangles. Chaque longueur part de $O$.\nRéponse : un papillon ; $\\dfrac{OK}{OL} = \\dfrac{OP}{OQ} = \\dfrac{KP}{LQ}$ ; ce quotient vaut $0{,}5$.",
          schema: thales({ A: [0, 0], B: [8, 0], C: [4.8, 6.4], M: [-4, 0], N: [-2.4, -3.2], noms: { A: "O", M: "K", B: "L", N: "P", C: "Q" }, cotes: { AM: "4 cm", AB: "8 cm" }, remplir: true }),
          micros: ["thales_configuration", "thales_rapport"],
        },
        {
          enonce:
            "$M$ est sur $[AB]$, $N$ sur $[AC]$ et $(MN) // (BC)$. On donne $AM = 4$ cm, $AB = 10$ cm et $AC = 15$ cm. Calculer $AN$.",
          correction:
            "Les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et $(MN) // (BC)$ : je peux appliquer le théorème de Thalès.\n$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\nJe garde le quotient où tout est connu et celui qui contient la longueur cherchée : $\\dfrac{4}{10} = \\dfrac{AN}{15}$.\nProduit en croix : $AN = \\dfrac{15 \\times 4}{10} = 6$ cm.\n⭐ Contrôle : $\\dfrac{6}{15} = 0{,}4$ et $\\dfrac{4}{10} = 0{,}4$. Les deux quotients sont bien égaux.\n⛔ Le piège : écrire $\\dfrac{4}{10} = \\dfrac{15}{AN}$. Le petit triangle reste en haut dans les DEUX quotients.\nRéponse : $AN = 6$ cm.",
          schema: thales({ A: [0, 0], B: [10, 0], C: [9, 12], M: [4, 0], N: [3.6, 4.8], cotes: { AM: "4 cm", AB: "AB = 10 cm", AC: "AC = 15 cm", AN: "6 cm" }, trouve: ["AN"] }),
          micros: ["thales_rapport", "thales_calculer_longueur"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. On donne $AM = 5$ cm, $AB = 8$ cm et $BC = 12$ cm. Calculer $MN$.",
          correction:
            "Les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\nJe cherche $MN$, je connais $AM$, $AB$ et $BC$ : $\\dfrac{5}{8} = \\dfrac{MN}{12}$.\n$MN = \\dfrac{12 \\times 5}{8} = 7{,}5$ cm.\n⭐ $MN$ est plus petit que $BC$ : normal, $[MN]$ est un côté du petit triangle.\n⛔ Le piège : calculer $\\dfrac{8 \\times 5}{12}$. Dans un produit en croix, je multiplie les deux nombres en DIAGONALE ($12$ et $5$), puis je divise par le troisième.\nRéponse : $MN = 7{,}5$ cm.",
          schema: thales({ A: [0, 0], B: [8, 0], C: [0.8, 9.6], M: [5, 0], N: [0.5, 6], cotes: { AM: "5 cm", AB: "AB = 8 cm", BC: "12 cm", MN: "7,5 cm" }, trouve: ["MN"] }),
          micros: ["thales_calculer_longueur"],
        },
        {
          enonce:
            "$M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. On donne $AM = 6$ cm, $MB = 4$ cm et $AN = 9$ cm.\na) Calculer $AB$.\nb) Calculer $AC$, puis $NC$.",
          correction:
            "a) $M$ est sur le segment $[AB]$ : $AB = AM + MB = 6 + 4 = 10$ cm.\nb) Les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$, soit $\\dfrac{6}{10} = \\dfrac{9}{AC}$.\nProduit en croix : $AC = \\dfrac{10 \\times 9}{6} = 15$ cm.\nPuis $NC = AC - AN = 15 - 9 = 6$ cm.\n⛔ Le piège : écrire $\\dfrac{AM}{MB} = \\dfrac{AN}{AC}$, avec $MB = 4$. $[MB]$ n'est un côté d'aucun des deux triangles : chaque longueur du quotient part de $A$. Ce calcul donnerait $AC = \\dfrac{4 \\times 9}{6} = 6$ cm, plus court que $AN$ : absurde.\nRéponse : $AB = 10$ cm, $AC = 15$ cm et $NC = 6$ cm.",
          schema: thales({ A: [0, 0], B: [10, 0], C: [12, 9], M: [6, 0], N: [7.2, 5.4], cotes: { AM: "6 cm", MB: "4 cm", AN: "9 cm", NC: "6 cm" }, trouve: ["NC"] }),
          micros: ["thales_rapport", "thales_calculer_longueur"],
        },
        {
          enonce:
            "Les points $A$, $M$, $B$ sont alignés dans cet ordre, ainsi que $A$, $N$, $C$. On mesure $AM = 3{,}6$ cm, $AB = 6$ cm, $AN = 4{,}2$ cm et $AC = 7$ cm. Les droites $(MN)$ et $(BC)$ sont-elles parallèles ?",
          correction:
            "Je ne sais PAS si les droites sont parallèles : je ne peux pas utiliser le théorème. Je calcule séparément les deux quotients.\n$\\dfrac{AM}{AB} = \\dfrac{3{,}6}{6} = 0{,}6$ et $\\dfrac{AN}{AC} = \\dfrac{4{,}2}{7} = 0{,}6$.\nLes deux quotients sont égaux, et les points $A$, $M$, $B$ et $A$, $N$, $C$ sont dans le même ordre.\nD'après la réciproque du théorème de Thalès, $(MN) // (BC)$.\n⛔ Le piège : écrire « d'après le théorème de Thalès, $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ » dès la première ligne. Le théorème SUPPOSE les droites parallèles : c'est justement ce qu'on cherche.\nRéponse : oui, $(MN)$ et $(BC)$ sont parallèles.",
          schema: thales({ A: [0, 0], B: [6, 0], C: [4.2, 5.6], M: [3.6, 0], N: [2.52, 3.36], cotes: { AM: "3,6 cm", AB: "AB = 6 cm", AN: "4,2 cm", AC: "AC = 7 cm" } }),
          micros: ["thales_reciproque"],
        },
        {
          enonce:
            "Les points $A$, $M$, $B$ sont alignés dans cet ordre, ainsi que $A$, $N$, $C$. On mesure $AM = 5$ cm, $AB = 8$ cm, $AN = 6$ cm et $AC = 10$ cm. Les droites $(MN)$ et $(BC)$ sont-elles parallèles ?",
          correction:
            "Je calcule séparément les deux quotients.\n$\\dfrac{AM}{AB} = \\dfrac{5}{8} = 0{,}625$ et $\\dfrac{AN}{AC} = \\dfrac{6}{10} = 0{,}6$.\nIls ne sont pas égaux. Or, si les droites étaient parallèles, le théorème de Thalès dirait qu'ils sont égaux.\nD'après la contraposée du théorème de Thalès, $(MN)$ et $(BC)$ ne sont pas parallèles.\n⭐ Sans décimaux, par les produits en croix : $5 \\times 10 = 50$ et $8 \\times 6 = 48$. $50 \\neq 48$.\n⛔ Le piège : arrondir, « $0{,}6$ et $0{,}6$, c'est pareil ». Les quotients doivent être EXACTEMENT égaux. Sur le dessin, l'écart se voit à peine : c'est le calcul qui tranche.\nRéponse : non, $(MN)$ et $(BC)$ ne sont pas parallèles.",
          schema: thales({ A: [0, 0], B: [8, 0], C: [6, 8], M: [5, 0], N: [3.6, 4.8], cotes: { AM: "5 cm", AB: "AB = 8 cm", AN: "6 cm", AC: "AC = 10 cm" }, paralleles: false }),
          micros: ["thales_reciproque"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Comme au brevet : les hypothèses, le nom du théorème, les quotients, puis le calcul.",
      rappel: [
        "LA RÉDACTION DU BREVET : je cite les hypothèses (les deux droites sécantes et les deux parallèles), je nomme le théorème, j'écris les quotients, puis je calcule.",
        "« Les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$. »",
        "Pour PROUVER un parallélisme : la réciproque, avec deux quotients égaux ET les points dans le même ordre. Pour prouver le contraire : la contraposée, avec deux quotients différents.",
      ],
      exercices: [
        {
          enonce:
            "Les droites $(BM)$ et $(CN)$ sont sécantes en $A$, avec $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. On donne $AM = 2{,}4$ cm, $AB = 6$ cm, $AC = 7{,}5$ cm et $BC = 4{,}5$ cm. Calculer $AN$ et $MN$, en rédigeant comme au brevet.",
          correction:
            "Je commence par les hypothèses, puis le théorème, puis le calcul.\nLes droites $(BM)$ et $(CN)$ sont sécantes en $A$ et les droites $(MN)$ et $(BC)$ sont parallèles.\nD'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$, soit $\\dfrac{2{,}4}{6} = \\dfrac{AN}{7{,}5} = \\dfrac{MN}{4{,}5}$.\nCalcul de $AN$ : $AN = \\dfrac{7{,}5 \\times 2{,}4}{6} = 3$ cm.\nCalcul de $MN$ : $MN = \\dfrac{4{,}5 \\times 2{,}4}{6} = 1{,}8$ cm.\n⭐ Le quotient commun vaut $\\dfrac{2{,}4}{6} = 0{,}4$ : chaque côté du petit triangle mesure $0{,}4$ fois le côté correspondant du grand. $0{,}4 \\times 7{,}5 = 3$ et $0{,}4 \\times 4{,}5 = 1{,}8$.\n⛔ Le piège : sauter la phrase des hypothèses. Au brevet, la rédaction rapporte autant de points que le résultat.\nRéponse : $AN = 3$ cm et $MN = 1{,}8$ cm.",
          schema: thales({ A: [0, 0], B: [6, 0], C: [6, 4.5], M: [2.4, 0], N: [2.4, 1.8], cotes: { AM: "2,4 cm", AB: "AB = 6 cm", AC: "AC = 7,5 cm", BC: "4,5 cm", AN: "3 cm", MN: "1,8 cm" }, trouve: ["AN", "MN"] }),
          micros: ["thales_calculer_longueur", "thales_rediger"],
        },
        {
          enonce:
            "Les droites $(BM)$ et $(CN)$ sont sécantes en $A$. Le point $A$ est entre $B$ et $M$, et entre $C$ et $N$, et $(MN) // (BC)$. On donne $AB = 4$ cm, $AC = 5$ cm, $AM = 6$ cm et $MN = 9$ cm.\na) De quelle configuration s'agit-il ?\nb) Calculer $AN$ et $BC$.",
          correction:
            "a) $A$ est entre les points : les triangles $ABC$ et $AMN$ sont de part et d'autre de $A$. C'est un papillon.\nb) Les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$, soit $\\dfrac{6}{4} = \\dfrac{AN}{5} = \\dfrac{9}{BC}$.\n$AN = \\dfrac{5 \\times 6}{4} = 7{,}5$ cm.\n$BC = \\dfrac{4 \\times 9}{6} = 6$ cm.\n⭐ Ici, le triangle $AMN$ est le PLUS GRAND : le quotient vaut $1{,}5$. Ce n'est pas grave, pourvu que $AMN$ reste en haut dans les trois quotients.\n⛔ Le piège : lire les longueurs en travers du papillon, par exemple $\\dfrac{AM}{AC}$. $[AM]$ et $[AC]$ ne sont pas sur la même droite : chaque quotient réunit deux longueurs d'une MÊME droite, ou les deux parallèles.\nRéponse : un papillon ; $AN = 7{,}5$ cm et $BC = 6$ cm.",
          schema: thales({ A: [0, 0], B: [4, 0], C: [0.625, 4.96078], M: [-6, 0], N: [-0.9375, -7.44117], cotes: { AB: "4 cm", AC: "5 cm", AM: "6 cm", MN: "9 cm", AN: "7,5 cm", BC: "6 cm" }, trouve: ["AN", "BC"], remplir: true }),
          micros: ["thales_configuration", "thales_calculer_longueur", "thales_rediger"],
        },
        {
          enonce:
            "Les points $A$, $M$, $B$ sont alignés, ainsi que $A$, $N$, $C$. $M$ est sur le segment $[AB]$, mais $A$ est sur le segment $[NC]$. On a $AM = 2$ cm, $AB = 5$ cm, $AN = 3$ cm et $AC = 7{,}5$ cm.\na) Calculer $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$.\nb) Un élève conclut : « les quotients sont égaux, donc $(MN) // (BC)$ ». A-t-il raison ?",
          correction:
            "a) $\\dfrac{AM}{AB} = \\dfrac{2}{5} = 0{,}4$ et $\\dfrac{AN}{AC} = \\dfrac{3}{7{,}5} = 0{,}4$. Ils sont égaux.\nb) Non. La réciproque demande AUSSI que les points soient dans le même ordre sur les deux droites. Sur la première droite, l'ordre est $A$, $M$, $B$ ; sur la seconde, c'est $N$, $A$, $C$ : $M$ est du côté de $B$, mais $N$ est de l'autre côté de $A$ que $C$.\nLe dessin le montre : $(MN)$ et $(BC)$ ne sont pas parallèles, elles finiraient par se couper.\n⛔ Le piège : oublier l'ordre des points. L'égalité des quotients ne suffit pas : la réciproque a DEUX conditions.\nRéponse : les deux quotients valent $0{,}4$, mais l'élève a tort : les points ne sont pas dans le même ordre, et $(MN)$ n'est pas parallèle à $(BC)$.",
          schema: thales({ A: [0, 0], B: [5, 0], C: [4.5, 6], M: [2, 0], N: [-1.8, -2.4], cotes: { AM: "2 cm", AB: "AB = 5 cm", AN: "3 cm", AC: "7,5 cm" }, paralleles: false }),
          micros: ["thales_reciproque", "thales_defi"],
        },
        {
          enonce:
            "Les points $M$, $A$, $B$ sont alignés dans cet ordre, ainsi que $N$, $A$, $C$. On donne $AM = 4{,}2$ cm, $AB = 6$ cm, $AN = 5{,}6$ cm et $AC = 8$ cm. Démontrer que $(MN) // (BC)$.",
          correction:
            "Je ne sais pas encore si les droites sont parallèles : c'est la réciproque qu'il faut.\nD'une part, $\\dfrac{AM}{AB} = \\dfrac{4{,}2}{6} = 0{,}7$. D'autre part, $\\dfrac{AN}{AC} = \\dfrac{5{,}6}{8} = 0{,}7$.\nDonc $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.\nDe plus, les points $M$, $A$, $B$ et $N$, $A$, $C$ sont alignés dans le même ordre : $A$ est au milieu des deux alignements.\nD'après la réciproque du théorème de Thalès, les droites $(MN)$ et $(BC)$ sont parallèles.\n⛔ Le piège : croire que la réciproque ne marche qu'avec des triangles emboîtés. En papillon, « le même ordre » veut dire : $A$ entre $M$ et $B$, ET $A$ entre $N$ et $C$.\nRéponse : les deux quotients valent $0{,}7$ et les points sont dans le même ordre, donc $(MN) // (BC)$.",
          schema: thales({ A: [0, 0], B: [6, 0], C: [4.8, 6.4], M: [-4.2, 0], N: [-3.36, -4.48], cotes: { AM: "4,2 cm", AB: "6 cm", AN: "5,6 cm", AC: "8 cm" } }),
          micros: ["thales_reciproque", "thales_rediger"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $M \\in [AB]$ et $N \\in [AC]$, avec $(MN) // (BC)$. On donne $AM = 4$ cm, $MB = 6$ cm, $AC = 12{,}5$ cm et $BC = 9$ cm.\na) Calculer $AN$, puis $NC$.\nb) Calculer $MN$.\nc) Calculer le périmètre du quadrilatère $MBCN$.",
          correction:
            "a) D'abord la longueur du grand côté : $AB = AM + MB = 4 + 6 = 10$ cm.\nLes droites $(BM)$ et $(CN)$ sont sécantes en $A$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$, soit $\\dfrac{4}{10} = \\dfrac{AN}{12{,}5} = \\dfrac{MN}{9}$.\n$AN = \\dfrac{12{,}5 \\times 4}{10} = 5$ cm, puis $NC = 12{,}5 - 5 = 7{,}5$ cm.\nb) $MN = \\dfrac{9 \\times 4}{10} = 3{,}6$ cm.\nc) Le quadrilatère $MBCN$ a pour côtés $[MB]$, $[BC]$, $[CN]$ et $[NM]$ : $6 + 9 + 7{,}5 + 3{,}6 = 26{,}1$ cm.\n⛔ Le piège : mettre $MB = 6$ au dénominateur du premier quotient. Le quotient de Thalès, c'est $\\dfrac{AM}{AB}$, avec $AB = 10$.\nRéponse : $AN = 5$ cm, $NC = 7{,}5$ cm, $MN = 3{,}6$ cm, et le périmètre de $MBCN$ vaut $26{,}1$ cm.",
          schema: thales({ A: [0, 0], B: [10, 0], C: [8.7625, 8.91461], M: [4, 0], N: [3.505, 3.565844], cotes: { AM: "4 cm", MB: "6 cm", AC: "AC = 12,5 cm", BC: "9 cm", AN: "5 cm", MN: "3,6 cm" }, trouve: ["AN", "MN"] }),
          micros: ["thales_calculer_longueur", "thales_rediger"],
        },
        {
          enonce:
            "Le triangle $ABC$ est rectangle en $B$, avec $AB = 12$ cm et $BC = 5$ cm. Le point $M$ est sur $[AB]$, avec $AM = 9$ cm, et la perpendiculaire à $(AB)$ passant par $M$ coupe $[AC]$ en $N$.\na) Calculer $AC$.\nb) Justifier que $(MN) // (BC)$.\nc) Calculer $AN$ et $MN$.",
          correction:
            "a) Le triangle $ABC$ est rectangle en $B$. D'après le théorème de Pythagore : $AC^2 = AB^2 + BC^2 = 144 + 25 = 169$, donc $AC = \\sqrt{169} = 13$ cm.\nb) Les droites $(MN)$ et $(BC)$ sont toutes les deux perpendiculaires à $(AB)$. Or deux droites perpendiculaires à une même droite sont parallèles : $(MN) // (BC)$.\nc) Les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$, soit $\\dfrac{9}{12} = \\dfrac{AN}{13} = \\dfrac{MN}{5}$.\n$AN = \\dfrac{13 \\times 9}{12} = 9{,}75$ cm et $MN = \\dfrac{5 \\times 9}{12} = 3{,}75$ cm.\n⛔ Le piège : appliquer Thalès sans avoir PROUVÉ le parallélisme. L'énoncé ne dit pas « $(MN) // (BC)$ » : il faut le justifier, c'est la question b).\nRéponse : $AC = 13$ cm, $AN = 9{,}75$ cm et $MN = 3{,}75$ cm.",
          schema: thales({ A: [0, 0], B: [12, 0], C: [12, 5], M: [9, 0], N: [9, 3.75], cotes: { AM: "9 cm", AB: "AB = 12 cm", BC: "5 cm", AC: "AC = 13 cm", AN: "9,75 cm", MN: "3,75 cm" }, trouve: ["AC", "AN", "MN"], interieur: true }),
          micros: ["thales_calculer_longueur", "thales_rediger", "thales_defi"],
        },
        {
          enonce:
            "Les points $A$, $M$, $B$ sont alignés dans cet ordre, ainsi que $A$, $N$, $C$. On donne $AM = 3$ cm, $AB = 12$ cm, $AN = 2{,}5$ cm, $AC = 10$ cm et $BC = 14$ cm.\na) Démontrer que $(MN) // (BC)$.\nb) En déduire $MN$.",
          correction:
            "a) Je ne sais pas si les droites sont parallèles : la réciproque d'abord.\n$\\dfrac{AM}{AB} = \\dfrac{3}{12} = 0{,}25$ et $\\dfrac{AN}{AC} = \\dfrac{2{,}5}{10} = 0{,}25$. Les quotients sont égaux, et les points $A$, $M$, $B$ et $A$, $N$, $C$ sont dans le même ordre.\nD'après la réciproque du théorème de Thalès, $(MN) // (BC)$.\nb) MAINTENANT je sais que les droites sont parallèles : je peux me servir du théorème. Les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{3}{12} = \\dfrac{MN}{14}$.\n$MN = \\dfrac{14 \\times 3}{12} = 3{,}5$ cm.\n⛔ Le piège : confondre les deux théorèmes. La réciproque PROUVE le parallélisme ; le théorème s'en SERT pour calculer. Ici, l'un après l'autre.\nRéponse : $(MN) // (BC)$, et $MN = 3{,}5$ cm.",
          schema: thales({ A: [0, 0], B: [12, 0], C: [2, 9.79796], M: [3, 0], N: [0.5, 2.44949], cotes: { AM: "3 cm", AB: "AB = 12 cm", AN: "2,5 cm", AC: "AC = 10 cm", BC: "14 cm", MN: "3,5 cm" }, trouve: ["MN"] }),
          micros: ["thales_reciproque", "thales_calculer_longueur", "thales_rediger"],
        },
        {
          enonce:
            "Voici la copie d'un élève : « $M \\in [AB]$, $N \\in [AC]$, $(MN) // (BC)$, $AM = 3$ cm, $MB = 5$ cm, $AC = 12$ cm. D'après le théorème de Thalès, $\\dfrac{AM}{MB} = \\dfrac{AN}{AC}$, donc $AN = \\dfrac{12 \\times 3}{5} = 7{,}2$ cm. »\na) Trouver l'erreur.\nb) Corriger le calcul.\nc) Comment aurait-il pu voir, sans refaire le calcul, que $7{,}2$ cm était suspect ?",
          correction:
            "a) Le quotient $\\dfrac{AM}{MB}$ compare deux morceaux de $[AB]$. Le théorème compare le petit triangle $AMN$ au grand triangle $ABC$ : il faut $\\dfrac{AM}{AB}$, deux longueurs qui partent de $A$.\nb) $AB = AM + MB = 3 + 5 = 8$ cm. Puis $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$, soit $\\dfrac{3}{8} = \\dfrac{AN}{12}$, et $AN = \\dfrac{12 \\times 3}{8} = 4{,}5$ cm.\nc) $M$ est à $3$ cm de $A$ sur $8$ : il est avant le milieu de $[AB]$. Donc $N$ doit être avant le milieu de $[AC]$, qui est à $6$ cm de $A$. $7{,}2$ cm dépasse ce milieu : impossible.\n⛔ Le piège : $\\dfrac{AM}{MB}$ au lieu de $\\dfrac{AM}{AB}$. C'est l'erreur la plus fréquente, parce que $MB$ est la longueur DONNÉE : il faut d'abord calculer $AB$.\nRéponse : $AN = 4{,}5$ cm, et non $7{,}2$ cm.",
          schema: thales({ A: [0, 0], B: [8, 0], C: [7.2, 9.6], M: [3, 0], N: [2.7, 3.6], cotes: { AM: "3 cm", MB: "5 cm", AC: "AC = 12 cm", AN: "4,5 cm" }, trouve: ["AN"] }),
          micros: ["thales_rapport", "thales_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je cherche les parallèles, puis le sommet commun, je fais un schéma et je rédige.",
      rappel: [
        "Dans une situation réelle, je cherche d'abord les deux droites PARALLÈLES : deux objets verticaux (un arbre, un bâton), deux bords parallèles, un objet et son image.",
        "Puis le point où se coupent les deux autres droites : c'est le sommet commun. Je nomme les points, je mets toutes les longueurs dans la même unité, et je rédige comme au brevet.",
      ],
      exercices: [
        {
          titre: "La hauteur d'un arbre par son ombre",
          enonce:
            "Pour mesurer un arbre sans y grimper, Léa plante un jalon vertical $[PQ]$ de $2$ m. Elle le place pour que le bout de son ombre tombe exactement au même point $O$ que le bout de l'ombre de l'arbre $[RS]$. Elle mesure l'ombre du jalon, $OP = 3{,}2$ m, et la distance du jalon au pied de l'arbre, $PR = 9{,}6$ m.\na) Pourquoi les droites $(PQ)$ et $(RS)$ sont-elles parallèles ?\nb) Calculer la hauteur $RS$ de l'arbre.",
          correction:
            "a) Le jalon et l'arbre sont verticaux : les droites $(PQ)$ et $(RS)$ sont toutes les deux perpendiculaires au sol $(OR)$. Deux droites perpendiculaires à une même droite sont parallèles.\nb) Le rayon de soleil qui frôle le sommet de l'arbre frôle aussi le haut du jalon : les points $O$, $Q$, $S$ sont alignés. Et $O$, $P$, $R$ sont alignés sur le sol.\nJe calcule d'abord l'ombre de l'arbre : $OR = OP + PR = 3{,}2 + 9{,}6 = 12{,}8$ m.\nLes droites $(PR)$ et $(QS)$ sont sécantes en $O$ et $(PQ) // (RS)$. D'après le théorème de Thalès : $\\dfrac{OP}{OR} = \\dfrac{OQ}{OS} = \\dfrac{PQ}{RS}$, soit $\\dfrac{3{,}2}{12{,}8} = \\dfrac{2}{RS}$.\n$RS = \\dfrac{12{,}8 \\times 2}{3{,}2} = 8$ m.\n⭐ Contrôle : l'ombre de l'arbre est $4$ fois celle du jalon ($12{,}8 \\div 3{,}2 = 4$), donc l'arbre est $4$ fois plus haut : $4 \\times 2 = 8$ m.\n⛔ Le piège : prendre $PR = 9{,}6$ m pour l'ombre de l'arbre. L'ombre de l'arbre va de $R$ jusqu'à $O$ : $12{,}8$ m.\nRéponse : l'arbre mesure $8$ m de haut.",
          schema: thales({ A: [0, 0], M: [3.2, 0], B: [12.8, 0], N: [3.2, 2], C: [12.8, 8], noms: { A: "O", M: "P", B: "R", N: "Q", C: "S" }, cotes: { AM: "3,2 m", MB: "9,6 m", MN: "2 m", BC: "8 m" }, trouve: ["BC"] }),
          micros: ["thales_calculer_longueur", "thales_rediger"],
        },
        {
          titre: "Une passerelle sans traverser la rivière",
          enonce:
            "On veut construire une passerelle entre un piquet $M$, planté au bord de l'eau, et un arbre $A$ sur l'autre rive, sans traverser. On plante trois autres piquets : $N$ au bord de l'eau, $B$ et $C$ plus loin du bord, de sorte que $A$, $M$, $B$ soient alignés, $A$, $N$, $C$ aussi, et $(MN) // (BC)$. On mesure $MN = 12$ m, $BC = 15$ m et $MB = 8$ m.\na) Écrire l'égalité de Thalès qui relie $AM$, $AB$, $MN$ et $BC$.\nb) On pose $AM = x$. Exprimer $AB$ en fonction de $x$.\nc) Calculer $x$, la longueur de la passerelle.",
          correction:
            "a) Les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{AM}{AB} = \\dfrac{12}{15}$.\nb) $M$ est entre $A$ et $B$ : $AB = AM + MB = x + 8$.\nc) L'égalité devient $\\dfrac{x}{x + 8} = \\dfrac{12}{15}$. Produit en croix : $15x = 12(x + 8)$, soit $15x = 12x + 96$.\nDonc $3x = 96$ et $x = 32$ m.\n⭐ Contrôle : $\\dfrac{32}{40} = 0{,}8$ et $\\dfrac{12}{15} = 0{,}8$.\n⛔ Le piège : écrire $\\dfrac{AM}{MB} = \\dfrac{12}{15}$, ce qui donnerait $AM = 6{,}4$ m. $[MB]$ n'est pas un côté du grand triangle $ABC$ : c'est $AB = x + 8$.\nRéponse : la passerelle mesure $32$ m.",
          schema: thales({ A: [0, 0], B: [39.2906, -7.5], C: [39.2906, 7.5], M: [31.43248, -6], N: [31.43248, 6], cotes: { AM: "32 m", MB: "8 m", MN: "12 m", BC: "15 m" }, trouve: ["AM"], interieur: true }),
          micros: ["thales_calculer_longueur", "thales_defi"],
        },
        {
          titre: "La Mausefalle, sur la piste de Kitzbühel",
          enonce:
            "Sur la Streif, la piste de descente de Kitzbühel (Autriche), le passage de la Mausefalle atteint une pente de $85$ % : pour $100$ m parcourus à l'horizontale, on descend de $85$ m. On le modélise par une pente droite $[AC]$ : $B$ est au niveau de $A$, à la verticale de $C$, avec $AB = 100$ m et $BC = 85$ m. Un skieur est en $N$, sur la pente ; $M$ est au niveau de $A$, à la verticale de $N$, avec $AM = 40$ m.\na) De combien de mètres le skieur est-il plus haut que $A$ ?\nb) Quelle distance de piste lui reste-t-il jusqu'en $A$ ? Arrondir au dixième.\nc) Un autre skieur est $51$ m plus haut que $A$. À quelle distance horizontale de $A$ est-il ?",
          correction:
            "a) Les droites $(MN)$ et $(BC)$ sont verticales toutes les deux : elles sont parallèles. Les droites $(MB)$ et $(NC)$ sont sécantes en $A$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$, soit $\\dfrac{40}{100} = \\dfrac{MN}{85}$.\n$MN = \\dfrac{85 \\times 40}{100} = 34$ m.\n⭐ C'est le sens de « $85$ % » : la hauteur vaut $85$ % de la distance horizontale, à tout endroit de la pente. $85$ % de $40$ m, c'est $34$ m.\nb) Le triangle $AMN$ est rectangle en $M$. D'après le théorème de Pythagore : $AN^2 = 40^2 + 34^2 = 1\\,600 + 1\\,156 = 2\\,756$, donc $AN = \\sqrt{2\\,756} \\approx 52{,}5$ m.\nc) $\\dfrac{AM}{100} = \\dfrac{51}{85}$, donc $AM = \\dfrac{100 \\times 51}{85} = 60$ m.\n⛔ Le piège : croire qu'une pente de $85$ % descend de $85$ m sur $100$ m de PISTE. Les $100$ m sont mesurés à l'horizontale ; sur la piste, le skieur en parcourt plus : $\\sqrt{100^2 + 85^2} \\approx 131{,}2$ m.\nRéponse : $34$ m plus haut que $A$ ; environ $52{,}5$ m de piste ; $60$ m à l'horizontale.",
          schema: thales({ A: [0, 0], B: [100, 0], C: [100, 85], M: [40, 0], N: [40, 34], cotes: { AM: "40 m", AB: "AB = 100 m", BC: "85 m", MN: "34 m" }, trouve: ["MN"] }),
          micros: ["thales_calculer_longueur", "thales_defi"],
        },
        {
          titre: "Faire entrer la tour Eiffel dans la photo",
          enonce:
            "Dans un appareil photo, les rayons de lumière se croisent au centre $A$ de l'objectif. On modélise : l'objet $[BC]$ et son image $[MN]$ sur le capteur sont parallèles, de part et d'autre de $A$, avec $B$, $A$, $M$ alignés et $C$, $A$, $N$ alignés. Le capteur d'un appareil « plein format » mesure $36$ mm sur $24$ mm, et il est à $AM = 50$ mm de l'objectif.\na) Quelle est la configuration ?\nb) On photographie un mur à $AB = 10$ m. Le capteur le voit sur toute sa largeur, $MN = 36$ mm. Quelle largeur de mur tient sur la photo ?\nc) La tour Eiffel mesure $330$ m. On tient l'appareil pour que le grand côté du capteur, $36$ mm, soit vertical. À quelle distance minimale faut-il se placer pour que toute la tour tienne sur la photo ? Arrondir au mètre supérieur.",
          correction:
            "a) Les rayons se croisent en $A$, entre l'objet et le capteur : c'est un papillon. L'image est d'ailleurs à l'envers.\nb) Les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\nJe mets tout en millimètres : $AB = 10$ m $= 10\\,000$ mm. Donc $\\dfrac{50}{10\\,000} = \\dfrac{36}{BC}$.\n$BC = \\dfrac{10\\,000 \\times 36}{50} = 7\\,200$ mm, soit $7{,}2$ m.\nc) Cette fois, $BC = 330$ m $= 330\\,000$ mm, et je cherche $AB$ : $\\dfrac{50}{AB} = \\dfrac{36}{330\\,000}$.\n$AB = \\dfrac{330\\,000 \\times 50}{36} \\approx 458\\,333$ mm, soit environ $458{,}3$ m.\n⛔ Le piège : arrondir à $458$ m. À $458$ m, on est un peu trop près : la photo ne couvre que $\\dfrac{458\\,000 \\times 36}{50} = 329\\,760$ mm, soit $329{,}76$ m, et le haut de l'antenne sort du cadre. Une distance MINIMALE s'arrondit vers le haut.\nRéponse : un papillon ; $7{,}2$ m de mur ; il faut se placer à au moins $459$ m de la tour.",
          schema: thales({ A: [0, 0], B: [12, -4], C: [12, 4], M: [-4.2, 1.4], N: [-4.2, -1.4], cotes: { AM: "50 mm", MN: "36 mm", AB: "10 m", BC: "7,2 m" }, trouve: ["BC"], echelle: false }),
          micros: ["thales_configuration", "thales_calculer_longueur", "thales_defi"],
        },
      ],
    },
  ],
};
