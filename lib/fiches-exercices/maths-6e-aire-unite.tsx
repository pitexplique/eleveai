// ─── Fiche d'exercices : l'aire et ses unités (6e) — 20 exercices corrigés ──────
//
// Lot de 6e du 30/09/2026, sur le modèle de la feuille de 5e voisine
// (`maths-5e-aire-surface.tsx` : le SVG `plan()`, quadrillage pour compter).
//
// Alignée sur la banque `lib/tutor-v4/questionBank/6e/maths/aires.bank.ts`,
// notionId aire_unite (l'étage des AUTOMATISMES de l'aire, séparé le 23/08) :
// comprendre ce qu'est une aire, la mesurer en comptant des carreaux, convertir
// entre m², dm² et cm². Pas de fiche de cours propre : la fiche « Les aires »
// (aire-surface) en parle, mais son notionId est aire_surface.
// ⛔⛔ LES DEUX BORNES DU BO, RELUES DANS LA BANQUE :
//   1. Conversions UNIQUEMENT m² ↔ dm² et dm² ↔ cm² (pas de cm² ↔ m², pas de
//      km², pas de mm² en conversion). mm² et km² se CONNAISSENT (l'aire d'un
//      carré de 1 mm, de 1 km de côté) sans se convertir (exercices 7 et 20).
//   2. « Le recours à un tableau de conversion est DÉCONSEILLÉ à ce stade. »
//      Ici, AUCUN tableau de conversion : le dessin des conversions est le
//      carré découpé en 10 × 10 (`carreCent`), la méthode du BO.
// ⚠️ Les demi-carreaux (exercices 3, 9, 18) : un carreau coupé en deux par sa
// diagonale, deux moitiés recollées font un carreau. C'est le « découpage et
// recollement » du BO ; la banque n'en a pas d'item — doute signalé à Frédéric.
// ⛔ Aucun exemple de la fiche de cours des aires (12 carreaux, la croix de 9,
// le zigzag de 6, l'escalier de 10, la figure de 9, 3,7 m² et 370 cm², 250 cm²
// ou 3 dm²), ni de la banque (1 dm découpé en cm, 15 cm², 12 carreaux).
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : phrases de 12 mots en moyenne, une idée
// par phrase, les mots d'un enfant.
//
// Les pièges nommés : une aire en cm (1), compter les carreaux du bord (2),
// compter une moitié pour un carreau (3, 9, 18), oublier l'unité de pavage
// (4), × 10 au lieu de × 100 (5, 6, 16), 1 × 2 = 1 (7), se tromper de sens (8,
// 14), croire qu'une même aire donne un même tour (13), croire qu'un côté
// doublé double l'aire (15), un reste oublié (11), confondre m² et dm² (12,
// 17, 19), choisir l'unité au hasard (20).
//
// Aucun fait réel : le studio, la nappe, la faïence, le bac potager (4 dm² par
// salade), la mosaïque, la salle de jeux (dalles de 50 cm), les aires du
// timbre, de l'écran, du terrain et de la ville sont des ordres de grandeur.
//
// ⭐ LES DESSINS : `plan()` (vraies coordonnées, quadrillage, surfaces
// ombrées), `carreCent` (le carré de 1 dm ou 1 m découpé en 100, quelques
// cases coloriées), `tableau`, `table`. 14 dessins imprimés ; ceux qui redisent
// le corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-aire-unite.mjs` —
// chaque aire refaite par la formule du lacet sur les coordonnées DESSINÉES,
// les carreaux entiers COMPTÉS un par un, chaque cote relue à l'échelle.
//
// Micro-compétences : aire_comprendre (1, 4, 7, 9, 13, 15, 16, 20),
// aire_compter (2, 3, 9, 10, 12, 15, 17, 18, 19), aire_convertir (5, 6, 8, 11,
// 12, 14, 16, 17, 18, 19). 3/3.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/* ── Le plan à l'échelle ───────────────────────────────────────────────────
 * Le SVG local de la feuille des aires de 5e. VRAIES coordonnées, y vers le
 * haut : le script refait chaque aire par le lacet et compte les carreaux.
 * ⛔ Texte NU. Police 14, viewBox d'environ 300 de large, AUCUN `min-w`. */
type Pt = [number, number];
type Fond = "bleu" | "orange" | "vert" | "trou";
type Forme =
  | { poly: Pt[]; fond?: Fond }
  /** Le quadrillage [x0, y0, x1, y1], un trait tous les `pas` (1 par défaut). */
  | { grille: [number, number, number, number]; pas?: number }
  | { trait: [Pt, Pt]; tirets?: boolean }
  | { cote: [Pt, Pt]; label: string; sens?: 1 | -1 }
  | { texte: string; en: Pt };

const TEINTE: Record<Fond, string> = { bleu: "#2563eb", orange: "#ea580c", vert: "#16a34a", trou: "#dc2626" };
const TAILLE = 14;

