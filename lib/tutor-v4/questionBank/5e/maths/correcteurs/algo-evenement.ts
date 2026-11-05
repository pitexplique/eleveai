import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE algo-evenement.bank.ts (05/11/2026). Ils INTERPRÈTENT les blocs
// de la figure (chapeaux et blocs dessous) sur la suite d'actions relue dans le texte,
// sans passer par les variables du gabarit. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const K = "espace|flèche droite|flèche gauche|flèche haut|flèche bas|a|b";

/** Le chapeau d'un script → "drapeau", "clic" ou le nom de la touche. */
function evDeBloc(b: any): string {
  if (b.type !== "event") return "?";
  if (!b.text) return "drapeau";
  if (/lutin est cliqué/.test(b.text)) return "clic";
  return b.text.match(/touche (.+) est pressée/)?.[1] ?? "?";
}
function scripts(q: Q) {
  const f = q.canvas as any;
  if (f?.kind !== "scratch") return [];
  return (f.blocks as any[]).map((b) => ({ ev: evDeBloc(b), blocs: (b.children ?? []) as any[] }));
}
/** Ce que dit un événement écrit en toutes lettres (« la touche a », « le drapeau vert », « le lutin »). */
function evDeTexte(t: string): string | null {
  const m = t.match(new RegExp(`touche (${K})(?![\\p{L}])`, "u"));
  if (m) return m[1];
  if (/drapeau/.test(t)) return "drapeau";
  if (/lutin/.test(t) && /clic|clique/.test(t)) return "clic";
  return null;
}
const phrase = (b: any) =>
  b.type === "move" ? `Il avance de ${b.value} pas.` : b.type === "turn" ? `Il tourne de ${b.value}°.` : b.type === "say" ? `Il dit ${b.text}.` : "?";

/** La suite d'actions du texte. */
function suite(t: string): string[] {
  const liste = t.match(new RegExp(`Actions : ((?:drapeau|${K})(?:, (?:drapeau|${K}))*)\\.`, "u"));
  if (liste) return liste[1].split(", ");
  const r: string[] = [];
  if (/clique sur le drapeau/.test(t)) r.push("drapeau");
  const f = t.match(new RegExp(`(\\d+) fois sur (${K})(?![\\p{L}])`, "u"));
  if (f) for (let i = 0; i < Number(f[1]); i++) r.push(f[2]);
  return r;
}
/** Exécute les scripts sur la suite d'actions. */
function executer(q: Q, s: string[]) {
  const env: Record<string, number> = {};
  const dits: string[] = [];
  const p: string[] = [];
  for (const e of s) {
    for (const sc of scripts(q)) {
      if (sc.ev !== e) continue;
      for (const b of sc.blocs) {
        if (b.type === "set_variable") env[b.variable] = Number(b.value);
        else if (b.type === "change_variable") {
          if (!(b.variable in env)) p.push(`${b.variable} sans valeur de départ`);
          env[b.variable] = (env[b.variable] ?? 0) + Number(b.value);
        } else if (b.type === "say") dits.push(String(b.text).replace(/[«»]/g, "").trim());
      }
    }
  }
  return { env, dits, p };
}
const rep = (q: Q, juste: number): string[] => (q.expected.length === 1 && Number(q.expected[0]) === juste ? [] : [`attendu ${q.expected.join(" | ")}, juste ${juste}`]);
/** La variable de la figure : une seule. */
function variable(q: Q): string | null {
  const vs = new Set(scripts(q).flatMap((s) => s.blocs.map((b) => b.variable)).filter(Boolean));
  return vs.size === 1 ? ([...vs][0] as string) : null;
}
const nomEv = (e: string) => (e === "drapeau" ? "le drapeau vert" : e === "clic" ? "un clic sur le lutin" : `la touche ${e}`);
const blocEv = (e: string) => (e === "drapeau" ? "quand drapeau vert cliqué" : e === "clic" ? "quand ce lutin est cliqué" : `quand la touche ${e} est pressée`);

