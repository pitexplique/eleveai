// ─── Fiche d'exercices : ratios, pourcentages et coefficient (5e) — 20 exercices ─
//
// Lot des feuilles de 5e (29/09/2026), sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-ratio-pourcentage.tsx` (et
// sur `maths-5e-pourcentages.tsx`, la fiche du calcul d'un pourcentage) et sur
// la banque `lib/tutor-v4/questionBank/5e/maths/proportionnalite.bank.ts`,
// notionId prop_ratio_pourcentage : ratio simple, pourcentage simple,
// coefficient multiplicateur simple, défis.
// ⛔ LIMITES DE LA 5e (celles de la banque) : des ratios à deux ou trois parts
// ENTIÈRES (sirop:eau, filles:garçons, simplifier 4:6), des pourcentages simples
// (10, 15, 20, 25, 30, 40, 50, 75 %), exprimer une part en pourcentage (15 sur
// 25), des coefficients simples (×1,2, ×0,85, ×1,05, ×0,5). UNE seule suite de
// deux évolutions, parce que la banque la pose aussi (« +20 % puis −20 %,
// revient-on au départ ? ») : l'exercice 15, calculé étape par étape, sans
// produit de coefficients. Pas de taux d'évolution calculé comme un quotient
// arrivée ÷ départ (4e) : l'exercice 18 b) passe par la réduction en euros,
// rapportée au prix de départ, comme « 15 élèves sur 25 » dans la banque.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni le sirop 2:3, ni les
// 4 filles et 6 garçons, ni 20 % de 50, ni 30 % des 200 élèves, ni 25 % de 80,
// ni les 10 % de 40 €, ni 100 € +20 %, ni ×0,85 pour −15 % donné tel quel, ni
// 3:1 sur 400 g, ni 6:9 ; ni ceux de la fiche des pourcentages (20 % de 45,
// 40 % de 25 élèves, 60 € ±25 %, 12 % de 500, jean à 60 €). Ni ceux de la
// feuille de 4e (basket, médailles, corps humain, céréales, vélo électrique,
// vinaigrette, randonneurs, LED, bouquetins, cerises, braquet, WWF, CO₂…).
//
// Les pièges nommés : simplifier en SOUSTRAYANT (1), ajouter au lieu de
// multiplier les parts (2), l'ORDRE du ratio (1, 2), diviser 10 % par 10 deux
// fois (3), lire 40 % comme 40 hectares (4), diviser le total par la partie (5),
// ×0,2 pour une hausse de 20 % (6), le montant de la réduction pris pour le prix
// (7, 11), ×0,15 au lieu de ×1,15 (8), partager en deux parce qu'il y a deux
// ingrédients (9), comparer des mélanges par l'ÉCART (10), rapporter une part à
// l'autre part au lieu du tout (12, 16), lire ×1,3 comme +3 % (13), ajouter 5 €
// pour +5 % (14), croire que +25 % puis −25 % s'annulent (15), une teinte jugée
// sur les litres au lieu de la PART de bleu (17), rapporter la réduction au prix
// soldé (18), lire « 35 % de platanes » comme 35 platanes (19), appliquer la
// hausse du car à toute la sortie (20).
//
// Faits réels : aucun. Tous les nombres (poules, bonbons, forêt, tirs au but,
// soldes, pâte sablée, oiseaux d'un étang, club, peinture, arbres d'une
// commune, sortie scolaire) sont des MODÈLES, à l'ordre de grandeur réel.
//
// ⭐ LES DESSINS, repris de la feuille de 4e (`maths-4e-ratios-pourcentages`) :
//   · `barre` — la barre des parts : coupée en parts égales, la part de chacun
//     colorée, sa valeur dessous, « 1 part = … » en bas ;
//   · `pourcents` — la barre de 0 à 100 %, et en face les quantités ;
//   · `evolution` — une barre par étape, à l'échelle, le coefficient dessous ;
//   · `camembert` — les parts d'un tout, en pourcentages.
// Plus `tableau` de figures.tsx (vertical sur téléphone) et `table` (plusieurs
// lignes, repris de l'étalon). SVG de viewBox 280 (240 pour le camembert),
// police 14 au moins, sans `min-w` : rien ne défile à 375 px. Le script vérifie
// que chaque nom et chaque valeur tiennent dans leur part.
// 14 dessins imprimés ; ceux qui redisent le corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je compte les parts »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-prop-ratio-pourcentage.mjs`.
//
// Micro-compétences : prop_rapport (1, 2, 9, 10, 12, 16, 17, 19, 20),
// prop_pourcentage (3, 4, 5, 11, 12, 16, 17, 18, 19, 20),
// prop_coeff_multiplicateur (6, 7, 8, 13, 14, 15, 18, 19, 20), prop_ratio_defi
// (10, 15, 16, 17, 18, 20). 4/4.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

const COULEURS = ["#2563eb", "#ea580c", "#16a34a", "#7c3aed"];
const ENCRE = "#0f172a";
/** « 1 200 » → 1200 ; « 8,80 » → 8.8. */
const nombre = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));
/** 1.05 → « 1,05 » (quatre décimales au plus, zéros inutiles retirés). */
const decimal = (x: number) => String(Number(x.toFixed(4))).replace(".", ",");

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins : l'un sous l'autre sur téléphone, côte à côte à partir de `sm`
 *  et sur papier. Une légende courte au-dessus de chacun. */
