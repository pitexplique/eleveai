// ─── Fiche d'exercices : les ratios (4e) — 20 exercices corrigés ──────────────
//
// ÉCRITE le 02/10/2026, quand Frédéric a coupé la notion du coach
// « Ratios et pourcentages » en deux (commit 1dcc4d33) : voici la feuille de
// `prop_ratio` seule. Au standard de la feuille étalon de 4e
// (`maths-4e-proportionnalite.tsx`) : un dessin qui aide dans CHAQUE exercice,
// 13 imprimés, aides de dessin locales écrites EN CLAIR et relues par le script
// de recalcul.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/4e/maths/ratios.bank.ts`
// (notionId prop_ratio) et sur le BO du cycle 4 : a et b sont dans le ratio
// 2 : 3 si a/2 = b/3 ; a, b, c dans le ratio 2 : 3 : 7 si a/2 = b/3 = c/7 ;
// « partager une quantité en deux ou trois parts selon un ratio donné ». Les
// défis sont ceux de la banque : retrouver les parts à partir d'un ÉCART,
// ENCHAÎNER deux ratios a : b et b : c, AJOUTER une quantité pour atteindre un
// nouveau ratio. ⛔ Aucun pourcentage (notion `prop_pourcentages`), aucun
// tableau de proportionnalité « pur » ni produit en croix (notion
// `prop_proportionnalite`), aucune échelle (`prop_echelle`).
//
// L'ancienne feuille commune `maths-4e-ratios-pourcentages.tsx` n'a servi que
// de réservoir (l'idée du braquet, la barre des parts) ; aucun exercice n'en est
// recopié. ⛔ Aucun exemple de la fiche de cours commune n'est repris (ni les 8
// filles et 12 garçons, ni le sirop 2 : 3 ou 1 : 4, ni le mortier, ni 120 €
// selon 2 : 3 : 7, ni 90 € selon 2 : 3, ni x = 12 dans 3 : 5), ni ceux de
// l'ancienne feuille (basket, médailles, Inès et Noé, vinaigrette, randonneurs,
// parc, match, coopérative solaire, braquet 52/13), ni ceux de la feuille de 5e
// (poules, bonbons, pâte sablée, peinture…). ⛔ Ni ceux de la nouvelle fiche de
// cours `lib/fiches/maths-4e-ratio.tsx` (relue le 02/10) : peinture 2 : 3 : 7,
// smoothie 3 : 2 : 5, playlist 40 : 24, 1 500 arbres et trois villages, cerfs et
// sangliers, 84 € selon 1 : 2 : 4, filles 3/7, graines pour oiseaux — d'où les
// perles (5), l'orchestre (7), le terreau (8) et la mosaïque (15).
//
// Les pièges nommés : simplifier en SOUSTRAYANT (1), comparer des unités
// différentes (2), diviser par la part de l'AUTRE nombre (3, 8), associer la
// longueur au mauvais nombre du ratio (4), croire qu'il faut le total (5),
// partager en parts égales parce qu'il y a deux ou trois bénéficiaires (6, 7),
// multiplier un seul nombre du ratio (9), prendre l'écart pour une quantité
// (10, 19), le ratio écrit dans le mauvais ordre (11), garder l'ancienne valeur
// d'une part après un ajout (12, 18), diviser une DIFFÉRENCE par la somme des
// parts (13), ajouter le surplus à une seule culture (14), recoller deux ratios
// sans égaliser le terme commun (15, 19), comparer des mélanges par l'ÉCART (16),
// croire que le petit pignon fait tourner la roue moins vite (17), additionner
// des masses qui ne réagissent pas (20), oublier que la molécule a DEUX atomes
// d'hydrogène (20).
//
// Les faits réels, et d'où ils viennent :
// - le triathlon : format olympique 1,5 km de natation, 40 km de vélo, 10 km de
//   course ; format sprint 750 m, 20 km, 5 km (règlement des compétitions de
//   World Triathlon) ; format longue distance « Ironman » 3,86 km, 180,25 km,
//   42,195 km, écrit « environ 3,8 km, 180 km et 42,2 km » — ex. 9 ;
// - l'eau H₂O : deux atomes d'hydrogène pour un d'oxygène ; masses atomiques
//   H ≈ 1,008 et O ≈ 16,00 (IUPAC), d'où le ratio de masses hydrogène : oxygène
//   ≈ 2 : 16 = 1 : 8, et un atome d'oxygène environ 16 fois plus lourd qu'un
//   atome d'hydrogène — ex. 20.
// Tout le reste est un MODÈLE, dit comme tel quand il ressemble à une mesure
// (compost, prairie fleurie, tour de roue de 2,1 m).
//
// ⭐ LES DESSINS (« les élèves adorent les schémas ») :
//   · `barre` — LA BARRE DES PARTS : une barre coupée en parts égales, la part
//     de chacun colorée, son nom dedans, sa valeur dessous, le total en haut,
//     « 1 part = … » en bas. C'est le dessin qui dit pourquoi on divise par la
//     SOMME des parts ;
//   · `comparer` — LES BARRES COMPARÉES : une barre par quantité, toutes avec
//     des parts de même longueur, l'ÉCART marqué d'une accolade. C'est le
//     dessin des défis : l'écart se voit, c'est un nombre de parts ;
//   · `rectangles` — des drapeaux dessinés à l'échelle (ex. 4) ;
//   · `engrenages` — le plateau et le pignon d'un vélo, une dent par créneau,
//     à l'échelle (ex. 17) ;
//   · `tableauParts` (le tableau couché sur téléphone de l'étalon) et `table`.
// ⛔ LISIBLE AU TÉLÉPHONE : viewBox de 280 à 300 de large, police 14, aucun
// `min-w` ; le script vérifie que chaque nom et chaque valeur tiennent dans leur
// part et ne touchent pas leur voisine. 13 dessins imprimés ; ceux qui redisent
// le corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je compte les parts »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-4e-prop-ratio.mjs`.
//
// Micro-compétences : prop_rapport (1, 2, 4, 8, 11, 12, 16, 17, 20),
// prop_ratio_quotients (3, 4, 5, 9, 13, 17), prop_ratio_trois (5, 7, 9, 14, 15,
// 18, 19), prop_ratio_partager (6, 7, 8, 11, 14, 18, 19, 20), prop_ratio_defi
// (10, 12, 13, 15, 16, 17, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const COULEURS = ["#2563eb", "#ea580c", "#16a34a", "#7c3aed"];
const ENCRE = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins : l'un sous l'autre sur téléphone, côte à côte à partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 min-w-0 gap-3 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/**
 * LA BARRE DES PARTS. Une barre de 260 unités coupée en `Σ parts` parts égales
 * (pointillés blancs) ; chaque segment a ses parts colorées, son nom dedans, sa
 * valeur dessous. `total` est écrit en haut tel quel (vide : rien), et
 * « 1 part = … » en bas (vide : rien). Une valeur « ? » est une valeur cherchée.
 * ⚠️ Texte NU (SVG) : jamais de `$`. ⚠️ Le script vérifie que chaque nom tient
 * dans son segment et que les valeurs ne se touchent pas (8,8 par signe).
 */
