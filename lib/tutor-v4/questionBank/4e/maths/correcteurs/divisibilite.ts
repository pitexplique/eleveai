import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { diviseurs, entiers, pgcd } from "./nombres-premiers";

// LES CORRECTEURS DE divisibilite.bank.ts (notion divisibilite, 08/10/2026).
// Ils relisent les nombres DANS LE TEXTE et JUGENT CHAQUE PROPOSITION par le
// calcul : « 72 est un multiple de 8 » est testée par 72 ÷ 8, « par 3 et par 9 »
// par les restes, une égalité « a = b × q + r » est évaluée, les affirmations
// générales du vrai/faux sont éprouvées sur tous les entiers jusqu'à 2 000.
// Ils refont aussi les divisions euclidiennes, les listes de diviseurs, le plus
// grand diviseur commun (par la liste) et le plus petit multiple commun (en
// comptant), et contrôlent la plausibilité (une fleuriste n'a pas 8 000 roses).

type Q = TutorGeneratedQuestionV4;

/** Plausibilité, par objet : le plus grand nombre crédible pour un enfant de 13 ans. */
const PLAUSIBLE: [RegExp, number][] = [
  [/\d+\?*\d* roses/, 1000],
  [/\d+\?*\d* joueurs/, 150],
  [/\d+\?*\d* macarons/, 1000],
  [/\d+\?*\d* livres/, 3000],
  [/\d+\?*\d* plants de tomates/, 1000],
  [/\d+\?*\d* dalles/, 2000],
  [/\d+\?*\d* élèves/, 400],
  [/\d+\?*\d* bonbons/, 5000],
  [/\d+\?*\d* participants/, 300],
  [/\d+\?*\d* pots de miel/, 1500],
  [/\d+\?*\d* choristes/, 150],
  [/\d+\?*\d* œufs/, 3000],
  [/\d+\?*\d* enfants/, 200],
  [/\d+\?*\d* cartes postales/, 2000],
  [/\d+\?*\d* gousses de vanille/, 5000],
  [/\d+\?*\d* coureurs/, 5000],
  [/\d+\?*\d* yaourts/, 1000],
];

function plausible(t: string): string[] {
  const p: string[] = [];
  for (const [re, max] of PLAUSIBLE) {
    const m = t.match(re);
    if (!m) continue;
    // Le plus grand nombre que peut cacher « 8?4 » : on remplace ? par 9.
    const v = Number(m[0].match(/^[\d?]+/)![0].replace("?", "9"));
    if (v > max) p.push(`« ${m[0]} » : peu plausible (au plus ${max})`);
  }
  return p;
}

/** Le texte sans ce qui est entre guillemets (les affirmations). */
const nombresTexte = (t: string) => entiers(t);

// ─── div_multiple_diviseur ──────────────────────────────────────────────────

