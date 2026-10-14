import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE algorithmique.bank.ts (5e : algo_programmation et
// algo_construire), 13/10/2026.
//
// ⭐ Un INTERPRÈTE INDÉPENDANT de celui de la banque. Il relit le programme
// écrit DANS LE TEXTE (« mettre score à 3 » ; « répéter 4 fois [ajouter 1 à
// score] » ; « si n est pair alors [dire “…”] sinon […] » ; « demander “…” et
// attendre »), les valeurs données (« x vaut 7 », « Léa répond 12, puis 5 »),
// les modifications (« On remplace « A » par « B » »), puis l'EXÉCUTE et
// compare avec la réponse attendue. Il relit aussi les blocs du canvas et
// vérifie qu'ils montrent le même programme que le texte — jamais la réponse.
// Les formules proposées en QCM sont éprouvées sur plusieurs valeurs ; les
// polygones et les formules de géométrie ont leur propre table ici.
// Vide = juste.

type Q = TutorGeneratedQuestionV4;
type Env = Record<string, number>;
type Ins =
  | { k: "set"; v: string; e: string }
  | { k: "add"; v: string; e: string }
  | { k: "rep"; n: number; corps: Ins[] }
  | { k: "si"; c: string; alors: Ins[]; sinon?: Ins[] }
  | { k: "dire"; t: string }
  | { k: "direv"; v: string }
  | { k: "avancer"; n: number }
  | { k: "tourner"; n: number }
  | { k: "demander"; t: string }
  | { k: "stylo" };

const num = (s: string) => Number(String(s).trim().replace(/−/g, "-").replace(",", "."));

// ─── expressions et conditions ──────────────────────────────────────────────

function evalExpr(s: string, env: Env): number {
  const src = s.replace(/−/g, "-").replace(/\s+/g, "");
  const toks = src.match(/\d+(?:[.,]\d+)?|[\p{L}_][\p{L}\d_]*|[×*÷+\-()]/gu) ?? [];
  if (toks.join("") !== src) throw new Error(`expression illisible : ${s}`);
  let i = 0;
  const prim = (): number => {
    const t = toks[i++];
    if (t === "(") {
      const v = somme();
      if (toks[i++] !== ")") throw new Error(`parenthèse non fermée : ${s}`);
      return v;
    }
    if (t === "-") return -prim();
    if (t === undefined) throw new Error(`expression incomplète : ${s}`);
    if (/^\d/.test(t)) return Number(t.replace(",", "."));
    if (!(t in env)) throw new Error(`variable ${t} sans valeur`);
    return env[t];
  };
  const produit = (): number => {
    let v = prim();
    while (toks[i] === "×" || toks[i] === "*" || toks[i] === "÷") {
      const o = toks[i++];
      const w = prim();
      v = o === "÷" ? v / w : v * w;
    }
    return v;
  };
  const somme = (): number => {
    let v = produit();
    while (toks[i] === "+" || toks[i] === "-") {
      const o = toks[i++];
      const w = produit();
      v = o === "+" ? v + w : v - w;
    }
    return v;
  };
  const v = somme();
  if (i !== toks.length) throw new Error(`expression illisible : ${s}`);
  return v;
}

function evalCond(c: string, env: Env): boolean {
  let m: RegExpMatchArray | null;
  const val = (v: string) => {
    if (!(v in env)) throw new Error(`variable ${v} sans valeur`);
    return env[v];
  };
  if ((m = c.trim().match(/^([\p{L}]+) est (pair|impair)$/u))) return (val(m[1]) % 2 === 0) === (m[2] === "pair");
  if ((m = c.trim().match(/^([\p{L}]+) est un multiple de (\d+)$/u))) return val(m[1]) % Number(m[2]) === 0;
  if ((m = c.trim().match(/^(.+?) (>|<|=) (.+)$/))) {
    const a = evalExpr(m[1], env), b = evalExpr(m[3], env);
    return m[2] === ">" ? a > b : m[2] === "<" ? a < b : Math.abs(a - b) < 1e-9;
  }
  throw new Error(`condition illisible : ${c}`);
}

// ─── lecture du programme écrit ─────────────────────────────────────────────

function fermant(s: string, ouvre: number): number {
  let d = 0;
  for (let i = ouvre; i < s.length; i++) {
    if (s[i] === "[") d++;
    else if (s[i] === "]" && --d === 0) return i;
  }
  throw new Error(`crochet non fermé : ${s}`);
}

/** Coupe « a ; b ; c » au niveau 0 (hors crochets et hors guillemets “ ”). */
function couper(s: string): string[] {
  const r: string[] = [];
  let d = 0, q = false, debut = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "“") q = true;
    else if (ch === "”") q = false;
    else if (!q && ch === "[") d++;
    else if (!q && ch === "]") d--;
    else if (!q && d === 0 && s.startsWith(" ; ", i)) {
      r.push(s.slice(debut, i));
      debut = i + 3;
      i += 2;
    }
  }
  r.push(s.slice(debut));
  return r.map((x) => x.trim()).filter(Boolean);
}

const corpsDe = (s: string) => couper(s).map(lireIns);

