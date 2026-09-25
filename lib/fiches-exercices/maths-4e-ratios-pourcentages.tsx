// ─── Fiche d'exercices : ratios et pourcentages (4e) — 20 exercices corrigés ───
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-ratio-pourcentage.tsx` et
// sur les huit micros du coach de 4e (notionId prop_ratio_pourcentage). La
// notion est née le 28/08/2026 de la SCISSION de `prop_proportionnalite` : elle
// garde les RAPPORTS — le ratio « a : b » et « a : b : c » (le mot du BO du
// cycle 4, p. 134 : a et b sont dans le ratio 2 : 3 si a/2 = b/3), le partage
// selon un ratio, le pourcentage, le coefficient multiplicateur, l'évolution.
// ⛔ Ni tableau de proportionnalité « pur » ni produit en croix (feuille
// `maths-4e-proportionnalite.tsx`), ni échelle ni agrandissement (feuille de
// `prop_echelle`). Pas de taux réciproque en formule, pas de points de
// pourcentage : c'est la seconde.
//
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni les 8 filles et 12
// garçons, ni le sirop 2 : 3 ou 1 : 4, ni le mortier, ni 120 € selon 2 : 3 : 7,
// ni 90 € selon 2 : 3, ni x = 12 dans 3 : 5, ni 25 % de 80, ni +20 %, ni 100 €
// avec +15 % puis −15 %. ⛔ Ni ceux de la feuille de 3e (tomates, 15 % de 240,
// 8 élèves sur 25, 60 € + 20 %, sac à −35 %, jean, 80 € → 92 €, verre doseur,
// tablette +20 %/−20 %, abonnés, démarque) ni de la seconde (fiche de paie).
//
// Les pièges nommés : simplifier un ratio en SOUSTRAYANT (1, 11), diviser par
// la part de l'AUTRE nombre (2), croire qu'il faut le total pour un ratio à trois
// termes (3), partager en divisant par le nombre de personnes (4, 10, 20), lire
// un pourcentage comme une quantité (5), diviser le total par la partie (6),
// multiplier par 0,08 pour une hausse de 8 % (7), ajouter 5 € pour +5 % (8),
// garder le même ÉCART au lieu du même rapport (9), retrancher un pourcentage à
// une surface (12), lire le coefficient 0,15 comme une baisse de 15 % (13),
// rapporter l'évolution à l'arrivée (14), additionner deux évolutions (15),
// rapporter une part à l'autre part au lieu du tout (16), diviser des km par des
// m (17), croire que +73 % efface −73 % (18), confondre un écart et un
// pourcentage (19).
//
// Les chiffres du monde, et d'où ils viennent :
// - le corps d'un adulte : environ 60 % d'eau (USGS, Water Science School,
//   « The Water in You ») — ex. 5 ;
// - la surface de la Terre, environ 510 millions de km², dont environ 71 %
//   d'océans (NOAA, National Ocean Service ; USGS) — ex. 12 ;
// - une LED de 8 à 10 W éclaire comme une ampoule à incandescence de 60 W
//   (ADEME, tableaux d'équivalence de l'éclairage domestique) — ex. 13 ;
// - le rapport Planète vivante 2024 du WWF (Living Planet Index, ZSL) : les
//   populations de vertébrés sauvages suivies ont diminué en moyenne de 73 %
//   entre 1970 et 2020 — ex. 18 ; la population de 10 000 grenouilles et la
//   mare sont IMAGINÉES pour le calcul ;
// - le CO₂ : environ 280 ppm avant l'ère industrielle (GIEC, AR6, groupe I),
//   421 ppm en moyenne annuelle 2023 à Mauna Loa (NOAA, Global Monitoring
//   Laboratory) ; le dioxygène fait 20,95 % de l'air sec, arrondi à 21 % — ex. 19 ;
// - le vélo de route : plateaux de 52 et 36 dents (pédalier « compact »), pignons
//   de 13 et 24 dents (cassette 11-30 de route, Shimano CS-R7000 : 11-12-13-14-
//   15-17-19-21-24-27-30), roue de 700 × 25 C d'environ 2,1 m de tour (tables de
//   développement) — ex. 17 ;
// - la vinaigrette « 3 d'huile pour 1 de vinaigre » est la règle de cuisine
//   classique — ex. 9 ; les médailles, les randonneurs, les céréales, les
//   bouquetins, les cerises, le match et la coopérative sont IMAGINÉS, à l'ordre
//   de grandeur réel.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés ont
// leur dessin, et chacun se vérifie. Quatre dessins locaux, parce que
// `figures.tsx` n'a ni barre de partage ni barre d'évolution :
//   · `barre` — LA BARRE DES PARTS : une barre coupée en parts égales, la part
//     de chacun colorée, sa valeur dessous, « 1 part = … » en bas. C'est le
//     dessin qui dit pourquoi on divise par la SOMME des parts ;
//   · `pourcents` — la barre de 0 à 100 %, avec en face les quantités : le
//     pourcentage se LIT comme une part du tout ;
//   · `evolution` — une barre par étape, à l'échelle : la part ajoutée en vert,
//     la part retirée en pointillés rouges, et le coefficient sous le dessin ;
//   · `tableauParts` — les parts et les quantités, avec « ↓ × valeur d'une
//     part » (HTML : lisible à toutes les largeurs).
// Plus `tableau` de figures.tsx, et un `camembert` local (ex. 16) : le
// `diagramme` partagé écrivait ses libellés à 8,7 px à 375 px (mesuré le 25/09). Le script de recalcul RELIT
// chaque appel : les valeurs d'une barre sont parts × « 1 part », leur somme le
// total ; chaque étape d'une évolution est la précédente × (1 + taux/100) ; et
// toutes les étiquettes tiennent dans le cadre et dans leur case.
// ⛔ LISIBLE AU TÉLÉPHONE : les trois SVG ont un viewBox de 280 de large et un
// corps de 14 au moins ; rendus sur ~235 px à 375, cela fait 11,75 px.
//
// Les corrigés sont écrits à la première personne (« je compte les parts »),
// comme les autres feuilles de 4e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-ratios-pourcentages-4e.mjs`.
//
// Micro-compétences : prop_rapport (1, 9, 11, 17, 20), prop_ratio_quotients (2,
// 9, 17), prop_ratio_trois (3, 10, 20), prop_ratio_partager (4, 10, 20),
// prop_pourcentage (5, 6, 12, 16, 19, 20), prop_coeff_multiplicateur (7, 8, 13,
// 15, 18), prop_evolution (8, 13, 14, 15, 18, 19, 20), prop_ratio_defi (16, 17,
// 18, 19, 20). 8/8.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

