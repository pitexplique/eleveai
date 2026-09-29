// ─── Fiche d'exercices : les périmètres (6e) — 20 exercices corrigés ────────────
//
// Lot de 6e du 30/09/2026, sur le modèle des feuilles de 5e voisines
// (`maths-5e-aire-surface.tsx` : le SVG `plan()` à l'échelle, quadrillage).
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-perimetres.tsx` et sur la
// banque `lib/tutor-v4/questionBank/6e/maths/perimetres.bank.ts`, notionId
// aire_perimetre : comprendre le périmètre (un tour, une longueur), carré,
// rectangle, figure quelconque (triangle, polygone, figure sur quadrillage),
// problèmes, défis.
// ⛔ LIMITES DE LA 6e : PAS DE CERCLE NI DE DISQUE (la banque n'en a pas : c'est
// la notion cercle_disque) ; aucune formule à lettres à résoudre — « je fais le
// calcul à l'envers » ; l'aire n'est citée que pour dire ce que le périmètre
// N'EST PAS (notion suivante).
// ⛔ Aucun exemple de la fiche de cours (carrés de 5, 6, 7, 9 cm ; rectangles
// 8 × 3, 6 × 4 ; le L et l'escalier de 16 ; les deux carrés de 3 et de 5 cm
// recollés ; le carré de 28 cm ; le jardin 8 × 3), ni de la banque (triangle
// 3-4-5).
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : phrases de 12 mots en moyenne, une idée
// par phrase, les mots d'un enfant.
//
// Les pièges nommés : compter les carreaux au lieu des bords (1, 9), confondre
// clôture et moquette (2), côté × côté (3), L + l sans le « × 2 » (4, 8, 19),
// oublier un côté (5, 6), diviser par 2 au lieu de 4 (7), des m et des cm
// mélangés (8, 14, 19), soustraire la longueur au périmètre entier (10), les
// côtés non écrits (11, 18), un carré de 30 cm de côté (12), le portillon
// compté (13), additionner les périmètres de morceaux collés (15, 20), croire
// que « + 2 cm » ajoute 2 cm au tour (16), un nombre de tours à virgule (17).
//
// Aucun fait réel : la cabane à oiseaux, le tapis de yoga, l'enclos, la
// ficelle, le poulailler, l'affiche, le terrain de handball (40 m × 20 m, la
// taille réglementaire, dite comme un modèle), le jardin partagé, la
// guirlande lumineuse, les tables de la fête sont des MODÈLES.
//
// ⭐ LES DESSINS : le SVG `plan()` de la feuille des aires de 5e (vraies
// coordonnées, quadrillage pour compter, cotes, angles droits), `bande` (le
// tour DÉPLIÉ en une seule longueur), `table`. 14 dessins imprimés ; ceux qui
// redisent le corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-aire-perimetre.mjs` —
// chaque périmètre refait en additionnant les côtés DESSINÉS, chaque cote
// relue à l'échelle.
//
// Micro-compétences : aire_perimetre_comprendre (1, 2, 9, 12, 15),
// aire_perimetre_carre (3, 7, 12, 13, 16), aire_perimetre_rectangle (4, 8,
// 10, 12, 14, 17, 19, 20), aire_perimetre_figure (5, 6, 9, 11, 15, 18),
// aire_perimetre_probleme (13, 14, 17, 18, 19, 20), aire_perimetre_defi (10,
// 15, 16, 20). 6/6.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const CYAN = "#0e7490";
const ORANGE = "#ea580c";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/* ── Le plan à l'échelle ───────────────────────────────────────────────────
 * Le SVG local de la feuille des aires de 5e. On donne les VRAIES coordonnées,
 * dans l'unité annoncée, y vers le haut : le script relit chaque cote à
 * l'échelle et refait chaque périmètre en additionnant les côtés.
 * ⛔ Texte NU dans les étiquettes. Police 14, viewBox d'environ 300 de large,
 * AUCUN `min-w`. */
type Pt = [number, number];
type Fond = "bleu" | "orange" | "vert" | "trou";
type Forme =
  | { poly: Pt[]; fond?: Fond }
  /** Le quadrillage [x0, y0, x1, y1], un trait tous les `pas` (1 par défaut). */
  | { grille: [number, number, number, number]; pas?: number }
  | { trait: [Pt, Pt]; tirets?: boolean }
  | { cote: [Pt, Pt]; label: string; sens?: 1 | -1 }
  /** L'angle droit en [0], entre les directions de [1] et de [2]. */
  | { droit: [Pt, Pt, Pt] }
  | { texte: string; en: Pt };

const TEINTE: Record<Fond, string> = { bleu: "#2563eb", orange: "#ea580c", vert: "#16a34a", trou: "#dc2626" };
const TAILLE = 14;