function lireIns(s0: string): Ins {
  const s = s0.trim();
  let m: RegExpMatchArray | null;
  if ((m = s.match(/^mettre (\S+) à (.+)$/))) return { k: "set", v: m[1], e: m[2] };
  if ((m = s.match(/^ajouter (\d+) à (\S+)$/))) return { k: "add", v: m[2], e: m[1] };
  if ((m = s.match(/^répéter (\d+) fois \[/))) {
    const o = s.indexOf("[");
    if (fermant(s, o) !== s.length - 1) throw new Error(`boucle illisible : ${s}`);
    return { k: "rep", n: Number(m[1]), corps: corpsDe(s.slice(o + 1, -1)) };
  }
  if (s.startsWith("si ")) {
    const ia = s.indexOf(" alors [");
    if (ia < 0) throw new Error(`« si » sans « alors » : ${s}`);
    const fa = fermant(s, ia + 7);
    const alors = corpsDe(s.slice(ia + 8, fa));
    const reste = s.slice(fa + 1);
    if (!reste) return { k: "si", c: s.slice(3, ia), alors };
    if (!reste.startsWith(" sinon [") || fermant(s, fa + 8) !== s.length - 1) throw new Error(`« sinon » illisible : ${s}`);
    return { k: "si", c: s.slice(3, ia), alors, sinon: corpsDe(s.slice(fa + 9, -1)) };
  }
  if ((m = s.match(/^demander “(.*)” et attendre$/))) return { k: "demander", t: m[1] };
  if ((m = s.match(/^dire “(.*)”$/))) return { k: "dire", t: m[1] };
  if ((m = s.match(/^dire ([\p{L}]+)$/u))) return { k: "direv", v: m[1] };
  if ((m = s.match(/^avancer de (\d+) pas$/))) return { k: "avancer", n: Number(m[1]) };
  if ((m = s.match(/^tourner de (\d+)°$/))) return { k: "tourner", n: Number(m[1]) };
  if (s === "stylo en position d’écriture") return { k: "stylo" };
  throw new Error(`instruction illisible : ${s}`);
}

/** Les suites « « … » ; « … » » du texte, lues comme des programmes (null si ce n'en est pas un). */
function chaines(t: string): { brut: string; items: string[]; prog: Ins[] | null }[] {
  return [...t.matchAll(/« [^«»]+ »(?: ; « [^«»]+ »)*/g)].map((m) => {
    const items = [...m[0].matchAll(/« ([^«»]+) »/g)].map((x) => x[1]);
    let prog: Ins[] | null;
    try {
      prog = items.map(lireIns);
    } catch {
      prog = null;
    }
    return { brut: m[0], items, prog };
  });
}

function programme(t: string): Ins[] {
  const c = chaines(t).find((x) => x.prog);
  if (!c) throw new Error("aucun programme lisible dans le texte");
  return c.prog!;
}

// ─── lecture du canvas ──────────────────────────────────────────────────────

function depuisCanvas(q: Q): Ins[] | null {
  const c = q.canvas as any;
  if (!c || c.kind !== "scratch") return null;
  const vars = new Set<string>();
  const noter = (bs: any[]) =>
    bs.forEach((b) => {
      if (b.type === "set_variable" || b.type === "change_variable") vars.add(b.variable);
      for (const k of ["children", "elseChildren"]) if (b[k]) noter(b[k]);
    });
  noter(c.blocks);
  const lire = (bs: any[]): Ins[] =>
    bs.flatMap((b): Ins[] => {
      switch (b.type) {
        case "event":
          return [];
        case "ask":
          return [{ k: "demander", t: b.text }];
        case "pen":
          return [{ k: "stylo" }];
        case "set_variable":
          return [{ k: "set", v: b.variable, e: String(b.value) }];
        case "change_variable":
          return [{ k: "add", v: b.variable, e: String(b.value) }];
        case "repeat":
          return [{ k: "rep", n: Number(b.times), corps: lire(b.children ?? []) }];
        case "if":
          return [{ k: "si", c: b.condition, alors: lire(b.children ?? []) }];
        case "if_else":
          return [{ k: "si", c: b.condition, alors: lire(b.children ?? []), sinon: lire(b.elseChildren ?? []) }];
        case "say":
          return [vars.has(b.text) ? { k: "direv", v: b.text } : { k: "dire", t: b.text }];
        case "move":
          return [{ k: "avancer", n: Number(b.value) }];
        case "turn":
          return [{ k: "tourner", n: Number(b.value) }];
      }
      throw new Error(`bloc inconnu : ${b.type}`);
    });
  return lire(c.blocks);
}

const norm = (s: string) => String(s).replace(/-/g, "−").replace(/\s+/g, " ").trim();
function ser(p: Ins[]): string {
  return p
    .map((i): string => {
      switch (i.k) {
        case "set": return `mettre ${i.v} à ${norm(i.e)}`;
        case "add": return `ajouter ${norm(i.e)} à ${i.v}`;
        case "rep": return `répéter ${i.n} fois [${ser(i.corps)}]`;
        case "si": return `si ${norm(i.c)} alors [${ser(i.alors)}]${i.sinon ? ` sinon [${ser(i.sinon)}]` : ""}`;
        case "dire": return `dire “${i.t}”`;
        case "direv": return `dire ${i.v}`;
        case "avancer": return `avancer de ${i.n} pas`;
        case "tourner": return `tourner de ${i.n}°`;
        case "demander": return `demander “${i.t}” et attendre`;
        case "stylo": return "stylo en position d’écriture";
      }
    })
    .join(" ; ");
}

/** Le canvas montre-t-il exactement ce programme ? */
function memeCanvas(q: Q, attendu: Ins[]): string[] {
  let c: Ins[] | null;
  try {
    c = depuisCanvas(q);
  } catch (e) {
    return [(e as Error).message];
  }
  if (!c) return ["pas de canvas Scratch"];
  return ser(c) === ser(attendu) ? [] : [`le canvas montre « ${ser(c)} » au lieu de « ${ser(attendu)} »`];
}

// ─── exécution ──────────────────────────────────────────────────────────────

type Etat = { env: Env; dits: string[]; dist: number; angle: number; min: number; max: number };

function executer(p: Ins[], env0: Env = {}, reponses: number[] = []): Etat {
  const st: Etat = { env: { ...env0 }, dits: [], dist: 0, angle: 0, min: Infinity, max: -Infinity };
  const lues = [...reponses];
  const poser = (v: string, x: number) => {
    st.env[v] = x;
    st.min = Math.min(st.min, x);
    st.max = Math.max(st.max, x);
  };
  for (const [v, x] of Object.entries(env0)) poser(v, x);
  const run = (l: Ins[]) => {
    for (const i of l) {
      switch (i.k) {
        case "set": poser(i.v, evalExpr(i.e, st.env)); break;
        case "add":
          if (!(i.v in st.env)) throw new Error(`variable ${i.v} sans valeur`);
          poser(i.v, st.env[i.v] + evalExpr(i.e, st.env));
          break;
        case "rep": for (let t = 0; t < i.n; t++) run(i.corps); break;
        case "si": run(evalCond(i.c, st.env) ? i.alors : i.sinon ?? []); break;
        case "dire": st.dits.push(i.t); break;
        case "direv":
          if (!(i.v in st.env)) throw new Error(`variable ${i.v} sans valeur`);
          st.dits.push(String(st.env[i.v]));
          break;
        case "avancer": st.dist += i.n; break;
        case "tourner": st.angle += i.n; break;
        case "demander": {
          const r = lues.shift();
          if (r === undefined) throw new Error("le texte ne donne pas la réponse tapée");
          poser("réponse", r);
          break;
        }
        case "stylo": break;
      }
    }
  };
  run(p);
  return st;
}

// ─── ce que dit le texte ────────────────────────────────────────────────────

/** Les valeurs données en clair, hors programme : « x vaut 7 », « a vaut 2 et b vaut 5 ». */
function donnees(t: string): Env {
  const sans = t.replace(/“[^”]*”/g, " ").replace(/«[^»]*»/g, " ");
  const env: Env = {};
  for (const m of sans.matchAll(/([\p{L}]+) vaut (\d+)/gu)) env[m[1]] = num(m[2]);
  return env;
}

/** Ce que tape l'utilisateur : « Léa répond 12. », « Hugo tape 7, puis 3. ». */
function reponsesTapees(t: string): number[] {
  const m = t.replace(/«[^»]*»/g, " ").match(/(?:répond|tape|saisit) (\d+)(?:, puis (\d+))?/);
  return m ? [num(m[1]), ...(m[2] ? [num(m[2])] : [])] : [];
}

/** La dernière phrase (la question). */
const question = (t: string) => {
  const s = t.trim().split(/(?<=[.?!»”)])\s+(?=[A-ZÀÂÉÈÊÎÔÛÇ«“])/);
  return s[s.length - 1];
};