function quelEvenement(q: Q): string[] {
  const s = scripts(q);
  if (s.length !== 1) return ["un script attendu"];
  return qcmUnique(q, (c) => c === nomEv(s[0].ev));
}
/** Le geste : la première phrase du texte. */
const gesteTexte = (t: string) => {
  const g = t.split(".")[0];
  if (/drapeau/.test(g)) return "drapeau";
  if (/le lutin/.test(g)) return "clic";
  return evDeTexte(g);
};
function demarre(q: Q): string[] {
  const g = gesteTexte(q.text);
  const s = scripts(q);
  if (!g || s.length !== 1) return ["geste ou script illisibles"];
  const oui = s[0].ev === g;
  return q.expected[0] === (oui ? "oui" : "non") ? [] : [`attendu ${q.expected[0]}`];
}
function quelBloc(q: Q): string[] {
  const e = evDeTexte(q.text.replace(/un clic sur le lutin/, "clic lutin"));
  if (!e) return ["événement illisible"];
  return qcmUnique(q, (c) => c === `« ${blocEv(e)} »`);
}
function reaction(q: Q): string[] {
  const g = gesteTexte(q.text);
  if (!g) return ["geste illisible"];
  const qui = scripts(q).filter((s) => s.ev === g);
  const juste = qui.length === 0 ? "Il ne fait rien." : qui.flatMap((s) => s.blocs.map(phrase)).join(" ");
  return qcmUnique(q, (c) => c === juste);
}
function valeurFinale(q: Q): string[] {
  const v = variable(q);
  if (!v) return ["une seule variable attendue"];
  if (!new RegExp(`\\b${v}\\b|${v} `, "u").test(q.text)) return [`la question ne nomme pas ${v}`];
  const s = suite(q.text);
  if (s[0] !== "drapeau" || s.length < 2) return ["suite illisible"];
  const { env, p } = executer(q, s);
  return [...p, ...rep(q, env[v])];
}
function retrouverEv(q: Q): string[] {
  const m = q.text.match(/[Ll]e lutin (avance de \d+ pas|tourne de \d+°|dit « [^»]+ »)/);
  if (!m) return ["action illisible"];
  const voulue = `Il ${m[1]}.`;
  const qui = scripts(q).filter((s) => s.blocs.some((b) => phrase(b) === voulue));
  if (qui.length !== 1) return [`${qui.length} scripts font cette action`];
  return qcmUnique(q, (c) => c === nomEv(qui[0].ev));
}
function sons(q: Q): string[] {
  const s = suite(q.text);
  if (s.length < 3) return ["suite illisible"];
  const juste = executer(q, s).dits.join(", ");
  return qcmUnique(q, (c) => c === juste);
}
function etat(q: Q): string[] {
  const o = q.text.match(/vaut 1 : ([\p{L}]+) ; 0 : ([\p{L}]+)\./u);
  const v = variable(q);
  if (!o || !v) return ["états illisibles"];
  const r = executer(q, suite(q.text)).env[v];
  if (r !== 0 && r !== 1) return ["état indéterminé"];
  return qcmUnique(q, (c) => c === (r === 1 ? o[1] : o[2]));
}
function corriger(q: Q): string[] {
  const m = q.text.match(/avec (.+?)\. Voici/);
  const s = scripts(q);
  if (!m || s.length !== 1) return ["événement voulu illisible"];
  const v = m[1].startsWith("un clic") ? "clic" : evDeTexte(m[1]);
  if (!v) return ["événement voulu illisible"];
  const juste = s[0].ev === v ? "Rien : le script est correct." : `Remplacer le premier bloc par « ${blocEv(v)} ».`;
  return qcmUnique(q, (c) => c === juste);
}
function nombreAppuis(q: Q): string[] {
  const T = q.text.match(/vaille (\d+)/);
  const k = q.text.match(new RegExp(`sur (${K}) `, "u"));
  const v = variable(q);
  if (!T || !k || !v) return ["cible illisible"];
  const un = executer(q, ["drapeau", k[1]]).env[v];
  const zero = executer(q, ["drapeau"]).env[v];
  const n = (Number(T[1]) - zero) / (un - zero);
  if (!Number.isInteger(n) || n < 1) return [`${n} appuis`];
  return rep(q, n);
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  algo_evenement_tpl_1: quelEvenement,
  algo_evenement_tpl_2: demarre,
  algo_evenement_tpl_3: quelBloc,
  algo_evenement_tpl_4: reaction,
  algo_evenement_tpl_5: reaction,
  algo_evenement_tpl_6: valeurFinale,
  algo_evenement_tpl_7: valeurFinale,
  algo_evenement_tpl_8: retrouverEv,
  algo_evenement_tpl_9: valeurFinale,
  algo_evenement_tpl_10: valeurFinale,
  algo_evenement_tpl_11: sons,
  algo_evenement_tpl_12: etat,
  algo_evenement_tpl_13: valeurFinale,
  algo_evenement_tpl_14: corriger,
  algo_evenement_tpl_15: valeurFinale,
  algo_evenement_tpl_16: nombreAppuis,
});