const deux = (a: ReactNode, b: ReactNode, legendes: [string, string]) => (
  <div className="grid grid-cols-1 min-w-0 gap-3 sm:grid-cols-2 print:grid-cols-2">
    {[a, b].map((d, i) => (
      <div key={i} className="min-w-0">
        <p className="mb-1 text-center text-sm font-bold text-slate-700">{legendes[i]}</p>
        {d}
      </div>
    ))}
  </div>
);

/**
 * LA BARRE DES PARTS (feuille de 4e). Une barre de 260 unités coupée en
 * `Σ parts` parts égales (pointillés blancs) ; chaque quantité a ses parts
 * colorées, son nom dedans, sa valeur dessous ; le total en haut, « 1 part = … »
 * en bas. ⚠️ Texte NU. ⚠️ Le script vérifie que chaque nom tient dans son
 * segment (8,8 par signe en corps 14 gras), et que valeur = parts × une part.
 */
const barre = (segments: { nom: string; parts: number; valeur: string }[], total: string, unePart: string) => {
  const somme = segments.reduce((s, x) => s + x.parts, 0);
  const x0 = 10;
  const u = 260 / somme;
  const debuts = segments.map((_, i) => segments.slice(0, i).reduce((s, x) => s + x.parts, 0));
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg
        viewBox="0 0 280 116"
        className="block h-auto w-full"
        role="img"
        aria-label={`Une barre de ${somme} parts égales, total ${total} : ${segments.map((s) => `${s.nom}, ${s.parts} parts, ${s.valeur}`).join(" ; ")}. Une part vaut ${unePart}.`}
      >
        <text x={140} y={15} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
          {`total : ${total}`}
        </text>
        <path d={`M ${x0} 28 V 22 H ${x0 + 260} V 28`} fill="none" stroke="#475569" strokeWidth={1.5} />
        {segments.map((s, i) => {
          const x = x0 + debuts[i] * u;
          const w = s.parts * u;
          return (
            <g key={i}>
              <rect x={x} y={30} width={w} height={34} fill={COULEURS[i]} />
              {Array.from({ length: s.parts - 1 }, (_, k) => (
                <line key={k} x1={x + (k + 1) * u} x2={x + (k + 1) * u} y1={30} y2={64} stroke="#fff" strokeWidth={1.5} strokeDasharray="3 2" />
              ))}
              <text x={x + w / 2} y={52} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">
                {s.nom}
              </text>
              <text x={x + w / 2} y={84} textAnchor="middle" fontSize={14} fontWeight={700} fill={COULEURS[i]}>
                {s.valeur}
              </text>
            </g>
          );
        })}
        {segments.slice(1).map((_, i) => (
          <line key={i} x1={x0 + debuts[i + 1] * u} x2={x0 + debuts[i + 1] * u} y1={30} y2={64} stroke={ENCRE} strokeWidth={2} />
        ))}
        <rect x={x0} y={30} width={260} height={34} fill="none" stroke={ENCRE} strokeWidth={1.5} />
        <text x={140} y={108} textAnchor="middle" fontSize={14} fill="#334155">
          {`1 part = ${unePart}`}
        </text>
      </svg>
    </div>
  );
};

