// ─── Fiche d'exercices : les pourcentages (4e) — 20 exercices corrigés ─────────
//
// Écrite le 02/10/2026, au standard de la 4e (étalon : `maths-4e-proportionnalite.tsx`),
// le jour où Frédéric a coupé la notion du coach « Ratios et pourcentages » en
// deux : ici la notion `prop_pourcentages`, la feuille des ratios est à part
// (`prop_ratio`). Un dessin qui aide dans CHAQUE exercice, 13 imprimés, aides de
// dessin locales écrites EN CLAIR et relues par le script de recalcul.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank.ts`
// (pourcentages, calcul mental `genMental*`, défis) : prendre un pourcentage,
// écrire une part en pourcentage, retrouver le tout ; ⭐ le CALCUL MENTAL voulu
// par Frédéric — tout part de 10 % (diviser par 10 : j'enlève un zéro, ou je
// décale la virgule), 20 % et 30 % (le double, le triple), 5 % (la moitié),
// 100 % (le tout), 200 % (le double) ; le coefficient multiplicateur (1 + p/100,
// 1 − p/100, et le lire) ; l'évolution (nouvelle valeur, taux rapporté au
// DÉPART, retrouver le départ en divisant) ; les défis (+20 % puis −20 %, deux
// évolutions qui se MULTIPLIENT). Aucun ratio : c'est l'autre notion.
// ⛔ L'ancienne feuille commune `maths-4e-ratios-pourcentages.tsx` n'a servi que
// de réservoir (le WWF et le CO₂, réécrits) ; aucun de ses exercices n'est
// recopié (ni corps humain, céréales, Terre, LED, vélo électrique, bouquetins,
// cerises). Ni ceux de la fiche commune (25 % de 80, 100 € ±15 %), ni ceux de la
// feuille de 5e (forêt, tirs au but, jeu vidéo, plant de tomate, vélo, console,
// billet de train, oiseaux de l'étang, arbres de la ville, sortie), ni de la 3e
// (15 % de 240, tablette +20 %/−20 %, jean, abonnés).
//
// Les pièges nommés : diviser par 100 pour 10 % (1), 5 % pris pour un cinquième
// (2), AJOUTER 200 au lieu de doubler (3), lire 35 % comme 35 élèves (4), diviser
// le tout par la partie (5), prendre 20 % de la partie au lieu de remonter au
// tout (6), lire × 0,97 comme −97 % et × 2 comme +200 % (7), un coefficient
// 0,06 ou 0,6 pour −6 % (8), s'arrêter à la réduction (9), rapporter l'écart à
// l'arrivée et confondre ppm et % (10), enlever 20 % à l'arrivée pour remonter
// (11), additionner deux baisses (12), retirer 20 % du mauvais tout (13),
// diviser par 10 ce qui est déjà 10 % (14), additionner deux hausses (15),
// +30 % puis −30 % qui s'annuleraient (16), +73 % qui réparerait −73 % (17),
// 20 % + 25 % = 45 % (18), 10 % par an = 20 % en deux ans (19), « 50 % de
// quoi ? » (20).
//
// Les faits réels, et d'où ils viennent :
// - le CO₂ : environ 280 ppm avant l'ère industrielle (GIEC, AR6, groupe I,
//   2021) ; 421 ppm en moyenne annuelle 2023 à Mauna Loa (NOAA, Global
//   Monitoring Laboratory), arrondi à 420 ; le CO₂ est le premier contributeur
//   au réchauffement d'origine humaine (GIEC, AR6) — ex. 10 ;
// - le rapport Planète vivante 2024 du WWF (Living Planet Index, avec la ZSL) :
//   les populations de vertébrés sauvages suivies ont diminué en moyenne de 73 %
//   entre 1970 et 2020 — ex. 17. Les hérissons et les grenouilles sont des
//   populations IMAGINÉES pour le calcul, et l'énoncé le dit.
// Tout le reste est un MODÈLE à l'ordre de grandeur réel (collège, refuge,
// piste cyclable, cygnes, coureuse, raquette, salle d'escalade, chaussures,
// déchets d'une famille, oiseaux bagués, miel, musée, course solidaire, voiture
// d'occasion, chocolat), dit comme tel quand il ressemble à une mesure.
//
// ⛔ 02/10 (retouche) : aucun exemple de la fiche de cours `lib/fiches/maths-4e-pourcentages.tsx`
// n'est repris — ni sa batterie, ses tirs au basket, son sweat à 45 €, son club
// de handball, son potager, son ticket de bus à +25 %, ses 80 € du calcul
// mental, ni 100 → 120 → 96, ni 10 %, 20 %, 5 % de 70, ni la baisse de 35 %
// (× 0,65), ni l'arbre à 200 %, ni « des élèves = 30 % de la classe », ni 38 sur 50.
//
// ⭐ LES DESSINS :
//   · `dix` (NEUF) — TOUT PART DE 10 % : la quantité est une barre de dix cases
//     de 10 % ; les cases prises sont coloriées (une demi-case pour 5 %, une
//     seconde barre pour 200 %) ; « 100 % = … », « 10 % = … » et le résultat ;
//   · `fleche` (NEUF) — départ → « × coefficient » → arrivée, et, pour remonter
//     au départ, la flèche retour « ÷ coefficient » en pointillés ;
//   · `pourcents`, `evolution`, `camembert`, `table` — repris de la feuille de 5e.
// SVG de viewBox 280 (240 pour le camembert), police 14 au moins, sans `min-w` :
// rien ne défile à 375 px. 13 dessins imprimés ; ceux qui redisent le corrigé
// sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je divise par 10 »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-4e-prop-pourcentages.mjs`.
//
// Micro-compétences : prop_pourcentage (3, 4, 5, 6, 11, 13, 18, 20),
// prop_pourcentage_mental (1, 2, 3, 4, 6, 9, 14, 18, 19), prop_coeff_multiplicateur
// (7, 8, 9, 10, 11, 12, 13, 15, 17, 19, 20), prop_evolution (8, 10, 11, 15, 16,
// 17, 18, 19), prop_pourcentage_defi (12, 15, 16, 17, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

const COULEURS = ["#2563eb", "#ea580c", "#16a34a", "#7c3aed"];
const ENCRE = "#0f172a";
const ROUGE = "#dc2626";
const BLEU_FONCE = "#1d4ed8";
const ORANGE = "#ea580c";
/** « 1 200 » → 1200 ; « 8,80 » → 8.8. */
const nombre = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));
/** 1.05 → « 1,05 » (quatre décimales au plus, zéros inutiles retirés). */
const decimal = (x: number) => String(Number(x.toFixed(4))).replace(".", ",");

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * TOUT PART DE 10 % (neuf). La quantité entière (100 %) est une barre de dix
 * cases égales : chaque case vaut 10 %. `pris` cases sont coloriées : 3 pour
 * 30 %, 0,5 (une demi-case) pour 5 %, 20 (deux barres pleines) pour 200 %. La
 * première case est cerclée de bleu : c'est la brique « 10 % = … ».
 * ⚠️ Texte NU. ⚠️ Le script vérifie : dixième = total ÷ 10, résultat = pris ×
 * dixième, et que les textes tiennent dans le cadre.
 */
