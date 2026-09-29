// ─── Fiche d'exercices : le calcul mental (6e) — 20 exercices corrigés ─────────
//
// Feuille du lot de 6e (30/09/2026), sur la forme de l'étalon de 5e
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-calcul-mental.tsx` et sur
// la banque `lib/tutor-v4/questionBank/6e/maths/calcul-mental.bank.ts`,
// notionId entier_calcul_mental : addition, soustraction, multiplication et
// division de tête, stratégies (passer par la dizaine, arrondir puis corriger,
// décomposer, regrouper, double et moitié, × 10, 100, 1 000), défis.
// ⛔ LIMITES DE LA 6e : des entiers seulement (la banque a deux ÷ 10 à virgule,
// c'est la notion des décimaux). Aucune lettre, aucune équation : la pyramide du
// 19 se remplit par des additions et des soustractions.
// ⛔ Aucun exemple de la fiche de cours n'est repris (47 + 8, 68 + 7, 134 + 28,
// 18 × 5, 99 + 47, 121 − 38, 100 − 36, 96 − 27, 9 × 7, 96 ÷ 8, 99 + 15, la
// monnaie de 10 €, la boulangerie).
//
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : « ils ont parfois du mal à LIRE ».
// Phrases de 12 mots en moyenne, 20 au plus, une idée par phrase.
//
// Les pièges nommés : oublier ce qui reste à ajouter (1), « 7 − 4 » à l'envers
// (2), compter la moitié des zéros (3), perdre les dizaines d'un quotient (4),
// le zéro au mauvais endroit (5), le quart pris pour la moitié (6), corriger
// dans le mauvais sens (7, 13), calculer dans l'ordre sans regarder (8, 9),
// oublier une étape de la monnaie (10), le morceau des unités oublié (11), un
// seul morceau divisé (12), choisir au hasard (14), ajouter au lieu de
// multiplier (15), « plus on est, plus la part grandit » (16), 1 € enlevé au
// lieu de 24 (17), des kilomètres divisés par des mètres (18), additionner en
// descendant (19), la dernière semaine prise pour le total (20).
//
// Tout est un MODÈLE : parc animalier, piste de 400 m (la longueur d'un tour de
// piste d'athlétisme), recette, volley, tirelire.
//
// ⭐ LES DESSINS : la droite graduée et ses SAUTS (`droiteRel`, pour passer par
// la dizaine), la BARRE qu'on coupe (`barre`, complément et partage), le
// RECTANGLE de la multiplication (`aire`, les morceaux et leurs produits), les
// jetons rangés de la division (`rangement`), le tableau de numération
// (`numeration`, les chiffres qui glissent), la pyramide (`pyramide`) et des
// tableaux (`table`). 13 dessins imprimés ; ceux qui redisent le corrigé sont
// `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je passe par 60 »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-entier-calcul-mental.mjs`.
//
// Micro-compétences : entier_addition_mentale (1, 9, 13, 19, 20),
// entier_soustraction_mentale (2, 10, 17, 18, 19), entier_multiplication_mentale
// (3, 8, 11, 15, 17, 18, 20), entier_division_mentale (4, 12, 16, 17, 18),
// entier_strategie_mentale (5, 6, 7, 8, 9, 11, 12, 13, 14, 17, 20),
// entier_calcul_mental_defi (10, 14, 15, 16, 17, 18, 19, 20). 6/6.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

type Point = { value: number; label: string; color?: string };
type Saut = { de: number; vers: number; label: string };

/** 1 500 : un nombre écrit comme au tableau (texte NU, pas de KaTeX en SVG). */
const ecrit = (v: number) => {
  const [e, d] = String(Math.abs(v)).split(".");
  return (v < 0 ? "−" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * Une droite graduée HORIZONTALE (celle de l'étalon de 5e) : une graduation
 * tous les `pas`, un nombre tous les `nombres`, des points nommés SOUS les
 * nombres, et des arcs fléchés (`sauts`) : vert vers la droite, rouge vers la
 * gauche. ⛔ Onze nombres écrits au plus, six s'ils ont trois chiffres.
 */
const droiteRel = (min: number, max: number, pas: number, points: Point[], opts: { sauts?: Saut[]; nombres?: number } = {}) => {
  const sauts = opts.sauts ?? [];
  const nombres = opts.nombres ?? pas;
  const W = 300;
  const marge = 24;
  const x = (v: number) => marge + ((v - min) / (max - min)) * (W - 2 * marge);
  const hauteurs = sauts.map((_, i) => 22 + 17 * i);
  const Y = (hauteurs.length ? hauteurs[hauteurs.length - 1] : 0) + 26;
  const ticks: number[] = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) ticks.push(Math.round((min + k * pas) * 1e6) / 1e6);
  const ecritIci = (t: number) => Math.abs(t / nombres - Math.round(t / nombres)) < 1e-6;
  const fins: number[] = [];
  const rangs = new Map<number, number>();
  const lx = new Map<number, number>();
  [...points]
    .map((p, i) => {
      const demi = (p.label.length * 8.6) / 2 + 4;
      return { i, cx: Math.min(Math.max(x(p.value), demi), W - demi), demi };
    })
    .sort((a, b) => a.cx - b.cx)
    .forEach(({ i, cx, demi }) => {
      let r = 0;
      while (fins[r] !== undefined && cx - demi < fins[r]) r++;
      fins[r] = cx + demi;
      rangs.set(i, r);
      lx.set(i, cx);
    });
  const H = Y + 44 + 17 * Math.max(fins.length - 1, 0) + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[14rem] print:overflow-visible">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Droite graduée">
        <line x1={marge - 12} y1={Y} x2={W - marge + 12} y2={Y} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${W - marge + 4} ${Y - 5} L ${W - marge + 12} ${Y} L ${W - marge + 4} ${Y + 5}`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={Y - (ecritIci(t) ? 6 : 4)} x2={x(t)} y2={Y + (ecritIci(t) ? 6 : 4)} stroke={NOIR} strokeWidth={ecritIci(t) ? 1.8 : 1.2} />
            {ecritIci(t) ? (
              <text x={x(t)} y={Y + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
                {ecrit(t)}
              </text>
            ) : null}
          </g>
        ))}
        {sauts.map((s, i) => {
          const [x1, x2, h] = [x(s.de), x(s.vers), hauteurs[i]];
          const c = s.vers >= s.de ? VERT : ROUGE;
          const y0 = Y - 4;
          const [tx, ty] = [(x2 - x1) / 2, 2 * h];
          const L = Math.hypot(tx, ty) || 1;
          const [ux, uy] = [tx / L, ty / L];
          const barbe = (a: number) => `${(x2 - 8 * (ux * Math.cos(a) - uy * Math.sin(a))).toFixed(1)} ${(y0 - 8 * (ux * Math.sin(a) + uy * Math.cos(a))).toFixed(1)}`;
          return (
            <g key={i}>
              <path d={`M ${x1} ${y0} Q ${(x1 + x2) / 2} ${y0 - 2 * h} ${x2} ${y0}`} fill="none" stroke={c} strokeWidth={2.4} />
              <path d={`M ${barbe(0.45)} L ${x2} ${y0} L ${barbe(-0.45)}`} fill="none" stroke={c} strokeWidth={2.4} strokeLinejoin="round" />
              <text x={(x1 + x2) / 2} y={y0 - h - 4} textAnchor="middle" fontSize="14" fontWeight="900" fill={c} stroke="white" strokeWidth="3" paintOrder="stroke">
                {s.label}
              </text>
            </g>
          );
        })}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={x(p.value)} cy={Y} r={5} fill={p.color ?? BLEU} />
            {p.label ? (
              <text x={lx.get(i) ?? x(p.value)} y={Y + 42 + 17 * (rangs.get(i) ?? 0)} textAnchor="middle" fontSize="14" fontWeight="900" fill={p.color ?? BLEU}>
                {p.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * ⭐ UNE BARRE QU'ON COUPE : le tout au-dessus (une accolade et sa valeur),
 * les parts dessous, chacune de longueur PROPORTIONNELLE à sa `valeur`, avec
 * son `texte` écrit dedans. ⛔ Une part de moins de 30 de large (sur 260) ne
 * loge pas son texte : choisir les nombres en conséquence.
 */
const barre = (total: string, parts: { valeur: number; texte: string; couleur?: string }[]) => {
  const [W, x0, L, y, h] = [300, 20, 260, 34, 40];
  const somme = parts.reduce((a, p) => a + p.valeur, 0);
  const debuts = parts.map((_, i) => x0 + (parts.slice(0, i).reduce((a, p) => a + p.valeur, 0) / somme) * L);
  const fonds = ["#dbeafe", "#ffedd5", "#dcfce7", "#fee2e2"];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${y + h + 8}`} className="block h-auto w-full" role="img" aria-label={`Une barre de ${total}, coupée en parts`}>
        <path d={`M ${x0} ${y - 6} L ${x0} ${y - 12} L ${x0 + L} ${y - 12} L ${x0 + L} ${y - 6}`} fill="none" stroke={NOIR} strokeWidth={1.6} />
        <text x={x0 + L / 2} y={y - 17} textAnchor="middle" fontSize="14" fontWeight="900" fill={NOIR} stroke="white" strokeWidth="4" paintOrder="stroke">
          {total}
        </text>
        {parts.map((p, i) => {
          const w = (p.valeur / somme) * L;
          return (
            <g key={i}>
              <rect x={debuts[i]} y={y} width={w} height={h} fill={p.couleur ?? fonds[i % fonds.length]} stroke={NOIR} strokeWidth={1.6} />
              <text x={debuts[i] + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
                {p.texte}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * ⭐ LA MULTIPLICATION EN RECTANGLE : un rectangle de `haut` sur la somme de
 * `decoupe`, coupé en morceaux. Au-dessus, la longueur de chaque morceau ; à
 * gauche, la hauteur ; dedans, chaque produit ; dessous, la phrase du calcul.
 * Produits et phrase sont CALCULÉS : le dessin ne peut pas mentir.
 */
const aire = (haut: number, decoupe: number[]) => {
  const [W, x0, L, y0, h] = [300, 44, 236, 26, 64];
  const total = decoupe.reduce((a, b) => a + b, 0);
  const debuts = decoupe.map((_, i) => x0 + (decoupe.slice(0, i).reduce((a, b) => a + b, 0) / total) * L);
  const fonds = ["#dbeafe", "#ffedd5", "#dcfce7"];
  const produits = decoupe.map((d) => d * haut);
  const phrase = `${haut} × ${total} = ${produits.map(ecrit).join(" + ")} = ${ecrit(haut * total)}`;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${y0 + h + 34}`} className="block h-auto w-full" role="img" aria-label={phrase}>
        {decoupe.map((d, i) => {
          const w = (d / total) * L;
          return (
            <g key={i}>
              <rect x={debuts[i]} y={y0} width={w} height={h} fill={fonds[i % fonds.length]} stroke={NOIR} strokeWidth={1.8} />
              <text x={debuts[i] + w / 2} y={y0 - 8} textAnchor="middle" fontSize="14" fontWeight="800" fill={BLEU}>
                {d}
              </text>
              <text x={debuts[i] + w / 2} y={y0 + h / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill={NOIR}>
                {ecrit(produits[i])}
              </text>
            </g>
          );
        })}
        <text x={x0 - 8} y={y0 + h / 2 + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={ORANGE}>
          {haut}
        </text>
        <text x={W / 2} y={y0 + h + 24} textAnchor="middle" fontSize="14" fontWeight="800" fill={VERT}>
          {phrase}
        </text>
      </svg>
    </div>
  );
};

/**
 * ⭐ UNE DIVISION EST UN RECTANGLE QUI SE FERME (l'aide de la feuille de 5e sur
 * la divisibilité) : `n` jetons rangés par rangées de `colonnes`. La légende
 * est CALCULÉE à partir de n et de colonnes : elle ne peut pas mentir.
 */
const rangement = (n: number, colonnes: number) => {
  const c = Math.min(18, 260 / colonnes);
  const rangs = Math.ceil(n / colonnes);
  const plein = Math.floor(n / colonnes) * colonnes;
  const W = 300;
  const x0 = (W - colonnes * c) / 2;
  const H = rangs * c + 34;
  const reste = n % colonnes;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`${n} jetons en rangées de ${colonnes}`}>
        {Array.from({ length: n }, (_, i) => (
          <circle key={i} cx={x0 + (i % colonnes) * c + c / 2} cy={6 + Math.floor(i / colonnes) * c + c / 2} r={c * 0.38} fill={i < plein ? BLEU : ORANGE} />
        ))}
        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="14" fontWeight="800" fill={reste ? ORANGE : NOIR}>
          {`${Math.floor(n / colonnes)} rangées de ${colonnes}${reste ? ` + ${reste} en trop` : ", rien en trop"}`}
        </text>
      </svg>
    </div>
  );
};

/**
 * LE TABLEAU DE NUMÉRATION (celui de la feuille des entiers) : une colonne
 * par rang, groupées par classes de trois. Ici, il montre les chiffres qui
 * GLISSENT quand on multiplie par 10, 100 ou 1 000. Texte NU.
 */
const numeration = (nombres: string[], opts: { surligne?: number; noms?: string[] } = {}) => {
  const W = 300;
  const larg = Math.max(...nombres.map((n) => n.length));
  const cols = Math.max(1, Math.ceil(larg / 3)) * 3;
  const gauche = opts.noms ? 84 : 6;
  const cw = Math.min(32, (W - gauche - 6) / cols);
  const x0 = gauche + (W - gauche - 6 - cols * cw) / 2;
  const X = (c: number) => x0 + (cols - 1 - c) * cw + cw / 2;
  const [haut, hl] = [48, 26];
  const H = haut + nombres.length * hl + 6;
  const classes = ["unités", "milliers", "millions"];
  const lettres = ["u", "d", "c"];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Tableau de numération">
        {opts.surligne !== undefined ? <rect x={X(opts.surligne) - cw / 2} y={24} width={cw} height={H - 26} fill="#ffedd5" /> : null}
        {Array.from({ length: cols / 3 }, (_, k) => (
          <text key={`cl${k}`} x={X(3 * k + 1)} y={16} textAnchor="middle" fontSize="12" fontWeight="700" fill="#475569">
            {classes[k]}
          </text>
        ))}
        {Array.from({ length: cols }, (_, c) => (
          <text key={`l${c}`} x={X(c)} y={40} textAnchor="middle" fontSize="12" fontWeight="700" fill={c === opts.surligne ? ORANGE : "#64748b"}>
            {lettres[c % 3]}
          </text>
        ))}
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={x0 + i * cw} y1={i % 3 === 0 ? 4 : 24} x2={x0 + i * cw} y2={H - 2} stroke={i % 3 === 0 ? NOIR : "#cbd5e1"} strokeWidth={i % 3 === 0 ? 1.8 : 1} />
        ))}
        <line x1={x0} y1={24} x2={x0 + cols * cw} y2={24} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={x0} y1={haut - 2} x2={x0 + cols * cw} y2={haut - 2} stroke={NOIR} strokeWidth={1.4} />
        {nombres.map((n, i) => (
          <g key={`n${i}`}>
            {opts.noms ? (
              <text x={x0 - 6} y={haut + i * hl + 18} textAnchor="end" fontSize="13" fontWeight="800" fill={BLEU}>
                {opts.noms[i]}
              </text>
            ) : null}
            {n.split("").map((ch, j) => {
              const c = n.length - 1 - j;
              return (
                <text key={j} x={X(c)} y={haut + i * hl + 18} textAnchor="middle" fontSize="16" fontWeight="800" fill={i > 0 && ch === "0" && c < n.length - nombres[0].length ? ORANGE : NOIR}>
                  {ch}
                </text>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Une PYRAMIDE de briques (celle de la feuille de 5e sur les relatifs) : chaque
 * brique est la somme des deux briques posées sous elle. `etages` va du sommet
 * à la base ; les briques de `trouvees` ([étage, rang]) sont en vert. « ? » :
 * une brique à trouver. Texte NU.
 */
const pyramide = (etages: string[][], trouvees: [number, number][] = []) => {
  const [L, Hb, W] = [64, 36, 300];
  const H = etages.length * Hb + 12;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Pyramide de nombres">
        {etages.map((ligne, i) =>
          ligne.map((v, j) => {
            const x = W / 2 - (ligne.length * L) / 2 + j * L;
            const y = 6 + i * Hb;
            const vert = trouvees.some(([a, b]) => a === i && b === j);
            return (
              <g key={`${i}-${j}`}>
                <rect x={x} y={y} width={L} height={Hb} fill={vert ? "#dcfce7" : v === "?" ? "#f1f5f9" : "#fff"} stroke={NOIR} strokeWidth={1.8} />
                <text x={x + L / 2} y={y + Hb / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill={vert ? VERT : NOIR}>
                  {v}
                </text>
              </g>
            );
          }),
        )}
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

export const exercicesEntierCalculMental6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entier-calcul-mental",
  titre: "Le calcul mental",
  accroche:
    "Vingt exercices, du geste seul au problème : passer par la dizaine, arrondir puis corriger, couper un nombre en morceaux, regrouper, doubler et partager, multiplier par 10, 100 ou 1 000. Une recette de crêpes, une équipe de volley, une sortie au parc animalier, des tours de piste, une pyramide de nombres, une tirelire. Un rappel de cours avant chaque niveau. Cherche d'abord de tête, puis ouvre la correction : étape par étape, avec le piège nommé et le dessin du calcul.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/entier-calcul-mental", titre: "Le calcul mental" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une astuce par exercice. Je calcule de tête, sans poser l'opération.",
      rappel: [
        "Je passe par un nombre rond : $58 + 7$, c'est $58 + 2$, puis $+ 5$.",
        "Je connais mes tables dans les deux sens : $7 \\times 6 = 42$, donc $42 \\div 6 = 7$.",
        "Par $10$, $100$, $1\\,000$ : les chiffres glissent de $1$, $2$ ou $3$ rangs.",
      ],
      exercices: [
        {
          enonce: "Calcule de tête, en passant par la dizaine.\na) $58 + 7$\nb) $76 + 9$\nc) $149 + 6$\nd) $395 + 8$",
          correction:
            "Je complète d'abord jusqu'au nombre rond suivant. Puis j'ajoute le reste.\na) $58 + 2 = 60$, puis $60 + 5 = 65$.\nb) $76 + 4 = 80$, puis $80 + 5 = 85$.\nc) $149 + 1 = 150$, puis $150 + 5 = 155$.\nd) $395 + 5 = 400$, puis $400 + 3 = 403$.\n⛔ Le piège : oublier ce qui reste à ajouter. Au d), j'ai ajouté $5$ sur $8$ : il reste $3$.\nRéponse : a) $65$ ; b) $85$ ; c) $155$ ; d) $403$.",
          schema: droiteRel(394, 404, 1, [
            { value: 395, label: "395" },
            { value: 400, label: "400", color: ORANGE },
            { value: 403, label: "403", color: VERT },
          ], { nombres: 2, sauts: [{ de: 395, vers: 400, label: "+5" }, { de: 400, vers: 403, label: "+3" }] }),
          micros: ["entier_addition_mentale"],
        },
        {
          enonce: "Calcule de tête, en passant par la dizaine.\na) $63 - 8$\nb) $142 - 5$\nc) $91 - 6$\nd) $204 - 7$",
          correction:
            "Je descends d'abord jusqu'au nombre rond juste en dessous. Puis j'enlève le reste.\na) $63 - 3 = 60$, puis $60 - 5 = 55$.\nb) $142 - 2 = 140$, puis $140 - 3 = 137$.\nc) $91 - 1 = 90$, puis $90 - 5 = 85$.\nd) $204 - 4 = 200$, puis $200 - 3 = 197$.\n⛔ Le piège au d) : calculer $7 - 4 = 3$ et écrire $203$. On enlève $7$, pas $4$ : je passe sous $200$.\nRéponse : a) $55$ ; b) $137$ ; c) $85$ ; d) $197$.",
          schema: droiteRel(195, 205, 1, [
            { value: 204, label: "204" },
            { value: 200, label: "200", color: ORANGE },
            { value: 197, label: "197", color: VERT },
          ], { nombres: 5, sauts: [{ de: 204, vers: 200, label: "−4" }, { de: 200, vers: 197, label: "−3" }] }),
          micros: ["entier_soustraction_mentale"],
        },
        {
          enonce: "Calcule de tête.\na) $7 \\times 8$\nb) $6 \\times 9$\nc) $40 \\times 7$\nd) $30 \\times 50$",
          correction:
            "a) et b) sont dans les tables : $7 \\times 8 = 56$ et $6 \\times 9 = 54$.\nc) $40$, c'est $4 \\times 10$. Je calcule $4 \\times 7 = 28$, puis j'ajoute le zéro : $280$.\nd) Je calcule sans les zéros : $3 \\times 5 = 15$.\nIl y a deux zéros en tout. Je les ajoute : $1\\,500$.\n⛔ Le piège au d) : écrire $150$. Je compte TOUS les zéros des deux nombres.\nRéponse : a) $56$ ; b) $54$ ; c) $280$ ; d) $1\\,500$.",
          schema: ecranSeulement(
            table(["calcul", "sans les zéros", "résultat"], [
              ["40 × 7", "4 × 7 = 28", "280"],
              ["30 × 50", "3 × 5 = 15", "1 500"],
            ]),
          ),
          micros: ["entier_multiplication_mentale"],
        },
        {
          enonce: "Calcule de tête.\na) $42 \\div 6$\nb) $81 \\div 9$\nc) $560 \\div 8$\nd) $3\\,600 \\div 9$",
          correction:
            "Diviser, c'est chercher dans une table : combien de fois le diviseur ?\na) $6 \\times 7 = 42$, donc $42 \\div 6 = 7$.\nb) $9 \\times 9 = 81$, donc $81 \\div 9 = 9$.\nc) $560$, c'est $56$ dizaines. Et $56 \\div 8 = 7$. Donc $560 \\div 8 = 70$.\nd) $3\\,600$, c'est $36$ centaines. Et $36 \\div 9 = 4$. Donc $3\\,600 \\div 9 = 400$.\n⛔ Le piège au c) : répondre $7$. Ce sont $7$ dizaines : $70$.\nRéponse : a) $7$ ; b) $9$ ; c) $70$ ; d) $400$.",
          schema: rangement(42, 6),
          micros: ["entier_division_mentale"],
        },
        {
          enonce: "Calcule de tête.\na) $37 \\times 100$\nb) $405 \\times 10$\nc) $26 \\times 1\\,000$\nd) $5\\,800 \\div 100$\ne) $730 \\div 10$",
          correction:
            "Fois $10$ : chaque chiffre glisse d'un rang vers la gauche. J'écris un $0$ à la fin.\nFois $100$ : deux rangs, deux zéros. Fois $1\\,000$ : trois rangs, trois zéros.\na) $37 \\times 100 = 3\\,700$.\nb) $405 \\times 10 = 4\\,050$.\nc) $26 \\times 1\\,000 = 26\\,000$.\nDivisé par $10$ ou $100$ : les chiffres glissent vers la droite. J'enlève les zéros de la fin.\nd) $5\\,800 \\div 100 = 58$.\ne) $730 \\div 10 = 73$.\n⛔ Le piège au b) : écrire $4\\,005$. Le zéro s'ajoute à la FIN du nombre.\nRéponse : a) $3\\,700$ ; b) $4\\,050$ ; c) $26\\,000$ ; d) $58$ ; e) $73$.",
          schema: ecranSeulement(numeration(["37", "3700"], { noms: ["départ", "× 100"] })),
          micros: ["entier_strategie_mentale"],
        },
        {
          enonce: "Calcule de tête.\na) le double de $45$\nb) la moitié de $76$\nc) le quart de $200$\nd) la moitié de $130$",
          correction:
            "Le double : fois $2$. La moitié : divisé par $2$. Le quart : la moitié de la moitié.\na) Double de $40$ : $80$. Double de $5$ : $10$. Donc $80 + 10 = 90$.\nb) Moitié de $70$ : $35$. Moitié de $6$ : $3$. Donc $35 + 3 = 38$.\nc) Moitié de $200$ : $100$. Moitié de $100$ : $50$. Donc $50$.\nd) Moitié de $100$ : $50$. Moitié de $30$ : $15$. Donc $50 + 15 = 65$.\n⛔ Le piège au c) : répondre $100$. Le quart, c'est couper en $4$ : deux fois la moitié.\nRéponse : a) $90$ ; b) $38$ ; c) $50$ ; d) $65$.",
          schema: ecranSeulement(barre("76", [{ valeur: 38, texte: "38" }, { valeur: 38, texte: "38" }])),
          micros: ["entier_strategie_mentale"],
        },
        {
          enonce: "Calcule de tête : arrondis, puis corrige.\na) $57 + 19$\nb) $245 + 98$\nc) $83 - 29$\nd) $312 - 99$",
          correction:
            "$19$ est presque $20$. $98$ est presque $100$. J'utilise le nombre rond, puis je corrige.\na) $57 + 20 = 77$. J'ai ajouté $1$ de trop : $77 - 1 = 76$.\nb) $245 + 100 = 345$. J'ai ajouté $2$ de trop : $345 - 2 = 343$.\nc) $83 - 30 = 53$. J'ai enlevé $1$ de trop. Je le rends : $53 + 1 = 54$.\nd) $312 - 100 = 212$. J'ai enlevé $1$ de trop : $212 + 1 = 213$.\n⛔ Le piège au c) : corriger dans le mauvais sens, et trouver $52$. J'ai trop enlevé : je rajoute.\nRéponse : a) $76$ ; b) $343$ ; c) $54$ ; d) $213$.",
          schema: droiteRel(50, 85, 1, [
            { value: 83, label: "83" },
            { value: 53, label: "53", color: ORANGE },
            { value: 54, label: "54", color: VERT },
          ], { nombres: 5, sauts: [{ de: 83, vers: 53, label: "−30" }, { de: 53, vers: 54, label: "+1" }] }),
          micros: ["entier_strategie_mentale"],
        },
        {
          enonce: "Calcule de tête, en choisissant le bon ordre.\na) $24 \\times 5$\nb) $16 \\times 25$\nc) $4 \\times 17 \\times 25$\nd) $2 \\times 36 \\times 5$",
          correction:
            "a) Fois $5$, c'est fois $10$, puis la moitié. $24 \\times 10 = 240$. La moitié de $240$ est $120$.\nb) $16 = 4 \\times 4$, et $4 \\times 25 = 100$. Donc $16 \\times 25 = 4 \\times 100 = 400$.\nc) Je regroupe $4$ et $25$ : $4 \\times 25 = 100$. Puis $100 \\times 17 = 1\\,700$.\nd) Je regroupe $2$ et $5$ : $2 \\times 5 = 10$. Puis $10 \\times 36 = 360$.\n⭐ Dans une multiplication, je peux changer l'ordre. Le résultat ne change pas.\n⛔ Le piège au c) : calculer dans l'ordre, $4 \\times 17$ d'abord. C'est juste, mais bien plus long.\nRéponse : a) $120$ ; b) $400$ ; c) $1\\,700$ ; d) $360$.",
          schema: ecranSeulement(
            table(["calcul", "je regroupe", "résultat"], [
              ["4 × 17 × 25", "4 × 25 = 100", "1 700"],
              ["2 × 36 × 5", "2 × 5 = 10", "360"],
            ]),
          ),
          micros: ["entier_multiplication_mentale", "entier_strategie_mentale"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je choisis mon astuce. J'écris les étapes de tête sur une seule ligne.",
      rappel: [
        "Je coupe un nombre en morceaux faciles : $23 = 20 + 3$.",
        "Rendre la monnaie, c'est compléter jusqu'au prix payé.",
        "Pour vérifier, j'arrondis les nombres : c'est l'ordre de grandeur.",
      ],
      exercices: [
        {
          enonce: "Calcule de tête. Cherche les nombres qui vont bien ensemble.\na) $17 + 36 + 23 + 14$\nb) $125 + 48 + 75 + 52$",
          correction:
            "Je cherche des paires qui font un nombre rond.\na) $17 + 23 = 40$ : les unités $7$ et $3$ font $10$.\n$36 + 14 = 50$ : les unités $6$ et $4$ font $10$.\nPuis $40 + 50 = 90$.\nb) $125 + 75 = 200$. Et $48 + 52 = 100$.\nPuis $200 + 100 = 300$.\n⭐ Dans une addition, je peux changer l'ordre des nombres.\n⛔ Le piège : additionner dans l'ordre, sans regarder. C'est plus long, et on se trompe plus.\nRéponse : a) $90$ ; b) $300$.",
          schema: barre("90", [
            { valeur: 17, texte: "17", couleur: "#dbeafe" },
            { valeur: 23, texte: "23", couleur: "#dbeafe" },
            { valeur: 36, texte: "36", couleur: "#ffedd5" },
            { valeur: 14, texte: "14", couleur: "#ffedd5" },
          ]),
          micros: ["entier_addition_mentale", "entier_strategie_mentale"],
        },
        {
          enonce: "On paie avec un billet. Combien nous rend-on ?\na) On achète pour $27$ €. On paie avec $50$ €.\nb) On achète pour $58$ €. On paie avec $100$ €.\nc) On achète pour $385$ €. On paie avec $400$ €.",
          correction:
            "Rendre la monnaie, c'est chercher ce qui manque. Je complète par étapes.\na) $27 + 3 = 30$, puis $30 + 20 = 50$. On me rend $3 + 20 = 23$ €.\nb) $58 + 2 = 60$, puis $60 + 40 = 100$. On me rend $2 + 40 = 42$ €.\nc) $385 + 5 = 390$, puis $390 + 10 = 400$. On me rend $5 + 10 = 15$ €.\n⛔ Le piège : ne rendre que la dernière étape, $20$ € au a). J'additionne toutes les étapes.\nRéponse : a) $23$ € ; b) $42$ € ; c) $15$ €.",
          schema: droiteRel(25, 50, 1, [
            { value: 27, label: "27" },
            { value: 30, label: "30", color: ORANGE },
            { value: 50, label: "50", color: VERT },
          ], { nombres: 5, sauts: [{ de: 27, vers: 30, label: "+3" }, { de: 30, vers: 50, label: "+20" }] }),
          micros: ["entier_soustraction_mentale", "entier_calcul_mental_defi"],
        },
        {
          enonce: "Calcule de tête, en coupant un nombre en deux morceaux.\na) $23 \\times 4$\nb) $15 \\times 6$\nc) $12 \\times 13$\nd) $31 \\times 7$",
          correction:
            "Je coupe un nombre en dizaines et en unités. Je multiplie chaque morceau, puis j'additionne.\na) $20 \\times 4 = 80$ et $3 \\times 4 = 12$. Donc $80 + 12 = 92$.\nb) $10 \\times 6 = 60$ et $5 \\times 6 = 30$. Donc $60 + 30 = 90$.\nc) $12 \\times 10 = 120$ et $12 \\times 3 = 36$. Donc $120 + 36 = 156$.\nd) $30 \\times 7 = 210$ et $1 \\times 7 = 7$. Donc $210 + 7 = 217$.\n⛔ Le piège au a) : oublier le morceau des unités, et répondre $80$.\n⭐ Le rectangle le montre : les deux morceaux forment le tout.\nRéponse : a) $92$ ; b) $90$ ; c) $156$ ; d) $217$.",
          schema: aire(4, [20, 3]),
          micros: ["entier_multiplication_mentale", "entier_strategie_mentale"],
        },
        {
          enonce: "Calcule de tête, en coupant le nombre à diviser.\na) $84 \\div 4$\nb) $75 \\div 5$\nc) $126 \\div 6$\nd) $96 \\div 3$",
          correction:
            "Je coupe le nombre en morceaux faciles à diviser. Je divise chaque morceau, puis j'additionne.\na) $84 = 80 + 4$. $80 \\div 4 = 20$ et $4 \\div 4 = 1$. Donc $21$.\nb) $75 = 50 + 25$. $50 \\div 5 = 10$ et $25 \\div 5 = 5$. Donc $15$.\nc) $126 = 120 + 6$. $120 \\div 6 = 20$ et $6 \\div 6 = 1$. Donc $21$.\nd) $96 = 90 + 6$. $90 \\div 3 = 30$ et $6 \\div 3 = 2$. Donc $32$.\n⭐ Contrôle : $5 \\times 15 = 75$. La multiplication vérifie la division.\n⛔ Le piège : diviser un seul morceau, et oublier l'autre.\nRéponse : a) $21$ ; b) $15$ ; c) $21$ ; d) $32$.",
          schema: ecranSeulement(aire(5, [10, 5])),
          micros: ["entier_division_mentale", "entier_strategie_mentale"],
        },
        {
          enonce:
            "Pour calculer $48 + 35$, trois élèves font ainsi.\nLéa : $48 + 30 = 78$, puis $78 + 5 = 83$.\nTom : $50 + 35 = 85$, puis $85 - 2 = 83$.\nInès : $40 + 30 = 70$, $8 + 5 = 13$, puis $70 + 13 = 83$.\na) Qui a raison ?\nb) Explique l'idée de Tom.\nc) Calcule $199 + 57$ avec l'idée de Tom.",
          correction:
            "a) Les trois trouvent $83$. Les trois ont raison : il y a plusieurs chemins.\nb) Tom remplace $48$ par $50$, un nombre rond.\nIl a ajouté $2$ de trop. Il les enlève à la fin.\nc) $199$ est presque $200$. Je calcule $200 + 57 = 257$.\nJ'ai ajouté $1$ de trop : $257 - 1 = 256$.\n⭐ Je choisis le chemin le plus simple pour MES nombres.\n⛔ Le piège au c) : corriger en ajoutant $1$, et trouver $258$.\nRéponse : a) tous les trois ; c) $256$.",
          schema: ecranSeulement(
            table(["élève", "son chemin", "résultat"], [
              ["Léa", "48 + 30, puis + 5", "83"],
              ["Tom", "50 + 35, puis − 2", "83"],
              ["Inès", "70 + 13", "83"],
            ]),
          ),
          micros: ["entier_strategie_mentale", "entier_addition_mentale"],
        },
        {
          enonce: "Sans poser l'opération, trouve le bon résultat parmi les trois.\na) $49 \\times 21$ : $129$ ; $1\\,029$ ; $10\\,029$\nb) $398 + 205$ : $503$ ; $603$ ; $703$\nc) $812 - 395$ : $317$ ; $417$ ; $517$",
          correction:
            "J'arrondis chaque nombre. Le calcul devient facile : c'est l'ordre de grandeur.\na) $49$ est presque $50$, et $21$ presque $20$. $50 \\times 20 = 1\\,000$.\nLe bon résultat est $1\\,029$.\nb) $400 + 200 = 600$. Le bon résultat est $603$.\nc) $800 - 400 = 400$. Le bon résultat est $417$.\n⛔ Le piège : choisir au hasard. L'ordre de grandeur élimine les résultats trop loin.\nRéponse : a) $1\\,029$ ; b) $603$ ; c) $417$.",
          schema: ecranSeulement(
            table(["calcul", "j'arrondis", "résultat"], [
              ["49 × 21", "50 × 20 = 1 000", "1 029"],
              ["398 + 205", "400 + 200 = 600", "603"],
              ["812 − 395", "800 − 400 = 400", "417"],
            ]),
          ),
          micros: ["entier_strategie_mentale", "entier_calcul_mental_defi"],
        },
        {
          enonce:
            "Pour $4$ personnes, une recette de crêpes demande $250$ g de farine, $3$ œufs et $50$ cl de lait.\na) Combien faut-il de chaque ingrédient pour $12$ personnes ?\nb) Et pour $8$ personnes ?\nc) Une boîte contient $6$ œufs. Combien de boîtes faut-il acheter pour $12$ personnes ?",
          correction:
            "a) $12$ personnes, c'est $3$ fois $4$ personnes. Je multiplie tout par $3$.\nFarine : $250 \\times 3 = 750$ g. Œufs : $3 \\times 3 = 9$. Lait : $50 \\times 3 = 150$ cl.\nb) $8$ personnes, c'est le double de $4$. Je multiplie tout par $2$.\nFarine : $500$ g. Œufs : $6$. Lait : $100$ cl.\nc) Il faut $9$ œufs. Une boîte en donne $6$ : ce n'est pas assez.\nDeux boîtes en donnent $12$. Il faut acheter $2$ boîtes.\n⛔ Le piège au a) : ajouter $8$ partout, car $12 = 4 + 8$. On multiplie, on n'ajoute pas.\nRéponse : a) $750$ g, $9$ œufs, $150$ cl ; b) $500$ g, $6$ œufs, $100$ cl ; c) $2$ boîtes.",
          schema: table(["ingrédient", "4 pers.", "12 pers."], [
            ["farine (g)", "250", "750"],
            ["œufs", "3", "9"],
            ["lait (cl)", "50", "150"],
          ]),
          micros: ["entier_multiplication_mentale", "entier_calcul_mental_defi"],
        },
        {
          enonce: "Les $6$ joueuses d'une équipe de volley gagnent $90$ € à un tournoi. Elles partagent en parts égales.\na) Combien reçoit chaque joueuse ?\nb) Et si elles avaient été $5$ ?\nc) Et si elles avaient été $9$ ?",
          correction:
            "Partager en parts égales, c'est diviser.\na) $90 = 60 + 30$. $60 \\div 6 = 10$ et $30 \\div 6 = 5$. Chaque joueuse reçoit $15$ €.\nb) $90 = 50 + 40$. $50 \\div 5 = 10$ et $40 \\div 5 = 8$. Chacune recevrait $18$ €.\nc) $9 \\times 10 = 90$. Chacune recevrait $10$ €.\n⭐ Contrôle : $6 \\times 15 = 90$.\n⛔ Le piège : croire que la part grandit quand on est plus nombreux. C'est l'inverse.\nRéponse : a) $15$ € ; b) $18$ € ; c) $10$ €.",
          schema: barre("90 €", [
            { valeur: 15, texte: "15" },
            { valeur: 15, texte: "15" },
            { valeur: 15, texte: "15" },
            { valeur: 15, texte: "15" },
            { valeur: 15, texte: "15" },
            { valeur: 15, texte: "15" },
          ]),
          micros: ["entier_division_mentale", "entier_calcul_mental_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je calcule de tête, puis je réponds par une phrase.",
      rappel: [
        "Je cherche l'opération : ajouter, enlever, répéter ou partager.",
        "Je choisis l'astuce qui rend le calcul facile, puis je vérifie.",
      ],
      exercices: [
        {
          titre: "La sortie au parc animalier",
          enonce:
            "Une classe de $24$ élèves va au parc animalier, avec $3$ adultes.\nUn billet enfant coûte $9$ €. Un billet adulte coûte $15$ €.\na) Combien coûtent les billets des élèves ?\nb) Combien coûtent les billets des adultes ?\nc) Le budget de la sortie est de $300$ €. Combien reste-t-il après les billets ?\nd) Le car coûte $240$ €. Les élèves le paient à parts égales. Combien paie chaque élève ?",
          correction:
            "a) $24 \\times 9$ : je calcule $24 \\times 10 = 240$.\nChaque billet coûte $1$ € de moins que $10$ €. J'enlève donc $24$.\n$240 - 24 = 216$. Les billets des élèves coûtent $216$ €.\nb) $3 \\times 15 = 45$. Les billets des adultes coûtent $45$ €.\nc) Tous les billets : $216 + 45 = 261$ €.\nIl reste $300 - 261 = 39$ €.\nd) $240 \\div 24 = 10$. Chaque élève paie $10$ € pour le car.\n⛔ Le piège au a) : enlever $1$ au lieu de $24$. Les $24$ billets coûtent chacun $1$ € de moins.\nRéponse : a) $216$ € ; b) $45$ € ; c) $39$ € ; d) $10$ €.",
          schema: barre("300 €", [
            { valeur: 216, texte: "216" },
            { valeur: 45, texte: "45" },
            { valeur: 39, texte: "39", couleur: "#dcfce7" },
          ]),
          micros: ["entier_multiplication_mentale", "entier_strategie_mentale", "entier_soustraction_mentale", "entier_division_mentale", "entier_calcul_mental_defi"],
        },
        {
          titre: "Les tours de piste",
          enonce:
            "Sur la piste du stade, un tour mesure $400$ m. Lina s'entraîne pour courir $10$ km.\na) Combien de mètres fait-elle en $8$ tours ?\nb) $10$ km, c'est $10\\,000$ m. Combien de tours faut-il pour faire $10$ km ?\nc) Lina a déjà fait $17$ tours. Combien de mètres lui reste-t-il ?",
          correction:
            "a) $8 \\times 400$ : je calcule $8 \\times 4 = 32$, puis j'ajoute deux zéros. Elle fait $3\\,200$ m.\nb) $5$ tours font $5 \\times 400 = 2\\,000$ m.\nEt $10\\,000$ m, c'est $5$ fois $2\\,000$ m. Il faut donc $5 \\times 5 = 25$ tours.\nc) Il lui reste $25 - 17 = 8$ tours. C'est $3\\,200$ m, comme au a) !\n⭐ Autre chemin : $17 \\times 400 = 6\\,800$, et $10\\,000 - 6\\,800 = 3\\,200$.\n⛔ Le piège au b) : diviser $10$ par $400$. Je passe d'abord les kilomètres en mètres.\nRéponse : a) $3\\,200$ m ; b) $25$ tours ; c) $3\\,200$ m.",
          schema: barre("10 000 m", [
            { valeur: 6800, texte: "17 tours" },
            { valeur: 3200, texte: "8 tours", couleur: "#dcfce7" },
          ]),
          micros: ["entier_multiplication_mentale", "entier_division_mentale", "entier_soustraction_mentale", "entier_calcul_mental_defi"],
        },
        {
          titre: "La pyramide de nombres",
          enonce:
            "Dans une pyramide, chaque brique est la somme des deux briques juste en dessous.\na) Complète de tête la pyramide dessinée.\nb) Une autre pyramide a trois étages. Son sommet vaut $120$.\nAu milieu, une brique vaut $45$. En bas, la brique du centre vaut $20$.\nTrouve les autres briques.",
          figure: pyramide([["?"], ["?", "?"], ["?", "?", "?"], ["38", "12", "25", "45"]]),
          correction:
            "a) Je pars du bas. Chaque brique est la somme des deux briques dessous.\nDeuxième étage : $38 + 12 = 50$ ; $12 + 25 = 37$ ; $25 + 45 = 70$.\nTroisième étage : $50 + 37 = 87$ ; $37 + 70 = 107$.\nSommet : $87 + 107 = 194$.\nb) Je pars du haut. $45$ et la brique cachée font $120$ : elle vaut $120 - 45 = 75$.\nEn bas : $45 - 20 = 25$ et $75 - 20 = 55$.\n⭐ Contrôle : $25 + 20 = 45$ et $20 + 55 = 75$.\n⛔ Le piège au b) : additionner en descendant. Vers le bas, on soustrait.\nRéponse : a) le sommet vaut $194$ ; b) $75$ au milieu, $25$ et $55$ en bas.",
          schema: ecranSeulement(pyramide([["120"], ["45", "75"], ["25", "20", "55"]], [[1, 1], [2, 0], [2, 2]])),
          micros: ["entier_addition_mentale", "entier_soustraction_mentale", "entier_calcul_mental_defi"],
        },
        {
          titre: "La tirelire",
          enonce:
            "Chloé met de l'argent dans sa tirelire chaque semaine.\nLa 1re semaine, $5$ €. La 2e, $10$ €. La 3e, $15$ €. Chaque semaine, $5$ € de plus.\na) Combien met-elle la 8e semaine ?\nb) Combien a-t-elle en tout après $8$ semaines ?\nc) Elle veut un skate à $250$ €. Après combien de semaines peut-elle l'acheter ?",
          correction:
            "a) La 8e semaine, elle met $8 \\times 5 = 40$ €.\nb) J'additionne $5 + 10 + 15 + 20 + 25 + 30 + 35 + 40$.\nJe fais des paires : $5 + 40 = 45$ ; $10 + 35 = 45$ ; $15 + 30 = 45$ ; $20 + 25 = 45$.\nQuatre paires de $45$ : $4 \\times 45 = 180$. Elle a $180$ €.\nc) 9e semaine : elle met $45$ €. Total : $180 + 45 = 225$ €. Pas assez.\n10e semaine : elle met $50$ €. Total : $225 + 50 = 275$ €. C'est assez.\nElle peut l'acheter après $10$ semaines.\n⛔ Le piège au b) : répondre $40$ €. On veut tout l'argent, pas celui d'une semaine.\nRéponse : a) $40$ € ; b) $180$ € ; c) $10$ semaines.",
          schema: table(["semaine", "elle met", "total"], [
            ["1", "5", "5"],
            ["2", "10", "15"],
            ["3", "15", "30"],
            ["4", "20", "50"],
            ["5", "25", "75"],
            ["6", "30", "105"],
            ["7", "35", "140"],
            ["8", "40", "180"],
            ["9", "45", "225"],
            ["10", "50", "275"],
          ]),
          micros: ["entier_addition_mentale", "entier_multiplication_mentale", "entier_strategie_mentale", "entier_calcul_mental_defi"],
        },
      ],
    },
  ],
};
