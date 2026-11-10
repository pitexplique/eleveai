// ─── Fiche d'exercices : droites, parallèles et perpendiculaires (CM2) ────────
//
// 10/11/2026 (session fiches-cm2) : feuille INTERACTIVE, une réponse attendue
// par sous-question (`reponses`, vérifiées sans IA). Aucune question ouverte.
// ⭐ « Tracer » ne se vérifie pas à l'écran : il devient une question à
// réponse courte sur une figure DÉJÀ dessinée — « par quel point passe la
// perpendiculaire ? », « quel point relier pour avoir la parallèle ? »,
// « quelle méthode : A, B ou C ? » (micro droite_tracer).
//
// Alignée sur la carte mentale remplie `lib/cartes/remplies/cm2.json`
// (cm2/droite) et sur la banque `droites.bank.ts`.
// ⛔ LIMITES DU CM2 : segment, demi-droite, droite et leurs écritures [AB],
// [AB), (AB) ; parallèles (même écart), perpendiculaires (angle droit, à
// l'équerre) ; deux perpendiculaires à une même droite sont parallèles.
// ⛔ Aucun exemple de la carte repris ([AB] de 4 cm, bords d'une règle à 3 cm,
// fenêtre, parallèle à 3 cm, lignes de but du football).
//
// Pièges nommés : une droite qui « s'arrête » sur le dessin (1, 7), [ ] et ( )
// confondus (2), deux droites qui ne se coupent pas sur la feuille (3, 13), à
// l'œil au lieu de l'équerre (4, 11), l'écart pris en biais (5, 15), toute
// droite qui coupe n'est pas perpendiculaire (6, 4), les diagonales du
// rectangle (14), compter les lignes au lieu des écarts (17, 18), une seule
// paire vue au lieu de deux (19), le point le plus proche à l'œil (20).
//
// Contextes : trains, guitare, cahier (8, 17), plan d'un quartier (9, 16),
// cerf-volant (14), échelle des pompiers (18), carte au trésor (20). Aucun
// décor de La Réunion. Métiers : musicienne (8), urbaniste (9, 16), pompier (18).
//
// Figures (`fig`) EN CLAIR, sur quadrillage : chaque droite est posée par deux
// nœuds ; le contrôle refait les directions (parallèles : vecteurs
// colinéaires ; perpendiculaires : produit scalaire nul ; un angle marqué
// droit mesure 90°) et vérifie que deux droites « non parallèles » de
// l'énoncé ne se coupent pas dans le cadre quand l'exercice le dit.
//
// Micro-compétences : droite_reconnaitre (1, 2, 7, 12), droite_parallele (3,
// 5, 8, 9, 10, 13, 17), droite_perpendiculaire (4, 6, 9, 10, 14, 16, 19),
// droite_tracer (5, 11, 15, 20), droite_defi (10, 12, 16, 17, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type P2 = [number, number];
type Ancre = "start" | "middle" | "end";
type Vers = "haut" | "bas" | "gauche" | "droite" | "hg" | "hd" | "bg" | "bd" | "centre";

const ENCRE = "#0f172a";
const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const VERT = "#16a34a";
const VIOLET = "#7c3aed";
const ROUGE = "#dc2626";
const GRIS = "#64748b";
const JAUNE = "#ca8a04";

/**
 * ⭐ UNE FIGURE DE GÉOMÉTRIE, écrite EN CLAIR (coordonnées en carreaux, y vers
 * le haut) : le script de contrôle relit `f` (la prop du composant) et refait
 * chaque mesure — angles, parallèles, perpendiculaires, symétriques, aires.
 * `cases` : repérage par cases (lettres sous les colonnes, nombres à gauche,
 * 1 en bas). `repere` : axes gradués 0…w et 0…h (un point sur un nœud).
 * `traits` : lignes brisées (fermées avec `ferme`). `arcs` : un angle en `en`,
 * tourné dans le sens inverse des aiguilles d'une montre de `de` vers `vers`.
 * ⛔ Texte NU dans le SVG (pas de KaTeX), police 14, viewBox 300 de large,
 * étiquettes bornées au cadre : rien ne déborde à 375 px.
 */
type Fig = {
  w: number;
  h: number;
  quadrillage?: boolean;
  cases?: boolean;
  repere?: boolean;
  remplir?: { en: P2; couleur?: string }[];
  traits?: { pts: P2[]; couleur?: string; fond?: string; ferme?: boolean; pointilles?: boolean; fin?: boolean }[];
  points?: { en: P2; nom?: string; couleur?: string; vers?: Vers }[];
  jetons?: { en: P2; forme: "rond" | "carre" | "triangle" | "etoile"; couleur: string }[];
  textes?: { en: P2; t: string; couleur?: string; taille?: number }[];
  arcs?: { en: P2; de: P2; vers: P2; label?: string; couleur?: string; droit?: boolean; plein?: boolean; rayon?: number }[];
  cercles?: { centre: P2; rayon: number; couleur?: string; fond?: string }[];
  rapporteur?: { centre: P2; rayon: number };
  horloge?: { centre: P2; rayon: number; heures?: number };
};