/** Ce que doit répondre l'élève, d'après l'état final et la question. */
function reponseJuste(q: Q, st: Etat): string | number {
  const Qn = question(q.text);
  let m: RegExpMatchArray | null;
  if ((m = Qn.match(/Le lutin dit-il “(.+)” \?/))) return st.dits.includes(m[1]) ? "oui" : "non";
  if (/Que dit le lutin|Quel message/.test(Qn)) {
    if (st.dits.length > 1) throw new Error(`plusieurs messages dits : ${st.dits.join(", ")}`);
    return st.dits[0] ?? "il ne dit rien";
  }
  if ((m = Qn.match(/Combien de fois le lutin dit-il “(.+)”/))) return st.dits.filter((d) => d === m![1]).length;
  if (/Quel nombre (?:le lutin dit-il|s’affiche)|sortie du programme/.test(Qn)) {
    const nums = st.dits.filter((d) => /^\d+$/.test(d));
    if (!nums.length) throw new Error("le lutin ne dit aucun nombre");
    if (!/à la fin/.test(Qn) && nums.length > 1) throw new Error("plusieurs nombres dits : la question est ambiguë");
    return num(nums[nums.length - 1]);
  }
  if (/de pas|en pas/.test(Qn)) return st.dist;
  if ((m = Qn.match(/(?:valeur de la variable |Que vaut |Combien vaut |Que contient la variable )([\p{L}]+)/u))) {
    if (!(m[1] in st.env)) throw new Error(`variable ${m[1]} inconnue`);
    return st.env[m[1]];
  }
  throw new Error(`question non reconnue : ${Qn}`);
}

/** La réponse attendue est-elle la bonne ? (nombre, ou proposition unique en QCM) */
function verifier(q: Q, juste: string | number): string[] {
  if (typeof juste === "number") {
    const p: string[] = [];
    if (!q.expected.length || q.expected.some((e) => num(e) !== juste)) p.push(`attendu « ${q.expected.join(" / ")} », l'exécution donne ${juste}`);
    if (q.format === "qcm") p.push(...qcmUnique(q, (c) => num(c) === juste));
    return p;
  }
  return q.format === "qcm"
    ? qcmUnique(q, (c) => c === juste)
    : q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », l'exécution donne « ${juste} »`];
}

function plausible(st: Etat): string[] {
  const p: string[] = [];
  if (st.max > 999) p.push(`valeur ${st.max} : peu plausible`);
  if (st.min < 0) p.push(`valeur négative ${st.min}`);
  return p;
}