const dix = (total: string, dixieme: string, pris: number, resultat: string) => {
  const rangs = pris > 10 ? 2 : 1;
  const [x0, c, h, y0] = [20, 24, 28, 28];
  const yb = y0 + rangs * 36;
  const H = yb + 44;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg
        viewBox={`0 0 280 ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Une barre de dix cases de 10 %. 100 % valent ${total} ; 10 % valent ${dixieme} ; ${decimal(pris * 10)} % valent ${resultat}.`}
      >
        <text x={140} y={18} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
          {`100 % = ${total}`}
        </text>
        {Array.from({ length: rangs }, (_, r) => (
          <g key={r}>
            {Array.from({ length: 10 }, (_, k) => {
              const plein = Math.max(0, Math.min(1, pris - (r * 10 + k)));
              const [x, y] = [x0 + k * c, y0 + r * 36];
              return (
                <g key={k}>
                  <rect x={x} y={y} width={c} height={h} fill="#fff" stroke={ENCRE} strokeWidth={1.2} />
                  {plein > 0 && <rect x={x} y={y} width={c * plein} height={h} fill="#93c5fd" stroke={ENCRE} strokeWidth={1.2} />}
                </g>
              );
            })}
          </g>
        ))}
        <rect x={x0} y={y0} width={c} height={h} fill="none" stroke={BLEU_FONCE} strokeWidth={3} />
        <text x={x0} y={yb + 12} fontSize={14} fontWeight={700} fill={BLEU_FONCE}>
          {`10 % = ${dixieme}`}
        </text>
        <text x={140} y={yb + 34} textAnchor="middle" fontSize={15} fontWeight={800} fill={ROUGE}>
          {`${decimal(pris * 10)} % = ${resultat}`}
        </text>
      </svg>
    </div>
  );
};

/**
 * LA FLÈCHE DU COEFFICIENT (neuf). Deux cases, départ et arrivée, reliées par
 * la flèche « × coefficient ». Avec `retour`, la flèche du chemin inverse,
 * « ÷ coefficient », en pointillés orange : c'est elle qui remonte au départ.
 * ⚠️ Texte NU ; 9 signes au plus par case. Le script vérifie départ ×
 * coefficient = arrivée.
 */
const fleche = (depart: string, coef: string, arrivee: string, retour = false) => {
  const H = retour ? 112 : 76;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 280 ${H}`} className="block h-auto w-full" role="img" aria-label={`${depart}, multiplié par ${coef}, donne ${arrivee}.${retour ? ` Et ${arrivee}, divisé par ${coef}, redonne ${depart}.` : ""}`}>
        <rect x={4} y={28} width={92} height={36} rx={6} fill="#eff6ff" stroke={ENCRE} strokeWidth={1.5} />
        <text x={50} y={51} textAnchor="middle" fontSize={15} fontWeight={800} fill={ENCRE}>
          {depart}
        </text>
        <rect x={184} y={28} width={92} height={36} rx={6} fill="#f0fdf4" stroke={ENCRE} strokeWidth={1.5} />
        <text x={230} y={51} textAnchor="middle" fontSize={15} fontWeight={800} fill={ENCRE}>
          {arrivee}
        </text>
        <line x1={102} y1={46} x2={170} y2={46} stroke={BLEU_FONCE} strokeWidth={2.5} />
        <path d="M 178 46 L 168 40 L 168 52 Z" fill={BLEU_FONCE} />
        <text x={140} y={20} textAnchor="middle" fontSize={15} fontWeight={800} fill={BLEU_FONCE}>
          {`× ${coef}`}
        </text>
        {retour && (
          <g>
            <path d="M 230 64 V 82 H 50 V 74" fill="none" stroke={ORANGE} strokeWidth={2.5} strokeDasharray="5 4" />
            <path d="M 50 66 L 44 76 L 56 76 Z" fill={ORANGE} />
            <text x={140} y={102} textAnchor="middle" fontSize={15} fontWeight={800} fill={ORANGE}>
              {`÷ ${coef}`}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * LA BARRE DE 0 À 100 % (feuille de 5e). En haut les pourcentages, en bas les
 * quantités qui leur correspondent. `marques` : [pourcentage, valeur].
 * ⚠️ Le script vérifie : valeur = pourcentage × total ÷ 100, et aucune
 * étiquette ne touche sa voisine ni « 100 % ».
 */
const pourcents = (total: string, unite: string, marques: [number, string][]) => {
  const x0 = 14;
  const X = (p: number) => x0 + (252 * p) / 100;
  const cible = Math.max(...marques.map(([p]) => p));
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg
        viewBox="0 0 280 100"
        className="block h-auto w-full"
        role="img"
        aria-label={`Une barre de 0 à 100 %, où 100 % valent ${total} ${unite} : ${marques.map(([p, v]) => `${decimal(p)} % valent ${v}`).join(" ; ")}.`}
      >
        <rect x={x0} y={34} width={252} height={20} fill="#eff6ff" />
        <rect x={x0} y={34} width={(252 * cible) / 100} height={20} fill="#93c5fd" />
        <rect x={x0} y={34} width={252} height={20} fill="none" stroke={ENCRE} strokeWidth={1.5} />
        {marques.map(([p, v]) => (
          <g key={p}>
            <line x1={X(p)} x2={X(p)} y1={30} y2={58} stroke={BLEU_FONCE} strokeWidth={2} />
            <text x={X(p)} y={24} textAnchor="middle" fontSize={14} fontWeight={700} fill={BLEU_FONCE}>
              {`${decimal(p)} %`}
            </text>
            <text x={X(p)} y={74} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
              {v}
            </text>
          </g>
        ))}
        <text x={x0 + 252} y={24} textAnchor="end" fontSize={14} fontWeight={700} fill={BLEU_FONCE}>
          100 %
        </text>
        <text x={x0 + 252} y={74} textAnchor="end" fontSize={14} fontWeight={700} fill={ENCRE}>
          {total}
        </text>
        <text x={140} y={94} textAnchor="middle" fontSize={14} fill="#475569">
          {`en ${unite}`}
        </text>
      </svg>
    </div>
  );
};

/**
 * L'ÉVOLUTION, ÉTAPE PAR ÉTAPE (feuille de 5e). Une barre par ligne, longueur
 * proportionnelle à la valeur (la plus grande fait 144) ; la part AJOUTÉE est
 * en vert, la part RETIRÉE en pointillés rouges. Sous le dessin, les
 * coefficients, CALCULÉS sur `taux` : ils ne peuvent pas contredire le dessin.
 * ⚠️ Le script vérifie : chaque valeur est la précédente × (1 + taux ÷ 100), les
 * noms tiennent dans la colonne de 58 et les valeurs avant 278.
 */
const evolution = (unite: string, lignes: { nom: string; valeur: string; taux?: number }[]) => {
  const vals = lignes.map((l) => nombre(l.valeur));
  const k = 144 / Math.max(...vals);
  const x0 = 64;
  const H = 12 + lignes.length * 40 + 26;
  const coefs = lignes
    .slice(1)
    .map((l) => `× ${decimal(1 + (l.taux ?? 0) / 100)}`)
    .join(" puis ");
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg
        viewBox={`0 0 280 ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`${lignes.map((l) => `${l.nom} : ${l.valeur}${unite ? " " + unite : ""}`).join(", ")}. Coefficients : ${coefs}.`}
      >
        {lignes.map((l, i) => {
          const y = 10 + i * 40;
          const cur = vals[i] * k;
          const prec = i === 0 ? cur : vals[i - 1] * k;
          const base = Math.min(cur, prec);
          return (
            <g key={i}>
              <text x={58} y={y + 18} textAnchor="end" fontSize={14} fontWeight={700} fill={ENCRE}>
                {l.nom}
              </text>
              <rect x={x0} y={y} width={base} height={26} fill={COULEURS[0]} />
              {cur > prec && <rect x={x0 + prec} y={y} width={cur - prec} height={26} fill={COULEURS[2]} />}
              {cur < prec && <rect x={x0 + cur} y={y + 1} width={prec - cur} height={24} fill="#fee2e2" stroke={ROUGE} strokeWidth={1.5} strokeDasharray="4 3" />}
              <text x={214} y={y + 18} fontSize={14} fontWeight={700} fill={ENCRE}>
                {`${l.valeur}${unite ? " " + unite : ""}`}
              </text>
            </g>
          );
        })}
        <text x={140} y={H - 8} textAnchor="middle" fontSize={15} fontWeight={700} fill="#b91c1c">
          {coefs}
        </text>
      </svg>
    </div>
  );
};

