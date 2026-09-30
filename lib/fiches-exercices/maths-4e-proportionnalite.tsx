// ─── Fiche d'exercices : la proportionnalité (4e) — 20 exercices corrigés ─────
//
// RÉÉCRITE le 30/09/2026 au standard de la 5e (étalon de la 4e :
// `maths-4e-relatifs.tsx`), à la demande de Frédéric : ses élèves de 4e sont sur
// ce chapitre. Un dessin qui aide dans CHAQUE exercice, 14 imprimés, aides de
// dessin locales écrites EN CLAIR et relues par le script de recalcul.
// L'ancienne feuille du 25/09 n'a servi que de réservoir ; aucun exercice n'en
// est recopié (ni toit sous la pluie, ni orage, ni Fahrenheit, ni tour de la
// Terre, ni cinéma, parking, tissu, peinture, crêpes, confiture, gazon,
// baguettes, aquarium, jus d'orange, peintres).
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-proportionnalite.tsx` et sur
// la banque `lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank.ts`,
// notionId prop_proportionnalite. Ce que la 4e ajoute à la 5e : le PRODUIT EN
// CROIX pour la quatrième proportionnelle, et la proportionnalité LUE SUR UN
// GRAPHIQUE (des points alignés avec l'origine). Pas de notation f(x) (hors
// programme de 4e), aucun pourcentage (notion `prop_ratio_pourcentage`), aucune
// échelle (notion `prop_echelle`).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni les letchis (3 kg,
// 12 €), ni le plombier (50 € + 30 €/h), ni les six bouteilles, ni 2 → 10,
// 2 → 6 / 5 → 9, ni le cycliste de 24 km, ni l'abonnement à 15 €. Ni ceux de la
// feuille de 5e (croissants, douche, ruches, voiture, piscines, kayak,
// pressoir, robinet, photos, pas de Tom, piste de 400 m, sel de mer), ni le
// taxi de la feuille de 3e.
//
// Les pièges nommés : le tableau régulier pris pour proportionnel (1, 8),
// « une droite, donc proportionnel » sans passer par l'origine (2, 12),
// diviser dans le mauvais sens (3, 11), le prix unitaire oublié (4), le
// produit en croix monté à l'envers (5), lire le graphique sur le mauvais axe
// (6), ajouter l'écart au lieu de multiplier (7), le coefficient calculé sur
// une seule colonne (9), 2 h 30 lu 2,30 h (10), le plus petit prix pris pour
// le moins cher (11), arrondir un nombre de sacs vers le bas (13), la dernière
// mesure qui casse la proportionnalité (14), 1 h 20 lu 1,20 h (15), calculer
// le coefficient quand une somme suffit (16), les ingrédients qu'on oublie de
// convertir (17), la hauteur divisée au lieu de multipliée (18), un panneau
// qu'on coupe (19), « plus de pompes, plus de temps » (20).
//
// Les faits réels : aucun. Tout est un MODÈLE, dit comme tel quand il
// ressemble à une mesure (imprimante 3D, ressort, pâte à pain, panneaux
// solaires). Le ressort (14) suit la loi de Hooke, vraie tant qu'on ne le
// déforme pas : c'est ce que montre sa dernière mesure.
//
// ⭐ LES DESSINS : le tableau de proportionnalité à deux lignes et sa flèche
// « ↓ × coefficient » (`tableauCoef`, repris de la 5e), le PRODUIT EN CROIX
// fléché (`croix`, neuf), un tableau à plusieurs lignes (`table`), des
// graphiques `repere()` de figures.tsx, et les OMBRES au soleil (`ombres`,
// neuf). 14 dessins imprimés ; ceux qui redisent le corrigé sont
// `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je multiplie »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-4e-prop-proportionnalite.mjs`.
//
// Micro-compétences : prop_reconnaitre (1, 2, 6, 8, 12, 14, 18, 20), prop_table
// (3, 7, 9, 16), prop_coeff (3, 4, 6, 9, 11, 14, 17, 19), prop_quatrieme (4, 5,
// 6, 10, 13, 15, 17, 18, 19), prop_probleme (10, 11, 12, 13, 15, 17, 18, 19,
// 20), prop_defi (7, 8, 12, 14, 16, 20). 6/6.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, repere } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * Le tableau de proportionnalité (repris de la feuille de 5e) : deux lignes, la
 * flèche « ↓ × coefficient ». Une case qui commence par « ! » est une case
 * TROUVÉE, écrite en rouge.
 * ⛔ Sur TÉLÉPHONE (sous `sm`), le tableau est COUCHÉ : deux colonnes, une ligne
 * par paire, la flèche « → × coefficient » dessous — rien ne défile à 375 px.
 * ⚠️ Texte NU dans les cases : elles ne traversent pas KaTeX.
 */
const tableauCoef = (titres: [string, string], haut: string[], bas: string[], coef: string) => {
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

/**
 * Le PRODUIT EN CROIX : un tableau de deux colonnes de nombres, ses deux
 * diagonales — en bleu plein celle des deux nombres connus qu'on MULTIPLIE, en
 * orange pointillé celle de la case cherchée (« x », en rouge) et du nombre par
 * lequel on DIVISE — et le calcul écrit dessous, en vert.
 * ⛔ Titres : 12 signes au plus ; cases : 6 signes au plus ; calcul : 26 au plus.
 */
const croix = (titres: [string, string], haut: [string, string], bas: [string, string], calcul: string) => {
  const [x0, lt, lc, hc, y0] = [6, 112, 80, 34, 6];
  const cx = (j: number) => x0 + lt + lc * j + lc / 2;
  const cy = (i: number) => y0 + hc * i + hc / 2;
  const cases = [haut, bas];
  // La diagonale de x : x est en (i, j) ; sa diagonale va vers (1 − i, 1 − j).
  const ix = cases.findIndex((l) => l.includes("x"));
  const jx = ix >= 0 ? cases[ix].indexOf("x") : 1;
  const iy = ix >= 0 ? ix : 1;
  const diag = (i1: number, j1: number, i2: number, j2: number, c: string, pointille: boolean) => {
    const [xa, ya, xb, yb] = [cx(j1), cy(i1), cx(j2), cy(i2)];
    const [dx, dy] = [xb - xa, yb - ya];
    const L = Math.hypot(dx, dy);
    const r = 14 / L;
    return <line x1={xa + dx * r} y1={ya + dy * r} x2={xb - dx * r} y2={yb - dy * r} stroke={c} strokeWidth={2.4} strokeDasharray={pointille ? "5 4" : undefined} />;
  };
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 112" className="block h-auto w-full" role="img" aria-label="Le produit en croix">
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x={x0} y={y0 + hc * i} width={lt} height={hc} fill="#f1f5f9" stroke={NOIR} strokeWidth={1.4} />
            <text x={x0 + 6} y={cy(i) + 5} fontSize="14" fontWeight="700" fill={NOIR}>
              {titres[i]}
            </text>
            {[0, 1].map((j) => (
              <g key={j}>
                <rect x={x0 + lt + lc * j} y={y0 + hc * i} width={lc} height={hc} fill="#fff" stroke={NOIR} strokeWidth={1.4} />
                <text x={cx(j) + (j === 0 ? -12 : 12)} y={cy(i) + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill={cases[i][j] === "x" ? ROUGE : NOIR}>
                  {cases[i][j]}
                </text>
              </g>
            ))}
          </g>
        ))}
        {diag(iy, jx, 1 - iy, 1 - jx, ORANGE, true)}
        {diag(iy, 1 - jx, 1 - iy, jx, BLEU, false)}
        <text x={150} y={100} textAnchor="middle" fontSize="15" fontWeight="900" fill={VERT}>
          {calcul}
        </text>
      </svg>
    </div>
  );
};

/**
 * Des OMBRES au soleil, au même moment : chaque objet est un trait vertical de
 * hauteur `h` (m), son ombre un trait au sol de longueur `o` (m), et le rayon
 * du soleil, en pointillé orange, va du sommet au bout de l'ombre. Les rayons
 * sont parallèles : c'est ce qui rend l'ombre proportionnelle à la hauteur.
 * `hauteur` et `ombre` : ce qu'on écrit (« ? » pour une longueur cherchée).
 * À l'échelle : 12 unités par mètre, 20 m d'ombre en tout au plus.
 */
const ombres = (objets: { h: number; o: number; hauteur: string; ombre: string }[]) => {
  const s = 12;
  const sol = 20 + s * Math.max(...objets.map((b) => b.h));
  let x = 60;
  const places = objets.map((b) => {
    const p = x;
    x += b.o * s + 36;
    return p;
  });
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${sol + 26}`} className="block h-auto w-full" role="img" aria-label="Des objets et leurs ombres au soleil">
        <line x1={4} y1={sol} x2={296} y2={sol} stroke={NOIR} strokeWidth={2} />
        {objets.map((b, i) => {
          const [xa, ht, lo] = [places[i], b.h * s, b.o * s];
          return (
            <g key={i}>
              <line x1={xa} y1={sol} x2={xa} y2={sol - ht} stroke={NOIR} strokeWidth={4} strokeLinecap="round" />
              <line x1={xa} y1={sol - ht} x2={xa + lo} y2={sol} stroke={ORANGE} strokeWidth={2} strokeDasharray="5 4" />
              <line x1={xa} y1={sol} x2={xa + lo} y2={sol} stroke="#475569" strokeWidth={6} />
              <text x={xa - 6} y={sol - ht / 2 + 5} textAnchor="end" fontSize="14" fontWeight="900" fill={b.hauteur === "?" ? ROUGE : BLEU}>
                {b.hauteur}
              </text>
              <text x={xa + lo / 2} y={sol + 19} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
                {b.ombre}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesProportionnalite4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "prop-proportionnalite",
  titre: "Proportionnalité : tableaux, coefficient, produit en croix",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître la proportionnalité dans un tableau ou sur un graphique, trouver le coefficient, revenir à l'unité, calculer une quatrième proportionnelle par le produit en croix. Une imprimante 3D, un ressort, une trailleuse, la pâte à pain, les ombres au soleil, des panneaux solaires, des pompes qui vident un bassin. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et un dessin.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/prop-proportionnalite", titre: "La proportionnalité" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je cherche d'abord le nombre qui relie les deux lignes.",
      rappel: [
        "Deux grandeurs sont proportionnelles quand on passe de l'une à l'autre en multipliant TOUJOURS par le même nombre : le coefficient.",
        "Pour le vérifier, je divise chaque nombre du bas par celui du haut : tous les quotients doivent être égaux.",
        "Sur un graphique, une situation de proportionnalité donne des points alignés avec l'origine du repère.",
        "Produit en croix : dans un tableau de proportionnalité, $\\dfrac{a}{b} = \\dfrac{c}{d}$ donne $a \\times d = b \\times c$.",
      ],
      exercices: [
        {
          enonce: "Dans ce tableau, la série A et la série B donnent chacune un nombre pour chaque valeur de $x$.\na) La série A est-elle proportionnelle à $x$ ? Justifie.\nb) Même question pour la série B.",
          figure: table(["x", "série A", "série B"], [
            ["3", "10,5", "7"],
            ["5", "17,5", "11"],
            ["8", "28", "17"],
          ]),
          correction:
            "Je divise chaque nombre de la série par la valeur de $x$ sur la même ligne. Proportionnel veut dire : le même quotient partout.\na) Série A : $10{,}5 \\div 3 = 3{,}5$ ; $17{,}5 \\div 5 = 3{,}5$ ; $28 \\div 8 = 3{,}5$. Les trois quotients sont égaux : la série A est proportionnelle à $x$, avec le coefficient $3{,}5$.\nb) Série B : $7 \\div 3 \\approx 2{,}33$ et $11 \\div 5 = 2{,}2$. Deux quotients différents suffisent : la série B n'est pas proportionnelle à $x$.\n⛔ Le piège : la série B est très RÉGULIÈRE (quand $x$ augmente de $2$, elle augmente de $4$), et pourtant elle n'est pas proportionnelle. Régulier ne veut pas dire proportionnel.\nRéponse : a) oui, coefficient $3{,}5$ ; b) non.",
          schema: ecranSeulement(
            table(["x", "A ÷ x", "B ÷ x"], [
              ["3", "3,5", "2,33…"],
              ["5", "3,5", "2,2"],
              ["8", "3,5", "2,125"],
            ]),
          ),
          micros: ["prop_reconnaitre"],
        },
        {
          enonce: "Voici trois graphiques : la droite bleue (d1), la droite orange (d2) et la ligne verte (d3).\nLequel représente une situation de proportionnalité ? Justifie pour chacun.",
          figure: repere([-1, 6, -1, 11], [
            { pts: [[0, 0], [5, 10]] },
            { pts: [[0, 3], [5, 8]], couleur: ORANGE },
            { pts: [[0, 0], [1, 4], [2, 6], [3, 7], [4, 7.5], [5, 7.8]], couleur: "#16a34a" },
          ], [
            { x: 4.5, y: 9, label: "d1" },
            { x: 1, y: 4, label: "d3" },
            { x: 4, y: 7, label: "d2" },
          ], undefined, true),
          correction:
            "Une situation de proportionnalité a pour graphique des points ALIGNÉS avec l'ORIGINE : il faut les deux conditions.\n(d1) est une droite qui passe par l'origine : c'est une situation de proportionnalité. Je le vérifie : $(1 ; 2)$, $(2 ; 4)$, $(5 ; 10)$, et à chaque fois $y = 2 \\times x$.\n(d2) est une droite, mais elle coupe l'axe vertical en $3$, pas à l'origine : pas proportionnelle.\n(d3) passe par l'origine, mais ce n'est pas une droite, elle se courbe : pas proportionnelle.\n⛔ Le piège : dire « (d2) est une droite, donc c'est proportionnel ». Une droite qui ne passe pas par l'origine ne représente pas une situation de proportionnalité.\nRéponse : seule (d1).",
          micros: ["prop_reconnaitre"],
        },
        {
          enonce: "Le prix des noix de cajou est proportionnel à leur masse. Complète le tableau, en commençant par le coefficient.",
          figure: tableauCoef(["Masse (kg)", "Prix (€)"], ["2", "5", "7,5", "…"], ["6,40", "…", "…", "41,60"], "?"),
          correction:
            "Le coefficient : je divise un prix par sa masse, sur une colonne complète. $6{,}40 \\div 2 = 3{,}2$. Pour passer de la masse au prix, je multiplie par $3{,}2$.\n$5 \\times 3{,}2 = 16$ et $7{,}5 \\times 3{,}2 = 24$.\nDans la dernière colonne, je connais le prix : je fais le chemin inverse, je DIVISE. $41{,}60 \\div 3{,}2 = 13$.\n⛔ Le piège : multiplier $41{,}60$ par $3{,}2$. Pour remonter du prix à la masse, on divise par le coefficient.\nRéponse : le coefficient est $3{,}2$ ; les cases valent $16$ €, $24$ € et $13$ kg.",
          schema: ecranSeulement(tableauCoef(["Masse (kg)", "Prix (€)"], ["2", "5", "7,5", "!13"], ["6,40", "!16", "!24", "41,60"], "3,2")),
          micros: ["prop_table", "prop_coeff"],
        },
        {
          enonce: "Un lot de $8$ piles coûte $9{,}60$ €. Le prix est proportionnel au nombre de piles.\na) Combien coûte une pile ?\nb) Combien coûtent $5$ piles ? Et $14$ piles ?",
          correction:
            "Je reviens d'abord à l'unité : le prix d'UNE pile.\na) $9{,}60 \\div 8 = 1{,}2$. Une pile coûte $1{,}20$ €.\nb) $5 \\times 1{,}2 = 6$ et $14 \\times 1{,}2 = 16{,}8$.\n⭐ Contrôle : $14$ piles, c'est $8 + 5 + 1$ piles, et $9{,}60 + 6 + 1{,}20 = 16{,}80$.\n⛔ Le piège : chercher le prix de $5$ piles en enlevant $3$ € au prix du lot, « parce qu'il y a $3$ piles de moins ». Il faut passer par le prix d'une pile.\nRéponse : a) $1{,}20$ € ; b) $6$ € et $16{,}80$ €.",
          schema: ecranSeulement(
            table(["piles", "prix (€)"], [
              ["8", "9,60"],
              ["1", "1,20"],
              ["5", "6"],
              ["14", "16,80"],
            ]),
          ),
          micros: ["prop_coeff", "prop_quatrieme"],
        },
        {
          enonce: "Chaque tableau est un tableau de proportionnalité. Calcule $x$ par le produit en croix.\na) $4$ correspond à $7$, et $12$ correspond à $x$.\nb) $15$ correspond à $6$, et $25$ correspond à $x$.\nc) $2{,}5$ correspond à $9$, et $7$ correspond à $x$.",
          correction:
            "Dans un tableau de proportionnalité, les produits en croix sont égaux. Je multiplie les deux nombres de la diagonale complète, puis je divise par le nombre qui reste.\na) $x = \\dfrac{12 \\times 7}{4} = 21$.\nb) $x = \\dfrac{25 \\times 6}{15} = 10$.\nc) $x = \\dfrac{7 \\times 9}{2{,}5} = 25{,}2$.\n⭐ Contrôle du b) : $6 \\div 15 = 0{,}4$ et $10 \\div 25 = 0{,}4$. Même coefficient.\n⛔ Le piège : multiplier les deux nombres d'une même COLONNE, par exemple $15 \\times 6$. Les nombres qu'on multiplie sont en DIAGONALE.\nRéponse : a) $21$ ; b) $10$ ; c) $25{,}2$.",
          schema: croix(["premier", "second"], ["2,5", "7"], ["9", "x"], "x = 7 × 9 ÷ 2,5 = 25,2"),
          micros: ["prop_quatrieme"],
        },
        {
          enonce: "Un arrosage au goutte-à-goutte donne de l'eau de façon régulière. Le graphique donne le volume d'eau versé (en litres, verticalement) selon la durée (en minutes, horizontalement).\na) Pourquoi le volume est-il proportionnel à la durée ?\nb) Lis sur le graphique le volume versé en $4$ minutes.\nc) Calcule le volume versé en $30$ minutes.\nd) En combien de minutes verse-t-il $60$ litres ?",
          figure: repere([-1, 7, -1, 10], [{ pts: [[0, 0], [6, 9]] }], [], undefined, true),
          correction:
            "a) Le graphique est une droite qui passe par l'origine : le volume est proportionnel à la durée.\nb) Je pars de $4$ sur l'axe HORIZONTAL (les minutes), je monte jusqu'à la droite, puis je lis sur l'axe vertical : $6$ litres.\nc) Le coefficient : $6 \\div 4 = 1{,}5$ litre par minute. $30 \\times 1{,}5 = 45$ litres.\nd) Je fais le chemin inverse : $60 \\div 1{,}5 = 40$ minutes.\n⛔ Le piège du b) : partir de $4$ sur l'axe vertical, et lire $2{,}7$ environ. Les minutes sont sur l'axe horizontal.\nRéponse : a) une droite par l'origine ; b) $6$ L ; c) $45$ L ; d) $40$ minutes.",
          schema: ecranSeulement(repere([-1, 7, -1, 10], [{ pts: [[0, 0], [6, 9]] }], [{ x: 4, y: 6, label: "(4 ; 6)" }], undefined, true)),
          micros: ["prop_reconnaitre", "prop_coeff", "prop_quatrieme"],
        },
        {
          enonce: "Pour $3$ personnes, une recette de pâte à crumble demande $240$ g de farine. La quantité de farine est proportionnelle au nombre de personnes.\nLéo dit : « Pour $5$ personnes, il faut $242$ g : j'ajoute $2$, comme pour les personnes. »\nZoé dit : « Pour $6$ personnes, il faut $480$ g. Pour $5$ personnes, j'enlève la part d'une personne. »\nQui a raison ? Calcule la quantité de farine pour $5$ personnes.",
          correction:
            "Léo se trompe : dans une situation de proportionnalité, on MULTIPLIE, on n'ajoute pas. Passer de $3$ à $5$ personnes ne fait pas ajouter $2$ g.\nZoé a raison. $6$ personnes, c'est le double de $3$ : $240 \\times 2 = 480$ g.\nLa part d'une personne : $240 \\div 3 = 80$ g.\nPour $5$ personnes : $480 - 80 = 400$ g. Ou directement : $5 \\times 80 = 400$ g.\n⛔ Le piège : ajouter l'écart, comme Léo. $242$ g pour $5$ personnes, ce serait presque la même quantité que pour $3$ !\nRéponse : Zoé a raison ; il faut $400$ g de farine.",
          schema: ecranSeulement(tableauCoef(["personnes", "farine (g)"], ["3", "1", "5", "6"], ["240", "!80", "!400", "!480"], "80")),
          micros: ["prop_defi", "prop_table"],
        },
        {
          enonce: "Proportionnel ou pas ? Justifie par un calcul ou par un contre-exemple.\na) Le prix payé à la pompe et le nombre de litres d'essence.\nb) Le prix d'une location de trottinette : $1$ € pour la déverrouiller, puis $0{,}25$ € la minute, et la durée.\nc) Le périmètre d'un carré et la longueur de son côté.\nd) L'aire d'un carré et la longueur de son côté.",
          correction:
            "a) Oui : chaque litre coûte le même prix. Le coefficient est le prix d'un litre.\nb) Non : pour $10$ minutes je paie $1 + 10 \\times 0{,}25 = 3{,}5$ €, pour $20$ minutes $1 + 20 \\times 0{,}25 = 6$ €. La durée double, le prix ne double pas, à cause du $1$ € de départ.\nc) Oui : le périmètre vaut toujours $4 \\times$ le côté. Le coefficient est $4$.\nd) Non : un côté de $1$ cm donne $1$ cm², un côté de $2$ cm donne $4$ cm², un côté de $3$ cm donne $9$ cm². Les quotients $1$, $2$ et $3$ ne sont pas égaux.\n⛔ Le piège du d) : « quand le côté augmente, l'aire augmente, donc c'est proportionnel ». Deux grandeurs qui grandissent ensemble ne sont pas forcément proportionnelles.\nRéponse : a) oui ; b) non ; c) oui ; d) non.",
          schema: ecranSeulement(
            table(["côté (cm)", "aire (cm²)", "aire ÷ côté"], [
              ["1", "1", "1"],
              ["2", "4", "2"],
              ["3", "9", "3"],
            ]),
          ),
          micros: ["prop_reconnaitre", "prop_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'écris le tableau, je donne le calcul, et je termine par une phrase.",
      rappel: [
        "Dans un tableau de proportionnalité, je peux additionner deux colonnes, ou multiplier une colonne par un même nombre : le résultat est encore une colonne du tableau.",
        "Quatrième proportionnelle : je multiplie les deux nombres de la diagonale complète, puis je divise par le nombre qui reste.",
        "Avant de calculer, je mets les données dans la même unité : les minutes en heures, les grammes en kilogrammes.",
      ],
      exercices: [
        {
          enonce: "Un imprimeur fixe un prix proportionnel au nombre de flyers imprimés : $250$ flyers coûtent $35$ €.\na) Complète le tableau SANS calculer le coefficient, en additionnant ou en multipliant des colonnes.\nb) Calcule le coefficient, puis vérifie tes réponses.",
          figure: tableauCoef(["flyers", "prix (€)"], ["250", "500", "750", "1 250"], ["35", "…", "…", "…"], "?"),
          correction:
            "a) $500$ flyers, c'est $2$ fois $250$ : $35 \\times 2 = 70$ €.\n$750 = 250 + 500$ : j'additionne les colonnes, $35 + 70 = 105$ €.\n$1\\,250 = 500 + 750$ : $70 + 105 = 175$ €.\nb) Le coefficient : $35 \\div 250 = 0{,}14$. Un flyer coûte $0{,}14$ €.\nVérification : $500 \\times 0{,}14 = 70$ ; $750 \\times 0{,}14 = 105$ ; $1\\,250 \\times 0{,}14 = 175$.\n⛔ Le piège : calculer le coefficient « à l'envers », $250 \\div 35 \\approx 7{,}14$. Le coefficient qui passe du haut au bas se calcule : bas divisé par haut.\nRéponse : $70$ €, $105$ € et $175$ € ; le coefficient est $0{,}14$.",
          schema: ecranSeulement(tableauCoef(["flyers", "prix (€)"], ["250", "500", "750", "1 250"], ["35", "!70", "!105", "!175"], "0,14")),
          micros: ["prop_table", "prop_coeff"],
        },
        {
          enonce: "Une imprimante 3D utilise $38$ g de fil de plastique en $2$ h $30$ min. La masse de fil est proportionnelle à la durée d'impression (chiffres d'un modèle).\nQuelle masse de fil utilise-t-elle en $4$ h ?",
          correction:
            "D'abord la même unité : $2$ h $30$ min, c'est $2{,}5$ h, car $30$ min est une demi-heure.\nPuis le produit en croix : $2{,}5$ h correspond à $38$ g, $4$ h correspond à $x$ g.\n$x = \\dfrac{4 \\times 38}{2{,}5} = 60{,}8$.\n⭐ Contrôle : en $1$ h, $38 \\div 2{,}5 = 15{,}2$ g ; en $4$ h, $4 \\times 15{,}2 = 60{,}8$ g.\n⛔ Le piège : écrire $2{,}30$ h. $30$ minutes ne font pas $0{,}30$ h : une heure compte $60$ minutes, pas $100$.\nRéponse : elle utilise $60{,}8$ g de fil en $4$ h.",
          schema: croix(["durée (h)", "masse (g)"], ["2,5", "4"], ["38", "x"], "x = 4 × 38 ÷ 2,5 = 60,8"),
          micros: ["prop_quatrieme", "prop_probleme"],
        },
        {
          enonce: "Au magasin, le même miel est vendu en deux pots : un pot de $450$ g à $2{,}97$ € et un pot de $750$ g à $4{,}80$ €.\nQuel pot est le plus avantageux ? Justifie en calculant le prix d'un kilogramme.",
          correction:
            "Pour comparer, je ramène les deux pots à la même quantité : $1$ kg, soit $1\\,000$ g.\nPetit pot : $450$ g, c'est $0{,}45$ kg. $2{,}97 \\div 0{,}45 = 6{,}6$. Le kilo revient à $6{,}60$ €.\nGrand pot : $750$ g, c'est $0{,}75$ kg. $4{,}80 \\div 0{,}75 = 6{,}4$. Le kilo revient à $6{,}40$ €.\n$6{,}40 < 6{,}60$ : le grand pot est plus avantageux.\n⛔ Le piège : choisir le petit pot « parce qu'il coûte moins cher ». Il coûte moins, mais il contient moins : seul le prix pour la même quantité permet de comparer.\nRéponse : le pot de $750$ g, à $6{,}40$ € le kilo.",
          schema: ecranSeulement(
            table(["pot", "masse (kg)", "prix au kg (€)"], [
              ["petit", "0,45", "6,60"],
              ["grand", "0,75", "6,40"],
            ]),
          ),
          micros: ["prop_probleme", "prop_coeff"],
        },
        {
          enonce: "Pour louer un vélo, le tarif A coûte $3$ € l'heure. Le tarif B coûte $4$ € à la location, puis $2$ € l'heure. Le graphique donne le prix (en €) selon la durée (en heures) : la droite bleue pour A, la droite orange pour B.\na) Quel tarif est proportionnel à la durée ? Justifie avec le graphique.\nb) Pour quelle durée les deux tarifs coûtent-ils le même prix ? Quel est ce prix ?\nc) Pour une location de $6$ h, quel tarif choisir ?",
          figure: repere([-1, 7, -2, 13], [
            { pts: [[0, 0], [4.2, 12.6]] },
            { pts: [[0, 4], [4.5, 13]], couleur: ORANGE },
          ], [], undefined, true),
          correction:
            "a) La droite bleue du tarif A passe par l'origine : le prix A est proportionnel à la durée, avec le coefficient $3$. La droite orange coupe l'axe vertical en $4$ : le prix B n'est pas proportionnel.\nb) Les droites se croisent au point $(4 ; 12)$. Je vérifie : tarif A, $4 \\times 3 = 12$ € ; tarif B, $4 + 4 \\times 2 = 12$ €. Pour $4$ h, les deux coûtent $12$ €.\nc) Tarif A : $6 \\times 3 = 18$ €. Tarif B : $4 + 6 \\times 2 = 16$ €. Je choisis le tarif B.\n⛔ Le piège : croire que le tarif proportionnel est toujours le moins cher. Il l'est pour une location courte ; après $4$ h, le tarif B gagne.\nRéponse : a) le tarif A ; b) $4$ h, pour $12$ € ; c) le tarif B, $16$ € au lieu de $18$ €.",
          schema: ecranSeulement(repere([-1, 7, -2, 13], [
            { pts: [[0, 0], [4.2, 12.6]] },
            { pts: [[0, 4], [4.5, 13]], couleur: ORANGE },
          ], [{ x: 4, y: 12 }], undefined, true)),
          micros: ["prop_reconnaitre", "prop_probleme", "prop_defi"],
        },
        {
          enonce: "Pour un mortier, un maçon mélange toujours $1$ sac de ciment de $25$ kg avec $75$ kg de sable. Les masses de ciment et de sable sont proportionnelles.\na) Quelle masse de ciment faut-il pour $180$ kg de sable ?\nb) Combien de sacs de ciment faut-il acheter ?",
          correction:
            "a) Produit en croix : $75$ kg de sable correspondent à $25$ kg de ciment, $180$ kg de sable correspondent à $x$ kg.\n$x = \\dfrac{180 \\times 25}{75} = 60$. Il faut $60$ kg de ciment.\nb) Un sac pèse $25$ kg : $60 \\div 25 = 2{,}4$ sacs. On ne peut pas acheter $0{,}4$ sac : il faut en acheter $3$.\n⭐ Contrôle : il y a toujours $3$ fois plus de sable que de ciment, et $3 \\times 60 = 180$.\n⛔ Le piège : arrondir à $2$ sacs. Avec $2$ sacs, soit $50$ kg, il manquerait $10$ kg de ciment.\nRéponse : a) $60$ kg ; b) $3$ sacs.",
          schema: ecranSeulement(croix(["sable (kg)", "ciment (kg)"], ["75", "180"], ["25", "x"], "x = 180 × 25 ÷ 75 = 60")),
          micros: ["prop_probleme", "prop_quatrieme"],
        },
        {
          enonce: "En classe de physique, on suspend des masses à un ressort et on mesure son allongement (chiffres d'un modèle).\na) L'allongement est-il proportionnel à la masse, pour toutes les mesures ?\nb) Pour les mesures où il l'est, quel est le coefficient ?\nc) Quel allongement prévoir pour une masse de $120$ g ?",
          figure: table(["masse (g)", "allongement (cm)"], [
            ["50", "1,2"],
            ["100", "2,4"],
            ["150", "3,6"],
            ["200", "4,8"],
            ["250", "7,5"],
          ]),
          correction:
            "a) Je calcule allongement divisé par masse pour chaque mesure.\n$1{,}2 \\div 50 = 0{,}024$ ; $2{,}4 \\div 100 = 0{,}024$ ; $3{,}6 \\div 150 = 0{,}024$ ; $4{,}8 \\div 200 = 0{,}024$.\nMais $7{,}5 \\div 250 = 0{,}03$ : la dernière mesure ne suit pas. Le ressort a été trop étiré : il s'est déformé.\nDonc l'allongement est proportionnel à la masse jusqu'à $200$ g, pas au-delà.\nb) Le coefficient est $0{,}024$ cm par gramme.\nc) $120$ g est dans la partie proportionnelle : $120 \\times 0{,}024 = 2{,}88$ cm.\n⛔ Le piège : conclure après avoir vérifié deux ou trois colonnes. Il faut TOUTES les vérifier : ici, c'est la dernière qui casse la proportionnalité.\nRéponse : a) oui jusqu'à $200$ g, non ensuite ; b) $0{,}024$ ; c) $2{,}88$ cm.",
          schema: ecranSeulement(
            table(["masse (g)", "allongement ÷ masse"], [
              ["50 à 200", "0,024"],
              ["250", "0,03"],
            ]),
          ),
          micros: ["prop_reconnaitre", "prop_coeff", "prop_defi"],
        },
        {
          enonce: "Une trailleuse monte une pente à vitesse régulière : elle gagne $540$ m d'altitude en $45$ min. Le dénivelé est proportionnel à la durée.\na) Quel dénivelé gagne-t-elle en $1$ h $20$ min ?\nb) Combien de temps lui faut-il pour gagner $1\\,200$ m ?",
          correction:
            "Je mets les durées en minutes : $1$ h $20$ min, c'est $60 + 20 = 80$ min.\na) Produit en croix : $45$ min correspondent à $540$ m, $80$ min correspondent à $x$ m. $x = \\dfrac{80 \\times 540}{45} = 960$. Elle gagne $960$ m.\nb) $540$ m correspondent à $45$ min, $1\\,200$ m correspondent à $t$ min. $t = \\dfrac{1\\,200 \\times 45}{540} = 100$. Il lui faut $100$ min, soit $1$ h $40$ min.\n⭐ Contrôle : en $1$ min, elle gagne $540 \\div 45 = 12$ m. Et $12 \\times 80 = 960$, $12 \\times 100 = 1\\,200$.\n⛔ Le piège : écrire $1$ h $20$ min $= 1{,}20$ h. En heures, c'est $1 + \\dfrac{20}{60}$, pas $1{,}20$. Les minutes évitent la question.\nRéponse : a) $960$ m ; b) $1$ h $40$ min.",
          schema: ecranSeulement(croix(["durée (min)", "dénivelé (m)"], ["45", "80"], ["540", "x"], "x = 80 × 540 ÷ 45 = 960")),
          micros: ["prop_quatrieme", "prop_probleme"],
        },
        {
          enonce: "Ce tableau est un tableau de proportionnalité. Complète-le SANS calculer le coefficient, en écrivant chaque nombre du haut comme une somme ou une différence de nombres déjà connus. Vérifie ensuite avec le coefficient.",
          figure: tableauCoef(["x", "y"], ["7", "11", "18", "4", "29"], ["16,8", "26,4", "…", "…", "…"], "?"),
          correction:
            "$18 = 7 + 11$ : j'additionne les colonnes, $16{,}8 + 26{,}4 = 43{,}2$.\n$4 = 11 - 7$ : je soustrais, $26{,}4 - 16{,}8 = 9{,}6$.\n$29 = 18 + 11$ : $43{,}2 + 26{,}4 = 69{,}6$.\nVérification par le coefficient : $16{,}8 \\div 7 = 2{,}4$. Puis $18 \\times 2{,}4 = 43{,}2$ ; $4 \\times 2{,}4 = 9{,}6$ ; $29 \\times 2{,}4 = 69{,}6$.\n⛔ Le piège : chercher un calcul compliqué. Quand les nombres du haut se combinent, les nombres du bas se combinent de la même façon.\nRéponse : $43{,}2$ ; $9{,}6$ ; $69{,}6$.",
          schema: ecranSeulement(tableauCoef(["x", "y"], ["7", "11", "18", "4", "29"], ["16,8", "26,4", "!43,2", "!9,6", "!69,6"], "2,4")),
          micros: ["prop_defi", "prop_table"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je repère les grandeurs proportionnelles, puis je réponds par une phrase.",
      rappel: [
        "Je repère deux grandeurs proportionnelles, et je range leurs valeurs dans un tableau.",
        "Pour trouver une valeur, j'utilise le coefficient, le passage à l'unité ou le produit en croix.",
        "Je contrôle : ma réponse est-elle plausible ? Est-elle dans la bonne unité ?",
      ],
      exercices: [
        {
          titre: "La pâte à pain",
          enonce:
            "Un boulanger prépare toujours sa pâte avec les mêmes proportions : pour $1\\,000$ g de farine, $650$ g d'eau, $18$ g de sel et $20$ g de levure (chiffres d'un modèle).\na) Il n'a que $455$ g d'eau. Quelle masse de farine doit-il prendre ? Et de sel, et de levure ?\nb) Quelle masse de pâte obtient-il avec $1\\,000$ g de farine ?\nc) Avec $5$ kg de farine, combien de pains de $350$ g peut-il façonner ?",
          figure: table(["ingrédient", "pour 1 000 g", "avec 455 g d'eau"], [
            ["farine (g)", "1 000", "?"],
            ["eau (g)", "650", "455"],
            ["sel (g)", "18", "?"],
            ["levure (g)", "20", "?"],
          ]),
          correction:
            "a) Le coefficient qui passe de la recette à sa pâte : $455 \\div 650 = 0{,}7$. Toutes les masses sont multipliées par $0{,}7$.\nFarine : $1\\,000 \\times 0{,}7 = 700$ g. Sel : $18 \\times 0{,}7 = 12{,}6$ g. Levure : $20 \\times 0{,}7 = 14$ g.\nb) J'additionne : $1\\,000 + 650 + 18 + 20 = 1\\,688$ g de pâte.\nc) $5$ kg, c'est $5\\,000$ g, donc $5$ fois la recette : $1\\,688 \\times 5 = 8\\,440$ g de pâte.\n$8\\,440 \\div 350 \\approx 24{,}1$. Il peut façonner $24$ pains entiers.\n⛔ Le piège du c) : oublier de convertir, et multiplier par $5$ en croyant avoir $5$ g de farine. Ou répondre $25$ pains : le $25$e n'aurait pas assez de pâte.\nRéponse : a) $700$ g de farine, $12{,}6$ g de sel, $14$ g de levure ; b) $1\\,688$ g ; c) $24$ pains.",
          micros: ["prop_probleme", "prop_coeff", "prop_quatrieme"],
        },
        {
          titre: "Les ombres au soleil",
          enonce:
            "Au même moment d'une journée ensoleillée, la longueur de l'ombre d'un objet vertical est proportionnelle à sa hauteur. Un bâton de $1{,}5$ m a une ombre de $2{,}4$ m. Au même moment, un arbre a une ombre de $14$ m.\na) Quelle est la hauteur de l'arbre ?\nb) Quelle est la longueur de l'ombre d'une personne de $1{,}6$ m ?\nc) Une tour a une ombre de $30{,}4$ m. Quelle est sa hauteur ?",
          figure: ombres([
            { h: 1.5, o: 2.4, hauteur: "1,5 m", ombre: "2,4 m" },
            { h: 8.75, o: 14, hauteur: "?", ombre: "14 m" },
          ]),
          correction:
            "Le coefficient qui passe de la hauteur à l'ombre : $2{,}4 \\div 1{,}5 = 1{,}6$. L'ombre est $1{,}6$ fois plus longue que l'objet.\na) Je connais l'ombre, je cherche la hauteur : je DIVISE. $14 \\div 1{,}6 = 8{,}75$. L'arbre mesure $8{,}75$ m.\nb) $1{,}6 \\times 1{,}6 = 2{,}56$. L'ombre de la personne mesure $2{,}56$ m.\nc) $30{,}4 \\div 1{,}6 = 19$. La tour mesure $19$ m.\n⭐ Pourquoi ça marche : les rayons du soleil arrivent parallèles, et les triangles formés par chaque objet et son ombre ont la même forme.\n⛔ Le piège du a) : multiplier $14$ par $1{,}6$ et trouver un arbre de $22{,}4$ m, plus grand que son ombre. Or ici, l'ombre est plus longue que l'objet.\nRéponse : a) $8{,}75$ m ; b) $2{,}56$ m ; c) $19$ m.",
          micros: ["prop_probleme", "prop_quatrieme", "prop_reconnaitre"],
        },
        {
          titre: "Les panneaux solaires",
          enonce:
            "Sur un toit bien orienté, l'électricité produite en un an est proportionnelle à la surface de panneaux solaires : $12$ m² de panneaux produisent $2\\,280$ kWh par an (chiffres d'un modèle).\na) Combien produisent $20$ m² de panneaux ?\nb) Une famille consomme $4\\,560$ kWh par an. Quelle surface de panneaux produirait autant ?\nc) Un panneau mesure $1{,}7$ m². Combien de panneaux faut-il poser pour atteindre au moins cette surface ?",
          correction:
            "Je reviens à l'unité : $1$ m² produit $2\\,280 \\div 12 = 190$ kWh par an.\na) $20 \\times 190 = 3\\,800$ kWh par an.\nb) Je fais le chemin inverse : $4\\,560 \\div 190 = 24$ m².\n⭐ Contrôle : $4\\,560$, c'est le double de $2\\,280$, donc il faut le double de $12$ m², soit $24$ m².\nc) $24 \\div 1{,}7 \\approx 14{,}1$. Avec $14$ panneaux, on n'a que $14 \\times 1{,}7 = 23{,}8$ m², pas assez. Il faut $15$ panneaux.\n⛔ Le piège du c) : répondre $14$ panneaux, ou $14{,}1$. On ne pose pas un morceau de panneau, et $14$ ne suffisent pas.\nRéponse : a) $3\\,800$ kWh ; b) $24$ m² ; c) $15$ panneaux.",
          schema: ecranSeulement(tableauCoef(["surface (m²)", "production (kWh)"], ["12", "1", "20", "24"], ["2 280", "!190", "!3 800", "4 560"], "190")),
          micros: ["prop_probleme", "prop_coeff", "prop_quatrieme"],
        },
        {
          titre: "Les pompes du bassin",
          enonce:
            "Pour vider un bassin, on utilise des pompes toutes identiques. Avec $1$ pompe, il faut $12$ h. Avec $2$ pompes, $6$ h. Avec $3$ pompes, $4$ h.\na) Combien de temps faut-il avec $4$ pompes ? Avec $6$ pompes ?\nb) La durée est-elle proportionnelle au nombre de pompes ? Justifie.\nc) Quel calcul donne toujours le même résultat, pour chaque colonne ?\nd) Combien de pompes faut-il pour vider le bassin en $1$ h $30$ min ?",
          figure: table(["pompes", "durée (h)"], [
            ["1", "12"],
            ["2", "6"],
            ["3", "4"],
            ["4", "?"],
            ["6", "?"],
          ]),
          correction:
            "a) Deux fois plus de pompes vident deux fois plus vite. $4$ pompes, c'est $2$ fois $2$ pompes : $6 \\div 2 = 3$ h. $6$ pompes, c'est $2$ fois $3$ pompes : $4 \\div 2 = 2$ h.\nb) Non. Les quotients durée divisée par pompes valent $12$, $3$, $1{,}33…$ : ils ne sont pas égaux. Et quand le nombre de pompes augmente, la durée DIMINUE.\nc) Le PRODUIT pompes fois durée : $1 \\times 12 = 12$, $2 \\times 6 = 12$, $3 \\times 4 = 12$, $4 \\times 3 = 12$, $6 \\times 2 = 12$. Il faut toujours $12$ heures de travail d'une pompe.\nd) $1$ h $30$ min $= 1{,}5$ h. Je cherche le nombre de pompes qui, multiplié par $1{,}5$, donne $12$ : $12 \\div 1{,}5 = 8$ pompes.\n⛔ Le piège : utiliser un produit en croix, comme si la durée était proportionnelle au nombre de pompes. On trouverait « plus de pompes, plus de temps », ce qui n'a pas de sens.\nRéponse : a) $3$ h et $2$ h ; b) non ; c) le produit vaut toujours $12$ ; d) $8$ pompes.",
          schema: repere([-1, 9, -1, 13], [{ pts: [[1, 12], [2, 6], [3, 4], [4, 3], [6, 2], [8, 1.5]], couleur: ORANGE }], [
            { x: 1, y: 12 },
            { x: 2, y: 6 },
            { x: 3, y: 4 },
            { x: 4, y: 3 },
            { x: 6, y: 2 },
            { x: 8, y: 1.5 },
          ], undefined, true),
          micros: ["prop_defi", "prop_reconnaitre", "prop_probleme"],
        },
      ],
    },
  ],
};
