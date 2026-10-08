import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// Les correcteurs de fractions.bank.ts (06/10/2026, voir types.ts).
// Chacun relit les nombres DANS LE TEXTE vu par l'élève et refait le calcul,
// sans rien emprunter au gabarit. Pour les fractions, il vérifie aussi
// qu'aucune proposition fausse n'est une fraction ÉGALE à la bonne réponse
// (2/4 face à 1/2) : l'élève aurait juste et serait compté faux.

// ---------- outils de lecture (partagés avec fractions-calcul.ts) ----------

/** Valeur d'une écriture : « 3/4 », « 3 / 4 », « 0,75 », « 12 », « 2 + 1/3 ». NaN sinon. */
export function valeur(s: string): number {
  const t = s.trim().replace(/\s+/g, " ");
  let m = t.match(/^(\d+) \+ (\d+) ?\/ ?(\d+)$/);
  if (m) return Number(m[1]) + Number(m[2]) / Number(m[3]);
  m = t.match(/^(\d+) ?\/ ?(\d+)$/);
  if (m) return Number(m[2]) ? Number(m[1]) / Number(m[2]) : NaN;
  m = t.match(/^(\d+(?:,\d+)?)(?: [\p{L}€]+)?$/u);
  if (m) return Number(m[1].replace(",", "."));
  return NaN;
}
export const egal = (a: number, b: number) => Math.abs(a - b) < 1e-9;
/** Les fractions écrites dans un texte, dans l'ordre. */
export function fractionsDe(t: string): [number, number][] {
  return [...t.matchAll(/(\d+) ?\/ ?(\d+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
}
/** Les entiers d'un texte qui ne sont pas dans une fraction, dans l'ordre. */
export function entiersDe(t: string): number[] {
  return [...t.replace(/\d+ ?\/ ?\d+/g, " ").matchAll(/\d+(?:,\d+)?/g)].map((m) => Number(m[0].replace(",", ".")));
}
/** La réponse attendue vaut-elle v ? Et toutes les écritures acceptées aussi ? */
export function verifierAttendu(q: TutorGeneratedQuestionV4, v: number): string[] {
  const p: string[] = [];
  const e0 = valeur(String(q.expected[0]));
  if (!egal(e0, v)) p.push(`réponse attendue ${q.expected[0]} au lieu de ${Number(v.toFixed(4))}`);
  for (const e of q.expected) {
    const x = valeur(String(e));
    if (!Number.isNaN(x) && !egal(x, v)) p.push(`écriture acceptée fausse : ${e}`);
  }
  return p;
}
/** QCM : la bonne proposition vaut v, AUCUNE autre ne vaut v (même écrite autrement). */
export function verifierQcm(q: TutorGeneratedQuestionV4, v: number): string[] {
  const p = verifierAttendu(q, v);
  const bonne = String(q.expected[0]).trim();
  for (const c of q.choices ?? []) {
    if (c.trim() === bonne) continue;
    if (egal(valeur(c), v)) p.push(`le leurre ${c} est aussi juste (égal à ${bonne})`);
  }
  return p;
}
const UNITES = "parts|carrés|tranches|morceaux|parcelles|tronçons|cases|bandes|étapes|rangées|longueurs|mesures";
/** Le nombre total de parts : « 8 parts égales », « 6 morceaux égaux ». */
export function totalParts(t: string): { d: number; reste: string } | null {
  const m = t.match(new RegExp(`(\\d+) (?:${UNITES}) (?:égales|égaux)`));
  if (!m) return null;
  return { d: Number(m[1]), reste: t.replace(m[0], " ") };
}

// ---------- les correcteurs ----------

function lireEcrire(q: TutorGeneratedQuestionV4, qcm: boolean): string[] {
  const t = totalParts(q.text);
  if (!t) return ["nombre total de parts introuvable dans le texte"];
  const autres = entiersDe(t.reste);
  if (autres.length !== 1) return [`il faut un seul nombre de parts prises, lu : ${autres.join(", ")}`];
  const n = autres[0];
  const p: string[] = [];
  if (n < 1 || n >= t.d) p.push(`parts prises (${n}) hors de 1…${t.d - 1}`);
  if (t.d > 24) p.push(`${t.d} parts : peu plausible`);
  return [...p, ...(qcm ? verifierQcm(q, n / t.d) : verifierAttendu(q, n / t.d))];
}

/** « n/d de … » + « en D parts égales » : combien de parts pour représenter n/d ? */
function partsPourFraction(q: TutorGeneratedQuestionV4): string[] {
  const fr = fractionsDe(q.text);
  const t = totalParts(q.text);
  if (fr.length !== 1 || !t) return ["il faut une fraction et un nombre de parts égales dans le texte"];
  const [a, b] = fr[0];
  if (a < 1 || a >= b) return [`fraction ${a}/${b} pas entre 0 et 1`];
  if (t.d % b) return [`${t.d} parts ne se groupent pas en ${b} : ${a}/${b} impossible à colorier`];
  return verifierAttendu(q, (t.d / b) * a);
}

/** « 3/4 L de lait… (3/4, c’est 3 ÷ 4.) » : la valeur décimale, l'unité, le rappel du quotient. */
function fractionEnDecimal(q: TutorGeneratedQuestionV4, qcm: boolean, sup1: boolean): string[] {
  const m = q.text.match(/(\d+)\/(\d+) (L|kg|m|km)\b/);
  if (!m) return ["fraction suivie d'une unité introuvable"];
  const [n, d, u] = [Number(m[1]), Number(m[2]), m[3]];
  const p: string[] = [];
  if (!q.text.includes(`${n} ÷ ${d}`)) p.push(`le texte doit dire « ${n}/${d}, c’est ${n} ÷ ${d} »`);
  let r = d;
  while (r % 2 === 0) r /= 2;
  while (r % 5 === 0) r /= 5;
  if (r !== 1) p.push(`${n}/${d} n'a pas d'écriture décimale finie`);
  if (sup1 ? n <= d : n >= d) p.push(`${n}/${d} ${sup1 ? "devrait dépasser 1" : "devrait être plus petit que 1"}`);
  if (n / d > 3) p.push(`${n / d} ${u} : peu plausible`);
  if (!qcm && !String(q.expected[0]).endsWith(` ${u}`)) p.push(`la réponse attendue devrait porter l'unité ${u}`);
  return [...p, ...(qcm ? verifierQcm(q, n / d) : verifierAttendu(q, n / d))];
}

/** « la plus grande » / « la plus petite » : la bonne valeur parmi des fractions. */
function extreme(q: TutorGeneratedQuestionV4, fr: [number, number][]): { v: number; p: string[] } {
  const grande = /plus grande|le plus possible/.test(q.text);
  const petite = /plus petite|le moins possible/.test(q.text);
  if (grande === petite) return { v: NaN, p: ["on ne sait pas si l'on cherche la plus grande ou la plus petite"] };
  const vals = fr.map(([n, d]) => n / d);
  const v = grande ? Math.max(...vals) : Math.min(...vals);
  const p: string[] = [];
  if (vals.filter((x) => egal(x, v)).length > 1) p.push("deux fractions ex æquo : pas de réponse unique");
  for (const [n, d] of fr) if (n < 1 || n >= d) p.push(`${n}/${d} n'est pas entre 0 et 1`);
  return { v, p };
}
const multiples = (a: number, b: number) => a % b === 0 || b % a === 0;

/** oui / non attendu, choix « oui » et « non ». */
function ouiNon(q: TutorGeneratedQuestionV4, vrai: boolean): string[] {
  const p: string[] = [];
  if (String(q.expected[0]) !== (vrai ? "oui" : "non")) p.push(`réponse ${q.expected[0]} au lieu de ${vrai ? "oui" : "non"}`);
  if (JSON.stringify([...(q.choices ?? [])].sort()) !== JSON.stringify(["non", "oui"])) p.push("choix oui / non attendus");
  return p;
}
/** « Les n/d de T » : T est le seul entier du texte hors fraction ; la réponse vaut T × n ÷ d. */
export function quantite(q: TutorGeneratedQuestionV4): string[] {
  const fr = fractionsDe(q.text);
  const ent = entiersDe(q.text);
  if (fr.length !== 1 || ent.length !== 1) return [`une fraction et un total attendus ; lu ${fr.length} fraction(s), entiers ${ent.join(", ")}`];
  const [n, d] = fr[0];
  const t = ent[0];
  const p: string[] = [];
  if (n < 1 || n >= d) p.push(`${n}/${d} n'est pas entre 0 et 1`);
  if (t % d) p.push(`${t} ne se partage pas en ${d} parts entières`);
  if (t > 240) p.push(`total ${t} peu plausible`);
  const u = q.text.match(/(km|minutes|€)/)?.[1];
  const unite = u === "minutes" ? "min" : u;
  if (unite && !String(q.expected[0]).endsWith(` ${unite}`)) p.push(`unité ${unite} absente de la réponse`);
  return [...p, ...verifierAttendu(q, (t / d) * n)];
}

/** Toutes les affirmations chiffrées d'un texte d'explication : « 11/4 = 2 + 3/4 », « a/b < c/d < … », « entre 2 et 3 ». */
function affirmationsJustes(t: string): string[] {
  const p: string[] = [];
  for (const m of t.matchAll(/(\d+)\/(\d+) = (\d+) \+ (\d+)\/(\d+)/g)) {
    const [n, d, e, r, d2] = m.slice(1).map(Number);
    if (d !== d2 || n !== e * d + r || r >= d) p.push(`écriture mixte fausse : ${m[0]}`);
  }
  for (const m of t.matchAll(/\d+\/\d+(?: < \d+\/\d+)+/g)) {
    const v = fractionsDe(m[0]).map(([a, b]) => a / b);
    if (v.some((x, i) => i && !(v[i - 1] < x))) p.push(`rangement faux : ${m[0]}`);
  }
  for (const m of t.matchAll(/(\d+)\/(\d+)[^.]*?situé entre (\d+) et (\d+)/g)) {
    const [n, d, a, b] = m.slice(1).map(Number);
    if (!(a < n / d && n / d < b && b === a + 1)) p.push(`encadrement faux : ${m[0]}`);
  }
  return p;
}

/** « la moitié / le tiers / le quart de T » : T ÷ 2, 3 ou 4. */
function quantiteEnMots(q: TutorGeneratedQuestionV4, qcm: boolean): string[] {
  const m = q.text.match(/(moitié|tiers|quart)/i);
  const ent = entiersDe(q.text);
  if (!m || ent.length !== 1) return ["« moitié / tiers / quart » et un seul total attendus"];
  const d = { moitié: 2, tiers: 3, quart: 4 }[m[1].toLowerCase() as "moitié" | "tiers" | "quart"];
  const t = ent[0];
  const p: string[] = [];
  if (t % d) p.push(`${t} ne se partage pas en ${d}`);
  const u = q.text.match(/(km|minutes|€)/)?.[1];
  const unite = u === "minutes" ? "min" : u;
  if (unite && !String(q.expected[0]).endsWith(` ${unite}`)) p.push(`unité ${unite} absente de la réponse`);
  return [...p, ...(qcm ? verifierQcm(q, t / d) : verifierAttendu(q, t / d))];
}

export const CORRECTEURS: CorrecteursMaths = {
  fraction_quantite_tpl_1: (q) => quantiteEnMots(q, false),
  fraction_quantite_qcm_tpl_1: (q) => quantiteEnMots(q, true),
  fraction_quantite_tpl_2: quantite,
  fraction_mixte_tpl_1: (q) => {
    const m = q.text.match(/(\d+)\/(\d+) = (\d+) \+ …\/(\d+)/);
    if (!m) return ["égalité à compléter introuvable"];
    const [n, d, e, d2] = m.slice(1).map(Number);
    const p: string[] = [];
    if (d !== d2) p.push("dénominateurs différents de part et d'autre");
    if (Math.floor(n / d) !== e) p.push(`l'entier de ${n}/${d} est ${Math.floor(n / d)}, pas ${e}`);
    if (n % d === 0) p.push("fraction entière : pas de reste");
    const c = q.canvas as any;
    if (c?.kind === "number_line") {
      const pt = c.points?.[0]?.value;
      if (!(c.min <= n / d && n / d <= c.max) || Math.abs(pt - n / d) > 1e-3) p.push("le point A n'est pas à la fraction");
      if (Math.abs(c.step - 1 / d) > 1e-9) p.push("graduation différente de 1/d");
    }
    const parts = q.text.match(/(\d+) \p{L}+ de \p{L}+\. Chaque \p{L}+ a (\d+)/u);
    if (parts && (Number(parts[1]) !== n || Number(parts[2]) !== d)) p.push("la situation ne correspond pas à la fraction");
    return [...p, ...verifierAttendu(q, n - e * d)];
  },
  fraction_mixte_tpl_vers_fraction: (q) => {
    const m =
      q.text.match(/(\d+)(?: \+ (\d+)\/(\d+))? = …\/(\d+)/) ??
      q.text.match(/Écris (\d+) \+ (\d+)\/(\d+) sous la forme d’une seule fraction de dénominateur (\d+)/) ??
      q.text.match(/écrire (\d+) avec le dénominateur (\d+)/);
    if (!m) return ["égalité à compléter introuvable"];
    let e: number, r = 0, d: number;
    if (m.length === 3) [e, d] = [Number(m[1]), Number(m[2])];
    else {
      e = Number(m[1]);
      d = Number(m[4]);
      if (m[2]) {
        r = Number(m[2]);
        if (Number(m[3]) !== d) return ["dénominateurs différents"];
      }
    }
    const p: string[] = [];
    if (r >= d) p.push(`${r}/${d} n'est pas plus petit que 1`);
    if (e > 3) p.push("trop d'entiers pour la 6e");
    return [...p, ...verifierAttendu(q, e * d + r)];
  },
  fraction_mixte_tpl_encadrer: (q) => {
    const fr = fractionsDe(q.text);
    if (fr.length !== 1) return ["une fraction attendue"];
    const [n, d] = fr[0];
    const e = Math.floor(n / d);
    if (n % d === 0) return ["fraction entière : pas d'encadrement strict"];
    const bonnes = (q.choices ?? []).filter((c) => {
      const m = c.match(/^entre (\d+) et (\d+)$/);
      return m && Number(m[1]) < n / d && n / d < Number(m[2]) && Number(m[2]) === Number(m[1]) + 1;
    });
    const p: string[] = [];
    if (bonnes.length !== 1) p.push(`${bonnes.length} propositions justes`);
    if (q.expected[0] !== `entre ${e} et ${e + 1}`) p.push(`réponse ${q.expected[0]} au lieu de entre ${e} et ${e + 1}`);
    return p;
  },
  // 08/10/2026 : plus de question ouverte, quatre cas précis en QCM (voir le gabarit).
  fraction_mixte_tpl_ouverte: (q) => {
    const p = [...affirmationsJustes(String(q.explanation ?? "")), ...affirmationsJustes(q.text)];
    const ch = q.choices ?? [];
    const e = String(q.expected[0]);
    if (q.format !== "qcm" || q.comparator !== "mcq_exact") p.push("QCM attendu : plus de question ouverte");
    if (q.expected.length !== 1 || !ch.includes(e)) p.push("bonne réponse absente des choix");
    if (new Set(ch).size !== ch.length) p.push("choix en double");
    if (ch.length < 3) p.push("au moins trois choix attendus");
    // Frédéric (08/10) : des choix COURTS, l'explication va dans explanation.
    for (const c of ch) if (c.length > 25 || /[:,;]/.test(c)) p.push(`choix trop long : ${c}`);
    const fr =fractionsDe(q.text).filter(([a, b]) => a !== 1 || b !== 2);
    // Chaque fraction de l'énoncé doit être reprise dans l'explication.
    for (const [a, b] of fr) if (!String(q.explanation).includes(`${a}/${b}`)) p.push(`${a}/${b} n'est pas expliquée`);
    if (/ordre croissant|de la plus petite à la plus grande/.test(q.text)) {
      // Un seul choix est rangé dans le bon ordre, avec les fractions de l'énoncé.
      const cle = (t: [number, number][]) => t.map(([a, b]) => `${a}/${b}`).sort().join("|");
      const ranges = ch.filter((c) => {
        const f = fractionsDe(c);
        const v = f.map(([a, b]) => a / b);
        return cle(f) === cle(fr) && v.every((x, i) => !i || v[i - 1] < x);
      });
      if (ranges.length !== 1 || ranges[0] !== e) p.push(`rangement : ${ranges.length} choix justes, attendu ${e}`);
      for (const c of ch) if (cle(fractionsDe(c)) !== cle(fr)) p.push(`le choix ${c} ne reprend pas les fractions de l'énoncé`);
    } else if (/la plus grande : \d+\/\d+ ou \d+\/\d+ \?/.test(q.text)) {
      // Deux fractions de même dénominateur : la plus grande, et ce n'est pas « égales ».
      if (fr.length !== 2) return [...p, "deux fractions attendues"];
      const [[a, b], [c, d]] = fr;
      if (b !== d) p.push("même dénominateur attendu (comparaison simple)");
      if (egal(a / b, c / d)) p.push("fractions égales : pas de plus grande");
      const bon = a / b > c / d ? `${a}/${b}` : `${c}/${d}`;
      if (e !== bon) p.push(`réponse ${e} au lieu de ${bon}`);
    } else if (/est-il plus grand que 1 \?/.test(q.text)) {
      const f1 = fractionsDe(q.text); // 1/2 compris ici
      if (f1.length !== 1) return [...p, "une seule fraction attendue"];
      const [a, b] = f1[0];
      if (a === b) p.push("fraction égale à 1");
      const bon = a > b ? "oui" : "non";
      if (e !== bon) p.push(`réponse ${e} au lieu de ${bon}`);
    } else if (/entre quels entiers/i.test(q.text)) {
      if (fr.length < 1) return [...p, "fraction introuvable"];
      const [n, d] = fr[0];
      if (n % d === 0) p.push("fraction entière : pas d'encadrement strict");
      const k = Math.floor(n / d);
      if (e !== `entre ${k} et ${k + 1}`) p.push(`réponse ${e} au lieu de entre ${k} et ${k + 1}`);
      const justes = ch.filter((c) => {
        const m = c.match(/^entre (\d+) et (\d+)$/);
        return m && Number(m[1]) < n / d && n / d < Number(m[2]) && Number(m[2]) === Number(m[1]) + 1;
      });
      if (justes.length !== 1) p.push(`${justes.length} encadrements justes`);
      if (!q.text.includes(`plus grand que ${n}.`)) p.push("le piège doit reprendre le numérateur");
    } else if (/plus petite ou plus grande que 1\/2/.test(q.text)) {
      if (fr.length !== 1) return [...p, "une seule fraction attendue"];
      const [a, b] = fr[0];
      if (2 * a === b) p.push("fraction égale à 1/2");
      const bon = 2 * a < b ? "plus petite que 1/2" : "plus grande que 1/2";
      if (e !== bon) p.push(`réponse ${e} au lieu de ${bon}`);
    } else p.push("cas inconnu");
    return p;
  },
  fraction_defi_tpl_1: quantite,
  fraction_defi_tpl_moitie: (q) => {
    const t = totalParts(q.text) ?? (() => {
      const m = q.text.match(/(\d+) \p{L}+ sur (\d+)/u);
      return m ? { d: Number(m[2]), reste: q.text.replace(m[0], ` ${m[1]} `) } : null;
    })();
    if (!t) return ["nombre total de parts introuvable"];
    const autres = entiersDe(t.reste);
    if (autres.length !== 1) return [`un seul nombre de parts prises attendu, lu ${autres.join(", ")}`];
    return ouiNon(q, 2 * autres[0] === t.d);
  },
  fraction_defi_tpl_fraction_egale: (q) => {
    const fr = fractionsDe(q.text);
    const trou = q.text.match(/…\/(\d+)/);
    const t = totalParts(q.text);
    const d = trou ? Number(trou[1]) : t ? t.d : entiersDe(q.text.replace(/\d+\/\d+/g, ""))[0];
    if (fr.length !== 1 || !d) return ["fraction ou dénominateur cible introuvable"];
    const [a, b] = fr[0];
    if (d % b) return [`${d} n'est pas un multiple de ${b}`];
    if (d === b) return ["même dénominateur : rien à chercher"];
    return verifierAttendu(q, (a * d) / b);
  },
  fraction_defi_tpl_2: (q) => {
    const fr = fractionsDe(q.text);
    if (fr.length !== 2) return ["deux fractions attendues"];
    const [[a, b], [c, d]] = fr;
    const p = ouiNon(q, a * d === b * c);
    if (!(b % d === 0 || d % b === 0)) p.push("dénominateurs sans lien de multiple");
    return p;
  },
  fraction_equivalence_canvas_tpl_1: (q) => {
    const c = q.canvas as any;
    if (c?.model !== "compare" || c.fractions?.length !== 2) return ["deux barres attendues"];
    const fr = fractionsDe(q.text);
    const p: string[] = [];
    c.fractions.forEach((f: any, i: number) => {
      if (f.label !== `${f.numerator}/${f.denominator}`) p.push(`étiquette ${f.label} ≠ barre`);
      if (!fr[i] || fr[i][0] !== f.numerator || fr[i][1] !== f.denominator) p.push("le texte et les barres ne montrent pas les mêmes fractions");
    });
    const [f1, f2] = c.fractions;
    return [...p, ...ouiNon(q, f1.numerator * f2.denominator === f2.numerator * f1.denominator)];
  },
  fraction_comparer_tpl_1: (q) => {
    const fr = fractionsDe(q.text);
    if (fr.length !== 2) return ["deux fractions attendues"];
    if (fr[0][1] !== fr[1][1]) return ["★2 : même dénominateur attendu"];
    const { v, p } = extreme(q, fr);
    return [...p, ...verifierAttendu(q, v)];
  },
  fraction_comparer_tpl_2: (q) => {
    const fr = fractionsDe(q.text);
    if (fr.length !== 2) return ["deux fractions attendues"];
    if (!multiples(fr[0][1], fr[1][1]) || fr[0][1] === fr[1][1]) return ["dénominateurs : l'un doit être un multiple de l'autre"];
    const { v, p } = extreme(q, fr);
    return [...p, ...verifierAttendu(q, v)];
  },
  fraction_comparer_qcm_tpl_1: (q) => {
    const fr = (q.choices ?? []).map((c) => fractionsDe(c)[0]);
    if (fr.length !== 4 || fr.some((f) => !f)) return ["quatre fractions attendues"];
    if (new Set(fr.map((f) => f[1])).size !== 1) return ["même dénominateur attendu"];
    const t = totalParts(q.text);
    if (t && t.d !== fr[0][1]) return [`le texte parle de ${t.d} parts, les fractions de ${fr[0][1]}`];
    const { v, p } = extreme(q, fr);
    return [...p, ...verifierQcm(q, v)];
  },
  fraction_comparer_canvas_tpl_1_barres: (q) => {
    const c = q.canvas as any;
    if (c?.model !== "compare" || c.fractions?.length !== 2) return ["deux barres attendues"];
    if (/\d/.test(q.text)) return ["le texte donne des nombres : les barres doivent suffire"];
    const fr: [number, number][] = c.fractions.map((f: any) => [f.numerator, f.denominator]);
    const p: string[] = [];
    c.fractions.forEach((f: any) => {
      if (f.label !== `${f.numerator}/${f.denominator}`) p.push(`étiquette ${f.label} ≠ barre ${f.numerator}/${f.denominator}`);
    });
    if (!multiples(fr[0][1], fr[1][1])) p.push("dénominateurs sans lien de multiple");
    const e = extreme(q, fr);
    return [...p, ...e.p, ...verifierAttendu(q, e.v)];
  },
  fraction_comparer_tpl_meme_numerateur: (q) => {
    const fr = fractionsDe(q.text);
    if (fr.length < 2) return ["deux fractions attendues"];
    const [[a, b], [a2, c]] = fr;
    if (a !== a2 || b === c) return ["même numérateur et dénominateurs différents attendus"];
    // L'affirmation : « a/b est plus grand que a/c » ou « a/b > a/c » ou « a/b … est plus que a/c ».
    if (!/plus grand que|>|est plus que/.test(q.text)) return ["affirmation illisible"];
    const vrai = a / b > a / c;
    const p: string[] = [];
    if (String(q.expected[0]) !== (vrai ? "oui" : "non")) p.push(`réponse ${q.expected[0]} au lieu de ${vrai ? "oui" : "non"}`);
    // La raison donnée, si elle cite les dénominateurs, doit être exacte.
    const r = q.text.match(/parce que (\d+) est plus (grand|petit) que (\d+)/);
    if (r && (r[2] === "grand") !== Number(r[1]) > Number(r[3])) p.push("la raison citée est fausse en elle-même");
    if (JSON.stringify([...(q.choices ?? [])].sort()) !== JSON.stringify(["non", "oui"])) p.push("choix oui / non attendus");
    return p;
  },
  fraction_comparer_tpl_a_un: (q) => {
    const fr = (q.choices ?? []).map((c) => fractionsDe(c)[0]);
    if (fr.length !== 4 || fr.some((f) => !f)) return ["quatre fractions attendues"];
    const grande = /plus grande que 1|plus d’un/.test(q.text);
    const petite = /plus petite que 1|moins d’un/.test(q.text);
    if (grande === petite) return ["on ne sait pas si l'on cherche au-dessus ou au-dessous de 1"];
    const bonnes = (q.choices ?? []).filter((c) => {
      const v = valeur(c);
      return grande ? v > 1 : v < 1;
    });
    const p: string[] = [];
    if (bonnes.length !== 1) p.push(`${bonnes.length} propositions conviennent : ${bonnes.join(", ")}`);
    else if (bonnes[0] !== q.expected[0]) p.push(`réponse ${q.expected[0]} au lieu de ${bonnes[0]}`);
    for (const [n, d] of fr) if (d > 12 || n > 25) p.push(`${n}/${d} : trop grand pour la 6e`);
    return p;
  },
  fraction_decimal_tpl_1: (q) => fractionEnDecimal(q, false, false),
  fraction_decimal_tpl_quotient: (q) => fractionEnDecimal(q, false, true),
  fraction_decimal_qcm_tpl_1: (q) => fractionEnDecimal(q, true, false),
  fraction_representer_tpl_1: (q) => [
    ...partsPourFraction(q),
    ...(totalParts(q.text) && fractionsDe(q.text)[0]?.[1] !== totalParts(q.text)!.d ? ["le dénominateur n'est pas le nombre de parts (★1)"] : []),
  ],
  fraction_representer_tpl_parts_plus_fines: (q) => [
    ...partsPourFraction(q),
    ...(fractionsDe(q.text)[0]?.[1] === totalParts(q.text)?.d ? ["parts aussi grosses que la fraction : ce n'est plus la question ★3"] : []),
  ],
  fraction_representer_qcm_tpl_1: (q) => {
    const fr = fractionsDe(q.text);
    if (fr.length !== 1) return ["une seule fraction attendue dans le texte"];
    const [a, b] = fr[0];
    const p = verifierAttendu(q, b);
    if (a >= b) p.push("fraction supérieure à 1");
    // Toute proposition multiple de b permettrait aussi de représenter a/b.
    for (const c of q.choices ?? []) if (c !== q.expected[0] && valeur(c) % b === 0) p.push(`le leurre ${c} permet aussi de représenter ${a}/${b}`);
    return p;
  },
  fraction_representer_canvas_tpl_1_barre: (q) => {
    const f = (q.canvas as any)?.fraction;
    if ((q.canvas as any)?.model !== "bar" || !f) return ["barre absente"];
    if (/\d/.test(q.text)) return ["le texte donne des nombres : la figure doit suffire"];
    if (f.numerator < 1 || f.numerator >= f.denominator) return ["barre vide ou pleine"];
    return verifierAttendu(q, f.numerator / f.denominator);
  },
  fraction_representer_canvas_tpl_2_grille: (q) => {
    const g = (q.canvas as any)?.grid;
    if ((q.canvas as any)?.model !== "grid" || !g) return ["grille absente"];
    if (/\d/.test(q.text)) return ["le texte donne des nombres : la figure doit suffire"];
    const total = g.rows * g.cols;
    if (g.shaded < 1 || g.shaded >= total) return ["grille vide ou pleine"];
    return verifierAttendu(q, g.shaded / total);
  },
  fraction_lire_ecrire_tpl_1: (q) => lireEcrire(q, false),
  fraction_lire_ecrire_qcm_tpl_1: (q) => lireEcrire(q, true),
  fraction_lire_ecrire_tpl_deux_enfants: (q) => {
    const t = totalParts(q.text);
    if (!t) return ["nombre total de parts introuvable"];
    const qui = [...q.text.matchAll(/(\p{Lu}[\p{L}]+) en \p{L}+ (\d+)/gu)].map((m) => ({ p: m[1], n: Number(m[2]) }));
    if (qui.length !== 2) return [`deux enfants attendus, lus : ${qui.map((x) => x.p).join(", ")}`];
    const [a, b] = qui;
    const question = q.text.slice(q.text.lastIndexOf(".") + 1);
    let n: number;
    if (/reste/.test(question)) n = t.d - a.n - b.n;
    else if (/à eux deux/.test(question)) n = a.n + b.n;
    else if (question.includes(b.p)) n = b.n;
    else if (question.includes(a.p)) n = a.n;
    else return ["question illisible"];
    const p: string[] = [];
    if (a.n + b.n >= t.d) p.push("plus de parts prises que de parts");
    return [...p, ...verifierAttendu(q, n / t.d)];
  },
};