/**
 * LA BARRE DE 0 À 100 % (feuille de 4e). En haut les pourcentages, en bas les
 * quantités qui leur correspondent ; la barre est coloriée jusqu'au plus grand
 * pourcentage marqué. `marques` : [pourcentage, valeur].
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
            <line x1={X(p)} x2={X(p)} y1={30} y2={58} stroke="#1d4ed8" strokeWidth={2} />
            <text x={X(p)} y={24} textAnchor="middle" fontSize={14} fontWeight={700} fill="#1d4ed8">
              {`${decimal(p)} %`}
            </text>
            <text x={X(p)} y={74} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
              {v}
            </text>
          </g>
        ))}
        <text x={x0 + 252} y={24} textAnchor="end" fontSize={14} fontWeight={700} fill="#1d4ed8">
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
 * L'ÉVOLUTION, ÉTAPE PAR ÉTAPE (feuille de 4e). Une barre par ligne, longueur
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
              {cur < prec && <rect x={x0 + cur} y={y + 1} width={prec - cur} height={24} fill="#fee2e2" stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4 3" />}
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
 * LE CAMEMBERT DES PARTS (feuille de 4e) : viewBox 240 et corps 15, le
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

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

export const exercicesPropRatioPourcentage5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "prop-ratio-pourcentage",
  titre: "Ratios, pourcentages et coefficient",
  accroche:
    "Vingt exercices, du geste seul au problème : écrire et simplifier un ratio, partager selon un ratio, prendre un pourcentage d'une quantité, écrire une part en pourcentage, passer d'une hausse ou d'une baisse au coefficient multiplicateur. Des bonbons, une forêt, des tirs au but, des soldes, une pâte sablée, les oiseaux d'un étang, un pot de peinture, les arbres d'une ville, le budget d'une sortie. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la barre des parts dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/prop-ratio-pourcentage", titre: "Ratios, pourcentages et coefficient" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : écrire un ratio, prendre un pourcentage ou trouver un coefficient. J'écris la réponse avec son unité.",
      rappel: [
        "Un ratio compare des parts : le ratio $2 : 5$ veut dire « $2$ parts pour $5$ parts ». Il se simplifie en DIVISANT les deux nombres par le même nombre.",
        "$p\\,\\%$ veut dire « $p$ sur $100$ ». Prendre $p\\,\\%$ d'un nombre, c'est le multiplier par $\\dfrac{p}{100}$. Cas faciles : $50\\,\\%$, la moitié ; $25\\,\\%$, le quart ; $10\\,\\%$, diviser par $10$.",
        "Hausse de $p\\,\\%$ : je multiplie par $1 + \\dfrac{p}{100}$. Baisse de $p\\,\\%$ : par $1 - \\dfrac{p}{100}$. Le $1$, c'est le prix de départ, que je garde.",
      ],
      exercices: [
        {
          enonce: "Dans une petite ferme, il y a $14$ poules et $6$ canards.\na) Écris le ratio poules : canards.\nb) Simplifie-le.\nc) Écris le ratio canards : poules.",
          correction:
            "a) J'écris les deux nombres dans l'ordre demandé, les poules d'abord : $14 : 6$.\nb) $14$ et $6$ se divisent tous les deux par $2$ : $14 \\div 2 = 7$ et $6 \\div 2 = 3$. Le ratio simplifié est $7 : 3$.\nc) L'ordre change, les nombres aussi : canards : poules $= 3 : 7$.\n⭐ Sur la barre : $10$ parts de $2$ oiseaux, $7$ parts de poules et $3$ parts de canards.\n⛔ Le piège : simplifier en SOUSTRAYANT. Retirer $4$ aux deux nombres donnerait $10 : 2$, soit $5$ poules pour $1$ canard : ce n'est plus la même ferme.\nRéponse : poules : canards $= 14 : 6 = 7 : 3$ ; canards : poules $= 3 : 7$.",
          schema: barre([{ nom: "poules", parts: 7, valeur: "14" }, { nom: "canards", parts: 3, valeur: "6" }], "20 oiseaux", "2 oiseaux"),
          micros: ["prop_rapport"],
        },
        {
          enonce: "Dans les sachets d'une confiserie, le ratio bonbons à la fraise : bonbons au citron est $2 : 5$.\na) Un sachet contient $6$ bonbons à la fraise. Combien contient-il de bonbons au citron ?\nb) Combien de bonbons contient-il en tout ?\nc) Un autre sachet contient $10$ bonbons au citron. Combien a-t-il de bonbons à la fraise ?",
          correction:
            "a) $2$ parts de fraise, c'est $6$ bonbons : une part vaut $6 \\div 2 = 3$ bonbons. Le citron compte $5$ parts : $5 \\times 3 = 15$ bonbons au citron.\nb) $6 + 15 = 21$ bonbons, soit $7$ parts de $3$.\nc) $5$ parts de citron, c'est $10$ bonbons : une part vaut $10 \\div 5 = 2$. La fraise compte $2$ parts : $2 \\times 2 = 4$ bonbons à la fraise.\n⛔ Le piège : AJOUTER au lieu de multiplier. « De $2$ à $6$, j'ajoute $4$ ; donc $5 + 4 = 9$ citrons » : faux. Un ratio se garde en multipliant les deux nombres par le même nombre.\nRéponse : a) $15$ bonbons au citron ; b) $21$ bonbons ; c) $4$ bonbons à la fraise.",
          schema: ecranSeulement(barre([{ nom: "fraise", parts: 2, valeur: "6" }, { nom: "citron", parts: 5, valeur: "15" }], "21 bonbons", "3 bonbons")),
          micros: ["prop_rapport"],
        },
        {
          enonce: "Calcule de tête.\na) $50\\,\\%$ de $36$\nb) $25\\,\\%$ de $120$\nc) $10\\,\\%$ de $45$\nd) $75\\,\\%$ de $20$",
          correction:
            "Je reconnais des pourcentages faciles.\na) $50\\,\\%$, c'est la moitié : $36 \\div 2 = 18$.\nb) $25\\,\\%$, c'est le quart : $120 \\div 4 = 30$.\nc) $10\\,\\%$, c'est diviser par $10$ : $45 \\div 10 = 4{,}5$.\nd) $75\\,\\%$, ce sont trois quarts : $20 \\div 4 = 5$, puis $3 \\times 5 = 15$.\n⛔ Le piège du c) : répondre $0{,}45$ en divisant deux fois par $10$. $10\\,\\%$, c'est UNE division par $10$.\nRéponse : a) $18$ ; b) $30$ ; c) $4{,}5$ ; d) $15$.",
          schema: ecranSeulement(
            table(["Calcul", "Idée", "Résultat"], [
              ["50 % de 36", "la moitié", "18"],
              ["25 % de 120", "le quart", "30"],
              ["10 % de 45", "÷ 10", "4,5"],
              ["75 % de 20", "3 quarts", "15"],
            ]),
          ),
          micros: ["prop_pourcentage"],
        },
        {
          enonce: "Une forêt de $350$ hectares est composée à $40\\,\\%$ de chênes. Quelle surface les chênes occupent-ils ?",
          correction:
            "Je cherche $40\\,\\%$ de $350$ : je multiplie par $\\dfrac{40}{100}$.\n$350 \\times 40 = 14\\,000$, puis $14\\,000 \\div 100 = 140$.\n⭐ Autre chemin : $10\\,\\%$ de $350$ font $35$, donc $40\\,\\%$ font $4 \\times 35 = 140$.\n⛔ Le piège : répondre « $40$ hectares ». $40\\,\\%$ n'est pas une surface, c'est une part : $40$ hectares sur chaque centaine d'hectares.\nRéponse : les chênes occupent $140$ hectares.",
          schema: pourcents("350", "hectares", [[10, "35"], [40, "140"]]),
          micros: ["prop_pourcentage"],
        },
        {
          enonce: "À l'entraînement de handball, Jade tire $20$ fois au but et marque $13$ buts. Quel est son pourcentage de réussite ?",
          correction:
            "Elle marque $13$ buts sur $20$ tirs : c'est la fraction $\\dfrac{13}{20}$.\nPour avoir un pourcentage, je veux « sur $100$ ». Or $20 \\times 5 = 100$ : je multiplie le haut et le bas par $5$.\n$\\dfrac{13}{20} = \\dfrac{13 \\times 5}{20 \\times 5} = \\dfrac{65}{100}$.\n⛔ Le piège : diviser dans l'autre sens, $20 \\div 13$. Une part d'un tout, c'est la PARTIE divisée par le TOTAL : les buts sur les tirs.\nRéponse : Jade réussit $65\\,\\%$ de ses tirs.",
          schema: pourcents("20", "tirs au but", [[65, "13"]]),
          micros: ["prop_pourcentage"],
        },
        {
          enonce: "Complète par le coefficient multiplicateur.\na) Une hausse de $10\\,\\%$ revient à multiplier par …\nb) Une baisse de $20\\,\\%$ revient à multiplier par …\nc) Une hausse de $25\\,\\%$ revient à multiplier par …\nd) Une baisse de $40\\,\\%$ revient à multiplier par …",
          correction:
            "Le coefficient part toujours de $1$ : c'est le prix de départ, que je garde.\na) Hausse : j'ajoute. $1 + 0{,}1 = 1{,}1$.\nb) Baisse : je retire. $1 - 0{,}2 = 0{,}8$.\nc) $1 + 0{,}25 = 1{,}25$.\nd) $1 - 0{,}4 = 0{,}6$.\n⛔ Le piège : écrire $0{,}1$ pour une hausse de $10\\,\\%$. Multiplier par $0{,}1$ donne seulement la HAUSSE ; pour le nouveau prix, il faut garder le prix de départ, donc partir de $1$.\n⭐ Contrôle : une hausse donne un coefficient plus grand que $1$, une baisse un coefficient plus petit que $1$.\nRéponse : a) $\\times 1{,}1$ ; b) $\\times 0{,}8$ ; c) $\\times 1{,}25$ ; d) $\\times 0{,}6$.",
          schema: ecranSeulement(tableau(["Évolution", "+10 %", "−20 %", "+25 %", "−40 %"], ["Coefficient", "× 1,1", "× 0,8", "× 1,25", "× 0,6"], true)),
          micros: ["prop_coeff_multiplicateur"],
        },
        {
          enonce: "Un jeu vidéo coûte $45$ €. Pendant les soldes, son prix baisse de $20\\,\\%$. Calcule son nouveau prix avec le coefficient multiplicateur.",
          correction:
            "Une baisse de $20\\,\\%$ : le coefficient est $1 - 0{,}2 = 0{,}8$.\n$45 \\times 0{,}8 = 36$.\n⭐ Contrôle par la réduction : $20\\,\\%$ de $45$ font $45 \\times 0{,}2 = 9$ €, et $45 - 9 = 36$ €.\n⛔ Le piège : répondre $9$ €. C'est le montant de la RÉDUCTION, pas le prix à payer.\nRéponse : le jeu coûte $36$ € pendant les soldes.",
          schema: ecranSeulement(evolution("€", [{ nom: "avant", valeur: "45" }, { nom: "soldé", valeur: "36", taux: -20 }])),
          micros: ["prop_coeff_multiplicateur"],
        },
        {
          enonce: "Un plant de tomate mesure $40$ cm. En une semaine, sa hauteur augmente de $15\\,\\%$. Quelle est sa nouvelle hauteur ?",
          correction:
            "Une hausse de $15\\,\\%$ : le coefficient est $1 + 0{,}15 = 1{,}15$.\n$40 \\times 1{,}15 = 46$.\n⭐ Autre chemin : $15\\,\\%$ de $40$ font $40 \\times 0{,}15 = 6$ cm de plus, et $40 + 6 = 46$ cm.\n⛔ Le piège : multiplier par $0{,}15$ et répondre $6$ cm. Le plant ne rapetisse pas : $6$ cm, c'est ce qu'il a GAGNÉ.\nRéponse : le plant mesure $46$ cm.",
          schema: ecranSeulement(evolution("cm", [{ nom: "avant", valeur: "40" }, { nom: "après", valeur: "46", taux: 15 }])),
          micros: ["prop_coeff_multiplicateur"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur une même situation. Je dessine les parts au brouillon avant de calculer.",
      rappel: [
        "Partager selon un ratio : j'additionne les parts, je divise la quantité par ce nombre de parts, puis je multiplie par la part de chacun.",
        "Pour écrire une part en pourcentage, je divise la PARTIE par le TOUT, puis je l'écris sur $100$.",
        "Un coefficient plus grand que $1$ fait monter, plus petit que $1$ fait baisser : $\\times 1{,}3$ veut dire $+30\\,\\%$ ; $\\times 0{,}7$ veut dire $-30\\,\\%$.",
      ],
      exercices: [
        {
          enonce: "Pour une pâte sablée, on mélange farine et beurre dans le ratio farine : beurre $= 3 : 2$ (une recette modèle). Lina veut $750$ g de pâte, farine et beurre compris.\na) En combien de parts égales la pâte est-elle partagée ?\nb) Combien pèse une part ?\nc) Quelle masse de farine et quelle masse de beurre lui faut-il ?",
          correction:
            "a) J'additionne les parts : $3 + 2 = 5$ parts.\nb) $750 \\div 5 = 150$ : une part pèse $150$ g.\nc) Farine : $3 \\times 150 = 450$ g. Beurre : $2 \\times 150 = 300$ g.\n⭐ Contrôle : $450 + 300 = 750$ g.\n⛔ Le piège : partager en deux parce qu'il y a deux ingrédients, $375$ g de chaque. Ce serait le ratio $1 : 1$, pas $3 : 2$.\nRéponse : $450$ g de farine et $300$ g de beurre.",
          schema: barre([{ nom: "farine", parts: 3, valeur: "450 g" }, { nom: "beurre", parts: 2, valeur: "300 g" }], "750 g", "150 g"),
          micros: ["prop_rapport"],
        },
        {
          enonce: "Deux verres de sirop de grenadine sont préparés avec des doses de même taille : le verre A avec $2$ doses de sirop et $8$ doses d'eau, le verre B avec $3$ doses de sirop et $9$ doses d'eau.\na) Écris le ratio sirop : eau de chaque verre, et simplifie-le.\nb) Lequel est le plus sucré ?\nc) Quel pourcentage du verre A est du sirop ? Du verre B ?",
          figure: deux(
            barre([{ nom: "sirop", parts: 2, valeur: "2" }, { nom: "eau", parts: 8, valeur: "8" }], "10 doses", "1 dose"),
            barre([{ nom: "sirop", parts: 3, valeur: "3" }, { nom: "eau", parts: 9, valeur: "9" }], "12 doses", "1 dose"),
            ["Verre A", "Verre B"],
          ),
          correction:
            "a) Verre A : $2 : 8$. Je divise par $2$ : $1 : 4$, une dose de sirop pour $4$ doses d'eau.\nVerre B : $3 : 9$. Je divise par $3$ : $1 : 3$, une dose de sirop pour $3$ doses d'eau.\nb) Pour une même dose de sirop, le verre B a moins d'eau : il est plus sucré.\nc) Verre A : $2$ doses de sirop sur $10$, soit $\\dfrac{2}{10} = \\dfrac{20}{100}$, c'est $20\\,\\%$.\nVerre B : $3$ doses sur $12$, soit $\\dfrac{3}{12} = \\dfrac{1}{4} = \\dfrac{25}{100}$, c'est $25\\,\\%$.\n⛔ Le piège : comparer par l'ÉCART. $8 - 2 = 6$ et $9 - 3 = 6$ : « même goût ». Faux : un ratio se compare en divisant, pas en soustrayant.\nRéponse : A est au ratio $1 : 4$, B au ratio $1 : 3$ ; le verre B est le plus sucré ; $20\\,\\%$ de sirop dans A, $25\\,\\%$ dans B.",
          micros: ["prop_rapport", "prop_ratio_defi"],
        },
        {
          enonce: "Un vélo coûte $240$ €. Pendant les soldes, il est affiché à $-15\\,\\%$.\na) Calcule le montant de la réduction.\nb) Calcule le prix payé.\nc) Vérifie avec le coefficient multiplicateur.",
          correction:
            "a) Je découpe $15\\,\\%$ en $10\\,\\% + 5\\,\\%$.\n$10\\,\\%$ de $240$ : $240 \\div 10 = 24$ €. $5\\,\\%$, c'est la moitié : $12$ €.\nLa réduction vaut $24 + 12 = 36$ €.\nb) $240 - 36 = 204$ €.\nc) Une baisse de $15\\,\\%$ : le coefficient est $1 - 0{,}15 = 0{,}85$. Et $240 \\times 0{,}85 = 204$ €.\n⛔ Le piège : s'arrêter à $36$ €. C'est ce qu'on ÉCONOMISE, pas ce qu'on paie.\nRéponse : $36$ € de réduction ; le vélo coûte $204$ €.",
          schema: evolution("€", [{ nom: "prix", valeur: "240" }, { nom: "soldé", valeur: "204", taux: -15 }]),
          micros: ["prop_pourcentage"],
        },
        {
          enonce: "Sur un étang, un groupe d'élèves compte $80$ oiseaux : $28$ hérons, $12$ cigognes, et des canards.\na) Combien y a-t-il de canards ?\nb) Écris la part de chaque espèce en pourcentage.\nc) Écris le ratio hérons : cigognes, et simplifie-le.",
          correction:
            "a) $80 - 28 - 12 = 40$ canards.\nb) Pour chaque espèce, j'écris la fraction sur $80$, puis je la ramène sur $100$.\nHérons : $\\dfrac{28}{80} = \\dfrac{7}{20} = \\dfrac{35}{100}$, soit $35\\,\\%$.\nCigognes : $\\dfrac{12}{80} = \\dfrac{3}{20} = \\dfrac{15}{100}$, soit $15\\,\\%$.\nCanards : $\\dfrac{40}{80} = \\dfrac{1}{2} = \\dfrac{50}{100}$, soit $50\\,\\%$.\n⭐ Contrôle : $35 + 15 + 50 = 100$. Les trois parts font tout l'étang.\nc) $28 : 12$. Les deux nombres se divisent par $4$ : $7 : 3$.\n⛔ Le piège du b) : rapporter les hérons aux cigognes, $\\dfrac{28}{12}$. Un pourcentage compare une part au TOUT, les $80$ oiseaux.\nRéponse : $40$ canards ; $35\\,\\%$ de hérons, $15\\,\\%$ de cigognes, $50\\,\\%$ de canards ; hérons : cigognes $= 7 : 3$.",
          schema: camembert([{ nom: "hérons", valeur: 35 }, { nom: "cigognes", valeur: 15 }, { nom: "canards", valeur: 50 }]),
          micros: ["prop_pourcentage", "prop_rapport"],
        },
        {
          enonce: "Pour chaque coefficient multiplicateur, dis s'il s'agit d'une hausse ou d'une baisse, et de combien de pour cent.\na) $\\times 1{,}3$\nb) $\\times 0{,}7$\nc) $\\times 1{,}05$\nd) $\\times 0{,}5$\ne) $\\times 2$",
          correction:
            "Je compare le coefficient à $1$ : plus grand, c'est une hausse ; plus petit, une baisse. L'écart avec $1$ donne le pourcentage.\na) $1{,}3 = 1 + 0{,}3$ : une hausse de $30\\,\\%$.\nb) $0{,}7 = 1 - 0{,}3$ : une baisse de $30\\,\\%$.\nc) $1{,}05 = 1 + 0{,}05$ : une hausse de $5\\,\\%$.\nd) $0{,}5 = 1 - 0{,}5$ : une baisse de $50\\,\\%$. C'est diviser par deux.\ne) $2 = 1 + 1$ : une hausse de $100\\,\\%$. C'est doubler.\n⛔ Le piège : lire $\\times 1{,}3$ comme « $+3\\,\\%$ ». $0{,}3$, ce sont $30$ centièmes : $30\\,\\%$. Une hausse de $3\\,\\%$ serait $\\times 1{,}03$.\nRéponse : a) $+30\\,\\%$ ; b) $-30\\,\\%$ ; c) $+5\\,\\%$ ; d) $-50\\,\\%$ ; e) $+100\\,\\%$.",
          schema: ecranSeulement(tableau(["Coefficient", "× 1,3", "× 0,7", "× 1,05", "× 0,5", "× 2"], ["Évolution", "+30 %", "−30 %", "+5 %", "−50 %", "+100 %"], true)),
          micros: ["prop_coeff_multiplicateur"],
        },
        {
          enonce: "Une console de jeux coûte $280$ €. Son prix augmente de $5\\,\\%$.\na) Calcule le nouveau prix en calculant d'abord l'augmentation.\nb) Calcule-le avec le coefficient multiplicateur.\nc) Si son prix avait BAISSÉ de $5\\,\\%$, combien coûterait-elle ?",
          correction:
            "a) $5\\,\\%$ de $280$ : $280 \\times 5 = 1\\,400$, puis $1\\,400 \\div 100 = 14$ €. Nouveau prix : $280 + 14 = 294$ €.\nb) Hausse de $5\\,\\%$ : le coefficient est $1 + 0{,}05 = 1{,}05$. Et $280 \\times 1{,}05 = 294$ €. Les deux chemins donnent le même prix.\nc) Baisse de $5\\,\\%$ : le coefficient est $1 - 0{,}05 = 0{,}95$. Et $280 \\times 0{,}95 = 266$ €.\n⛔ Le piège : ajouter $5$ € et répondre $285$ €. $5\\,\\%$, c'est $5$ € pour chaque centaine d'euros : sur $280$ €, c'est $14$ €.\nRéponse : a) et b) $294$ € ; c) $266$ €.",
          schema: ecranSeulement(evolution("€", [{ nom: "avant", valeur: "280" }, { nom: "après", valeur: "294", taux: 5 }])),
          micros: ["prop_coeff_multiplicateur"],
        },
        {
          enonce: "Un billet de train coûte $80$ €. En juillet, son prix augmente de $25\\,\\%$. En septembre, le nouveau prix baisse de $25\\,\\%$.\na) Calcule le prix en juillet.\nb) Calcule le prix en septembre.\nc) Nino affirme : « $+25\\,\\%$ puis $-25\\,\\%$, ça s'annule : on revient à $80$ € ». A-t-il raison ? Explique.",
          correction:
            "a) Hausse de $25\\,\\%$ : $\\times 1{,}25$. $80 \\times 1{,}25 = 100$ €.\nb) La baisse porte sur le prix de JUILLET, $100$ € : $\\times 0{,}75$. $100 \\times 0{,}75 = 75$ €.\nc) Non : on arrive à $75$ €, pas à $80$ €.\nLa hausse vaut $25\\,\\%$ de $80$, soit $20$ €. La baisse vaut $25\\,\\%$ de $100$, soit $25$ €. On retire plus qu'on n'a ajouté.\n⛔ Le piège : croire que deux pourcentages égaux s'annulent. Ils ne portent pas sur le même prix.\nRéponse : $100$ € en juillet ; $75$ € en septembre ; Nino a tort.",
          schema: evolution("€", [{ nom: "départ", valeur: "80" }, { nom: "juil.", valeur: "100", taux: 25 }, { nom: "sept.", valeur: "75", taux: -25 }]),
          micros: ["prop_coeff_multiplicateur", "prop_ratio_defi"],
        },
        {
          enonce: "Dans un club d'escalade, le ratio adultes : enfants est $2 : 3$.\na) Quel pourcentage des membres sont des enfants ?\nb) Le club compte $45$ membres. Combien y a-t-il d'adultes ? D'enfants ?\nc) Vérifie ta réponse du b) avec le pourcentage du a).",
          correction:
            "a) Je compte les parts : $2 + 3 = 5$ parts. Les enfants en ont $3$ sur $5$ : $\\dfrac{3}{5} = \\dfrac{60}{100}$, soit $60\\,\\%$.\nb) Une part vaut $45 \\div 5 = 9$ membres. Adultes : $2 \\times 9 = 18$. Enfants : $3 \\times 9 = 27$.\nc) $60\\,\\%$ de $45$ : $45 \\times 0{,}6 = 27$. C'est bien le nombre d'enfants.\n⛔ Le piège du a) : rapporter les enfants aux adultes, « $3$ sur $2$ ». Un pourcentage compare une part au TOUT : $3$ parts sur $5$.\nRéponse : $60\\,\\%$ d'enfants ; $18$ adultes et $27$ enfants.",
          schema: barre([{ nom: "adultes", parts: 2, valeur: "18" }, { nom: "enfants", parts: 3, valeur: "27" }], "45 membres", "9 membres"),
          micros: ["prop_rapport", "prop_pourcentage", "prop_ratio_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je repère ce qui est un ratio, un pourcentage ou une évolution, puis je conclus par une phrase.",
      rappel: [
        "Un RATIO compare des parts entre elles ; un POURCENTAGE compare une part au tout, ramené à $100$.",
        "Un pourcentage porte toujours sur une quantité précise : « $10\\,\\%$ de quoi ? ».",
        "Je contrôle toujours : les parts d'un partage redonnent le total, les pourcentages d'un tout font $100\\,\\%$.",
      ],
      exercices: [
        {
          titre: "Le bleu du ciel",
          enonce: "Pour peindre un plafond en bleu ciel, on mélange de la peinture blanche et de la peinture bleue dans le ratio blanc : bleu $= 3 : 1$.\na) Avec $6$ L de blanc, combien faut-il de bleu ?\nb) Il faut $10$ L de peinture en tout. Combien de litres de chaque couleur faut-il ?\nc) Quel pourcentage du mélange est de la peinture bleue ?\nd) Léa mélange $4$ L de blanc et $1$ L de bleu. Sa teinte sera-t-elle plus claire ou plus foncée que le bleu ciel ?",
          correction:
            "a) $3$ parts de blanc font $6$ L : une part vaut $6 \\div 3 = 2$ L. Le bleu compte $1$ part : $2$ L de bleu.\nb) $3 + 1 = 4$ parts. Une part vaut $10 \\div 4 = 2{,}5$ L.\nBlanc : $3 \\times 2{,}5 = 7{,}5$ L. Bleu : $1 \\times 2{,}5 = 2{,}5$ L.\nc) Le bleu a $1$ part sur $4$ : $\\dfrac{1}{4} = \\dfrac{25}{100}$, soit $25\\,\\%$.\nd) Le mélange de Léa fait $4 + 1 = 5$ L, dont $1$ L de bleu : $\\dfrac{1}{5} = \\dfrac{20}{100}$, soit $20\\,\\%$ de bleu.\n$20\\,\\% < 25\\,\\%$ : il y a moins de bleu, sa teinte sera plus CLAIRE.\n⛔ Le piège du d) : se dire « elle a mis moins de blanc que $6$ L, donc c'est plus foncé ». Ce ne sont pas les litres qui décident de la couleur, c'est la PART de bleu dans le mélange.\nRéponse : a) $2$ L ; b) $7{,}5$ L de blanc et $2{,}5$ L de bleu ; c) $25\\,\\%$ ; d) plus claire.",
          schema: barre([{ nom: "blanc", parts: 3, valeur: "7,5 L" }, { nom: "bleu", parts: 1, valeur: "2,5 L" }], "10 L", "2,5 L"),
          micros: ["prop_rapport", "prop_pourcentage", "prop_ratio_defi"],
        },
        {
          titre: "Les soldes",
          enonce: "Tom a $100$ € pour s'équiper en sport.\na) Des chaussures de course à $90$ € sont soldées à $-30\\,\\%$. Calcule leur prix soldé avec le coefficient multiplicateur.\nb) Un sweat passe de $50$ € à $40$ €. De quel pourcentage son prix a-t-il baissé ?\nc) Tom peut-il acheter les chaussures et le sweat soldés ?",
          correction:
            "a) Baisse de $30\\,\\%$ : le coefficient est $1 - 0{,}3 = 0{,}7$. $90 \\times 0{,}7 = 63$ €.\nb) La réduction vaut $50 - 40 = 10$ €. Je la rapporte au prix de DÉPART : $\\dfrac{10}{50} = \\dfrac{20}{100}$, soit $20\\,\\%$.\nc) $63 + 40 = 103$ €. C'est plus que $100$ € : Tom ne peut pas tout acheter, il lui manque $3$ €.\n⛔ Le piège du b) : rapporter la réduction au prix soldé, $\\dfrac{10}{40} = 25\\,\\%$. Une baisse se compte toujours sur le prix de départ.\nRéponse : a) $63$ € ; b) une baisse de $20\\,\\%$ ; c) non, il lui manque $3$ €.",
          schema: evolution("€", [{ nom: "prix", valeur: "90" }, { nom: "soldé", valeur: "63", taux: -30 }]),
          micros: ["prop_coeff_multiplicateur", "prop_pourcentage", "prop_ratio_defi"],
        },
        {
          titre: "Les arbres de la ville",
          enonce: "Une commune compte $1\\,200$ arbres dans ses rues : $35\\,\\%$ de platanes, $25\\,\\%$ de tilleuls, et des érables.\na) Quel pourcentage des arbres sont des érables ?\nb) Combien y a-t-il de platanes, de tilleuls et d'érables ?\nc) Écris le ratio platanes : tilleuls, et simplifie-le.\nd) La mairie décide d'augmenter de $10\\,\\%$ le nombre d'arbres. Combien la commune aura-t-elle d'arbres ? Combien faut-il en planter ?",
          correction:
            "a) Le tout fait $100\\,\\%$ : $100 - 35 - 25 = 40\\,\\%$ d'érables.\nb) Platanes : $35\\,\\%$ de $1\\,200$, soit $1\\,200 \\times 0{,}35 = 420$.\nTilleuls : $1\\,200 \\times 0{,}25 = 300$. Érables : $1\\,200 \\times 0{,}4 = 480$.\n⭐ Contrôle : $420 + 300 + 480 = 1\\,200$.\nc) $420 : 300$. Je divise les deux nombres par $60$ : $7 : 5$.\nd) Hausse de $10\\,\\%$ : $\\times 1{,}1$. $1\\,200 \\times 1{,}1 = 1\\,320$ arbres.\nIl faut en planter $1\\,320 - 1\\,200 = 120$, soit $10\\,\\%$ de $1\\,200$.\n⛔ Le piège : oublier que le pourcentage porte sur $1\\,200$. « $35\\,\\%$ de platanes » ne veut pas dire $35$ platanes.\nRéponse : a) $40\\,\\%$ ; b) $420$ platanes, $300$ tilleuls, $480$ érables ; c) $7 : 5$ ; d) $1\\,320$ arbres, soit $120$ à planter.",
          schema: camembert([{ nom: "platanes", valeur: 35 }, { nom: "tilleuls", valeur: 25 }, { nom: "érables", valeur: 40 }]),
          micros: ["prop_pourcentage", "prop_rapport", "prop_coeff_multiplicateur"],
        },
        {
          titre: "Le budget de la sortie",
          enonce: "Une classe prépare une sortie qui coûte $1\\,500$ €. Le car représente $40\\,\\%$ du coût, les entrées $35\\,\\%$, et le reste est pour les repas.\na) Calcule le prix du car, des entrées et des repas.\nb) Le prix du car augmente de $10\\,\\%$. Quel est son nouveau prix ? Quel est le nouveau coût de la sortie ?\nc) Le nouveau coût est partagé entre le collège et les familles dans le ratio collège : familles $= 1 : 2$. Combien paient les familles ?\nd) La classe compte $26$ élèves. Combien paie chaque famille ?",
          correction:
            "a) Car : $1\\,500 \\times 0{,}4 = 600$ €. Entrées : $1\\,500 \\times 0{,}35 = 525$ €.\nRepas : $100 - 40 - 35 = 25\\,\\%$, soit $1\\,500 \\times 0{,}25 = 375$ €.\n⭐ Contrôle : $600 + 525 + 375 = 1\\,500$ €.\nb) Car : $\\times 1{,}1$, $600 \\times 1{,}1 = 660$ €, soit $60$ € de plus. La sortie coûte $1\\,500 + 60 = 1\\,560$ €.\nc) $1 + 2 = 3$ parts. Une part vaut $1\\,560 \\div 3 = 520$ €. Les familles ont $2$ parts : $2 \\times 520 = 1\\,040$ €.\nd) $1\\,040 \\div 26 = 40$ € par famille.\n⛔ Le piège du b) : ajouter $10\\,\\%$ à TOUTE la sortie ($1\\,650$ €). Seul le car augmente : $10\\,\\%$ de $600$ €, pas de $1\\,500$ €.\nRéponse : a) $600$ €, $525$ € et $375$ € ; b) $660$ €, et $1\\,560$ € en tout ; c) $1\\,040$ € ; d) $40$ € par famille.",
          schema: barre([{ nom: "collège", parts: 1, valeur: "520 €" }, { nom: "familles", parts: 2, valeur: "1 040 €" }], "1 560 €", "520 €"),
          micros: ["prop_pourcentage", "prop_coeff_multiplicateur", "prop_rapport", "prop_ratio_defi"],
        },
      ],
    },
  ],
};