/** Les valeurs données, écrites en blocs « mettre » (en tête du canvas). */
const blocsDonnees = (env: Env): Ins[] => Object.entries(env).map(([v, n]) => ({ k: "set" as const, v, e: String(n) }));

/** Le correcteur commun : on exécute le programme du texte (valeurs données, réponses tapées) et on compare. */
function parExecution(q: Q): string[] {
  try {
    const env = donnees(q.text);
    const prog = programme(q.text);
    const st = executer(prog, env, reponsesTapees(q.text));
    return [...verifier(q, reponseJuste(q, st)), ...plausible(st), ...memeCanvas(q, [...blocsDonnees(env), ...prog])];
  } catch (e) {
    return [(e as Error).message];
  }
}

// ─── algo_sequence ──────────────────────────────────────────────────────────

const RANGS: Record<string, number> = { premier: 0, deuxième: 1, troisième: 2, quatrième: 3 };

/** « Quelle action en deuxième ? », « en dernier ? », « juste après « X » ? » : on relit l'ordre. */
function corrigerOrdre(q: Q): string[] {
  try {
    const prog = programme(q.text);
    const txts = prog.map((i) => ser([i]));
    const Qn = question(q.text);
    let m: RegExpMatchArray | null;
    let idx: number;
    if ((m = Qn.match(/juste après « (.+?) »/))) {
      const j = txts.indexOf(norm(m[1]));
      if (j < 0 || txts.indexOf(norm(m[1]), j + 1) >= 0) return [`le bloc « ${m[1]} » n'est pas une seule fois dans le programme`];
      idx = j + 1;
    } else if (/en dernier/.test(Qn)) idx = txts.length - 1;
    else if ((m = Qn.match(/en (premier|deuxième|troisième|quatrième)/))) idx = RANGS[m[1]];
    else return [`question non reconnue : ${Qn}`];
    if (idx >= txts.length) return ["ce rang n'existe pas dans le programme"];
    if (new Set(txts).size !== txts.length) return ["deux blocs identiques : la question est ambiguë"];
    return [...qcmUnique(q, (c) => norm(c) === norm(txts[idx])), ...memeCanvas(q, prog)];
  } catch (e) {
    return [(e as Error).message];
  }
}

// ─── algo_entree_sortie ─────────────────────────────────────────────────────

/** L'entrée est le bloc « demander », la sortie le bloc « dire ». */
function corrigerRole(q: Q): string[] {
  try {
    const prog = programme(q.text);
    const Qn = question(q.text);
    const cherche = /sortie|affiche un résultat|donne-t-il/.test(Qn) ? "dire" : /entrée|récupère|reçoit/.test(Qn) ? "demander" : null;
    if (!cherche) return [`question non reconnue : ${Qn}`];
    const bons = prog.filter((i) => (cherche === "dire" ? i.k === "dire" || i.k === "direv" : i.k === "demander"));
    if (bons.length !== 1) return [`${bons.length} bloc(s) « ${cherche} » : la question est ambiguë`];
    return [...qcmUnique(q, (c) => norm(c) === norm(ser(bons))), ...memeCanvas(q, prog)];
  } catch (e) {
    return [(e as Error).message];
  }
}

/** « Le lutin dit 23. Quel nombre a-t-il tapé ? » : on essaie toutes les entrées de 0 à 500. */
function corrigerRetrouverEntree(q: Q): string[] {
  try {
    const prog = programme(q.text);
    const dit = q.text.match(/le lutin dit (\d+)\./)?.[1];
    if (!dit) return ["sortie illisible"];
    const sol: number[] = [];
    for (let r = 0; r <= 500; r++) {
      const st = executer(prog, {}, [r]);
      if (st.dits.length === 1 && st.dits[0] === dit) sol.push(r);
    }
    const p: string[] = [];
    if (sol.length !== 1) p.push(`${sol.length} entrée(s) donnent ${dit} : ${sol.join(", ")}`);
    else if (num(q.expected[0]) !== sol[0]) p.push(`attendu ${q.expected[0]}, l'entrée qui donne ${dit} est ${sol[0]}`);
    return [...p, ...memeCanvas(q, prog)];
  } catch (e) {
    return [(e as Error).message];
  }
}

// ─── algo_expression_valeur ─────────────────────────────────────────────────

/** « x vaut 4. Que vaut « 3 × x + 2 » ? » : on évalue l'expression du texte avec les valeurs données. */
function corrigerExpression(q: Q): string[] {
  try {
    const env = donnees(q.text);
    const exprs = chaines(q.text).filter((c) => !c.prog).flatMap((c) => c.items);
    if (exprs.length !== 1) return [`${exprs.length} expression(s) dans le texte au lieu d'une`];
    const val = evalExpr(exprs[0], env);
    const p: string[] = [];
    if (!Number.isInteger(val) || val < 0 || val > 999) p.push(`valeur ${val} peu plausible`);
    return [...p, ...verifier(q, val), ...memeCanvas(q, [...blocsDonnees(env), { k: "dire", t: exprs[0] }])];
  } catch (e) {
    return [(e as Error).message];
  }
}

// ─── algo_prevoir_expression ────────────────────────────────────────────────

/** La sortie (dernier nombre dit) du programme pour l'entrée L = x. */
function sortie(prog: Ins[], L: string, x: number): number {
  const st = executer(prog, { [L]: x });
  if (!st.dits.length) throw new Error("le programme ne dit rien");
  return num(st.dits[st.dits.length - 1]);
}

