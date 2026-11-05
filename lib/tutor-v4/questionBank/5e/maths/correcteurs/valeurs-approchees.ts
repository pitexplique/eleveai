import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE valeurs-approchees.bank.ts (05/11/2026). Ils relisent le nombre,
// la précision et le sens DANS LE TEXTE et refont le calcul. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const NB = "\\d+(?:,\\d+)?";
const n = (s: string) => Number(s.replace(",", "."));
const egal = (a: number, b: number) => Math.abs(a - b) < 1e-7;
const dessous = (x: number, k: number) => Math.floor(x * 10 ** k + 1e-9) / 10 ** k;
const dessus = (x: number, k: number) => (Math.floor(x * 10 ** k + 1e-9) + 1) / 10 ** k;
const arrondi = (x: number, k: number) => Math.floor(x * 10 ** k + 0.5 + 1e-9) / 10 ** k;
const ko = (q: Q, juste: number): string[] => {
  const p: string[] = [];
  for (const e of q.expected) if (!egal(n(String(e)), juste)) p.push(`attendu « ${e} », juste ${juste}`);
  return p;
};
const texteJuste = (q: Q, juste: string) => (q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste « ${juste} »`]);

/** k, lu sur « à 0,1 près », « à 0,1 m près ». */
function kPres(t: string): number | null {
  const m = t.match(/[àÀ] (1|0,1|0,01)(?: [^ ]+)? près/);
  return m ? { "1": 0, "0,1": 1, "0,01": 2 }[m[1]]! : null;
}
/** k, lu sur « au dixième ». */
function kNom(t: string): number | null {
  if (/à l’unité/i.test(t)) return 0;
  if (/au dixième/i.test(t)) return 1;
  if (/au centième/i.test(t)) return 2;
  return null;
}
const sans = (t: string) => t.replace(/[àÀ] (1|0,1|0,01)(?: [^ ]+)? près/g, " ");
/** Le nombre visé : un quotient s'il y en a un (le développement écrit doit lui correspondre), sinon le premier nombre. */
function vise(t: string): { x: number; p: string[] } {
  const s = sans(t);
  const q = s.match(/(\d+) ÷ (\d+)/);
  if (q) {
    const x = Number(q[1]) / Number(q[2]);
    const p: string[] = [];
    const d = s.match(new RegExp(`(?:= |affiche )(${NB})`));
    if (d) {
      const dec = (d[1].split(",")[1] ?? "").length;
      if (!egal(dessous(x, dec), n(d[1]))) p.push(`l’écriture ${d[1]} n’est pas le début de ${q[1]} ÷ ${q[2]}`);
    }
    return { x, p };
  }
  const egale = s.match(new RegExp(`= (${NB})…`));
  if (egale) return { x: n(egale[1]), p: [] };
  const m = s.match(new RegExp(NB));
  return { x: m ? n(m[0]) : NaN, p: m ? [] : ["nombre illisible"] };
}
const sens = (t: string) => (/par défaut/.test(t) ? (/par excès/.test(t) ? null : "d") : /par excès/.test(t) ? "e" : null);

/* ───── defaut_exces ───── */
function valeurSens(q: Q): string[] {
  const k = kPres(q.text);
  const s = sens(q.text);
  const { x, p } = vise(q.text);
  if (k === null || !s) return [...p, "précision ou sens illisibles"];
  return [...p, ...ko(q, s === "d" ? dessous(x, k) : dessus(x, k))];
}
function valeurSensQcm(q: Q): string[] {
  const k = kPres(q.text);
  const s = sens(q.text);
  const nb = sans(q.text).match(new RegExp(NB + "(?= <)|(?<=< )" + NB, "g"));
  if (k === null || !s || !nb || nb.length < 3) return ["énoncé illisible"];
  // « d < x < e » : deux « < », donc les nombres lus sont d, x, e.
  const [d, x, e] = nb.map(n);
  const p = egal(d, dessous(x, k)) && egal(e, dessus(x, k)) ? [] : ["encadrement faux"];
  return [...p, ...qcmUnique(q, (c) => egal(n(c), s === "d" ? d : e))];
}
function reconnaitreSens(q: Q): string[] {
  const nb = q.text.match(new RegExp(NB, "g"))!.map(n);
  const [v, x] = nb;
  return texteJuste(q, v < x ? "par défaut" : "par excès");
}
function retrouverPrecision(q: Q): string[] {
  const nb = q.text.match(new RegExp(NB, "g"))!.map(n);
  const [v, x] = nb;
  const s = sens(q.text);
  if (!s) return ["sens illisible"];
  const bons = [0, 1, 2, 3].filter((k) => egal(s === "d" ? dessous(x, k) : dessus(x, k), v));
  if (bons.length !== 1) return [`${bons.length} précisions conviennent`];
  const p = { 0: "1", 1: "0,1", 2: "0,01", 3: "0,001" }[bons[0]];
  return qcmUnique(q, (c) => c === `à ${p} près`);
}
function deuxValeurs(q: Q): string[] {
  const k = kPres(q.text);
  const { x, p } = vise(q.text);
  if (k === null) return ["précision illisible"];
  return [
    ...p,
    ...qcmUnique(q, (c) => {
      const m = c.match(new RegExp(`^(${NB}) et (${NB})$`));
      return !!m && egal(n(m[1]), dessous(x, k)) && egal(n(m[2]), dessus(x, k));
    }),
  ];
}
function quantite(q: Q): string[] {
  const m = q.text.match(new RegExp(`(${NB}) (?:kg|t)\\b.*?(?:par (?:paliers de |doses de |blocs de |lots de |)|charges de |de )(${NB})(?: en \\d[\\d,]*)? (?:kg|t)\\b`));
  if (!m) return ["quantité ou pas illisibles"];
  const [x, pas] = [n(m[1]), m[2]];
  const k = { "1": 0, "0,1": 1, "0,01": 2 }[pas];
  if (k === undefined) return [`pas ${pas} inconnu`];
  const maxi = /maximal/.test(q.text);
  const mini = /minimal/.test(q.text);
  if (maxi === mini) return ["ni maximal ni minimal"];
  return ko(q, maxi ? dessous(x, k) : dessus(x, k));
}
function partageSens(q: Q): string[] {
  const k = kPres(q.text);
  const s = sens(q.text);
  const nb = sans(q.text).match(new RegExp(`(?<![\\d,])${NB}`, "g"));
  if (k === null || !s || !nb || nb.length < 2) return ["énoncé illisible"];
  const x = n(nb[0]) / n(nb[1]);
  return ko(q, s === "d" ? dessous(x, k) : dessus(x, k));
}
function autreValeur(q: Q): string[] {
  const k = kPres(q.text);
  const v = sans(q.text).match(new RegExp(NB));
  const i = q.text.indexOf("par défaut");
  const j = q.text.indexOf("par excès");
  if (k === null || !v || i < 0 || j < 0) return ["énoncé illisible"];
  return ko(q, n(v[0]) + (i < j ? 1 : -1) * 10 ** -k);
}
function lequel(q: Q): string[] {
  const k = kPres(q.text);
  const d = q.text.match(new RegExp(`(${NB}) par défaut`));
  const e = q.text.match(new RegExp(`(${NB}) par excès`));
  if (k === null || !d || !e) return ["énoncé illisible"];
  const [a, b] = [n(d[1]), n(e[1])];
  const p = egal(b - a, 10 ** -k) ? [] : ["les deux valeurs ne se suivent pas"];
  return [...p, ...qcmUnique(q, (c) => n(c) > a && n(c) < b)];
}
function surplus(q: Q): string[] {
  const m = q.text.match(new RegExp(`(${NB}) €.*?(\\d+) personnes`));
  if (!m) return ["total ou effectif illisibles"];
  const c = Math.round(n(m[1]) * 100);
  const N = Number(m[2]);
  if (c % N === 0) return ["partage juste, pas de surplus"];
  return ko(q, (Math.ceil(c / N) * N - c) / 100);
}
function memeValeur(q: Q): string[] {
  const k = kPres(q.text);
  const m = [...q.text.matchAll(/(\d+) ÷ (\d+)/g)].map((x) => Number(x[1]) / Number(x[2]));
  if (k === null || m.length !== 2) return ["énoncé illisible"];
  return texteJuste(q, egal(dessous(m[0], k), dessous(m[1], k)) ? "Oui" : "Non");
}
function moinsFine(q: Q): string[] {
  const pres = [...q.text.matchAll(/[àÀ] (1|0,1|0,01) près/g)].map((m) => ({ "1": 0, "0,1": 1, "0,01": 2 })[m[1]]!);
  const v = sans(q.text).match(new RegExp(NB));
  if (pres.length !== 2 || !v) return ["énoncé illisible"];
  const kf = Math.max(...pres);
  const kg = Math.min(...pres);
  if (kf !== kg + 1 || pres[1] !== kg) return ["précisions dans le mauvais sens"];
  return ko(q, dessous(n(v[0]), kg));
}

/* ───── troncature_arrondi ───── */
const operation = (t: string) => {
  const tr = /[Tt]ronqu|troncature|coupe les chiffres/.test(t);
  const ar = /[Aa]rrondi|valeur la plus proche/.test(t);
  return tr === ar ? null : tr ? "t" : "a";
};
function trAr(q: Q): string[] {
  const k = kNom(q.text);
  const o = operation(q.text);
  const { x, p } = vise(q.text);
  if (k === null || !o) return [...p, "rang ou opération illisibles"];
  return [...p, ...ko(q, o === "t" ? dessous(x, k) : arrondi(x, k))];
}
function trArQcm(q: Q): string[] {
  const k = kNom(q.text);
  const o = operation(q.text);
  const { x, p } = vise(q.text);
  if (k === null || !o) return [...p, "rang ou opération illisibles"];
  return [...p, ...qcmUnique(q, (c) => egal(n(c), o === "t" ? dessous(x, k) : arrondi(x, k)))];
}
function chiffreDecide(q: Q): string[] {
  const k = kNom(q.text);
  const m = q.text.match(/(\d+),(\d+)/);
  if (k === null || !m) return ["rang ou nombre illisibles"];
  return ko(q, Number(m[2][k]));
}
function memeNombre(q: Q): string[] {
  const k = kNom(q.text);
  const { x, p } = vise(q.text);
  if (k === null) return ["rang illisible"];
  return [...p, ...texteJuste(q, egal(dessous(x, k), arrondi(x, k)) ? "Oui" : "Non")];
}
function arrondiSens(q: Q): string[] {
  const k = kNom(q.text);
  const nb = q.text.match(new RegExp(NB, "g"))!.map(n);
  const [x, a] = nb;
  if (k === null || !egal(arrondi(x, k), a)) return ["arrondi écrit faux"];
  return texteJuste(q, a < x ? "par défaut" : "par excès");
}
function partageTrAr(q: Q): string[] {
  const k = kNom(q.text);
  const o = operation(q.text);
  const nb = q.text.match(new RegExp(`(?<![\\d,])${NB}`, "g"));
  if (k === null || !o || !nb || nb.length < 2) return ["énoncé illisible"];
  const x = n(nb[0]) / n(nb[1]);
  return ko(q, o === "t" ? dessous(x, k) : arrondi(x, k));
}
function nombreDeTrAr(q: Q): string[] {
  const k = kNom(q.text);
  const t = q.text.match(new RegExp(`troncature (?:d’un nombre [^,.]*? est )?(${NB})`));
  const a = q.text.match(new RegExp(`arrondi (${NB})|pour arrondi (${NB})|l’arrondi (${NB})`));
  const nb = q.text.match(new RegExp(NB, "g"));
  if (k === null || !nb || nb.length < 2 || !t && !a) return ["énoncé illisible"];
  const [vt, va] = nb.map(n);
  return qcmUnique(q, (c) => egal(dessous(n(c), k), vt) && egal(arrondi(n(c), k), va));
}
function ecartTrAr(q: Q): string[] {
  const k = kNom(q.text);
  const o = operation(q.text);
  const { x, p } = vise(q.text);
  if (k === null || !o) return [...p, "rang ou opération illisibles"];
  return [...p, ...ko(q, Math.abs((o === "t" ? dessous(x, k) : arrondi(x, k)) - x))];
}
function deuxFois(q: Q): string[] {
  const { x, p } = vise(q.text);
  return [...p, ...texteJuste(q, egal(arrondi(arrondi(x, 2), 1), arrondi(x, 1)) ? "Oui" : "Non")];
}

/* ───── encadrer ───── */
const CADRE = (m: string) => new RegExp(`^(${NB}) < ${m} < (${NB})$`);
const echap = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function cadreOK(c: string, m: string, x: number, k: number) {
  const r = c.match(CADRE(echap(m)));
  return !!r && egal(n(r[1]), dessous(x, k)) && egal(n(r[2]), dessus(x, k));
}
function entiers(q: Q): string[] {
  const m = q.text.match(/(\d+) ÷ (\d+)/);
  if (!m) return ["quotient illisible"];
  const f = Math.floor(Number(m[1]) / Number(m[2]));
  return qcmUnique(q, (c) => c === `${f} et ${f + 1}`);
}
function borne(q: Q): string[] {
  const k = kNom(q.text);
  const { x, p } = vise(q.text);
  const inf = /inférieure/.test(q.text);
  const sup = /supérieure/.test(q.text);
  if (k === null || inf === sup) return [...p, "rang ou borne illisibles"];
  return [...p, ...ko(q, inf ? dessous(x, k) : dessus(x, k))];
}
function amplitude(q: Q): string[] {
  const m = q.text.match(new RegExp(`(${NB}) < [xyan] < (${NB})`));
  if (!m) return ["encadrement illisible"];
  return ko(q, n(m[2]) - n(m[1]));
}
function bonCadre(q: Q): string[] {
  const k = kNom(q.text);
  const { x, p } = vise(q.text);
  if (k === null) return [...p, "rang illisible"];
  const m = q.text.match(/(\d+ ÷ \d+)/)?.[1] ?? q.text.match(new RegExp(NB))![0];
  return [...p, ...qcmUnique(q, (c) => cadreOK(c, m, x, k))];
}
function lireDroite(q: Q): string[] {
  const f = q.canvas as any;
  const k = kNom(q.text);
  if (f?.kind !== "number_line" || k === null) return ["droite ou rang illisibles"];
  const x = f.points[0].value;
  const p = f.points[0].label === "A" ? [] : ["le point n’est pas A"];
  if (!egal(f.step, 10 ** -k)) p.push("le pas de la droite n’est pas le rang demandé");
  return [...p, ...qcmUnique(q, (c) => cadreOK(c, "A", x, k))];
}
function vraiFaux(q: Q): string[] {
  const m = q.text.match(new RegExp(`(${NB}) < (\\d+) ÷ (\\d+) < (${NB})`));
  if (!m) return ["encadrement illisible"];
  const x = Number(m[2]) / Number(m[3]);
  return texteJuste(q, n(m[1]) < x && x < n(m[4]) ? "Oui" : "Non");
}
function partageCadre(q: Q): string[] {
  const k = kNom(q.text);
  const nb = q.text.match(new RegExp(`(?<![\\d,])${NB}`, "g"));
  if (k === null || !nb || nb.length < 2) return ["énoncé illisible"];
  const x = n(nb[0]) / n(nb[1]);
  return qcmUnique(q, (c) => {
    const r = c.match(new RegExp(`^entre (${NB}) \\S+ et (${NB}) \\S+$`));
    return !!r && egal(n(r[1]), dessous(x, k)) && egal(n(r[2]), dessus(x, k));
  });
}
function operationCadre(q: Q): string[] {
  const m = q.text.match(new RegExp(`(${NB}) < ([xyan]) < (${NB})`));
  if (!m) return ["encadrement illisible"];
  const fois = q.text.match(new RegExp(`(\\d+) × ${m[2]}`));
  const plus = q.text.match(new RegExp(`${m[2]} \\+ (\\d+)`));
  if (!fois === !plus) return ["opération illisible"];
  const g = (v: number) => (fois ? v * Number(fois[1]) : v + Number(plus![1]));
  const [lo, hi] = [g(n(m[1])), g(n(m[3]))];
  return qcmUnique(q, (c) => {
    const r = c.match(new RegExp(`^(${NB}) < .+ < (${NB})$`));
    return !!r && egal(n(r[1]), lo) && egal(n(r[2]), hi);
  });
}
function deCadreArrondi(q: Q): string[] {
  const m = q.text.match(new RegExp(`(${NB}) < [xyan] < (${NB})`));
  if (!m) return ["encadrement illisible"];
  const [d, e] = [n(m[1]), n(m[2])];
  // Tout l'intervalle ouvert doit s'arrondir au même nombre : on teste juste au-dessus de d et juste au-dessous de e.
  const a = arrondi(d + 1e-4, 1);
  const b = arrondi(e - 1e-4, 1);
  if (!egal(a, b)) return ["l’encadrement ne décide pas de l’arrondi"];
  return ko(q, a);
}
function sommeCadres(q: Q): string[] {
  const a = q.text.match(new RegExp(`(${NB}) < a < (${NB})`));
  const b = q.text.match(new RegExp(`(${NB}) < b < (${NB})`));
  if (!a || !b) return ["encadrements illisibles"];
  const somme = /a \+ b/.test(q.text);
  const dif = /a − b/.test(q.text);
  if (somme === dif) return ["opération illisible"];
  const lo = somme ? n(a[1]) + n(b[1]) : n(a[1]) - n(b[2]);
  const hi = somme ? n(a[2]) + n(b[2]) : n(a[2]) - n(b[1]);
  return qcmUnique(q, (c) => {
    const r = c.match(new RegExp(`^(${NB}) < .+ < (${NB})$`));
    return !!r && egal(n(r[1]), lo) && egal(n(r[2]), hi);
  });
}
function perimetre(q: Q): string[] {
  const m = q.text.match(new RegExp(`entre (${NB}) m et (${NB}) m`));
  const c = /carré/.test(q.text) ? 4 : /triangle/.test(q.text) ? 3 : /hexagonal/.test(q.text) ? 6 : /pentagonal/.test(q.text) ? 5 : 0;
  if (!m || !c) return ["énoncé illisible"];
  return qcmUnique(q, (x) => {
    const r = x.match(new RegExp(`^entre (${NB}) m et (${NB}) m$`));
    return !!r && egal(n(r[1]), n(m[1]) * c) && egal(n(r[2]), n(m[2]) * c);
  });
}
function compareQuotients(q: Q): string[] {
  const m = [...q.text.matchAll(/(\d+) ÷ (\d+)/g)].map((x) => Number(x[1]) / Number(x[2]));
  if (m.length !== 2 || egal(m[0], m[1])) return ["deux quotients distincts attendus"];
  return texteJuste(q, m[0] < m[1] ? "<" : ">");
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  approx_defaut_exces_tpl_1: valeurSens,
  approx_defaut_exces_tpl_2: valeurSensQcm,
  approx_defaut_exces_tpl_3: reconnaitreSens,
  approx_defaut_exces_tpl_4: retrouverPrecision,
  approx_defaut_exces_tpl_5: valeurSens,
  approx_defaut_exces_tpl_6: deuxValeurs,
  approx_defaut_exces_tpl_7: valeurSens,
  approx_defaut_exces_tpl_8: valeurSens,
  approx_defaut_exces_tpl_9: partageSens,
  approx_defaut_exces_tpl_10: quantite,
  approx_defaut_exces_tpl_11: valeurSens,
  approx_defaut_exces_tpl_12: autreValeur,
  approx_defaut_exces_tpl_13: lequel,
  approx_defaut_exces_tpl_14: surplus,
  approx_defaut_exces_tpl_15: memeValeur,
  approx_defaut_exces_tpl_16: moinsFine,

  approx_troncature_arrondi_tpl_1: trAr,
  approx_troncature_arrondi_tpl_2: trAr,
  approx_troncature_arrondi_tpl_3: trArQcm,
  approx_troncature_arrondi_tpl_4: chiffreDecide,
  approx_troncature_arrondi_tpl_5: trAr,
  approx_troncature_arrondi_tpl_6: memeNombre,
  approx_troncature_arrondi_tpl_7: arrondiSens,
  approx_troncature_arrondi_tpl_8: trAr,
  approx_troncature_arrondi_tpl_9: trAr,
  approx_troncature_arrondi_tpl_10: trAr,
  approx_troncature_arrondi_tpl_11: partageTrAr,
  approx_troncature_arrondi_tpl_12: nombreDeTrAr,
  approx_troncature_arrondi_tpl_13: ecartTrAr,
  approx_troncature_arrondi_tpl_14: deuxFois,

  approx_encadrer_quotient_tpl_1: entiers,
  approx_encadrer_quotient_tpl_2: borne,
  approx_encadrer_quotient_tpl_3: amplitude,
  approx_encadrer_quotient_tpl_4: bonCadre,
  approx_encadrer_quotient_tpl_5: bonCadre,
  approx_encadrer_quotient_tpl_6: lireDroite,
  approx_encadrer_quotient_tpl_7: vraiFaux,
  approx_encadrer_quotient_tpl_8: borne,
  approx_encadrer_quotient_tpl_9: partageCadre,
  approx_encadrer_quotient_tpl_10: operationCadre,
  approx_encadrer_quotient_tpl_11: deCadreArrondi,
  approx_encadrer_quotient_tpl_12: sommeCadres,
  approx_encadrer_quotient_tpl_13: perimetre,
  approx_encadrer_quotient_tpl_14: compareQuotients,
});