const plan = (unite: "cm" | "m", formes: Forme[]) => {
  const geo: Pt[] = [];
  for (const f of formes) {
    if ("poly" in f) geo.push(...f.poly);
    else if ("grille" in f) geo.push([f.grille[0], f.grille[1]], [f.grille[2], f.grille[3]]);
    else if ("trait" in f) geo.push(...f.trait);
    else if ("cote" in f) geo.push(...f.cote);
    else if ("droit" in f) geo.push(f.droit[0]);
    else geo.push(f.en);
  }
  const xs = geo.map((p) => p[0]), ys = geo.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(200 / (x1 - x0 || 1), 160 / (y1 - y0 || 1));
  const P = ([x, y]: Pt): Pt => [+((x - x0) * s).toFixed(1), +((y1 - y) * s).toFixed(1)];

  // Le centre des surfaces : les étiquettes s'écartent de lui, vers l'extérieur.
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
  const unitaire = (a: Pt, b: Pt): Pt => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
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
        grilles.push(<line key={`${i}x${x}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#cbd5e1" strokeWidth={1} />);
      }
      for (let y = gy0; y <= gy1 + 1e-9; y += pas) {
        const [a, b] = [P([gx0, y]), P([gx1, y])];
        grilles.push(<line key={`${i}y${y}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#cbd5e1" strokeWidth={1} />);
      }
    } else if ("poly" in f) {
      const fond = f.fond ?? "bleu";
      const peint = fond === "trou"
        ? { fill: "#ffffff", fillOpacity: 1, stroke: TEINTE.trou, strokeWidth: 2, strokeDasharray: "5 4" }
        : { fill: TEINTE[fond], fillOpacity: 0.18, stroke: TEINTE[fond], strokeWidth: 2.5 };
      fonds.push(<polygon key={i} points={f.poly.map(P).map((p) => p.join(",")).join(" ")} {...peint} />);
    } else if ("trait" in f) {
      const [a, b] = f.trait.map(P);
      traits.push(<line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={f.tirets ? "#475569" : "#dc2626"} strokeWidth={f.tirets ? 1.5 : 4} strokeDasharray={f.tirets ? "5 4" : undefined} />);
    } else if ("cote" in f) {
      const [a, b] = f.cote.map(P);
      const d = unitaire(a, b);
      const M: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let n: Pt = [-d[1], d[0]];
      if (n[0] * (M[0] - C[0]) + n[1] * (M[1] - C[1]) < 0) n = [-n[0], -n[1]];
      if (f.sens === -1) n = [-n[0], -n[1]];
      poser(M, n, f.label);
    } else if ("droit" in f) {
      const [V, U, W] = f.droit.map(P);
      const u = unitaire(V, U), w = unitaire(V, W), q = 9;
      traits.push(<polyline key={i} points={`${V[0] + u[0] * q},${V[1] + u[1] * q} ${V[0] + (u[0] + w[0]) * q},${V[1] + (u[1] + w[1]) * q} ${V[0] + w[0] * q},${V[1] + w[1] * q}`} fill="none" stroke={NOIR} strokeWidth={1.5} />);
    } else etiquettes.push({ x: P(f.en)[0], y: P(f.en)[1], t: f.texte, ancre: "middle" });
  });

  // Le cadre : la géométrie, plus la place de chaque étiquette (largeur estimée).
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
 * LE TOUR DÉPLIÉ : les côtés mis bout à bout, à l'échelle, en une seule bande.
 * Un périmètre est une LONGUEUR : c'est ce que la bande fait voir. Une
 * étiquette trop large pour son morceau passe dessous.
 */