/** « Quelle formule correspond au programme ? » : chaque formule proposée est éprouvée sur plusieurs entrées. */
function corrigerFormuleProgramme(q: Q): string[] {
  try {
    const prog = programme(q.text);
    const L = q.text.match(/nombre de départ est dans la variable ([\p{L}]+)/u)?.[1];
    if (!L) return ["variable de départ illisible"];
    const essais = [2.5, 3, 7, 11, 20];
    const attendu = essais.map((x) => sortie(prog, L, x));
    const traduit = (c: string) => {
      try {
        return essais.every((x, i) => Math.abs(evalExpr(c, { [L]: x }) - attendu[i]) < 1e-9);
      } catch {
        return false;
      }
    };
    return [...qcmUnique(q, traduit), ...memeCanvas(q, prog)];
  } catch (e) {
    return [(e as Error).message];
  }
}

/** Deux programmes A et B, la même entrée : lequel dit le plus grand (le plus petit) nombre ? */
function corrigerComparer(q: Q): string[] {
  try {
    const cs = chaines(q.text).filter((c) => c.prog);
    if (cs.length !== 2) return [`${cs.length} programme(s) lisible(s) au lieu de deux`];
    const env = donnees(q.text);
    const [sa, sb] = cs.map((c) => executer(c.prog!, env));
    const va = num(sa.dits[sa.dits.length - 1]);
    const vb = num(sb.dits[sb.dits.length - 1]);
    const Qn = question(q.text);
    const grand = /plus grand/.test(Qn) ? true : /plus petit/.test(Qn) ? false : null;
    if (grand === null) return [`question non reconnue : ${Qn}`];
    const juste = va === vb ? "ils disent le même nombre" : (va > vb) === grand ? "le programme A" : "le programme B";
    return [...qcmUnique(q, (c) => c === juste), ...plausible(sa), ...plausible(sb)];
  } catch (e) {
    return [(e as Error).message];
  }
}

// ─── algo_formule_bloc ──────────────────────────────────────────────────────

/** La table propre au correcteur : ce que la phrase demande de calculer, en fonction de la variable. */
function calculDecrit(t: string): { v: string; f: (x: number) => number } | null {
  let m: RegExpMatchArray | null;
  // « Le programme doit ajouter 4 à score. »
  if ((m = t.match(/Le programme doit (.+?)\. /))) {
    const d = m[1];
    let r: RegExpMatchArray | null;
    if ((r = d.match(/^ajouter (\d+) à (\S+)$/))) return { v: r[2], f: (x) => x + Number(r![1]) };
    if ((r = d.match(/^augmenter (\S+) de (\d+)$/))) return { v: r[1], f: (x) => x + Number(r![2]) };
    if ((r = d.match(/^enlever (\d+) à (\S+)$/))) return { v: r[2], f: (x) => x - Number(r![1]) };
    if ((r = d.match(/^diminuer (\S+) de (\d+)$/))) return { v: r[1], f: (x) => x - Number(r![2]) };
    if ((r = d.match(/^multiplier (\S+) par (\d+)$/))) return { v: r[1], f: (x) => x * Number(r![2]) };
    if ((r = d.match(/^doubler (\S+)$/))) return { v: r[1], f: (x) => 2 * x };
    if ((r = d.match(/^tripler (\S+)$/))) return { v: r[1], f: (x) => 3 * x };
    return null;
  }
  // « Programme de calcul : choisir un nombre x, multiplier par 3, puis ajouter 5. »
  if ((m = t.match(/choisir un nombre ([\p{L}]+), (.+?)\. /u))) {
    const etapes = m[2].split(", puis ").map((e) => {
      const r = e.match(/^(multiplier(?: le résultat)? par|ajouter|soustraire) (\d+)$/);
      if (!r) throw new Error(`étape illisible : ${e}`);
      const n = Number(r[2]);
      return r[1].startsWith("multiplier") ? (x: number) => x * n : r[1] === "ajouter" ? (x: number) => x + n : (x: number) => x - n;
    });
    return { v: m[1], f: (x) => etapes.reduce((acc, g) => g(acc), x) };
  }
  // Géométrie et comptage.
  const GEO: [RegExp, (x: number, n: number) => number][] = [
    [/l’aire d’un rectangle de longueur ([\p{L}]+) et de largeur (\d+)/u, (x, n) => x * n],
    [/le périmètre d’un rectangle de longueur ([\p{L}]+) et de largeur (\d+)/u, (x, n) => 2 * (x + n)],
    [/le périmètre d’un carré de côté ([\p{L}]+)/u, (x) => 4 * x],
    [/l’aire d’un carré de côté ([\p{L}]+)/u, (x) => x * x],
    [/le périmètre d’un triangle équilatéral de côté ([\p{L}]+)/u, (x) => 3 * x],
    [/le périmètre d’un hexagone régulier de côté ([\p{L}]+)/u, (x) => 6 * x],
    [/le nombre de roues de ([\p{L}]+) vélos/u, (x) => 2 * x],
    [/le nombre de roues de ([\p{L}]+) voitures/u, (x) => 4 * x],
    [/le nombre de pattes de ([\p{L}]+) araignées/u, (x) => 8 * x],
    [/le nombre de pattes de ([\p{L}]+) poules/u, (x) => 2 * x],
  ];
  for (const [re, g] of GEO) {
    const r = t.match(re);
    if (r) return { v: r[1], f: (x) => g(x, Number(r[2] ?? 0)) };
  }
  return null;
}