function Figure({ f }: { f: Fig }) {
  const W = 300, HMAX = 250;
  const reperes = f.cases || f.repere;
  const [ml, mr, mt, mb] = reperes ? [28, 12, 12, 26] : [14, 14, 14, 14];
  const u = Math.min((W - ml - mr) / f.w, (HMAX - mt - mb) / f.h);
  const H = Math.round(f.h * u + mt + mb);
  const ox = ml + (W - ml - mr - f.w * u) / 2;
  const px = (p: P2): P2 => [ox + p[0] * u, mt + (f.h - p[1]) * u];
  const dir = (a: P2, b: P2) => Math.atan2(b[1] - a[1], b[0] - a[0]);
  const ancre = (c: number): Ancre => (c > 0.4 ? "start" : c < -0.4 ? "end" : "middle");
  const etiquette = (x: number, y: number, t: string, couleur: string, a: Ancre, key: string, taille = 14) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = Math.min(Math.max(x, 3 + ga), W - 3 - dr);
    const by = Math.min(Math.max(y, 9), H - 7);
    return (
      <text key={key} x={bx.toFixed(1)} y={by.toFixed(1)} textAnchor={a} dominantBaseline="middle" fontSize={taille} fontWeight={800} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
        {t}
      </text>
    );
  };
  const decal: Record<Vers, [number, number, Ancre]> = {
    haut: [0, -13, "middle"],
    bas: [0, 15, "middle"],
    gauche: [-9, 0, "end"],
    droite: [9, 0, "start"],
    hg: [-7, -11, "end"],
    hd: [7, -11, "start"],
    bg: [-7, 13, "end"],
    bd: [7, 13, "start"],
    centre: [0, 0, "middle"],
  };
  const quad = f.quadrillage || f.cases || f.repere;
  const LETTRES = "ABCDEFGHIJ";

  return (
    <div className="mx-auto w-full max-w-[19rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Figure de géométrie">
        {(f.remplir ?? []).map((c, i) => {
          const [x, y] = px([c.en[0], c.en[1] + 1]);
          return <rect key={`r${i}`} x={x} y={y} width={u} height={u} fill={c.couleur ?? BLEU} fillOpacity={0.55} />;
        })}
        {quad
          ? Array.from({ length: f.w + 1 }, (_, k) => <line key={`qx${k}`} x1={px([k, 0])[0]} y1={mt} x2={px([k, 0])[0]} y2={mt + f.h * u} stroke={f.cases ? "#94a3b8" : "#e2e8f0"} strokeWidth={1} />)
          : null}
        {quad
          ? Array.from({ length: f.h + 1 }, (_, k) => <line key={`qy${k}`} x1={ox} y1={px([0, k])[1]} x2={ox + f.w * u} y2={px([0, k])[1]} stroke={f.cases ? "#94a3b8" : "#e2e8f0"} strokeWidth={1} />)
          : null}
        {f.cases
          ? Array.from({ length: f.w }, (_, k) => etiquette(px([k + 0.5, 0])[0], mt + f.h * u + 14, LETTRES[k], ENCRE, "middle", `cl${k}`))
          : null}
        {f.cases ? Array.from({ length: f.h }, (_, k) => etiquette(ox - 9, px([0, k + 0.5])[1], String(k + 1), ENCRE, "end", `cn${k}`)) : null}
        {f.repere ? (
          <g>
            <line x1={ox} y1={px([0, 0])[1]} x2={ox + f.w * u} y2={px([0, 0])[1]} stroke={ENCRE} strokeWidth={1.8} />
            <line x1={ox} y1={px([0, 0])[1]} x2={ox} y2={mt} stroke={ENCRE} strokeWidth={1.8} />
            {Array.from({ length: f.w + 1 }, (_, k) => etiquette(px([k, 0])[0], mt + f.h * u + 14, String(k), ENCRE, "middle", `rx${k}`))}
            {Array.from({ length: f.h }, (_, k) => etiquette(ox - 9, px([0, k + 1])[1], String(k + 1), ENCRE, "end", `ry${k}`))}
          </g>
        ) : null}
        {f.rapporteur
          ? (() => {
              const C = px(f.rapporteur.centre);
              const R = f.rapporteur.rayon * u;
              const pt = (deg: number, r: number): P2 => [C[0] + r * Math.cos((deg * Math.PI) / 180), C[1] - r * Math.sin((deg * Math.PI) / 180)];
              return (
                <g>
                  <path d={`M ${C[0] - R} ${C[1]} A ${R} ${R} 0 0 1 ${C[0] + R} ${C[1]} Z`} fill="#e0f2fe" fillOpacity={0.55} stroke={GRIS} strokeWidth={1.4} />
                  {Array.from({ length: 19 }, (_, k) => k * 10).map((d) => {
                    const L = d % 30 === 0 ? 11 : 6;
                    const [a, b] = [pt(d, R), pt(d, R - L)];
                    return <line key={d} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={GRIS} strokeWidth={1} />;
                  })}
                  {[0, 30, 60, 90, 120, 150, 180].map((d) => {
                    const [ex, ey] = pt(d, R + 12);
                    const [ix, iy] = pt(d, R - 22);
                    const leve = d === 0 || d === 180 ? -10 : 0;
                    return (
                      <g key={`n${d}`}>
                        <text x={ex} y={ey + leve} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={700} fill={GRIS}>
                          {180 - d}
                        </text>
                        <text x={ix} y={iy + leve} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={800} fill={BLEU}>
                          {d}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })()
          : null}
        {f.horloge
          ? (() => {
              const C = px(f.horloge.centre);
              const R = f.horloge.rayon * u;
              const ang = (h: number) => ((90 - 30 * h) * Math.PI) / 180;
              return (
                <g>
                  <circle cx={C[0]} cy={C[1]} r={R} fill="#f8fafc" stroke={ENCRE} strokeWidth={2.2} />
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                    <g key={h}>
                      <line x1={C[0] + R * Math.cos(ang(h))} y1={C[1] - R * Math.sin(ang(h))} x2={C[0] + (R - 6) * Math.cos(ang(h))} y2={C[1] - (R - 6) * Math.sin(ang(h))} stroke={ENCRE} strokeWidth={1.6} />
                      <text x={C[0] + (R - 17) * Math.cos(ang(h))} y={C[1] - (R - 17) * Math.sin(ang(h))} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={700} fill={GRIS}>
                        {h}
                      </text>
                    </g>
                  ))}
                  {f.horloge.heures !== undefined ? (
                    <g>
                      <line x1={C[0]} y1={C[1]} x2={C[0] + R * 0.5 * Math.cos(ang(f.horloge.heures))} y2={C[1] - R * 0.5 * Math.sin(ang(f.horloge.heures))} stroke={ENCRE} strokeWidth={4} strokeLinecap="round" />
                      <line x1={C[0]} y1={C[1]} x2={C[0]} y2={C[1] - R * 0.75} stroke={ENCRE} strokeWidth={2.4} strokeLinecap="round" />
                    </g>
                  ) : null}
                </g>
              );
            })()
          : null}
        {(f.cercles ?? []).map((c, i) => {
          const [cx, cy] = px(c.centre);
          return <circle key={`ce${i}`} cx={cx} cy={cy} r={c.rayon * u} fill={c.fond ?? "none"} stroke={c.couleur ?? BLEU} strokeWidth={2.4} />;
        })}
        {(f.traits ?? []).map((t, i) => {
          const chemin = t.pts.map((p) => px(p).map((v) => v.toFixed(1)).join(",")).join(" ");
          const commun = {
            stroke: t.couleur ?? BLEU,
            strokeWidth: t.pointilles ? 2 : t.fin ? 1.6 : 2.6,
            strokeDasharray: t.pointilles ? "7 5" : undefined,
            strokeLinejoin: "round" as const,
            strokeLinecap: "round" as const,
          };
          return t.ferme ? <polygon key={`t${i}`} points={chemin} fill={t.fond ?? "none"} fillOpacity={0.35} {...commun} /> : <polyline key={`t${i}`} points={chemin} fill="none" {...commun} />;
        })}
        {(f.arcs ?? []).map((a, i) => {
          const V = px(a.en);
          const a1 = dir(a.en, a.de);
          const d = (((dir(a.en, a.vers) - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const pt = (ang: number, r: number): P2 => [V[0] + r * Math.cos(ang), V[1] - r * Math.sin(ang)];
          if (a.droit) {
            const [p, q] = [pt(a1, 11), pt(a1 + d, 11)];
            return <path key={`a${i}`} d={`M ${p[0]} ${p[1]} L ${p[0] + q[0] - V[0]} ${p[1] + q[1] - V[1]} L ${q[0]} ${q[1]}`} fill="none" stroke={ROUGE} strokeWidth={2.2} />;
          }
          const couleur = a.couleur ?? (a.plein ? ORANGE : VIOLET);
          const r = a.rayon ?? (d < 0.7 ? 30 : 22);
          const [p, q] = [pt(a1, r), pt(a1 + d, r)];
          const arc = `M ${p[0].toFixed(1)} ${p[1].toFixed(1)} A ${r} ${r} 0 ${d > Math.PI ? 1 : 0} 0 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
          const am = a1 + d / 2;
          const [lx, ly] = pt(am, r + (d < 0.5 ? 17 : 14));
          return (
            <g key={`a${i}`}>
              {a.plein ? <path d={`M ${V[0].toFixed(1)} ${V[1].toFixed(1)} L ${arc.slice(2)} Z`} fill={couleur} fillOpacity={0.25} /> : null}
              <path d={arc} fill="none" stroke={couleur} strokeWidth={2} />
              {a.label ? etiquette(lx, ly, a.label, couleur, ancre(Math.cos(am)), `al${i}`) : null}
            </g>
          );
        })}
        {(f.jetons ?? []).map((j, i) => {
          const [cx, cy] = px([j.en[0] + 0.5, j.en[1] + 0.5]);
          const r = u * 0.32;
          if (j.forme === "rond") return <circle key={`j${i}`} cx={cx} cy={cy} r={r} fill={j.couleur} />;
          if (j.forme === "carre") return <rect key={`j${i}`} x={cx - r * 0.9} y={cy - r * 0.9} width={r * 1.8} height={r * 1.8} fill={j.couleur} />;
          if (j.forme === "triangle") return <polygon key={`j${i}`} points={`${cx},${cy - r} ${cx + r},${cy + r * 0.8} ${cx - r},${cy + r * 0.8}`} fill={j.couleur} />;
          const sommets = Array.from({ length: 10 }, (_, k) => {
            const rr = k % 2 ? r * 0.45 : r * 1.1;
            const an = -Math.PI / 2 + (k * Math.PI) / 5;
            return `${(cx + rr * Math.cos(an)).toFixed(1)},${(cy + rr * Math.sin(an)).toFixed(1)}`;
          });
          return <polygon key={`j${i}`} points={sommets.join(" ")} fill={j.couleur} />;
        })}
        {(f.points ?? []).map((p, i) => {
          const [x, y] = px(p.en);
          const [dx, dy, a] = decal[p.vers ?? "hd"];
          return (
            <g key={`p${i}`}>
              <circle cx={x} cy={y} r={3.6} fill={p.couleur ?? ENCRE} />
              {p.nom ? etiquette(x + dx, y + dy, p.nom, p.couleur ?? ENCRE, a, `pn${i}`, 15) : null}
            </g>
          );
        })}
        {(f.textes ?? []).map((t, i) => etiquette(px(t.en)[0], px(t.en)[1], t.t, t.couleur ?? ENCRE, "middle", `tx${i}`, t.taille ?? 14))}
      </svg>
    </div>
  );
}

/** La figure : le composant garde ses données en clair (`props.f`), relues par le contrôle. */
const fig = (f: Fig) => <Figure f={f} />;

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesDroiteCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "droite",
  titre: "Droites, parallèles et perpendiculaires",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître un segment, une demi-droite, une droite, et les écrire. Repérer des droites parallèles (même écart partout) et perpendiculaires (un angle droit). Choisir le bon point pour tracer une parallèle ou une perpendiculaire. Des rails, une guitare, un cahier, le plan d'un quartier, un cerf-volant, une échelle de pompier. Un rappel de cours avant chaque niveau. Cherche d'abord avec ta règle et ton équerre. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/droite", titre: "Droites et segments" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde les bouts, puis j'utilise l'équerre.",
      rappel: [
        "Un segment a deux bouts : $[AB]$. Une demi-droite a un seul bout : $[AB)$. Une droite n'a pas de bout : $(AB)$.",
        "Deux droites parallèles gardent toujours le même écart : elles ne se coupent jamais.",
        "Deux droites perpendiculaires se coupent en faisant un angle droit. Je vérifie à l'équerre.",
      ],
      exercices: [
        {
          enonce:
            "Pour chaque tracé, écris segment, demi-droite ou droite.\nUn trait qui touche le bord du cadre continue sans fin.\na) le tracé 1\nb) le tracé 2\nc) le tracé 3",
          figure: fig({
            w: 12,
            h: 6,
            traits: [
              { pts: [[0, 0], [12, 0], [12, 6], [0, 6]], ferme: true, couleur: GRIS, fin: true },
              { pts: [[1.5, 5], [6, 5]], couleur: ENCRE },
              { pts: [[1.5, 3], [12, 3]], couleur: ENCRE },
              { pts: [[0, 1], [12, 1]], couleur: ENCRE },
            ],
            points: [
              { en: [1.5, 5], nom: "A", vers: "haut" },
              { en: [6, 5], nom: "B", vers: "haut" },
              { en: [1.5, 3], nom: "C", vers: "haut" },
              { en: [5, 3], nom: "D", vers: "haut" },
              { en: [4, 1], nom: "E", vers: "haut" },
              { en: [8, 1], nom: "F", vers: "haut" },
            ],
            textes: [
              { en: [0.6, 5], t: "1", couleur: BLEU },
              { en: [0.6, 3], t: "2", couleur: BLEU },
              { en: [0.6, 1.6], t: "3", couleur: BLEU },
            ],
          }),
          correction:
            "Je regarde les bouts de chaque tracé.\na) Le tracé 1 s'arrête en A et en B : deux bouts. C'est un segment, $[AB]$.\nb) Le tracé 2 part de C et file jusqu'au bord : un seul bout. C'est une demi-droite, $[CD)$.\nc) Le tracé 3 touche les deux bords : aucun bout. C'est une droite, $(EF)$.\n⛔ Le piège : croire qu'une droite s'arrête au bord de la feuille. On la dessine courte, mais elle continue sans fin.\nRéponse : a) segment ; b) demi-droite ; c) droite.",
          micros: ["droite_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["segment", "un segment"] },
            { question: "b)", attendu: ["demi-droite", "demi droite", "une demi-droite"] },
            { question: "c)", attendu: ["droite", "une droite"] },
          ],
        },
        {
          enonce:
            "A et B sont deux points. Choisis la bonne écriture : A. $(AB)$   B. $[AB)$   C. $[AB]$\na) la droite qui passe par A et B\nb) le segment qui va de A à B\nc) la demi-droite qui part de A et passe par B",
          correction:
            "Les crochets [ ] marquent un bout. Les parenthèses ( ) disent : ça continue.\na) Une droite n'a pas de bout : deux parenthèses, $(AB)$. Réponse A.\nb) Un segment a deux bouts : deux crochets, $[AB]$. Réponse C.\nc) Une demi-droite a un bout en A : un crochet du côté de A, une parenthèse de l'autre. $[AB)$. Réponse B.\n⛔ Le piège : écrire $(AB)$ pour un segment. Un segment se mesure : il a deux bouts, donc deux crochets.\nRéponse : a) A ; b) C ; c) B.",
          micros: ["droite_reconnaitre"],
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "C" },
            { question: "c)", attendu: "B" },
          ],
        },
        {
          enonce:
            "Regarde les droites 1, 2, 3 et 4.\na) Quelle droite est parallèle à la droite 1 ? Écris son numéro.\nb) Les droites 2 et 3 ne se coupent pas sur le dessin. Sont-elles parallèles ? Réponds oui ou non.\nc) La droite 4 coupe-t-elle la droite 1 ? Réponds oui ou non.",
          figure: fig({
            w: 10,
            h: 7,
            quadrillage: true,
            traits: [
              { pts: [[0, 1], [10, 4.3333]], couleur: BLEU },
              { pts: [[0, 4.5], [10, 7]], couleur: ORANGE },
              { pts: [[0, 3], [10, 6.3333]], couleur: VERT },
              { pts: [[6, 0], [8, 7]], couleur: VIOLET },
            ],
            textes: [
              { en: [2, 1.6667], t: "1", couleur: BLEU },
              { en: [2, 5], t: "2", couleur: ORANGE },
              { en: [2, 3.6667], t: "3", couleur: VERT },
              { en: [6.2286, 0.8], t: "4", couleur: VIOLET },
            ],
          }),
          correction:
            "Je compte les carreaux le long de chaque droite.\na) La droite 1 : 3 carreaux vers la droite, 1 vers le haut. La droite 3 aussi : 3 vers la droite, 1 vers le haut.\nElles ont la même pente. L'écart entre elles reste 2 carreaux partout : elles sont parallèles.\nb) La droite 2 monte moins vite : 4 carreaux vers la droite pour 1 vers le haut.\nL'écart avec la droite 3 rétrécit vers la droite. Plus loin, hors du dessin, elles se coupent. Non, elles ne sont pas parallèles.\nc) Oui : la droite 4 traverse la droite 1.\n⛔ Le piège : croire que deux droites qui ne se coupent pas sur la feuille sont parallèles. Je vérifie que l'écart reste le même.\nRéponse : a) 3 ; b) non ; c) oui.",
          micros: ["droite_parallele"],
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "oui" },
          ],
        },
        {
          enonce:
            "Les droites a, b et c coupent la droite (d).\na) Laquelle est perpendiculaire à (d) ? Vérifie avec ton équerre. Écris sa lettre.\nb) La droite b coupe-t-elle (d) ? Réponds oui ou non.\nc) La droite b est-elle perpendiculaire à (d) ? Réponds oui ou non.",
          figure: fig({
            w: 10,
            h: 7,
            quadrillage: true,
            traits: [
              { pts: [[0, 1], [10, 6]], couleur: ENCRE },
              { pts: [[2.5, 0], [0.75, 7]], couleur: BLEU },
              { pts: [[10, 0], [3, 7]], couleur: ORANGE },
              { pts: [[5.5, 0], [2, 7]], couleur: VERT },
            ],
            textes: [
              { en: [9.2, 6.4], t: "(d)" },
              { en: [1, 6], t: "a", couleur: BLEU },
              { en: [3.6, 6.4], t: "b", couleur: ORANGE },
              { en: [2.5, 6], t: "c", couleur: VERT },
            ],
          }),
          correction:
            "Je pose l'équerre sur (d), le coin au croisement.\na) La droite c colle au bord de l'équerre : elle est perpendiculaire à (d).\nSur le quadrillage : (d) avance de 2 carreaux et monte de 1. La droite c recule de 1 et monte de 2. Ce « carreau tourné » fait un angle droit.\nb) Oui, la droite b coupe (d).\nc) Non : b coupe (d), mais l'angle n'est pas droit. L'équerre ne colle pas.\n⛔ Le piège : croire que toute droite qui coupe (d) lui est perpendiculaire. Il faut un angle droit, vérifié à l'équerre.\nRéponse : a) c ; b) oui ; c) non.",
          schema: ecranSeulement(
            fig({
              w: 10,
              h: 7,
              quadrillage: true,
              traits: [
                { pts: [[0, 1], [10, 6]], couleur: ENCRE },
                { pts: [[5.5, 0], [2, 7]], couleur: VERT },
              ],
              arcs: [{ en: [4, 3], de: [10, 6], vers: [2, 7], droit: true }],
              textes: [
                { en: [9.2, 6.4], t: "(d)" },
                { en: [2.5, 6], t: "c", couleur: VERT },
              ],
            }),
          ),
          micros: ["droite_perpendiculaire"],
          reponses: [
            { question: "a)", attendu: "c", exact: true },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "non" },
          ],
        },
        {
          enonce:
            "Tom veut tracer la droite parallèle à (d) qui passe par M.\na) Quel point doit-il relier à M : P, Q ou R ?\nb) De combien de carreaux est l'écart entre (d) et cette parallèle ?",
          figure: fig({
            w: 10,
            h: 6,
            quadrillage: true,
            traits: [{ pts: [[0, 1], [10, 1]], couleur: ENCRE }],
            points: [
              { en: [2, 4], nom: "M", couleur: BLEU },
              { en: [7, 4], nom: "P" },
              { en: [7, 5], nom: "Q" },
              { en: [5, 3], nom: "R" },
            ],
            textes: [{ en: [9.3, 1.5], t: "(d)" }],
          }),
          correction:
            "Une parallèle garde le même écart avec (d), partout.\nM est à 3 carreaux au-dessus de (d), mesurés tout droit, à l'équerre.\nP est aussi à 3 carreaux de (d). Q est à 4 carreaux, R à 2 carreaux.\na) Je relie M et P : la droite (MP) reste à 3 carreaux de (d). Elle est parallèle.\nb) L'écart est de 3 carreaux.\n⛔ Le piège : relier M à un point qui « a l'air » bien placé. L'écart doit être LE MÊME aux deux points.\nRéponse : a) P ; b) 3.",
          schema: ecranSeulement(
            fig({
              w: 10,
              h: 6,
              quadrillage: true,
              traits: [
                { pts: [[0, 1], [10, 1]], couleur: ENCRE },
                { pts: [[0, 4], [10, 4]], couleur: ORANGE },
                { pts: [[2, 1], [2, 4]], couleur: GRIS, pointilles: true },
                { pts: [[7, 1], [7, 4]], couleur: GRIS, pointilles: true },
              ],
              arcs: [
                { en: [2, 1], de: [10, 1], vers: [2, 4], droit: true },
                { en: [7, 1], de: [10, 1], vers: [7, 4], droit: true },
              ],
              points: [
                { en: [2, 4], nom: "M", couleur: BLEU },
                { en: [7, 4], nom: "P", couleur: ORANGE },
              ],
              textes: [{ en: [9.3, 1.5], t: "(d)" }],
            }),
          ),
          micros: ["droite_tracer", "droite_parallele"],
          reponses: [
            { question: "a)", attendu: "P", exact: true },
            { question: "b)", attendu: "3" },
          ],
        },
        {
          enonce:
            "Vrai ou faux ?\na) Deux droites perpendiculaires se coupent en faisant un angle droit.\nb) Deux droites qui se coupent sont toujours perpendiculaires.\nc) Pour vérifier un angle droit, j'utilise l'équerre.\nd) Deux droites parallèles finissent par se couper, très loin.",
          correction:
            "a) Vrai : c'est la définition de deux droites perpendiculaires.\nb) Faux : elles peuvent se couper « en biais », sans angle droit.\nc) Vrai : le coin de l'équerre est un angle droit.\nd) Faux : deux droites parallèles gardent le même écart. Elles ne se coupent jamais.\n⛔ Le piège au b) : se couper ne suffit pas. Il faut un angle droit.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["droite_perpendiculaire", "droite_parallele"],
          reponses: [
            { question: "a)", attendu: ["vrai"] },
            { question: "b)", attendu: ["faux"] },
            { question: "c)", attendu: ["vrai"] },
            { question: "d)", attendu: ["faux"] },
          ],
        },
        {
          enonce:
            "Peut-on mesurer avec une règle ? Réponds oui ou non.\na) le segment $[AB]$\nb) la droite $(AB)$\nc) la demi-droite $[AB)$\nd) Sur le quadrillage, un carreau mesure 1 cm. Combien mesure le segment $[CD]$, en cm ?",
          figure: fig({
            w: 8,
            h: 2,
            quadrillage: true,
            traits: [{ pts: [[1, 1], [7, 1]], couleur: BLEU }],
            points: [
              { en: [1, 1], nom: "C", vers: "haut" },
              { en: [7, 1], nom: "D", vers: "haut" },
            ],
          }),
          correction:
            "On ne peut mesurer que ce qui a deux bouts.\na) Oui : le segment s'arrête en A et en B.\nb) Non : une droite ne s'arrête jamais. Elle n'a pas de longueur.\nc) Non : la demi-droite part de A mais ne s'arrête pas de l'autre côté.\nd) De C à D, je compte 6 carreaux : $[CD]$ mesure 6 cm.\n⛔ Le piège : mesurer une droite tracée courte sur la feuille. Le trait dessiné n'est qu'un morceau de la droite.\nRéponse : a) oui ; b) non ; c) non ; d) 6 cm.",
          micros: ["droite_reconnaitre"],
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: "6" },
          ],
        },
        {
          enonce:
            "Ces lignes sont-elles parallèles ? Réponds oui ou non.\na) les deux rails d'une voie de train\nb) les deux traits du signe +\nc) les cordes d'une guitare\nd) les lignes d'un cahier",
          correction:
            "Parallèles : elles gardent le même écart et ne se croisent jamais.\na) Oui : l'écart entre les rails est toujours le même, sinon le train déraillerait.\nb) Non : les deux traits du + se croisent. Ils sont perpendiculaires.\nc) Oui : une musicienne le voit bien, les cordes gardent le même écart et ne se touchent pas.\nd) Oui : les lignes du cahier ont toutes le même écart.\n⛔ Le piège : confondre parallèle et perpendiculaire. Perpendiculaires, elles se croisent en angle droit ; parallèles, jamais.\nRéponse : a) oui ; b) non ; c) oui ; d) oui.",
          micros: ["droite_parallele"],
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "oui" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je m'aide du quadrillage, de la règle et de l'équerre.",
      rappel: [
        "Sur un quadrillage, les lignes horizontales sont parallèles entre elles, et perpendiculaires aux lignes verticales.",
        "L'écart entre deux droites se mesure tout droit, à l'équerre, jamais en biais.",
        "Deux droites perpendiculaires à une même droite sont parallèles.",
      ],
      exercices: [
        {
          enonce:
            "Une urbaniste dessine le plan d'un quartier. Chaque droite est une rue.\na) Quelle rue est parallèle à la rue 1 ? Écris son numéro.\nb) Quelle rue est perpendiculaire à la rue 1 ?\nc) La rue 4 est-elle perpendiculaire à la rue 1 ? Réponds oui ou non.",
          figure: fig({
            w: 10,
            h: 7,
            quadrillage: true,
            traits: [
              { pts: [[0, 1], [10, 1]], couleur: BLEU },
              { pts: [[0, 5], [10, 5]], couleur: ORANGE },
              { pts: [[3, 0], [3, 7]], couleur: VERT },
              { pts: [[5, 0], [9, 7]], couleur: VIOLET },
            ],
            textes: [
              { en: [1, 1], t: "1", couleur: BLEU },
              { en: [1, 5], t: "2", couleur: ORANGE },
              { en: [3, 6.3], t: "3", couleur: VERT },
              { en: [8.4286, 6], t: "4", couleur: VIOLET },
            ],
          }),
          correction:
            "a) La rue 1 et la rue 2 suivent les lignes du quadrillage. L'écart est de 4 carreaux partout : la rue 2 est parallèle à la rue 1.\nb) La rue 3 suit une ligne verticale du quadrillage. Elle coupe la rue 1 en angle droit : elle est perpendiculaire.\nc) La rue 4 coupe la rue 1 en biais. L'équerre ne colle pas : non.\n⛔ Le piège : croire que la rue 4 est perpendiculaire parce qu'elle « monte ». Il faut un angle droit.\nRéponse : a) 2 ; b) 3 ; c) non.",
          micros: ["droite_parallele", "droite_perpendiculaire"],
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "non" },
          ],
        },
        {
          enonce:
            "Les droites (e) et (f) sont toutes les deux perpendiculaires à la droite (d).\nChoisis : A. parallèles   B. perpendiculaires\na) (e) et (f) sont …\nb) (e) et (d) sont …\nc) (f) et (d) sont …",
          figure: fig({
            w: 10,
            h: 6,
            quadrillage: true,
            traits: [
              { pts: [[0, 1], [10, 1]], couleur: ENCRE },
              { pts: [[3, 0], [3, 6]], couleur: BLEU },
              { pts: [[7, 0], [7, 6]], couleur: ORANGE },
            ],
            arcs: [
              { en: [3, 1], de: [10, 1], vers: [3, 6], droit: true },
              { en: [7, 1], de: [10, 1], vers: [7, 6], droit: true },
            ],
            textes: [
              { en: [9.3, 1.5], t: "(d)" },
              { en: [2.3, 5.4], t: "(e)", couleur: BLEU },
              { en: [7.7, 5.4], t: "(f)", couleur: ORANGE },
            ],
          }),
          correction:
            "a) (e) et (f) font toutes les deux un angle droit avec (d). Elles « montent » tout droit, côte à côte.\nL'écart entre elles reste 4 carreaux : elles sont parallèles. Réponse A.\nb) (e) coupe (d) en angle droit : perpendiculaires. Réponse B.\nc) (f) aussi : perpendiculaires. Réponse B.\n⛔ Le piège : croire que deux perpendiculaires à (d) sont perpendiculaires entre elles. Elles ne se croisent jamais : elles sont parallèles.\nRéponse : a) A ; b) B ; c) B.",
          micros: ["droite_defi", "droite_parallele", "droite_perpendiculaire"],
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "B" },
            { question: "c)", attendu: "B" },
          ],
        },
        {
          enonce:
            "On veut tracer la perpendiculaire à (d) qui passe par A.\na) Par quel autre point passe-t-elle : P, Q ou R ? Vérifie avec l'équerre.\nb) Sur cette perpendiculaire, quand on avance de 1 carreau vers la droite, de combien de carreaux descend-on ?",
          figure: fig({
            w: 10,
            h: 7,
            quadrillage: true,
            traits: [{ pts: [[0, 0.5], [10, 5.5]], couleur: ENCRE }],
            points: [
              { en: [3, 5], nom: "A", couleur: BLEU },
              { en: [5, 1], nom: "P" },
              { en: [6, 2], nom: "Q" },
              { en: [6, 5], nom: "R" },
            ],
            textes: [{ en: [9.2, 6], t: "(d)" }],
          }),
          correction:
            "(d) avance de 2 carreaux vers la droite et monte de 1.\nUne perpendiculaire « tourne le carreau » : elle avance de 1 et descend de 2.\nDepuis A : 1 à droite, 2 en bas, puis encore 1 à droite, 2 en bas. J'arrive sur P.\nQ : depuis A, 3 à droite et 3 en bas. Ce n'est pas la bonne pente.\nR : à la même hauteur que A. La droite (AR) serait horizontale.\na) La perpendiculaire passe par P.\nb) Pour 1 carreau vers la droite, elle descend de 2 carreaux.\n⛔ Le piège : choisir Q « à l'œil ». Je vérifie avec l'équerre : seul (AP) fait un angle droit avec (d).\nRéponse : a) P ; b) 2.",
          schema: ecranSeulement(
            fig({
              w: 10,
              h: 7,
              quadrillage: true,
              traits: [
                { pts: [[0, 0.5], [10, 5.5]], couleur: ENCRE },
                { pts: [[2, 7], [5.25, 0.5]], couleur: ORANGE },
              ],
              arcs: [{ en: [4.2, 2.6], de: [10, 5.5], vers: [3, 5], droit: true }],
              points: [
                { en: [3, 5], nom: "A", couleur: BLEU },
                { en: [5, 1], nom: "P", couleur: ORANGE, vers: "droite" },
              ],
              textes: [{ en: [9.2, 6], t: "(d)" }],
            }),
          ),
          micros: ["droite_tracer", "droite_perpendiculaire"],
          reponses: [
            { question: "a)", attendu: "P", exact: true },
            { question: "b)", attendu: "2" },
          ],
        },
        {
          enonce:
            "a) Combien de droites passent à la fois par deux points A et B ?\nb) Par un seul point A, combien de droites peut-on tracer ? A. une seule   B. deux   C. autant qu'on veut\nc) Voici 4 points. Jamais trois ne sont sur une même droite. Combien de segments faut-il pour relier chaque point à tous les autres ?",
          figure: fig({
            w: 7,
            h: 6,
            points: [
              { en: [1, 1], nom: "A", vers: "bg" },
              { en: [6, 1], nom: "B", vers: "bd" },
              { en: [5, 5], nom: "C", vers: "hd" },
              { en: [2, 4.5], nom: "D", vers: "hg" },
            ],
          }),
          correction:
            "a) Je pose ma règle sur A et sur B : il n'y a qu'une façon de tracer. 1 seule droite.\nb) Par un seul point, je peux faire tourner ma règle dans tous les sens. Autant qu'on veut : réponse C.\nc) Je compte sans oublier ni répéter :\nA avec B, C, D : 3 segments. B avec C, D : 2 de plus. C avec D : 1 de plus.\n3 + 2 + 1 = 6 segments.\n⛔ Le piège au c) : compter 4 × 3 = 12. Le segment [AB] et le segment [BA], c'est le même : je l'ai compté deux fois.\nRéponse : a) 1 ; b) C ; c) 6.",
          schema: ecranSeulement(
            fig({
              w: 7,
              h: 6,
              traits: [
                { pts: [[1, 1], [6, 1]], couleur: BLEU },
                { pts: [[1, 1], [5, 5]], couleur: BLEU },
                { pts: [[1, 1], [2, 4.5]], couleur: BLEU },
                { pts: [[6, 1], [5, 5]], couleur: ORANGE },
                { pts: [[6, 1], [2, 4.5]], couleur: ORANGE },
                { pts: [[5, 5], [2, 4.5]], couleur: VERT },
              ],
              points: [
                { en: [1, 1], nom: "A", vers: "bg" },
                { en: [6, 1], nom: "B", vers: "bd" },
                { en: [5, 5], nom: "C", vers: "hd" },
                { en: [2, 4.5], nom: "D", vers: "hg" },
              ],
            }),
          ),
          micros: ["droite_reconnaitre", "droite_defi"],
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "C" },
            { question: "c)", attendu: "6" },
          ],
        },
        {
          enonce:
            "On mesure l'écart entre les droites, en carreaux, le long des pointillés.\na) Entre (d1) et (d2), à gauche ?\nb) Entre (d1) et (d2), à droite ?\nc) Entre (d2) et (d3), à gauche ?\nd) Entre (d2) et (d3), à droite ?\ne) Quelles droites sont parallèles ? A. (d1) et (d2)   B. (d2) et (d3)   C. (d1) et (d3)",
          figure: fig({
            w: 10,
            h: 9,
            quadrillage: true,
            traits: [
              { pts: [[0, 1], [10, 1]], couleur: BLEU },
              { pts: [[0, 4], [10, 4]], couleur: ORANGE },
              { pts: [[0, 5.75], [10, 8.25]], couleur: VERT },
              { pts: [[1, 1], [1, 6]], couleur: GRIS, pointilles: true },
              { pts: [[9, 1], [9, 8]], couleur: GRIS, pointilles: true },
            ],
            textes: [
              { en: [5, 1.5], t: "(d1)", couleur: BLEU },
              { en: [5, 4.5], t: "(d2)", couleur: ORANGE },
              { en: [5, 7.7], t: "(d3)", couleur: VERT },
            ],
          }),
          correction:
            "Je compte les carreaux sur chaque pointillé.\na) À gauche, de (d1) à (d2) : 3 carreaux.\nb) À droite, de (d1) à (d2) : 3 carreaux. Même écart : (d1) et (d2) sont parallèles.\nc) À gauche, de (d2) à (d3) : 2 carreaux.\nd) À droite, de (d2) à (d3) : 4 carreaux. L'écart grandit : elles ne sont pas parallèles.\ne) Réponse A : (d1) et (d2).\n⛔ Le piège : dire « parallèles » parce que (d2) et (d3) ne se coupent pas sur le dessin. L'écart change : plus à gauche, hors du dessin, elles se coupent.\nRéponse : a) 3 ; b) 3 ; c) 2 ; d) 4 ; e) A.",
          micros: ["droite_parallele"],
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: "4" },
            { question: "e)", attendu: "A" },
          ],
        },
        {
          enonce:
            "Un cerf-volant a la forme d'un losange. Une affiche a la forme d'un rectangle. Les pointillés sont leurs diagonales.\na) Les diagonales du losange sont-elles perpendiculaires ? Réponds oui ou non.\nb) Les diagonales du rectangle sont-elles perpendiculaires ?",
          figure: fig({
            w: 13,
            h: 8,
            quadrillage: true,
            traits: [
              { pts: [[3, 7], [5, 4], [3, 1], [1, 4]], ferme: true, fond: ROUGE, couleur: ROUGE },
              { pts: [[3, 1], [3, 7]], couleur: ENCRE, pointilles: true },
              { pts: [[1, 4], [5, 4]], couleur: ENCRE, pointilles: true },
              { pts: [[7, 2], [12, 2], [12, 6], [7, 6]], ferme: true, fond: BLEU },
              { pts: [[7, 2], [12, 6]], couleur: ENCRE, pointilles: true },
              { pts: [[7, 6], [12, 2]], couleur: ENCRE, pointilles: true },
            ],
          }),
          correction:
            "Je pose l'équerre au croisement des diagonales.\na) Dans le losange, une diagonale suit une ligne verticale du quadrillage, l'autre une ligne horizontale.\nElles se coupent en angle droit : oui, perpendiculaires.\nb) Dans le rectangle, les diagonales se croisent en biais : un angle est plus fermé que l'équerre.\nNon, elles ne sont pas perpendiculaires.\n⛔ Le piège : croire que les diagonales se coupent toujours en angle droit. C'est vrai pour le losange, pas pour ce rectangle.\nRéponse : a) oui ; b) non.",
          micros: ["droite_perpendiculaire"],
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
          ],
        },
        {
          enonce:
            "Pour tracer une parallèle à la droite (d), à 2 cm de (d), que fait-on ?\nA. Je place deux points à 2 cm de (d), mesurés à l'équerre, puis je les relie.\nB. Je mesure 2 cm en biais, en un seul point, puis je trace.\nC. Je trace une droite qui coupe (d).\na) Choisis la bonne méthode : A, B ou C.\nb) Combien de points, au moins, faut-il placer avant de tracer ?",
          correction:
            "Une parallèle doit garder le même écart PARTOUT.\nUn seul point ne suffit pas : la droite pourrait pencher.\nJe place donc deux points, chacun à 2 cm de (d), mesurés tout droit avec l'équerre. Puis je les relie à la règle.\na) Réponse A.\nB est faux : l'écart en biais est trop petit, et un seul point ne fixe pas la direction.\nC est faux : une parallèle ne coupe jamais (d).\nb) Il faut 2 points au moins.\n⛔ Le piège : mesurer l'écart en biais. On le mesure toujours à angle droit, avec l'équerre.\nRéponse : a) A ; b) 2.",
          schema: ecranSeulement(
            fig({
              w: 10,
              h: 4,
              quadrillage: true,
              traits: [
                { pts: [[0, 1], [10, 1]], couleur: ENCRE },
                { pts: [[0, 3], [10, 3]], couleur: ORANGE },
                { pts: [[2, 1], [2, 3]], couleur: GRIS, pointilles: true },
                { pts: [[8, 1], [8, 3]], couleur: GRIS, pointilles: true },
              ],
              arcs: [
                { en: [2, 1], de: [10, 1], vers: [2, 3], droit: true },
                { en: [8, 1], de: [10, 1], vers: [8, 3], droit: true },
              ],
              points: [{ en: [2, 3], couleur: ORANGE }, { en: [8, 3], couleur: ORANGE }],
              textes: [
                { en: [9.3, 1.5], t: "(d)" },
                { en: [5, 2], t: "2 cm", couleur: GRIS },
              ],
            }),
          ),
          micros: ["droite_tracer", "droite_parallele"],
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "2" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je relis les propriétés, je dessine si besoin, puis je réponds.",
      rappel: [
        "Deux droites perpendiculaires à une même droite sont parallèles.",
        "Si une droite est perpendiculaire à une droite, elle est aussi perpendiculaire à ses parallèles.",
        "Entre 6 lignes, il y a 5 écarts : je compte les espaces, pas les lignes.",
      ],
      exercices: [
        {
          titre: "Le plan du quartier",
          enonce:
            "Sur le plan d'une urbaniste : l'avenue A est perpendiculaire à la rue 1. La rue 2 est parallèle à la rue 1.\na) L'avenue A est-elle perpendiculaire à la rue 2 ? Réponds oui ou non.\nb) Au croisement de l'avenue A et de la rue 2, combien y a-t-il d'angles droits ?\nc) Combien de croisements y a-t-il entre ces trois voies ?",
          figure: fig({
            w: 10,
            h: 6,
            quadrillage: true,
            traits: [
              { pts: [[0, 1], [10, 1]], couleur: BLEU },
              { pts: [[0, 4], [10, 4]], couleur: ORANGE },
              { pts: [[5, 0], [5, 6]], couleur: VERT },
            ],
            arcs: [{ en: [5, 1], de: [10, 1], vers: [5, 6], droit: true }],
            textes: [
              { en: [1.4, 1.5], t: "rue 1", couleur: BLEU },
              { en: [1.4, 4.5], t: "rue 2", couleur: ORANGE },
              { en: [6.6, 5.5], t: "avenue A", couleur: VERT },
            ],
          }),
          correction:
            "a) La rue 2 est parallèle à la rue 1 : même direction. L'avenue A coupe la rue 1 en angle droit.\nElle coupe donc aussi la rue 2 en angle droit : oui, perpendiculaires.\nb) Deux droites perpendiculaires font 4 angles droits autour du croisement.\nc) L'avenue A croise la rue 1, puis la rue 2. Les rues 1 et 2, parallèles, ne se croisent pas. 2 croisements.\n⛔ Le piège au c) : compter un croisement entre la rue 1 et la rue 2. Deux parallèles ne se croisent jamais.\nRéponse : a) oui ; b) 4 ; c) 2.",
          micros: ["droite_perpendiculaire", "droite_defi"],
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "2" },
          ],
        },
        {
          titre: "Les lignes du cahier",
          enonce:
            "Les lignes du cahier de Lou sont parallèles. L'écart entre deux lignes voisines est de 8 mm.\na) De la ligne 1 à la ligne 6, combien y a-t-il d'écarts ?\nb) Quelle distance sépare la ligne 1 de la ligne 6, en mm ?\nc) Et en cm ?",
          figure: fig({
            w: 8,
            h: 7,
            traits: [1, 2, 3, 4, 5, 6].map((y) => ({ pts: [[1.2, y], [8, y]] as P2[], couleur: BLEU, fin: true })),
            textes: [1, 2, 3, 4, 5, 6].map((y) => ({ en: [0.6, y] as P2, t: String(y), couleur: BLEU })),
          }),
          correction:
            "Je compte les ESPACES entre les lignes, pas les lignes.\na) De 1 à 2, de 2 à 3, de 3 à 4, de 4 à 5, de 5 à 6 : 5 écarts.\nb) 5 écarts de 8 mm : 5 × 8 = 40 mm.\nc) 10 mm = 1 cm. 40 mm, c'est 4 dizaines de mm : 4 cm.\n⛔ Le piège : compter 6 écarts, et trouver 6 × 8 = 48 mm. Entre 6 lignes, il n'y a que 5 espaces.\nRéponse : a) 5 ; b) 40 mm ; c) 4 cm.",
          micros: ["droite_parallele", "droite_defi"],
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "40" },
            { question: "c)", attendu: "4" },
          ],
        },
        {
          titre: "L'échelle des pompiers",
          enonce:
            "Les deux montants d'une échelle de pompier sont parallèles. Chaque barreau est perpendiculaire aux montants.\na) Deux barreaux sont-ils parallèles entre eux ? Réponds oui ou non.\nb) L'échelle monte jusqu'à 3 m. Il y a un barreau tous les 30 cm : le premier à 30 cm du sol, le dernier tout en haut. Combien de barreaux ?",
          figure: fig({
            w: 6,
            h: 11,
            traits: [
              { pts: [[2, 0], [2, 10.5]], couleur: ROUGE },
              { pts: [[4, 0], [4, 10.5]], couleur: ROUGE },
              ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((y) => ({ pts: [[2, y], [4, y]] as P2[], couleur: GRIS })),
            ],
          }),
          correction:
            "a) Chaque barreau fait un angle droit avec le même montant.\nDeux droites perpendiculaires à une même droite sont parallèles : oui, les barreaux sont parallèles.\nb) 3 m = 300 cm. Un barreau tous les 30 cm : 300 ÷ 30 = 10.\nLes barreaux sont à 30, 60, 90, 120, 150, 180, 210, 240, 270 et 300 cm : 10 barreaux.\n⛔ Le piège : ajouter un barreau au sol, et trouver 11. Le premier barreau est à 30 cm, pas à 0.\nRéponse : a) oui ; b) 10.",
          micros: ["droite_defi", "droite_perpendiculaire"],
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "10" },
          ],
        },
        {
          titre: "Les cinq droites",
          enonce:
            "Voici cinq droites : a, b, c, d et e.\na) Combien de droites sont parallèles à la droite a ?\nb) Quelle droite est perpendiculaire à la droite d ? Écris sa lettre.\nc) Combien de droites sont perpendiculaires à la droite c ?",
          figure: fig({
            w: 10,
            h: 6,
            quadrillage: true,
            traits: [
              { pts: [[0, 1], [10, 1]], couleur: BLEU },
              { pts: [[0, 4], [10, 4]], couleur: ORANGE },
              { pts: [[2, 0], [2, 6]], couleur: VERT },
              { pts: [[4, 0], [10, 6]], couleur: VIOLET },
              { pts: [[4, 6], [10, 0]], couleur: ROUGE },
            ],
            textes: [
              { en: [0.6, 1], t: "a", couleur: BLEU },
              { en: [0.6, 4], t: "b", couleur: ORANGE },
              { en: [2, 5.4], t: "c", couleur: VERT },
              { en: [9.4, 5.4], t: "d", couleur: VIOLET },
              { en: [4.6, 5.4], t: "e", couleur: ROUGE },
            ],
          }),
          correction:
            "a) a et b suivent des lignes horizontales du quadrillage : même écart partout. Seule b est parallèle à a : 1 droite.\nb) d avance de 1 carreau et monte de 1. e avance de 1 et descend de 1.\nElles se coupent en angle droit, comme les diagonales d'un carré : e est perpendiculaire à d.\nc) c est verticale. Elle coupe a et b en angle droit : 2 droites.\nd et e coupent c en biais : elles ne comptent pas.\n⛔ Le piège au c) : ne voir que a. b est parallèle à a, donc elle aussi est perpendiculaire à c.\nRéponse : a) 1 ; b) e ; c) 2.",
          micros: ["droite_parallele", "droite_perpendiculaire", "droite_defi"],
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "e", exact: true },
            { question: "c)", attendu: "2" },
          ],
        },
        {
          titre: "Le trésor du pirate",
          enonce:
            "Le trésor est sur la droite (d). Il est aussi sur la perpendiculaire à (d) qui passe par le palmier P.\na) Où est le trésor : en A, en B ou en C ?\nb) À combien de carreaux du palmier est-il ?",
          figure: fig({
            w: 10,
            h: 6,
            quadrillage: true,
            traits: [{ pts: [[0, 1], [10, 1]], couleur: ENCRE }],
            points: [
              { en: [5, 5], nom: "P", couleur: VERT },
              { en: [2, 1], nom: "A", vers: "bas" },
              { en: [7, 1], nom: "B", vers: "bas" },
              { en: [5, 1], nom: "C", vers: "bas" },
            ],
            textes: [{ en: [9.3, 1.5], t: "(d)" }],
          }),
          correction:
            "La perpendiculaire à (d) qui passe par P coupe (d) en angle droit.\n(d) est horizontale : sa perpendiculaire est verticale. Depuis P, je descends tout droit.\nJ'arrive sur (d) au point C.\na) Le trésor est en C.\nb) De P à C, je compte 4 carreaux.\n⛔ Le piège : choisir B, qui « semble » proche. Le trésor est au pied de la perpendiculaire, tout droit sous P.\nRéponse : a) C ; b) 4.",
          schema: ecranSeulement(
            fig({
              w: 10,
              h: 6,
              quadrillage: true,
              traits: [
                { pts: [[0, 1], [10, 1]], couleur: ENCRE },
                { pts: [[5, 0], [5, 6]], couleur: ORANGE },
              ],
              arcs: [{ en: [5, 1], de: [10, 1], vers: [5, 6], droit: true }],
              points: [
                { en: [5, 5], nom: "P", couleur: VERT },
                { en: [5, 1], nom: "C", couleur: ORANGE, vers: "bg" },
              ],
              textes: [{ en: [9.3, 1.5], t: "(d)" }],
            }),
          ),
          micros: ["droite_tracer", "droite_defi"],
          reponses: [
            { question: "a)", attendu: "C", exact: true },
            { question: "b)", attendu: "4" },
          ],
        },
      ],
    },
  ],
};
