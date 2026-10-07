import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// Correcteurs des gabarits de durees.bank.ts (06/10/2026, voir types.ts).
// Chaque correcteur RELIT les horaires (« 17 h 40 ») et les durées (« 50 min »,
// « 1 h 05 min », « 2 heures ») écrits dans le texte, refait le calcul en
// minutes, et compare à la réponse attendue.

type Q = TutorGeneratedQuestionV4;
type Lu = { v: number; i: number };

/** Les horaires « 17 h 40 » du texte, en minutes depuis minuit (pas les durées « 1 h 05 min »). */
export function horairesDuTexte(t: string): Lu[] {
  return [...t.matchAll(/(?<![\d,])(\d{1,2}) h (\d{2})(?!\s*min)(?!\d)/g)].map((m) => ({ v: Number(m[1]) * 60 + Number(m[2]), i: m.index ?? 0 }));
}
/** Les durées du texte, en minutes : « 1 h 05 min », « 50 min », « 2 heures ». */
export function dureesDuTexte(t: string): Lu[] {
  const out: Lu[] = [];
  let s = t;
  const masque = (m: RegExpMatchArray) => (s = s.slice(0, m.index) + "#".repeat(m[0].length) + s.slice((m.index ?? 0) + m[0].length));
  for (const m of [...s.matchAll(/(?<![\d,])(\d+) h (\d{1,2}) min/g)]) {
    out.push({ v: Number(m[1]) * 60 + Number(m[2]), i: m.index ?? 0 });
    masque(m);
  }
  for (const m of [...s.matchAll(/(?<![\d,])(\d+) min(?:utes)?(?![a-zà-ÿ])/g)]) {
    out.push({ v: Number(m[1]), i: m.index ?? 0 });
    masque(m);
  }
  for (const m of [...s.matchAll(/(?<![\d,])(\d+) heures?(?![a-zà-ÿ])/g)]) out.push({ v: Number(m[1]) * 60, i: m.index ?? 0 });
  return out.sort((a, b) => a.i - b.i);
}
/** Réponse « 9 h 10 » ou « 9 h » → minutes depuis minuit. */
export function horaireAttendu(s: string): number | null {
  const m = String(s).match(/^(\d{1,2}) h(?: (\d{2}))?$/);
  return m ? Number(m[1]) * 60 + Number(m[2] ?? 0) : null;
}
/** Réponse « 1 h 05 min », « 45 min », « 2 heures » → minutes. */
export function dureeAttendue(s: string): number | null {
  let m = String(s).match(/^(\d+) h (\d{2}) min$/);
  if (m) return Number(m[1]) * 60 + Number(m[2]);
  m = String(s).match(/^(\d+) min$/);
  if (m) return Number(m[1]);
  m = String(s).match(/^(\d+) heures?$/);
  return m ? Number(m[1]) * 60 : null;
}
const ecrit = (t: number) => `${Math.floor(t / 60)} h ${String(t % 60).padStart(2, "0")}`;

/** Règles communes : pas de barre de division ni de fraction d'heure (« 3/4 h »). */
export function communes(q: Q): string[] {
  const p: string[] = [];
  for (const s of [q.text, ...(q.choices ?? []), ...(q.expected ?? []), q.explanation ?? ""])
    if (/\d\s*\/\s*\d/.test(s)) p.push(`barre de fraction : « ${s.slice(0, 60)} »`);
  // Un horaire (pas suivi de « min ») a moins de 24 h et moins de 60 min ; une durée « 1 h 75 min » non plus.
  for (const m of q.text.matchAll(/(?<![\d,])(\d{1,2}) h (\d{2})(?!\d)(\s*min)?/g))
    if (Number(m[2]) >= 60 || (!m[3] && Number(m[1]) >= 24)) p.push(`écriture impossible : ${m[0]}`);
  return p;
}
/** Le canvas « deux horloges » doit montrer les deux horaires du texte. */
function canvasCoherent(q: Q, debut: number, fin: number): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  if (c.variant === "double_horloge") {
    if (c.start.hour * 60 + c.start.minute !== debut % 1440 || c.end.hour * 60 + c.end.minute !== fin % 1440)
      return ["les horloges ne montrent pas les horaires du texte"];
  }
  if (c.variant === "digital") {
    const [h, m] = String(c.digital.text).split(":").map(Number);
    const v = h * 60 + m;
    if (v !== debut && v !== fin) return ["l'affichage digital ne montre aucun horaire du texte"];
    if (q.expected.some((e) => horaireAttendu(e) === v)) return ["l'affichage digital donne la réponse"];
  }
  return [];
}