/** La formule proposée calcule-t-elle ce que la phrase demande ? (éprouvée sur plusieurs valeurs) */
function corrigerFormuleDecrite(q: Q): string[] {
  try {
    const c = calculDecrit(q.text);
    if (!c) return ["calcul demandé illisible"];
    const essais = [2.5, 3, 7, 11, 20];
    return qcmUnique(q, (ch) => {
      try {
        return essais.every((x) => Math.abs(evalExpr(ch, { [c.v]: x }) - c.f(x)) < 1e-9);
      } catch {
        return false;
      }
    });
  } catch (e) {
    return [(e as Error).message];
  }
}

// ─── algo_parametre ─────────────────────────────────────────────────────────

/** « On remplace « A » par « B » » : A doit être une seule fois dans le programme ; on exécute le programme modifié. */
function corrigerModifier(q: Q): string[] {
  try {
    const prog = programme(q.text);
    const env = donnees(q.text);
    const m = q.text.match(/remplace « (.+?) » par « (.+?) »/);
    if (!m) return ["modification illisible"];
    const s = ser(prog);
    const a = norm(m[1]);
    const fois = s.split(a).length - 1;
    if (fois !== 1) return [`« ${m[1]} » est ${fois} fois dans le programme`];
    if (a === norm(m[2])) return ["la modification ne change rien"];
    const apres = couper(s.replace(a, norm(m[2]))).map(lireIns);
    const st = executer(apres, env);
    return [...verifier(q, reponseJuste(q, st)), ...plausible(st), ...plausible(executer(prog, env)), ...memeCanvas(q, [...blocsDonnees(env), ...prog])];
  } catch (e) {
    return [(e as Error).message];
  }
}

/** Les polygones réguliers (table du correcteur). */
const COTES: Record<string, number> = {
  "un triangle équilatéral": 3, "un carré": 4, "un pentagone régulier": 5, "un hexagone régulier": 6,
  "un octogone régulier": 8, "un décagone régulier": 10, "un dodécagone régulier": 12,
};

/** Le programme « répéter n fois [avancer ; tourner] » trace-t-il ce polygone ? */
function tracePolygone(prog: Ins[], nom: string): string[] {
  const r = prog.find((i) => i.k === "rep") as Extract<Ins, { k: "rep" }> | undefined;
  const t = r?.corps.find((i) => i.k === "tourner") as { n: number } | undefined;
  const n = COTES[nom];
  if (!n) return [`polygone inconnu : ${nom}`];
  if (!r || !t || r.n !== n || r.n * t.n !== 360) return [`le programme ne trace pas ${nom}`];
  return [];
}

/** « Il veut maintenant tracer un hexagone régulier. Quels paramètres ? » */
function corrigerPolygoneParam(q: Q): string[] {
  try {
    const prog = programme(q.text);
    const nom1 = q.text.match(/trace (un [^«]+?) avec/)?.[1];
    const nom2 = q.text.match(/veut maintenant tracer (un [^.]+)\./)?.[1];
    if (!nom1 || !nom2) return ["polygones illisibles"];
    const n2 = COTES[nom2];
    if (!n2) return [`polygone inconnu : ${nom2}`];
    const juste = (c: string) => {
      const m = c.match(/^répéter (\d+) fois, tourner de (\d+)°$/);
      return !!m && Number(m[1]) === n2 && Number(m[1]) * Number(m[2]) === 360;
    };
    return [...tracePolygone(prog, nom1), ...qcmUnique(q, juste), ...memeCanvas(q, prog)];
  } catch (e) {
    return [(e as Error).message];
  }
}

// ─── algo_test_condition ────────────────────────────────────────────────────

/** La condition testée (entre “ ”) la plus à droite du texte. */
function conditionTestee(t: string): string | null {
  const cs = [...t.matchAll(/“([^”]*(?: > | < | = |est pair|est impair|multiple de)[^”]*)”/g)].map((m) => m[1]);
  return cs.length ? cs[cs.length - 1] : null;
}

/** « score vaut 7. La condition “score > 5” est-elle vraie ? » — ou un programme écrit, qu'on exécute. */
function corrigerTest(q: Q): string[] {
  if (chaines(q.text).some((c) => c.prog)) return parExecution(q);
  try {
    const env = donnees(q.text);
    const c = conditionTestee(q.text);
    if (!c) return ["condition illisible"];
    const Qn = question(q.text);
    if (!/vraie \?|vrai ou faux|réussi \?/i.test(Qn)) return [`question non reconnue : ${Qn}`];
    const ok = evalCond(c, env);
    const [oui, non] = (q.choices ?? []).includes("oui") ? ["oui", "non"] : ["vrai", "faux"];
    const p = qcmUnique(q, (ch) => ch === (ok ? oui : non));
    // Le canvas : les valeurs données, puis le test du texte.
    const cv = depuisCanvas(q) ?? [];
    const si = cv.find((i) => i.k === "si") as Extract<Ins, { k: "si" }> | undefined;
    if (!si) p.push("pas de test dans le canvas");
    else p.push(...memeCanvas(q, [...blocsDonnees(env), { ...si, c }]));
    return p;
  } catch (e) {
    return [(e as Error).message];
  }
}

// ─── algo_boucle ────────────────────────────────────────────────────────────

