import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { airesDe, degresDe, longueursDe, reponseDegres, reponseLongueur, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";

// LES CORRECTEURS DE polygones-reguliers.bank.ts (05/11/2026) : ils relisent le nombre
// de côtés, les longueurs et les angles dans le TEXTE, et refont le calcul.
// ⚠️ Ils vérifient aussi que l'apothème donné est VRAI pour ce côté. Vide = juste.

type Q = TutorGeneratedQuestionV4;

const NOMS: [RegExp, number][] = [[/triangle équilatéral/i, 3], [/carré/i, 4], [/pentagone/i, 5], [/hexagone/i, 6], [/octogone/i, 8], [/ennéagone/i, 9], [/décagone/i, 10], [/dodécagone/i, 12]];
const NOM_DE: Record<number, string> = { 5: "pentagone régulier", 6: "hexagone régulier", 8: "octogone régulier", 9: "ennéagone régulier", 10: "décagone régulier", 12: "dodécagone régulier" };

function coteDe(t: string): number | null {
  const m = t.match(/(\d+) côtés/);
  if (m) return Number(m[1]);
  // ⚠️ « dodécagone » contient « décagone » ? Non, mais on teste d'abord le plus précis.
  for (const [re, n] of [...NOMS].reverse()) if (re.test(t)) return n;
  return null;
}

const avecN = (f: (n: number, l: number[], u: string, q: Q) => string[]) => (q: Q) => {
  const n = coteDe(q.text);
  const l = longueursDe(q.text);
  return n ? f(n, l.map((m) => m.v), l[0]?.u ?? "", q) : ["nombre de côtés illisible"];
};

/** L'apothème donné doit être le vrai, au dixième près. */
function apothemeVrai(n: number, c: number, a: number): string[] {
  const vrai = c / (2 * Math.tan(Math.PI / n));
  return Math.abs(vrai - a) <= 0.0501 ? [] : [`apothème ${a} faux pour n = ${n}, c = ${c} : ${vrai.toFixed(2)}`];
}

function regulierSurFigure(q: Q) {
  const c = q.canvas as any;
  const ids: string[] = c?.polygones?.[0]?.sommets ?? [];
  const P = (id: string) => c.points.find((p: any) => p.id === id);
  const cotes = ids.map((id, i) => {
    const a = P(id);
    const b = P(ids[(i + 1) % ids.length]);
    return Math.hypot(a.x - b.x, a.y - b.y);
  });
  const regulier = Math.max(...cotes) - Math.min(...cotes) < 1e-9;
  return reponseQcm(q, regulier ? "Oui : ses côtés et ses angles sont égaux" : "Non : ses côtés n’ont pas tous la même longueur");
}

function nombreSeul(q: Q, juste: number) {
  return Number(q.expected[0]) === juste ? [] : [`attendu ${q.expected[0]}, juste ${juste}`];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  polygone_regulier_reconnaitre_tpl_1: avecN((n, _l, _u, q) => reponseQcm(q, NOM_DE[n])),
  polygone_regulier_reconnaitre_tpl_2: avecN((_n, l, u, q) => reponseLongueur(q, l[0], u)),
  polygone_regulier_reconnaitre_tpl_3: avecN((n, l, u, q) => reponseLongueur(q, n * l[0], u)),
  polygone_regulier_reconnaitre_tpl_4: regulierSurFigure,
  polygone_regulier_reconnaitre_tpl_5: avecN((n, l, u, q) => reponseLongueur(q, l[0] / n, u)),
  polygone_regulier_reconnaitre_tpl_6: avecN((n, l, u, q) => reponseLongueur(q, n * l[0], u)),
  polygone_regulier_reconnaitre_tpl_7: avecN((n, _l, _u, q) => nombreSeul(q, n)),
  polygone_regulier_reconnaitre_tpl_8: (q) => {
    const [r] = longueursDe(q.text);
    return r ? reponseLongueur(q, 6 * r.v, r.u) : ["rayon illisible"];
  },

  polygone_regulier_angles_tpl_1: avecN((n, _l, _u, q) => reponseDegres(q, 360 / n)),
  polygone_regulier_angles_tpl_2: (q) => {
    const [c] = degresDe(q.text);
    return c ? reponseDegres(q, 180 - c) : ["angle illisible"];
  },
  polygone_regulier_angles_tpl_3: avecN((n, _l, _u, q) => reponseDegres(q, 180 - 360 / n)),
  polygone_regulier_angles_tpl_4: avecN((n, _l, _u, q) => reponseQcm(q, `360 ÷ ${n}`)),
  polygone_regulier_angles_tpl_5: (q) => {
    const [c] = degresDe(q.text);
    return c ? nombreSeul(q, 360 / c) : ["angle illisible"];
  },
  polygone_regulier_angles_tpl_6: (q) => {
    const [i] = degresDe(q.text);
    return i ? nombreSeul(q, 360 / i) : ["angle illisible"];
  },
  polygone_regulier_angles_tpl_7: (q) => {
    const [i] = degresDe(q.text);
    return i ? nombreSeul(q, 360 / (180 - i)) : ["angle illisible"];
  },
  polygone_regulier_angles_tpl_8: avecN((n, _l, _u, q) => reponseDegres(q, (180 - 360 / n) / 2)),

  polygone_regulier_aire_tpl_1: avecN((n, [c, a], u, q) => [...apothemeVrai(n, c, a), ...reponseLongueur(q, (c * a) / 2, `${u}²`)]),
  polygone_regulier_aire_tpl_2: (q) => reponseQcm(q, "Le segment du centre au milieu d’un côté"),
  polygone_regulier_aire_tpl_3: avecN((n, [c, a], u, q) => [...apothemeVrai(n, c, a), ...reponseLongueur(q, (n * c * a) / 2, `${u}²`)]),
  polygone_regulier_aire_tpl_4: (q) => {
    const [p, a] = longueursDe(q.text);
    return p && a ? reponseQcm(q, `${p.v} × ${String(a.v).replace(".", ",")} ÷ 2`) : ["mesures illisibles"];
  },
  polygone_regulier_aire_tpl_5: avecN((n, [c, a], u, q) => [...apothemeVrai(n, c, a), ...reponseLongueur(q, (n * c * a) / 2, `${u}²`)]),
  polygone_regulier_aire_tpl_6: (q) => {
    const [c] = longueursDe(q.text);
    return c ? reponseLongueur(q, c.v * c.v, `${c.u}²`) : ["côté illisible"];
  },
  polygone_regulier_aire_tpl_7: (q) => {
    const [A] = airesDe(q.text);
    const [p] = longueursDe(q.text);
    return A && p ? reponseLongueur(q, (2 * A.v) / p.v, p.u) : ["mesures illisibles"];
  },
  polygone_regulier_aire_tpl_8: (q) => {
    const k = Number(q.text.match(/(?:de |coloriée? |colorie |mesurent )(\d) (?:des|de ces) /)?.[1]);
    const [c, a] = longueursDe(q.text);
    if (!k || !c || !a) return ["mesures illisibles"];
    return [...apothemeVrai(6, c.v, a.v), ...reponseLongueur(q, (k * c.v * a.v) / 2, `${c.u}²`)];
  },
});
