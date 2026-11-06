import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";

// LES CORRECTEURS DE stat-mode.bank.ts (06/11/2026). Ils dépouillent ce que voit l'élève (liste
// du texte, tableau, diagramme), recomptent et rendent la liste des problèmes. Vide = juste.

type Q = TutorGeneratedQuestionV4;
type Serie = { v: (string | number)[]; e: number[] };

/** La série écrite en vrac dans un paragraphe : « 3 ; 5 ; 3 ». */
const compter = (l: number[]): Serie => {
  const v = [...new Set(l)].sort((a, b) => a - b);
  return { v, e: v.map((x) => l.filter((y) => y === x).length) };
};
const liste = (s: string) => s.split(" ; ").map(Number);
const vrac = (q: Q): Serie => {
  const ligne = q.text.split("\n").find((x) => /^\d+( ; \d+)+$/.test(x.trim()));
  return ligne ? compter(liste(ligne.trim())) : { v: [], e: [] };
};
const figure = (q: Q): Serie => {
  const c = q.canvas as any;
  if (c?.kind === "tableau_donnees") {
    const lu = (x: string | number) => (/^\d+$/.test(String(x)) ? Number(x) : x);
    // En hauteur : une ligne par valeur. En largeur : un en-tête par effectif, sinon les colonnes sont décalées.
    if (!c.rows[0].label) return { v: c.rows.map((r: any) => lu(r.values[0])), e: c.rows.map((r: any) => Number(r.values[1])) };
    if (c.headers.length !== c.rows[0].values.length) throw new Error("tableau décalé d'une colonne");
    return { v: c.headers.map(lu), e: c.rows[0].values.map(Number) };
  }
  if (c?.kind === "stat_graph") return { v: c.data.map((d: any) => (/^\d+$/.test(d.label) ? Number(d.label) : d.label)), e: c.data.map((d: any) => d.value) };
  return { v: [], e: [] };
};
const modes = ({ v, e }: Serie) => v.filter((_, i) => e[i] === Math.max(...e));

const nombre = (q: Q, x: number) => (Number(q.expected[0]) === x ? [] : [`attendu ${q.expected[0]}, juste ${x}`]);
const sansSurlignage = (q: Q) => {
  const c = q.canvas as any;
  return c?.display?.highlightIndex != null || c?.highlight ? ["la figure surligne la réponse"] : [];
};
const modeUnique = (s: Serie) => {
  const m = modes(s);
  return m.length === 1 ? null : `${m.length} mode(s) : ${m.join(", ")}`;
};
const modeNumerique = (lire: (q: Q) => Serie) => (q: Q) => {
  const s = lire(q);
  const pb = modeUnique(s);
  return pb ? [pb] : [...sansSurlignage(q), ...nombre(q, modes(s)[0] as number)];
};
const modeEnMot = (q: Q) => {
  const s = figure(q);
  const pb = modeUnique(s);
  return pb ? [pb] : [...sansSurlignage(q), ...reponseQcm(q, String(modes(s)[0]))];
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  stat_mode_tpl_1: modeNumerique(vrac),
  stat_mode_tpl_2: modeNumerique(figure),
  stat_mode_tpl_3: modeNumerique(figure),
  stat_mode_tpl_4: modeEnMot,
  stat_mode_tpl_5: (q) => {
    const m = modes(vrac(q)) as number[];
    return m.length === 2 ? reponseQcm(q, `${Math.min(...m)} et ${Math.max(...m)}`) : [`${m.length} mode(s) au lieu de 2`];
  },
  stat_mode_tpl_6: (q) => {
    const s = figure(q);
    const pb = modeUnique(s);
    if (pb) return [pb];
    const j = modes(s)[0] as number;
    const p = reponseQcm(q, String(j));
    if (j === Math.max(...(s.v as number[]))) p.push("le mode est la plus grande valeur : plus de piège");
    return p;
  },
  stat_mode_tpl_7: (q) => nombre(q, Math.max(...vrac(q).e)),
  stat_mode_tpl_8: (q) => {
    const s = vrac(q);
    const x = Number(q.text.match(/(?:ajouter|des|de|que|soit le seul mode|devienne le seul mode)[^\d]*(\d+)/)?.[1]);
    const i = s.v.indexOf(x);
    if (i < 0) return [`valeur ${x} absente de la série`];
    if (s.e[i] === Math.max(...s.e)) return [`${x} est déjà un mode`];
    return nombre(q, Math.max(...s.e) - s.e[i] + 1);
  },
  stat_mode_tpl_9: modeNumerique(figure),
  stat_mode_tpl_10: modeEnMot,
  stat_mode_tpl_11: (q) => {
    const s = figure(q);
    const pb = modeUnique(s);
    if (pb) return [pb];
    const N = s.e.reduce((a, b) => a + b, 0);
    const moy = (s.v as number[]).reduce((t, x, i) => t + x * s.e[i], 0) / N;
    const j = modes(s)[0] as number;
    if (moy === j) return ["mode et moyenne égaux : la réponse serait hors liste"];
    return reponseQcm(q, j > moy ? "Le mode" : "La moyenne");
  },
  stat_mode_tpl_12: (q) => {
    const lire = (g: string) => {
      const m = q.text.match(new RegExp(`Groupe ${g} : ([\\d ;]+)`));
      return m ? compter(liste(m[1].trim())) : { v: [], e: [] };
    };
    const [a, b] = [lire("A"), lire("B")];
    const pb = modeUnique(a) ?? modeUnique(b);
    if (pb) return [pb];
    const [ma, mb] = [modes(a)[0] as number, modes(b)[0] as number];
    return reponseQcm(q, ma === mb ? "Les deux modes sont égaux" : ma > mb ? "Le groupe A" : "Le groupe B");
  },
});
