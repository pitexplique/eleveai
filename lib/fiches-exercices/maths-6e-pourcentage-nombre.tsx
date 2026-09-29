// ─── Fiche d'exercices : les pourcentages (6e) — 20 exercices corrigés ─────────
//
// Lot de 6e (30/09/2026), sur la forme de l'étalon `maths-5e-relatif-nombre.tsx`
// et de la feuille voisine `maths-5e-prop-ratio-pourcentage.tsx` (aides de
// dessin reprises : la barre de 0 à 100 % `pourcents`, le `camembert`,
// `table`), plus la GRILLE DE 100 CARREAUX, le dessin de la fiche de cours.
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-pourcentages.tsx` (même
// vocabulaire : « % veut dire sur 100 », les repères moitié, quart, dixième,
// les trois écritures) et sur la banque
// `lib/tutor-v4/questionBank/6e/maths/pourcentages.bank.ts` (LECTURE SEULE :
// une autre session la modifie). Le programme de 6e en trois gestes, dit par
// la banque : appliquer un pourcentage, exprimer une proportion en
// pourcentage, s'en servir dans un problème à deux étapes.
// ⛔ LIMITES DE LA 6e, lues dans la banque : des pourcentages simples (5, 10,
// 12, 15, 20, 25, 30, 35, 40, 50, 60, 75 %), calculés par un repère ou par
// 10 % ; une part écrite en pourcentage quand le total divise 100 (20, 25, 50)
// ou 200 ; une remise « −p % » ; « le reste » d'un tout à 100 %. Pas de
// coefficient multiplicateur, pas de hausse puis baisse (5e), pas de taux
// d'évolution calculé comme un quotient.
// ⛔ Aucun exemple de la fiche de cours n'est repris (la grille de 25, 75 %
// = 3/4 = 0,75, les 60 bonbons rouges, 50 % de 18, 10 % de 60, 20 % de 60,
// 25 % de 20, les 8 cartes brillantes, 5 % = 0,05, la batterie à 80 %), ni de
// la feuille de 5e (la forêt, les tirs au but, le jeu vidéo, le vélo à 240 €,
// les oiseaux, les arbres de la ville, la sortie scolaire), ni de la banque.
//
// Les pièges nommés : écrire « 0,37 % » pour 37 carreaux sur 100 (1), lire
// « sur 10 » (2), prendre le haut d'une fraction pour un pourcentage (3, 15),
// 8 % = 0,8 (4), croire que « p % = p personnes » sans groupe de 100 (5, 8,
// 13, 16), diviser par 25 pour 25 % (6), prendre le pourcentage pour le
// résultat (7, 14, 15), un nombre sur 50 lu comme un pourcentage (9, 17),
// retirer 25 € pour −25 % (10), choisir le plus grand pourcentage sans
// calculer (11, 19), 0,2 = 2 % (12, 15), retirer des euros à un pourcentage
// (18), comparer des euros à des pour cent (20).
//
// Pas de fait réel : parc, graines, sacs, bibliothèque, téléchargement,
// réservoir, classe, fête, bouteilles, vélo sont des MODÈLES.
//
// ⭐ LES DESSINS : la GRILLE DE 100 CARREAUX (`grille`), la barre de 0 à 100 %
// avec les quantités en face (`pourcents`, reprise de la 5e, fin de barre
// écrite à DROITE pour qu'un repère à 84 % ne touche pas « 100 % »), la droite
// graduée de l'étalon (`droiteRel`), le `camembert` et des tableaux (`table`).
// 13 dessins imprimés ; ceux qui redisent le corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je compte les lignes »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-pourcentage-nombre.mjs`.
//
// Micro-compétences : pourcentage_comprendre (1, 5, 8, 14, 15),
// pourcentage_fraction (2, 3, 8, 9, 12, 15, 17, 18), pourcentage_decimal (4,
// 8, 12, 15), pourcentage_lire (1, 5, 13, 17, 19), pourcentage_calcul_simple
// (6, 7, 10, 11, 13, 14, 16, 18, 19, 20), pourcentage_defi (9, 10, 11, 13, 16,
// 17, 18, 19, 20). 6/6.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const VIOLET = "#7c3aed";
const NOIR = "#0f172a";
const VIDE = "#f1f5f9";
const COULEURS = [BLEU, ORANGE, VERT, VIOLET];

type Point = { value: number; label: string; color?: string };
type Saut = { de: number; vers: number; label: string };