/** « Combien de fois faut-il répéter la boucle ? » : on essaie 0 à 200 tours. */
function corrigerRetrouverRep(q: Q): string[] {
  try {
    const prog = programme(q.text);
    if (prog.length !== 1) return ["le corps de la boucle est illisible"];
    const ins = prog[0];
    const env = donnees(q.text);
    let m: RegExpMatchArray | null;
    let atteint: (st: Etat) => boolean;
    if ((m = q.text.match(/parcourir (\d+) pas en tout/))) {
      const T = Number(m[1]);
      atteint = (st) => st.dist === T;
    } else if ((m = q.text.match(/arrive à (\d+)/)) && ins.k === "add") {
      const T = Number(m[1]);
      atteint = (st) => st.env[ins.v] === T;
    } else return ["objectif illisible"];
    const sol: number[] = [];
    for (let n = 0; n <= 200; n++) if (atteint(executer([{ k: "rep", n, corps: [ins] }], env))) sol.push(n);
    if (sol.length !== 1) return [`${sol.length} nombre(s) de tours conviennent : ${sol.join(", ")}`];
    return verifier(q, sol[0]);
  } catch (e) {
    return [(e as Error).message];
  }
}

/** Combien de répétitions, quel angle, quelle figure : la table des polygones du correcteur. */
function corrigerPolygoneBoucle(q: Q): string[] {
  try {
    let m: RegExpMatchArray | null;
    if ((m = q.text.match(/Pour tracer (un [^,]+?)(?: avec une boucle)?, combien de fois/))) {
      const n = COTES[m[1]];
      return n ? verifier(q, n) : [`polygone inconnu : ${m[1]}`];
    }
    if ((m = q.text.match(/Pour tracer (un [^,]+?) avec une boucle, de combien de degrés/))) {
      const n = COTES[m[1]];
      return n ? verifier(q, 360 / n) : [`polygone inconnu : ${m[1]}`];
    }
    if (/Quelle figure/.test(question(q.text))) {
      const prog = programme(q.text);
      return [...qcmUnique(q, (c) => tracePolygone(prog, c).length === 0), ...memeCanvas(q, prog)];
    }
    return [`question non reconnue : ${question(q.text)}`];
  } catch (e) {
    return [(e as Error).message];
  }
}

// ─── algo_construire_defi ───────────────────────────────────────────────────

/** L'objectif écrit dans le texte : une distance, ou la valeur finale d'une variable. */
function objectifAtteint(t: string): ((st: Etat) => boolean) | null {
  let m: RegExpMatchArray | null;
  if ((m = t.match(/doit parcourir (\d+) pas en tout/))) {
    const T = Number(m[1]);
    return (st) => st.dist === T;
  }
  if ((m = t.match(/la variable ([\p{L}]+) doit valoir (\d+)/u))) {
    const v = m[1], T = Number(m[2]);
    return (st) => st.env[v] === T;
  }
  return null;
}

/** « Complète le programme : … « répéter ? fois […] » » : on essaie 0 à 300 à la place du « ? ». */
function corrigerCompleter(q: Q): string[] {
  try {
    const ok = objectifAtteint(q.text);
    if (!ok) return ["objectif illisible"];
    const c = chaines(q.text).find((x) => x.items.some((i) => i.includes("?") && i.trim() !== "?"));
    if (!c) return ["programme à compléter illisible"];
    if (c.items.join(" ").split("?").length !== 2) return ["il faut un seul « ? » dans le programme"];
    const sol: number[] = [];
    for (let x = 0; x <= 300; x++) {
      try {
        const prog = c.items.map((i) => lireIns(i.replace("?", String(x))));
        if (ok(executer(prog))) sol.push(x);
      } catch {
        /* nombre impossible à cette place */
      }
    }
    if (sol.length !== 1) return [`${sol.length} nombre(s) conviennent : ${sol.join(", ")}`];
    return verifier(q, sol[0]);
  } catch (e) {
    return [(e as Error).message];
  }
}

/** « Quel programme atteint l'objectif ? » : chaque proposition est exécutée. */
function corrigerChoisirProgramme(q: Q): string[] {
  const ok = objectifAtteint(q.text);
  if (!ok) return ["objectif illisible"];
  return qcmUnique(q, (ch) => {
    try {
      const prog = chaines(ch)[0]?.prog;
      return !!prog && ok(executer(prog));
    } catch {
      return false;
    }
  });
}

/** « Il veut tracer un carré. … Quelle instruction pose problème ? » */
function corrigerErreurPolygone(q: Q): string[] {
  try {
    const nom = q.text.match(/veut tracer (un [^.]+)\./)?.[1];
    if (!nom || !COTES[nom]) return [`polygone illisible : ${nom}`];
    const n = COTES[nom];
    const prog = programme(q.text);
    const r = prog.find((i) => i.k === "rep") as Extract<Ins, { k: "rep" }> | undefined;
    const t = r?.corps.find((i) => i.k === "tourner") as { n: number } | undefined;
    if (!r || !t) return ["programme de tracé illisible"];
    const fautes = [...(r.n !== n ? [`répéter ${r.n} fois`] : []), ...(t.n * n !== 360 ? [`tourner de ${t.n}°`] : [])];
    if (fautes.length !== 1) return [`${fautes.length} erreur(s) dans le programme au lieu d'une`];
    return [...qcmUnique(q, (c) => norm(c) === norm(fautes[0])), ...memeCanvas(q, prog)];
  } catch (e) {
    return [(e as Error).message];
  }
}