/**
 * LE CAMEMBERT DES PARTS (feuille de 5e) : viewBox 240 et corps 15, le
 * pourcentage écrit DANS chaque secteur, le nom dans la légende.
 * ⚠️ Le script relit `{ nom, valeur }` : leur somme fait 100.
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
            <rect x={144} y={40 + i * 30} width={14} height={14} fill={COULEURS[i]} />
            <text x={162} y={52 + i * 30} fontSize={15} fontWeight={700} fill={ENCRE}>
              {p.nom}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). ⛔ Trois colonnes courtes au plus. */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

export const exercicesPourcentages4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "prop-pourcentages",
  titre: "Pourcentages : de tête, coefficient, évolutions",
  accroche:
    "Vingt exercices, du geste seul au problème : calculer de tête 10 %, 20 %, 30 %, 5 %, 100 % et 200 % en partant de 10 %, prendre un pourcentage, écrire une part en pourcentage, retrouver le tout, passer par le coefficient multiplicateur, calculer un taux d'évolution, enchaîner deux évolutions. Le CO₂ de l'air, le déclin des animaux sauvages, une course solidaire, une voiture qui perd de sa valeur, des promotions sur le chocolat. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et un dessin.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/prop-pourcentages", titre: "Pourcentages" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je commence par 10 %, et j'écris la réponse avec son unité.",
      rappel: [
        "$p\\,\\%$ d'une quantité, c'est $p$ parts sur $100$ : je multiplie la quantité par $\\dfrac{p}{100}$.",
        "Tout part de $10\\,\\%$ : je divise par $10$. J'enlève un zéro, ou je décale la virgule d'un rang. $20\\,\\%$ et $30\\,\\%$ : le double et le triple de $10\\,\\%$. $5\\,\\%$ : la moitié de $10\\,\\%$.",
        "$100\\,\\%$, c'est la quantité tout entière. $200\\,\\%$, c'est le double.",
        "Hausse de $p\\,\\%$ : je multiplie par $1 + \\dfrac{p}{100}$. Baisse de $p\\,\\%$ : par $1 - \\dfrac{p}{100}$.",
      ],
      exercices: [
        {
          enonce: "Calcule de tête $10\\,\\%$ de chaque nombre.\na) $10\\,\\%$ de $350$\nb) $10\\,\\%$ de $62$\nc) $10\\,\\%$ de $7{,}5$\nd) $10\\,\\%$ de $1\\,200$",
          correction:
            "$10\\,\\%$, c'est $10$ parts sur $100$, donc $1$ part sur $10$ : je divise par $10$.\na) $350$ finit par un zéro : j'enlève ce zéro. $350 \\div 10 = 35$.\nb) $62$ ne finit pas par un zéro : je décale la virgule d'un rang vers la gauche. $62 \\div 10 = 6{,}2$.\nc) Même geste : $7{,}5 \\div 10 = 0{,}75$.\nd) J'enlève un zéro : $1\\,200 \\div 10 = 120$.\n⭐ Contrôle : $10\\,\\%$ d'un nombre est toujours dix fois plus petit que lui.\n⛔ Le piège : diviser par $100$, et trouver $0{,}62$ au b). $10\\,\\%$, c'est diviser par $10$, pas par $100$.\nRéponse : a) $35$ ; b) $6{,}2$ ; c) $0{,}75$ ; d) $120$.",
          schema: dix("62", "6,2", 1, "6,2"),
          micros: ["prop_pourcentage_mental"],
        },
        {
          enonce: "Calcule de tête, en partant de $10\\,\\%$.\na) $20\\,\\%$ de $35$\nb) $30\\,\\%$ de $120$\nc) $5\\,\\%$ de $160$\nd) $5\\,\\%$ de $34$",
          correction:
            "Tout part de $10\\,\\%$ : je le calcule d'abord, puis je le double, je le triple ou je prends sa moitié.\na) $10\\,\\%$ de $35$ font $3{,}5$. $20\\,\\%$, c'est le double : $2 \\times 3{,}5 = 7$.\nb) $10\\,\\%$ de $120$ font $12$. $30\\,\\%$, c'est le triple : $3 \\times 12 = 36$.\nc) $10\\,\\%$ de $160$ font $16$. $5\\,\\%$, c'est la moitié : $16 \\div 2 = 8$.\nd) $10\\,\\%$ de $34$ font $3{,}4$. La moitié : $3{,}4 \\div 2 = 1{,}7$.\n⛔ Le piège du c) : croire que $5\\,\\%$, c'est un cinquième, et diviser $160$ par $5$. On trouverait $32$, c'est-à-dire $20\\,\\%$ !\nRéponse : a) $7$ ; b) $36$ ; c) $8$ ; d) $1{,}7$.",
          schema: dix("120", "12", 3, "36"),
          micros: ["prop_pourcentage_mental"],
        },
        {
          enonce: "En juin, un refuge de montagne a accueilli $65$ randonneurs. En juillet, il en accueille $200\\,\\%$ du nombre de juin.\na) Combien de randonneurs accueille-t-il en juillet ?\nb) Léo dit : « $200\\,\\%$ de $65$, c'est $65 + 200 = 265$. » Qu'en penses-tu ?\nc) En août, le refuge prévoit d'en accueillir $100\\,\\%$ du nombre de juillet. Combien de randonneurs cela fait-il ?",
          correction:
            "$100\\,\\%$, c'est la quantité tout entière. $200\\,\\%$, c'est deux fois la quantité : le double.\na) $2 \\times 65 = 130$ randonneurs.\nb) Léo se trompe : $200\\,\\%$ ne veut pas dire « ajouter $200$ ». C'est $200$ parts sur $100$, donc $2$ fois le nombre. Avec $265$ randonneurs, ce serait plus de $400\\,\\%$.\nc) $100\\,\\%$ de $130$, c'est $130$ lui-même : le refuge prévoit encore $130$ randonneurs.\n⭐ Avec la brique de $10\\,\\%$ : $10\\,\\%$ de $65$ font $6{,}5$, et $200\\,\\%$, ce sont $20$ fois $10\\,\\%$ : $20 \\times 6{,}5 = 130$.\n⛔ Le piège : AJOUTER le pourcentage au nombre, comme Léo. Un pourcentage se prend « de » quelque chose : je multiplie.\nRéponse : a) $130$ randonneurs ; b) Léo a tort ; c) $130$ randonneurs.",
          schema: dix("65", "6,5", 20, "130"),
          micros: ["prop_pourcentage_mental", "prop_pourcentage"],
        },
        {
          enonce: "Dans un collège de $640$ élèves, $35\\,\\%$ viennent à pied ou à vélo. Combien d'élèves cela fait-il ?",
          correction:
            "Je cherche $35\\,\\%$ de $640$ : je multiplie par $\\dfrac{35}{100}$, c'est-à-dire par $0{,}35$.\n$640 \\times 0{,}35 = 224$.\n⭐ De tête, tout part de $10\\,\\%$ : $10\\,\\%$ de $640$ font $64$, donc $30\\,\\%$ font $3 \\times 64 = 192$, et $5\\,\\%$ font $64 \\div 2 = 32$. En tout : $192 + 32 = 224$.\n⛔ Le piège : répondre « $35$ élèves ». $35\\,\\%$ n'est pas un nombre d'élèves : c'est $35$ élèves sur chaque centaine d'élèves.\nRéponse : $224$ élèves viennent à pied ou à vélo.",
          schema: pourcents("640", "élèves", [[10, "64"], [35, "224"]]),
          micros: ["prop_pourcentage", "prop_pourcentage_mental"],
        },
        {
          enonce: "Sur un trajet de $25$ km, une cycliste roule $9$ km sur une piste cyclable. Quel pourcentage du trajet est sur piste cyclable ?",
          correction:
            "La part du trajet sur piste, c'est la PARTIE divisée par le TOUT : $\\dfrac{9}{25}$.\nPour l'écrire sur $100$, je remarque que $25 \\times 4 = 100$ : je multiplie le haut et le bas par $4$.\n$\\dfrac{9}{25} = \\dfrac{36}{100}$.\n⭐ Avec la calculatrice : $9 \\div 25 = 0{,}36$, et $0{,}36 = 36\\,\\%$.\n⛔ Le piège : diviser dans l'autre sens, $25 \\div 9$. On trouverait plus de $1$, donc plus de $100\\,\\%$ : impossible pour une partie du trajet.\nRéponse : $36\\,\\%$ du trajet est sur piste cyclable.",
          schema: ecranSeulement(pourcents("25", "km", [[36, "9"]])),
          micros: ["prop_pourcentage"],
        },
        {
          enonce: "Sur un lac, des ornithologues comptent $18$ cygnes. Les cygnes représentent $20\\,\\%$ des oiseaux d'eau du lac (chiffres d'un modèle). Combien y a-t-il d'oiseaux d'eau sur le lac ?",
          correction:
            "Cette fois, je connais la PARTIE et son pourcentage ; je cherche le TOUT, les $100\\,\\%$.\nJe pars de ce que je connais : $20\\,\\%$ des oiseaux, ce sont $18$ cygnes.\n$10\\,\\%$, c'est la moitié de $20\\,\\%$ : $18 \\div 2 = 9$ oiseaux.\n$100\\,\\%$, c'est $10$ fois $10\\,\\%$ : $10 \\times 9 = 90$ oiseaux.\n⭐ Contrôle : $20\\,\\%$ de $90$, c'est $90 \\times 0{,}2 = 18$. Je retrouve les $18$ cygnes.\n⛔ Le piège : calculer $20\\,\\%$ de $18$, soit $3{,}6$ oiseaux. Ici, $18$ n'est pas le tout : c'est la partie.\nRéponse : il y a $90$ oiseaux d'eau sur le lac.",
          schema: dix("90", "9", 2, "18"),
          micros: ["prop_pourcentage", "prop_pourcentage_mental"],
        },
        {
          enonce: "Complète.\na) Une hausse de $12\\,\\%$ revient à multiplier par …\nb) Une baisse de $45\\,\\%$ revient à multiplier par …\nc) Multiplier par $1{,}6$, c'est une … de … $\\%$.\nd) Multiplier par $0{,}97$, c'est une … de … $\\%$.\ne) Multiplier par $2$, c'est une … de … $\\%$.",
          correction:
            "Le coefficient part toujours de $1$, c'est-à-dire de $100\\,\\%$ : la valeur de départ, que je garde.\na) $100\\,\\% + 12\\,\\% = 112\\,\\%$, donc $1 + 0{,}12 = 1{,}12$.\nb) $100\\,\\% - 45\\,\\% = 55\\,\\%$, donc $1 - 0{,}45 = 0{,}55$.\nc) $1{,}6 > 1$ : ça monte. $1{,}6 - 1 = 0{,}6$, c'est une hausse de $60\\,\\%$.\nd) $0{,}97 < 1$ : ça baisse. $1 - 0{,}97 = 0{,}03$, c'est une baisse de $3\\,\\%$.\ne) $2 - 1 = 1$, et $1 = 100\\,\\%$ : c'est une hausse de $100\\,\\%$. La valeur double.\n⛔ Le piège du d) : lire $\\times 0{,}97$ comme « une baisse de $97\\,\\%$ ». $0{,}97$, c'est ce qui RESTE : $97\\,\\%$. On n'a retiré que $3\\,\\%$.\n⛔ Le piège du e) : « $\\times 2$, c'est $+200\\,\\%$ ». Non : $+200\\,\\%$, c'est $\\times 3$.\nRéponse : a) $\\times 1{,}12$ ; b) $\\times 0{,}55$ ; c) une hausse de $60\\,\\%$ ; d) une baisse de $3\\,\\%$ ; e) une hausse de $100\\,\\%$.",
          schema: ecranSeulement(tableau(["Évolution", "+12 %", "−45 %", "+60 %", "−3 %", "+100 %"], ["Coefficient", "× 1,12", "× 0,55", "× 1,6", "× 0,97", "× 2"], true)),
          micros: ["prop_coeff_multiplicateur"],
        },
        {
          enonce: "Une coureuse fait $10$ km en $50$ minutes. Après trois mois d'entraînement, son temps baisse de $6\\,\\%$ (chiffres d'un modèle). Calcule son nouveau temps avec le coefficient multiplicateur.",
          correction:
            "Une baisse de $6\\,\\%$ : il reste $100\\,\\% - 6\\,\\% = 94\\,\\%$ du temps. Le coefficient est $1 - 0{,}06 = 0{,}94$.\n$50 \\times 0{,}94 = 47$.\n⭐ Contrôle par la baisse : $6\\,\\%$ de $50$ font $50 \\times 0{,}06 = 3$ minutes, et $50 - 3 = 47$ minutes.\n⛔ Le piège : écrire le coefficient $0{,}06$, ou $0{,}6$. $0{,}06$ donne seulement les minutes GAGNÉES ; $0{,}6$ ferait une baisse de $40\\,\\%$.\nRéponse : son nouveau temps est $47$ minutes.",
          schema: fleche("50 min", "0,94", "47 min"),
          micros: ["prop_coeff_multiplicateur", "prop_evolution"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. Je justifie chaque réponse par un calcul, et je contrôle à la fin.",
      rappel: [
        "Nouvelle valeur = valeur de départ × coefficient. Hausse : coefficient plus grand que $1$. Baisse : coefficient plus petit que $1$.",
        "Taux d'évolution : je calcule l'écart, puis je le divise par la valeur de DÉPART.",
        "Pour retrouver la valeur de départ, je fais le chemin inverse : je DIVISE par le coefficient.",
        "Deux évolutions à la suite : je MULTIPLIE les coefficients. Les pourcentages ne s'additionnent pas.",
      ],
      exercices: [
        {
          enonce: "Au rayon sport, une raquette de badminton coûte $64$ €. Elle est soldée à $-15\\,\\%$.\na) Calcule de tête $10\\,\\%$ de $64$ €, puis $5\\,\\%$.\nb) Déduis-en le montant de la réduction, puis le prix payé.\nc) Vérifie avec le coefficient multiplicateur.",
          correction:
            "a) $10\\,\\%$ de $64$ : pas de zéro au bout, je décale la virgule. $64 \\div 10 = 6{,}4$, soit $6{,}40$ €.\n$5\\,\\%$, c'est la moitié de $10\\,\\%$ : $6{,}4 \\div 2 = 3{,}2$, soit $3{,}20$ €.\nb) $15\\,\\% = 10\\,\\% + 5\\,\\%$ : la réduction vaut $6{,}40 + 3{,}20 = 9{,}60$ €.\nLe prix payé : $64 - 9{,}60 = 54{,}40$ €.\nc) Une baisse de $15\\,\\%$ : le coefficient est $1 - 0{,}15 = 0{,}85$. Et $64 \\times 0{,}85 = 54{,}4$. Les deux chemins donnent le même prix.\n⛔ Le piège : s'arrêter à $9{,}60$ €. C'est ce qu'on ÉCONOMISE, pas ce qu'on paie.\nRéponse : a) $6{,}40$ € et $3{,}20$ € ; b) $9{,}60$ € de réduction, et un prix de $54{,}40$ € ; c) $64 \\times 0{,}85 = 54{,}4$.",
          schema: ecranSeulement(evolution("€", [{ nom: "prix", valeur: "64" }, { nom: "payé", valeur: "54,40", taux: -15 }])),
          micros: ["prop_pourcentage_mental", "prop_coeff_multiplicateur"],
        },
        {
          enonce: "Avant l'ère industrielle, l'air contenait environ $280$ molécules de dioxyde de carbone (CO₂) pour un million de molécules : on dit $280$ ppm, « parties par million ». En 2023, on en mesure environ $420$ ppm.\na) De combien de ppm la teneur en CO₂ a-t-elle augmenté ?\nb) Calcule le taux d'évolution, en pourcentage.\nc) Par quel coefficient la teneur a-t-elle été multipliée ?\nd) Un camarade affirme : « le CO₂ a augmenté de $140\\,\\%$ ». Explique son erreur.",
          correction:
            "a) $420 - 280 = 140$ ppm de plus.\nb) Je rapporte cette hausse à la valeur de DÉPART : $\\dfrac{140}{280} = 0{,}5$, et $0{,}5 = 50\\,\\%$. C'est une hausse de $50\\,\\%$.\nc) $420 \\div 280 = 1{,}5$. Et $1{,}5 = 1 + 0{,}5$ : je retrouve la hausse de $50\\,\\%$.\nd) $140$ est l'ÉCART en ppm, pas un pourcentage. Une hausse de $140\\,\\%$, ce serait $\\times 2{,}4$, soit $280 \\times 2{,}4 = 672$ ppm.\n⛔ Le piège : diviser l'écart par la valeur d'ARRIVÉE, $\\dfrac{140}{420}$. Une évolution se rapporte toujours à la valeur de départ.\n⭐ Une toute petite part de l'air, mais un grand effet : le CO₂ est le premier responsable du réchauffement causé par les humains.\nRéponse : a) $140$ ppm ; b) une hausse de $50\\,\\%$ ; c) $\\times 1{,}5$ ; d) $140$ ppm de plus, c'est $+50\\,\\%$, pas $+140\\,\\%$.",
          schema: evolution("ppm", [{ nom: "avant", valeur: "280" }, { nom: "2023", valeur: "420", taux: 50 }]),
          micros: ["prop_evolution", "prop_coeff_multiplicateur"],
        },
        {
          enonce: "Après une hausse de $20\\,\\%$, l'abonnement mensuel d'une salle d'escalade coûte $30$ €. Quel était son prix avant la hausse ?",
          correction:
            "Une hausse de $20\\,\\%$, c'est $\\times 1{,}2$ : le prix d'avant, multiplié par $1{,}2$, donne $30$ €.\nPour remonter au prix de départ, je fais le chemin inverse : je DIVISE par le coefficient.\n$30 \\div 1{,}2 = 25$.\n⭐ Contrôle de tête : $10\\,\\%$ de $25$ font $2{,}50$ €, donc $20\\,\\%$ font $5$ €. Et $25 + 5 = 30$ €.\n⛔ Le piège : enlever $20\\,\\%$ à $30$ €, et trouver $30 \\times 0{,}8 = 24$ €. Les $20\\,\\%$ portent sur le prix d'AVANT, pas sur $30$ €.\nRéponse : l'abonnement coûtait $25$ € avant la hausse.",
          schema: fleche("25 €", "1,2", "30 €", true),
          micros: ["prop_evolution", "prop_coeff_multiplicateur", "prop_pourcentage"],
        },
        {
          enonce: "La même paire de chaussures de football coûte $70$ € dans deux magasins.\nMagasin A : $-30\\,\\%$.\nMagasin B : $-20\\,\\%$, puis encore $-10\\,\\%$ sur le prix déjà soldé.\na) Calcule le prix payé dans chaque magasin.\nb) Quel est le coefficient multiplicateur global du magasin B ? À quelle baisse correspond-il ?\nc) Quel magasin choisir ?",
          correction:
            "a) Magasin A : $\\times 0{,}7$. $70 \\times 0{,}7 = 49$ €.\nMagasin B : d'abord $\\times 0{,}8$, $70 \\times 0{,}8 = 56$ €. Puis la baisse de $10\\,\\%$ porte sur $56$ € : $56 \\times 0{,}9 = 50{,}4$, soit $50{,}40$ €.\nb) Deux évolutions à la suite : je MULTIPLIE les coefficients. $0{,}8 \\times 0{,}9 = 0{,}72$. Il reste $72\\,\\%$ du prix : c'est une baisse de $28\\,\\%$, pas de $30\\,\\%$.\n⭐ Contrôle : $70 \\times 0{,}72 = 50{,}4$.\nc) $49 < 50{,}40$ : je choisis le magasin A.\n⛔ Le piège : additionner les baisses, « $20 + 10 = 30$, c'est pareil ». La seconde baisse porte sur un prix déjà plus petit : elle retire moins d'euros.\nRéponse : a) $49$ € en A, $50{,}40$ € en B ; b) $\\times 0{,}72$, une baisse de $28\\,\\%$ ; c) le magasin A.",
          schema: ecranSeulement(evolution("€", [{ nom: "prix", valeur: "70" }, { nom: "soldé", valeur: "56", taux: -20 }, { nom: "puis", valeur: "50,40", taux: -10 }])),
          micros: ["prop_coeff_multiplicateur", "prop_pourcentage_defi"],
        },
        {
          enonce: "En un mois, une famille produit $50$ kg de déchets : $17$ kg vont au compost, $18$ kg au tri (verre, papier, emballages), et le reste aux ordures ménagères (chiffres d'un modèle).\na) Quelle masse va aux ordures ménagères ?\nb) Écris la part de chaque sorte de déchets en pourcentage.\nc) Le mois suivant, la famille réduit ses ordures ménagères de $20\\,\\%$. Quelle masse d'ordures lui reste-t-il ?",
          correction:
            "a) $50 - 17 - 18 = 15$ kg d'ordures ménagères.\nb) Pour chaque sorte, je divise la partie par le tout, $50$ kg, puis j'écris le résultat sur $100$. Comme $50 \\times 2 = 100$, je multiplie le haut et le bas par $2$.\nCompost : $\\dfrac{17}{50} = \\dfrac{34}{100}$, soit $34\\,\\%$.\nTri : $\\dfrac{18}{50} = \\dfrac{36}{100}$, soit $36\\,\\%$.\nOrdures : $\\dfrac{15}{50} = \\dfrac{30}{100}$, soit $30\\,\\%$.\n⭐ Contrôle : $34 + 36 + 30 = 100$.\nc) Une baisse de $20\\,\\%$ : $\\times 0{,}8$. $15 \\times 0{,}8 = 12$ kg.\n⛔ Le piège du c) : enlever $20\\,\\%$ des $50$ kg. La baisse porte sur les ordures seulement : $20\\,\\%$ de $15$ kg, soit $3$ kg.\nRéponse : a) $15$ kg ; b) $34\\,\\%$ au compost, $36\\,\\%$ au tri, $30\\,\\%$ aux ordures ; c) $12$ kg.",
          schema: camembert([{ nom: "compost", valeur: 34 }, { nom: "tri", valeur: 36 }, { nom: "ordures", valeur: 30 }]),
          micros: ["prop_pourcentage", "prop_coeff_multiplicateur"],
        },
        {
          enonce: "Dans une réserve naturelle, on a bagué des oiseaux cette année. $10\\,\\%$ d'entre eux sont des hirondelles : cela fait $46$ hirondelles.\nSans calculatrice :\na) combien font $30\\,\\%$ des oiseaux bagués ?\nb) combien font $5\\,\\%$ ?\nc) combien d'oiseaux a-t-on bagués en tout ?\nd) L'an prochain, la réserve veut baguer $200\\,\\%$ du nombre de cette année. Combien d'oiseaux cela fait-il ?",
          correction:
            "Je n'ai pas besoin du total pour commencer : $10\\,\\%$ me sert de brique, et je le connais, c'est $46$.\na) $30\\,\\%$, c'est $3$ fois $10\\,\\%$ : $3 \\times 46 = 138$ oiseaux.\nb) $5\\,\\%$, c'est la moitié de $10\\,\\%$ : $46 \\div 2 = 23$ oiseaux.\nc) $100\\,\\%$, c'est $10$ fois $10\\,\\%$ : $10 \\times 46 = 460$ oiseaux.\nd) $200\\,\\%$, c'est le double du tout : $2 \\times 460 = 920$ oiseaux.\n⭐ Contrôle : $10\\,\\%$ de $460$ font bien $46$, j'enlève le zéro.\n⛔ Le piège du c) : diviser $46$ par $10$, comme d'habitude. Ici, $46$ est déjà $10\\,\\%$ : pour remonter au tout, je MULTIPLIE par $10$.\nRéponse : a) $138$ ; b) $23$ ; c) $460$ oiseaux ; d) $920$ oiseaux.",
          schema: ecranSeulement(dix("460", "46", 3, "138")),
          micros: ["prop_pourcentage_mental"],
        },
        {
          enonce: "Chez un apiculteur, un kilo de miel coûte $20$ € en 2024. Son prix augmente de $5\\,\\%$ en 2025, puis encore de $5\\,\\%$ en 2026.\na) Calcule le prix en 2025, puis en 2026.\nb) Par quel coefficient le prix de 2024 a-t-il été multiplié en tout ?\nc) Nina dit : « En deux ans, le prix a augmenté de $10\\,\\%$. » A-t-elle raison ?",
          correction:
            "a) 2025 : $\\times 1{,}05$. $20 \\times 1{,}05 = 21$ €.\n2026 : la hausse porte sur le prix de 2025, $21$ € : $21 \\times 1{,}05 = 22{,}05$ €.\nb) Je multiplie les coefficients : $1{,}05 \\times 1{,}05 = 1{,}1025$.\n⭐ Contrôle : $20 \\times 1{,}1025 = 22{,}05$.\nc) Presque, mais non. Une hausse de $10\\,\\%$ donnerait $20 \\times 1{,}1 = 22$ €. Le vrai prix, $22{,}05$ €, est un peu plus haut : la hausse totale est de $10{,}25\\,\\%$.\nLes $5\\,\\%$ de 2026 portent aussi sur l'euro gagné en 2025 : $5\\,\\%$ de $1$ €, ce sont les $0{,}05$ € de plus.\n⛔ Le piège : additionner deux pourcentages. Les évolutions successives se MULTIPLIENT.\nRéponse : a) $21$ € en 2025, $22{,}05$ € en 2026 ; b) $\\times 1{,}1025$ ; c) non, c'est une hausse de $10{,}25\\,\\%$.",
          schema: evolution("€", [{ nom: "2024", valeur: "20" }, { nom: "2025", valeur: "21", taux: 5 }, { nom: "2026", valeur: "22,05", taux: 5 }]),
          micros: ["prop_evolution", "prop_coeff_multiplicateur", "prop_pourcentage_defi"],
        },
        {
          enonce: "Un musée a reçu $2\\,500$ visiteurs en juillet. En août, le nombre de visiteurs augmente de $30\\,\\%$. En septembre, il baisse de $30\\,\\%$ par rapport à août.\na) Combien de visiteurs en août ? En septembre ?\nb) Revient-on au nombre de juillet ? Explique.\nc) Par quel coefficient le nombre de juillet a-t-il été multiplié en tout ? Quelle évolution cela fait-il ?",
          correction:
            "a) Août : $\\times 1{,}3$. $2\\,500 \\times 1{,}3 = 3\\,250$ visiteurs.\nSeptembre : $\\times 0{,}7$, sur le nombre d'AOÛT. $3\\,250 \\times 0{,}7 = 2\\,275$ visiteurs.\nb) Non : $2\\,275 < 2\\,500$. La hausse vaut $30\\,\\%$ de $2\\,500$, soit $750$ visiteurs. La baisse vaut $30\\,\\%$ de $3\\,250$, soit $975$ visiteurs. On retire plus qu'on n'a ajouté.\nc) $1{,}3 \\times 0{,}7 = 0{,}91$. Il reste $91\\,\\%$ : c'est une baisse de $9\\,\\%$.\n⭐ Contrôle : $2\\,500 \\times 0{,}91 = 2\\,275$.\n⛔ Le piège : croire que $+30\\,\\%$ et $-30\\,\\%$ s'annulent. Les deux $30\\,\\%$ ne portent pas sur le même nombre.\nRéponse : a) $3\\,250$ en août, $2\\,275$ en septembre ; b) non ; c) $\\times 0{,}91$, une baisse de $9\\,\\%$.",
          schema: evolution("", [{ nom: "juil.", valeur: "2 500" }, { nom: "août", valeur: "3 250", taux: 30 }, { nom: "sept.", valeur: "2 275", taux: -30 }]),
          micros: ["prop_pourcentage_defi", "prop_evolution"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je repère le tout, je transforme chaque évolution en coefficient, puis je conclus par une phrase.",
      rappel: [
        "Pour cent de QUOI ? Un pourcentage porte toujours sur une quantité précise : je repère ce tout avant de calculer.",
        "Chaque évolution devient une multiplication par un coefficient. Pour revenir en arrière, je divise par ce coefficient.",
        "Je contrôle : ma réponse est-elle plausible ? Une partie ne dépasse pas $100\\,\\%$ du tout.",
      ],
      exercices: [
        {
          titre: "Le déclin des animaux sauvages",
          enonce:
            "Selon le rapport Planète vivante du WWF (2024), les populations d'animaux sauvages suivies par les scientifiques ont diminué en moyenne de $73\\,\\%$ entre 1970 et 2020.\na) Par quel coefficient une population qui suit cette moyenne a-t-elle été multipliée ?\nb) Une population imaginaire de $20\\,000$ hérissons en 1970 suit cette moyenne. Combien en reste-t-il en 2020 ?\nc) Une autre population, imaginaire elle aussi, compte $540$ grenouilles en 2020, après la même baisse. Combien en comptait-elle en 1970 ?\nd) À partir de 2020, la population de hérissons augmente de $73\\,\\%$. Retrouve-t-elle son niveau de 1970 ?",
          correction:
            "a) Diminuer de $73\\,\\%$, c'est garder $100\\,\\% - 73\\,\\% = 27\\,\\%$. Le coefficient est $1 - 0{,}73 = 0{,}27$.\nb) $20\\,000 \\times 0{,}27 = 5\\,400$ hérissons en 2020.\nc) Cette fois, je connais l'ARRIVÉE : je fais le chemin inverse, je divise par le coefficient. $540 \\div 0{,}27 = 2\\,000$ grenouilles en 1970.\n⭐ Contrôle : $2\\,000 \\times 0{,}27 = 540$.\nd) La hausse porte sur $5\\,400$, pas sur $20\\,000$ : $5\\,400 \\times 1{,}73 = 9\\,342$ hérissons. Même pas la moitié de $20\\,000$.\nPour revenir à $20\\,000$, il faudrait multiplier $5\\,400$ par environ $3{,}7$, soit une hausse d'environ $270\\,\\%$.\n⛔ Le piège : croire que $+73\\,\\%$ répare $-73\\,\\%$. $73\\,\\%$ de $20\\,000$ font $14\\,600$, mais $73\\,\\%$ de $5\\,400$ ne font que $3\\,942$.\n⭐ C'est pour cela qu'une espèce qui a beaucoup perdu remonte si lentement.\nRéponse : a) $\\times 0{,}27$ ; b) $5\\,400$ hérissons ; c) $2\\,000$ grenouilles ; d) non, $9\\,342$ hérissons seulement.",
          schema: evolution("", [{ nom: "1970", valeur: "20 000" }, { nom: "2020", valeur: "5 400", taux: -73 }, { nom: "puis", valeur: "9 342", taux: 73 }]),
          micros: ["prop_evolution", "prop_coeff_multiplicateur", "prop_pourcentage_defi"],
        },
        {
          titre: "La course solidaire",
          enonce:
            "Pour une course solidaire, $250$ coureurs paient chacun $12$ € d'inscription. L'organisation garde $30\\,\\%$ de l'argent pour les frais (dossards, ravitaillement) ; le reste est donné à une association.\na) Combien d'argent les inscriptions rapportent-elles ?\nb) Calcule de tête la part des frais, en partant de $10\\,\\%$.\nc) Quelle somme est donnée à l'association ? Quel pourcentage de l'argent cela représente-t-il ?\nd) L'an prochain, il y aura $20\\,\\%$ de coureurs en plus, et l'inscription passera à $15$ €. De quel pourcentage l'argent des inscriptions va-t-il augmenter ?",
          correction:
            "a) $250 \\times 12 = 3\\,000$ €.\nb) $10\\,\\%$ de $3\\,000$ : j'enlève un zéro, $300$ €. $30\\,\\%$, c'est le triple : $3 \\times 300 = 900$ € de frais.\nc) $3\\,000 - 900 = 2\\,100$ € pour l'association. C'est $100\\,\\% - 30\\,\\% = 70\\,\\%$ de l'argent.\n⭐ Contrôle : $10\\,\\%$ font $300$ €, donc $70\\,\\%$ font $7 \\times 300 = 2\\,100$ €.\nd) Les coureurs : $250 \\times 1{,}2 = 300$. L'argent : $300 \\times 15 = 4\\,500$ €.\nJe compare au départ : $4\\,500 \\div 3\\,000 = 1{,}5$, et $1{,}5 = 1 + 0{,}5$ : une hausse de $50\\,\\%$.\n⭐ Par les coefficients : l'inscription passe de $12$ à $15$ €, soit $15 \\div 12 = 1{,}25$, une hausse de $25\\,\\%$. Et $1{,}2 \\times 1{,}25 = 1{,}5$.\n⛔ Le piège du d) : additionner, « $20\\,\\% + 25\\,\\% = 45\\,\\%$ ». Deux hausses qui se combinent se MULTIPLIENT : c'est $+50\\,\\%$.\nRéponse : a) $3\\,000$ € ; b) $900$ € ; c) $2\\,100$ €, soit $70\\,\\%$ ; d) une hausse de $50\\,\\%$.",
          schema: ecranSeulement(pourcents("3 000", "euros", [[10, "300"], [30, "900"]])),
          micros: ["prop_pourcentage", "prop_pourcentage_mental", "prop_evolution", "prop_pourcentage_defi"],
        },
        {
          titre: "La voiture d'occasion",
          enonce:
            "Une famille achète une voiture d'occasion à $12\\,000$ €. Chaque année, sa valeur baisse de $10\\,\\%$ (chiffres d'un modèle).\na) Que vaut la voiture après $1$ an ? Après $2$ ans ? Après $3$ ans ?\nb) Après $2$ ans, de quel pourcentage sa valeur a-t-elle baissé en tout ? Est-ce $20\\,\\%$ ?\nc) La famille veut la revendre avant qu'elle vaille moins de $75\\,\\%$ de son prix d'achat. Est-ce déjà trop tard après $3$ ans ?",
          correction:
            "a) Une baisse de $10\\,\\%$ : $\\times 0{,}9$ chaque année. De tête aussi : j'enlève $10\\,\\%$, un dixième.\nAprès $1$ an : $12\\,000 \\times 0{,}9 = 10\\,800$ €.\nAprès $2$ ans : $10\\,800 \\times 0{,}9 = 9\\,720$ €.\nAprès $3$ ans : $9\\,720 \\times 0{,}9 = 8\\,748$ €.\nb) Sur deux ans : $0{,}9 \\times 0{,}9 = 0{,}81$. Il reste $81\\,\\%$ : la valeur a baissé de $19\\,\\%$, pas de $20\\,\\%$.\n⭐ Contrôle : $12\\,000 \\times 0{,}81 = 9\\,720$.\nc) $75\\,\\%$ de $12\\,000$ : ce sont les trois quarts, $12\\,000 \\div 4 \\times 3 = 9\\,000$ €. Après $3$ ans, $8\\,748 < 9\\,000$ : oui, c'est trop tard. Après $2$ ans, $9\\,720$ € : il était encore temps.\n⭐ En pourcentage : $\\dfrac{8\\,748}{12\\,000} = 0{,}729$, soit $72{,}9\\,\\%$ du prix d'achat.\n⛔ Le piège du b) : « $10\\,\\%$ par an, donc $20\\,\\%$ en deux ans ». La deuxième année, la voiture perd $10\\,\\%$ de $10\\,800$, soit $1\\,080$ €, et non $1\\,200$.\nRéponse : a) $10\\,800$ €, $9\\,720$ € et $8\\,748$ € ; b) une baisse de $19\\,\\%$, pas de $20\\,\\%$ ; c) oui, elle vaut moins de $9\\,000$ €.",
          schema: evolution("", [{ nom: "achat", valeur: "12 000" }, { nom: "1 an", valeur: "10 800", taux: -10 }, { nom: "2 ans", valeur: "9 720", taux: -10 }, { nom: "3 ans", valeur: "8 748", taux: -10 }]),
          micros: ["prop_coeff_multiplicateur", "prop_evolution", "prop_pourcentage_defi", "prop_pourcentage_mental"],
        },
        {
          titre: "Les promotions sur le chocolat",
          enonce:
            "Une tablette de chocolat de $100$ g coûte $2$ €. Trois magasins font une promotion.\nMagasin A : « $25\\,\\%$ de chocolat en plus, offert » : la tablette pèse $125$ g, toujours pour $2$ €.\nMagasin B : la tablette de $100$ g à $-20\\,\\%$.\nMagasin C : « la deuxième tablette à $-50\\,\\%$ ».\na) Dans chaque magasin, combien coûtent $100$ g de chocolat ?\nb) Les promotions A et B sont-elles aussi intéressantes l'une que l'autre ? Explique.\nc) Le magasin C fait-il baisser de $50\\,\\%$ le prix du chocolat ? De combien de pour cent baisse vraiment le prix des $100$ g ?",
          correction:
            "a) Magasin A : $125$ g coûtent $2$ €. $125$ g, c'est $1{,}25$ fois $100$ g, donc $100$ g coûtent $2 \\div 1{,}25 = 1{,}6$, soit $1{,}60$ €.\nMagasin B : $\\times 0{,}8$. $2 \\times 0{,}8 = 1{,}6$, soit $1{,}60$ €.\nMagasin C : la deuxième tablette coûte la moitié, $1$ €. Les deux tablettes, $200$ g, coûtent $2 + 1 = 3$ € : les $100$ g coûtent $3 \\div 2 = 1{,}5$, soit $1{,}50$ €.\nb) Oui : dans A et dans B, $100$ g coûtent $1{,}60$ €. Donner $25\\,\\%$ de chocolat en plus revient à baisser le prix des $100$ g de $20\\,\\%$, pas de $25\\,\\%$.\nc) Non. Le prix des $100$ g passe de $2$ € à $1{,}50$ € : $1{,}5 \\div 2 = 0{,}75$. Il reste $75\\,\\%$ : c'est une baisse de $25\\,\\%$.\nLa baisse de $50\\,\\%$ ne porte que sur UNE tablette sur deux.\n⛔ Le piège : lire le pourcentage de l'affiche sans se demander « $50\\,\\%$ de quoi ? ». Et pour en profiter, il faut acheter deux tablettes !\nRéponse : a) $1{,}60$ € en A, $1{,}60$ € en B, $1{,}50$ € en C ; b) oui, le même prix pour $100$ g ; c) non, c'est une baisse de $25\\,\\%$.",
          schema: ecranSeulement(
            table(["promotion", "prix des 100 g"], [
              ["A : +25 % offert", "1,60 €"],
              ["B : −20 %", "1,60 €"],
              ["C : 2e à −50 %", "1,50 €"],
            ]),
          ),
          micros: ["prop_pourcentage", "prop_coeff_multiplicateur", "prop_pourcentage_defi"],
        },
      ],
    },
  ],
};