/** 0,5 : un nombre écrit comme au tableau (texte NU, pas de KaTeX en SVG). */
const ecrit = (v: number) => {
  const [e, d] = String(Math.abs(Math.round(v * 1e6) / 1e6)).split(".");
  return (v < 0 ? "−" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * Une droite graduée HORIZONTALE (celle de l'étalon) : une graduation tous les
 * `pas`, un nombre tous les `nombres`, des points nommés SOUS les nombres.
 * ⛔ Onze nombres écrits au plus.
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
    // Une étiquette ne sort pas du dessin : au bord, elle rentre.
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
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Droite graduée">
        <line x1={marge - 12} y1={Y} x2={W - marge + 12} y2={Y} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${W - marge + 4} ${Y - 5} L ${W - marge + 12} ${Y} L ${W - marge + 4} ${Y + 5}`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={Y - (ecritIci(t) ? 6 : 4)} x2={x(t)} y2={Y + (ecritIci(t) ? 6 : 4)} stroke={NOIR} strokeWidth={ecritIci(t) ? 1.8 : 1.2} />
            {ecritIci(t) ? (
              <text x={x(t)} y={Y + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill={t === 0 ? ROUGE : NOIR}>
                {ecrit(t)}
              </text>
            ) : null}
          </g>
        ))}
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

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). ⚠️ 3 colonnes courtes au plus. */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/**
 * LA BARRE DE 0 À 100 % (feuille de 5e). En haut les pourcentages, en bas les
 * quantités qui leur correspondent ; la barre est coloriée jusqu'au plus grand
 * pourcentage marqué. `marques` : [pourcentage, valeur].
 * ⭐ La barre fait 200 de long ; « 100 % » et le total sont écrits À DROITE de
 * son bout : un repère à 84 % ne les touche pas.
 * ⚠️ Le script vérifie : valeur = pourcentage × total ÷ 100, et deux repères
 * sont à 40 unités au moins l'un de l'autre (leurs étiquettes ne se touchent pas).
 */
const pourcents = (total: string, unite: string, marques: [number, string][]) => {
  const x0 = 14;
  const X = (p: number) => x0 + 2 * p;
  const cible = Math.max(...marques.map(([p]) => p));
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg
        viewBox={`0 0 280 ${unite ? 100 : 84}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Une barre de 0 à 100 %, où 100 % valent ${total} ${unite} : ${marques.map(([p, v]) => `${p} % valent ${v}`).join(" ; ")}.`}
      >
        <rect x={x0} y={34} width={200} height={20} fill="#eff6ff" />
        <rect x={x0} y={34} width={2 * cible} height={20} fill="#93c5fd" />
        <rect x={x0} y={34} width={200} height={20} fill="none" stroke={NOIR} strokeWidth={1.5} />
        {marques.map(([p, v]) => (
          <g key={p}>
            <line x1={X(p)} x2={X(p)} y1={30} y2={58} stroke="#1d4ed8" strokeWidth={2} />
            <text x={X(p)} y={24} textAnchor="middle" fontSize={14} fontWeight={700} fill="#1d4ed8">
              {`${p} %`}
            </text>
            <text x={X(p)} y={74} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
              {v}
            </text>
          </g>
        ))}
        <text x={x0 + 208} y={24} fontSize={14} fontWeight={700} fill="#1d4ed8">
          100 %
        </text>
        <text x={x0 + 208} y={74} fontSize={14} fontWeight={700} fill={NOIR}>
          {total}
        </text>
        {unite ? (
          <text x={140} y={94} textAnchor="middle" fontSize={14} fill="#475569">
            {`en ${unite}`}
          </text>
        ) : null}
      </svg>
    </div>
  );
};

/**
 * LE CAMEMBERT DES PARTS (feuille de 5e) : viewBox 240 et corps 15, le
 * pourcentage écrit DANS chaque secteur, le nom dans la légende.
 * ⚠️ Le script relit `{ nom, valeur }` : leur somme fait 100. Pas deux petits
 * secteurs voisins.
 */
const camembert = (parts: { nom: string; valeur: number }[]) => {
  const total = parts.reduce((s, p) => s + p.valeur, 0);
  const [cx, cy, r] = [72, 75, 64];
  const point = (a: number, rayon = r) => [cx + rayon * Math.cos(a), cy + rayon * Math.sin(a)];
  let debut = -Math.PI / 2;
  const secteurs = parts.map((p, i) => {
    const angle = (2 * Math.PI * p.valeur) / total;
    const [x0, y0] = point(debut);
    const [x1, y1] = point(debut + angle);
    const [xt, yt] = point(debut + angle / 2, r * 0.58);
    debut += angle;
    return { p, i, d: `M ${cx} ${cy} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${angle > Math.PI ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`, xt, yt };
  });
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox="0 0 240 150" className="block h-auto w-full" role="img" aria-label={parts.map((p) => `${p.nom} : ${p.valeur} %`).join(", ")}>
        {secteurs.map(({ p, i, d, xt, yt }) => (
          <g key={i}>
            <path d={d} fill={COULEURS[i]} stroke="#fff" strokeWidth={2} />
            <text x={xt} y={yt + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill="#fff">
              {`${p.valeur} %`}
            </text>
          </g>
        ))}
        {parts.map((p, i) => (
          <g key={i}>
            <rect x={144} y={28 + i * 26} width={14} height={14} fill={COULEURS[i]} />
            <text x={162} y={40 + i * 26} fontSize={15} fontWeight={700} fill={NOIR}>
              {p.nom}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * LA GRILLE DE CARREAUX (celle de la fiche de cours : 10 × 10 = 100 carreaux,
 * un carreau = 1 %). Remplie dans l'ordre de lecture par chaque groupe (`n`
 * carreaux de sa couleur) ; les carreaux qui restent sont clairs. La légende
 * dessous (noms de 7 signes au plus), avec `reste` pour les carreaux clairs.
 */
const grille = (lignes: number, colonnes: number, groupes: { n: number; nom: string }[], reste = "") => {
  const c = colonnes >= 10 ? 20 : 26;
  const x0 = (300 - colonnes * c) / 2;
  const couleur = (i: number) => {
    let fin = 0;
    for (let g = 0; g < groupes.length; g++) {
      fin += groupes[g].n;
      if (i < fin) return COULEURS[g];
    }
    return VIDE;
  };
  const legende = [...groupes.map((g, i) => ({ color: COULEURS[i], label: g.nom })), ...(reste ? [{ color: VIDE, label: reste }] : [])].filter((l) => l.label);
  // Chaque nom prend sa place (8,5 par signe) : « musique » ne mord pas sur le suivant.
  const debuts = legende.map((_, k) => 8 + legende.slice(0, k).reduce((s, l) => s + 24 + l.label.length * 8.5, 0));
  const H = lignes * c + 8 + (legende.length ? 28 : 0);
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Grille de carreaux égaux">
        {Array.from({ length: lignes * colonnes }, (_, i) => (
          <rect key={i} x={x0 + (i % colonnes) * c} y={4 + Math.floor(i / colonnes) * c} width={c} height={c} fill={couleur(i)} stroke="#475569" strokeWidth={1} />
        ))}
        {legende.map((l, k) => (
          <g key={l.label}>
            <rect x={debuts[k]} y={H - 20} width={12} height={12} fill={l.color} stroke="#475569" strokeWidth={1} />
            <text x={debuts[k] + 16} y={H - 9} fontSize="14" fontWeight="700" fill={NOIR}>
              {l.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export const exercicesPourcentageNombre6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "pourcentage-nombre",
  titre: "Les pourcentages",
  accroche:
    "Vingt exercices, du geste seul au problème : comprendre « pour cent », passer d'un pourcentage à une fraction et à un nombre décimal, lire un pourcentage, calculer 50 %, 25 %, 10 % d'un nombre, écrire une part en pourcentage. Une grille de 100 carreaux, des arbres, des graines, des soldes, une bibliothèque, un téléchargement, un réservoir, un sondage, une fête, deux bouteilles de jus et deux magasins. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et un dessin.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/pourcentage-nombre", titre: "Les pourcentages" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je lis le signe % comme « sur 100 ».",
      rappel: [
        "Le signe $\\%$ veut dire « sur $100$ ». $37\\,\\%$, c'est $37$ sur $100$.",
        "Un pourcentage s'écrit aussi en fraction et en décimal : $37\\,\\% = \\dfrac{37}{100} = 0{,}37$.",
        "Les repères : $50\\,\\%$, c'est la moitié. $25\\,\\%$, le quart. $10\\,\\%$, le dixième.",
      ],
      exercices: [
        {
          enonce: "La grille a $100$ carreaux.\na) Combien de carreaux sont coloriés ?\nb) Quel pourcentage de la grille est colorié ?\nc) Quel pourcentage n'est pas colorié ?",
          figure: grille(10, 10, [{ n: 37, nom: "" }]),
          correction:
            "a) Je compte les lignes pleines : $3$ lignes de $10$, soit $30$ carreaux. Plus $7$ carreaux : $30 + 7 = 37$.\nb) $37$ carreaux sur $100$ : c'est $37\\,\\%$.\nc) $100 - 37 = 63$ carreaux blancs : $63\\,\\%$.\n⭐ Contrôle : $37\\,\\% + 63\\,\\% = 100\\,\\%$. Toute la grille fait $100\\,\\%$.\n⛔ Le piège : écrire $0{,}37\\,\\%$. Sur une grille de $100$ carreaux, le nombre de carreaux EST le pourcentage.\nRéponse : a) $37$ ; b) $37\\,\\%$ ; c) $63\\,\\%$.",
          micros: ["pourcentage_comprendre", "pourcentage_lire"],
        },
        {
          enonce: "Écris chaque pourcentage en fraction sur $100$. Puis simplifie quand c'est facile.\na) $30\\,\\%$\nb) $7\\,\\%$\nc) $90\\,\\%$\nd) $100\\,\\%$",
          correction:
            "« Pour cent » veut dire « sur $100$ ». Le pourcentage va en haut, $100$ va en bas.\na) $30\\,\\% = \\dfrac{30}{100}$. Je divise le haut et le bas par $10$ : $\\dfrac{30}{100} = \\dfrac{3}{10}$.\nb) $7\\,\\% = \\dfrac{7}{100}$. Elle ne se simplifie pas.\nc) $90\\,\\% = \\dfrac{90}{100}$. Je divise par $10$ : $\\dfrac{90}{100} = \\dfrac{9}{10}$.\nd) $100\\,\\% = \\dfrac{100}{100} = 1$ : c'est le tout.\n⛔ Le piège : écrire $\\dfrac{7}{10}$ pour $7\\,\\%$. Un pourcentage se lit toujours sur $100$.\nRéponse : a) $\\dfrac{30}{100} = \\dfrac{3}{10}$ ; b) $\\dfrac{7}{100}$ ; c) $\\dfrac{90}{100} = \\dfrac{9}{10}$ ; d) $\\dfrac{100}{100} = 1$.",
          schema: ecranSeulement(
            table(["en %", "sur 100", "plus simple"], [
              ["30 %", "30/100", "3/10"],
              ["7 %", "7/100", "7/100"],
              ["90 %", "90/100", "9/10"],
              ["100 %", "100/100", "1"],
            ]),
          ),
          micros: ["pourcentage_fraction"],
        },
        {
          enonce: "Écris chaque fraction en pourcentage.\na) $\\dfrac{7}{10}$\nb) $\\dfrac{1}{4}$\nc) $\\dfrac{4}{5}$\nd) $\\dfrac{9}{20}$\ne) $\\dfrac{1}{2}$",
          correction:
            "Je cherche la fraction égale qui a $100$ en bas. Je multiplie le haut ET le bas par le même nombre.\na) $10 \\times 10 = 100$ : $\\dfrac{7}{10} = \\dfrac{70}{100} = 70\\,\\%$.\nb) $4 \\times 25 = 100$ : $\\dfrac{1}{4} = \\dfrac{25}{100} = 25\\,\\%$. C'est le quart.\nc) $5 \\times 20 = 100$ : $\\dfrac{4}{5} = \\dfrac{80}{100} = 80\\,\\%$.\nd) $20 \\times 5 = 100$ : $\\dfrac{9}{20} = \\dfrac{45}{100} = 45\\,\\%$.\ne) $2 \\times 50 = 100$ : $\\dfrac{1}{2} = \\dfrac{50}{100} = 50\\,\\%$. C'est la moitié.\n⛔ Le piège : écrire $\\dfrac{4}{5} = 4\\,\\%$. Le nombre du haut est le pourcentage seulement si le bas vaut $100$.\nRéponse : a) $70\\,\\%$ ; b) $25\\,\\%$ ; c) $80\\,\\%$ ; d) $45\\,\\%$ ; e) $50\\,\\%$.",
          schema: ecranSeulement(
            table(["fraction", "sur 100", "en %"], [
              ["7/10", "70/100", "70 %"],
              ["1/4", "25/100", "25 %"],
              ["4/5", "80/100", "80 %"],
              ["9/20", "45/100", "45 %"],
              ["1/2", "50/100", "50 %"],
            ]),
          ),
          micros: ["pourcentage_fraction"],
        },
        {
          enonce: "Écris chaque pourcentage en décimal, ou chaque décimal en pourcentage.\na) $65\\,\\%$\nb) $8\\,\\%$\nc) $0{,}3$\nd) $0{,}04$",
          correction:
            "$p\\,\\%$, ce sont $p$ centièmes.\na) $65\\,\\% = \\dfrac{65}{100} = 0{,}65$.\nb) $8\\,\\% = \\dfrac{8}{100} = 0{,}08$ : huit centièmes.\nc) $0{,}3$, ce sont $3$ dixièmes, soit $30$ centièmes : $0{,}3 = \\dfrac{30}{100} = 30\\,\\%$.\nd) $0{,}04$, ce sont $4$ centièmes : $0{,}04 = \\dfrac{4}{100} = 4\\,\\%$.\n⛔ Le piège du b) : écrire $8\\,\\% = 0{,}8$. Mais $0{,}8$, ce sont $80$ centièmes : c'est $80\\,\\%$.\nRéponse : a) $0{,}65$ ; b) $0{,}08$ ; c) $30\\,\\%$ ; d) $4\\,\\%$.",
          schema: droiteRel(0, 1, 0.1, [
            { value: 0.04, label: "4 %" },
            { value: 0.08, label: "8 %" },
            { value: 0.3, label: "30 %" },
            { value: 0.65, label: "65 %" },
          ], { nombres: 0.5 }),
          micros: ["pourcentage_decimal"],
        },
        {
          enonce: "Un parc compte $100$ arbres. $45\\,\\%$ sont des chênes. $30\\,\\%$ sont des hêtres. $15\\,\\%$ sont des pins. Les autres sont des bouleaux.\na) Combien y a-t-il de chênes ? De hêtres ? De pins ?\nb) Quel pourcentage d'arbres sont des bouleaux ? Combien d'arbres est-ce ?",
          correction:
            "Il y a $100$ arbres : un pourcentage donne directement un nombre d'arbres.\na) $45\\,\\%$ de $100$ arbres : $45$ chênes. Puis $30$ hêtres et $15$ pins.\nb) Le tout fait $100\\,\\%$. $100 - 45 - 30 - 15 = 10$ : $10\\,\\%$ de bouleaux, soit $10$ arbres.\n⛔ Le piège : croire que ça marche pour n'importe quel groupe. « $45\\,\\%$ = $45$ arbres » est vrai seulement quand il y a $100$ arbres.\nRéponse : a) $45$ chênes, $30$ hêtres et $15$ pins ; b) $10\\,\\%$, soit $10$ bouleaux.",
          schema: ecranSeulement(
            grille(10, 10, [
              { n: 45, nom: "chêne" },
              { n: 30, nom: "hêtre" },
              { n: 15, nom: "pin" },
            ], "bouleau"),
          ),
          micros: ["pourcentage_lire", "pourcentage_comprendre"],
        },
        {
          enonce: "Calcule de tête.\na) $50\\,\\%$ de $64$\nb) $25\\,\\%$ de $36$\nc) $10\\,\\%$ de $250$\nd) $75\\,\\%$ de $40$",
          correction:
            "J'utilise les repères.\na) $50\\,\\%$, c'est la moitié : $64 \\div 2 = 32$.\nb) $25\\,\\%$, c'est le quart : $36 \\div 4 = 9$.\nc) $10\\,\\%$, c'est le dixième : $250 \\div 10 = 25$.\nd) $75\\,\\%$, ce sont trois quarts. Un quart : $40 \\div 4 = 10$. Trois quarts : $3 \\times 10 = 30$.\n⛔ Le piège du b) : diviser par $25$. $25\\,\\%$, c'est le QUART : je divise par $4$.\nRéponse : a) $32$ ; b) $9$ ; c) $25$ ; d) $30$.",
          schema: pourcents("40", "", [
            [25, "10"],
            [75, "30"],
          ]),
          micros: ["pourcentage_calcul_simple"],
        },
        {
          enonce: "Calcule en passant par $10\\,\\%$.\na) $20\\,\\%$ de $80$\nb) $30\\,\\%$ de $90$\nc) $5\\,\\%$ de $60$\nd) $40\\,\\%$ de $15$",
          correction:
            "D'abord $10\\,\\%$ : je divise par $10$. Puis j'adapte.\na) $10\\,\\%$ de $80$, c'est $8$. Donc $20\\,\\%$, c'est $2 \\times 8 = 16$.\nb) $10\\,\\%$ de $90$, c'est $9$. Donc $30\\,\\%$, c'est $3 \\times 9 = 27$.\nc) $10\\,\\%$ de $60$, c'est $6$. Et $5\\,\\%$, c'est la moitié : $6 \\div 2 = 3$.\nd) $10\\,\\%$ de $15$, c'est $1{,}5$. Donc $40\\,\\%$, c'est $4 \\times 1{,}5 = 6$.\n⛔ Le piège : croire que $20\\,\\%$ de $80$ font $20$. Le pourcentage n'est pas le résultat : c'est une part de $80$.\nRéponse : a) $16$ ; b) $27$ ; c) $3$ ; d) $6$.",
          schema: ecranSeulement(
            table(["calcul", "10 %", "résultat"], [
              ["20 % de 80", "8", "16"],
              ["30 % de 90", "9", "27"],
              ["5 % de 60", "6", "3"],
              ["40 % de 15", "1,5", "6"],
            ]),
          ),
          micros: ["pourcentage_calcul_simple"],
        },
        {
          enonce: "Vrai ou faux ? Explique.\na) $100\\,\\%$ d'un gâteau, c'est tout le gâteau.\nb) $50\\,\\%$ de $30$ élèves, ce sont $50$ élèves.\nc) $10\\,\\% = \\dfrac{1}{10}$.\nd) $60\\,\\% = 0{,}6$.",
          correction:
            "a) Vrai. $100\\,\\%$, c'est $100$ sur $100$ : le tout.\nb) Faux. $50\\,\\%$, c'est la moitié : $30 \\div 2 = 15$ élèves. On ne peut pas avoir $50$ élèves dans un groupe de $30$ !\nc) Vrai. $10\\,\\% = \\dfrac{10}{100}$, et $\\dfrac{10}{100} = \\dfrac{1}{10}$ : un dixième.\nd) Vrai. $60\\,\\% = \\dfrac{60}{100} = 0{,}6$.\n⛔ Le piège du b) : prendre le pourcentage pour un nombre d'élèves. Un pourcentage est une PART du groupe.\nRéponse : a) vrai ; b) faux, ce sont $15$ élèves ; c) vrai ; d) vrai.",
          schema: ecranSeulement(grille(10, 10, [{ n: 10, nom: "10 %" }])),
          micros: ["pourcentage_comprendre", "pourcentage_fraction", "pourcentage_decimal"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je me demande toujours : « tant pour cent de QUOI ? »",
      rappel: [
        "Pour écrire une part en pourcentage, j'écris la fraction, puis je la mets sur $100$.",
        "Pour calculer un pourcentage d'un nombre : un repère ($50\\,\\%$, $25\\,\\%$, $10\\,\\%$), ou je passe par $10\\,\\%$.",
        "Tous les pourcentages d'un même tout font $100\\,\\%$.",
      ],
      exercices: [
        {
          enonce: "Au jardin, on sème $50$ graines de tournesol. $42$ graines germent.\na) Écris la part des graines qui germent en fraction.\nb) Écris-la sur $100$. Quel est le pourcentage de graines qui germent ?\nc) Quel pourcentage ne germe pas ?",
          correction:
            "a) $42$ graines sur $50$ : $\\dfrac{42}{50}$.\nb) $50 \\times 2 = 100$ : je multiplie le haut et le bas par $2$. $\\dfrac{42}{50} = \\dfrac{84}{100}$, soit $84\\,\\%$.\nc) $100 - 84 = 16$ : $16\\,\\%$ ne germent pas. C'est $8$ graines sur $50$.\n⛔ Le piège : dire « $42\\,\\%$ ». $42$ est un nombre de graines sur $50$, pas sur $100$.\nRéponse : a) $\\dfrac{42}{50}$ ; b) $84\\,\\%$ ; c) $16\\,\\%$.",
          schema: pourcents("50", "graines", [
            [16, "8"],
            [84, "42"],
          ]),
          micros: ["pourcentage_fraction", "pourcentage_defi"],
        },
        {
          enonce: "Un sac à dos coûte $40$ €. Il est soldé à $-25\\,\\%$.\na) Combien d'euros de réduction ?\nb) Quel est le nouveau prix ?\nc) Un autre sac à $40$ € est soldé à $-10\\,\\%$. Quel est son nouveau prix ?",
          correction:
            "a) $25\\,\\%$, c'est le quart : $40 \\div 4 = 10$ € de réduction.\nb) $40 - 10 = 30$ €.\nc) $10\\,\\%$ de $40$ : $40 \\div 10 = 4$ €. Nouveau prix : $40 - 4 = 36$ €.\n⭐ Sur la barre : on paie les $75\\,\\%$ qui restent, soit $30$ €.\n⛔ Le piège : retirer $25$ € au prix. On retire $25\\,\\%$ du prix, c'est-à-dire $10$ €.\nRéponse : a) $10$ € ; b) $30$ € ; c) $36$ €.",
          schema: pourcents("40", "euros", [
            [25, "10"],
            [75, "30"],
          ]),
          micros: ["pourcentage_calcul_simple", "pourcentage_defi"],
        },
        {
          enonce: "Quel est le plus grand ?\na) $50\\,\\%$ de $30$, ou $10\\,\\%$ de $200$ ?\nb) $25\\,\\%$ de $80$, ou $75\\,\\%$ de $24$ ?",
          correction:
            "Je calcule les deux, puis je compare.\na) $50\\,\\%$ de $30$ : la moitié, $15$. $10\\,\\%$ de $200$ : le dixième, $20$.\nOr $20 > 15$ : c'est $10\\,\\%$ de $200$.\nb) $25\\,\\%$ de $80$ : le quart, $20$. $75\\,\\%$ de $24$ : $24 \\div 4 = 6$, puis $3 \\times 6 = 18$.\nOr $20 > 18$ : c'est $25\\,\\%$ de $80$.\n⛔ Le piège : choisir le plus grand pourcentage sans calculer. Un grand pourcentage d'un PETIT nombre peut donner peu.\nRéponse : a) $10\\,\\%$ de $200$ ; b) $25\\,\\%$ de $80$.",
          schema: table(["calcul", "idée", "résultat"], [
            ["50 % de 30", "moitié", "15"],
            ["10 % de 200", "dixième", "20"],
            ["25 % de 80", "quart", "20"],
            ["75 % de 24", "3 quarts", "18"],
          ]),
          micros: ["pourcentage_defi", "pourcentage_calcul_simple"],
        },
        {
          enonce: "Écris chaque nombre en pourcentage, en fraction sur $100$ et en décimal.\na) $40\\,\\%$\nb) $\\dfrac{15}{100}$\nc) $0{,}2$\nd) $\\dfrac{3}{25}$",
          correction:
            "a) $40\\,\\% = \\dfrac{40}{100} = 0{,}4$.\nb) $\\dfrac{15}{100} = 15\\,\\% = 0{,}15$.\nc) $0{,}2$, ce sont $2$ dixièmes, soit $20$ centièmes : $0{,}2 = \\dfrac{20}{100} = 20\\,\\%$.\nd) $25 \\times 4 = 100$ : $\\dfrac{3}{25} = \\dfrac{12}{100} = 12\\,\\% = 0{,}12$.\n⛔ Le piège du c) : écrire $0{,}2 = 2\\,\\%$. Mais $2\\,\\%$, c'est $0{,}02$.\nRéponse : a) $\\dfrac{40}{100}$ et $0{,}4$ ; b) $15\\,\\%$ et $0{,}15$ ; c) $\\dfrac{20}{100}$ et $20\\,\\%$ ; d) $\\dfrac{12}{100}$, $12\\,\\%$ et $0{,}12$.",
          schema: ecranSeulement(
            table(["en %", "sur 100", "décimal"], [
              ["40 %", "40/100", "0,4"],
              ["15 %", "15/100", "0,15"],
              ["20 %", "20/100", "0,2"],
              ["12 %", "12/100", "0,12"],
            ]),
          ),
          micros: ["pourcentage_fraction", "pourcentage_decimal"],
        },
        {
          enonce: "Une bibliothèque a $300$ livres. $40\\,\\%$ sont des romans. $35\\,\\%$ sont des BD. Les autres sont des documentaires.\na) Quel pourcentage des livres sont des documentaires ?\nb) Combien y a-t-il de romans ? De BD ? De documentaires ?",
          correction:
            "a) Le tout fait $100\\,\\%$. $100 - 40 - 35 = 25$ : $25\\,\\%$ de documentaires.\nb) $1\\,\\%$ de $300$ livres : $300 \\div 100 = 3$ livres.\nRomans : $40 \\times 3 = 120$. BD : $35 \\times 3 = 105$. Documentaires : $25 \\times 3 = 75$.\n⭐ Contrôle : $120 + 105 + 75 = 300$ livres.\n⛔ Le piège : répondre « $40$ romans ». Il y a $300$ livres, pas $100$ : $40\\,\\%$ font plus que $40$.\nRéponse : a) $25\\,\\%$ ; b) $120$ romans, $105$ BD et $75$ documentaires.",
          schema: camembert([
            { nom: "romans", valeur: 40 },
            { nom: "BD", valeur: 35 },
            { nom: "docs", valeur: 25 },
          ]),
          micros: ["pourcentage_lire", "pourcentage_calcul_simple", "pourcentage_defi"],
        },
        {
          enonce: "Un jeu se télécharge. Il pèse $800$ Mo en tout.\na) La barre indique $25\\,\\%$. Combien de Mo sont téléchargés ?\nb) Plus tard, elle indique $60\\,\\%$. Combien de Mo sont téléchargés ?\nc) Combien de Mo reste-t-il alors ?",
          correction:
            "a) $25\\,\\%$, c'est le quart : $800 \\div 4 = 200$ Mo.\nb) $10\\,\\%$ de $800$, c'est $80$ Mo. Donc $60\\,\\%$, c'est $6 \\times 80 = 480$ Mo.\nc) $800 - 480 = 320$ Mo. C'est aussi $40\\,\\%$ de $800$.\n⛔ Le piège : croire que $60\\,\\%$ veut dire $60$ Mo. Le pourcentage parle des $800$ Mo.\nRéponse : a) $200$ Mo ; b) $480$ Mo ; c) $320$ Mo.",
          schema: pourcents("800", "Mo", [
            [25, "200"],
            [60, "480"],
          ]),
          micros: ["pourcentage_calcul_simple", "pourcentage_comprendre"],
        },
        {
          enonce: "Trois élèves se trompent. Explique l'erreur, puis corrige.\na) Hugo : « $20\\,\\%$ de $50$, c'est $20$. »\nb) Jade : « $\\dfrac{2}{5} = 25\\,\\%$. »\nc) Malo : « $0{,}7 = 7\\,\\%$. »",
          correction:
            "a) Hugo recopie le pourcentage. $10\\,\\%$ de $50$, c'est $5$. Donc $20\\,\\%$, c'est $2 \\times 5 = 10$.\nb) Jade colle les deux chiffres. Il faut $100$ en bas : $\\dfrac{2}{5} = \\dfrac{40}{100} = 40\\,\\%$.\nc) Malo se trompe de rang. $0{,}7$, ce sont $7$ dixièmes, soit $70$ centièmes : $0{,}7 = 70\\,\\%$.\n⛔ Le piège commun : oublier que « pour cent » veut dire « sur $100$ ».\nRéponse : a) $10$ ; b) $40\\,\\%$ ; c) $70\\,\\%$.",
          schema: ecranSeulement(grille(10, 10, [{ n: 70, nom: "70 %" }])),
          micros: ["pourcentage_comprendre", "pourcentage_fraction", "pourcentage_decimal"],
        },
        {
          enonce: "Un réservoir d'eau de pluie contient $60$ L quand il est plein. Il est rempli à $35\\,\\%$.\na) Calcule $10\\,\\%$ de $60$ L, puis $5\\,\\%$ de $60$ L.\nb) Combien de litres contient le réservoir ?\nc) Combien de litres faut-il pour le remplir ?",
          correction:
            "a) $10\\,\\%$ de $60$ : $60 \\div 10 = 6$ L. Et $5\\,\\%$, c'est la moitié : $3$ L.\nb) $35\\,\\%$, c'est $10\\,\\% + 10\\,\\% + 10\\,\\% + 5\\,\\%$. Donc $6 + 6 + 6 + 3 = 21$ L.\nc) $60 - 21 = 39$ L.\n⭐ Contrôle : il manque $65\\,\\%$. Et $65\\,\\%$ de $60$, c'est $6 \\times 6 + 3 = 39$ L.\n⛔ Le piège : répondre $35$ L. Le réservoir contient $35\\,\\%$ de $60$ L, pas $35$ L.\nRéponse : a) $6$ L et $3$ L ; b) $21$ L ; c) $39$ L.",
          schema: pourcents("60", "litres", [
            [10, "6"],
            [35, "21"],
          ]),
          micros: ["pourcentage_calcul_simple", "pourcentage_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je calcule, puis je réponds par une phrase.",
      rappel: [
        "Un pourcentage compare une part au TOUT. Je me demande : « tant pour cent de quoi ? »",
        "Pour trouver un pourcentage, j'écris la part sur le tout, puis sur $100$.",
        "Je vérifie : toutes les parts d'un tout font $100\\,\\%$.",
      ],
      exercices: [
        {
          titre: "Le sondage de la classe",
          enonce: "Dans une classe de $20$ élèves, chacun choisit son sport préféré. $8$ élèves choisissent le football, $3$ la natation, $5$ le basket et $4$ le handball.\na) Écris la part de chaque sport en fraction, puis en pourcentage.\nb) Vérifie que le total fait $100\\,\\%$.\nc) Un collège de $500$ élèves a les mêmes pourcentages. Combien d'élèves préfèrent le football ?",
          correction:
            "a) $20 \\times 5 = 100$ : je multiplie le haut et le bas par $5$.\nFootball : $\\dfrac{8}{20} = \\dfrac{40}{100}$, soit $40\\,\\%$.\nNatation : $\\dfrac{3}{20} = \\dfrac{15}{100}$, soit $15\\,\\%$.\nBasket : $\\dfrac{5}{20} = \\dfrac{25}{100}$, soit $25\\,\\%$.\nHandball : $\\dfrac{4}{20} = \\dfrac{20}{100}$, soit $20\\,\\%$.\nb) $40 + 15 + 25 + 20 = 100$ : c'est bien $100\\,\\%$.\nc) $10\\,\\%$ de $500$, c'est $50$ élèves. Donc $40\\,\\%$, c'est $4 \\times 50 = 200$ élèves.\n⛔ Le piège du a) : dire « $8\\,\\%$ » pour le football. $8$ élèves sur $20$, ce n'est pas $8$ sur $100$.\nRéponse : a) $40\\,\\%$, $15\\,\\%$, $25\\,\\%$ et $20\\,\\%$ ; b) oui ; c) $200$ élèves.",
          schema: camembert([
            { nom: "foot", valeur: 40 },
            { nom: "natation", valeur: 15 },
            { nom: "basket", valeur: 25 },
            { nom: "hand", valeur: 20 },
          ]),
          micros: ["pourcentage_fraction", "pourcentage_lire", "pourcentage_defi"],
        },
        {
          titre: "La fête de fin d'année",
          enonce: "Le budget de la fête est de $150$ €. On dépense $40\\,\\%$ pour le repas, $30\\,\\%$ pour la décoration et $10\\,\\%$ pour la musique. Le reste est pour les boissons.\na) Quel pourcentage du budget va aux boissons ?\nb) Calcule chaque dépense en euros.\nc) Finalement, la musique coûte $6$ € de moins. Quel pourcentage du budget représente-t-elle alors ?",
          correction:
            "a) $100 - 40 - 30 - 10 = 20$ : $20\\,\\%$ pour les boissons.\nb) $10\\,\\%$ de $150$ €, c'est $15$ €.\nRepas : $4 \\times 15 = 60$ €. Décoration : $3 \\times 15 = 45$ €. Musique : $15$ €. Boissons : $2 \\times 15 = 30$ €.\n⭐ Contrôle : $60 + 45 + 15 + 30 = 150$ €.\nc) La musique coûte $15 - 6 = 9$ €. Sa part : $\\dfrac{9}{150}$.\nJe divise le haut et le bas par $3$ : $\\dfrac{3}{50}$. Puis je multiplie par $2$ : $\\dfrac{6}{100}$, soit $6\\,\\%$.\n⛔ Le piège du c) : retirer $6$ au pourcentage, et dire $4\\,\\%$. On a retiré $6$ EUROS, pas $6\\,\\%$.\nRéponse : a) $20\\,\\%$ ; b) $60$ €, $45$ €, $15$ € et $30$ € ; c) $6\\,\\%$.",
          schema: grille(10, 10, [
            { n: 40, nom: "repas" },
            { n: 30, nom: "déco" },
            { n: 10, nom: "musique" },
          ], "à boire"),
          micros: ["pourcentage_calcul_simple", "pourcentage_defi", "pourcentage_fraction"],
        },
        {
          titre: "Les deux bouteilles",
          enonce: "La bouteille A contient $50$ cL de boisson, dont $20\\,\\%$ de jus de fruit. La bouteille B contient $100$ cL de boisson, dont $12\\,\\%$ de jus de fruit.\na) Combien de cL de jus contient la bouteille A ?\nb) Combien de cL de jus contient la bouteille B ?\nc) Quelle bouteille contient le plus de jus ? Quelle boisson est la plus riche en jus ?",
          correction:
            "a) $10\\,\\%$ de $50$ cL, c'est $5$ cL. Donc $20\\,\\%$, c'est $2 \\times 5 = 10$ cL de jus.\nb) La bouteille B contient $100$ cL : $12\\,\\%$, ce sont $12$ cL de jus.\nc) $12 > 10$ : la bouteille B contient le plus de jus.\nMais la boisson A est la plus riche : $20\\,\\%$ de jus, contre $12\\,\\%$ pour B.\n⛔ Le piège : croire que le plus grand pourcentage donne toujours la plus grande quantité. Ça dépend aussi du TOUT : $50$ cL ou $100$ cL.\nRéponse : a) $10$ cL ; b) $12$ cL ; c) B contient le plus de jus ; A est la plus riche en jus.",
          schema: table(["", "A", "B"], [
            ["boisson", "50 cL", "100 cL"],
            ["part de jus", "20 %", "12 %"],
            ["jus", "10 cL", "12 cL"],
          ]),
          micros: ["pourcentage_defi", "pourcentage_calcul_simple", "pourcentage_lire"],
        },
        {
          titre: "Les deux magasins",
          enonce: "Un vélo coûte $200$ € dans deux magasins. Le magasin A fait $-30\\,\\%$. Le magasin B fait $-50$ €.\na) Quel est le prix dans le magasin A ?\nb) Quel est le prix dans le magasin B ?\nc) Où le vélo est-il le moins cher ?\nd) La remise de $50$ € du magasin B, c'est quel pourcentage de $200$ € ?",
          correction:
            "a) $10\\,\\%$ de $200$ €, c'est $20$ €. Donc $30\\,\\%$, c'est $3 \\times 20 = 60$ € de remise. Prix : $200 - 60 = 140$ €.\nb) $200 - 50 = 150$ €.\nc) $140 < 150$ : le magasin A est le moins cher.\nd) La part : $\\dfrac{50}{200}$. Je divise le haut et le bas par $2$ : $\\dfrac{25}{100}$, soit $25\\,\\%$.\n⛔ Le piège : croire que « $-50$ € » est la plus grosse remise, parce que $50 > 30$. Je compare des euros avec des euros : $60$ € contre $50$ €.\nRéponse : a) $140$ € ; b) $150$ € ; c) le magasin A ; d) $25\\,\\%$.",
          schema: table(["magasin", "remise", "prix payé"], [
            ["A : −30 %", "60 €", "140 €"],
            ["B : −50 €", "50 €", "150 €"],
          ]),
          micros: ["pourcentage_defi", "pourcentage_calcul_simple", "pourcentage_fraction"],
        },
      ],
    },
  ],
};