const barre = (segments: { nom: string; parts: number; valeur: string }[], total: string, unePart: string) => {
  const somme = segments.reduce((s, x) => s + x.parts, 0);
  const x0 = 10;
  const u = 260 / somme;
  const debuts = segments.map((_, i) => segments.slice(0, i).reduce((s, x) => s + x.parts, 0));
  const y = total ? 30 : 6;
  const H = y + (unePart ? 86 : 60);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg
        viewBox={`0 0 280 ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Une barre de ${somme} parts égales${total ? ", " + total : ""} : ${segments.map((s) => `${s.nom}, ${s.parts} parts${s.valeur ? ", " + s.valeur : ""}`).join(" ; ")}.${unePart ? " Une part vaut " + unePart + "." : ""}`}
      >
        {total && (
          <>
            <text x={140} y={15} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
              {total}
            </text>
            <path d={`M ${x0} 28 V 22 H ${x0 + 260} V 28`} fill="none" stroke="#475569" strokeWidth={1.5} />
          </>
        )}
        {segments.map((s, i) => {
          const x = x0 + debuts[i] * u;
          const w = s.parts * u;
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={34} fill={COULEURS[i]} />
              {Array.from({ length: s.parts - 1 }, (_, k) => (
                <line key={k} x1={x + (k + 1) * u} x2={x + (k + 1) * u} y1={y} y2={y + 34} stroke="#fff" strokeWidth={1.5} strokeDasharray="3 2" />
              ))}
              <text x={x + w / 2} y={y + 22} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">
                {s.nom}
              </text>
              <text x={x + w / 2} y={y + 54} textAnchor="middle" fontSize={14} fontWeight={700} fill={COULEURS[i]}>
                {s.valeur}
              </text>
            </g>
          );
        })}
        {segments.slice(1).map((_, i) => (
          <line key={i} x1={x0 + debuts[i + 1] * u} x2={x0 + debuts[i + 1] * u} y1={y} y2={y + 34} stroke={ENCRE} strokeWidth={2} />
        ))}
        <rect x={x0} y={y} width={260} height={34} fill="none" stroke={ENCRE} strokeWidth={1.5} />
        {unePart && (
          <text x={140} y={y + 78} textAnchor="middle" fontSize={14} fill="#334155">
            {`1 part = ${unePart}`}
          </text>
        )}
      </svg>
    </div>
  );
};

/**
 * LES BARRES COMPARÉES (le dessin des défis). Une barre par quantité, le nom à
 * gauche (colonne de 84), des parts TOUTES de même longueur : la plus longue
 * barre occupe 200 unités. La valeur s'écrit dans la barre si elle y tient,
 * sinon juste après. `ecart` (vide : rien) : une accolade sous les barres, de la
 * fin de la plus courte à la fin de la plus longue. `unePart` (vide : rien) :
 * « 1 part = … » en bas.
 * ⚠️ Le script vérifie : valeur = parts × une part, écart = (parts de la plus
 * longue − parts de la plus courte) × une part, et tout tient dans 300.
 */
const comparer = (lignes: { nom: string; parts: number; valeur: string }[], unePart: string, ecart: string) => {
  const max = Math.max(...lignes.map((l) => l.parts));
  const min = Math.min(...lignes.map((l) => l.parts));
  const [x0, W] = [90, 200];
  const u = W / max;
  const yBas = 6 + lignes.length * 42;
  const H = yBas + (ecart ? 30 : 0) + (unePart ? 22 : 4);
  const [xa, xb] = [x0 + min * u, x0 + max * u];
  const xEcart = Math.min(296 - (`écart : ${ecart}`.length * 8.8) / 2, Math.max(4 + (`écart : ${ecart}`.length * 8.8) / 2, (xa + xb) / 2));
  return (
    <div className="mx-auto w-full max-w-[21rem] print:max-w-[15rem]">
      <svg
        viewBox={`0 0 300 ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Des barres de parts égales : ${lignes.map((l) => `${l.nom}, ${l.parts} parts, ${l.valeur}`).join(" ; ")}.${ecart ? " Écart : " + ecart + "." : ""}${unePart ? " Une part vaut " + unePart + "." : ""}`}
      >
        {lignes.map((l, i) => {
          const y = 6 + i * 42;
          const w = l.parts * u;
          const dedans = l.valeur.length * 8.8 + 8 <= w;
          return (
            <g key={i}>
              <text x={84} y={y + 20} textAnchor="end" fontSize={14} fontWeight={700} fill={ENCRE}>
                {l.nom}
              </text>
              <rect x={x0} y={y} width={w} height={30} fill={COULEURS[i]} />
              {Array.from({ length: l.parts - 1 }, (_, k) => (
                <line key={k} x1={x0 + (k + 1) * u} x2={x0 + (k + 1) * u} y1={y} y2={y + 30} stroke="#fff" strokeWidth={1.5} strokeDasharray="3 2" />
              ))}
              <rect x={x0} y={y} width={w} height={30} fill="none" stroke={ENCRE} strokeWidth={1.5} />
              <text x={dedans ? x0 + w / 2 : x0 + w + 6} y={y + 20} textAnchor={dedans ? "middle" : "start"} fontSize={14} fontWeight={700} fill={dedans ? "#fff" : ENCRE}>
                {l.valeur}
              </text>
            </g>
          );
        })}
        {ecart && (
          <>
            <line x1={xa} x2={xa} y1={6} y2={yBas} stroke="#64748b" strokeWidth={1} strokeDasharray="3 3" />
            <path d={`M ${xa} ${yBas - 2} V ${yBas + 4} H ${xb} V ${yBas - 2}`} fill="none" stroke="#b91c1c" strokeWidth={2} />
            <text x={xEcart} y={yBas + 22} textAnchor="middle" fontSize={14} fontWeight={700} fill="#b91c1c">
              {`écart : ${ecart}`}
            </text>
          </>
        )}
        {unePart && (
          <text x={150} y={H - 6} textAnchor="middle" fontSize={14} fill="#334155">
            {`1 part = ${unePart}`}
          </text>
        )}
      </svg>
    </div>
  );
};

/**
 * DES RECTANGLES À L'ÉCHELLE, côte à côte, posés sur la même ligne : `L` et `l`
 * sont la longueur et la largeur (même unité pour tous), `nom` est écrit dedans,
 * `texte` dessous. ⚠️ Le script relit L et l.
 */
