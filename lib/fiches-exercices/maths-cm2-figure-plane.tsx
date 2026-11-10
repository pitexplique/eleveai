// ─── Fiche d'exercices : les figures planes (CM2) — 20 exercices corrigés ─────
//
// 10/11/2026 (session fiches-cm2), sur le modèle des feuilles CM2 du tableau et
// du graphique : texte simple, sans KaTeX, « × » et « ÷ », phrases courtes.
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-figure-plane` (« Les
// figures planes »), sur la banque `lib/tutor-v4/questionBank/cm2/maths/
// figures-planes.bank.ts` et sur la carte mentale remplie (`cm2/figure_plane`),
// notionId figure_plane : reconnaître une figure, les triangles, les
// quadrilatères, le cercle (centre, rayon, diamètre), lire un codage, cercle et
// disque, lire un programme de construction, utiliser les propriétés,
// construire, défis.
// ⛔ CM2 = AUCUNE question ouverte. « Écrire un programme de construction » et
// « construire » se travaillent en LISANT : choisir le bon programme (QCM),
// trouver la mesure qui manque, l'instrument, la figure obtenue, une longueur
// de la figure construite.
// ⛔ Aucun exemple de la carte mentale n'est repris (triangle 4 / 4 / 6,
// potager 20 m × 10 m, compas de 3 cm, carré de 7 cm, rectangle 5 × 3, triangle
// de tour 15 cm).
//
// Les pièges nommés : le cercle compté comme une figure à côtés (1),
// l'équilatéral cru non isocèle (2, 9), le carré cru non rectangle (3), rayon et
// diamètre confondus (4, 12, 18), une longueur crue égale sans codage (5), un
// point du cercle dit « dedans » (6), les côtés voisins crus égaux dans un
// rectangle (7, 15), le centre du cercle au mauvais bout (8), le losange cru
// carré (10), le côté commun compté dans le contour (11), le programme sans
// mesure (13), le rayon pris pour la base (14), diviser par 4 au lieu de 3
// (16), les seuls petits triangles comptés (17), l'angle droit au mauvais
// sommet (19), le rayon au lieu du diamètre pour la longueur de la boîte (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : carrelage (1), fanions de fête (2),
// architecture (3), jardin (4), menuiserie (5), arrosage du stade (6),
// handball (7), atelier de couture (8), charpente (9), cerf-volant (10),
// façade de chalet (11), tir à l'arc (12), atelier de dessin (13), maquette
// (14), encadrement (15), élevage de chèvres (16), vitrail (17), drapeau
// d'équipe (18), plan d'un pupitre (19), balles de tennis (20). Aucun décor de
// La Réunion sur cette feuille.
// Les métiers : carreleuse (1), architecte (3), jardinier (4), menuisier (5),
// couturière (8), charpentière (9), dessinatrice (11), encadreuse (15), éleveuse (16),
// maître-verrier (17).
// Aucun fait réel à vérifier : tout est un MODÈLE (les dimensions du terrain de
// handball, 40 m sur 20 m, sont celles du règlement).
//
// ⭐ LES DESSINS : une aide locale, `geo`, qui trace des polygones nommés par
// leurs sommets, le CODAGE (petits traits, angles droits), des cercles, des
// arcs de compas et des cotes. Les coordonnées sont écrites EN CLAIR dans
// chaque appel ; le script de contrôle (scratchpad) recalcule chaque longueur
// codée égale, chaque angle droit, chaque distance au centre.
//
// Micro-compétences : figure_reconnaitre (1, 17), figure_triangle (2, 9, 14,
// 19), figure_quadrilatere (3, 10, 15), figure_cercle (4, 12, 18, 20),
// figure_codage (5, 10, 11), cercle_ensemble_points (6, 12),
// figure_programme_construction (8, 13, 19), figure_propriete (7, 11, 15, 18),
// figure_construire (13, 14, 19), figure_defi (16, 17, 18, 20). 10/10.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const NOIR = "#0f172a";
const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const ORANGE = "#ea580c";

type P = [number, number];

type Geo = {
  /** Hauteur du dessin (la largeur est toujours 300). */
  h: number;
  /** Les points, en coordonnées du dessin (y vers le bas). « A_2 » s'affiche « A » ; « _x » ne s'affiche pas. */
  pts: Record<string, P>;
  polys?: string[][];
  segs?: [string, string][];
  /** Petits traits du codage : [point, point, nombre de traits]. */
  traits?: [string, string, number][];
  /** Angles droits : [point, SOMMET, point]. */
  droits?: [string, string, string][];
  cercles?: { c: string; r: number; fond?: boolean; couleur?: string }[];
  /** Arcs de compas, angles en degrés (sens inverse des aiguilles d'une montre). */
  arcs?: { c: string; r: number; de: number; a: number }[];
  cotes?: { de: string; a: string; t: string; s?: 1 | -1 }[];
  textes?: { x: number; y: number; t: string; couleur?: string }[];
  /** Où écrire le nom d'un point, quand la place par défaut ne convient pas. */
  nomsEn?: Record<string, P>;
  label: string;
};