/** « Le programme doit dire 2 × n + 1 … Quel nombre dit-il vraiment ? » : il doit vraiment se tromper. */
function corrigerTester(q: Q): string[] {
  const p = parExecution(q);
  try {
    const m = q.text.match(/doit dire (.+?), où ([\p{L}]+) est le nombre tapé/u);
    if (!m) return [...p, "but du programme illisible"];
    const r = reponsesTapees(q.text)[0];
    const voulu = evalExpr(m[1], { [m[2]]: r });
    const st = executer(programme(q.text), {}, [r]);
    if (num(st.dits[st.dits.length - 1]) === voulu) p.push(`avec ${r}, le programme donne bien ${voulu} : il n'y a pas d'erreur à trouver`);
    return p;
  } catch (e) {
    return [...p, (e as Error).message];
  }
}

const CORRIGER: CorrecteursMaths = {
  // algo_construire_defi
  "5e_algo_defi_tpl_2_erreur_logique": corrigerErreurPolygone,
  "5e_algo_construire_defi_tpl_3_completer": corrigerCompleter,
  "5e_algo_construire_defi_tpl_4_choisir_programme": corrigerChoisirProgramme,
  "5e_algo_construire_defi_tpl_5_tester": corrigerTester,
  // algo_boucle
  "5e_algo_boucle_tpl_1_distance_totale": parExecution,
  "5e_algo_boucle_tpl_2_valeur_variable": parExecution,
  "5e_algo_boucle_tpl_3_polygone_regulier": corrigerPolygoneBoucle,
  "5e_algo_boucle_tpl_4_retrouver_repetitions": corrigerRetrouverRep,
  "5e_algo_boucle_tpl_x1": parExecution,
  // algo_test_condition
  "5e_algo_tests_tpl_1_condition_vraie": corrigerTest,
  "5e_algo_tests_tpl_2_condition_fausse": parExecution,
  "5e_algo_tests_tpl_3_resultat_variable": parExecution,
  "5e_algo_tests_tpl_4_parite": corrigerTest,
  "5e_algo_tests_tpl_5_deplacement_condition": parExecution,
  "5e_algo_test_condition_tpl_x1": parExecution,
  // algo_parametre
  "5e_algo_parametre_tpl_1_modifier_distance": corrigerModifier,
  "5e_algo_parametre_tpl_2_effet_sur_boucle": corrigerModifier,
  "5e_algo_parametre_tpl_3_changer_coefficient": corrigerModifier,
  "5e_algo_parametre_tpl_4_modifier_ajout": corrigerModifier,
  "5e_algo_parametre_tpl_x1": corrigerPolygoneParam,
  // algo_formule_bloc
  "5e_algo_formule_bloc_tpl_1_addition": corrigerFormuleDecrite,
  "5e_algo_formule_bloc_tpl_2_multiplication": corrigerFormuleDecrite,
  "5e_algo_formule_bloc_tpl_3_formule_rectangle": corrigerFormuleDecrite,
  "5e_algo_formule_bloc_tpl_4_programme_de_calcul": corrigerFormuleDecrite,
  "5e_algo_formule_bloc_tpl_x1": parExecution,
  // algo_defi
  "5e_algo_defi_tpl_1_programme_complet": parExecution,
  "5e_algo_defi_tpl_3_entree_calcul_boucle": parExecution,
  "5e_algo_defi_tpl_x1": parExecution,
  "5e_algo_defi_tpl_x2": parExecution,
  // algo_prevoir_expression
  "5e_algo_prevoir_expression_tpl_1_prevoir_resultat": parExecution,
  "5e_algo_prevoir_expression_tpl_2_reconnaitre_formule": corrigerFormuleProgramme,
  "5e_algo_prevoir_expression_tpl_3_parentheses": corrigerFormuleProgramme,
  "5e_algo_prevoir_expression_tpl_4_comparer_deux_programmes": corrigerComparer,
  "5e_algo_prevoir_expression_tpl_x1": parExecution,
  // algo_expression_valeur
  "5e_algo_expression_valeur_tpl_1_addition": corrigerExpression,
  "5e_algo_expression_valeur_tpl_2_multiplication": corrigerExpression,
  "5e_algo_expression_valeur_tpl_3_expression_deux_etapes": corrigerExpression,
  "5e_algo_expression_valeur_tpl_4_programme_calcul": parExecution,
  "5e_algo_expression_valeur_tpl_5_reponse_utilisateur": parExecution,
  "5e_algo_expression_valeur_tpl_x1": corrigerExpression,
  "5e_algo_expression_valeur_tpl_6_pieges_priorites": corrigerExpression,
  // algo_entree_sortie
  "5e_algo_entree_sortie_tpl_1_variable_reponse": parExecution,
  "5e_algo_entree_sortie_tpl_2_sortie_variable": parExecution,
  "5e_algo_entree_sortie_tpl_3_entree_calcul_sortie": parExecution,
  "5e_algo_entree_sortie_tpl_x1": parExecution,
  "5e_algo_entree_sortie_tpl_4_role": corrigerRole,
  "5e_algo_entree_sortie_tpl_5_retrouver_entree": corrigerRetrouverEntree,
  // algo_sequence
  "5e_algo_sequence_tpl_1_distance": parExecution,
  "5e_algo_sequence_tpl_2_variable_finale": parExecution,
  "5e_algo_sequence_tpl_x1": parExecution,
  "5e_algo_sequence_tpl_3_ordre": corrigerOrdre,
  "5e_algo_sequence_tpl_4_ordre_compte": parExecution,
  "5e_algo_sequence_tpl_5_deux_variables": parExecution,
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles(CORRIGER);