const rectangles = (liste: { nom: string; L: number; l: number; texte: string }[]) => {
  const ecart = 14;
  const k = (288 - ecart * (liste.length - 1)) / liste.reduce((s, r) => s + r.L, 0);
  const hmax = Math.max(...liste.map((r) => r.l)) * k;
  const base = 6 + hmax;
  let x = 6;
  const places = liste.map((r) => {
    const p = x;
    x += r.L * k + ecart;
    return p;
  });
  return (
    <div className="mx-auto w-full max-w-[21rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${base + 26}`} className="block h-auto w-full" role="img" aria-label={`Des rectangles à l'échelle : ${liste.map((r) => `${r.nom}, ${r.texte}`).join(" ; ")}.`}>
        {liste.map((r, i) => {
          const [w, h] = [r.L * k, r.l * k];
          return (
            <g key={i}>
              <rect x={places[i]} y={base - h} width={w} height={h} fill="#dbeafe" stroke={COULEURS[0]} strokeWidth={2} />
              <text x={places[i] + w / 2} y={base - h / 2 + 5} textAnchor="middle" fontSize={15} fontWeight={800} fill={COULEURS[0]}>
                {r.nom}
              </text>
              <text x={places[i] + w / 2} y={base + 19} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
                {r.texte}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * LE PLATEAU ET LE PIGNON d'un vélo, à l'échelle : le rayon est proportionnel
 * au nombre de dents, et chaque roue dentée a un créneau par dent. La chaîne les
 * relie. ⚠️ Le plateau est le plus grand ; le script relit les deux nombres.
 */
const engrenages = (plateau: number, pignon: number) => {
  const k = 1.1;
  const [R, r] = [plateau * k, pignon * k];
  const cy = R + 9;
  const [c1, c2] = [12 + R, 288 - Math.max(r, 34)];
  const roue = (cx: number, ray: number, dents: number, couleur: string) => {
    const pas = (2 * Math.PI * ray) / (2 * dents);
    return (
      <g>
        <circle cx={cx} cy={cy} r={ray} fill="none" stroke={couleur} strokeWidth={6} strokeDasharray={`${pas.toFixed(3)} ${pas.toFixed(3)}`} />
        <circle cx={cx} cy={cy} r={ray - 3} fill="#f8fafc" stroke={couleur} strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={4} fill={couleur} />
      </g>
    );
  };
  return (
    <div className="mx-auto w-full max-w-[21rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${cy + R + 48}`} className="block h-auto w-full" role="img" aria-label={`Un plateau de ${plateau} dents relié par la chaîne à un pignon de ${pignon} dents, dessinés à l'échelle.`}>
        <line x1={c1} y1={cy - R - 3} x2={c2} y2={cy - r - 3} stroke="#475569" strokeWidth={2.5} />
        <line x1={c1} y1={cy + R + 3} x2={c2} y2={cy + r + 3} stroke="#475569" strokeWidth={2.5} />
        {roue(c1, R, plateau, COULEURS[0])}
        {roue(c2, r, pignon, COULEURS[1])}
        {[
          [c1, "plateau", `${plateau} dents`, COULEURS[0]],
          [c2, "pignon", `${pignon} dents`, COULEURS[1]],
        ].map(([x, nom, dents, couleur]) => (
          <g key={String(nom)}>
            <text x={Number(x)} y={cy + R + 22} textAnchor="middle" fontSize={14} fontWeight={700} fill={String(couleur)}>
              {nom}
            </text>
            <text x={Number(x)} y={cy + R + 40} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
              {dents}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Les parts et les quantités (le tableau de l'étalon) : deux lignes, la flèche
 * « ↓ × valeur d'une part ». Une case qui commence par « ! » est une case
 * TROUVÉE, écrite en rouge.
 * ⛔ Sur TÉLÉPHONE (sous `sm`), le tableau est COUCHÉ : deux colonnes, une ligne
 * par paire, la flèche « → × … » dessous — rien ne défile à 375 px.
 * ⚠️ Texte NU dans les cases : elles ne traversent pas KaTeX.
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
  const titre = (texte: string) => <th className="whitespace-nowrap border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">{texte}</th>;
  return (
    <>
      <div className="sm:hidden print:hidden">
        <table className="mx-auto border-collapse text-sm">
          <thead>
            <tr>
              {titre(titres[0])}
              {titre(titres[1])}
            </tr>
          </thead>
          <tbody>
            {haut.map((h, i) => (
              <tr key={i}>
                {cellule(h, 0)}
                {cellule(bas[i], 1)}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-1 text-center text-sm font-bold text-blue-700">→ × {coef}</p>
      </div>
      <div className="hidden sm:block print:block">
        <table className="mx-auto border-collapse text-sm">
          <tbody>
            <tr>
              {titre(titres[0])}
              {haut.map(cellule)}
              <td rowSpan={2} className="whitespace-nowrap pl-2 text-center font-bold text-blue-700">
                ↓ × {coef}
              </td>
            </tr>
            <tr>
              {titre(titres[1])}
              {bas.map(cellule)}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

/** Un tableau à plusieurs lignes. ⛔ Trois colonnes courtes au plus. */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

export const exercicesRatio4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "prop-ratio",
  titre: "Ratios : simplifier, partager, enchaîner",
  accroche:
    "Vingt exercices, du geste seul au problème : écrire et simplifier un ratio, le traduire par une égalité de quotients, utiliser un ratio à trois termes, partager une quantité en deux ou trois parts, retrouver les parts à partir d'un écart, enchaîner deux ratios. Un triathlon, des flamants et des hérons, une prairie fleurie, le braquet d'un vélo, l'eau et ses atomes. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la barre des parts dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/prop-ratio", titre: "Ratios" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je cherche d'abord la valeur d'une part.",
      rappel: [
        "Un ratio compare des quantités, parts contre parts : $3 : 2$ veut dire « 3 parts pour 2 parts ». L'ordre des nombres compte.",
        "Je simplifie un ratio comme une fraction : je DIVISE tous ses nombres par un même nombre. Jamais de soustraction.",
        "$a$ et $b$ sont dans le ratio $2 : 3$ quand $\\dfrac{a}{2} = \\dfrac{b}{3}$. Ce quotient commun est la valeur d'UNE part. À trois termes : $\\dfrac{a}{2} = \\dfrac{b}{3} = \\dfrac{c}{7}$.",
        "Partager selon un ratio : j'additionne les parts, je divise la quantité par ce nombre de parts, puis je multiplie par les parts de chacun.",
      ],
      exercices: [
        {
          enonce: "Cette saison, une équipe de volley a gagné $24$ matchs et en a perdu $16$.\na) Écris le ratio gagnés : perdus, puis simplifie-le.\nb) Écris le ratio perdus : gagnés.\nc) Écris le ratio gagnés : joués, simplifié.",
          correction:
            "a) J'écris les nombres dans l'ordre demandé, les matchs gagnés d'abord : $24 : 16$.\nJe cherche le plus grand nombre qui divise $24$ et $16$ : c'est $8$.\n$24 \\div 8 = 3$ et $16 \\div 8 = 2$. Le ratio simplifié est $3 : 2$.\nb) L'ordre change, le ratio aussi : perdus : gagnés $= 2 : 3$.\nc) L'équipe a joué $24 + 16 = 40$ matchs. Gagnés : joués $= 24 : 40$ ; en divisant par $8$, c'est $3 : 5$.\n⭐ Sur la barre : $5$ parts de $8$ matchs, $3$ parts gagnées et $2$ perdues.\n⛔ Le piège : simplifier en SOUSTRAYANT. Enlever $14$ aux deux nombres donne $10 : 2$, soit $5$ victoires pour $1$ défaite : ce n'est plus la même équipe.\nRéponse : a) $3 : 2$ ; b) $2 : 3$ ; c) $3 : 5$.",
          schema: barre([{ nom: "gagnés", parts: 3, valeur: "24" }, { nom: "perdus", parts: 2, valeur: "16" }], "40 matchs", "8 matchs"),
          micros: ["prop_rapport"],
        },
        {
          enonce: "Simplifie chaque ratio : écris-le avec les plus petits nombres entiers possibles.\na) $18 : 42$\nb) $2{,}4 : 3$\nc) Pendant une sortie à vélo, il y a eu $45$ min de pause pour $2$ h de route. Écris le ratio pause : route.",
          correction:
            "a) $18$ et $42$ se divisent tous les deux par $6$. $18 \\div 6 = 3$ et $42 \\div 6 = 7$. Le ratio est $3 : 7$.\nb) Pour enlever la virgule, je multiplie les DEUX nombres par $10$ : $2{,}4 \\times 10 = 24$ et $3 \\times 10 = 30$. Puis je divise par $6$ : $24 : 30 = 4 : 5$.\nc) D'abord la même unité : $2$ h, c'est $2 \\times 60 = 120$ min. Le ratio est $45 : 120$, et en divisant par $15$, $45 : 120 = 3 : 8$.\n⛔ Le piège du c) : écrire $45 : 2$. Des minutes contre des heures, ce n'est pas un ratio : les deux nombres doivent être dans la même unité.\nRéponse : a) $3 : 7$ ; b) $4 : 5$ ; c) $3 : 8$.",
          schema: ecranSeulement(
            table(["ratio", "on fait", "simplifié"], [
              ["18 : 42", "÷ 6", "3 : 7"],
              ["2,4 : 3", "× 10 puis ÷ 6", "4 : 5"],
              ["45 : 120", "÷ 15", "3 : 8"],
            ]),
          ),
          micros: ["prop_rapport"],
        },
        {
          enonce: "Les nombres $m$ et $n$ sont dans le ratio $4 : 7$.\na) Écris l'égalité de quotients qui traduit ce ratio.\nb) On sait que $m = 28$. Calcule $n$.\nc) Cette fois, $n = 21$. Calcule $m$.",
          correction:
            "a) Chaque nombre divisé par SA part donne le même quotient : $\\dfrac{m}{4} = \\dfrac{n}{7}$. Ce quotient, c'est la valeur d'une part.\nb) $\\dfrac{28}{4} = 7$ : une part vaut $7$. $n$ compte $7$ parts : $n = 7 \\times 7 = 49$.\nc) $\\dfrac{21}{7} = 3$ : une part vaut $3$. $m$ compte $4$ parts : $m = 4 \\times 3 = 12$.\n⭐ Contrôle du b) : $\\dfrac{49}{7} = 7$, le même quotient que $\\dfrac{28}{4}$.\n⛔ Le piège : diviser par la part de l'AUTRE nombre, $\\dfrac{28}{7} = 4$, puis $n = 7 \\times 4 = 28$. Chaque nombre se divise par SA part : $m$ par $4$, $n$ par $7$.\nRéponse : a) $\\dfrac{m}{4} = \\dfrac{n}{7}$ ; b) $n = 49$ ; c) $m = 12$.",
          schema: ecranSeulement(tableauParts(["parts", "nombres"], ["4", "7"], ["28", "!49"], "7")),
          micros: ["prop_ratio_quotients"],
        },
        {
          enonce: "Un club commande des drapeaux. Ils doivent respecter le ratio longueur : largeur $= 3 : 2$. Voici trois modèles, dessinés à l'échelle.\na) $90$ cm sur $60$ cm.\nb) $120$ cm sur $75$ cm.\nc) $1{,}5$ m sur $1$ m.\nLesquels respectent le ratio ? Justifie avec l'égalité de quotients.",
          figure: rectangles([
            { nom: "a", L: 90, l: 60, texte: "90 × 60" },
            { nom: "b", L: 120, l: 75, texte: "120 × 75" },
            { nom: "c", L: 150, l: 100, texte: "1,5 m × 1 m" },
          ]),
          correction:
            "Respecter le ratio $3 : 2$, c'est : la longueur divisée par $3$ égale la largeur divisée par $2$.\na) $90 \\div 3 = 30$ et $60 \\div 2 = 30$. Les quotients sont égaux : oui.\nb) $120 \\div 3 = 40$ mais $75 \\div 2 = 37{,}5$. Ils sont différents : non. Il faudrait une largeur de $2 \\times 40 = 80$ cm.\nc) $1{,}5 \\div 3 = 0{,}5$ et $1 \\div 2 = 0{,}5$. Égaux : oui. Les mètres ne changent rien, tant que les deux longueurs sont dans la même unité.\n⛔ Le piège : diviser la longueur par $2$ et la largeur par $3$. On trouve $45$ et $20$ pour le a), et on le rejette à tort. La longueur va avec le $3$, la largeur avec le $2$.\nRéponse : a) et c) respectent le ratio, pas b).",
          schema: ecranSeulement(
            table(["modèle", "longueur ÷ 3", "largeur ÷ 2"], [
              ["a", "30", "30"],
              ["b", "40", "37,5"],
              ["c", "0,5", "0,5"],
            ]),
          ),
          micros: ["prop_ratio_quotients", "prop_rapport"],
        },
        {
          enonce: "Un sachet de perles pour fabriquer des bracelets contient des perles en bois, en verre et en métal, dans le ratio bois : verre : métal $= 2 : 3 : 5$. Il contient $300$ perles en verre.\nCombien de perles en bois et en métal contient-il ? Combien de perles en tout ?",
          figure: barre([{ nom: "bois", parts: 2, valeur: "?" }, { nom: "verre", parts: 3, valeur: "300" }, { nom: "métal", parts: 5, valeur: "?" }], "?", "?"),
          correction:
            "Le ratio à trois termes se traduit par trois quotients égaux : le nombre de perles en bois divisé par $2$, en verre par $3$, en métal par $5$.\nLe verre est connu : $300 \\div 3 = 100$. Une part vaut $100$ perles.\nBois : $2 \\times 100 = 200$ perles. Métal : $5 \\times 100 = 500$ perles.\nEn tout : $200 + 300 + 500 = 1\\,000$ perles. Ce sont bien $2 + 3 + 5 = 10$ parts de $100$.\n⛔ Le piège : croire qu'il faut connaître le nombre total pour commencer. Une seule quantité connue suffit : elle donne la valeur d'une part, et tout le reste.\nRéponse : $200$ perles en bois, $500$ en métal ; $1\\,000$ perles en tout.",
          schema: ecranSeulement(barre([{ nom: "bois", parts: 2, valeur: "200" }, { nom: "verre", parts: 3, valeur: "300" }, { nom: "métal", parts: 5, valeur: "500" }], "1 000 perles", "100 perles")),
          micros: ["prop_ratio_trois", "prop_ratio_quotients"],
        },
        {
          enonce: "Un club de sport reçoit une aide de $1\\,400$ €. Il la partage entre sa section football et sa section judo, selon le ratio football : judo $= 4 : 3$.\nCombien reçoit chaque section ?",
          figure: barre([{ nom: "football", parts: 4, valeur: "?" }, { nom: "judo", parts: 3, valeur: "?" }], "1 400 €", "?"),
          correction:
            "Je compte les parts : $4 + 3 = 7$ parts.\nUne part vaut $1\\,400 \\div 7 = 200$ €.\nFootball : $4 \\times 200 = 800$ €. Judo : $3 \\times 200 = 600$ €.\n⭐ Contrôle : $800 + 600 = 1\\,400$, et $\\dfrac{800}{4} = \\dfrac{600}{3} = 200$.\n⛔ Le piège : diviser par $2$ parce qu'il y a deux sections. $700$ € chacune, c'est le ratio $1 : 1$, pas $4 : 3$.\nRéponse : $800$ € pour le football, $600$ € pour le judo.",
          schema: ecranSeulement(barre([{ nom: "football", parts: 4, valeur: "800 €" }, { nom: "judo", parts: 3, valeur: "600 €" }], "1 400 €", "200 €")),
          micros: ["prop_ratio_partager"],
        },
        {
          enonce: "Un orchestre compte $72$ musiciens. Ils se répartissent en cordes, cuivres et bois selon le ratio cordes : cuivres : bois $= 4 : 3 : 2$.\nCombien y a-t-il de musiciens dans chaque famille d'instruments ?",
          correction:
            "Je compte les parts : $4 + 3 + 2 = 9$ parts.\nUne part vaut $72 \\div 9 = 8$ musiciens.\nCordes : $4 \\times 8 = 32$. Cuivres : $3 \\times 8 = 24$. Bois : $2 \\times 8 = 16$.\n⭐ Contrôle : $32 + 24 + 16 = 72$.\n⛔ Le piège : diviser par $3$ parce qu'il y a trois familles. $24$ musiciens chacune, ce n'est juste que pour les cuivres : il y aurait trop de bois et pas assez de cordes.\nRéponse : $32$ cordes, $24$ cuivres et $16$ bois.",
          schema: ecranSeulement(barre([{ nom: "cordes", parts: 4, valeur: "32" }, { nom: "cuivres", parts: 3, valeur: "24" }, { nom: "bois", parts: 2, valeur: "16" }], "72 musiciens", "8 musiciens")),
          micros: ["prop_ratio_partager", "prop_ratio_trois"],
        },
        {
          enonce: "Pour rempoter ses plantes, Nina mélange du terreau et du sable dans le ratio terreau : sable $= 3 : 2$, en volume.\na) Elle a $45$ L de terreau. Quel volume de sable doit-elle ajouter ?\nb) Pour $100$ L de mélange en tout, quel volume de chaque faut-il ?",
          correction:
            "a) Le terreau fait $3$ parts : une part vaut $45 \\div 3 = 15$ L. Le sable fait $2$ parts : $2 \\times 15 = 30$ L.\nb) Les $100$ L sont partagés en $3 + 2 = 5$ parts. Une part vaut $100 \\div 5 = 20$ L.\nTerreau : $3 \\times 20 = 60$ L. Sable : $2 \\times 20 = 40$ L.\n⛔ Le piège du a) : diviser $45$ par $2$, la part du sable, et trouver $22{,}5$ L. Le terreau se divise par SA part, $3$, pour avoir une part.\nRéponse : a) $30$ L de sable ; b) $60$ L de terreau et $40$ L de sable.",
          schema: ecranSeulement(barre([{ nom: "terreau", parts: 3, valeur: "60 L" }, { nom: "sable", parts: 2, valeur: "40 L" }], "100 L", "20 L")),
          micros: ["prop_rapport", "prop_ratio_partager"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. Je justifie chaque réponse par un calcul, et je contrôle à la fin.",
      rappel: [
        "Pour enlever une virgule d'un ratio, je multiplie TOUS ses nombres par le même nombre : $1{,}5 : 4$ devient $15 : 40$, puis $3 : 8$.",
        "Un écart entre deux quantités vaut un nombre de parts : la différence des deux nombres du ratio.",
        "Si une quantité ne bouge pas, c'est elle qui donne la valeur d'une part dans le nouveau ratio.",
        "Pour enchaîner $a : b$ et $b : c$, je donne à $b$ le même nombre de parts dans les deux ratios.",
      ],
      exercices: [
        {
          enonce: "Au triathlon, on enchaîne natation, vélo et course à pied. Le tableau donne les distances de deux formats officiels.\na) Écris le ratio natation : vélo : course du format olympique avec des nombres entiers, le plus simple possible.\nb) Le format sprint respecte-t-il le même ratio ? Justifie avec des quotients.\nc) Un triathlon longue distance fait environ $3{,}8$ km de natation, $180$ km de vélo et $42{,}2$ km de course. Respecte-t-il ce ratio ?",
          figure: table(["épreuve", "olympique", "sprint"], [
            ["natation (km)", "1,5", "0,75"],
            ["vélo (km)", "40", "20"],
            ["course (km)", "10", "5"],
          ]),
          correction:
            "a) J'écris $1{,}5 : 40 : 10$. Pour enlever la virgule, je multiplie les TROIS nombres par $2$ : $3 : 80 : 20$. Aucun nombre plus grand que $1$ ne divise à la fois $3$, $80$ et $20$ : c'est le plus simple.\nb) Je divise chaque distance du sprint par sa part : $0{,}75 \\div 3 = 0{,}25$ ; $20 \\div 80 = 0{,}25$ ; $5 \\div 20 = 0{,}25$. Les trois quotients sont égaux : oui, c'est le même ratio. Le sprint est la moitié de l'olympique.\nc) $3{,}8 \\div 3 \\approx 1{,}27$ et $180 \\div 80 = 2{,}25$. Deux quotients différents suffisent : non. Le vélo y prend beaucoup plus de place.\n⛔ Le piège : multiplier seulement $1{,}5$ par $2$ et écrire $3 : 40 : 10$. Pour garder un ratio, on multiplie TOUS ses nombres par le même nombre.\nRéponse : a) $3 : 80 : 20$ ; b) oui ; c) non.",
          schema: ecranSeulement(
            table(["distance ÷ part", "olympique", "sprint"], [
              ["natation ÷ 3", "0,5", "0,25"],
              ["vélo ÷ 80", "0,5", "0,25"],
              ["course ÷ 20", "0,5", "0,25"],
            ]),
          ),
          micros: ["prop_ratio_trois", "prop_ratio_quotients"],
        },
        {
          enonce: "Dans une réserve naturelle, le ratio flamants : hérons est $7 : 4$. Les ornithologues comptent $27$ flamants de plus que de hérons.\na) Combien de parts cet écart représente-t-il ?\nb) Combien y a-t-il de flamants ? De hérons ? D'oiseaux de ces deux espèces en tout ?",
          figure: comparer([{ nom: "flamants", parts: 7, valeur: "?" }, { nom: "hérons", parts: 4, valeur: "?" }], "", "27"),
          correction:
            "a) Les flamants ont $7$ parts, les hérons $4$ : l'écart est de $7 - 4 = 3$ parts.\nb) Ces $3$ parts valent $27$ oiseaux : une part vaut $27 \\div 3 = 9$.\nFlamants : $7 \\times 9 = 63$. Hérons : $4 \\times 9 = 36$. En tout : $63 + 36 = 99$ oiseaux.\n⭐ Contrôle : $63 - 36 = 27$, et $\\dfrac{63}{7} = \\dfrac{36}{4} = 9$.\n⛔ Le piège : prendre $27$ pour le nombre de hérons, ou diviser $27$ par $7$. L'écart n'est aucune des deux quantités : c'est un nombre de PARTS, ici $3$.\nRéponse : a) $3$ parts ; b) $63$ flamants, $36$ hérons, $99$ oiseaux.",
          schema: ecranSeulement(comparer([{ nom: "flamants", parts: 7, valeur: "63" }, { nom: "hérons", parts: 4, valeur: "36" }], "9", "27")),
          micros: ["prop_ratio_defi", "prop_ratio_partager"],
        },
        {
          enonce: "Deux maraîchers louent ensemble un tracteur pour la saison : $1\\,200$ €. Paul l'utilise $15$ jours, Anne $25$ jours. Ils partagent le prix selon le ratio de leurs jours d'utilisation.\na) Écris le ratio Paul : Anne, et simplifie-le.\nb) Combien paie chacun ?",
          correction:
            "a) Paul : Anne $= 15 : 25$. Je divise les deux nombres par $5$ : $15 : 25 = 3 : 5$.\nb) $3 + 5 = 8$ parts. Une part vaut $1\\,200 \\div 8 = 150$ €.\nPaul : $3 \\times 150 = 450$ €. Anne : $5 \\times 150 = 750$ €.\n⭐ Contrôle : $450 + 750 = 1\\,200$. Autre chemin : le tracteur a servi $15 + 25 = 40$ jours, un jour coûte $1\\,200 \\div 40 = 30$ €, et $15 \\times 30 = 450$.\n⛔ Le piège : partager selon $25 : 15$, dans le mauvais ordre. Paul paierait $750$ € pour $15$ jours : la part d'Anne.\nRéponse : a) $3 : 5$ ; b) Paul paie $450$ €, Anne $750$ €.",
          schema: ecranSeulement(barre([{ nom: "Paul", parts: 3, valeur: "450 €" }, { nom: "Anne", parts: 5, valeur: "750 €" }], "1 200 €", "150 €")),
          micros: ["prop_rapport", "prop_ratio_partager"],
        },
        {
          enonce: "Pour un bon compost, un jardinier vise le ratio matières brunes : matières vertes $= 2 : 1$ (feuilles mortes et carton d'un côté, épluchures et tonte de l'autre ; chiffres d'un modèle). Dans son bac, il y a $30$ L de matières brunes et $24$ L de matières vertes.\na) Écris le ratio brunes : vertes de son bac, simplifié.\nb) Il n'enlève rien. Combien de litres de matières brunes doit-il ajouter pour atteindre le ratio $2 : 1$ ?",
          figure: comparer([{ nom: "brunes", parts: 5, valeur: "30 L" }, { nom: "vertes", parts: 4, valeur: "24 L" }], "6 L", ""),
          correction:
            "a) $30 : 24$ ; je divise par $6$ : $30 : 24 = 5 : 4$. Il y a trop peu de matières brunes : il en faudrait deux fois plus que de vertes.\nb) Les matières vertes ne bougent pas : $24$ L. Dans le ratio $2 : 1$, elles font $1$ part : la nouvelle part vaut $24$ L.\nLes brunes doivent faire $2$ parts : $2 \\times 24 = 48$ L. Il en a $30$ : il doit en ajouter $48 - 30 = 18$ L.\n⭐ Contrôle : $48 : 24 = 2 : 1$.\n⛔ Le piège : garder l'ancienne part de $6$ L. Elle valait pour le ratio $5 : 4$. La quantité qui ne bouge pas, les vertes, fixe la NOUVELLE valeur d'une part.\nRéponse : a) $5 : 4$ ; b) il doit ajouter $18$ L de matières brunes.",
          schema: ecranSeulement(comparer([{ nom: "brunes", parts: 2, valeur: "48 L" }, { nom: "vertes", parts: 1, valeur: "24 L" }], "24 L", "")),
          micros: ["prop_ratio_defi", "prop_rapport"],
        },
        {
          enonce: "a) Les nombres $x$ et $y$ sont dans le ratio $3 : 8$, et $x + y = 66$. Calcule $x$ et $y$.\nb) Les nombres $a$ et $b$ sont dans le ratio $5 : 2$, et $a - b = 21$. Calcule $a$ et $b$.",
          correction:
            "Dans les deux cas, j'écris l'égalité de quotients, puis je cherche la valeur d'une part.\na) $\\dfrac{x}{3} = \\dfrac{y}{8}$. La somme $x + y$ compte $3 + 8 = 11$ parts. Une part vaut $66 \\div 11 = 6$.\n$x = 3 \\times 6 = 18$ et $y = 8 \\times 6 = 48$. Contrôle : $18 + 48 = 66$.\nb) $\\dfrac{a}{5} = \\dfrac{b}{2}$. La différence $a - b$ compte $5 - 2 = 3$ parts. Une part vaut $21 \\div 3 = 7$.\n$a = 5 \\times 7 = 35$ et $b = 2 \\times 7 = 14$. Contrôle : $35 - 14 = 21$.\n⛔ Le piège du b) : diviser $21$ par $5 + 2 = 7$. Une différence ne compte pas toutes les parts, seulement celles qui dépassent : $5 - 2 = 3$.\nRéponse : a) $x = 18$ et $y = 48$ ; b) $a = 35$ et $b = 14$.",
          schema: ecranSeulement(
            deux(
              barre([{ nom: "x", parts: 3, valeur: "18" }, { nom: "y", parts: 8, valeur: "48" }], "66", "6"),
              comparer([{ nom: "a", parts: 5, valeur: "35" }, { nom: "b", parts: 2, valeur: "14" }], "7", "21"),
            ),
          ),
          micros: ["prop_ratio_quotients", "prop_ratio_defi"],
        },
        {
          enonce: "Une ferme cultive $12$ ha de blé, $8$ ha de maïs et $20$ ha de prairie.\na) Écris le ratio blé : maïs : prairie, et simplifie-le.\nb) La ferme s'agrandit : elle a maintenant $50$ ha en tout, toujours dans le même ratio. Combien d'hectares de chaque culture ?\nc) De combien d'hectares la prairie a-t-elle grandi ?",
          correction:
            "a) $12 : 8 : 20$. Les trois nombres se divisent par $4$ : $3 : 2 : 5$.\nb) $3 + 2 + 5 = 10$ parts pour $50$ ha : une part vaut $50 \\div 10 = 5$ ha.\nBlé : $3 \\times 5 = 15$ ha. Maïs : $2 \\times 5 = 10$ ha. Prairie : $5 \\times 5 = 25$ ha.\n⭐ Contrôle : $15 + 10 + 25 = 50$.\nc) $25 - 20 = 5$ ha de plus.\n⛔ Le piège : donner les $10$ ha nouveaux à une seule culture, ou les partager en trois. Pour garder le ratio, chaque culture grandit selon SES parts : $3$, $2$ et $5$ ha de plus.\nRéponse : a) $3 : 2 : 5$ ; b) $15$ ha de blé, $10$ ha de maïs, $25$ ha de prairie ; c) $5$ ha.",
          schema: ecranSeulement(barre([{ nom: "blé", parts: 3, valeur: "15 ha" }, { nom: "maïs", parts: 2, valeur: "10 ha" }, { nom: "prairie", parts: 5, valeur: "25 ha" }], "50 ha", "5 ha")),
          micros: ["prop_ratio_trois", "prop_ratio_partager"],
        },
        {
          enonce: "Une mosaïque est faite de carreaux bleus, blancs et verts. Le ratio bleus : blancs est $2 : 3$, et le ratio blancs : verts est $4 : 5$.\na) Écris le ratio bleus : blancs : verts avec des nombres entiers.\nb) La mosaïque compte $96$ carreaux blancs. Combien de carreaux bleus et de carreaux verts ?",
          correction:
            "a) Les blancs sont dans les deux ratios, mais ils valent $3$ parts dans le premier et $4$ dans le second. Je les ramène au même nombre de parts : $12$, un multiple de $3$ et de $4$.\nPremier ratio, tout multiplié par $4$ : $2 : 3 = 8 : 12$. Second ratio, tout multiplié par $3$ : $4 : 5 = 12 : 15$.\nJ'assemble : bleus : blancs : verts $= 8 : 12 : 15$.\nb) Les blancs font $12$ parts : une part vaut $96 \\div 12 = 8$ carreaux.\nBleus : $8 \\times 8 = 64$. Verts : $15 \\times 8 = 120$.\n⛔ Le piège : recoller les deux ratios tels quels, $2 : 3 : 5$. Les blancs y vaudraient $3$ parts d'un côté et $4$ de l'autre : ce ne sont pas les mêmes parts.\nRéponse : a) $8 : 12 : 15$ ; b) $64$ carreaux bleus et $120$ carreaux verts.",
          schema: ecranSeulement(
            table(["carreaux", "ratio 1, × 4", "ratio 2, × 3"], [
              ["bleus", "8", "—"],
              ["blancs", "12", "12"],
              ["verts", "—", "15"],
            ]),
          ),
          micros: ["prop_ratio_defi", "prop_ratio_trois"],
        },
        {
          enonce: "Pour un thé glacé, Léo mélange du thé concentré et de l'eau dans le ratio thé : eau $= 2 : 7$. Mia utilise le ratio $3 : 10$.\na) Lequel des deux thés glacés a le goût de thé le plus fort ? Justifie.\nb) Tom dit : « Celui de Léo, car l'écart est plus petit : $7 - 2 = 5$ contre $10 - 3 = 7$. » Pourquoi a-t-il tort ?",
          figure: deux(
            barre([{ nom: "thé", parts: 2, valeur: "" }, { nom: "eau", parts: 7, valeur: "" }], "Léo", ""),
            barre([{ nom: "thé", parts: 3, valeur: "" }, { nom: "eau", parts: 10, valeur: "" }], "Mia", ""),
          ),
          correction:
            "a) Pour comparer, je ramène les deux mélanges à la même quantité de thé : $6$ parts, un multiple de $2$ et de $3$.\nLéo : $2 : 7 = 6 : 21$. Mia : $3 : 10 = 6 : 20$.\nPour autant de thé, Mia met moins d'eau : son thé glacé est le plus fort.\n⭐ Autre chemin : la part de thé dans tout le mélange. Léo : $2$ parts sur $2 + 7 = 9$ ; Mia : $3$ parts sur $3 + 10 = 13$. Or $\\dfrac{2}{9} = \\dfrac{26}{117}$ et $\\dfrac{3}{13} = \\dfrac{27}{117}$ : la part de Mia est plus grande.\nb) L'écart ne dit pas la force du goût. Si Léo double son mélange, $4 : 14$, l'écart passe à $10$, et pourtant le goût ne change pas. Un ratio se compare en multipliant, pas en soustrayant.\n⛔ Le piège : comparer les écarts, comme Tom. Ou comparer seulement les quantités d'eau, $7$ et $10$, sans regarder le thé.\nRéponse : a) celui de Mia ; b) l'écart change quand on double le mélange, le goût non.",
          micros: ["prop_rapport", "prop_ratio_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je dessine les parts, puis je réponds par une phrase.",
      rappel: [
        "Je repère les quantités comparées et l'ordre du ratio, puis je cherche la valeur d'UNE part.",
        "Je contrôle : les parts redonnent le total, et chaque quantité divisée par sa part donne le même nombre.",
      ],
      exercices: [
        {
          titre: "Le braquet du vélo",
          enonce:
            "Sur un vélo, la chaîne relie le plateau (à la pédale) au pignon (à la roue arrière). Quand le plateau tourne, chacune de ses dents entraîne une dent du pignon. Ici, le plateau a $50$ dents et le pignon $20$ dents.\na) Écris le ratio plateau : pignon des nombres de dents, simplifié.\nb) Quand la pédale fait $2$ tours, combien de tours fait la roue ? Et pour $1$ tour de pédale ?\nc) À chaque tour, la roue avance de $2{,}1$ m (chiffre d'un modèle). Quelle distance le vélo parcourt-il pour un tour de pédale ?\nd) Léa pédale à $80$ tours par minute. Quelle distance parcourt-elle en une minute ? En une heure, en km ?\ne) Pour monter une côte, elle veut que la roue fasse exactement $2$ tours quand la pédale en fait $1$, avec un plateau de $34$ dents. Combien de dents faut-il au pignon ?",
          figure: engrenages(50, 20),
          correction:
            "a) $50 : 20$ ; je divise par $10$ : $50 : 20 = 5 : 2$.\nb) $2$ tours de pédale font passer $2 \\times 50 = 100$ dents. Le pignon a $20$ dents : la roue fait $100 \\div 20 = 5$ tours.\nPour $1$ tour de pédale : $5 \\div 2 = 2{,}5$ tours de roue. Le ratio pédale : roue des tours est donc $2 : 5$, à l'envers du ratio des dents. Avec les quotients : si $p$ compte les tours de pédale et $r$ ceux de la roue, $\\dfrac{p}{2} = \\dfrac{r}{5}$.\nc) $2{,}5 \\times 2{,}1 = 5{,}25$ m par tour de pédale.\nd) $80 \\times 5{,}25 = 420$ m en une minute. En une heure : $420 \\times 60 = 25\\,200$ m, soit $25{,}2$ km.\ne) La roue doit faire $2$ tours pour $1$ tour de pédale : le plateau doit avoir deux fois plus de dents que le pignon, le ratio plateau : pignon $2 : 1$. $34 \\div 2 = 17$ dents.\n⛔ Le piège du b) : croire que la roue tourne moins vite parce que le pignon est plus petit. Un tour du petit pignon demande moins de dents : il en fait PLUS.\nRéponse : a) $5 : 2$ ; b) $5$ tours, et $2{,}5$ tours pour un tour de pédale ; c) $5{,}25$ m ; d) $420$ m, et $25{,}2$ km en une heure ; e) $17$ dents.",
          micros: ["prop_rapport", "prop_ratio_quotients", "prop_ratio_defi"],
        },
        {
          titre: "La prairie fleurie",
          enonce:
            "Pour semer une prairie fleurie, une commune achète un mélange de graines : graminées, trèfles et fleurs sauvages, dans le ratio graminées : trèfles : fleurs $= 6 : 3 : 1$, en masse (chiffres d'un modèle).\na) Un sac pèse $2{,}5$ kg. Quelle masse de chaque sorte de graines contient-il ?\nb) Pour les abeilles, la commune veut plus de fleurs : le ratio $6 : 3 : 2$. Quelle masse de graines de fleurs doit-elle ajouter au sac, sans rien enlever ?\nc) Combien pèse alors le sac ? Et quelle masse de graines de fleurs contiendrait un sac de $5{,}5$ kg de ce nouveau mélange ?",
          correction:
            "a) $6 + 3 + 1 = 10$ parts pour $2{,}5$ kg : une part pèse $2{,}5 \\div 10 = 0{,}25$ kg.\nGraminées : $6 \\times 0{,}25 = 1{,}5$ kg. Trèfles : $3 \\times 0{,}25 = 0{,}75$ kg. Fleurs : $1 \\times 0{,}25 = 0{,}25$ kg.\nb) Les graminées et les trèfles ne bougent pas. Dans $6 : 3 : 2$, les graminées font encore $6$ parts : une part pèse encore $1{,}5 \\div 6 = 0{,}25$ kg.\nLes fleurs doivent faire $2$ parts : $2 \\times 0{,}25 = 0{,}5$ kg. Il y en a $0{,}25$ kg : il faut ajouter $0{,}5 - 0{,}25 = 0{,}25$ kg.\nc) $2{,}5 + 0{,}25 = 2{,}75$ kg. Le nouveau ratio compte $6 + 3 + 2 = 11$ parts. Dans un sac de $5{,}5$ kg, une part pèse $5{,}5 \\div 11 = 0{,}5$ kg, et les fleurs $2 \\times 0{,}5 = 1$ kg.\n⛔ Le piège du b) : repartager les $2{,}5$ kg en $11$ parts. Il faudrait alors ENLEVER des graminées. Ici, on ajoute seulement des fleurs : ce sont les graminées, qui ne bougent pas, qui fixent la valeur d'une part.\nRéponse : a) $1{,}5$ kg de graminées, $0{,}75$ kg de trèfles, $0{,}25$ kg de fleurs ; b) $0{,}25$ kg de fleurs ; c) $2{,}75$ kg, et $1$ kg de fleurs dans le sac de $5{,}5$ kg.",
          schema: comparer([{ nom: "graminées", parts: 6, valeur: "1,5 kg" }, { nom: "trèfles", parts: 3, valeur: "0,75 kg" }, { nom: "fleurs", parts: 1, valeur: "0,25 kg" }], "0,25 kg", ""),
          micros: ["prop_ratio_trois", "prop_ratio_partager", "prop_ratio_defi"],
        },
        {
          titre: "L'atelier de vélos",
          enonce:
            "Ana, Ben et Chloé ouvrent ensemble un atelier de réparation de vélos. Leurs apports d'argent sont dans le ratio Ana : Ben $= 3 : 4$, et Ben : Chloé $= 2 : 3$.\na) Écris le ratio Ana : Ben : Chloé avec des nombres entiers.\nb) Chloé a apporté $9\\,000$ € de plus qu'Ana. Combien chacun a-t-il apporté ?\nc) La première année, l'atelier fait $5\\,200$ € de bénéfice, partagés selon le ratio des apports. Combien reçoit chacun ?",
          correction:
            "a) Ben vaut $4$ parts dans le premier ratio et $2$ dans le second. Je multiplie le second par $2$ : $2 : 3 = 4 : 6$. Ben vaut alors $4$ parts des deux côtés.\nJ'assemble : Ana : Ben : Chloé $= 3 : 4 : 6$.\nb) Chloé a $6$ parts, Ana $3$ : l'écart est de $6 - 3 = 3$ parts, qui valent $9\\,000$ €. Une part vaut $9\\,000 \\div 3 = 3\\,000$ €.\nAna : $3 \\times 3\\,000 = 9\\,000$ €. Ben : $4 \\times 3\\,000 = 12\\,000$ €. Chloé : $6 \\times 3\\,000 = 18\\,000$ €.\n⭐ Contrôle : $18\\,000 - 9\\,000 = 9\\,000$.\nc) $3 + 4 + 6 = 13$ parts. Une part vaut $5\\,200 \\div 13 = 400$ €.\nAna : $3 \\times 400 = 1\\,200$ €. Ben : $4 \\times 400 = 1\\,600$ €. Chloé : $6 \\times 400 = 2\\,400$ €. Contrôle : $1\\,200 + 1\\,600 + 2\\,400 = 5\\,200$.\n⛔ Le piège du a) : écrire $3 : 4 : 3$, en recollant les ratios sans égaliser la part de Ben. Celui du b) : diviser $9\\,000$ par $6$, la part de Chloé. $9\\,000$ € est un ÉCART : $3$ parts.\nRéponse : a) $3 : 4 : 6$ ; b) Ana $9\\,000$ €, Ben $12\\,000$ €, Chloé $18\\,000$ € ; c) Ana $1\\,200$ €, Ben $1\\,600$ €, Chloé $2\\,400$ €.",
          schema: barre([{ nom: "Ana", parts: 3, valeur: "1 200 €" }, { nom: "Ben", parts: 4, valeur: "1 600 €" }, { nom: "Chloé", parts: 6, valeur: "2 400 €" }], "5 200 €", "400 €"),
          micros: ["prop_ratio_trois", "prop_ratio_partager", "prop_ratio_defi"],
        },
        {
          titre: "L'eau, atome par atome",
          enonce:
            "Dans l'eau, l'hydrogène et l'oxygène sont toujours dans le même ratio de masses : hydrogène : oxygène $= 1 : 8$ (en arrondissant).\na) Quelle masse d'hydrogène et quelle masse d'oxygène y a-t-il dans $900$ g d'eau ?\nb) Dans une expérience, on fait réagir $40$ g d'hydrogène avec $400$ g d'oxygène pour former de l'eau. Quelle masse d'eau obtient-on au plus ? Que reste-t-il ?\nc) Une molécule d'eau contient $2$ atomes d'hydrogène et $1$ atome d'oxygène. Combien de fois un atome d'oxygène est-il plus lourd qu'un atome d'hydrogène ?",
          correction:
            "a) $1 + 8 = 9$ parts pour $900$ g : une part pèse $900 \\div 9 = 100$ g. Hydrogène : $1$ part, $100$ g. Oxygène : $8 \\times 100 = 800$ g.\nb) Les $40$ g d'hydrogène font $1$ part : il leur faut $8 \\times 40 = 320$ g d'oxygène. On en a $400$ g : c'est assez, et il en reste $400 - 320 = 80$ g.\nL'eau formée pèse $40 + 320 = 360$ g.\nc) Dans une molécule, les deux atomes d'hydrogène pèsent ensemble $1$ part, l'atome d'oxygène $8$ parts. Un seul atome d'hydrogène pèse donc une demi-part : l'oxygène est $8 \\times 2 = 16$ fois plus lourd.\n⛔ Le piège du b) : tout additionner, $40 + 400 = 440$ g d'eau. Le ratio $1 : 8$ décide : l'hydrogène est épuisé le premier, et l'oxygène en trop ne devient pas de l'eau.\n⛔ Le piège du c) : répondre $8$. Le ratio $1 : 8$ compare DEUX atomes d'hydrogène à un atome d'oxygène.\nRéponse : a) $100$ g d'hydrogène et $800$ g d'oxygène ; b) $360$ g d'eau, et il reste $80$ g d'oxygène ; c) $16$ fois plus lourd.",
          schema: comparer([{ nom: "hydrogène", parts: 1, valeur: "100 g" }, { nom: "oxygène", parts: 8, valeur: "800 g" }], "100 g", ""),
          micros: ["prop_rapport", "prop_ratio_partager", "prop_ratio_defi"],
        },
      ],
    },
  ],
};