const unit = (a: P, b: P): P => {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  return [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
};
const centre = (ps: P[]): P => [ps.reduce((s, p) => s + p[0], 0) / ps.length, ps.reduce((s, p) => s + p[1], 0) / ps.length];
const f = (v: number) => Math.round(v * 10) / 10;

/**
 * Une FIGURE PLANE dessinée : polygones, segments, codage, cercles, arcs, cotes.
 * Le nom d'un point se pose à 15 du point, à l'opposé du centre de sa figure.
 * ⛔ Texte NU (SVG), police 14, largeur 300.
 */
const geo = (g: Geo) => {
  const P = (n: string) => g.pts[n];
  const tous = Object.values(g.pts);
  const figureDe = (noms: string[]): P => {
    const poly = (g.polys ?? []).find((pl) => noms.every((n) => pl.includes(n)));
    return centre(poly ? poly.map(P) : tous);
  };
  const nom = (k: string) => k.replace(/_.*$/, "");
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${g.h}`} className="block h-auto w-full" role="img" aria-label={g.label}>
        <rect x="0" y="0" width="300" height={g.h} rx="10" fill="#fff" />
        {(g.polys ?? []).map((pl, i) => (
          <polygon key={`p${i}`} points={pl.map((n) => P(n).map(f).join(",")).join(" ")} fill="#eff6ff" stroke={NOIR} strokeWidth={2.5} strokeLinejoin="round" />
        ))}
        {(g.cercles ?? []).map((c, i) => (
          <circle key={`c${i}`} cx={P(c.c)[0]} cy={P(c.c)[1]} r={c.r} fill={c.fond ? "#dbeafe" : "none"} stroke={c.couleur ?? BLEU} strokeWidth={2.5} />
        ))}
        {(g.arcs ?? []).map((a, i) => {
          const [cx, cy] = P(a.c);
          const pt = (d: number): P => [cx + a.r * Math.cos((d * Math.PI) / 180), cy - a.r * Math.sin((d * Math.PI) / 180)];
          const [p, q] = [pt(a.de), pt(a.a)];
          return <path key={`a${i}`} d={`M ${f(p[0])} ${f(p[1])} A ${a.r} ${a.r} 0 0 0 ${f(q[0])} ${f(q[1])}`} fill="none" stroke={ORANGE} strokeWidth={2} strokeDasharray="5 4" />;
        })}
        {(g.segs ?? []).map(([a, b], i) => (
          <line key={`s${i}`} x1={P(a)[0]} y1={P(a)[1]} x2={P(b)[0]} y2={P(b)[1]} stroke={NOIR} strokeWidth={2.5} strokeLinecap="round" />
        ))}
        {(g.traits ?? []).map(([a, b, n], i) => {
          const [A, B] = [P(a), P(b)];
          const u = unit(A, B);
          const v: P = [-u[1], u[0]];
          const m: P = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
          return (
            <g key={`t${i}`}>
              {Array.from({ length: n }, (_, k) => {
                const d = (k - (n - 1) / 2) * 5;
                const c: P = [m[0] + d * u[0], m[1] + d * u[1]];
                return <line key={k} x1={f(c[0] - 6 * v[0])} y1={f(c[1] - 6 * v[1])} x2={f(c[0] + 6 * v[0])} y2={f(c[1] + 6 * v[1])} stroke={ROUGE} strokeWidth={2.5} />;
              })}
            </g>
          );
        })}
        {(g.droits ?? []).map(([a, s, b], i) => {
          const S = P(s);
          const u = unit(S, P(a));
          const v = unit(S, P(b));
          const pts = [
            [S[0] + 11 * u[0], S[1] + 11 * u[1]],
            [S[0] + 11 * u[0] + 11 * v[0], S[1] + 11 * u[1] + 11 * v[1]],
            [S[0] + 11 * v[0], S[1] + 11 * v[1]],
          ];
          return <polyline key={`d${i}`} points={pts.map((p) => p.map(f).join(",")).join(" ")} fill="none" stroke={ROUGE} strokeWidth={2} />;
        })}
        {(g.cotes ?? []).map((c, i) => {
          const [A, B] = [P(c.de), P(c.a)];
          const u = unit(A, B);
          let v: P = [-u[1], u[0]];
          const m: P = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
          const o = figureDe([c.de, c.a]);
          if ((m[0] - o[0]) * v[0] + (m[1] - o[1]) * v[1] < 0) v = [-v[0], -v[1]];
          if (c.s === -1) v = [-v[0], -v[1]];
          return (
            <text key={`k${i}`} x={f(m[0] + 17 * v[0])} y={f(m[1] + 17 * v[1] + 5)} textAnchor="middle" fontSize="14" fontWeight="800" fill={BLEU} stroke="white" strokeWidth="3" paintOrder="stroke">
              {c.t}
            </text>
          );
        })}
        {Object.entries(g.pts).map(([k, p]) => {
          if (!nom(k)) return null;
          let at = g.nomsEn?.[k];
          if (!at) {
            const o = figureDe([k]);
            const u = Math.hypot(p[0] - o[0], p[1] - o[1]) > 1 ? unit(o, p) : ([0, -1] as P);
            at = [p[0] + 15 * u[0], p[1] + 15 * u[1] + 5];
          }
          return (
            <g key={`n${k}`}>
              <circle cx={p[0]} cy={p[1]} r={2.5} fill={NOIR} />
              <text x={f(at[0])} y={f(at[1])} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
                {nom(k)}
              </text>
            </g>
          );
        })}
        {(g.textes ?? []).map((t, i) => (
          <text key={`x${i}`} x={t.x} y={t.y} textAnchor="middle" fontSize="14" fontWeight="800" fill={t.couleur ?? NOIR}>
            {t.t}
          </text>
        ))}
      </svg>
    </div>
  );
};

export const exercicesFigurePlaneCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "figure-plane",
  titre: "Les figures planes",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître un triangle, un carré, un losange, un cercle. Lire le codage : les petits traits, l'angle droit. Le rayon et le diamètre. Lire un programme de construction et trouver la mesure qui manque. Un carrelage, un cerf-volant, une cible, un chalet, un vitrail, des balles de tennis. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/figure-plane", titre: "Les figures planes" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je regarde bien la figure avant de répondre.",
      rappel: [
        "Un triangle a 3 côtés. Un quadrilatère a 4 côtés.",
        "Des petits traits pareils : les côtés ont la même longueur. Un petit carré : un angle droit.",
        "Le rayon va du centre au cercle. Le diamètre traverse le cercle : il fait 2 rayons.",
        "Un carré a 4 angles droits : c'est aussi un rectangle.",
      ],
      exercices: [
        {
          enonce:
            "Une carreleuse découpe des carreaux de formes différentes.\na) Quel numéro porte le triangle ?\nb) Combien de côtés a la figure 4 ?\nc) Quelle figure n'a aucun côté droit ? Donne son numéro.",
          figure: geo({
            h: 118,
            label: "Quatre carreaux numérotés de 1 à 4",
            pts: {
              _a: [15, 30], _b: [85, 30], _c: [85, 80], _d: [15, 80],
              _e: [105, 80], _f: [165, 80], _g: [135, 28],
              _o: [200, 55],
              _h1: [293, 55], _h2: [279, 79.2], _h3: [251, 79.2], _h4: [237, 55], _h5: [251, 30.8], _h6: [279, 30.8],
            },
            polys: [["_a", "_b", "_c", "_d"], ["_e", "_f", "_g"], ["_h1", "_h2", "_h3", "_h4", "_h5", "_h6"]],
            cercles: [{ c: "_o", r: 27, couleur: NOIR }],
            textes: [{ x: 50, y: 108, t: "1" }, { x: 135, y: 108, t: "2" }, { x: 200, y: 108, t: "3" }, { x: 265, y: 108, t: "4" }],
          }),
          correction:
            "Je compte les côtés de chaque figure.\na) La figure 2 a 3 côtés : c'est le triangle.\nb) La figure 4 a 6 côtés. Je les compte en tournant autour, sans en sauter.\nc) La figure 3 est un cercle. C'est une ligne courbe : elle n'a aucun côté droit.\nLa figure 1 a 4 côtés : c'est un rectangle.\n⛔ Le piège : chercher des côtés au cercle. Il n'en a pas : il est tout rond.\nRéponse : a) 2 ; b) 6 côtés ; c) la figure 3.",
          micros: ["figure_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["2", "figure 2"] },
            { question: "b)", attendu: ["6", "6 côtés"] },
            { question: "c)", attendu: ["3", "figure 3"] },
          ],
        },
        {
          enonce:
            "Pour la fête de l'école, on découpe trois fanions. Regarde le codage.\na) Quel fanion est un triangle rectangle ? Donne son numéro.\nb) Quel fanion est un triangle équilatéral ?\nc) Le fanion équilatéral est-il aussi isocèle ? Réponds oui ou non.",
          figure: geo({
            h: 120,
            label: "Trois triangles codés, numérotés de 1 à 3",
            pts: {
              _a: [20, 90], _b: [90, 90], _c: [55, 20],
              _d: [110, 90], _e: [180, 90], _f: [145, 29.4],
              _g: [205, 90], _h: [285, 90], _i: [205, 30],
            },
            polys: [["_a", "_b", "_c"], ["_d", "_e", "_f"], ["_g", "_h", "_i"]],
            traits: [["_a", "_c", 1], ["_b", "_c", 1], ["_d", "_e", 1], ["_e", "_f", 1], ["_f", "_d", 1]],
            droits: [["_h", "_g", "_i"]],
            textes: [{ x: 55, y: 112, t: "1" }, { x: 145, y: 112, t: "2" }, { x: 240, y: 112, t: "3" }],
          }),
          correction:
            "Je lis le codage de chaque fanion.\nFanion 1 : 2 côtés ont un petit trait. 2 côtés égaux : il est isocèle.\nFanion 2 : les 3 côtés ont un petit trait. 3 côtés égaux : il est équilatéral.\nFanion 3 : un petit carré dans un coin. C'est un angle droit : il est rectangle.\na) Le triangle rectangle est le fanion 3.\nb) Le triangle équilatéral est le fanion 2.\nc) Oui. Il a 3 côtés égaux, donc il a bien 2 côtés égaux.\n⛔ Le piège : croire qu'un triangle équilatéral n'est pas isocèle. Il l'est, et même plus.\nRéponse : a) 3 ; b) 2 ; c) oui.",
          micros: ["figure_triangle", "figure_codage"],
          reponses: [
            { question: "a)", attendu: ["3", "fanion 3"] },
            { question: "b)", attendu: ["2", "fanion 2"] },
            { question: "c)", attendu: "oui" },
          ],
        },
        {
          enonce:
            "Une architecte dessine trois fenêtres. Regarde le codage.\na) Quelle fenêtre a 4 angles droits, mais pas 4 côtés égaux ? Donne son numéro.\nb) Quelle fenêtre a 4 côtés égaux, mais aucun angle droit ?\nc) La fenêtre 2 est un carré. Est-ce aussi un rectangle ? Réponds oui ou non.",
          figure: geo({
            h: 132,
            label: "Trois quadrilatères codés, numérotés de 1 à 3",
            pts: {
              _a: [18, 60], _b: [50, 15], _c: [82, 60], _d: [50, 105],
              _e: [110, 30], _f: [170, 30], _g: [170, 90], _h: [110, 90],
              _i: [195, 40], _j: [285, 40], _k: [285, 85], _l: [195, 85],
            },
            polys: [["_a", "_b", "_c", "_d"], ["_e", "_f", "_g", "_h"], ["_i", "_j", "_k", "_l"]],
            traits: [
              ["_a", "_b", 1], ["_b", "_c", 1], ["_c", "_d", 1], ["_d", "_a", 1],
              ["_e", "_f", 1], ["_f", "_g", 1], ["_g", "_h", 1], ["_h", "_e", 1],
              ["_i", "_j", 2], ["_k", "_l", 2], ["_j", "_k", 1], ["_l", "_i", 1],
            ],
            droits: [["_h", "_e", "_f"], ["_e", "_f", "_g"], ["_f", "_g", "_h"], ["_g", "_h", "_e"], ["_l", "_i", "_j"], ["_i", "_j", "_k"], ["_j", "_k", "_l"], ["_k", "_l", "_i"]],
            textes: [{ x: 50, y: 125, t: "1" }, { x: 140, y: 125, t: "2" }, { x: 240, y: 125, t: "3" }],
          }),
          correction:
            "Je regarde les petits carrés, puis les petits traits.\nFenêtre 1 : 4 côtés avec le même trait, mais aucun angle droit. C'est un losange.\nFenêtre 2 : 4 angles droits et 4 côtés égaux. C'est un carré.\nFenêtre 3 : 4 angles droits. Les côtés d'en face sont égaux, mais pas les voisins. C'est un rectangle.\na) C'est la fenêtre 3.\nb) C'est la fenêtre 1.\nc) Oui. Le carré a 4 angles droits : c'est un rectangle, avec 4 côtés égaux en plus.\n⛔ Le piège : dire qu'un carré n'est pas un rectangle. Il a bien ses 4 angles droits.\nRéponse : a) 3 ; b) 1 ; c) oui.",
          micros: ["figure_quadrilatere", "figure_codage"],
          reponses: [
            { question: "a)", attendu: ["3", "fenêtre 3"] },
            { question: "b)", attendu: ["1", "fenêtre 1"] },
            { question: "c)", attendu: "oui" },
          ],
        },
        {
          enonce:
            "Un jardinier trace un massif de fleurs rond. Il plante un piquet en O et tend une corde de 3 m.\na) Le point O est : A : le rayon ; B : le centre ; C : le diamètre. Réponds A, B ou C.\nb) Combien mesure le diamètre [BC] ?\nc) Quel segment est un rayon ? A : [OA] ; B : [BC] ; C : [AB]. Réponds A, B ou C.",
          figure: geo({
            h: 145,
            label: "Un cercle de centre O, le rayon [OA] de 3 m et le diamètre [BC]",
            pts: { O: [150, 75], A: [177.5, 27.4], B: [95, 75], C: [205, 75] },
            nomsEn: { O: [150, 95], B: [80, 80], C: [220, 80], A: [188, 18] },
            cercles: [{ c: "O", r: 55 }],
            segs: [["O", "A"], ["B", "C"]],
            cotes: [{ de: "O", a: "A", t: "3 m", s: -1 }],
          }),
          correction:
            "Tous les points du cercle sont à 3 m du piquet O.\na) O est le point du milieu : c'est le centre. Réponse B.\nb) Le diamètre [BC] passe par le centre. Il fait 2 rayons.\n3 × 2 = 6. Le diamètre mesure 6 m.\nc) [OA] va du centre jusqu'au cercle : c'est un rayon. Réponse A.\n⛔ Le piège : confondre le rayon et le diamètre. Le diamètre est 2 fois plus long.\nRéponse : a) B ; b) 6 m ; c) A.",
          micros: ["figure_cercle"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: ["6", "6 m"] },
            { question: "c)", attendu: "A" },
          ],
        },
        {
          enonce:
            "Un menuisier fabrique une équerre en bois. Voici son plan, avec le codage.\na) Combien mesure [AC] ?\nb) En quel sommet est l'angle droit ? Écris la lettre.\nc) [BC] n'a pas de petit trait. Peut-on dire que BC = 4 cm ? Réponds oui ou non.",
          figure: geo({
            h: 150,
            label: "Un triangle ABC, angle droit en A, [AB] et [AC] codés égaux, AB = 4 cm",
            pts: { A: [70, 125], B: [170, 125], C: [70, 25] },
            polys: [["A", "B", "C"]],
            traits: [["A", "B", 1], ["A", "C", 1]],
            droits: [["B", "A", "C"]],
            cotes: [{ de: "A", a: "B", t: "4 cm" }],
          }),
          correction:
            "Je lis le codage, un signe après l'autre.\na) [AB] et [AC] ont le même petit trait. Ils ont la même longueur.\nAB = 4 cm, donc AC = 4 cm.\nb) Le petit carré est dans le coin A. L'angle droit est en A.\nc) Non. [BC] n'a pas de trait : rien ne dit qu'il mesure 4 cm.\nD'ailleurs, il se voit plus long que les deux autres.\n⛔ Le piège : croire que deux côtés sont égaux parce qu'ils en ont l'air. Seul le codage le dit.\nRéponse : a) 4 cm ; b) A ; c) non.",
          micros: ["figure_codage"],
          reponses: [
            { question: "a)", attendu: ["4", "4 cm"] },
            { question: "b)", attendu: "A" },
            { question: "c)", attendu: "non" },
          ],
        },
        {
          enonce:
            "L'arroseur du stade est en S. Il arrose tout le disque de 4 m de rayon.\nLa fleur F est à 2 m de S. Le banc B est à 5 m de S. Le piquet P est à 4 m de S.\na) La fleur F est-elle arrosée ? Réponds oui ou non.\nb) Le banc B est-il arrosé ? Réponds oui ou non.\nc) Le piquet P est : A : sur le cercle ; B : loin du bord, dans le disque ; C : hors du disque. Réponds A, B ou C.",
          figure: geo({
            h: 150,
            label: "Un disque de centre S et de rayon 4 m, les points F, B et P",
            pts: { S: [150, 80], F: [121.8, 90.3], B: [220.5, 54.3], P: [120, 28] },
            nomsEn: { S: [150, 100], F: [112, 108], B: [236, 50], P: [104, 22] },
            cercles: [{ c: "S", r: 60, fond: true }],
          }),
          correction:
            "Je compare chaque distance au rayon : 4 m.\na) 2 m, c'est moins que 4 m. F est dans le disque : la fleur est arrosée.\nb) 5 m, c'est plus que 4 m. B est hors du disque : le banc n'est pas arrosé.\nc) 4 m, c'est juste le rayon. P est sur le cercle. Réponse A.\n⛔ Le piège : dire « sur le cercle » pour un point à l'intérieur. Le cercle, c'est seulement la ligne du bord.\nRéponse : a) oui ; b) non ; c) A.",
          micros: ["cercle_ensemble_points"],
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "A" },
          ],
        },
        {
          enonce:
            "Un terrain de handball est un rectangle ABCD. Il mesure 40 m sur 20 m.\na) Combien mesure le côté [DC] ?\nb) Combien mesure le côté [AD] ?\nc) Un joueur fait le tour du terrain. Combien de mètres court-il ?",
          figure: geo({
            h: 160,
            label: "Un rectangle ABCD, AB = 40 m et BC = 20 m",
            pts: { A: [50, 130], B: [250, 130], C: [250, 30], D: [50, 30] },
            polys: [["A", "B", "C", "D"]],
            droits: [["D", "A", "B"], ["A", "B", "C"], ["B", "C", "D"], ["C", "D", "A"]],
            cotes: [{ de: "A", a: "B", t: "40 m" }, { de: "B", a: "C", t: "20 m" }],
          }),
          correction:
            "Dans un rectangle, les côtés d'en face ont la même longueur.\na) [DC] est en face de [AB]. DC = 40 m.\nb) [AD] est en face de [BC]. AD = 20 m.\nc) Le tour, c'est les 4 côtés mis bout à bout.\n40 + 20 + 40 + 20 = 120. Il court 120 m.\n⛔ Le piège : croire que deux côtés voisins sont égaux. Ce sont les côtés d'en face qui le sont.\nRéponse : a) 40 m ; b) 20 m ; c) 120 m.",
          micros: ["figure_propriete"],
          reponses: [
            { question: "a)", attendu: ["40", "40 m"] },
            { question: "b)", attendu: ["20", "20 m"] },
            { question: "c)", attendu: ["120", "120 m"] },
          ],
        },
        {
          enonce:
            "Une couturière trace un patron de nappe ronde. Voici sa figure.\na) Quel programme a-t-elle suivi ?\nA : « Trace [AB] de 5 cm. Trace le cercle de centre B qui passe par A. »\nB : « Trace le cercle de centre A et de rayon 3 cm. Place B sur le cercle. »\nC : « Trace [AB] de 5 cm. Trace le cercle de centre A qui passe par B. »\nRéponds A, B ou C.\nb) Quel est le rayon du cercle ?",
          figure: geo({
            h: 175,
            label: "Un segment [AB] de 5 cm et le cercle de centre A qui passe par B",
            pts: { A: [150, 85], B: [230, 85] },
            nomsEn: { A: [150, 105], B: [246, 80] },
            cercles: [{ c: "A", r: 80 }],
            segs: [["A", "B"]],
            cotes: [{ de: "A", a: "B", t: "5 cm", s: -1 }],
          }),
          correction:
            "Je cherche d'abord le centre du cercle : c'est le point au milieu.\nLe centre est A. Le cercle passe par B.\nLe programme A met le centre en B : faux.\nLe programme B donne un rayon de 3 cm : faux, [AB] mesure 5 cm.\nLe programme C : [AB] de 5 cm, centre A, passe par B. C'est la figure.\na) Réponse C.\nb) Le cercle passe par B. Son rayon est AB = 5 cm.\n⛔ Le piège : se tromper de centre. Le centre est le point d'où part le compas.\nRéponse : a) C ; b) 5 cm.",
          micros: ["figure_programme_construction", "figure_cercle"],
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: ["5", "5 cm"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je lis le codage ou les mesures, puis je réponds.",
      rappel: [
        "Triangle isocèle : 2 côtés égaux. Équilatéral : 3 côtés égaux. Rectangle : 1 angle droit.",
        "Losange : 4 côtés égaux. Carré : 4 côtés égaux et 4 angles droits.",
        "Un programme de construction donne les étapes dans l'ordre, avec toutes les mesures.",
        "Un point est sur le cercle s'il est à une distance du centre égale au rayon.",
      ],
      exercices: [
        {
          enonce:
            "Une charpentière assemble des triangles en bois pour un toit. Voici les longueurs de leurs côtés.\na) Triangle 1 : 6 dm, 6 dm et 6 dm. Est-il isocèle, équilatéral ou rectangle ?\nb) Triangle 2 : 7 dm, 4 dm et 7 dm. Est-il isocèle, équilatéral ou rectangle ?\nc) Triangle 3 : 3 dm, 4 dm et 5 dm, avec un angle droit. Est-il isocèle, équilatéral ou rectangle ?\nÉcris le mot le plus précis.",
          correction:
            "Je compare les longueurs des côtés.\na) 6, 6 et 6 : les 3 côtés sont égaux. Le triangle est équilatéral.\nb) 7, 4 et 7 : 2 côtés sont égaux, pas le 3e. Le triangle est isocèle.\nc) 3, 4 et 5 : aucun côté égal. Mais il a un angle droit : il est rectangle.\n⛔ Le piège : répondre « isocèle » au a). C'est vrai, mais « équilatéral » est plus précis.\nRéponse : a) équilatéral ; b) isocèle ; c) rectangle.",
          micros: ["figure_triangle"],
          reponses: [
            { question: "a)", attendu: "équilatéral" },
            { question: "b)", attendu: "isocèle" },
            { question: "c)", attendu: "rectangle" },
          ],
        },
        {
          enonce:
            "Lucie fabrique un cerf-volant en forme de losange. Un côté mesure 35 cm.\na) Combien de côtés ont la même longueur ?\nb) Elle colle un ruban tout autour. Quelle longueur de ruban lui faut-il ?\nc) Ce losange a-t-il des angles droits ? Réponds oui ou non.",
          figure: geo({
            h: 160,
            label: "Un losange ABCD codé, un côté de 35 cm",
            pts: { A: [80, 80], B: [150, 30], C: [220, 80], D: [150, 130] },
            polys: [["A", "B", "C", "D"]],
            traits: [["A", "B", 1], ["B", "C", 1], ["C", "D", 1], ["D", "A", 1]],
            cotes: [{ de: "B", a: "C", t: "35 cm" }],
          }),
          correction:
            "a) Les 4 côtés ont le même petit trait. Les 4 côtés sont égaux.\nb) Le ruban fait le tour : 4 côtés de 35 cm.\n35 × 4 = 140. Il lui faut 140 cm de ruban.\nc) Il n'y a aucun petit carré dans les coins. Le losange n'a pas d'angle droit.\n⛔ Le piège : croire qu'un losange est un carré. Il a 4 côtés égaux, mais pas d'angle droit.\nRéponse : a) 4 ; b) 140 cm ; c) non.",
          micros: ["figure_quadrilatere", "figure_codage"],
          reponses: [
            { question: "a)", attendu: ["4", "4 côtés"] },
            { question: "b)", attendu: ["140", "140 cm"] },
            { question: "c)", attendu: "non" },
          ],
        },
        {
          enonce:
            "Une dessinatrice trace la façade d'un chalet : un carré ABCD et un toit DCE. Regarde le codage.\na) Combien mesure [DE] ?\nb) On peint le contour de la façade : [AB], [BC], [CE], [ED] et [DA]. Quelle est sa longueur ?\nc) Le triangle DCE est : A : rectangle ; B : isocèle, mais pas équilatéral ; C : équilatéral. Réponds A, B ou C.",
          figure: geo({
            h: 205,
            label: "Un carré ABCD de 6 cm surmonté d'un triangle DCE, tous les côtés codés égaux",
            pts: { A: [100, 180], B: [180, 180], C: [180, 100], D: [100, 100], E: [140, 30.7] },
            nomsEn: { D: [86, 102], C: [194, 102] },
            polys: [["A", "B", "C", "D"], ["D", "C", "E"]],
            traits: [["A", "B", 1], ["B", "C", 1], ["C", "D", 1], ["D", "A", 1], ["C", "E", 1], ["E", "D", 1]],
            droits: [["D", "A", "B"], ["A", "B", "C"], ["B", "C", "D"], ["C", "D", "A"]],
            cotes: [{ de: "A", a: "B", t: "6 cm" }],
          }),
          correction:
            "Tous les segments ont le même petit trait. Ils mesurent tous 6 cm.\na) [DE] a le petit trait. DE = 6 cm.\nb) Le contour a 5 segments de 6 cm.\n[DC] est à l'intérieur : il n'est pas sur le contour.\n6 × 5 = 30. Le contour mesure 30 cm.\nc) DCE a 3 côtés égaux : DC, CE et ED. Il est équilatéral. Réponse C.\n⛔ Le piège : compter [DC] dans le contour. Il sépare le carré et le toit, il est à l'intérieur.\nRéponse : a) 6 cm ; b) 30 cm ; c) C.",
          micros: ["figure_codage", "figure_propriete"],
          reponses: [
            { question: "a)", attendu: ["6", "6 cm"] },
            { question: "b)", attendu: ["30", "30 cm"] },
            { question: "c)", attendu: "C" },
          ],
        },
        {
          enonce:
            "Une cible de tir à l'arc a deux cercles de même centre O. Le petit a un rayon de 2 cm. Le grand a un rayon de 5 cm.\na) Combien mesure le diamètre du grand cercle ?\nb) Une flèche F se plante à 3 cm de O. Est-elle dans le petit disque ? Réponds oui ou non.\nc) Est-elle dans le grand disque ? Réponds oui ou non.",
          figure: geo({
            h: 170,
            label: "Deux cercles de centre O, de rayons 2 cm et 5 cm, et une flèche F",
            pts: { O: [150, 85], F: [181.8, 53.2] },
            nomsEn: { O: [150, 105], F: [194, 46] },
            cercles: [{ c: "O", r: 75, fond: true }, { c: "O", r: 30, couleur: ROUGE }],
          }),
          correction:
            "Le diamètre fait 2 rayons.\na) Rayon du grand cercle : 5 cm. 5 × 2 = 10. Le diamètre mesure 10 cm.\nb) Le petit disque va jusqu'à 2 cm de O. 3 cm, c'est plus que 2 cm.\nLa flèche n'est pas dans le petit disque.\nc) Le grand disque va jusqu'à 5 cm de O. 3 cm, c'est moins que 5 cm.\nLa flèche est dans le grand disque.\n⛔ Le piège : prendre le rayon pour le diamètre. Le diamètre du grand cercle n'est pas 5 cm.\nRéponse : a) 10 cm ; b) non ; c) oui.",
          micros: ["figure_cercle", "cercle_ensemble_points"],
          reponses: [
            { question: "a)", attendu: ["10", "10 cm"] },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "oui" },
          ],
        },
        {
          enonce:
            "À l'atelier de dessin, voici un programme de construction. Une mesure est effacée.\n1. Trace [AB] de 4 cm.\n2. Trace un angle droit en A et un angle droit en B.\n3. Place D à … cm de A et C à … cm de B, du même côté.\n4. Relie D et C.\nOn veut obtenir une figure qui a 4 côtés égaux.\na) Quelle mesure faut-il écrire à l'étape 3 ?\nb) Quel instrument sert à l'étape 2 ? A : le compas ; B : l'équerre ; C : la règle seule. Réponds A, B ou C.\nc) Quelle figure obtient-on ?",
          correction:
            "La figure a 4 angles droits (étape 2) et 4 côtés égaux.\na) Les 4 côtés sont égaux. Ils mesurent tous AB = 4 cm. J'écris 4 cm.\nb) Un angle droit se trace avec l'équerre. Réponse B.\nc) 4 angles droits et 4 côtés égaux : c'est un carré.\n⛔ Le piège : un programme sans mesure. « Place D » tout seul, on ne peut pas le refaire.\nRéponse : a) 4 cm ; b) B ; c) un carré.",
          micros: ["figure_programme_construction", "figure_construire"],
          reponses: [
            { question: "a)", attendu: ["4", "4 cm"] },
            { question: "b)", attendu: "B" },
            { question: "c)", attendu: ["carré", "un carré"] },
          ],
        },
        {
          enonce:
            "Pour une maquette, Sacha construit un triangle ABC.\nIl trace [AB] de 6 cm.\nIl trace un arc de centre A et de rayon 4 cm, puis un arc de centre B et de rayon 4 cm.\nC est le point où les deux arcs se coupent.\na) Combien mesure [AC] ?\nb) Combien mesure [BC] ?\nc) Le triangle ABC est : A : isocèle ; B : rectangle ; C : équilatéral. Réponds A, B ou C.",
          figure: geo({
            h: 180,
            label: "Le segment [AB] de 6 cm et deux arcs de compas de rayon 4 cm qui se coupent en C",
            pts: { A: [60, 150], B: [240, 150], C: [150, 70.6] },
            nomsEn: { A: [50, 168], B: [250, 168], C: [150, 52] },
            polys: [["A", "B", "C"]],
            arcs: [{ c: "A", r: 120, de: 25, a: 60 }, { c: "B", r: 120, de: 120, a: 155 }],
            cotes: [{ de: "A", a: "B", t: "6 cm" }],
          }),
          correction:
            "Le compas garde la même distance.\na) C est sur l'arc de centre A et de rayon 4 cm. AC = 4 cm.\nb) C est aussi sur l'arc de centre B et de rayon 4 cm. BC = 4 cm.\nc) AC = BC = 4 cm, et AB = 6 cm. 2 côtés égaux : le triangle est isocèle. Réponse A.\nIl n'est pas équilatéral : AB mesure 6 cm, pas 4 cm.\n⛔ Le piège : croire que [AC] mesure 6 cm comme [AB]. Le rayon des arcs est 4 cm.\nRéponse : a) 4 cm ; b) 4 cm ; c) A.",
          micros: ["figure_construire", "figure_triangle"],
          reponses: [
            { question: "a)", attendu: ["4", "4 cm"] },
            { question: "b)", attendu: ["4", "4 cm"] },
            { question: "c)", attendu: "A" },
          ],
        },
        {
          enonce:
            "Une encadreuse fabrique des cadres.\na) Un cadre carré a un tour de 36 cm. Combien mesure un côté ?\nb) Un cadre rectangle a une longueur de 12 cm. Son tour mesure 40 cm. Combien mesure sa largeur ?",
          figure: geo({
            h: 165,
            label: "Un rectangle ABCD, AB = 12 cm, la largeur BC est à trouver",
            pts: { A: [60, 140], B: [240, 140], C: [240, 20], D: [60, 20] },
            polys: [["A", "B", "C", "D"]],
            droits: [["D", "A", "B"], ["A", "B", "C"], ["B", "C", "D"], ["C", "D", "A"]],
            cotes: [{ de: "A", a: "B", t: "12 cm" }, { de: "B", a: "C", t: "?" }],
            textes: [{ x: 150, y: 86, t: "tour : 40 cm", couleur: BLEU }],
          }),
          correction:
            "a) Un carré a 4 côtés égaux. Le tour, c'est 4 côtés.\n36 ÷ 4 = 9. Un côté mesure 9 cm.\nb) Le tour du rectangle : 2 longueurs et 2 largeurs.\nLes 2 longueurs : 12 + 12 = 24 cm.\nIl reste pour les 2 largeurs : 40 − 24 = 16 cm.\nUne largeur : 16 ÷ 2 = 8 cm.\n⛔ Le piège : enlever une seule longueur. Il y a 2 côtés de 12 cm dans le tour.\nRéponse : a) 9 cm ; b) 8 cm.",
          micros: ["figure_propriete", "figure_quadrilatere"],
          reponses: [
            { question: "a)", attendu: ["9", "9 cm"] },
            { question: "b)", attendu: ["8", "8 cm"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème en plusieurs étapes. Je fais un croquis et j'y note les mesures.",
      rappel: [
        "Je fais un croquis à main levée et j'y écris toutes les mesures.",
        "Triangle : 3 côtés. Carré : 4 côtés. Je divise le tour par le bon nombre.",
        "Je compte les figures avec méthode : les petites, puis les grandes.",
        "Le diamètre fait 2 rayons.",
      ],
      exercices: [
        {
          titre: "L'enclos des chèvres",
          enonce:
            "Une éleveuse a 45 m de grillage. Elle fait un enclos en triangle équilatéral.\na) Combien mesure un côté de l'enclos ?\nb) Avec le même grillage, elle fait un enclos carré. Combien mesure un côté ?\nc) Le côté du carré est-il plus court que le côté du triangle ? Réponds oui ou non.",
          correction:
            "Le grillage fait tout le tour de l'enclos.\na) Le triangle équilatéral a 3 côtés égaux.\n45 ÷ 3 = 15. Un côté mesure 15 m.\nb) Le carré a 4 côtés égaux.\n45 ÷ 4 = 11,25. Un côté mesure 11,25 m.\nc) 11,25 m, c'est moins que 15 m. Oui, le côté du carré est plus court.\nC'est normal : on partage le même grillage en plus de côtés.\n⛔ Le piège : diviser par 4 pour le triangle. Un triangle n'a que 3 côtés.\nRéponse : a) 15 m ; b) 11,25 m ; c) oui.",
          micros: ["figure_defi", "figure_triangle"],
          reponses: [
            { question: "a)", attendu: ["15", "15 m"] },
            { question: "b)", attendu: ["11,25", "11,25 m"] },
            { question: "c)", attendu: "oui" },
          ],
        },
        {
          titre: "Le vitrail",
          enonce:
            "Un maître-verrier fait un vitrail rectangle. Il trace les deux diagonales [AC] et [BD]. Elles se coupent en O.\na) Combien de petits triangles vois-tu ?\nb) Combien de triangles vois-tu en tout, petits et grands ?",
          figure: geo({
            h: 170,
            label: "Un rectangle ABCD et ses deux diagonales, qui se coupent en O",
            pts: { A: [40, 140], B: [260, 140], C: [260, 30], D: [40, 30], O: [150, 85] },
            nomsEn: { O: [150, 112] },
            polys: [["A", "B", "C", "D"]],
            segs: [["A", "C"], ["B", "D"]],
          }),
          correction:
            "Je compte avec méthode : les petits, puis les grands.\na) Les petits triangles ont un sommet en O : OAB, OBC, OCD, ODA. Il y en a 4.\nb) Les grands triangles sont faits de 2 petits, côte à côte.\nAvec la diagonale [AC] : ABC et ACD. Avec la diagonale [BD] : ABD et BCD.\nCela fait 4 grands triangles.\nEn tout : 4 + 4 = 8 triangles.\n⛔ Le piège : ne compter que les 4 petits. Deux petits voisins forment un grand triangle.\nRéponse : a) 4 ; b) 8.",
          micros: ["figure_defi", "figure_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["4", "4 triangles"] },
            { question: "b)", attendu: ["8", "8 triangles"] },
          ],
        },
        {
          titre: "Le drapeau de l'équipe",
          enonce:
            "Le drapeau d'une équipe est un rectangle de 6 cm sur 4 cm. Au milieu, on trace un cercle de rayon 2 cm.\na) Combien mesure le diamètre du cercle ?\nb) Le cercle touche-t-il le bord du haut et le bord du bas ? Réponds oui ou non.\nc) Le centre est à 3 cm du bord gauche. Quelle distance reste-t-il entre le cercle et le bord gauche ?",
          figure: geo({
            h: 165,
            label: "Un rectangle de 6 cm sur 4 cm et un cercle de rayon 2 cm en son milieu",
            pts: { _a: [60, 140], _b: [240, 140], _c: [240, 20], _d: [60, 20], O: [150, 80] },
            nomsEn: { O: [160, 98] },
            polys: [["_a", "_b", "_c", "_d"]],
            cercles: [{ c: "O", r: 60, fond: true, couleur: ROUGE }],
            cotes: [{ de: "_a", a: "_b", t: "6 cm" }, { de: "_b", a: "_c", t: "4 cm" }],
          }),
          correction:
            "a) Le diamètre fait 2 rayons : 2 × 2 = 4. Il mesure 4 cm.\nb) Le drapeau a 4 cm de haut. Le cercle a 4 cm de diamètre, et il est au milieu.\nIl touche donc juste le bord du haut et le bord du bas. Oui.\nc) Du centre au bord gauche : 3 cm. Du centre au cercle : un rayon, 2 cm.\n3 − 2 = 1. Il reste 1 cm.\n⛔ Le piège : enlever le diamètre (4 cm) au lieu du rayon. Du centre au cercle, c'est un rayon.\nRéponse : a) 4 cm ; b) oui ; c) 1 cm.",
          micros: ["figure_defi", "figure_cercle", "figure_propriete"],
          reponses: [
            { question: "a)", attendu: ["4", "4 cm"] },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: ["1", "1 cm"] },
          ],
        },
        {
          titre: "Le plan du pupitre",
          enonce:
            "Voici un programme de construction.\n1. Trace [AB] de 4 cm.\n2. Trace un angle droit en B.\n3. Place C sur le côté de l'angle droit, à 4 cm de B.\n4. Trace [AC].\na) Quelle figure correspond à ce programme ? Donne son numéro.\nb) Combien d'angles droits a le triangle ABC ?\nc) Le triangle ABC est-il isocèle ? Réponds oui ou non.",
          figure: geo({
            h: 135,
            label: "Trois triangles ABC numérotés de 1 à 3",
            pts: {
              A_1: [15, 105], B_1: [75, 105], C_1: [15, 45],
              A_2: [120, 105], B_2: [180, 105], C_2: [180, 45],
              A_3: [225, 105], B_3: [285, 105], C_3: [255, 53],
            },
            nomsEn: { A_1: [12, 122], B_1: [82, 122], C_1: [12, 38], A_2: [114, 122], B_2: [186, 122], C_2: [190, 40], A_3: [222, 122], B_3: [288, 122], C_3: [255, 42] },
            polys: [["A_1", "B_1", "C_1"], ["A_2", "B_2", "C_2"], ["A_3", "B_3", "C_3"]],
            traits: [["A_1", "B_1", 1], ["A_1", "C_1", 1], ["A_2", "B_2", 1], ["B_2", "C_2", 1], ["A_3", "B_3", 1], ["B_3", "C_3", 1], ["C_3", "A_3", 1]],
            droits: [["B_1", "A_1", "C_1"], ["A_2", "B_2", "C_2"]],
            textes: [{ x: 45, y: 130, t: "1" }, { x: 150, y: 130, t: "2" }, { x: 255, y: 130, t: "3" }],
          }),
          correction:
            "Je vérifie le programme étape par étape sur chaque figure.\nL'angle droit doit être en B. Et [AB] et [BC] doivent mesurer 4 cm.\nFigure 1 : l'angle droit est en A. Faux.\nFigure 3 : il n'y a pas d'angle droit. Faux.\nFigure 2 : angle droit en B, et [AB] et [BC] ont le même trait. C'est elle.\na) La figure 2.\nb) Le triangle a 1 angle droit, en B.\nc) AB = BC = 4 cm : 2 côtés égaux. Il est isocèle. Oui.\n⛔ Le piège : mettre l'angle droit en A. Le programme dit « en B ».\nRéponse : a) 2 ; b) 1 ; c) oui.",
          micros: ["figure_programme_construction", "figure_construire", "figure_triangle"],
          reponses: [
            { question: "a)", attendu: ["2", "figure 2"] },
            { question: "b)", attendu: ["1", "1 angle droit"] },
            { question: "c)", attendu: "oui" },
          ],
        },
        {
          titre: "La boîte de balles de tennis",
          enonce:
            "Vue de dessus, une boîte contient 3 balles de tennis. Chaque balle a un rayon de 3 cm. Les balles se touchent et touchent les bords.\na) Combien mesure la longueur de la boîte ?\nb) Combien mesure sa largeur ?\nc) Quel est le tour de la boîte ?",
          figure: geo({
            h: 135,
            label: "Trois cercles de rayon 3 cm alignés dans un rectangle qui les touche",
            pts: { _a: [15, 110], _b: [285, 110], _c: [285, 20], _d: [15, 20], _o1: [60, 65], _o2: [150, 65], _o3: [240, 65], _r: [105, 65] },
            polys: [["_a", "_b", "_c", "_d"]],
            cercles: [{ c: "_o1", r: 45, fond: true }, { c: "_o2", r: 45, fond: true }, { c: "_o3", r: 45, fond: true }],
            segs: [["_o1", "_r"]],
            textes: [{ x: 82, y: 58, t: "3 cm", couleur: ROUGE }],
          }),
          correction:
            "Vue de dessus, chaque balle est un disque de rayon 3 cm.\nSon diamètre : 3 × 2 = 6 cm.\na) Dans la longueur, il y a 3 diamètres : 6 × 3 = 18 cm.\nb) Dans la largeur, il y a 1 diamètre : 6 cm.\nc) Le tour : 18 + 6 + 18 + 6 = 48 cm.\n⛔ Le piège : mettre bout à bout 3 rayons (9 cm). Une balle prend toute sa largeur : un diamètre.\nRéponse : a) 18 cm ; b) 6 cm ; c) 48 cm.",
          micros: ["figure_defi", "figure_cercle"],
          reponses: [
            { question: "a)", attendu: ["18", "18 cm"] },
            { question: "b)", attendu: ["6", "6 cm"] },
            { question: "c)", attendu: ["48", "48 cm"] },
          ],
        },
      ],
    },
  ],
};