/** Deux dessins côte à côte : l'un sous l'autre sur téléphone, côte à côte à
 *  partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

const COULEURS = ["#2563eb", "#ea580c", "#16a34a", "#7c3aed"];
const ENCRE = "#0f172a";
/** « 1 200 » → 1200 ; « 8,80 » → 8.8. */
const nombre = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));
/** 1.05 → « 1,05 » (quatre décimales au plus, zéros inutiles retirés). */
const decimal = (x: number) => String(Number(x.toFixed(4))).replace(".", ",");

/**
 * LA BARRE DES PARTS. Une barre de 260 unités coupée en `Σ parts` parts égales
 * (pointillés blancs) ; chaque personne a ses parts colorées, son nom dedans, sa
 * valeur dessous ; le total en haut, « 1 part = … » en bas.
 * ⚠️ Texte NU (SVG) : jamais de `$`. ⚠️ Le script vérifie que chaque nom et
 * chaque valeur tiennent dans leur segment (8,8 px par signe en corps 14 gras).
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
 * LA BARRE DE 0 À 100 %. En haut les pourcentages, en bas les quantités qui leur
 * correspondent ; la barre est coloriée jusqu'au plus grand pourcentage marqué.
 * « 100 % » et le total sont calés à droite. `marques` : [pourcentage, valeur].
 * ⚠️ Le script vérifie : valeur = pourcentage × total ÷ 100, et aucune
 * étiquette ne chevauche sa voisine ni ne sort du cadre.
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
 * L'ÉVOLUTION, ÉTAPE PAR ÉTAPE. Une barre par ligne, longueur proportionnelle à
 * la valeur (la plus grande fait 144) ; par rapport à la ligne du dessus, la
 * part AJOUTÉE est en vert, la part RETIRÉE en pointillés rouges. Sous le
 * dessin, les coefficients, CALCULÉS sur `taux` : ils ne peuvent pas contredire
 * le dessin. ⚠️ Le script vérifie : chaque valeur est la précédente ×
 * (1 + taux ÷ 100), et les noms (colonne de 58) et les valeurs (jusqu'à 278)
 * tiennent dans le cadre.
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
              {cur < prec && (
                <rect x={x0 + cur} y={y + 1} width={prec - cur} height={24} fill="#fee2e2" stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4 3" />
              )}
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
 * LE CAMEMBERT DES PARTS (ex. 16). Copie locale et ÉTROITE : le `diagramme` de
 * figures.tsx (viewBox 300, corps 11) écrivait ses libellés à 8,7 px effectifs
 * à 375 px — mesuré le 25/09. Ici viewBox 240 et corps 15 : ~14,7 px rendu sur
 * 235 px. Le pourcentage est écrit DANS chaque secteur, le nom dans la légende.
 * ⚠️ Le script relit `{ nom, valeur }` : valeurs en clair, leur somme fait 100.
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
            <rect x={144} y={48 + i * 34} width={14} height={14} fill={COULEURS[i]} />
            <text x={162} y={60 + i * 34} fontSize={15} fontWeight={700} fill={ENCRE}>
              {p.nom}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * LES PARTS ET LES QUANTITÉS : deux lignes, et « ↓ × valeur » à droite. Une case
 * écrite « !14 » est une case TROUVÉE : rouge, sans le « ! ».
 * ⚠️ Pas de formule dans les cases : elles ne traversent pas KaTeX.
 */