// ----- CALCULER
function corrigerCalculer(q: Q): string[] {
  const p = communes(q);
  const hs = horairesDuTexte(q.text);
  const ds = dureesDuTexte(q.text);
  const question = q.text.split("\n").pop() ?? "";
  if (/Combien de temps|durée/.test(question)) {
    if (hs.length !== 2 || ds.length) return [...p, "durée : il faut deux horaires et aucune durée"];
    const juste = hs[1].v - hs[0].v;
    if (juste <= 0) p.push("la fin est avant le début");
    const att = dureeAttendue(q.expected[0]);
    if (att !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${juste} min`);
    return [...p, ...canvasCoherent(q, hs[0].v, hs[1].v)];
  }
  if (hs.length !== 1 || ds.length !== 1) return [...p, "il faut un horaire et une durée"];
  const recule = /commencé|début/.test(question);
  const juste = recule ? hs[0].v - ds[0].v : hs[0].v + ds[0].v;
  const att = horaireAttendu(q.expected[0]);
  if (att !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${ecrit(juste)}`);
  if (juste < 6 * 60 || juste >= 24 * 60) p.push(`horaire peu plausible : ${ecrit(juste)}`);
  return [...p, ...canvasCoherent(q, Math.min(hs[0].v, juste), Math.max(hs[0].v, juste))];
}
/** L'erreur « en base dix » : on relit l'erreur citée, on refait le bon calcul. */
function corrigerErreur(q: Q): string[] {
  const p: string[] = [];
  for (const s of [q.text, ...(q.expected ?? []), q.explanation ?? ""]) if (/\d\s*\/\s*\d/.test(s)) p.push("barre de fraction");
  const t = q.text;
  const add = t.match(/(\d{1,2}) h (\d{2}) (?:\+ |et dure )(\d+) min/);
  if (add) {
    const juste = Number(add[1]) * 60 + Number(add[2]) + Number(add[3]);
    const faux = t.match(/(\d{1,2}) h (\d{2})(?:\s*»|\.\n)/g)?.pop();
    if (!faux || Number(faux.match(/h (\d{2})/)![1]) < 60) p.push("l'erreur citée n'est pas une erreur de base dix");
    if (horaireAttendu(q.expected[0]) !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${ecrit(juste)}`);
    return p;
  }
  const hs = horairesDuTexte(t);
  if (hs.length !== 2) return [...p, "il faut deux horaires"];
  const juste = hs[1].v - hs[0].v;
  const faux = t.match(/trouve (\d+) h (\d+) min/);
  if (!faux || Number(faux[2]) < 60) p.push("l'erreur citée n'a pas plus de 60 minutes");
  else if (Number(faux[1]) * 60 + Number(faux[2]) === juste) p.push("l'« erreur » donne la bonne durée");
  if (dureeAttendue(q.expected[0]) !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${juste} min`);
  return [...p, ...canvasCoherent(q, hs[0].v, hs[1].v)];
}

// ----- CONVERTIR : toutes les unités de temps.
// Deux échelles : secondes (s, min, h, jour, semaine) et mois (mois, an).
const VALEUR: Record<string, [string, number]> = {
  s: ["t", 1], min: ["t", 60], h: ["t", 3600], jour: ["t", 86400], semaine: ["t", 604800], mois: ["m", 1], an: ["m", 12],
};
function uniteTemps(mot: string) {
  if (/^s(econdes?)?$|^secondes?$/.test(mot)) return "s";
  if (/^min(utes?)?$/.test(mot)) return "min";
  if (/^h(eures?)?$/.test(mot)) return "h";
  if (/^jours?$/.test(mot)) return "jour";
  if (/^semaines?$/.test(mot)) return "semaine";
  if (mot === "mois") return "mois";
  if (/^ans?$/.test(mot)) return "an";
  return null;
}
type Qt = { n: number; u: string; i: number };
const RE_QT = /(?<![\d,])(\d{1,3}(?:[  ]\d{3})+|\d+) ?(secondes?|s|minutes?|min|heures?|h|jours?|semaines?|mois|ans?)(?![a-zà-ÿ])/g;
export function quantites(t: string): Qt[] {
  return [...t.matchAll(RE_QT)].map((m) => ({ n: Number(m[1].replace(/\s/g, "")), u: uniteTemps(m[2])!, i: m.index ?? 0 }));
}
const total = (qs: Qt[]) => ({ echelle: new Set(qs.map((q) => VALEUR[q.u][0])), v: qs.reduce((s, q) => s + q.n * VALEUR[q.u][1], 0) });
/** Les unités nommées dans la question (« en heures, minutes et secondes »). */
function unitesDemandees(ligne: string) {
  return [...ligne.matchAll(/(?<![a-zà-ÿ])(secondes|minutes|heures|jours|semaines|mois|ans)(?![a-zà-ÿ])/g)].map((m) => uniteTemps(m[1])!);
}
/** Une écriture courte « 3 h 35 », « 7 h 19 min 14 » : le dernier nombre prend l'unité juste en dessous. */
function valeurForme(e: string) {
  const qs = quantites(e);
  const fin = e.match(/(?:^|[^\d])(\d+)$/);
  const v = total(qs).v;
  if (!fin || !qs.length) return v;
  const dessous: Record<string, number> = { h: 60, min: 1, jour: 3600, semaine: 86400, an: 1 };
  return v + Number(fin[1]) * (dessous[qs[qs.length - 1].u] ?? NaN);
}
function corrigerConvertir(q: Q): string[] {
  const p = communes(q);
  if (q.format === "qcm") {
    const durees = (q.choices ?? []).filter((c) => quantites(c).length);
    if (durees.length !== 2) return [...p, "il faut deux durées en propositions"];
    const [a, b] = durees.map((d) => total(quantites(d)).v);
    if (a === b) p.push("les deux durées sont égales");
    const juste = a > b ? durees[0] : durees[1];
    if (q.expected[0] !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${juste}`);
    for (const d of durees) if (!q.text.includes(d)) p.push(`la proposition ${d} n'est pas dans le texte`);
    return p;
  }
  const question = q.text.split("\n").pop() ?? "";
  const donnees = quantites(q.text);
  if (!donnees.length) return [...p, "aucune durée dans le texte"];
  const T = total(donnees);
  if (T.echelle.size !== 1) return [...p, "unités de deux échelles mêlées"];
  const att = quantites(q.expected[0]);
  if (!att.length) return [...p, `réponse sans unité : ${q.expected[0]}`];
  const A = total(att);
  if (A.v !== T.v) p.push(`réponse ${q.expected[0]} (${A.v}), recalculée ${T.v}`);
  for (const e of q.expected) if (valeurForme(e) !== T.v) p.push(`écriture acceptée fausse : ${e}`);
  // L'unité demandée : celle de la réponse ; et la réponse est « rangée » (15 min, pas 75 min, après les heures).
  const demandees = unitesDemandees(question.replace(RE_QT, ""));
  const unitesRep = att.map((x) => x.u);
  if (demandees.length && demandees.join() !== unitesRep.join()) p.push(`unités demandées ${demandees.join(", ")}, réponse en ${unitesRep.join(", ")}`);
  for (let k = 1; k < att.length; k++)
    if (att[k].n * VALEUR[att[k].u][1] >= VALEUR[att[k - 1].u][1]) p.push(`${att[k].n} ${att[k].u} dépasse 1 ${att[k - 1].u}`);
  if (donnees.map((x) => x.u).join() === unitesRep.join()) p.push("rien n'est converti");
  return p;
}

// ----- DÉCIMALE
/** « 1,25 h » → 75 (minutes). */
function heuresDecimales(t: string) {
  return [...t.matchAll(/(?<![\d,])(\d+),(\d+) h(?![a-zà-ÿ])/g)].map((m) => Math.round(Number(`${m[1]}.${m[2]}`) * 60 * 1e6) / 1e6);
}
function corrigerDecimale(q: Q): string[] {
  const p = communes(q);
  const dec = [...new Set(heuresDecimales(q.text))];
  const ds = dureesDuTexte(q.text);
  if (q.format === "qcm") {
    if (ds.length !== 1) return [...p, "il faut une durée en heures et minutes"];
    const justes = (q.choices ?? []).filter((c) => heuresDecimales(c)[0] === ds[0].v);
    if (justes.length !== 1) return [...p, `${justes.length} propositions égales à ${ds[0].v} min`];
    if (q.expected[0] !== justes[0]) p.push(`réponse ${q.expected[0]}, recalculée ${justes[0]}`);
    return p;
  }
  const attDec = heuresDecimales(q.expected[0]);
  if (dec.length === 1) {
    // On part d'une écriture décimale : la réponse est en minutes, ou en h et min.
    const juste = dec[0];
    if (!Number.isInteger(juste)) p.push(`${juste} min n'est pas un nombre entier de minutes`);
    const att = dureeAttendue(q.expected[0]);
    if (att !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${juste} min`);
    // Le piège cité (« 2 h 30 min ») ne doit pas être la bonne réponse.
    for (const d of ds) if (d.v === juste) p.push("la fausse lecture citée est en fait juste");
    if (/heures et minutes|d’heures et de minutes/.test(q.text) && !/ h /.test(q.expected[0])) p.push("on demande des heures et des minutes");
    return p;
  }
  if (dec.length || ds.length !== 1) return [...p, "il faut une seule durée dans le texte"];
  if (attDec.length !== 1) return [...p, `réponse non décimale : ${q.expected[0]}`];
  if (attDec[0] !== ds[0].v) p.push(`réponse ${q.expected[0]}, recalculée ${ds[0].v} min`);
  return p;
}

// ----- PROBLÈMES : la situation se reconnaît à ses mots.
function corrigerProbleme(q: Q): string[] {
  const p = communes(q);
  const t = q.text;
  const hs = horairesDuTexte(t);
  const ds = dureesDuTexte(t);
  const serie = t.match(/(\d+) (?:séances|épisodes|chansons|leçons|tours)[^\d]*?de (\d+) min/);
  const pauses = t.match(/(\d+) [a-zé]+ de (\d+) min, avec une pause de (\d+) min/);
  if (pauses) {
    if (hs.length !== 1) return [...p, "il faut l'horaire du début"];
    const [n, d, pa] = pauses.slice(1).map(Number);
    const juste = hs[0].v + n * d + (n - 1) * pa;
    if (horaireAttendu(q.expected[0]) !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${ecrit(juste)}`);
    return p;
  }
  if (serie) {
    const juste = Number(serie[1]) * Number(serie[2]);
    if (dureeAttendue(q.expected[0]) !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${juste} min`);
    if (juste > 24 * 60) p.push("durée totale peu plausible");
    return p;
  }
  if (q.format === "qcm") {
    // À temps ? L'heure de départ suit « Il est », « part à » ou « quitte la maison à ».
    if (hs.length !== 2 || ds.length !== 1) return [...p, "il faut deux horaires et une durée"];
    const iNow = t.search(/Il est |part à |quitte la maison à /);
    const now = hs.find((h) => h.i > iNow && h.i - iNow < 25);
    if (!now) return [...p, "heure de départ introuvable"];
    const rdv = hs.find((h) => h !== now)!;
    if (rdv.v <= now.v) p.push("le rendez-vous est avant le départ");
    const juste = now.v + ds[0].v <= rdv.v ? "oui" : "non";
    if (q.expected[0] !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${juste}`);
    return p;
  }
  if (hs.length !== 1 || ds.length !== 2) return [...p, "il faut un horaire et deux durées"];
  const somme = ds[0].v + ds[1].v;
  const juste = /au plus tard|heure limite/.test(t) ? hs[0].v - somme : hs[0].v + somme;
  if (horaireAttendu(q.expected[0]) !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${ecrit(juste)}`);
  if (juste < 6 * 60 || juste >= 23 * 60) p.push(`horaire peu plausible : ${ecrit(juste)}`);
  return p;
}

// ----- DÉFIS
function corrigerRepete(q: Q): string[] {
  const p = communes(q);
  const hs = horairesDuTexte(q.text);
  const fois = q.text.match(/(\d+) fois/);
  const ds = dureesDuTexte(q.text);
  if (hs.length !== 1 || !fois || !ds.length) return [...p, "horaire, nombre de fois ou durée illisible"];
  if (new Set(ds.map((d) => d.v)).size !== 1) p.push("deux durées différentes");
  const juste = hs[0].v + Number(fois[1]) * ds[0].v;
  if (horaireAttendu(q.expected[0]) !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${ecrit(juste)}`);
  return p;
}
function corrigerMinuit(q: Q): string[] {
  const p = communes(q);
  const hs = horairesDuTexte(q.text);
  const ds = dureesDuTexte(q.text);
  if (hs.length !== 1 || ds.length !== 1) return [...p, "il faut un horaire et une durée"];
  const recule = /commencé/.test(q.text);
  const brut = recule ? hs[0].v - ds[0].v : hs[0].v + ds[0].v;
  if (recule ? brut >= 0 : brut < 1440) p.push("on ne passe pas minuit");
  const juste = ((brut % 1440) + 1440) % 1440;
  if (horaireAttendu(q.expected[0]) !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${ecrit(juste)}`);
  return p;
}
const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
function corrigerJours(q: Q): string[] {
  const p = communes(q);
  const hs = horairesDuTexte(q.text);
  const ds = dureesDuTexte(q.text);
  const jour = q.text.match(/le (lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)/);
  if (hs.length !== 1 || ds.length !== 1 || !jour) return [...p, "jour, horaire ou durée illisible"];
  const fin = JOURS.indexOf(jour[1]) * 1440 + hs[0].v + ds[0].v;
  const juste = `${JOURS[Math.floor(fin / 1440) % 7]} à ${ecrit(fin % 1440).replace(/ 00$/, "")}`;
  if (q.expected[0] !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${juste}`);
  if ((q.choices ?? []).filter((c) => c === juste).length !== 1) p.push("la bonne réponse n'est pas proposée une seule fois");
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  duree_defi_tpl_1: corrigerMinuit,
  duree_defi_tpl_2: corrigerRepete,
  duree_defi_tpl_ouverte: corrigerJours,
  duree_probleme_tpl_1: corrigerProbleme,
  duree_probleme_tpl_2: corrigerProbleme,
  duree_decimale_tpl_1: corrigerDecimale,
  duree_decimale_tpl_2: corrigerDecimale,
  duree_decimale_tpl_3: corrigerDecimale,
  duree_decimale_tpl_ouverte: corrigerDecimale,
  duree_convertir_tpl_1: corrigerConvertir,
  duree_convertir_tpl_2: corrigerConvertir,
  duree_convertir_tpl_3: corrigerConvertir,
  duree_convertir_tpl_4: corrigerConvertir,
  duree_convertir_tpl_ouverte: corrigerConvertir,
  duree_calculer_tpl_1: corrigerCalculer,
  duree_calculer_tpl_2: corrigerCalculer,
  duree_calculer_tpl_3: corrigerCalculer,
  duree_calculer_tpl_4: corrigerCalculer,
  duree_calculer_tpl_ouverte: corrigerErreur,
};
