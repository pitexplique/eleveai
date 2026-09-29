// ─── Fiche d'exercices : problèmes à nombres inconnus et motifs (6e) ──────────
//
// Lot des feuilles de 6e (30/09/2026), sur le modèle de la feuille de 5e
// `maths-5e-prop-proportionnalite.tsx` (ses aides locales en clair) : aides de
// dessin locales, écrites EN CLAIR, relues par le script de recalcul.
//
// Pas de fiche de cours de 6e pour cette notion (fichesCours: []). Alignée sur
// la banque `lib/tutor-v4/questionBank/6e/maths/algebre.bank.ts`, notionId
// algebre_probleme : traduire un problème par un schéma en barres, trouver deux
// nombres inconnus par échange, motif évolutif (régularité et structure),
// défis (remonter un motif, partages en parts).
// ⛔⛔ LIMITES DE LA 6e : « pré-algébrique » veut dire SANS LETTRE. Aucune
// équation, aucune lettre inconnue, aucun « x ». On DESSINE la relation (le
// schéma en barres), on RETIRE ce qui dépasse, on PARTAGE en parts égales, on
// ÉCHANGE un objet contre un autre de même poids ou de même prix. Les motifs se
// décrivent par des calculs de nombres (« 4 + 19 × 3 »), jamais par une formule.
// La « part » du schéma en barres joue le rôle que la lettre jouera en 5e.
// ⛔ Aucun exemple de la banque n'est repris : ni « somme 48, écart 12 », ni la
// prime de 320 €, ni « somme 90, le double », ni les ananas, pastèques, mangues
// et letchis, ni les maisons en allumettes (6, puis 5 de plus), ni les 60 billes
// partagées entre trois enfants.
//
// Les pièges nommés : partager le total en deux sans retirer l'écart (1, 17),
// s'arrêter au reste avant de le partager (2, 4), compter 2 parts au lieu de 3
// pour « deux fois plus » (3, 15, 19), compter 4 allumettes par carré (5, 13),
// compter un ajout de trop (6, 14), 3 allumettes par triangle (8), prendre la
// différence pour le prix d'UN objet (11), partager entre des objets de poids
// différents (12), retirer d'un seul côté de la balance (16), 4 chaises par
// table (18), la barre en pointillés oubliée (10), la moitié d'une somme qui
// n'est pas la moitié du prix (20).
//
// Faits réels : aucun. Tous les nombres (billes, livre, classe, sac de fruits,
// stylos, course, riz, café, gâteaux, ficelle, balance, tirelire, banquet,
// randonneurs, cinéma) sont des MODÈLES, à l'ordre de grandeur réel.
//
// ⭐ LES DESSINS — le schéma en barres EST la méthode du chapitre :
//   · `barres` — une barre par personne ou par achat, coupée en morceaux : les
//     parts pareilles en bleu, ce qui s'ajoute en orange, ce qui MANQUE en
//     pointillés rouges ; le total en haut, le total d'une ligne à droite ;
//   · `motif` — les étapes d'un motif évolutif dessinées côte à côte : carrés
//     et triangles en allumettes, carreaux en L, tables et chaises ;
//   · `table` — le tableau d'un motif (étape, nombre), 3 colonnes au plus.
// SVG de viewBox 300, police 14, sans `min-w`. Le script vérifie que chaque
// nombre tient dans son morceau, recompte les allumettes, les carreaux et les
// chaises sur le dessin, et relit chaque barre. 14 dessins imprimés.
//
// Les corrigés sont écrits à la première personne (« je retire », « je partage »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-algebre-probleme.mjs`.
//
// Micro-compétences : algebre_barres (1, 2, 3, 9, 10, 15, 17, 19),
// algebre_inconnues (4, 7, 11, 12, 16, 20), algebre_motif (5, 6, 8, 13, 18),
// algebre_defi (14, 15, 16, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const ROUGE = "#dc2626";
const ENCRE = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Un tableau à plusieurs lignes. 3 colonnes courtes au plus. */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/**
 * LE SCHÉMA EN BARRES. Une ligne par personne ou par achat, son nom à gauche,
 * son total à droite (facultatif). Chaque morceau a une longueur `n` (en
 * unités du dessin, les mêmes pour toutes les lignes) et un nombre écrit dedans :
 *   · "part" (bleu) — la part inconnue, celle qui se répète ;
 *   · "autre" (orange) — ce qui s'ajoute, ou un autre objet ;
 *   · "moins" (pointillés rouges) — ce qui MANQUE à la barre.
 * Le total de tout le schéma en haut. ⚠️ Texte NU, vrai signe « − ».
 * ⭐ Le script vérifie que chaque nombre tient dans son morceau (8,8 par signe
 * en corps 14 gras) et relit les nombres du dessin.
 */