const tableauParts = (titres: [string, string], haut: string[], bas: string[], coef: string) => {
  const cellule = (c: string, i: number) => {
    const trouvee = c.startsWith("!");
    return (
      <td key={i} className={`whitespace-nowrap border border-slate-400 px-2 py-1 text-center ${trouvee ? "font-bold text-red-600" : "text-slate-900"}`}>
        {trouvee ? c.slice(1) : c}
      </td>
    );
  };
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border-collapse text-sm">
        <tbody>
          <tr>
            <th className="whitespace-nowrap border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">{titres[0]}</th>
            {haut.map(cellule)}
            <td rowSpan={2} className="whitespace-nowrap pl-2 text-center font-bold text-blue-700">
              ↓ × {coef}
            </td>
          </tr>
          <tr>
            <th className="whitespace-nowrap border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">{titres[1]}</th>
            {bas.map(cellule)}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const exercicesRatiosPourcentages4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "prop-ratio-pourcentage",
  titre: "Ratios, partages et pourcentages",
  accroche:
    "Vingt exercices, du geste seul au problème : écrire et simplifier un ratio, le traduire par une égalité de quotients, partager une quantité en deux ou trois parts, calculer un pourcentage, passer par le coefficient multiplicateur, enchaîner deux évolutions. Le braquet d'un vélo, le déclin des animaux sauvages, le CO₂ de l'air, une coopérative solaire. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la barre des parts dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/prop-ratio-pourcentage", titre: "Ratios et pourcentages" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : écrire un ratio, partager, prendre un pourcentage ou faire évoluer. Tu écris la réponse avec son unité.",
      rappel: [
        "Un ratio compare des quantités parts contre parts : $3 : 4$ veut dire « 3 parts contre 4 parts ». Je le simplifie comme une fraction, en DIVISANT les deux nombres par le même nombre.",
        "$a$ et $b$ sont dans le ratio $3 : 4$ lorsque $\\dfrac{a}{3} = \\dfrac{b}{4}$. Ce quotient commun est la valeur d'UNE part.",
        "Partager selon un ratio : j'additionne les parts, je divise la quantité par ce nombre de parts, puis je multiplie par la part de chacun.",
        "Prendre $t\\,\\%$, c'est multiplier par $\\dfrac{t}{100}$. Augmenter de $t\\,\\%$ : $\\times \\left(1 + \\dfrac{t}{100}\\right)$. Diminuer de $t\\,\\%$ : $\\times \\left(1 - \\dfrac{t}{100}\\right)$.",
      ],
      exercices: [
        {
          enonce: "Un club de basket compte $18$ filles et $24$ garçons.\na) Écris le ratio filles : garçons, puis simplifie-le.\nb) Écris le ratio garçons : filles.",
          correction:
            "a) J'écris les deux nombres dans l'ordre demandé, les filles d'abord : le ratio est $18 : 24$.\nJe cherche le plus grand nombre qui divise $18$ et $24$ : c'est $6$.\n$18 \\div 6 = 3$ et $24 \\div 6 = 4$ : le ratio simplifié est $3 : 4$.\nb) L'ordre change, les nombres aussi : le ratio garçons : filles est $4 : 3$.\n⭐ Sur la barre : $7$ parts de $6$ enfants, $3$ parts de filles et $4$ parts de garçons.\n⛔ Le piège : simplifier en SOUSTRAYANT. Retirer $15$ aux deux nombres donnerait $3 : 9$, un autre club : $3$ filles pour $9$ garçons.\nRéponse : filles : garçons $= 3 : 4$ ; garçons : filles $= 4 : 3$.",
          schema: barre([{ nom: "filles", parts: 3, valeur: "18" }, { nom: "garçons", parts: 4, valeur: "24" }], "42 enfants", "6 enfants"),
          micros: ["prop_rapport"],
        },
        {
          enonce: "Les nombres $x$ et $y$ sont dans le ratio $5 : 2$.\na) Écris l'égalité de quotients qui traduit ce ratio.\nb) On sait que $x = 35$. Calcule $y$.",
          correction:
            "a) Chaque nombre divisé par SA part donne la même chose : $\\dfrac{x}{5} = \\dfrac{y}{2}$.\nb) Je remplace $x$ par $35$ : $\\dfrac{35}{5} = 7$. Une part vaut $7$.\n$y$ compte $2$ parts : $y = 2 \\times 7 = 14$.\n⭐ Contrôle : $\\dfrac{14}{2} = 7$, le même quotient.\n⛔ Le piège : diviser $x$ par la part de $y$, $\\dfrac{35}{2} = 17{,}5$. Chaque nombre se divise par SA part : $x$ par $5$, $y$ par $2$.\nRéponse : $\\dfrac{x}{5} = \\dfrac{y}{2}$ et $y = 14$.",
          schema: tableauParts(["Parts", "Nombres"], ["5", "2"], ["35", "!14"], "7"),
          micros: ["prop_ratio_quotients"],
        },
        {
          enonce: "Aux championnats, les médailles d'or, d'argent et de bronze d'une équipe sont dans le ratio $2 : 3 : 4$. L'équipe a gagné $12$ médailles d'argent. Combien a-t-elle de médailles d'or ? De bronze ? En tout ?",
          correction:
            "Je note $o$, $a$ et $b$ les nombres de médailles d'or, d'argent et de bronze. Le ratio $2 : 3 : 4$ s'écrit $\\dfrac{o}{2} = \\dfrac{a}{3} = \\dfrac{b}{4}$.\nL'argent est connu : $\\dfrac{12}{3} = 4$. Une part vaut $4$ médailles.\nOr : $o = 2 \\times 4 = 8$. Bronze : $b = 4 \\times 4 = 16$.\nEn tout : $8 + 12 + 16 = 36$ médailles, soit $9$ parts de $4$.\n⛔ Le piège : croire qu'il faut connaître le total. Les trois quotients sont égaux : UN seul nombre connu donne la valeur d'une part, et tout le reste.\nRéponse : $8$ médailles d'or, $16$ de bronze, $36$ en tout.",
          schema: barre([{ nom: "or", parts: 2, valeur: "8" }, { nom: "argent", parts: 3, valeur: "12" }, { nom: "bronze", parts: 4, valeur: "16" }], "36 médailles", "4 médailles"),
          micros: ["prop_ratio_trois"],
        },
        {
          enonce: "Inès et Noé se partagent $45$ € selon le ratio Inès : Noé $= 4 : 5$. Combien reçoit chacun ?",
          correction:
            "J'additionne les parts : $4 + 5 = 9$ parts.\nUne part vaut $45 \\div 9 = 5$ €.\nInès : $4 \\times 5 = 20$ €. Noé : $5 \\times 5 = 25$ €.\n⭐ Contrôle : $20 + 25 = 45$ €, et $\\dfrac{20}{4} = \\dfrac{25}{5} = 5$.\n⛔ Le piège : diviser par $2$ parce qu'ils sont deux. $22{,}50$ € chacun, c'est le ratio $1 : 1$, pas $4 : 5$.\nRéponse : Inès reçoit $20$ € et Noé $25$ €.",
          schema: barre([{ nom: "Inès", parts: 4, valeur: "20 €" }, { nom: "Noé", parts: 5, valeur: "25 €" }], "45 €", "5 €"),
          micros: ["prop_ratio_partager"],
        },
        {
          enonce: "Le corps d'un adulte est composé d'environ $60\\,\\%$ d'eau. Quelle masse d'eau contient le corps d'un adulte de $70$ kg ?",
          correction:
            "$60\\,\\%$, c'est $\\dfrac{60}{100} = 0{,}6$.\nJe multiplie : $0{,}6 \\times 70 = 42$.\n⭐ De tête : $10\\,\\%$ de $70$ font $7$, donc $60\\,\\%$ font $6 \\times 7 = 42$.\n⛔ Le piège : répondre « $60$ kg ». $60\\,\\%$ n'est pas une masse, c'est une part : $60$ pour $100$.\nRéponse : environ $42$ kg d'eau.",
          schema: pourcents("70", "kg", [[10, "7"], [60, "42"]]),
          micros: ["prop_pourcentage"],
        },
        {
          enonce: "Sur un paquet de céréales, on lit : « pour $250$ g, $30$ g de sucres ». Quel pourcentage de sucres ces céréales contiennent-elles ?",
          correction:
            "La proportion est la partie divisée par le total : $\\dfrac{30}{250}$.\n$30 \\div 250 = 0{,}12$, et $0{,}12 = \\dfrac{12}{100}$.\n⭐ Autre chemin : je ramène à $100$ g. $250$ g, c'est $2{,}5$ fois $100$ g, donc il y a $30 \\div 2{,}5 = 12$ g de sucres pour $100$ g.\n⛔ Le piège : diviser dans l'autre sens, $250 \\div 30 \\approx 8{,}3$. Une part d'un tout se calcule en divisant la PARTIE par le TOTAL.\nRéponse : $12\\,\\%$ de sucres.",
          schema: pourcents("250", "grammes", [[12, "30"]]),
          micros: ["prop_pourcentage"],
        },
        {
          enonce: "Complète.\na) Une hausse de $8\\,\\%$ revient à multiplier par …\nb) Une baisse de $25\\,\\%$ revient à multiplier par …\nc) Multiplier par $1{,}3$, c'est une … de … $\\%$.\nd) Multiplier par $0{,}9$, c'est une … de … $\\%$.",
          correction:
            "Le coefficient part toujours de $1$ : le tout que je garde.\na) $1 + 0{,}08 = 1{,}08$.\nb) $1 - 0{,}25 = 0{,}75$.\nc) $1{,}3 > 1$ : ça monte. $1{,}3 - 1 = 0{,}3$, c'est une hausse de $30\\,\\%$.\nd) $0{,}9 < 1$ : ça baisse. $1 - 0{,}9 = 0{,}1$, c'est une baisse de $10\\,\\%$.\n⛔ Le piège : écrire $0{,}08$ pour une hausse de $8\\,\\%$. Multiplier par $0{,}08$ donne seulement la HAUSSE, pas le nouveau prix. Et $\\times 1{,}3$ n'est pas $+3\\,\\%$ : ce serait $\\times 1{,}03$.\nRéponse : a) $\\times 1{,}08$ ; b) $\\times 0{,}75$ ; c) une hausse de $30\\,\\%$ ; d) une baisse de $10\\,\\%$.",
          schema: tableau(["Évolution", "+8 %", "−25 %", "+30 %", "−10 %"], ["Coefficient", "× 1,08", "× 0,75", "× 1,3", "× 0,9"], true),
          micros: ["prop_coeff_multiplicateur"],
        },
        {
          enonce: "Un vélo électrique coûte $1\\,200$ €. Son prix augmente de $5\\,\\%$. Quel est son nouveau prix ?",
          correction:
            "Augmenter de $5\\,\\%$, c'est multiplier par $1 + 0{,}05 = 1{,}05$.\n$1\\,200 \\times 1{,}05 = 1\\,260$.\n⭐ Autre chemin : $5\\,\\%$ de $1\\,200$ font $0{,}05 \\times 1\\,200 = 60$ €, et $1\\,200 + 60 = 1\\,260$ €.\n⛔ Le piège : ajouter $5$ € et répondre $1\\,205$ €. $5\\,\\%$, c'est $5$ € pour $100$ € : sur $1\\,200$ €, c'est $12$ fois plus.\nRéponse : le nouveau prix est $1\\,260$ €.",
          schema: evolution("€", [{ nom: "avant", valeur: "1 200" }, { nom: "après", valeur: "1 260", taux: 5 }]),
          micros: ["prop_coeff_multiplicateur", "prop_evolution"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. Tu justifies chaque réponse par un calcul, et tu contrôles à la fin.",
      rappel: [
        "L'ordre d'un ratio compte : filles : garçons n'est pas garçons : filles. Et un ratio se simplifie en divisant, jamais en soustrayant.",
        "Du ratio au pourcentage : je rapporte une part au TOTAL des parts. Dans un ratio $1 : 3$, le premier a $1$ part sur $4$, soit $25\\,\\%$.",
        "Taux d'évolution : je divise la valeur d'arrivée par la valeur de DÉPART. $1{,}12$ veut dire $+12\\,\\%$ ; $0{,}6$ veut dire $-40\\,\\%$.",
        "Deux évolutions à la suite : je MULTIPLIE les coefficients. Je n'additionne jamais deux pourcentages.",
      ],
      exercices: [
        {
          enonce: "Une vinaigrette classique se prépare avec $3$ volumes d'huile pour $1$ volume de vinaigre.\na) Écris le ratio huile : vinaigre.\nb) J'ai $12$ cL de vinaigre. Quelle quantité d'huile faut-il ?\nc) Tom mélange $20$ cL d'huile et $8$ cL de vinaigre. Respecte-t-il le ratio ? Sinon, combien d'huile doit-il ajouter ?",
          correction:
            "a) Le ratio huile : vinaigre est $3 : 1$.\nb) Je note $h$ l'huile et $v$ le vinaigre, en cL : $\\dfrac{h}{3} = \\dfrac{v}{1}$.\nAvec $v = 12$, une part vaut $12$ cL, donc $h = 3 \\times 12 = 36$ cL.\nc) Je compare les quotients : $\\dfrac{20}{3} \\approx 6{,}67$ et $\\dfrac{8}{1} = 8$. Ils sont différents : Tom ne respecte pas le ratio.\nSon ratio est $20 : 8$, soit $5 : 2$ en divisant par $4$ : il a mis trop peu d'huile.\nPour $8$ cL de vinaigre, il faut $3 \\times 8 = 24$ cL d'huile : il doit en ajouter $24 - 20 = 4$ cL.\n⛔ Le piège : garder le même ÉCART. Lire « $3$ pour $1$ » comme « $2$ cL d'huile de plus que de vinaigre », et verser $14$ cL d'huile pour $12$ cL de vinaigre. Un ratio compare par une MULTIPLICATION : $3$ fois plus d'huile.\nRéponse : a) $3 : 1$ ; b) $36$ cL d'huile ; c) non, il doit ajouter $4$ cL d'huile.",
          schema: tableauParts(["Parts", "Volume (cL)"], ["3", "1"], ["!36", "12"], "12"),
          micros: ["prop_rapport", "prop_ratio_quotients"],
        },
        {
          enonce: "Trois randonneurs, Sam, Lou et Maé, se partagent $24$ kg de matériel selon le ratio $3 : 4 : 5$. Combien de kilos porte chacun ?",
          correction:
            "Je compte les parts : $3 + 4 + 5 = 12$ parts.\nUne part pèse $24 \\div 12 = 2$ kg.\nSam : $3 \\times 2 = 6$ kg. Lou : $4 \\times 2 = 8$ kg. Maé : $5 \\times 2 = 10$ kg.\n⭐ Contrôle : $6 + 8 + 10 = 24$ kg, et $\\dfrac{6}{3} = \\dfrac{8}{4} = \\dfrac{10}{5} = 2$.\n⛔ Le piège : diviser par $3$ parce qu'ils sont trois. $8$ kg chacun, c'est un partage égal : le ratio serait $1 : 1 : 1$.\nRéponse : Sam porte $6$ kg, Lou $8$ kg et Maé $10$ kg.",
          schema: barre([{ nom: "Sam", parts: 3, valeur: "6 kg" }, { nom: "Lou", parts: 4, valeur: "8 kg" }, { nom: "Maé", parts: 5, valeur: "10 kg" }], "24 kg", "2 kg"),
          micros: ["prop_ratio_partager", "prop_ratio_trois"],
        },
        {
          enonce: "Dans un parc, on compte $15$ arbres fruitiers et $25$ chênes.\na) Simplifie le ratio fruitiers : chênes.\nb) Léna a retiré $10$ aux deux nombres et trouvé $5 : 15$. A-t-elle raison ?\nc) Simplifie le ratio $2{,}5 : 4$ en un ratio de nombres entiers.",
          correction:
            "a) $15$ et $25$ se divisent tous les deux par $5$ : $15 \\div 5 = 3$ et $25 \\div 5 = 5$. Le ratio simplifié est $3 : 5$.\nb) Je teste avec les quotients. Pour $3 : 5$ : $\\dfrac{15}{3} = 5$ et $\\dfrac{25}{5} = 5$, ils sont égaux. Pour $5 : 15$ : $\\dfrac{15}{5} = 3$ mais $\\dfrac{25}{15} \\approx 1{,}67$, ils sont différents. Léna a tort.\nc) Pour enlever la virgule, je multiplie les DEUX nombres par $2$ : $2{,}5 \\times 2 = 5$ et $4 \\times 2 = 8$. Le ratio est $5 : 8$.\n⛔ Le piège : soustraire le même nombre. $5 : 15$, c'est $1$ fruitier pour $3$ chênes, alors que le parc en a $3$ pour $5$. Un ratio se simplifie en divisant, ou en multipliant, les deux nombres par le même nombre.\nRéponse : a) $3 : 5$ ; b) non, Léna a tort ; c) $5 : 8$.",
          schema: barre([{ nom: "fruitiers", parts: 3, valeur: "15" }, { nom: "chênes", parts: 5, valeur: "25" }], "40 arbres", "5 arbres"),
          micros: ["prop_rapport"],
        },
        {
          enonce: "La surface de la Terre mesure environ $510$ millions de km². Les océans en couvrent environ $71\\,\\%$.\na) Calcule la surface des océans.\nb) Quel pourcentage de la surface les terres occupent-elles ? Calcule cette surface.\nc) Vérifie avec une addition.",
          correction:
            "a) $71\\,\\% = 0{,}71$ et $0{,}71 \\times 510 = 362{,}1$. Les océans couvrent environ $362{,}1$ millions de km².\nb) Le tout fait $100\\,\\%$ : les terres occupent $100 - 71 = 29\\,\\%$. Et $0{,}29 \\times 510 = 147{,}9$ millions de km².\nc) $362{,}1 + 147{,}9 = 510$ : je retrouve la surface totale.\n⛔ Le piège : calculer les terres par $510 - 71 = 439$. On ne retire pas un POURCENTAGE à une surface : ce ne sont pas les mêmes unités.\nRéponse : environ $362{,}1$ millions de km² d'océans, et $147{,}9$ millions de km² de terres, soit $29\\,\\%$.",
          schema: pourcents("510", "millions de km²", [[71, "362,1"]]),
          micros: ["prop_pourcentage"],
        },
        {
          enonce: "Une lampe LED de $9$ W éclaire autant qu'une ampoule à incandescence de $60$ W.\na) Par quel nombre la puissance est-elle multipliée quand on passe de l'ampoule à la LED ?\nb) De quel pourcentage la puissance baisse-t-elle ?\nc) Une maison remplace $10$ ampoules de $60$ W par des LED. Quelle puissance économise-t-elle ?",
          correction:
            "a) Je divise l'arrivée par le départ : $9 \\div 60 = 0{,}15$. La puissance est multipliée par $0{,}15$.\nb) $0{,}15 = 1 - 0{,}85$ : c'est une baisse de $85\\,\\%$.\n⭐ Autre chemin : la baisse est de $60 - 9 = 51$ W, et $\\dfrac{51}{60} = 0{,}85$.\nc) Avant : $10 \\times 60 = 600$ W. Après : $600 \\times 0{,}15 = 90$ W. Économie : $600 - 90 = 510$ W, encore $85\\,\\%$.\n⛔ Le piège : lire le coefficient $0{,}15$ comme « une baisse de $15\\,\\%$ ». $0{,}15$, c'est ce qui RESTE : $15\\,\\%$ de la puissance. On en a retiré $85\\,\\%$.\nRéponse : a) $\\times 0{,}15$ ; b) une baisse de $85\\,\\%$ ; c) $510$ W économisés.",
          schema: evolution("W", [{ nom: "avant", valeur: "60" }, { nom: "LED", valeur: "9", taux: -85 }]),
          micros: ["prop_coeff_multiplicateur", "prop_evolution"],
        },
        {
          enonce: "Dans une réserve des Alpes, on comptait $250$ bouquetins. Cinq ans plus tard, on en compte $310$.\na) De combien de bouquetins la population a-t-elle augmenté ?\nb) Calcule le coefficient multiplicateur, puis le pourcentage d'augmentation.",
          correction:
            "a) $310 - 250 = 60$ bouquetins de plus.\nb) Je divise l'arrivée par le DÉPART : $310 \\div 250 = 1{,}24$. Le coefficient est $1{,}24$.\n$1{,}24 = 1 + 0{,}24$ : c'est une hausse de $24\\,\\%$.\n⭐ Autre chemin : $\\dfrac{60}{250} = 0{,}24$, soit $24\\,\\%$.\n⛔ Le piège : diviser par l'arrivée, $\\dfrac{60}{310} \\approx 0{,}19$. Une évolution se rapporte toujours à la valeur de DÉPART.\nRéponse : $60$ bouquetins de plus ; le coefficient est $1{,}24$ ; c'est une hausse de $24\\,\\%$.",
          schema: evolution("", [{ nom: "avant", valeur: "250" }, { nom: "après", valeur: "310", taux: 24 }]),
          micros: ["prop_evolution"],
        },
        {
          enonce: "Au marché, le kilo de cerises coûte $8$ € en avril. Son prix augmente de $10\\,\\%$ en mai, puis de $20\\,\\%$ en juin.\na) Calcule le prix en mai, puis en juin.\nb) Par quel nombre le prix d'avril a-t-il été multiplié en tout ? Quel est le pourcentage d'augmentation total ?",
          correction:
            "a) Mai : $8 \\times 1{,}1 = 8{,}80$ €. Juin : la hausse de $20\\,\\%$ porte sur le prix de MAI, $8{,}80 \\times 1{,}2 = 10{,}56$ €.\nb) Je multiplie les coefficients : $1{,}1 \\times 1{,}2 = 1{,}32$. C'est une hausse de $32\\,\\%$.\n⭐ Contrôle : $8 \\times 1{,}32 = 10{,}56$ €.\n⛔ Le piège : additionner, $10 + 20 = 30\\,\\%$. On trouverait $8 \\times 1{,}3 = 10{,}40$ € : il manque $0{,}16$ €, parce que les $20\\,\\%$ de juin portent AUSSI sur la hausse de mai.\nRéponse : $8{,}80$ € en mai, $10{,}56$ € en juin ; en tout $\\times 1{,}32$, soit une hausse de $32\\,\\%$.",
          schema: evolution("€", [{ nom: "avril", valeur: "8" }, { nom: "mai", valeur: "8,80", taux: 10 }, { nom: "juin", valeur: "10,56", taux: 20 }]),
          micros: ["prop_coeff_multiplicateur", "prop_evolution"],
        },
        {
          enonce: "Pendant un match de football, les temps de possession du ballon des équipes A et B sont dans le ratio $3 : 2$.\na) Quel pourcentage du temps de possession revient à l'équipe A ? À l'équipe B ?\nb) Le ballon a été en jeu pendant $55$ minutes. Pendant combien de minutes l'équipe B l'a-t-elle eu ?",
          correction:
            "a) Je compte les parts : $3 + 2 = 5$ parts. L'équipe A en a $3$ sur $5$ : $\\dfrac{3}{5} = 0{,}6$, soit $60\\,\\%$.\nL'équipe B a les $2$ autres parts : $\\dfrac{2}{5} = 0{,}4$, soit $40\\,\\%$.\nb) Une part vaut $55 \\div 5 = 11$ minutes. B a $2$ parts : $2 \\times 11 = 22$ minutes.\n⭐ Contrôle : A a $3 \\times 11 = 33$ minutes, et $33 + 22 = 55$.\n⛔ Le piège : rapporter A à B au lieu du TOTAL. $\\dfrac{3}{2} = 1{,}5$ donnerait « $150\\,\\%$ », impossible pour une part du temps de jeu.\nRéponse : a) $60\\,\\%$ pour A et $40\\,\\%$ pour B ; b) $22$ minutes pour B.",
          schema: camembert([{ nom: "équipe A", valeur: 60 }, { nom: "équipe B", valeur: 40 }]),
          micros: ["prop_pourcentage", "prop_ratio_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles, plusieurs questions qui s'enchaînent. Je repère ce qui est un ratio et ce qui est un pourcentage, puis je conclus par une phrase.",
      rappel: [
        "Un RATIO compare des parts entre elles ; un POURCENTAGE compare une part au tout, ramené à cent.",
        "Chaque évolution devient une multiplication : $+40\\,\\%$ devient $\\times 1{,}4$, et $-40\\,\\%$ devient $\\times 0{,}6$.",
        "Pour cent de QUOI ? Un pourcentage porte toujours sur une quantité précise. Un écart, en unités ou en parts, n'est pas un pourcentage.",
      ],
      exercices: [
        {
          titre: "Le braquet du cycliste",
          enonce: "Sur un vélo de route, la chaîne relie le plateau (fixé au pédalier) au pignon (fixé à la roue arrière). À chaque tour de pédale, les dents du plateau entraînent autant de dents du pignon. Le cycliste roule avec un plateau de $52$ dents et un pignon de $13$ dents.\na) Écris le ratio plateau : pignon, puis simplifie-le.\nb) En un tour de pédale, combien de tours fait la roue ?\nc) Le tour de la roue mesure $2{,}1$ m. Quelle distance le vélo parcourt-il par tour de pédale ? Combien de tours de pédale faut-il pour $1{,}26$ km ?\nd) En montée, il passe sur un plateau de $36$ dents et un pignon de $24$ dents. Reprends les questions a) et c).",
          correction:
            "a) Le ratio plateau : pignon est $52 : 13$. Comme $52 = 4 \\times 13$, je divise les deux nombres par $13$ : le ratio simplifié est $4 : 1$.\nb) Un tour de pédale fait passer $52$ dents, et un tour de pignon en demande $13$ : $52 \\div 13 = 4$. La roue fait $4$ tours par tour de pédale.\n⭐ Avec les quotients : si $p$ compte les tours de pédale et $r$ ceux de la roue, $\\dfrac{p}{1} = \\dfrac{r}{4}$.\nc) Par tour de pédale : $4 \\times 2{,}1 = 8{,}4$ m.\n$1{,}26$ km $= 1\\,260$ m, et $1\\,260 \\div 8{,}4 = 150$ tours de pédale.\nd) $36 : 24$ : je divise par $12$, le ratio est $3 : 2$. La roue fait $3 \\div 2 = 1{,}5$ tour par tour de pédale, soit $1{,}5 \\times 2{,}1 = 3{,}15$ m.\nPour $1\\,260$ m : $1\\,260 \\div 3{,}15 = 400$ tours de pédale. Plus de tours, mais chacun demande moins de force : c'est tout l'intérêt en montée.\n⛔ Le piège : oublier de convertir. $1{,}26 \\div 8{,}4 = 0{,}15$ tour de pédale pour plus d'un kilomètre, c'est absurde : on ne divise pas des kilomètres par des mètres.\nRéponse : a) $4 : 1$ ; b) $4$ tours ; c) $8{,}4$ m, et $150$ tours de pédale ; d) $3 : 2$, $3{,}15$ m, et $400$ tours de pédale.",
          schema: deux(
            tableauParts(["Pédale (tours)", "Roue (tours)"], ["1", "!150"], ["4", "!600"], "4"),
            tableauParts(["Roue (tours)", "Distance (m)"], ["4", "600"], ["!8,4", "1 260"], "2,1"),
          ),
          micros: ["prop_rapport", "prop_ratio_quotients", "prop_ratio_defi"],
        },
        {
          titre: "Le déclin des animaux sauvages",
          enonce: "Selon le rapport Planète vivante du WWF (2024), les populations d'animaux sauvages suivies par les scientifiques ont diminué en moyenne de $73\\,\\%$ entre 1970 et 2020.\na) Par quel nombre une population qui suit cette moyenne a-t-elle été multipliée ?\nb) Une population de grenouilles comptait $10\\,000$ individus en 1970, et elle a suivi la moyenne. Combien en reste-t-il en 2020 ?\nc) Grâce à la protection de sa mare, cette population augmente ensuite de $73\\,\\%$. A-t-elle retrouvé son niveau de 1970 ?\nd) Par quel nombre aurait-il fallu multiplier la population de 2020 pour retrouver $10\\,000$ grenouilles ? Arrondis au dixième.",
          correction:
            "a) Diminuer de $73\\,\\%$, c'est garder $100 - 73 = 27\\,\\%$ : le coefficient est $0{,}27$.\nb) $10\\,000 \\times 0{,}27 = 2\\,700$ grenouilles en 2020.\nc) La hausse porte sur $2\\,700$, pas sur $10\\,000$ : $2\\,700 \\times 1{,}73 = 4\\,671$. C'est moins de la moitié de $10\\,000$ : elle est loin de son niveau de 1970.\nd) $10\\,000 \\div 2\\,700 \\approx 3{,}7$. Il aurait fallu multiplier par environ $3{,}7$, une hausse d'environ $270\\,\\%$.\n⛔ Le piège : croire que $+73\\,\\%$ efface $-73\\,\\%$. Les deux pourcentages ne portent pas sur la même quantité : $73\\,\\%$ de $10\\,000$ font $7\\,300$, mais $73\\,\\%$ de $2\\,700$ ne font que $1\\,971$.\n⭐ C'est pour cela qu'une perte se répare si difficilement : plus une population est tombée bas, plus la hausse doit être forte pour remonter.\nRéponse : a) $\\times 0{,}27$ ; b) $2\\,700$ grenouilles ; c) non, $4\\,671$ seulement ; d) environ $\\times 3{,}7$.",
          schema: evolution("", [{ nom: "1970", valeur: "10 000" }, { nom: "2020", valeur: "2 700", taux: -73 }, { nom: "puis", valeur: "4 671", taux: 73 }]),
          micros: ["prop_coeff_multiplicateur", "prop_evolution", "prop_ratio_defi"],
        },
        {
          titre: "Le CO₂ de l'air",
          enonce: "Avant l'ère industrielle, l'air contenait environ $280$ molécules de dioxyde de carbone (CO₂) pour un million de molécules : on dit $280$ ppm, « parties par million ». En 2023, on en mesure environ $420$ ppm.\na) Écris le ratio CO₂ : air en 2023, puis le pourcentage de CO₂ dans l'air.\nb) De quel pourcentage la teneur en CO₂ a-t-elle augmenté depuis l'ère industrielle ?\nc) Un titre annonce : « le CO₂ a augmenté de $140\\,\\%$ ». D'où vient ce nombre ? Est-il juste ?\nd) Le dioxygène forme $21\\,\\%$ de l'air. Combien y a-t-il de molécules de dioxygène pour une molécule de CO₂ ?",
          correction:
            "a) Le ratio CO₂ : air est $420 : 1\\,000\\,000$. En pourcentage : $\\dfrac{420}{1\\,000\\,000} = 0{,}000\\,42 = 0{,}042\\,\\%$.\nb) Je divise l'arrivée par le départ : $420 \\div 280 = 1{,}5$. C'est une hausse de $50\\,\\%$.\nc) $140$ est l'écart : $420 - 280 = 140$ ppm. C'est une hausse de $140$ ppm, pas de $140\\,\\%$. En pourcentage, je rapporte cet écart au départ : $\\dfrac{140}{280} = 0{,}5$, soit $50\\,\\%$.\nd) $21\\,\\%$ d'un million : $0{,}21 \\times 1\\,000\\,000 = 210\\,000$ molécules de dioxygène pour $420$ de CO₂. Le ratio dioxygène : CO₂ est $210\\,000 : 420$, soit $500 : 1$ en divisant par $420$.\n⛔ Le piège : confondre un écart et un pourcentage. $140$ ppm de plus sur $280$, c'est $+50\\,\\%$ ; « $+140\\,\\%$ » voudrait dire $280 \\times 2{,}4 = 672$ ppm.\n⭐ Une toute petite part peut peser lourd : $0{,}042\\,\\%$ de l'air, et c'est le principal gaz responsable du réchauffement actuel.\nRéponse : a) $420 : 1\\,000\\,000$, soit $0{,}042\\,\\%$ ; b) une hausse de $50\\,\\%$ ; c) non, c'est $+140$ ppm, soit $+50\\,\\%$ ; d) $500$ molécules de dioxygène pour une de CO₂.",
          schema: evolution("ppm", [{ nom: "avant", valeur: "280" }, { nom: "2023", valeur: "420", taux: 50 }]),
          micros: ["prop_pourcentage", "prop_evolution", "prop_ratio_defi"],
        },
        {
          titre: "La coopérative solaire",
          enonce: "Trois familles financent des panneaux solaires sur le toit d'une école : les Diaz apportent $3\\,000$ €, les Roy $4\\,500$ € et les Petit $7\\,500$ €. L'électricité vendue rapporte $1\\,200$ € par an, partagés selon le ratio des apports.\na) Écris le ratio des apports Diaz : Roy : Petit, et simplifie-le.\nb) Combien chaque famille reçoit-elle par an ?\nc) Quel pourcentage des gains les Petit reçoivent-ils ?\nd) L'année suivante, moins ensoleillée, les gains baissent de $15\\,\\%$. Combien les Diaz reçoivent-ils ?",
          correction:
            "a) Le ratio est $3\\,000 : 4\\,500 : 7\\,500$. Les trois nombres se divisent par $1\\,500$ : le ratio simplifié est $2 : 3 : 5$.\nb) $2 + 3 + 5 = 10$ parts, et une part vaut $1\\,200 \\div 10 = 120$ €.\nDiaz : $2 \\times 120 = 240$ €. Roy : $3 \\times 120 = 360$ €. Petit : $5 \\times 120 = 600$ €.\n⭐ Contrôle : $240 + 360 + 600 = 1\\,200$ €.\nc) Les Petit ont $5$ parts sur $10$ : $\\dfrac{5}{10} = 0{,}5$, soit $50\\,\\%$ des gains.\nd) Les gains sont multipliés par $0{,}85$ : $1\\,200 \\times 0{,}85 = 1\\,020$ €. Une part vaut $1\\,020 \\div 10 = 102$ €, et les Diaz reçoivent $2 \\times 102 = 204$ €.\n⭐ Plus court : le ratio ne change pas, donc leur part baisse aussi de $15\\,\\%$ : $240 \\times 0{,}85 = 204$ €.\n⛔ Le piège : partager en trois parce qu'il y a trois familles, $400$ € chacune. Les Petit ont apporté la moitié de l'argent : ils reçoivent la moitié des gains.\nRéponse : a) $2 : 3 : 5$ ; b) $240$ €, $360$ € et $600$ € ; c) $50\\,\\%$ ; d) $204$ €.",
          schema: barre([{ nom: "Diaz", parts: 2, valeur: "240 €" }, { nom: "Roy", parts: 3, valeur: "360 €" }, { nom: "Petit", parts: 5, valeur: "600 €" }], "1 200 €", "120 €"),
          micros: ["prop_rapport", "prop_ratio_trois", "prop_ratio_partager", "prop_pourcentage", "prop_evolution", "prop_ratio_defi"],
        },
      ],
    },
  ],
};