const plan = (unite: "cm" | "dm" | "m", formes: Forme[]) => {
  const geo: Pt[] = [];
  for (const f of formes) {
    if ("poly" in f) geo.push(...f.poly);
    else if ("grille" in f) geo.push([f.grille[0], f.grille[1]], [f.grille[2], f.grille[3]]);
    else if ("trait" in f) geo.push(...f.trait);
    else if ("cote" in f) geo.push(...f.cote);
    else geo.push(f.en);
  }
  const xs = geo.map((p) => p[0]), ys = geo.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(200 / (x1 - x0 || 1), 160 / (y1 - y0 || 1));
  const P = ([x, y]: Pt): Pt => [+((x - x0) * s).toFixed(1), +((y1 - y) * s).toFixed(1)];

  const centres: Pt[] = formes.flatMap((f) => ("poly" in f ? f.poly.map(P) : []));
  const C: Pt = centres.length ? [centres.reduce((a, p) => a + p[0], 0) / centres.length, centres.reduce((a, p) => a + p[1], 0) / centres.length] : [100, 80];

  type Etiquette = { x: number; y: number; t: string; ancre: "start" | "middle" | "end" };
  const etiquettes: Etiquette[] = [];
  const ancre = (nx: number) => (nx > 0.35 ? "start" : nx < -0.35 ? "end" : "middle");
  const poser = (M: Pt, n: Pt, t: string) => {
    const a = ancre(n[0]);
    const d = a === "middle" ? 14 : 8;
    etiquettes.push({ x: M[0] + n[0] * d, y: M[1] + n[1] * d, t, ancre: a });
  };

  const grilles: ReactNode[] = [];
  const fonds: ReactNode[] = [];
  const traits: ReactNode[] = [];
  formes.forEach((f, i) => {
    if ("grille" in f) {
      const [gx0, gy0, gx1, gy1] = f.grille;
      const pas = f.pas ?? 1;
      for (let x = gx0; x <= gx1 + 1e-9; x += pas) {
        const [a, b] = [P([x, gy0]), P([x, gy1])];
        grilles.push(<line key={`${i}x${x}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#94a3b8" strokeWidth={1} />);
      }
      for (let y = gy0; y <= gy1 + 1e-9; y += pas) {
        const [a, b] = [P([gx0, y]), P([gx1, y])];
        grilles.push(<line key={`${i}y${y}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#94a3b8" strokeWidth={1} />);
      }
    } else if ("poly" in f) {
      const fond = f.fond ?? "bleu";
      const peint = fond === "trou"
        ? { fill: "#ffffff", fillOpacity: 0.6, stroke: TEINTE.trou, strokeWidth: 2, strokeDasharray: "5 4" }
        : { fill: TEINTE[fond], fillOpacity: 0.3, stroke: TEINTE[fond], strokeWidth: 2 };
      fonds.push(<polygon key={i} points={f.poly.map(P).map((p) => p.join(",")).join(" ")} {...peint} />);
    } else if ("trait" in f) {
      const [a, b] = f.trait.map(P);
      traits.push(<line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#475569" strokeWidth={2} strokeDasharray={f.tirets ? "5 4" : undefined} />);
    } else if ("cote" in f) {
      const [a, b] = f.cote.map(P);
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const M: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let n: Pt = [-(b[1] - a[1]) / L, (b[0] - a[0]) / L];
      if (n[0] * (M[0] - C[0]) + n[1] * (M[1] - C[1]) < 0) n = [-n[0], -n[1]];
      if (f.sens === -1) n = [-n[0], -n[1]];
      poser(M, n, f.label);
    } else etiquettes.push({ x: P(f.en)[0], y: P(f.en)[1], t: f.texte, ancre: "middle" });
  });

  let [bx0, by0, bx1, by1] = [0, 0, (x1 - x0) * s, (y1 - y0) * s];
  for (const e of etiquettes) {
    const L = e.t.length * TAILLE * 0.56;
    const g = e.ancre === "start" ? e.x : e.ancre === "end" ? e.x - L : e.x - L / 2;
    bx0 = Math.min(bx0, g);
    bx1 = Math.max(bx1, g + L);
    by0 = Math.min(by0, e.y - TAILLE * 0.6);
    by1 = Math.max(by1, e.y + TAILLE * 0.6);
  }
  const pad = 6;
  const vb = [bx0 - pad, by0 - pad, bx1 - bx0 + 2 * pad, by1 - by0 + 2 * pad].map((v) => +v.toFixed(1));
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={vb.join(" ")} className="block h-auto w-full" role="img" aria-label={`Figure en ${unite} : ${etiquettes.map((e) => e.t).join(", ")}`}>
        {grilles}
        {fonds}
        {traits}
        {etiquettes.map((e, i) => (
          <text key={`t${i}`} x={+e.x.toFixed(1)} y={+e.y.toFixed(1)} textAnchor={e.ancre} dominantBaseline="middle" fontSize={TAILLE} fontWeight={700} fill={NOIR} stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
            {e.t}
          </text>
        ))}
      </svg>
    </div>
  );
};

/**
 * LE CARRÉ DÉCOUPÉ EN 100 — le dessin des conversions (BO 6e : pas de tableau).
 * Un carré de 1 `grande` de côté, découpé en 10 × 10 carrés de 1 `petite` de
 * côté ; les `colorees` premières cases (rangée du bas d'abord) sont en orange.
 * ⭐ On y LIT 1 dm² = 100 cm² (ou 1 m² = 100 dm²) : 10 rangées de 10.
 * `devoile = false` (figure d'énoncé) : le titre pose la question au lieu de
 * donner la réponse.
 */
const carreCent = (grande: "m" | "dm", colorees: number, devoile = true) => {
  const petite = grande === "m" ? "dm" : "cm";
  const [x0, y0, c] = [40, 30, 20];
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox="0 0 300 262" className="block h-auto w-full" role="img" aria-label={`Un carré de 1 ${grande} de côté, découpé en carrés de 1 ${petite} de côté ; ${colorees} cases coloriées.`}>
        <text x={150} y={16} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
          {devoile ? `1 ${grande}² = 100 ${petite}²` : `1 ${grande}² = combien de ${petite}² ?`}
        </text>
        {Array.from({ length: colorees }, (_, k) => (
          <rect key={k} x={x0 + (k % 10) * c} y={y0 + (9 - Math.floor(k / 10)) * c} width={c} height={c} fill="#ea580c" fillOpacity={0.45} />
        ))}
        {Array.from({ length: 11 }, (_, k) => (
          <g key={`g${k}`}>
            <line x1={x0 + k * c} y1={y0} x2={x0 + k * c} y2={y0 + 10 * c} stroke="#64748b" strokeWidth={k % 10 === 0 ? 2 : 0.8} />
            <line x1={x0} y1={y0 + k * c} x2={x0 + 10 * c} y2={y0 + k * c} stroke="#64748b" strokeWidth={k % 10 === 0 ? 2 : 0.8} />
          </g>
        ))}
        <text x={x0 + 5 * c} y={y0 + 10 * c + 20} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
          {`1 ${grande} = 10 ${petite}`}
        </text>
        <text x={x0 + 10 * c + 8} y={y0 + 9.5 * c} dominantBaseline="middle" fontSize={14} fontWeight={700} fill="#ea580c">
          {`1 ${petite}`}
        </text>
      </svg>
    </div>
  );
};

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

export const exercicesAireUnite6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-unite",
  titre: "L'aire et ses unités",
  accroche:
    "Vingt exercices, du geste seul au problème : dire ce qu'est une aire, la mesurer en comptant des carreaux et des demi-carreaux, choisir la bonne unité, passer des m² aux dm² et des dm² aux cm² avec le carré découpé en cent. Un studio, une nappe, un carreau de faïence, un bac potager, une mosaïque, une salle de jeux, un timbre et une ville. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et un dessin.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/aire-unite", titre: "L'aire et ses unités" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une seule chose à faire par question. Je compte, ou je convertis.",
      rappel: [
        "L'aire, c'est la place à l'intérieur d'une figure.",
        "1 cm² est l'aire d'un carré de 1 cm de côté. Même idée pour 1 dm² et 1 m².",
        "Sur un quadrillage, l'aire est le nombre de carreaux qui recouvrent la figure.",
        "1 m² = 100 dm² et 1 dm² = 100 cm² : 10 rangées de 10 carrés.",
      ],
      exercices: [
        {
          enonce: "Choisis la bonne unité : cm, cm², m ou m².\na) Une feuille de classeur a une surface d'environ $600$ …\nb) Un couloir mesure environ $12$ … de long.\nc) Une chambre a une surface d'environ $11$ …\nd) Un timbre mesure environ $3$ … de large.",
          correction:
            "Une longueur se dit en cm ou en m. Une surface se dit en cm² ou en m².\na) C'est une surface, et une feuille est petite : $600$ cm².\nb) C'est une longueur, et un couloir est grand : $12$ m.\nc) C'est une surface, et une chambre est grande : $11$ m².\nd) C'est une longueur, et un timbre est petit : $3$ cm.\n⛔ Le piège : écrire une surface en cm. Le cm mesure un trait, pas une surface.\nRéponse : a) cm² ; b) m ; c) m² ; d) cm.",
          schema: ecranSeulement(
            plan("cm", [
              { poly: [[0, 0], [1, 0], [1, 1], [0, 1]], fond: "bleu" },
              { cote: [[0, 0], [1, 0]], label: "1 cm" },
              { texte: "1 cm²", en: [0.5, 0.5] },
              { trait: [[2.5, 0.5], [3.5, 0.5]] },
              { cote: [[2.5, 0.5], [3.5, 0.5]], label: "1 cm" },
            ]),
          ),
          micros: ["aire_comprendre"],
        },
        {
          enonce: "Chaque carreau est un carré de $1$ cm de côté.\nQuelle est l'aire de la figure ?",
          figure: plan("cm", [
            { grille: [0, 0, 7, 3] },
            { poly: [[0, 0], [7, 0], [7, 1], [5, 1], [5, 3], [2, 3], [2, 1], [0, 1]], fond: "bleu" },
          ]),
          correction:
            "Chaque carreau a une aire de $1$ cm².\nJe compte les carreaux, rangée par rangée, de bas en haut.\n$7 + 3 + 3 = 13$ carreaux.\n⛔ Le piège : compter les petits traits du bord. Cela donne le périmètre, pas l'aire.\nRéponse : l'aire de la figure est $13$ cm².",
          micros: ["aire_compter"],
        },
        {
          enonce: "Chaque carreau est un carré de $1$ cm de côté.\na) Combien de carreaux entiers la maison recouvre-t-elle ?\nb) Combien de demi-carreaux ?\nc) Quelle est son aire ?",
          figure: plan("cm", [
            { grille: [0, 0, 5, 4] },
            { poly: [[0, 0], [4, 0], [4, 2], [2, 4], [0, 2]], fond: "orange" },
          ]),
          correction:
            "a) Je compte les carreaux entiers, rangée par rangée : $4 + 4 + 2 = 10$.\nb) Le toit coupe des carreaux en deux, en biais. J'en compte $4$.\nc) Deux moitiés font un carreau entier. Donc $4$ moitiés font $2$ carreaux.\n$10 + 2 = 12$ carreaux, soit $12$ cm².\n⛔ Le piège : compter chaque moitié comme un carreau entier, et trouver $14$.\nRéponse : a) $10$ ; b) $4$ ; c) $12$ cm².",
          micros: ["aire_compter"],
        },
        {
          enonce: "Ali et Lou mesurent le même rectangle de $4$ cm sur $2$ cm.\nAli le couvre de carrés de $1$ cm de côté. Lou utilise des carrés de $2$ cm de côté.\na) Combien de carrés utilise chacun ?\nb) Ali dit « $8$ », Lou dit « $2$ ». Qui a raison ?",
          figure: plan("cm", [
            { grille: [0, 0, 4, 2] },
            { grille: [5, 0, 9, 2], pas: 2 },
            { poly: [[0, 0], [4, 0], [4, 2], [0, 2]], fond: "bleu" },
            { poly: [[5, 0], [9, 0], [9, 2], [5, 2]], fond: "vert" },
            { texte: "Ali", en: [2, 2.6] },
            { texte: "Lou", en: [7, 2.6] },
          ]),
          correction:
            "a) Ali : $2$ rangées de $4$ carrés, soit $8$ carrés de $1$ cm.\nLou : $2$ carrés de $2$ cm de côté.\nb) Les deux ont raison ! Le rectangle est le même.\nMais le nombre dépend de l'unité choisie.\nAvec des carrés de $1$ cm, l'aire est $8$ cm².\n⛔ Le piège : donner un nombre sans dire quel carré on a utilisé.\nRéponse : a) $8$ et $2$ ; b) les deux, mais seul « $8$ cm² » dit l'unité.",
          micros: ["aire_comprendre"],
        },
        {
          enonce: "Ce carré a $1$ m de côté. On le découpe en carrés de $1$ dm de côté.\na) Combien de petits carrés y a-t-il dans une rangée ?\nb) Combien y a-t-il de rangées ?\nc) Complète : $1$ m² = … dm².",
          figure: plan("dm", [
            { grille: [0, 0, 10, 10] },
            { poly: [[0, 0], [10, 0], [10, 10], [0, 10]], fond: "bleu" },
            { poly: [[0, 9], [1, 9], [1, 10], [0, 10]], fond: "orange" },
            { cote: [[0, 0], [10, 0]], label: "1 m = 10 dm" },
            { cote: [[0, 9], [0, 10]], label: "1 dm" },
          ]),
          correction:
            "$1$ m, c'est $10$ dm.\na) Une rangée contient $10$ petits carrés.\nb) Il y a $10$ rangées.\nc) $10 \\times 10 = 100$ petits carrés de $1$ dm².\nDonc $1$ m² $= 100$ dm².\n⛔ Le piège : répondre $10$ dm², comme pour les longueurs. Un carré a des rangées ET des colonnes.\nRéponse : a) $10$ ; b) $10$ ; c) $1$ m² $= 100$ dm².",
          micros: ["aire_convertir"],
        },
        {
          enonce: "Convertis.\na) $4$ dm² en cm²\nb) $6$ m² en dm²\nc) $800$ cm² en dm²\nd) $250$ dm² en m²",
          correction:
            "Entre deux unités voisines, il y a toujours $100$ petits carrés.\na) $1$ dm² $= 100$ cm². $4 \\times 100 = 400$ cm².\nb) $1$ m² $= 100$ dm². $6 \\times 100 = 600$ dm².\nc) Il faut $100$ cm² pour $1$ dm². $800 \\div 100 = 8$ dm².\nd) Il faut $100$ dm² pour $1$ m². $250 \\div 100 = 2{,}5$ m².\n⛔ Le piège : multiplier par $10$, comme pour les longueurs. Pour les aires, c'est $100$.\nRéponse : a) $400$ cm² ; b) $600$ dm² ; c) $8$ dm² ; d) $2{,}5$ m².",
          schema: ecranSeulement(carreCent("dm", 0)),
          micros: ["aire_convertir"],
        },
        {
          enonce: "Vrai ou faux ?\na) $1$ cm² est l'aire d'un carré de $1$ cm de côté.\nb) Un rectangle de $1$ cm sur $2$ cm a une aire de $1$ cm².\nc) $1$ km² est l'aire d'un carré de $1$ km de côté.\nd) $1$ mm² est plus grand que $1$ cm².",
          figure: plan("cm", [
            { grille: [0, 0, 4, 2] },
            { poly: [[0, 0], [1, 0], [1, 1], [0, 1]], fond: "bleu" },
            { poly: [[2, 0], [3, 0], [3, 2], [2, 2]], fond: "orange" },
            { texte: "A", en: [0.5, 0.5] },
            { texte: "B", en: [2.5, 1] },
          ]),
          correction:
            "a) VRAI. C'est le carré A du dessin.\nb) FAUX. Le rectangle B recouvre $2$ carreaux : son aire est $2$ cm².\nc) VRAI. Chaque unité d'aire est un carré.\nd) FAUX. Un carré de $1$ mm est bien plus petit qu'un carré de $1$ cm.\n⛔ Le piège du b) : lire « $1$ cm » et croire que l'aire vaut $1$ cm².\nRéponse : a) vrai ; b) faux, $2$ cm² ; c) vrai ; d) faux.",
          micros: ["aire_comprendre"],
        },
        {
          enonce: "Complète avec la bonne unité : m², dm² ou cm².\na) $3$ m² = $300$ …\nb) $500$ cm² = $5$ …\nc) $7$ dm² = $700$ …",
          correction:
            "Je regarde si le nombre grandit ou diminue.\na) $300 = 3 \\times 100$. Le nombre grandit : l'unité est plus petite. $3$ m² $= 300$ dm².\nb) $5 = 500 \\div 100$. Le nombre diminue : l'unité est plus grande. $500$ cm² $= 5$ dm².\nc) $700 = 7 \\times 100$. L'unité est plus petite. $7$ dm² $= 700$ cm².\n⛔ Le piège : se tromper de sens. Un nombre plus grand va avec une unité plus petite.\nRéponse : a) dm² ; b) dm² ; c) cm².",
          schema: ecranSeulement(carreCent("m", 0)),
          micros: ["aire_convertir"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur une même figure. Je compte avec soin, puis je dis l'unité.",
      rappel: [
        "On peut découper une figure et recoller les morceaux : son aire ne change pas.",
        "Deux demi-carreaux font un carreau.",
        "Pour convertir une aire, je multiplie ou je divise par 100.",
      ],
      exercices: [
        {
          enonce: "Chaque carreau mesure $1$ cm de côté.\na) Compte les carreaux entiers et les demi-carreaux de la figure A. Quelle est son aire ?\nb) Quelle est l'aire du rectangle B ?\nc) Explique comment découper A pour obtenir B.",
          figure: plan("cm", [
            { grille: [0, 0, 12, 2] },
            { poly: [[0, 0], [4, 0], [6, 2], [2, 2]], fond: "bleu" },
            { poly: [[8, 0], [12, 0], [12, 2], [8, 2]], fond: "vert" },
            { texte: "A", en: [3, 1] },
            { texte: "B", en: [10, 1] },
          ]),
          correction:
            "a) Je compte les carreaux entiers de A : $6$.\nLes deux bords penchés coupent $4$ carreaux en deux.\n$4$ moitiés font $2$ carreaux. $6 + 2 = 8$ cm².\nb) B a $2$ rangées de $4$ carreaux : $8$ cm².\nc) Je coupe le triangle de gauche de A. Je le recolle à droite. J'obtiens un rectangle comme B.\n⛔ Le piège : compter chaque moitié comme un carreau, et trouver $10$ cm².\nRéponse : a) $8$ cm² ; b) $8$ cm² ; c) on déplace le triangle de gauche.",
          schema: ecranSeulement(
            plan("cm", [
              { grille: [0, 0, 6, 2] },
              { poly: [[0, 0], [2, 0], [2, 2]], fond: "trou" },
              { poly: [[2, 0], [4, 0], [6, 2], [2, 2]], fond: "bleu" },
              { poly: [[4, 0], [6, 0], [6, 2]], fond: "orange" },
            ]),
          ),
          micros: ["aire_compter", "aire_comprendre"],
        },
        {
          enonce: "Voici le plan d'un studio. Chaque carreau représente $1$ m².\na) Quelle est l'aire de chaque pièce ?\nb) Quelle est l'aire du studio ?\nc) Une annonce dit : « studio de $35$ m² ». Est-ce vrai ?",
          figure: plan("m", [
            { grille: [0, 0, 8, 4] },
            { poly: [[0, 0], [5, 0], [5, 4], [0, 4]], fond: "bleu" },
            { poly: [[5, 2], [8, 2], [8, 4], [5, 4]], fond: "orange" },
            { poly: [[5, 0], [8, 0], [8, 2], [5, 2]], fond: "vert" },
            { texte: "pièce", en: [2.5, 2] },
            { texte: "cuisine", en: [6.5, 3] },
            { texte: "bain", en: [6.5, 1] },
          ]),
          correction:
            "a) La pièce : $4$ rangées de $5$ carreaux, soit $20$ m².\nLa cuisine : $2$ rangées de $3$ carreaux, soit $6$ m².\nLa salle de bain : $2$ rangées de $3$ carreaux, soit $6$ m².\nb) $20 + 6 + 6 = 32$ m².\nc) Non. Le studio fait $32$ m², pas $35$ m².\n⛔ Le piège : oublier une pièce en comptant.\nRéponse : a) $20$ m², $6$ m² et $6$ m² ; b) $32$ m² ; c) non.",
          micros: ["aire_compter"],
        },
        {
          enonce: "Une nappe a une aire de $1{,}5$ m².\nUne serviette a une aire de $16$ dm².\na) Écris l'aire de la nappe en dm².\nb) Écris l'aire de la serviette en cm².\nc) Sans rien perdre, combien de serviettes peut-on découper dans la nappe ?",
          correction:
            "a) $1$ m² $= 100$ dm². $1{,}5 \\times 100 = 150$ dm².\nb) $1$ dm² $= 100$ cm². $16 \\times 100 = 1\\,600$ cm².\nc) Je compare dans la même unité : des dm².\n$9 \\times 16 = 144$ : $9$ serviettes, il reste $6$ dm².\n$10 \\times 16 = 160$ : c'est trop.\n⛔ Le piège : diviser $1{,}5$ par $16$. La nappe et la serviette ne sont pas dans la même unité.\nRéponse : a) $150$ dm² ; b) $1\\,600$ cm² ; c) $9$ serviettes.",
          schema: ecranSeulement(carreCent("m", 16)),
          micros: ["aire_convertir"],
        },
        {
          enonce: "Un carreau de faïence est un carré de $20$ cm de côté.\na) Combien de carrés de $1$ dm de côté contient-il ? Donne son aire en dm².\nb) On veut couvrir $2$ m² de mur. Combien de carreaux faut-il ?",
          figure: plan("cm", [
            { grille: [0, 0, 20, 20], pas: 10 },
            { poly: [[0, 0], [20, 0], [20, 20], [0, 20]], fond: "bleu" },
            { cote: [[0, 0], [20, 0]], label: "20 cm" },
            { cote: [[20, 10], [20, 20]], label: "10 cm" },
          ]),
          correction:
            "a) $20$ cm, c'est $2$ dm.\nLe carreau contient $2$ rangées de $2$ carrés de $1$ dm : $4$ carrés.\nSon aire est $4$ dm².\nb) Je mets le mur en dm² : $2$ m² $= 200$ dm².\nChaque carreau couvre $4$ dm² : $200 \\div 4 = 50$ carreaux.\n⛔ Le piège : diviser $2$ par $4$. Des m² et des dm² ne se mélangent pas.\nRéponse : a) $4$ carrés, soit $4$ dm² ; b) $50$ carreaux.",
          micros: ["aire_convertir", "aire_compter"],
        },
        {
          enonce: "Chaque carreau mesure $1$ cm de côté.\na) Calcule l'aire de A et celle de B.\nb) Calcule le périmètre de A et celui de B.\nc) Deux figures de même aire ont-elles toujours le même périmètre ?",
          figure: plan("cm", [
            { grille: [0, 0, 8, 4] },
            { poly: [[0, 3], [8, 3], [8, 4], [0, 4]], fond: "bleu" },
            { poly: [[0, 0], [4, 0], [4, 2], [0, 2]], fond: "orange" },
            { texte: "A", en: [4, 3.5] },
            { texte: "B", en: [2, 1] },
          ]),
          correction:
            "a) A : une rangée de $8$ carreaux, soit $8$ cm².\nB : $2$ rangées de $4$ carreaux, soit $8$ cm².\nb) Le tour de A : $8 + 1 + 8 + 1 = 18$ cm.\nLe tour de B : $4 + 2 + 4 + 2 = 12$ cm.\nc) Non. A et B ont la même aire, mais pas le même tour.\n⛔ Le piège : croire que l'aire et le périmètre vont toujours ensemble.\nRéponse : a) $8$ cm² chacune ; b) $18$ cm et $12$ cm ; c) non.",
          micros: ["aire_comprendre"],
        },
        {
          enonce: "Range ces aires de la plus petite à la plus grande.\n$3$ dm² ; $250$ cm² ; $0{,}05$ m² ; $4$ dm²",
          correction:
            "Je mets tout dans la même unité : le dm².\n$250$ cm² : $250 \\div 100 = 2{,}5$ dm².\n$0{,}05$ m² : $0{,}05 \\times 100 = 5$ dm².\nJe compare : $2{,}5 < 3 < 4 < 5$.\n⛔ Le piège : croire que $0{,}05$ m² est la plus petite, à cause du petit nombre.\nRéponse : $250$ cm², puis $3$ dm², puis $4$ dm², puis $0{,}05$ m².",
          schema: ecranSeulement(tableau(["Aire", "3 dm²", "250 cm²", "0,05 m²", "4 dm²"], ["en dm²", "3", "2,5", "5", "4"], true)),
          micros: ["aire_convertir"],
        },
        {
          enonce: "Chaque carreau mesure $1$ cm de côté. Voici trois carrés.\na) Combien de carreaux recouvre chaque carré ?\nb) Le côté passe de $1$ cm à $2$ cm. Par combien l'aire est-elle multipliée ?\nc) Un carré a un côté $10$ fois plus grand. Combien de petits carreaux contient-il ?",
          figure: plan("cm", [
            { grille: [0, 0, 9, 3] },
            { poly: [[0, 0], [1, 0], [1, 1], [0, 1]], fond: "bleu" },
            { poly: [[2, 0], [4, 0], [4, 2], [2, 2]], fond: "orange" },
            { poly: [[6, 0], [9, 0], [9, 3], [6, 3]], fond: "vert" },
          ]),
          correction:
            "a) Côté $1$ cm : $1$ carreau. Côté $2$ cm : $2 \\times 2 = 4$ carreaux. Côté $3$ cm : $3 \\times 3 = 9$ carreaux.\nb) On passe de $1$ à $4$ : l'aire est multipliée par $4$.\nc) $10$ rangées de $10$ carreaux : $10 \\times 10 = 100$.\nC'est pour ça que $1$ dm² vaut $100$ cm².\n⛔ Le piège du b) : croire que l'aire double quand le côté double.\nRéponse : a) $1$, $4$ et $9$ ; b) par $4$ ; c) $100$ carreaux.",
          micros: ["aire_compter", "aire_comprendre"],
        },
        {
          enonce: "Tom dit : « $1$ dm $= 10$ cm, donc $1$ dm² $= 10$ cm². »\na) Sur le dessin, les cases orange sont celles que Tom a comptées. Qu'a-t-il oublié ?\nb) Combien de cm² y a-t-il vraiment dans $1$ dm² ?\nc) Convertis $5$ dm² en cm².",
          figure: carreCent("dm", 10, false),
          correction:
            "a) Tom a compté une seule rangée de $10$ carrés.\nMais le carré de $1$ dm a $10$ rangées.\nb) $10 \\times 10 = 100$. Donc $1$ dm² $= 100$ cm².\nc) $5 \\times 100 = 500$ cm².\n⛔ Le piège de Tom : prendre le $10$ des longueurs. Pour les aires, c'est $10 \\times 10 = 100$.\nRéponse : a) les $9$ autres rangées ; b) $100$ cm² ; c) $500$ cm².",
          micros: ["aire_convertir", "aire_comprendre"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je compte les carreaux, je convertis si besoin, puis je réponds par une phrase.",
      rappel: [
        "Je regarde ce que vaut un carreau : 1 cm², 1 dm² ou 1 m².",
        "Je mets toutes les aires dans la même unité avant de calculer.",
        "Je relis : ma réponse a-t-elle une unité d'aire ?",
      ],
      exercices: [
        {
          titre: "Le bac potager",
          enonce:
            "Nina a un bac potager carré de $1$ m de côté.\nUne salade a besoin d'un carré de $20$ cm de côté, soit $4$ dm².\na) Quelle est l'aire du bac, en dm² ?\nb) Combien de salades peut-elle planter au plus ?\nc) Elle plante $12$ salades. Dans le reste, elle sème des radis : un radis par dm². Combien de radis ?",
          figure: plan("dm", [
            { grille: [0, 0, 10, 10] },
            { poly: [[0, 0], [10, 0], [10, 10], [0, 10]], fond: "vert" },
            { poly: [[0, 8], [2, 8], [2, 10], [0, 10]], fond: "orange" },
            { cote: [[0, 0], [10, 0]], label: "1 m" },
            { cote: [[0, 8], [0, 10]], label: "20 cm" },
          ]),
          correction:
            "a) $1$ m² $= 100$ dm². Sur le dessin, je vois $10$ rangées de $10$ carreaux.\nb) Chaque salade prend $4$ dm² : $100 \\div 4 = 25$ salades.\nc) Les $12$ salades prennent $12 \\times 4 = 48$ dm².\nIl reste $100 - 48 = 52$ dm². Donc $52$ radis.\n⛔ Le piège du a) : croire que le bac fait $10$ dm². Il fait $10$ dm de côté, et $100$ dm² d'aire.\nRéponse : a) $100$ dm² ; b) $25$ salades ; c) $52$ radis.",
          micros: ["aire_convertir", "aire_compter"],
        },
        {
          titre: "La mosaïque",
          enonce:
            "Voici une mosaïque carrée. Chaque carreau mesure $1$ cm de côté.\nAu centre, un losange orange. Le reste est bleu.\na) Quelle est l'aire de toute la mosaïque ?\nb) Compte les carreaux entiers et les demi-carreaux du losange. Quelle est son aire ?\nc) Quelle est l'aire de la partie bleue ?\nd) Écris l'aire de la mosaïque en dm².",
          figure: plan("cm", [
            { grille: [0, 0, 6, 6] },
            { poly: [[0, 0], [6, 0], [6, 6], [0, 6]], fond: "bleu" },
            { poly: [[3, 1], [5, 3], [3, 5], [1, 3]], fond: "orange" },
          ]),
          correction:
            "a) $6$ rangées de $6$ carreaux : $36$ cm².\nb) Le losange a $4$ carreaux entiers, au milieu.\nSes bords coupent $8$ carreaux en deux. $8$ moitiés font $4$ carreaux.\n$4 + 4 = 8$ cm².\nc) Le bleu, c'est tout sauf le losange : $36 - 8 = 28$ cm².\nd) Il faut $100$ cm² pour $1$ dm². $36 \\div 100 = 0{,}36$ dm².\n⛔ Le piège du b) : compter les $8$ moitiés comme des carreaux entiers, et trouver $12$.\nRéponse : a) $36$ cm² ; b) $8$ cm² ; c) $28$ cm² ; d) $0{,}36$ dm².",
          micros: ["aire_compter", "aire_convertir"],
        },
        {
          titre: "La salle de jeux",
          enonce:
            "Voici le plan d'une salle de jeux. Chaque carreau représente $1$ m².\nOn la couvre de dalles de moquette carrées de $50$ cm de côté.\na) Quelle est l'aire de la salle ?\nb) Une dalle a une aire de $25$ dm². Combien de dalles faut-il pour $1$ m² ?\nc) Combien de dalles faut-il pour toute la salle ?\nd) Les dalles se vendent par paquets de $10$. Combien de paquets faut-il ?",
          figure: plan("m", [
            { grille: [0, 0, 7, 4] },
            { poly: [[0, 0], [7, 0], [7, 2], [4, 2], [4, 4], [0, 4]], fond: "bleu" },
            { poly: [[0, 3.5], [0.5, 3.5], [0.5, 4], [0, 4]], fond: "orange" },
            { cote: [[0, 0], [1, 0]], label: "1 m" },
          ]),
          correction:
            "a) Je compte rangée par rangée : $7 + 7 + 4 + 4 = 22$ m².\nb) $1$ m² $= 100$ dm². Et $100 \\div 25 = 4$ dalles.\nOn le voit : $4$ dalles de $50$ cm remplissent un carré de $1$ m.\nc) $22 \\times 4 = 88$ dalles.\nd) $8$ paquets font $80$ dalles : pas assez. Il faut $9$ paquets.\n⛔ Le piège du b) : croire qu'une dalle de $50$ cm fait un demi-m². Il en faut $4$ par m².\nRéponse : a) $22$ m² ; b) $4$ ; c) $88$ dalles ; d) $9$ paquets.",
          micros: ["aire_compter", "aire_convertir"],
        },
        {
          titre: "Du timbre à la ville",
          enonce:
            "Choisis la bonne unité : mm², cm², dm², m² ou km².\na) Un timbre a une aire d'environ $6$ …\nb) Un écran de téléphone a une aire d'environ $1$ …\nc) Un terrain de football a une aire d'environ $7\\,000$ …\nd) Une grande ville a une aire d'environ $100$ …\ne) Une tête d'épingle a une aire d'environ $1$ …",
          correction:
            "Chaque unité est l'aire d'un carré : de $1$ mm, $1$ cm, $1$ dm, $1$ m ou $1$ km de côté.\na) Un timbre, c'est quelques carrés de $1$ cm : $6$ cm².\nb) Un écran tient à peu près dans un carré de $1$ dm : $1$ dm².\nc) Un terrain, c'est des milliers de carrés de $1$ m : $7\\,000$ m².\nd) Une ville, c'est des carrés de $1$ km : $100$ km².\ne) Une tête d'épingle est un carré de $1$ mm : $1$ mm².\n⛔ Le piège : répondre au hasard. J'imagine chaque carré à côté de l'objet.\nRéponse : a) cm² ; b) dm² ; c) m² ; d) km² ; e) mm².",
          schema: ecranSeulement(
            table(["Unité", "aire d'un carré de côté"], [
              ["mm²", "1 mm"],
              ["cm²", "1 cm"],
              ["dm²", "1 dm"],
              ["m²", "1 m"],
              ["km²", "1 km"],
            ]),
          ),
          micros: ["aire_comprendre"],
        },
      ],
    },
  ],
};