/** Une phrase « A est un multiple de B », « A est un diviseur de B », « A n'est pas un diviseur de B », « A et B n'ont aucun lien ». */
function phraseVraie(c: string): boolean | null {
  let m = c.match(/^(\d+) est un multiple de (\d+)$/);
  if (m) return Number(m[1]) % Number(m[2]) === 0;
  m = c.match(/^(\d+) est un diviseur de (\d+)$/);
  if (m) return Number(m[2]) % Number(m[1]) === 0;
  m = c.match(/^(\d+) n'est pas un diviseur de (\d+)$/);
  if (m) return Number(m[2]) % Number(m[1]) !== 0;
  m = c.match(/^(\d+) et (\d+) n'ont aucun lien$/);
  if (m) return Number(m[1]) % Number(m[2]) !== 0 && Number(m[2]) % Number(m[1]) !== 0;
  return null;
}

function corrigerReconnaitre(q: Q): string[] {
  const p: string[] = [];
  for (const c of q.choices ?? []) if (phraseVraie(c) == null) p.push(`proposition illisible : « ${c} »`);
  p.push(...qcmUnique(q, (c) => phraseVraie(c) === true));
  // Les nombres de la bonne phrase sont ceux du texte.
  const ns = nombresTexte(q.text);
  for (const x of entiers(q.expected[0])) if (!ns.includes(x)) p.push(`${x} n'est pas dans le texte`);
  // Trois nombres : l'un est le produit des deux autres (« 6 × 7 = 42 », « 42 ÷ 6 = 7 », « 7 bouquets »).
  if (ns.length === 3) {
    const [x, y, z] = [...ns].sort((a, b) => a - b);
    if (x * y !== z) p.push(`le texte dit ${ns.join(", ")} : ${x} × ${y} ≠ ${z}`);
  }
  return [...p, ...plausible(q.text)];
}

function corrigerTesterMultiple(q: Q): string[] {
  const ns = nombresTexte(q.text);
  if (ns.length !== 2) return [`deux nombres attendus, lus : ${ns.join(", ")}`];
  const n = Math.max(...ns);
  const d = Math.min(...ns);
  const juste = n % d === 0 ? "oui" : "non";
  return [...qcmUnique(q, (c) => c === juste), ...plausible(q.text)];
}

// ─── critères ───────────────────────────────────────────────────────────────

/** « des bouquets de 2, de 5 et de 10 », « par 5 seulement », « aucune de ces tailles », « ni par 3 ni par 9 » → l'ensemble annoncé. */
function ensembleAnnonce(c: string): number[] {
  if (/aucun|^ni /.test(c)) return [];
  return entiers(c).sort((a, b) => a - b);
}

const memes = (a: number[], b: number[]) => a.length === b.length && a.every((x, i) => x === b[i]);

function corrigerCriteres(diviseursTestes: number[]) {
  return (q: Q): string[] => {
    const n = Math.max(...nombresTexte(q.text));
    const vrais = diviseursTestes.filter((x) => n % x === 0);
    const p = qcmUnique(q, (c) => memes(ensembleAnnonce(c), vrais));
    const rows = ((q.canvas as any)?.rows ?? []) as { values: string[] }[];
    if (rows.length && rows[0].values[0] !== String(n)) p.push(`le tableau montre ${rows[0].values[0]} au lieu de ${n}`);
    if (rows.some((r) => r.values.slice(1).some((v) => v !== "?"))) p.push("le tableau donne la réponse");
    return [...p, ...plausible(q.text)];
  };
}

/** « 0 ou 5 », « 0, 2, 4, 6 ou 8 », « n'importe quel chiffre pair sauf 0 », « il faut regarder la somme des chiffres ». */
function chiffresAnnonces(c: string): number[] | null {
  if (/somme des chiffres/.test(c)) return null;
  if (/pair sauf 0/.test(c)) return [2, 4, 6, 8];
  return entiers(c).sort((a, b) => a - b);
}

function corrigerUniteManquante(q: Q): string[] {
  const m = q.text.match(/(\d+)\?/);
  if (!m) return ["nombre à trou « …? » illisible"];
  const base = Number(m[1]);
  const autres = [...new Set(nombresTexte(q.text.replace(/\d+\?/g, " ")))];
  if (autres.length !== 1) return [`un seul diviseur attendu, lus : ${autres.join(", ")}`];
  const par = autres[0];
  const possibles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((c) => (base * 10 + c) % par === 0);
  return [...qcmUnique(q, (c) => { const a = chiffresAnnonces(c); return !!a && memes(a, possibles); }), ...plausible(q.text)];
}

function corrigerLequel39(q: Q): string[] {
  const ns = [...new Set(nombresTexte(q.text))];
  if (ns.length !== 1 || ![3, 9].includes(ns[0])) return [`un diviseur 3 ou 9 attendu, lus : ${ns.join(", ")}`];
  const p = ns[0];
  const pb = qcmUnique(q, (c) => Number(c) % p === 0);
  // Plausibilité : la plus grande proposition, pour l'objet du texte.
  const max = Math.max(...(q.choices ?? []).map(Number));
  const objet = PLAUSIBLE.find(([re]) => re.test(`${max} ${q.text.match(/(?:d'|de |ses )([a-zœéè ]+?)(?: parmi| sans|,| ?\?| de \d| à)/)?.[1] ?? ""}`));
  if (objet && max > objet[1]) pb.push(`${max} : peu plausible (au plus ${objet[1]})`);
  return pb;
}

// ─── div_euclidienne ────────────────────────────────────────────────────────

function corrigerQuotientReste(q: Q): string[] {
  const ns = nombresTexte(q.text);
  if (ns.length !== 2) return [`deux nombres attendus, lus : ${ns.join(", ")}`];
  const a = Math.max(...ns);
  const b = Math.min(...ns);
  const demandeReste = /rest/.test(q.text);
  const quotient = Math.floor(a / b);
  const reste = a - b * quotient;
  const juste = demandeReste ? reste : quotient;
  const p: string[] = [];
  if (Number(q.expected[0]) !== juste) p.push(`attendu « ${q.expected[0]} », ${a} = ${b} × ${quotient} + ${reste}`);
  if (reste === 0) p.push("la division tombe juste : le reste vaut 0, la question perd son sens");
  const div = (q.canvas as any)?.division;
  if (div && (div.dividende !== String(a) || div.diviseur !== String(b))) p.push(`la potence montre ${div.dividende} ÷ ${div.diviseur}`);
  if (div && (div.quotient != null || div.reste != null)) p.push("la potence donne la réponse");
  return [...p, ...plausible(q.text)];
}

/** « a = b × q + r » : vraie si le calcul tombe, que a est le dividende du texte, r le reste du texte, plus petit que le diviseur. */
function corrigerEgalite(q: Q): string[] {
  const ns = nombresTexte(q.text);
  const a = Math.max(...ns);
  const rLu = q.text.match(/reste(?: de| vaut)? (\d+)|en reste (\d+)|le reste (\d+)/);
  if (!rLu) return ["reste illisible dans le texte"];
  const r = Number(rLu[1] ?? rLu[2] ?? rLu[3]);
  // On retire UNE occurrence du dividende et UNE du reste (le quotient peut valoir le reste).
  const autres = [...ns];
  autres.splice(autres.indexOf(a), 1);
  if (autres.indexOf(r) < 0) return [`le reste ${r} n'est pas parmi les nombres du texte`];
  autres.splice(autres.indexOf(r), 1);
  if (autres.length !== 2) return [`diviseur et quotient attendus, lus : ${autres.join(", ")}`];
  const [b, qq] = [Math.max(...autres), Math.min(...autres)];
  const juste = (c: string) => {
    const m = c.match(/^(\d+) = (\d+) × (\d+) \+ (\d+)$/);
    if (!m) return false;
    const [A, B, C, D] = m.slice(1).map(Number);
    const facteursDuTexte = (B === b && C === qq) || (B === qq && C === b);
    return A === a && D === r && facteursDuTexte && B * C + D === A && r < b;
  };
  const p = qcmUnique(q, juste);
  if (b * qq + r !== a) p.push(`le texte se contredit : ${b} × ${qq} + ${r} ≠ ${a}`);
  if (r >= b || r === 0) p.push(`reste ${r} impossible pour le diviseur ${b}`);
  return [...p, ...plausible(q.text)];
}

// ─── div_lister_diviseurs ───────────────────────────────────────────────────

function corrigerCombienDiviseurs(q: Q): string[] {
  const n = Math.max(...nombresTexte(q.text));
  const juste = diviseurs(n).length;
  const p: string[] = [];
  if (Number(q.expected[0]) !== juste) p.push(`attendu « ${q.expected[0] } », ${n} a ${juste} diviseurs`);
  const rows = ((q.canvas as any)?.rows ?? []) as { values: string[] }[];
  for (const r of rows) {
    const m = r.values[0].match(/^(\d+) et (\d+)$/);
    if (m && Number(m[1]) * Number(m[2]) !== n) p.push(`tableau : ${m[1]} × ${m[2]} ≠ ${n}`);
    if (r.values[1] !== String(n)) p.push(`tableau : produit ${r.values[1]} au lieu de ${n}`);
  }
  return [...p, ...plausible(q.text)];
}

function corrigerIntrus(q: Q): string[] {
  const choix = (q.choices ?? []).map(Number);
  const ns = [...new Set(nombresTexte(q.text).filter((x) => !choix.includes(x)))];
  if (ns.length !== 1) return [`un seul nombre à diviser attendu, lus : ${ns.join(", ")}`];
  const n = ns[0];
  const p = qcmUnique(q, (c) => n % Number(c) !== 0);
  for (const c of choix) if (!nombresTexte(q.text).includes(c)) p.push(`la proposition ${c} n'est pas dans la liste du texte`);
  return [...p, ...plausible(q.text)];
}

// ─── div_probleme ───────────────────────────────────────────────────────────

function corrigerPaquets(q: Q): string[] {
  const ns = nombresTexte(q.text);
  if (ns.length !== 2) return [`deux quantités attendues, lues : ${ns.join(", ")}`];
  const [a, b] = ns;
  const communs = diviseurs(a).filter((d) => b % d === 0);
  const juste = communs[communs.length - 1];
  const p: string[] = [];
  if (juste !== pgcd(a, b)) p.push("incohérence interne du correcteur");
  if (Number(q.expected[0]) !== juste) p.push(`attendu « ${q.expected[0]} », le plus grand diviseur commun à ${a} et ${b} est ${juste}`);
  if (a / juste < 2 || b / juste < 2) p.push(`un lot ne contiendrait qu'un objet d'une sorte (${a / juste} et ${b / juste})`);
  return p;
}

function corrigerEngrenages(q: Q): string[] {
  const ns = nombresTexte(q.text);
  if (ns.length !== 2) return [`deux périodes attendues, lues : ${ns.join(", ")}`];
  const [a, b] = ns;
  let t = 1;
  while (t % a !== 0 || t % b !== 0) t++;
  const u = q.text.match(/combien (?:de |d')(minutes|secondes|heures|jours)/i)?.[1] ?? q.text.match(/nombre (?:de |d')(minutes|secondes|heures|jours)/)?.[1];
  const p: string[] = [];
  if (!u) p.push("l'unité demandée est illisible");
  if (!new RegExp(`^${t} ${u}$`).test(q.expected[0])) p.push(`attendu « ${q.expected[0]} », il faut ${t} ${u}`);
  for (const e of q.expected) if (Number(e.match(/^\d+/)?.[0]) !== t) p.push(`réponse acceptée « ${e} » ≠ ${t}`);
  if ((u === "heures" && t > 48) || (u === "jours" && t > 60)) p.push(`${t} ${u} : peu plausible`);
  return p;
}

// ─── div_defi ───────────────────────────────────────────────────────────────

function corrigerQuelCritere(q: Q): string[] {
  const n = Math.max(...nombresTexte(q.text));
  const vrais = [2, 3, 5, 9, 10].filter((x) => n % x === 0);
  return [...qcmUnique(q, (c) => memes(ensembleAnnonce(c), vrais)), ...plausible(q.text)];
}

function corrigerChiffreManquant(q: Q): string[] {
  // « 36?1 » ou « 457? » — pas le « ? » seul de « le ? ».
  const m = q.text.match(/(\d+)\?(\d*)/);
  if (!m) return ["nombre à trou illisible"];
  const par = Number(q.text.match(/(?:de|par) (3|9)\b/)?.[1]);
  if (!par) return ["diviseur illisible"];
  const possibles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((c) => Number(`${m[1]}${c}${m[2]}`) % par === 0);
  const p: string[] = [];
  const plusPetit = /plus petit/.test(q.text);
  if (!possibles.length) p.push("aucun chiffre ne convient");
  else if (!plusPetit && possibles.length > 1) p.push(`plusieurs chiffres conviennent (${possibles.join(", ")}) : il faut demander le plus petit`);
  if (Number(q.expected[0]) !== possibles[0]) p.push(`attendu « ${q.expected[0]} », le plus petit chiffre qui convient est ${possibles[0]}`);
  return [...p, ...plausible(q.text)];
}

/** Éprouve une affirmation générale sur les entiers de 1 à 2 000 (la phrase est relue, pas la table du gabarit). */
function eprouver(phrase: string): boolean | null {
  const N = Array.from({ length: 2000 }, (_, i) => i + 1);
  const somme = (x: number) => String(x).split("").reduce((s, c) => s + Number(c), 0);
  let m: RegExpMatchArray | null;
  if ((m = phrase.match(/^Tout multiple de (\d+) est un multiple de (\d+)\.$/)) || (m = phrase.match(/^Si un nombre est divisible par (\d+), alors il est divisible par (\d+)\.$/))) {
    const [A, B] = [Number(m[1]), Number(m[2])];
    return N.every((x) => x % A !== 0 || x % B === 0);
  }
  if ((m = phrase.match(/^Un nombre divisible par (\d+) et par (\d+) est toujours divisible par (\d+)\.$/))) {
    const [A, B, C] = m.slice(1).map(Number);
    return N.every((x) => !(x % A === 0 && x % B === 0) || x % C === 0);
  }
  if ((m = phrase.match(/^Un nombre dont la somme des chiffres vaut (\d+) est divisible par (\d+)\.$/))) {
    const [S, P] = [Number(m[1]), Number(m[2])];
    // Une somme de 30 demande au moins 3 999 : on cherche jusqu'à 99 999.
    const concernes = Array.from({ length: 99999 }, (_, i) => i + 1).filter((x) => somme(x) === S);
    return concernes.length > 0 && concernes.every((x) => x % P === 0);
  }
  if ((m = phrase.match(/^Un nombre qui se termine par (\d) est toujours divisible par (\d+)\.$/))) {
    const [U, P] = [Number(m[1]), Number(m[2])];
    return N.filter((x) => x % 10 === U).every((x) => x % P === 0);
  }
  if ((m = phrase.match(/^La (somme|différence) de deux multiples de (\d+) est toujours un multiple de (\d+)\.$/))) {
    const A = Number(m[2]);
    if (A !== Number(m[3])) return null;
    const mult = N.filter((x) => x % A === 0 && x <= 200);
    return mult.every((x) => mult.every((y) => (m![1] === "somme" ? x + y : Math.abs(x - y)) % A === 0));
  }
  if ((m = phrase.match(/^Si un nombre est divisible par (\d+), alors son double est divisible par (\d+)\.$/))) {
    const [A, B] = [Number(m[1]), Number(m[2])];
    return N.every((x) => x % A !== 0 || (2 * x) % B === 0);
  }
  if ((m = phrase.match(/^Le reste de la division euclidienne d'un entier par (\d+) peut valoir (\d+)\.$/))) {
    const [A, R] = [Number(m[1]), Number(m[2])];
    return N.some((x) => x % A === R);
  }
  if ((m = phrase.match(/^Le produit de n'importe quel entier par (\d+) est un multiple de (\d+)\.$/))) {
    const [A, B] = [Number(m[1]), Number(m[2])];
    return N.every((x) => (x * A) % B === 0);
  }
  if (phrase === "Tout nombre entier plus grand que 1 a au moins deux diviseurs.") return N.filter((x) => x > 1).every((x) => diviseurs(x).length >= 2);
  if (phrase === "La somme de deux nombres impairs est un nombre impair.") return [1, 3, 5, 7, 9].every((x) => [1, 3, 5, 7, 9].every((y) => (x + y) % 2 === 1));
  if (phrase === "Si la somme des chiffres d'un nombre est divisible par 3, alors ce nombre est divisible par 9.") return N.every((x) => somme(x) % 3 !== 0 || x % 9 === 0);
  if (phrase === "Un nombre divisible par 10 se termine toujours par 0.") return N.every((x) => x % 10 !== 0 || String(x).endsWith("0"));
  return null;
}

function corrigerVraiFaux(q: Q): string[] {
  const phrase = q.text.match(/« (.+?) »/)?.[1];
  if (!phrase) return ["affirmation illisible"];
  const v = eprouver(phrase);
  if (v == null) return [`affirmation inconnue du correcteur : « ${phrase} »`];
  return qcmUnique(q, (c) => c === (v ? "vrai" : "faux"));
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "4e_div_multiple_diviseur_tpl_1_reconnaitre": corrigerReconnaitre,
  "4e_div_multiple_diviseur_tpl_2_tester": corrigerTesterMultiple,
  "4e_div_critere_2_5_10_tpl_1_lequel": corrigerCriteres([2, 5, 10]),
  "4e_div_critere_2_5_10_tpl_2_unite_manquante": corrigerUniteManquante,
  "4e_div_critere_3_9_tpl_1_somme": corrigerCriteres([3, 9]),
  "4e_div_critere_3_9_tpl_2_lequel": corrigerLequel39,
  "4e_div_euclidienne_tpl_1_quotient_reste": corrigerQuotientReste,
  "4e_div_euclidienne_tpl_2_egalite": corrigerEgalite,
  "4e_div_lister_diviseurs_tpl_1_combien": corrigerCombienDiviseurs,
  "4e_div_lister_diviseurs_tpl_2_intrus": corrigerIntrus,
  "4e_div_probleme_tpl_1_paquets": corrigerPaquets,
  "4e_div_probleme_tpl_2_engrenages": corrigerEngrenages,
  "4e_div_defi_tpl_1_quel_critere": corrigerQuelCritere,
  "4e_div_defi_tpl_2_chiffre_manquant": corrigerChiffreManquant,
  "4e_div_defi_tpl_3_vrai_ou_faux": corrigerVraiFaux,
});