type Morceau = { n: number; label: string; sorte?: "part" | "autre" | "moins" };
const barres = (lignes: { nom: string; morceaux: Morceau[]; total?: string }[], total?: string) => {
  const nomW = Math.max(20, ...lignes.map((l) => l.nom.length * 8.8 + 10));
  const droiteW = Math.max(0, ...lignes.map((l) => (l.total ? l.total.length * 8.8 + 10 : 0)));
  const x0 = nomW;
  const W = 296 - x0 - droiteW;
  const unites = Math.max(...lignes.map((l) => l.morceaux.reduce((s, m) => s + m.n, 0)));
  const u = W / unites;
  const haut = total ? 30 : 6;
  const H = haut + lignes.length * 44;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg
        viewBox={`0 0 300 ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Schéma en barres${total ? `, total ${total}` : ""} : ${lignes.map((l) => `${l.nom}, ${l.morceaux.map((m) => m.label).join(" + ")}`).join(" ; ")}.`}
      >
        {total ? (
          <text x={150} y={16} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
            {`total : ${total}`}
          </text>
        ) : null}
        {lignes.map((l, i) => {
          const y = haut + i * 44;
          let x = x0;
          return (
            <g key={i}>
              <text x={x0 - 6} y={y + 20} textAnchor="end" fontSize={14} fontWeight={700} fill={ENCRE}>
                {l.nom}
              </text>
              {l.morceaux.map((m, j) => {
                const w = m.n * u;
                const debut = x;
                x += w;
                const sorte = m.sorte ?? "part";
                return (
                  <g key={j}>
                    <rect
                      x={debut}
                      y={y}
                      width={w}
                      height={30}
                      fill={sorte === "part" ? BLEU : sorte === "autre" ? ORANGE : "#fff"}
                      stroke={sorte === "moins" ? ROUGE : "#fff"}
                      strokeWidth={sorte === "moins" ? 2 : 1.5}
                      strokeDasharray={sorte === "moins" ? "4 3" : undefined}
                    />
                    <text x={debut + w / 2} y={y + 20} textAnchor="middle" fontSize={14} fontWeight={700} fill={sorte === "moins" ? ROUGE : "#fff"}>
                      {m.label}
                    </text>
                  </g>
                );
              })}
              {l.total ? (
                <text x={296 - droiteW + 8} y={y + 20} fontSize={14} fontWeight={700} fill={ENCRE}>
                  {l.total}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * UN MOTIF ÉVOLUTIF : les étapes dessinées côte à côte, « étape n » dessous.
 *   · "carres" — n carrés en ligne, en allumettes (orange) ;
 *   · "triangles" — n triangles tête-bêche, en allumettes ;
 *   · "L" — des carreaux en L : une colonne de n, une ligne de n − 1 à droite ;
 *   · "tables" — n tables carrées collées, une chaise devant et derrière
 *     chaque table, une à chaque bout.
 * L'écart entre deux étapes laisse la place à leurs deux « étape n » (58).
 * ⭐ Le script recompte les allumettes, les carreaux et les chaises lui-même.
 */
const motif = (forme: "carres" | "triangles" | "L" | "tables", etapes: number[]) => {
  const s = forme === "carres" ? 18 : forme === "triangles" ? 24 : forme === "L" ? 14 : 22;
  const larg = (n: number) => (forme === "carres" ? n * s : forme === "triangles" ? ((n + 1) * s) / 2 : forme === "L" ? n * s : n * s + 20);
  const haut = (n: number) => (forme === "L" ? n * s : forme === "triangles" ? s * 0.87 : forme === "tables" ? s + 20 : s);
  const ecarts = etapes.slice(1).map((n, i) => Math.max(24, 58 - (larg(etapes[i]) + larg(n)) / 2));
  const totalW = etapes.reduce((a, n) => a + larg(n), 0) + ecarts.reduce((a, g) => a + g, 0);
  const base = 10 + Math.max(...etapes.map(haut));
  const H = base + 30;
  const debuts = etapes.map((_, i) => (300 - totalW) / 2 + etapes.slice(0, i).reduce((a, n) => a + larg(n), 0) + ecarts.slice(0, i).reduce((a, g) => a + g, 0));
  const allumette = (x1: number, y1: number, x2: number, y2: number, k: string) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const d = Math.hypot(dx, dy);
    const r = 2 / d;
    return <line key={k} x1={x1 + dx * r} y1={y1 + dy * r} x2={x2 - dx * r} y2={y2 - dy * r} stroke={ORANGE} strokeWidth={3} strokeLinecap="round" />;
  };
  const dessinEtape = (x: number, n: number) => {
    if (forme === "carres") {
      const traits: ReactNode[] = [];
      for (let k = 0; k < n; k++) {
        traits.push(allumette(x + k * s, base - s, x + (k + 1) * s, base - s, `h${k}`));
        traits.push(allumette(x + k * s, base, x + (k + 1) * s, base, `b${k}`));
      }
      for (let k = 0; k <= n; k++) traits.push(allumette(x + k * s, base - s, x + k * s, base, `v${k}`));
      return traits;
    }
    if (forme === "triangles") {
      const h = s * 0.87;
      const vus = new Set<string>();
      const traits: ReactNode[] = [];
      const ajoute = (a: [number, number], b: [number, number]) => {
        const cle = [a, b].map((p) => p.map((v) => v.toFixed(1)).join(",")).sort().join("|");
        if (vus.has(cle)) return;
        vus.add(cle);
        traits.push(allumette(a[0], a[1], b[0], b[1], cle));
      };
      for (let i = 0; i < n; i++) {
        const xl = x + (i * s) / 2;
        const [p, q, r]: [number, number][] =
          i % 2 === 0
            ? [[xl, base], [xl + s, base], [xl + s / 2, base - h]]
            : [[xl, base - h], [xl + s, base - h], [xl + s / 2, base]];
        ajoute(p, q);
        ajoute(q, r);
        ajoute(r, p);
      }
      return traits;
    }
    if (forme === "L") {
      const cases: [number, number][] = [];
      for (let k = 0; k < n; k++) cases.push([0, k]);
      for (let k = 1; k < n; k++) cases.push([k, 0]);
      return cases.map(([c, r]) => <rect key={`${c}-${r}`} x={x + c * s} y={base - (r + 1) * s} width={s} height={s} fill="#bfdbfe" stroke={BLEU} strokeWidth={1.5} />);
    }
    const objets: ReactNode[] = [];
    for (let k = 0; k < n; k++) {
      objets.push(<rect key={`t${k}`} x={x + 10 + k * s} y={base - 10 - s} width={s} height={s} fill="#fde68a" stroke="#92400e" strokeWidth={1.5} />);
      objets.push(<circle key={`h${k}`} cx={x + 10 + k * s + s / 2} cy={base - 15 - s} r={5} fill={BLEU} />);
      objets.push(<circle key={`b${k}`} cx={x + 10 + k * s + s / 2} cy={base - 5} r={5} fill={BLEU} />);
    }
    objets.push(<circle key="g" cx={x + 4} cy={base - 10 - s / 2} r={5} fill={BLEU} />);
    objets.push(<circle key="d" cx={x + 16 + n * s} cy={base - 10 - s / 2} r={5} fill={BLEU} />);
    return objets;
  };
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Un motif, étapes ${etapes.join(", ")}.`}>
        {etapes.map((n, i) => (
          <g key={i}>
            {dessinEtape(debuts[i], n)}
            <text x={debuts[i] + larg(n) / 2} y={base + 22} textAnchor="middle" fontSize={14} fill={ENCRE}>
              {`étape ${n}`}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export const exercicesAlgebreProbleme6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "algebre-probleme",
  titre: "Problèmes à nombres inconnus et motifs",
  accroche:
    "Vingt exercices, du plus simple au problème. On cherche des nombres inconnus sans lettre : on dessine un schéma en barres, on retire, on partage, on échange. On observe des motifs qui grandissent pour prévoir la suite. Des billes, des allumettes, une balance, un banquet, une tirelire, des places de cinéma. Un rappel avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le schéma dessiné.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je dessine d'abord le schéma en barres, ou je regarde bien le motif. Puis je calcule.",
      rappel: [
        "Un schéma en barres : une barre par nombre inconnu. Les barres pareilles ont la même longueur.",
        "Si une barre dépasse, je retire ce qui dépasse. Puis je partage en parts égales.",
        "Un motif : je compte ce qu'on AJOUTE d'une étape à la suivante.",
      ],
      exercices: [
        {
          enonce: "Léo et Mia ont $30$ billes à eux deux. Mia a $6$ billes de plus que Léo. Combien de billes a chacun ?",
          correction:
            "Je dessine une barre pour Léo et une pour Mia.\nLa barre de Mia, c'est celle de Léo plus $6$.\nJe retire les $6$ billes en plus : $30 - 6 = 24$.\nIl reste $2$ barres égales : $24 \\div 2 = 12$.\nLéo a $12$ billes. Mia a $12 + 6 = 18$ billes.\n⭐ Je vérifie : $12 + 18 = 30$.\n⛔ Le piège : partager $30$ en deux, $15$ et $15$. Mia n'aurait pas $6$ billes de plus.\nRéponse : Léo a $12$ billes, Mia a $18$ billes.",
          schema: barres(
            [
              { nom: "Léo", morceaux: [{ n: 12, label: "12" }] },
              { nom: "Mia", morceaux: [{ n: 12, label: "12" }, { n: 6, label: "6", sorte: "autre" }] },
            ],
            "30 billes",
          ),
          micros: ["algebre_barres"],
        },
        {
          enonce: "Un livre et un cahier coûtent $11$ € ensemble. Le livre coûte $7$ € de plus que le cahier.\na) Dessine le schéma en barres.\nb) Combien coûte le cahier ? Et le livre ?",
          correction:
            "a) Une barre pour le cahier. Pour le livre : la même barre, plus $7$ €.\nb) Je retire les $7$ € en plus : $11 - 7 = 4$.\nIl reste deux barres égales : $4 \\div 2 = 2$.\nLe cahier coûte $2$ €. Le livre coûte $2 + 7 = 9$ €.\n⭐ Je vérifie : $2 + 9 = 11$.\n⛔ Le piège : répondre $4$ €. Ces $4$ € sont pour DEUX barres.\nRéponse : le cahier coûte $2$ €, le livre $9$ €.",
          schema: barres(
            [
              { nom: "cahier", morceaux: [{ n: 2, label: "2 €" }] },
              { nom: "livre", morceaux: [{ n: 2, label: "2 €" }, { n: 7, label: "7 €", sorte: "autre" }] },
            ],
            "11 €",
          ),
          micros: ["algebre_barres"],
        },
        {
          enonce: "Une classe compte $24$ élèves. Il y a deux fois plus de filles que de garçons. Combien y a-t-il de garçons ? Et de filles ?",
          correction:
            "Les garçons : une part. Les filles : deux parts, le double.\nEn tout, il y a $1 + 2 = 3$ parts égales.\n$3$ parts font $24$ élèves : $24 \\div 3 = 8$.\nIl y a $8$ garçons, et $2 \\times 8 = 16$ filles.\n⭐ Je vérifie : $8 + 16 = 24$.\n⛔ Le piège : partager $24$ en $2$, à cause de « deux fois ». Il y a $3$ parts, pas $2$.\nRéponse : $8$ garçons et $16$ filles.",
          schema: ecranSeulement(
            barres(
              [
                { nom: "garçons", morceaux: [{ n: 8, label: "8" }] },
                { nom: "filles", morceaux: [{ n: 8, label: "8" }, { n: 8, label: "8" }] },
              ],
              "24 élèves",
            ),
          ),
          micros: ["algebre_barres"],
        },
        {
          enonce: "Un sac contient $2$ pommes pareilles et $1$ melon. Le sac pèse $900$ g. Le melon pèse $500$ g. Combien pèse une pomme ?",
          correction:
            "Je dessine le sac : deux pommes, puis le melon.\nJe retire le melon : $900 - 500 = 400$ g.\nIl reste deux pommes pareilles : $400 \\div 2 = 200$ g.\n⭐ Je vérifie : $200 + 200 + 500 = 900$.\n⛔ Le piège : s'arrêter à $400$ g. C'est le poids des DEUX pommes.\nRéponse : une pomme pèse $200$ g.",
          schema: barres(
            [{ nom: "sac", morceaux: [{ n: 2, label: "200" }, { n: 2, label: "200" }, { n: 5, label: "500", sorte: "autre" }] }],
            "900 g",
          ),
          micros: ["algebre_inconnues"],
        },
        {
          enonce: "Voici un motif de carrés faits avec des allumettes.\na) Compte les allumettes des étapes $1$, $2$ et $3$.\nb) Combien d'allumettes ajoute-t-on à chaque étape ?\nc) Combien d'allumettes à l'étape $4$ ? À l'étape $5$ ?",
          figure: motif("carres", [1, 2, 3]),
          correction:
            "a) Étape $1$ : $4$ allumettes. Étape $2$ : $7$. Étape $3$ : $10$.\nb) De $4$ à $7$, puis de $7$ à $10$, j'ajoute $3$ allumettes.\nUn carré collé au dernier demande $3$ allumettes, pas $4$.\nc) Étape $4$ : $10 + 3 = 13$. Étape $5$ : $13 + 3 = 16$.\n⛔ Le piège : compter $4$ allumettes par carré. Deux carrés voisins PARTAGENT une allumette.\nRéponse : $4$, $7$, $10$ ; $3$ de plus à chaque étape ; $13$ et $16$.",
          schema: ecranSeulement(
            table(["Étape", "Allumettes"], [
              ["1", "4"],
              ["2", "7"],
              ["3", "10"],
              ["4", "13"],
              ["5", "16"],
            ]),
          ),
          micros: ["algebre_motif"],
        },
        {
          enonce: "Voici un motif de carreaux en forme de L.\na) Combien de carreaux à chaque étape dessinée ?\nb) Combien de carreaux à l'étape $4$ ?\nc) Et à l'étape $10$ ?",
          figure: motif("L", [1, 2, 3]),
          correction:
            "a) Étape $1$ : $1$ carreau. Étape $2$ : $3$. Étape $3$ : $5$.\nb) À chaque étape, j'ajoute $2$ carreaux : un en haut, un à droite.\nÉtape $4$ : $5 + 2 = 7$ carreaux.\nc) De l'étape $1$ à l'étape $10$, il y a $9$ ajouts de $2$.\n$1 + 9 \\times 2 = 19$ carreaux.\n⛔ Le piège : compter $10$ ajouts. L'étape $1$ n'a pas d'ajout.\nRéponse : $1$, $3$, $5$ ; $7$ ; $19$.",
          micros: ["algebre_motif"],
        },
        {
          enonce: "$2$ stylos et $1$ gomme coûtent $5$ €. $3$ stylos et $1$ gomme coûtent $6{,}50$ €. Les stylos ont tous le même prix. Combien coûte un stylo ? Et la gomme ?",
          correction:
            "Je dessine les deux achats l'un sous l'autre.\nLe deuxième a juste un stylo de plus.\nCe stylo coûte la différence : $6{,}50 - 5 = 1{,}50$ €.\nDans le premier achat, les $2$ stylos coûtent $2 \\times 1{,}50 = 3$ €.\nLa gomme coûte $5 - 3 = 2$ €.\n⭐ Je vérifie : $3 \\times 1{,}50 + 2 = 6{,}50$.\nRéponse : un stylo coûte $1{,}50$ €, la gomme $2$ €.",
          schema: barres([
            { nom: "A", morceaux: [{ n: 3, label: "1,50" }, { n: 3, label: "1,50" }, { n: 4, label: "2", sorte: "autre" }], total: "5 €" },
            { nom: "B", morceaux: [{ n: 3, label: "1,50" }, { n: 3, label: "1,50" }, { n: 3, label: "1,50" }, { n: 4, label: "2", sorte: "autre" }], total: "6,50 €" },
          ]),
          micros: ["algebre_inconnues"],
        },
        {
          enonce: "Voici un motif de triangles faits avec des allumettes.\na) Combien d'allumettes à chaque étape dessinée ?\nb) Combien en ajoute-t-on à chaque étape ?\nc) Combien d'allumettes à l'étape $5$ ?",
          figure: motif("triangles", [1, 2, 3, 4]),
          correction:
            "a) Étape $1$ : $3$. Étape $2$ : $5$. Étape $3$ : $7$. Étape $4$ : $9$.\nb) J'ajoute $2$ allumettes à chaque étape.\nLe nouveau triangle réutilise un côté du triangle d'avant.\nc) Étape $5$ : $9 + 2 = 11$ allumettes.\n⛔ Le piège : compter $3$ allumettes par triangle, $5 \\times 3 = 15$. Les triangles voisins partagent un côté.\nRéponse : $3$, $5$, $7$, $9$ ; $2$ ; $11$ allumettes.",
          micros: ["algebre_motif"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je dessine le schéma en barres, puis je calcule étape par étape. Je vérifie avec les nombres de l'énoncé.",
      rappel: [
        "Je dessine la plus petite barre d'abord. Les autres se construisent à partir d'elle.",
        "Deux achats presque pareils : leur différence donne le prix de ce qui change.",
        "Échanger, c'est remplacer un objet par un autre de même poids ou de même prix.",
      ],
      exercices: [
        {
          enonce: "Trois équipes ont couru $57$ km en tout. Les Verts ont couru $4$ km de plus que les Bleus. Les Rouges ont couru $5$ km de plus que les Bleus. Combien de km chaque équipe a-t-elle couru ?",
          correction:
            "Je dessine trois barres. Celle des Bleus est la plus courte.\nLes Verts : la barre des Bleus, plus $4$ km.\nLes Rouges : la barre des Bleus, plus $5$ km.\nJe retire ce qui dépasse : $57 - 4 - 5 = 48$.\nIl reste $3$ barres égales : $48 \\div 3 = 16$.\nBleus : $16$ km. Verts : $16 + 4 = 20$ km. Rouges : $16 + 5 = 21$ km.\n⭐ Je vérifie : $16 + 20 + 21 = 57$.\nRéponse : Bleus $16$ km, Verts $20$ km, Rouges $21$ km.",
          schema: barres(
            [
              { nom: "Bleus", morceaux: [{ n: 16, label: "16" }] },
              { nom: "Verts", morceaux: [{ n: 16, label: "16" }, { n: 4, label: "4", sorte: "autre" }] },
              { nom: "Rouges", morceaux: [{ n: 16, label: "16" }, { n: 5, label: "5", sorte: "autre" }] },
            ],
            "57 km",
          ),
          micros: ["algebre_barres"],
        },
        {
          enonce: "Deux sacs de riz pèsent $17$ kg ensemble. Le petit sac pèse $3$ kg de moins que le grand. Combien pèse chaque sac ?",
          correction:
            "Je dessine les deux sacs. Au petit, il manque $3$ kg pour être comme le grand.\nJ'ajoute ces $3$ kg : $17 + 3 = 20$.\nJ'ai alors deux grands sacs : $20 \\div 2 = 10$.\nLe grand sac pèse $10$ kg. Le petit pèse $10 - 3 = 7$ kg.\n⭐ Je vérifie : $10 + 7 = 17$.\n⭐ Autre chemin : je retire $3$ kg au grand. $17 - 3 = 14$, et $14 \\div 2 = 7$ : c'est le petit.\n⛔ Le piège : oublier la barre en pointillés. Les $3$ kg qui manquent ne sont pas dans les $17$ kg.\nRéponse : le grand sac pèse $10$ kg, le petit $7$ kg.",
          schema: ecranSeulement(
            barres(
              [
                { nom: "grand", morceaux: [{ n: 10, label: "10" }] },
                { nom: "petit", morceaux: [{ n: 7, label: "7" }, { n: 3, label: "−3", sorte: "moins" }] },
              ],
              "17 kg",
            ),
          ),
          micros: ["algebre_barres"],
        },
        {
          enonce: "Au café, $2$ croissants et $1$ jus coûtent $4{,}50$ €. $2$ croissants et $3$ jus coûtent $8{,}50$ €. Combien coûte un jus ? Et un croissant ?",
          correction:
            "Je compare les deux commandes. La deuxième a $2$ jus de plus.\nCes $2$ jus coûtent : $8{,}50 - 4{,}50 = 4$ €.\nUn jus coûte $4 \\div 2 = 2$ €.\nDans la première commande : $4{,}50 - 2 = 2{,}50$ € pour $2$ croissants.\nUn croissant coûte $2{,}50 \\div 2 = 1{,}25$ €.\n⭐ Je vérifie : $2 \\times 1{,}25 + 3 \\times 2 = 8{,}50$.\n⛔ Le piège : croire que $4$ € est le prix d'UN jus. Il y a $2$ jus de plus.\nRéponse : un jus coûte $2$ €, un croissant $1{,}25$ €.",
          schema: ecranSeulement(
            barres([
              { nom: "A", morceaux: [{ n: 4, label: "1,25" }, { n: 4, label: "1,25" }, { n: 4, label: "2", sorte: "autre" }], total: "4,50 €" },
              { nom: "B", morceaux: [{ n: 4, label: "1,25" }, { n: 4, label: "1,25" }, { n: 4, label: "2", sorte: "autre" }, { n: 4, label: "2", sorte: "autre" }, { n: 4, label: "2", sorte: "autre" }], total: "8,50 €" },
            ]),
          ),
          micros: ["algebre_inconnues"],
        },
        {
          enonce: "Un gâteau pèse autant que $3$ pommes. $2$ gâteaux et $1$ pomme pèsent $1\\,400$ g. Combien pèse une pomme ? Et un gâteau ?",
          correction:
            "J'échange chaque gâteau contre $3$ pommes : c'est le même poids.\n$2$ gâteaux, c'est $2 \\times 3 = 6$ pommes.\nAvec la pomme en plus, j'ai $6 + 1 = 7$ pommes.\n$7$ pommes pèsent $1\\,400$ g : $1\\,400 \\div 7 = 200$ g.\nUn gâteau pèse $3 \\times 200 = 600$ g.\n⭐ Je vérifie : $600 + 600 + 200 = 1\\,400$.\n⛔ Le piège : partager $1\\,400$ en $3$, parce qu'il y a $3$ objets. Ils n'ont pas le même poids.\nRéponse : une pomme pèse $200$ g, un gâteau $600$ g.",
          schema: barres(
            [
              { nom: "avant", morceaux: [{ n: 6, label: "600", sorte: "autre" }, { n: 6, label: "600", sorte: "autre" }, { n: 2, label: "200" }] },
              { nom: "après", morceaux: [{ n: 2, label: "200" }, { n: 2, label: "200" }, { n: 2, label: "200" }, { n: 2, label: "200" }, { n: 2, label: "200" }, { n: 2, label: "200" }, { n: 2, label: "200" }] },
            ],
            "1 400 g",
          ),
          micros: ["algebre_inconnues"],
        },
        {
          enonce: "On reprend le motif de carrés de l'exercice $5$. Il a $4$ allumettes à l'étape $1$, puis $3$ de plus à chaque étape.\na) Combien d'allumettes à l'étape $20$ ?\nb) Emma calcule $20 \\times 4 = 80$. Pourquoi est-ce faux ?",
          correction:
            "a) De l'étape $1$ à l'étape $20$, il y a $19$ ajouts de $3$ allumettes.\n$4 + 19 \\times 3 = 4 + 57 = 61$ allumettes.\nb) Emma compte $4$ allumettes pour chaque carré.\nMais deux carrés voisins partagent une allumette.\nChaque nouveau carré n'en demande que $3$.\n⭐ Autre façon de voir : $1$ allumette au début, puis $3$ par carré. $1 + 20 \\times 3 = 61$.\nRéponse : $61$ allumettes ; Emma compte deux fois les allumettes partagées.",
          schema: ecranSeulement(
            table(["Étape", "Allumettes", "Calcul"], [
              ["1", "4", "4"],
              ["2", "7", "4 + 3"],
              ["3", "10", "4 + 2 × 3"],
              ["20", "61", "4 + 19 × 3"],
            ]),
          ),
          micros: ["algebre_motif"],
        },
        {
          enonce: "On reprend le motif de triangles de l'exercice $8$. Il a $3$ allumettes à l'étape $1$, puis $2$ de plus à chaque étape. Tom a une boîte de $50$ allumettes.\na) Quelle est la plus grande étape qu'il peut construire ?\nb) Combien d'allumettes lui reste-t-il ?",
          correction:
            "Il faut $3$ allumettes pour commencer. Il en reste $50 - 3 = 47$ pour les ajouts.\nChaque ajout demande $2$ allumettes : $47 \\div 2 = 23$, et il reste $1$.\nTom fait $23$ ajouts après l'étape $1$ : il arrive à l'étape $24$.\nL'étape $24$ demande $3 + 23 \\times 2 = 49$ allumettes.\nIl reste $50 - 49 = 1$ allumette.\n⛔ Le piège : oublier l'étape $1$ et répondre « étape $23$ ».\nRéponse : l'étape $24$ ; il reste $1$ allumette.",
          schema: ecranSeulement(
            table(["Étape", "Allumettes"], [
              ["1", "3"],
              ["2", "5"],
              ["24", "49"],
              ["25", "51"],
            ]),
          ),
          micros: ["algebre_defi"],
        },
        {
          enonce: "Une ficelle de $35$ cm est coupée en deux morceaux. Le grand morceau est $4$ fois plus long que le petit. Combien mesure chaque morceau ?",
          correction:
            "Le petit morceau : $1$ part. Le grand : $4$ parts pareilles.\nEn tout : $1 + 4 = 5$ parts égales.\n$35 \\div 5 = 7$ : une part mesure $7$ cm.\nLe petit mesure $7$ cm, le grand $4 \\times 7 = 28$ cm.\n⭐ Je vérifie : $7 + 28 = 35$.\n⛔ Le piège : diviser $35$ par $4$. Il y a $5$ parts, pas $4$.\nRéponse : $7$ cm et $28$ cm.",
          schema: ecranSeulement(
            barres(
              [
                { nom: "petit", morceaux: [{ n: 7, label: "7" }] },
                { nom: "grand", morceaux: [{ n: 7, label: "7" }, { n: 7, label: "7" }, { n: 7, label: "7" }, { n: 7, label: "7" }] },
              ],
              "35 cm",
            ),
          ),
          micros: ["algebre_barres", "algebre_defi"],
        },
        {
          enonce: "Sur une balance, $3$ cubes et $1$ boule pèsent autant que $2$ cubes et $4$ boules. Une boule pèse $20$ g.\na) Un cube pèse autant que combien de boules ?\nb) Combien pèse un cube ?",
          correction:
            "J'enlève $2$ cubes de chaque côté. La balance reste en équilibre.\nIl reste $1$ cube et $1$ boule d'un côté, $4$ boules de l'autre.\nJ'enlève $1$ boule de chaque côté.\nIl reste $1$ cube d'un côté, $3$ boules de l'autre.\na) Un cube pèse autant que $3$ boules.\nb) $3 \\times 20 = 60$ g.\n⭐ Je vérifie : $3 \\times 60 + 20 = 200$ et $2 \\times 60 + 4 \\times 20 = 200$.\n⛔ Le piège : enlever d'un seul côté. On enlève la même chose des DEUX côtés.\nRéponse : un cube pèse autant que $3$ boules, soit $60$ g.",
          schema: barres([
            { nom: "gauche", morceaux: [{ n: 6, label: "60" }, { n: 6, label: "60" }, { n: 6, label: "60" }, { n: 2, label: "20", sorte: "autre" }] },
            { nom: "droite", morceaux: [{ n: 6, label: "60" }, { n: 6, label: "60" }, { n: 2, label: "20", sorte: "autre" }, { n: 2, label: "20", sorte: "autre" }, { n: 2, label: "20", sorte: "autre" }, { n: 2, label: "20", sorte: "autre" }] },
          ]),
          micros: ["algebre_inconnues", "algebre_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je dessine, je calcule, puis je vérifie avec l'énoncé.",
      rappel: [
        "Je dessine le schéma en barres avant de calculer.",
        "Je retire ce qui dépasse, puis je partage en parts égales.",
        "À la fin, je vérifie avec TOUS les nombres de l'énoncé.",
      ],
      exercices: [
        {
          titre: "La tirelire",
          enonce: "Zoé et Hugo ont $84$ € à eux deux. Zoé a $12$ € de plus que Hugo.\na) Dessine le schéma en barres.\nb) Combien chacun a-t-il ?\nc) Zoé donne $6$ € à Hugo. Combien a maintenant chacun ?\nd) Ils achètent ensemble un jeu à $50$ €. Chacun paie la moitié. Combien reste-t-il à chacun ?",
          correction:
            "a) Une barre pour Hugo. Pour Zoé : la même barre, plus $12$ €.\nb) Je retire les $12$ € en plus : $84 - 12 = 72$.\nDeux barres égales : $72 \\div 2 = 36$.\nHugo a $36$ €. Zoé a $36 + 12 = 48$ €.\nc) Zoé : $48 - 6 = 42$ €. Hugo : $36 + 6 = 42$ €.\nIls ont la même somme : Zoé a donné la moitié de son avance.\nd) Chacun paie $50 \\div 2 = 25$ €.\nIl reste à chacun $42 - 25 = 17$ €.\n⭐ Je vérifie : $17 + 17 + 50 = 84$.\n⛔ Le piège : partager $84$ en deux dès le début. Zoé a plus que Hugo.\nRéponse : Hugo $36$ €, Zoé $48$ € ; puis $42$ € chacun ; il reste $17$ € à chacun.",
          schema: barres(
            [
              { nom: "Hugo", morceaux: [{ n: 36, label: "36" }] },
              { nom: "Zoé", morceaux: [{ n: 36, label: "36" }, { n: 12, label: "12", sorte: "autre" }] },
            ],
            "84 €",
          ),
          micros: ["algebre_barres", "algebre_defi"],
        },
        {
          titre: "Le banquet",
          enonce: "Pour une fête, on colle des tables carrées en ligne. On place les chaises comme sur le dessin.\na) Combien de chaises pour $1$, $2$ et $3$ tables ?\nb) Combien de chaises ajoute chaque nouvelle table ?\nc) Combien de chaises pour $10$ tables ?\nd) $30$ personnes viennent. Combien de tables faut-il coller ?",
          figure: motif("tables", [1, 2, 3]),
          correction:
            "a) $1$ table : $4$ chaises. $2$ tables : $6$ chaises. $3$ tables : $8$ chaises.\nb) Une table de plus ajoute $2$ chaises : une devant, une derrière.\nLes chaises des deux bouts ne changent pas.\nc) De $1$ à $10$ tables, il y a $9$ ajouts de $2$ chaises.\n$4 + 9 \\times 2 = 22$ chaises.\nd) Avec $1$ table, il y a $4$ chaises. Il en manque $30 - 4 = 26$.\n$26 \\div 2 = 13$ tables de plus.\nIl faut $1 + 13 = 14$ tables.\n⭐ Je vérifie : $4 + 13 \\times 2 = 30$.\n⛔ Le piège : compter $4$ chaises par table, $10 \\times 4 = 40$. Les tables collées perdent des places.\nRéponse : $4$, $6$, $8$ ; $2$ ; $22$ chaises ; $14$ tables.",
          schema: ecranSeulement(
            table(["Tables", "Chaises"], [
              ["1", "4"],
              ["2", "6"],
              ["3", "8"],
              ["10", "22"],
              ["14", "30"],
            ]),
          ),
          micros: ["algebre_motif", "algebre_defi"],
        },
        {
          titre: "Les randonneurs",
          enonce: "Ana, Ben et Chloé portent $30$ kg de matériel à eux trois. Ana porte $2$ kg de plus que Ben. Chloé porte le double de Ben.\na) Dessine le schéma en barres.\nb) Combien porte chacun ?\nc) Ils veulent porter tous la même masse. Combien Chloé doit-elle donner à Ben ? Et à Ana ?",
          correction:
            "a) Ben : $1$ barre. Ana : la barre de Ben, plus $2$ kg. Chloé : $2$ barres.\nb) Je retire les $2$ kg d'Ana : $30 - 2 = 28$.\nIl reste $1 + 1 + 2 = 4$ barres égales : $28 \\div 4 = 7$.\nBen porte $7$ kg. Ana porte $7 + 2 = 9$ kg. Chloé porte $2 \\times 7 = 14$ kg.\n⭐ Je vérifie : $7 + 9 + 14 = 30$.\nc) La même masse pour tous : $30 \\div 3 = 10$ kg.\nBen doit recevoir $10 - 7 = 3$ kg. Ana doit recevoir $10 - 9 = 1$ kg.\nChloé donne $3 + 1 = 4$ kg, et garde $14 - 4 = 10$ kg.\n⛔ Le piège : compter $3$ barres. Chloé en a DEUX à elle seule.\nRéponse : Ben $7$ kg, Ana $9$ kg, Chloé $14$ kg.\nChloé donne $3$ kg à Ben et $1$ kg à Ana.",
          schema: barres(
            [
              { nom: "Ben", morceaux: [{ n: 7, label: "7" }] },
              { nom: "Ana", morceaux: [{ n: 7, label: "7" }, { n: 2, label: "2", sorte: "autre" }] },
              { nom: "Chloé", morceaux: [{ n: 7, label: "7" }, { n: 7, label: "7" }] },
            ],
            "30 kg",
          ),
          micros: ["algebre_barres", "algebre_defi"],
        },
        {
          titre: "Les places de cinéma",
          enonce: "Au cinéma, $2$ places adulte et $3$ places enfant coûtent $44$ €. Une place adulte coûte $2$ € de plus qu'une place enfant.\na) Combien coûte une place enfant ? Une place adulte ?\nb) Combien coûtent $3$ places adulte et $2$ places enfant ?\nc) Une famille a $60$ €. Peut-elle payer $2$ places adulte et $4$ places enfant ?",
          correction:
            "a) Une place adulte, c'est une place enfant plus $2$ €.\nJ'échange : $2$ places adulte, c'est $2$ places enfant plus $4$ €.\nLes $44$ € paient donc $5$ places enfant, plus $4$ €.\n$44 - 4 = 40$, et $40 \\div 5 = 8$.\nUne place enfant coûte $8$ €. Une place adulte coûte $8 + 2 = 10$ €.\n⭐ Je vérifie : $2 \\times 10 + 3 \\times 8 = 44$.\nb) $3 \\times 10 + 2 \\times 8 = 30 + 16 = 46$ €.\nc) $2 \\times 10 + 4 \\times 8 = 20 + 32 = 52$ €. C'est moins que $60$ € : oui.\nIl lui reste $60 - 52 = 8$ €.\n⛔ Le piège : partager $44$ en $5$ places. Les places adulte coûtent plus cher.\nRéponse : $8$ € et $10$ € ; $46$ € ; oui, et il reste $8$ €.",
          schema: barres(
            [
              { nom: "adultes", morceaux: [{ n: 8, label: "8" }, { n: 2, label: "2", sorte: "autre" }, { n: 8, label: "8" }, { n: 2, label: "2", sorte: "autre" }] },
              { nom: "enfants", morceaux: [{ n: 8, label: "8" }, { n: 8, label: "8" }, { n: 8, label: "8" }] },
            ],
            "44 €",
          ),
          micros: ["algebre_inconnues", "algebre_defi"],
        },
      ],
    },
  ],
};