const bande = (total: string, morceaux: { valeur: number; label: string; couleur?: string }[]) => {
  const x0 = 12;
  const larg = 276;
  const somme = morceaux.reduce((s, m) => s + m.valeur, 0);
  const u = larg / somme;
  const yB = 28;
  const debuts = morceaux.map((_, i) => x0 + morceaux.slice(0, i).reduce((s, m) => s + m.valeur, 0) * u);
  const dessous = morceaux.some((m) => m.label.length * 8.8 > m.valeur * u - 6);
  const H = yB + 34 + (dessous ? 26 : 0) + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Le tour déplié, ${total} : ${morceaux.map((m) => m.label).join(", ")}.`}>
        <text x={150} y={16} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
          {`le tour déplié : ${total}`}
        </text>
        {morceaux.map((m, i) => {
          const w = m.valeur * u;
          const cx = debuts[i] + w / 2;
          const dedans = m.label.length * 8.8 <= w - 6;
          const demi = (m.label.length * 8.8) / 2;
          const cxBas = Math.min(Math.max(cx, x0 + demi), x0 + larg - demi);
          const couleur = m.couleur ?? (i % 2 === 0 ? BLEU : CYAN);
          return (
            <g key={i}>
              <rect x={debuts[i]} y={yB} width={w} height={32} fill={couleur} stroke="#fff" strokeWidth={1.5} />
              {dedans ? (
                <text x={cx} y={yB + 21} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">
                  {m.label}
                </text>
              ) : (
                <g>
                  <line x1={cx} y1={yB + 32} x2={cxBas} y2={yB + 40} stroke={couleur} strokeWidth={1.2} />
                  <text x={cxBas} y={yB + 54} textAnchor="middle" fontSize={14} fontWeight={700} fill={couleur}>
                    {m.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        <rect x={x0} y={yB} width={larg} height={32} fill="none" stroke={NOIR} strokeWidth={1.5} />
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

export const exercicesAirePerimetre6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-perimetre",
  titre: "Les périmètres",
  accroche:
    "Vingt exercices, du geste seul au problème : suivre le tour d'une figure, calculer le périmètre d'un carré, d'un rectangle, d'un triangle ou d'une figure en L, retrouver un côté, voir ce que devient le tour quand on colle des morceaux. Une cabane à oiseaux, un tapis de yoga, un poulailler, une affiche, un terrain de handball, un jardin partagé, une guirlande lumineuse, les tables de la fête. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et la figure à l'échelle.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/aire-perimetre", titre: "Les périmètres" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un seul calcul par exercice. Je suis le tour de la figure avec le doigt.",
      rappel: [
        "Le périmètre, c'est la longueur du tour de la figure. Il s'écrit en cm ou en m.",
        "Carré : 4 fois le côté. Rectangle : 2 fois la longueur plus la largeur.",
        "Pour une autre figure, j'additionne tous les côtés du tour.",
      ],
      exercices: [
        {
          enonce: "Chaque carreau mesure $1$ cm de côté.\nQuel est le périmètre de la figure bleue ?",
          figure: plan("cm", [
            { grille: [0, 0, 5, 4] },
            { poly: [[1, 0], [3, 0], [3, 3], [5, 3], [5, 4], [0, 4], [0, 3], [1, 3]], fond: "bleu" },
            { cote: [[3, 0], [4, 0]], label: "1 cm" },
          ]),
          correction:
            "Je pars du coin en bas à gauche.\nJe suis le bord avec le doigt, et je compte les côtés des carreaux.\n$2 + 3 + 2 + 1 + 5 + 1 + 1 + 3 = 18$ cm.\n⛔ Le piège : compter les carreaux de l'intérieur. Cela donne $11$ : c'est l'aire, pas le tour.\nRéponse : le périmètre de la figure est $18$ cm.",
          micros: ["aire_perimetre_comprendre"],
        },
        {
          enonce: "Pour chaque travail, faut-il connaître le périmètre ou l'aire ?\na) Clôturer un champ.\nb) Poser de la moquette dans une chambre.\nc) Coller un ruban autour d'un cadre.\nd) Peindre un mur.\ne) Poser une bordure autour d'une pelouse.",
          correction:
            "Le périmètre, c'est le tour. L'aire, c'est l'intérieur.\na) La clôture fait le tour du champ : le périmètre.\nb) La moquette couvre tout le sol : l'aire.\nc) Le ruban fait le tour du cadre : le périmètre.\nd) La peinture couvre tout le mur : l'aire.\ne) La bordure fait le tour de la pelouse : le périmètre.\n⛔ Le piège : croire que « plus grand » veut dire la même chose pour les deux.\nRéponse : a) périmètre ; b) aire ; c) périmètre ; d) aire ; e) périmètre.",
          schema: ecranSeulement(
            plan("m", [
              { poly: [[0, 0], [6, 0], [6, 4], [0, 4]], fond: "vert" },
              { cote: [[0, 0], [6, 0]], label: "le tour : le périmètre" },
              { texte: "l'intérieur : l'aire", en: [3, 2] },
            ]),
          ),
          micros: ["aire_perimetre_comprendre"],
        },
        {
          enonce: "Un carré a un côté de $8$ cm.\nCalcule son périmètre.",
          correction:
            "Un carré a $4$ côtés de même longueur.\nJe mets les $4$ côtés bout à bout : $4 \\times 8 = 32$ cm.\n⛔ Le piège : calculer $8 \\times 8 = 64$. Cela donne l'aire, pas le tour.\nRéponse : le périmètre du carré est $32$ cm.",
          schema: ecranSeulement(
            bande("32 cm", [
              { valeur: 8, label: "8 cm" },
              { valeur: 8, label: "8 cm" },
              { valeur: 8, label: "8 cm" },
              { valeur: 8, label: "8 cm" },
            ]),
          ),
          micros: ["aire_perimetre_carre"],
        },
        {
          enonce: "Calcule le périmètre de ce rectangle.",
          figure: plan("cm", [
            { poly: [[0, 0], [12, 0], [12, 5], [0, 5]], fond: "bleu" },
            { droit: [[0, 0], [12, 0], [0, 5]] },
            { droit: [[12, 5], [0, 5], [12, 0]] },
            { cote: [[0, 0], [12, 0]], label: "12 cm" },
            { cote: [[12, 0], [12, 5]], label: "5 cm" },
          ]),
          correction:
            "Un rectangle a $2$ longueurs et $2$ largeurs.\nUne longueur et une largeur : $12 + 5 = 17$ cm. C'est la moitié du tour.\nLe tour entier : $2 \\times 17 = 34$ cm.\n⛔ Le piège : s'arrêter à $17$ cm. Il manque l'autre moitié du tour.\nRéponse : le périmètre du rectangle est $34$ cm.",
          micros: ["aire_perimetre_rectangle"],
        },
        {
          enonce: "Calcule le périmètre de ce triangle.",
          figure: plan("cm", [
            { poly: [[0, 0], [6, 0], [0, 4.5]], fond: "orange" },
            { droit: [[0, 0], [6, 0], [0, 4.5]] },
            { cote: [[0, 0], [6, 0]], label: "6 cm" },
            { cote: [[0, 0], [0, 4.5]], label: "4,5 cm" },
            { cote: [[6, 0], [0, 4.5]], label: "7,5 cm" },
          ]),
          correction:
            "Un triangle a $3$ côtés.\nJ'additionne les trois : $6 + 4{,}5 + 7{,}5 = 18$ cm.\n⛔ Le piège : oublier le grand côté penché. Il fait aussi partie du tour.\nRéponse : le périmètre du triangle est $18$ cm.",
          micros: ["aire_perimetre_figure"],
        },
        {
          enonce: "Voici la façade d'une cabane à oiseaux.\nCalcule son périmètre.",
          figure: plan("cm", [
            { poly: [[0, 0], [12, 0], [12, 8], [6, 16], [0, 8]], fond: "orange" },
            { cote: [[0, 0], [12, 0]], label: "12 cm" },
            { cote: [[12, 0], [12, 8]], label: "8 cm" },
            { cote: [[12, 8], [6, 16]], label: "10 cm" },
            { cote: [[6, 16], [0, 8]], label: "10 cm" },
            { cote: [[0, 8], [0, 0]], label: "8 cm" },
          ]),
          correction:
            "La façade a $5$ côtés. Je les compte avec le doigt.\n$12 + 8 + 10 + 10 + 8 = 48$ cm.\n⛔ Le piège : oublier un côté du toit. Je vérifie : $5$ nombres pour $5$ côtés.\nRéponse : le périmètre de la façade est $48$ cm.",
          micros: ["aire_perimetre_figure"],
        },
        {
          enonce: "Un carré a un périmètre de $44$ cm.\nCombien mesure un côté ?",
          correction:
            "Le tour d'un carré, c'est $4$ côtés égaux.\nJe fais le calcul à l'envers : $44 \\div 4 = 11$ cm.\nJe vérifie : $4 \\times 11 = 44$ cm.\n⛔ Le piège : diviser par $2$, comme pour un rectangle. Un carré a $4$ côtés.\nRéponse : un côté mesure $11$ cm.",
          schema: ecranSeulement(
            bande("44 cm", [
              { valeur: 11, label: "11 cm" },
              { valeur: 11, label: "11 cm" },
              { valeur: 11, label: "11 cm" },
              { valeur: 11, label: "11 cm" },
            ]),
          ),
          micros: ["aire_perimetre_carre"],
        },
        {
          enonce: "Un tapis de yoga est un rectangle.\nIl mesure $1{,}8$ m de long et $60$ cm de large.\nQuel est son périmètre, en cm puis en m ?",
          figure: plan("m", [
            { poly: [[0, 0], [1.8, 0], [1.8, 0.6], [0, 0.6]], fond: "vert" },
            { cote: [[0, 0], [1.8, 0]], label: "1,8 m" },
            { cote: [[1.8, 0], [1.8, 0.6]], label: "60 cm" },
          ]),
          correction:
            "Les deux côtés n'ont pas la même unité. Je mets tout en cm.\n$1{,}8$ m $= 180$ cm.\nLongueur plus largeur : $180 + 60 = 240$ cm.\nLe tour entier : $2 \\times 240 = 480$ cm, soit $4{,}8$ m.\n⛔ Le piège : calculer $1{,}8 + 60$. On mélangerait des m et des cm.\nRéponse : le périmètre est $480$ cm, soit $4{,}8$ m.",
          micros: ["aire_perimetre_rectangle"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur une figure. Je cherche d'abord les côtés qui manquent.",
      rappel: [
        "Un côté qui n'est pas écrit se trouve souvent par une soustraction.",
        "Pour retrouver un côté, je fais le calcul à l'envers.",
        "Quand on colle deux figures, le bord collé n'est plus sur le tour.",
      ],
      exercices: [
        {
          enonce: "Chaque carreau mesure $1$ cm de côté.\na) Calcule le périmètre des figures A, B et C.\nb) Jade dit : « A a le plus grand périmètre, car elle a le plus de carreaux. » A-t-elle raison ?",
          figure: plan("cm", [
            { grille: [0, 0, 12, 3] },
            { poly: [[0, 0], [4, 0], [4, 2], [0, 2]], fond: "bleu" },
            { poly: [[5, 0], [8, 0], [8, 1], [6, 1], [6, 3], [5, 3]], fond: "orange" },
            { poly: [[10, 0], [11, 0], [11, 1], [12, 1], [12, 2], [11, 2], [11, 3], [10, 3], [10, 2], [9, 2], [9, 1], [10, 1]], fond: "vert" },
            { texte: "A", en: [2, 1] },
            { texte: "B", en: [5.5, 1.5] },
            { texte: "C", en: [10.5, 1.5] },
          ]),
          correction:
            "a) Je suis le tour de chaque figure avec le doigt.\nA : $4 + 2 + 4 + 2 = 12$ cm.\nB : $3 + 1 + 2 + 2 + 1 + 3 = 12$ cm.\nC : $12$ petits côtés de $1$ cm, soit $12$ cm.\nb) Non. Les trois figures ont le même périmètre : $12$ cm.\nA a plus de carreaux : $8$, contre $5$. Mais les carreaux, c'est l'aire.\n⛔ Le piège : croire que plus de carreaux donne un plus grand tour.\nRéponse : $12$ cm chacune ; Jade a tort.",
          micros: ["aire_perimetre_figure", "aire_perimetre_comprendre"],
        },
        {
          enonce: "Un enclos pour des moutons est un rectangle.\nSon périmètre est $46$ m. Sa longueur est $15$ m.\nQuelle est sa largeur ?",
          figure: plan("m", [
            { poly: [[0, 0], [15, 0], [15, 8], [0, 8]], fond: "vert" },
            { cote: [[0, 0], [15, 0]], label: "15 m" },
            { cote: [[15, 0], [15, 8]], label: "?" },
            { texte: "tour : 46 m", en: [7.5, 4] },
          ]),
          correction:
            "Le tour, c'est $2$ fois « longueur plus largeur ».\nDonc une longueur plus une largeur font la moitié : $46 \\div 2 = 23$ m.\nJ'enlève la longueur : $23 - 15 = 8$ m.\nJe vérifie : $2 \\times (15 + 8) = 2 \\times 23 = 46$ m.\n⛔ Le piège : calculer $46 - 15 = 31$ m. Le tour compte deux longueurs, pas une.\nRéponse : la largeur est $8$ m.",
          micros: ["aire_perimetre_rectangle", "aire_perimetre_defi"],
        },
        {
          enonce: "Deux côtés de cette figure ne sont pas écrits.\na) Trouve leur longueur.\nb) Calcule le périmètre de la figure.",
          figure: plan("cm", [
            { poly: [[0, 0], [10, 0], [10, 4], [4, 4], [4, 7], [0, 7]], fond: "bleu" },
            { droit: [[0, 0], [10, 0], [0, 7]] },
            { droit: [[4, 4], [10, 4], [4, 7]] },
            { cote: [[0, 0], [10, 0]], label: "10 cm" },
            { cote: [[10, 0], [10, 4]], label: "4 cm" },
            { cote: [[0, 7], [4, 7]], label: "4 cm" },
            { cote: [[0, 0], [0, 7]], label: "7 cm" },
          ]),
          correction:
            "a) Le côté du haut à droite : $10 - 4 = 6$ cm.\nLe petit côté debout : $7 - 4 = 3$ cm.\nb) Je fais le tour : $10 + 4 + 6 + 3 + 4 + 7 = 34$ cm.\n⛔ Le piège : oublier les deux côtés sans nombre. Ils font partie du tour.\nRéponse : a) $6$ cm et $3$ cm ; b) le périmètre est $34$ cm.",
          micros: ["aire_perimetre_figure"],
        },
        {
          enonce: "Emma a une ficelle de $30$ cm. Elle fait le tour de chaque figure avec toute la ficelle.\na) Un carré. Combien mesure un côté ?\nb) Un rectangle de $9$ cm de long. Quelle est sa largeur ?\nc) Un triangle à trois côtés égaux. Combien mesure un côté ?",
          correction:
            "La ficelle fait le tour : le périmètre vaut toujours $30$ cm.\na) Un carré a $4$ côtés égaux : $30 \\div 4 = 7{,}5$ cm.\nb) Longueur plus largeur, c'est la moitié du tour : $30 \\div 2 = 15$ cm.\nPuis $15 - 9 = 6$ cm.\nc) Trois côtés égaux : $30 \\div 3 = 10$ cm.\n⛔ Le piège du a) : dire que le côté mesure $30$ cm. $30$ cm, c'est tout le tour.\nRéponse : a) $7{,}5$ cm ; b) $6$ cm ; c) $10$ cm.",
          schema: bande("30 cm", [
            { valeur: 9, label: "9 cm" },
            { valeur: 6, label: "6 cm", couleur: ORANGE },
            { valeur: 9, label: "9 cm" },
            { valeur: 6, label: "6 cm", couleur: ORANGE },
          ]),
          micros: ["aire_perimetre_comprendre", "aire_perimetre_carre", "aire_perimetre_rectangle"],
        },
        {
          enonce: "Un poulailler carré a un côté de $7{,}5$ m.\nOn l'entoure de grillage, sauf un portillon de $1$ m.\na) Quelle longueur de grillage faut-il ?\nb) Le grillage coûte $4$ € le mètre. Quel est le prix ?",
          figure: plan("m", [
            { poly: [[0, 0], [7.5, 0], [7.5, 7.5], [0, 7.5]], fond: "vert" },
            { trait: [[3, 7.5], [4, 7.5]], tirets: true },
            { cote: [[0, 0], [7.5, 0]], label: "7,5 m" },
            { cote: [[3, 7.5], [4, 7.5]], label: "portillon : 1 m" },
          ]),
          correction:
            "a) Le tour du carré : $4 \\times 7{,}5 = 30$ m.\nLe portillon n'a pas de grillage : $30 - 1 = 29$ m.\nb) $29 \\times 4 = 116$ €.\n⛔ Le piège : acheter $30$ m de grillage. Le portillon n'en a pas besoin.\nRéponse : a) $29$ m de grillage ; b) $116$ €.",
          micros: ["aire_perimetre_probleme", "aire_perimetre_carre"],
        },
        {
          enonce: "On encadre une affiche de $50$ cm sur $70$ cm avec une baguette de bois.\na) Quelle longueur de baguette faut-il, en cm puis en m ?\nb) La baguette coûte $6$ € le mètre. Quel est le prix ?",
          correction:
            "a) La baguette fait le tour de l'affiche : c'est le périmètre.\n$50 + 70 = 120$ cm, puis $2 \\times 120 = 240$ cm.\nEn m : $240 \\div 100 = 2{,}4$ m.\nb) Le prix est donné par mètre : j'utilise $2{,}4$ m.\n$2{,}4 \\times 6 = 14{,}4$. Le prix est $14{,}40$ €.\n⛔ Le piège : calculer $240 \\times 6 = 1\\,440$ €. Le prix est par mètre, pas par cm.\nRéponse : a) $240$ cm, soit $2{,}4$ m ; b) $14{,}40$ €.",
          schema: ecranSeulement(
            plan("cm", [
              { poly: [[0, 0], [50, 0], [50, 70], [0, 70]], fond: "orange" },
              { cote: [[0, 0], [50, 0]], label: "50 cm" },
              { cote: [[50, 0], [50, 70]], label: "70 cm" },
              { texte: "240 cm", en: [25, 35] },
            ]),
          ),
          micros: ["aire_perimetre_probleme", "aire_perimetre_rectangle"],
        },
        {
          enonce: "On a trois carrés de $4$ cm de côté.\nOn les colle bord à bord : en ligne, puis en L.\na) Quel est le périmètre d'un carré seul ?\nb) Quel est le périmètre de la figure en ligne ?\nc) Et celui de la figure en L ?\nd) Pourquoi ne trouve-t-on pas $3 \\times 16 = 48$ cm ?",
          figure: plan("cm", [
            { poly: [[0, 0], [12, 0], [12, 4], [0, 4]], fond: "bleu" },
            { trait: [[4, 0], [4, 4]], tirets: true },
            { trait: [[8, 0], [8, 4]], tirets: true },
            { poly: [[15, 0], [23, 0], [23, 4], [19, 4], [19, 8], [15, 8]], fond: "orange" },
            { trait: [[19, 0], [19, 4]], tirets: true },
            { trait: [[15, 4], [19, 4]], tirets: true },
            { cote: [[0, 0], [4, 0]], label: "4 cm" },
            { cote: [[15, 0], [19, 0]], label: "4 cm" },
          ]),
          correction:
            "a) Un carré seul : $4 \\times 4 = 16$ cm.\nb) En ligne, la figure est un rectangle de $12$ cm sur $4$ cm.\n$12 + 4 = 16$, puis $2 \\times 16 = 32$ cm.\nc) Je suis le tour du L : $8 + 4 + 4 + 4 + 4 + 8 = 32$ cm.\nd) Les bords collés sont en pointillés. Ils sont à l'intérieur : ils ne font plus partie du tour.\n⛔ Le piège : additionner les périmètres des trois carrés.\nRéponse : a) $16$ cm ; b) $32$ cm ; c) $32$ cm ; d) les bords collés ne comptent plus.",
          micros: ["aire_perimetre_defi", "aire_perimetre_figure", "aire_perimetre_comprendre"],
        },
        {
          enonce: "Un carré a un côté de $6{,}5$ cm.\na) Calcule son périmètre.\nb) On double la longueur du côté. Que devient le périmètre ?\nc) On ajoute plutôt $2$ cm à chaque côté. Que devient le périmètre ?",
          correction:
            "a) $4 \\times 6{,}5 = 26$ cm.\nb) Le nouveau côté : $2 \\times 6{,}5 = 13$ cm.\nLe nouveau tour : $4 \\times 13 = 52$ cm. C'est le double de $26$.\nc) Le nouveau côté : $6{,}5 + 2 = 8{,}5$ cm.\nLe nouveau tour : $4 \\times 8{,}5 = 34$ cm.\nLe tour a grandi de $34 - 26 = 8$ cm : $2$ cm sur chacun des $4$ côtés.\n⛔ Le piège du c) : croire que le tour grandit de $2$ cm seulement.\nRéponse : a) $26$ cm ; b) $52$ cm, le double ; c) $34$ cm.",
          schema: ecranSeulement(
            plan("cm", [
              { poly: [[0, 0], [13, 0], [13, 13], [0, 13]], fond: "orange" },
              { poly: [[0, 0], [6.5, 0], [6.5, 6.5], [0, 6.5]], fond: "bleu" },
              { cote: [[0, 0], [13, 0]], label: "13 cm" },
              { cote: [[6.5, 0], [6.5, 6.5]], label: "6,5 cm", sens: -1 },
            ]),
          ),
          micros: ["aire_perimetre_defi", "aire_perimetre_carre"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je repère le tour, je calcule, puis je réponds par une phrase.",
      rappel: [
        "Je cherche d'abord ce qui fait le tour : une clôture, une baguette, une guirlande.",
        "Je trouve les côtés qui manquent, puis j'additionne.",
        "Je mets toutes les longueurs dans la même unité.",
      ],
      exercices: [
        {
          titre: "Le terrain de handball",
          enonce:
            "Un terrain de handball est un rectangle de $40$ m sur $20$ m.\nPour s'échauffer, Léo court le long des lignes.\na) Quel est le périmètre du terrain ?\nb) Léo fait $3$ tours. Quelle distance parcourt-il ?\nc) Combien de tours complets faut-il pour faire au moins $1$ km ?",
          figure: plan("m", [
            { poly: [[0, 0], [40, 0], [40, 20], [0, 20]], fond: "vert" },
            { trait: [[20, 0], [20, 20]], tirets: true },
            { cote: [[0, 0], [40, 0]], label: "40 m" },
            { cote: [[40, 0], [40, 20]], label: "20 m" },
          ]),
          correction:
            "a) $40 + 20 = 60$ m, puis $2 \\times 60 = 120$ m.\nb) $3 \\times 120 = 360$ m.\nc) $1$ km $= 1\\,000$ m.\n$8 \\times 120 = 960$ m : ce n'est pas encore $1$ km.\n$9 \\times 120 = 1\\,080$ m : cette fois, c'est plus que $1$ km.\n⛔ Le piège du c) : répondre « $8$ tours et un bout ». La question demande des tours complets.\nRéponse : a) $120$ m ; b) $360$ m ; c) $9$ tours.",
          micros: ["aire_perimetre_probleme", "aire_perimetre_rectangle"],
        },
        {
          titre: "Le jardin partagé",
          enonce:
            "Voici le plan d'un jardin partagé. Tous ses coins sont des angles droits.\nOn veut l'entourer de grillage, sauf un portail de $3$ m.\na) Trouve les deux côtés qui ne sont pas écrits.\nb) Calcule le périmètre du jardin.\nc) Quelle longueur de grillage faut-il ?\nd) Le grillage se vend en rouleaux de $10$ m, à $25$ € le rouleau. Combien faut-il payer ?",
          figure: plan("m", [
            { poly: [[0, 0], [20, 0], [20, 12], [8, 12], [8, 18], [0, 18]], fond: "vert" },
            { droit: [[8, 12], [20, 12], [8, 18]] },
            { cote: [[0, 0], [20, 0]], label: "20 m" },
            { cote: [[20, 0], [20, 12]], label: "12 m" },
            { cote: [[0, 18], [8, 18]], label: "8 m" },
            { cote: [[0, 0], [0, 18]], label: "18 m" },
          ]),
          correction:
            "a) Le côté du milieu, couché : $20 - 8 = 12$ m.\nLe petit côté debout : $18 - 12 = 6$ m.\nb) Je fais le tour : $20 + 12 + 12 + 6 + 8 + 18 = 76$ m.\nc) Le portail n'a pas de grillage : $76 - 3 = 73$ m.\nd) $7$ rouleaux font $70$ m : pas assez. Il faut $8$ rouleaux.\n$8 \\times 25 = 200$ €.\n⛔ Le piège : oublier les deux côtés sans nombre, et trouver $58$ m.\nRéponse : a) $12$ m et $6$ m ; b) $76$ m ; c) $73$ m ; d) $200$ €.",
          micros: ["aire_perimetre_probleme", "aire_perimetre_figure"],
        },
        {
          titre: "La guirlande lumineuse",
          enonce:
            "Nina veut faire le tour de sa fenêtre avec une guirlande de $5$ m.\nLa fenêtre est un rectangle de $90$ cm de large et $1{,}2$ m de haut.\na) Quel est le périmètre de la fenêtre, en cm puis en m ?\nb) La guirlande est-elle assez longue ? Combien en reste-t-il ?\nc) La porte-fenêtre mesure $90$ cm sur $2{,}1$ m. La guirlande suffit-elle ?",
          correction:
            "a) Je mets tout en cm : $1{,}2$ m $= 120$ cm.\n$90 + 120 = 210$ cm, puis $2 \\times 210 = 420$ cm, soit $4{,}2$ m.\nb) $4{,}2$ m, c'est moins que $5$ m : oui.\nIl reste $5 - 4{,}2 = 0{,}8$ m, soit $80$ cm.\nc) $2{,}1$ m $= 210$ cm.\n$90 + 210 = 300$ cm, puis $2 \\times 300 = 600$ cm, soit $6$ m.\n$6$ m, c'est plus que $5$ m : non. Il manque $1$ m.\n⛔ Le piège : oublier le « $2 \\times$ » et croire qu'il faut $3$ m.\nRéponse : a) $420$ cm, soit $4{,}2$ m ; b) oui, il reste $80$ cm ; c) non, il manque $1$ m.",
          schema: ecranSeulement(
            plan("cm", [
              { poly: [[0, 0], [90, 0], [90, 120], [0, 120]], fond: "bleu" },
              { poly: [[130, 0], [220, 0], [220, 210], [130, 210]], fond: "orange" },
              { cote: [[0, 0], [90, 0]], label: "90 cm" },
              { cote: [[0, 0], [0, 120]], label: "1,2 m" },
              { cote: [[130, 0], [220, 0]], label: "90 cm" },
              { cote: [[220, 0], [220, 210]], label: "2,1 m" },
            ]),
          ),
          micros: ["aire_perimetre_probleme", "aire_perimetre_rectangle"],
        },
        {
          titre: "Les tables de la fête",
          enonce:
            "Pour une fête, on a $6$ tables carrées de $1$ m de côté.\nOn met une personne par mètre de bord.\na) Tables collées en une longue ligne : combien de personnes peut-on asseoir ?\nb) Tables collées en rectangle, $3$ sur $2$ : combien de personnes ?\nc) Il y a $12$ invités. Quelle disposition choisir ?\nd) Pourquoi une table seule a-t-elle $4$ places, mais $6$ tables collées moins de $24$ ?",
          figure: plan("m", [
            { grille: [0, 0, 11, 2] },
            { poly: [[0, 0], [6, 0], [6, 1], [0, 1]], fond: "bleu" },
            { poly: [[8, 0], [11, 0], [11, 2], [8, 2]], fond: "orange" },
            { cote: [[0, 0], [1, 0]], label: "1 m" },
          ]),
          correction:
            "Le nombre de places, c'est le périmètre en mètres.\na) En ligne : un rectangle de $6$ m sur $1$ m.\n$6 + 1 = 7$, puis $2 \\times 7 = 14$ m. On assoit $14$ personnes.\nb) En rectangle : $3$ m sur $2$ m.\n$3 + 2 = 5$, puis $2 \\times 5 = 10$ m. On assoit $10$ personnes.\nc) $10$ places, c'est trop peu pour $12$ invités. Je choisis la ligne : $14$ places.\nd) Quand on colle deux tables, les bords collés disparaissent du tour. Ils perdent leurs places.\n⛔ Le piège : compter $6 \\times 4 = 24$ places. Les bords collés ne sont plus sur le tour.\nRéponse : a) $14$ ; b) $10$ ; c) la ligne ; d) les bords collés ne comptent plus.",
          micros: ["aire_perimetre_defi", "aire_perimetre_probleme", "aire_perimetre_rectangle"],
        },
      ],
    },
  ],
};
