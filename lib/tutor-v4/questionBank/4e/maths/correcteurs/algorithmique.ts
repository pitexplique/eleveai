import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE algorithmique.bank.ts (notion algo_programmation, 08/10/2026).
//
// ⭐ Un INTERPRÈTE INDÉPENDANT de celui du gabarit. Il relit le programme écrit
// DANS LE TEXTE (« mettre score à 3 » ; « répéter 4 fois [ajouter 1 à score] » ;
// « si vies > 0 alors [dire “…”] sinon […] »), les valeurs données (« La
// variable vies vaut 7 », « Le joueur répond 251 », « Au départ, score vaut
// 27 »), les modifications (« On remplace « A » par « B » »), puis l'EXÉCUTE et
// compare avec la réponse attendue. Il relit aussi les blocs du canvas et
// vérifie qu'ils montrent le même programme que le texte — et pas la réponse.
// Les phrases d'objectif (« vaut au moins 12 », « ne dépasse pas 30 ») sont
// traduites par sa propre table, et les conditions comparées sur les entiers :
// « score ≥ 6 » et « score > 5 » sont la MÊME condition pour un compteur.
// Vide = juste.

type Q = TutorGeneratedQuestionV4;
type Env = Record<string, number>;
type Ins =
  | { k: "set"; v: string; e: string }
  | { k: "add"; v: string; e: string }
  | { k: "rep"; n: number; corps: Ins[] }
  | { k: "jusqua"; c: string; corps: Ins[] }
  | { k: "si"; c: string; alors: Ins[]; sinon?: Ins[] }
  | { k: "dire"; t: string }
  | { k: "direv"; v: string }
  | { k: "avancer"; n: number }
  | { k: "tourner"; n: number };

const num = (s: string) => Number(String(s).trim().replace(/−/g, "-").replace(",", "."));

// ─── expressions et conditions ──────────────────────────────────────────────

function evalExpr(s: string, env: Env): number {
  const src = s.replace(/−/g, "-").replace(/\s+/g, "");
  const toks = src.match(/\d+(?:[.,]\d+)?|[\p{L}_][\p{L}\d_]*|[×*+\-()]/gu) ?? [];
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
    while (toks[i] === "×" || toks[i] === "*") {
      i++;
      v *= prim();
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

function comparer(x: number, op: string, s: number): boolean {
  switch (op) {
    case ">": return x > s;
    case "<": return x < s;
    case "≥": return x >= s;
    case "≤": return x <= s;
    case "=": return Math.abs(x - s) < 1e-9;
  }
  throw new Error(`symbole inconnu : ${op}`);
}

function evalCond(c: string, env: Env): boolean {
  const ou = c.split(" ou ");
  if (ou.length > 1) return ou.some((x) => evalCond(x, env));
  const et = c.split(" et ");
  if (et.length > 1) return et.every((x) => evalCond(x, env));
  const m = c.trim().match(/^(.+?) (>|<|=|≥|≤) (.+)$/);
  if (!m) throw new Error(`condition illisible : ${c}`);
  return comparer(evalExpr(m[1], env), m[2], evalExpr(m[3], env));
}

/** Une condition simple « v op s ». */
function condSimple(c: string): { v: string; op: string; s: number } | null {
  const m = c.trim().match(/^([\p{L}]+) (>|<|=|≥|≤) (−?\d+)$/u);
  return m ? { v: m[1], op: m[2], s: num(m[3]) } : null;
}

/** Deux conditions sur la même variable, égales pour tous les ENTIERS de −200 à 400. */
function equivalentes(a: { op: string; s: number }, b: { op: string; s: number }) {
  for (let x = -200; x <= 400; x++) if (comparer(x, a.op, a.s) !== comparer(x, b.op, b.s)) return false;
  return true;
}

// ─── lecture du programme écrit ─────────────────────────────────────────────

/** L'indice du crochet fermant qui répond à celui de `ouvre`. */
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
  if ((m = s.match(/^ajouter (\S+) à (\S+)$/))) return { k: "add", v: m[2], e: m[1] };
  if ((m = s.match(/^répéter (\d+) fois \[/))) {
    const o = s.indexOf("[");
    if (fermant(s, o) !== s.length - 1) throw new Error(`boucle illisible : ${s}`);
    return { k: "rep", n: Number(m[1]), corps: corpsDe(s.slice(o + 1, -1)) };
  }
  if (s.startsWith("répéter jusqu’à ce que ")) {
    const o = s.indexOf(" [");
    if (fermant(s, o + 1) !== s.length - 1) throw new Error(`boucle illisible : ${s}`);
    return { k: "jusqua", c: s.slice("répéter jusqu’à ce que ".length, o), corps: corpsDe(s.slice(o + 2, -1)) };
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
  if ((m = s.match(/^dire “(.*)”$/))) return { k: "dire", t: m[1] };
  if ((m = s.match(/^dire ([\p{L}]+)$/u))) return { k: "direv", v: m[1] };
  if ((m = s.match(/^avancer de (\d+) pas$/))) return { k: "avancer", n: Number(m[1]) };
  if ((m = s.match(/^tourner de (\d+)°$/))) return { k: "tourner", n: Number(m[1]) };
  throw new Error(`instruction illisible : ${s}`);
}

/** Les suites « « … » ; « … » » du texte, lues comme des programmes (null si ce n'en est pas un). */
function chaines(t: string): { brut: string; prog: Ins[] | null; fin: number }[] {
  return [...t.matchAll(/« [^«»]+ »(?: ; « [^«»]+ »)*/g)].map((m) => {
    const items = [...m[0].matchAll(/« ([^«»]+) »/g)].map((x) => x[1]);
    let prog: Ins[] | null;
    try {
      prog = items.map(lireIns);
    } catch {
      prog = null;
    }
    return { brut: m[0], prog, fin: m.index! + m[0].length };
  });
}

/** Le premier programme écrit dans le texte. */
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
  const noter = (bs: any[]) => bs.forEach((b) => {
    if (b.type === "set_variable" || b.type === "change_variable") vars.add(b.variable);
    for (const k of ["children", "elseChildren"]) if (b[k]) noter(b[k]);
  });
  noter(c.blocks);
  const lire = (bs: any[]): Ins[] =>
    bs.flatMap((b): Ins[] => {
      switch (b.type) {
        case "event":
        case "ask":
          return [];
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
        case "jusqua": return `répéter jusqu’à ce que ${norm(i.c)} [${ser(i.corps)}]`;
        case "si": return `si ${norm(i.c)} alors [${ser(i.alors)}]${i.sinon ? ` sinon [${ser(i.sinon)}]` : ""}`;
        case "dire": return `dire “${i.t}”`;
        case "direv": return `dire ${i.v}`;
        case "avancer": return `avancer de ${i.n} pas`;
        case "tourner": return `tourner de ${i.n}°`;
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

type Etat = { env: Env; dits: string[]; dist: number; angle: number; tours: number; infini: boolean; min: number; max: number };

function executer(p: Ins[], env0: Env = {}): Etat {
  const st: Etat = { env: { ...env0 }, dits: [], dist: 0, angle: 0, tours: 0, infini: false, min: Infinity, max: -Infinity };
  for (const x of Object.values(env0)) {
    st.min = Math.min(st.min, x);
    st.max = Math.max(st.max, x);
  }
  const poser = (v: string, x: number) => {
    st.env[v] = x;
    st.min = Math.min(st.min, x);
    st.max = Math.max(st.max, x);
  };
  const run = (l: Ins[]) => {
    for (const i of l) {
      if (st.infini) return;
      switch (i.k) {
        case "set": poser(i.v, evalExpr(i.e, st.env)); break;
        case "add":
          if (!(i.v in st.env)) throw new Error(`variable ${i.v} sans valeur`);
          poser(i.v, st.env[i.v] + evalExpr(i.e, st.env));
          break;
        case "rep": for (let t = 0; t < i.n; t++) run(i.corps); break;
        case "jusqua": {
          let t = 0;
          while (!evalCond(i.c, st.env)) {
            if (++t > 200) { st.infini = true; return; }
            run(i.corps);
          }
          st.tours = t;
          break;
        }
        case "si": run(evalCond(i.c, st.env) ? i.alors : i.sinon ?? []); break;
        case "dire": st.dits.push(i.t); break;
        case "direv":
          if (!(i.v in st.env)) throw new Error(`variable ${i.v} sans valeur`);
          st.dits.push(String(st.env[i.v]));
          break;
        case "avancer": st.dist += i.n; break;
        case "tourner": st.angle += i.n; break;
      }
    }
  };
  run(p);
  return st;
}

// ─── ce que dit le texte ────────────────────────────────────────────────────

/** Les valeurs données en clair : « vies vaut 7 », « contient le nombre 5 », « x = −3 », « Le joueur répond 251 ». */
function donnees(t: string): Env {
  const sans = t.replace(/“[^”]*”/g, " ").replace(/«[^»]*»/g, " ");
  const env: Env = {};
  for (const m of sans.matchAll(/([\p{L}]+) (?:vaut|contient le nombre|=) (−?\d+)/gu)) env[m[1]] = num(m[2]);
  const r = sans.match(/Le joueur répond (−?\d+)/);
  if (r) env["réponse"] = num(r[1]);
  return env;
}

/** La dernière phrase (la question). */
const question = (t: string) => {
  const s = t.trim().split(/(?<=[.?!»”)])\s+(?=[A-ZÀÂÉÈÊÎÔÛÇ«“])/);
  return s[s.length - 1];
};

/** La condition testée (dans “ ”) la plus à droite du texte. */
function conditionTestee(t: string): string | null {
  const cs = [...t.matchAll(/“([^”]*(?:>|<|=|≥|≤)[^”]*)”/g)].map((m) => m[1]);
  return cs.length ? cs[cs.length - 1] : null;
}

/** Ce que doit répondre l'élève, d'après l'état final et la question. */
function reponseJuste(q: Q, st: Etat, envTest: Env): string | number {
  const Qn = question(q.text);
  let m: RegExpMatchArray | null;
  if (/[Qq]ue dit le lutin|[Qq]uel message|Qu’affiche le programme/.test(Qn)) {
    if (st.dits.length > 1) throw new Error(`plusieurs messages dits : ${st.dits.join(", ")}`);
    return st.dits[0] ?? "aucun message";
  }
  if (/Quel nombre le lutin dit-il/.test(Qn)) {
    if (!st.dits.length) throw new Error("le lutin ne dit rien");
    return num(st.dits[st.dits.length - 1]);
  }
  if ((m = Qn.match(/Combien de fois le lutin dit-il “(.+)”|Combien de fois le message “(.+)” s’affiche|combien de “(.+)” le lutin/)))
    return st.dits.filter((d) => d === (m![1] ?? m![2] ?? m![3])).length;
  if (/Combien de fois la boucle|Combien de tours la boucle|Combien de passages/.test(Qn)) return st.tours;
  if (/degrés/.test(Qn)) return st.angle;
  if (/en pas|de pas/.test(Qn)) return st.dist;
  if ((m = Qn.match(/(?:valeur (?:finale )?(?:de la variable |de |d’)|Combien vaut |Que contient (?:la variable )?|Que vaut (?:la variable )?)([\p{L}]+)/u))) {
    if (!(m[1] in st.env)) throw new Error(`variable ${m[1]} inconnue`);
    return st.env[m[1]];
  }
  // Une condition à tester : avec les valeurs du moment.
  const c = conditionTestee(Qn) ?? conditionTestee(q.text);
  if (c && /vraie \?|vrai ou faux|réussi \?/.test(Qn)) {
    const ok = evalCond(c, envTest);
    const [oui, non] = (q.choices ?? []).includes("oui") ? ["oui", "non"] : ["vrai", "faux"];
    return ok ? oui : non;
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
  return q.format === "qcm" ? qcmUnique(q, (c) => c === juste) : q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », l'exécution donne « ${juste} »`];
}

const RELATIFS = /°C|congélateur|météo|plongeur|bancaire|souterrain|devenir négatif|nombre relatif|écart au par|droite graduée|variable x\b|variable n\b|variable t\b|variable y\b|variable k\b|variable m\b|variable a\b/;

function plausible(q: Q, st: Etat): string[] {
  const p: string[] = [];
  if (st.infini) p.push("boucle sans fin");
  if (st.max > 999 && !/année/.test(q.text)) p.push(`valeur ${st.max} : peu plausible`);
  if (st.min < 0 && !RELATIFS.test(q.text)) p.push(`valeur négative ${st.min} dans une situation qui n'en admet pas`);
  return p;
}

/** Le correcteur commun : on exécute le programme du texte (avec les valeurs données) et on compare. */
function parExecution(opts: { canvas?: "programme" | ((q: Q, prog: Ins[], env: Env) => Ins[]) | false } = {}) {
  return (q: Q): string[] => {
    try {
      const env = donnees(q.text);
      const cs = chaines(q.text).filter((c) => c.prog);
      const prog = cs.length ? cs[0].prog! : [];
      // « Avec « si … » , que dit le lutin ? » : la seconde chaîne s'exécute après la première.
      const suite = cs.length > 1 && /Avec « si/.test(q.text) ? cs[1].prog! : [];
      const st = executer([...prog, ...suite], env);
      const p = [...verifier(q, reponseJuste(q, st, st.env)), ...plausible(q, st)];
      if (opts.canvas === "programme") p.push(...memeCanvas(q, prog));
      else if (typeof opts.canvas === "function") p.push(...memeCanvas(q, opts.canvas(q, prog, env)));
      return p;
    } catch (e) {
      return [(e as Error).message];
    }
  };
}

// ─── les objectifs en français (table propre au correcteur) ─────────────────

const PHRASES: [RegExp, string][] = [
  [/atteint ou dépasse (−?\d+)/, "≥"],
  [/ne dépasse pas (−?\d+)/, "≤"],
  [/n’atteint pas (−?\d+)/, "<"],
  [/dépasse (−?\d+)/, ">"],
  [/est strictement (?:supérieure?|plus grande?) (?:à|que) (−?\d+)/, ">"],
  [/est strictement (?:inférieure?|plus petite?) (?:à|que) (−?\d+)/, "<"],
  [/est supérieure? ou égale? à (−?\d+)/, "≥"],
  [/est inférieure? ou égale? à (−?\d+)/, "≤"],
  [/vaut au moins (−?\d+)/, "≥"],
  [/vaut au plus (−?\d+)/, "≤"],
  [/vaut exactement (−?\d+)/, "="],
  [/est égale? à (−?\d+)/, "="],
];

function objectif(phrase: string): { op: string; s: number } | null {
  for (const [re, op] of PHRASES) {
    const m = phrase.match(re);
    if (m) return { op, s: num(m[1]) };
  }
  return null;
}

// ─── algo_condition ─────────────────────────────────────────────────────────

const canvasTest = (alorsSeul: boolean) => (q: Q, prog: Ins[], env: Env): Ins[] => {
  // « Avec « si … », que dit le lutin ? » : le canvas montre le programme puis ce « si ».
  const cs = chaines(q.text).filter((x) => x.prog);
  if (cs.length > 1 && /Avec « si/.test(q.text)) return [...prog, ...cs[1].prog!];
  if (cs.length === 1 && /^Avec « si/.test(q.text.slice(q.text.indexOf(cs[0].brut) - 5))) return [...Object.entries(env).map(([v, n]) => ({ k: "set" as const, v, e: String(n) })), ...cs[0].prog!];
  // Le canvas : la valeur donnée (si le texte ne l'a pas déjà programmée), puis le test.
  const c = depuisCanvas(q) ?? [];
  const test = c.find((i) => i.k === "si") as Extract<Ins, { k: "si" }> | undefined;
  const cond = conditionTestee(q.text) ?? "";
  const sets: Ins[] = prog.length ? prog : Object.entries(env).map(([v, n]) => ({ k: "set" as const, v, e: String(n) }));
  return [...sets, { k: "si", c: cond, alors: test?.alors ?? [], ...(alorsSeul ? {} : test?.sinon ? { sinon: test.sinon } : {}) }];
};

function corrigerLireSymbole(q: Q): string[] {
  const c = condSimple(conditionTestee(q.text) ?? "");
  if (!c) return ["condition illisible"];
  const SENS: [RegExp, string][] = [
    [/strictement inférieure à/, "<"],
    [/inférieure ou égale à/, "≤"],
    [/strictement supérieure à/, ">"],
    [/supérieure ou égale à/, "≥"],
    [/est égale à/, "="], // en dernier : « supérieure ou égale à » est lu avant
  ];
  const sens = (ch: string) => SENS.find(([re]) => re.test(ch))?.[1];
  const p = qcmUnique(q, (ch) => sens(ch) === c.op && num(ch.match(/(−?\d+)$/)?.[1] ?? "x") === c.s);
  const cv = depuisCanvas(q);
  const si = cv?.find((i) => i.k === "si") as Extract<Ins, { k: "si" }> | undefined;
  if (!si || norm(si.c) !== norm(conditionTestee(q.text)!)) p.push("le canvas ne montre pas la condition du texte");
  return p;
}

function corrigerQuelleValeur(q: Q): string[] {
  const c = q.text.match(/« si (.+?)(?: alors \[.*\])? »/)?.[1] ?? conditionTestee(q.text);
  if (!c) return ["condition illisible"];
  const Qn = question(q.text);
  const cherche = /fausse|sauté|échoue/.test(Qn) ? false : /vraie|exécuté|fait dire|passe le test/.test(Qn) ? true : null;
  if (cherche == null) return [`question non reconnue : ${Qn}`];
  const cs = condSimple(c);
  if (!cs) return [`condition illisible : ${c}`];
  return qcmUnique(q, (ch) => comparer(num(ch), cs.op, cs.s) === cherche);
}

/** Les devinettes : la bonne réponse du quiz est-elle la bonne ? */
function corrigerEgalite(q: Q): string[] {
  const p = parExecution({ canvas: false })(q);
  const s = num(q.text.match(/si réponse = (−?\d+)/)?.[1] ?? "NaN");
  let m: RegExpMatchArray | null;
  const verite =
    (m = q.text.match(/combien font (\d+) × (\d+)/)) ? Number(m[1]) * Number(m[2])
    : (m = q.text.match(/le résultat de (\d+) \+ (\d+)/)) ? Number(m[1]) + Number(m[2])
    : /hexagone/.test(q.text) ? 6
    : /minutes dans une heure/.test(q.text) ? 60
    : /tour Eiffel/.test(q.text) ? 1889
    : /l’eau gèle/.test(q.text) ? 0
    : (m = q.text.match(/le héros en a trouvé (\d+)/)) ? Number(m[1])
    : null;
  if (verite != null && verite !== s) p.push(`le programme attend ${s}, la bonne réponse du quiz est ${verite}`);
  // Le canvas : la question posée, la réponse du joueur, le test.
  const cv = depuisCanvas(q);
  const prog = programme(q.text);
  const rep = donnees(q.text)["réponse"];
  if (!cv || ser(cv) !== ser([{ k: "set", v: "réponse", e: String(rep) }, ...prog])) p.push(`le canvas ne montre pas « réponse = ${rep} » puis le test`);
  return p;
}

// ─── algo_programme_objectif ────────────────────────────────────────────────

// De −50 à 300 : au-delà de tous les seuils des situations (une altitude de 106 m).
const VALEURS = Array.from({ length: 351 }, (_, i) => i - 50);

/** Une proposition « « bloc » » réalise-t-elle l'objectif, pour toute valeur de départ ? */
function corrigerChoisirBloc(q: Q): string[] {
  const v = q.text.match(/variable(?: s’appelle)? ([\p{L}]+)/u)?.[1];
  if (!v) return ["variable illisible"];
  let m: RegExpMatchArray | null;
  const t = q.text;
  const voulu: ((x: number) => number) | null =
    (m = t.match(/remettre .+? à (\d+) au début/)) ? () => Number(m![1])
    : (m = t.match(/augmenter .+? de (\d+)/)) ? (x) => x + Number(m![1])
    : (m = t.match(/diminuer .+? de (\d+)/)) ? (x) => x - Number(m![1])
    : /doubler/.test(t) ? (x) => 2 * x
    : /tripler/.test(t) ? (x) => 3 * x
    : null;
  if (!voulu) return ["objectif illisible"];
  const realise = (ch: string) => {
    try {
      const p = [lireIns(ch.replace(/^« | »$/g, ""))];
      return VALEURS.every((x) => executer(p, { [v]: x }).env[v] === voulu(x));
    } catch {
      return false;
    }
  };
  return qcmUnique(q, realise);
}

/** Le but d'un programme : chaque description est éprouvée sur les valeurs de départ 0 à 100. */
function corrigerBut(q: Q): string[] {
  let prog: Ins[];
  try {
    prog = programme(q.text);
  } catch (e) {
    return [(e as Error).message];
  }
  const v = (prog.find((i) => "v" in i) as any)?.v ?? (prog[0] as any).c?.split(" ")[0];
  const res = (x: number) => executer(prog, { [v]: x });
  const tous = (f: (x: number, st: Etat) => boolean) => VALEURS.every((x) => f(x, res(x)));
  const decrit = (d: string): boolean => {
    let m: RegExpMatchArray | null;
    if ((m = d.match(/^faire passer \S+ de (\d+) à (\d+)$/))) return res(Number(m[1])).env[v] === Number(m[2]);
    if (/^doubler /.test(d)) return tous((x, st) => st.env[v] === 2 * x);
    if (/^tripler /.test(d)) return tous((x, st) => st.env[v] === 3 * x);
    if ((m = d.match(/^ajouter (\d+) à \S+$/))) return tous((x, st) => st.env[v] === x + Number(m![1]));
    if ((m = d.match(/^ajouter (\d+) à \S+ deux fois$/))) return tous((x, st) => st.env[v] === x + 2 * Number(m![1]));
    if ((m = d.match(/^mettre \S+ à (\d+)$/)) || (m = d.match(/^mettre toujours \S+ à (\d+)$/))) return tous((_x, st) => st.env[v] === Number(m![1]));
    if ((m = d.match(/^diviser \S+ par (\d+)$/))) return tous((x, st) => st.env[v] === x / Number(m![1]));
    if ((m = d.match(/^empêcher \S+ de descendre en dessous de (\d+)$/))) return tous((x, st) => st.env[v] === Math.max(x, Number(m![1])));
    if ((m = d.match(/^empêcher \S+ de dépasser (\d+)$/))) return tous((x, st) => st.env[v] === Math.min(x, Number(m![1])));
    if ((m = d.match(/^mettre dans \S+ le résultat de (\d+) ([×+]) (\d+)$/))) {
      const r = m[2] === "×" ? Number(m[1]) * Number(m[3]) : Number(m[1]) + Number(m[3]);
      return tous((_x, st) => st.env[v] === r);
    }
    if ((m = d.match(/^faire (baisser|monter) \S+ s’il dépasse (\d+), le faire (monter|baisser) sinon$/))) {
      const s = Number(m[2]);
      const sens = (a: string, x: number, y: number) => (a === "baisser" ? y < x : y > x);
      return tous((x, st) => (x > s ? sens(m![1], x, st.env[v]) : sens(m![3], x, st.env[v])));
    }
    if (/^faire toujours baisser /.test(d)) return tous((x, st) => st.env[v] < x);
    if ((m = d.match(/^dire “(.+)” quand (.+), sinon “(.+)”$/))) {
      const o = objectif(m[2]);
      if (!o) return false;
      return tous((x, st) => st.dits.length === 1 && st.dits[0] === (comparer(x, o.op, o.s) ? m![1] : m![3]));
    }
    // « répéter 2 fois le programme », « dire v quand v vaut s » : jamais une description juste ici.
    return false;
  };
  return [...qcmUnique(q, decrit), ...memeCanvas(q, prog)];
}

function corrigerConditionObjectif(q: Q): string[] {
  const o = objectif(q.text);
  if (!o) return ["objectif illisible"];
  return qcmUnique(q, (ch) => {
    const c = condSimple(ch);
    return !!c && equivalentes(c, o);
  });
}

function corrigerProgrammeCalcul(q: Q): string[] {
  const m = q.text.match(/On choisit un nombre ([\p{L}]), (.+?)\. /u);
  if (!m) return ["programme de calcul illisible"];
  const L = m[1];
  const etapes = m[2].split(", puis ").map((e) => {
    const r = e.match(/(multiplie(?: le résultat)? par|ajoute|soustrait) (\d+)/);
    if (!r) throw new Error(`étape illisible : ${e}`);
    return { o: r[1].startsWith("multiplie") ? "×" : r[1] === "ajoute" ? "+" : "−", n: Number(r[2]) };
  });
  const f = (x: number) => etapes.reduce((r, e) => (e.o === "×" ? r * e.n : e.o === "+" ? r + e.n : r - e.n), x);
  const egale = (ch: string) => {
    try {
      return [1.5, 2.7, -3.1, 7].every((x) => Math.abs(evalExpr(ch, { [L]: x }) - f(x)) < 1e-9);
    } catch {
      return false;
    }
  };
  return qcmUnique(q, egale);
}

/** L'objectif écrit en français est-il bien le programme ? (« si le score dépasse 12, lui ajouter 3 »…) */
function objectifEnProgramme(obj: string, v: string): Ins[] | null {
  const m = obj.match(/^(?:(ajouter|retirer) (\d+), puis, )?si .+? ((?:atteint ou |ne )?dépasse(?: pas)? \d+|n’atteint pas \d+|est .+? \d+|vaut .+? \d+), (lui ajouter (\d+)|lui retirer (\d+)|le remettre à (\d+)|le ramener à (\d+)|dire “(.+)”)$/);
  if (!m) return null;
  const o = objectif(m[3]);
  if (!o) return null;
  const avant: Ins[] = m[1] ? [{ k: "add", v, e: m[1] === "ajouter" ? m[2] : `−${m[2]}` }] : [];
  const action: Ins = m[5] ? { k: "add", v, e: m[5] } : m[6] ? { k: "add", v, e: `−${m[6]}` } : m[7] || m[8] ? { k: "set", v, e: m[7] ?? m[8] } : { k: "dire", t: m[9] };
  return [...avant, { k: "si", c: `${v} ${o.op} ${o.s}`, alors: [action] }];
}

function corrigerObjectifValeur(q: Q): string[] {
  const p = parExecution({ canvas: (qq, prog, env) => [...Object.entries(env).map(([v, n]) => ({ k: "set" as const, v, e: String(n) })), ...prog] })(q);
  const obj = q.text.match(/Objectif : (.+?)\. Le programme/)?.[1];
  const v = Object.keys(donnees(q.text))[0];
  const attendu = obj && v ? objectifEnProgramme(obj, v) : null;
  if (!attendu) return [...p, `objectif illisible : ${obj}`];
  if (ser(attendu) !== ser(programme(q.text))) p.push(`le programme « ${ser(programme(q.text))} » ne traduit pas l'objectif (« ${ser(attendu)} »)`);
  return p;
}

function corrigerObjectifMessage(q: Q): string[] {
  const m = q.text.match(/Objectif : dire “(.+?)” quand (.+?), et “(.+?)” sinon\. Le programme teste “(.+?)”\./);
  if (!m) return ["objectif illisible"];
  const o = objectif(m[2]);
  const c = condSimple(m[4]);
  if (!o || !c) return ["condition illisible"];
  const p: string[] = [];
  if (!equivalentes(o, c)) p.push(`le test “${m[4]}” ne traduit pas l'objectif`);
  const x = donnees(q.text)[c.v];
  if (x == null) return [...p, "valeur testée illisible"];
  const juste = comparer(x, c.op, c.s) ? m[1] : m[3];
  p.push(...qcmUnique(q, (ch) => ch === juste));
  p.push(...memeCanvas(q, [{ k: "set", v: c.v, e: String(x) }, { k: "si", c: m[4], alors: [{ k: "dire", t: m[1] }], sinon: [{ k: "dire", t: m[3] }] }]));
  return p;
}

// ─── algo_modifier ──────────────────────────────────────────────────────────

/** Applique « On remplace « A » par « B » » (ou la condition “A” par “B”) au programme. */
function modifier(t: string, prog: Ins[]): Ins[] {
  let s = ser(prog);
  let m: RegExpMatchArray | null;
  if ((m = t.match(/On remplace la condition “(.+?)” par “(.+?)”/))) {
    if (!s.includes(`si ${norm(m[1])} alors`)) throw new Error(`la condition “${m[1]}” n'est pas dans le programme`);
    s = s.replace(`si ${norm(m[1])} alors`, `si ${norm(m[2])} alors`);
  } else if ((m = t.match(/On remplace « (.+?) » par « (.+?) »/))) {
    if (!s.includes(norm(m[1]))) throw new Error(`« ${m[1]} » n'est pas dans le programme`);
    s = s.replace(norm(m[1]), norm(m[2]));
  } else throw new Error("modification illisible");
  return couper(s).map(lireIns);
}

function corrigerModifierCondition(q: Q): string[] {
  try {
    const avant = programme(q.text);
    const apres = modifier(q.text, avant);
    const env = donnees(q.text);
    const st = executer(apres, env);
    const Qn = question(q.text);
    const p: string[] = [];
    const dit = st.dits[0] ?? "aucun message";
    const m = Qn.match(/le lutin dit-il “(.+)” \?/);
    const juste = m ? (dit === m[1] ? "oui" : "non") : dit;
    p.push(...qcmUnique(q, (c) => c === juste));
    // Le nouveau test garde le sens de l'ancien (un « < » ne remplace pas un « > »).
    const ca = condSimple((avant[0] as any).c), cn = condSimple((apres[0] as any).c);
    if (ca && cn && (/[<≤]/.test(ca.op) !== /[<≤]/.test(cn.op) || (ca.op === "=") !== (cn.op === "="))) p.push("la nouvelle condition change le sens du test");
    p.push(...memeCanvas(q, [...Object.entries(env).map(([v, n]) => ({ k: "set" as const, v, e: String(n) })), ...apres]));
    return p;
  } catch (e) {
    return [(e as Error).message];
  }
}

function corrigerModifierNombre(q: Q): string[] {
  try {
    const avant = programme(q.text);
    const apres = modifier(q.text, avant);
    const st = executer(apres);
    return [...verifier(q, reponseJuste(q, st, st.env)), ...plausible(q, st), ...plausible(q, executer(avant)), ...memeCanvas(q, apres)];
  } catch (e) {
    return [(e as Error).message];
  }
}

function corrigerCorriger(q: Q): string[] {
  const o = objectif(q.text.match(/seulement quand (.+?)\. Le programme/)?.[1] ?? "");
  const erreur = condSimple(q.text.match(/Le programme teste “(.+?)”/)?.[1] ?? "");
  if (!o || !erreur) return ["objectif ou test illisible"];
  const p: string[] = [];
  if (equivalentes(o, erreur)) p.push(`le test “${erreur.v} ${erreur.op} ${erreur.s}” respecte déjà l'objectif : il n'y a rien à corriger`);
  p.push(...qcmUnique(q, (ch) => {
    const c = condSimple(ch);
    return !!c && equivalentes(c, o);
  }));
  // Le canvas montre le programme À CORRIGER, jamais la correction.
  const cv = depuisCanvas(q);
  const si = cv?.find((i) => i.k === "si") as Extract<Ins, { k: "si" }> | undefined;
  if (!si) p.push("pas de test dans le canvas");
  else {
    const c = condSimple(si.c);
    if (c && equivalentes(c, o)) p.push(`le canvas montre la bonne condition « ${si.c} » : il donne la réponse`);
    if (norm(si.c) !== norm(`${erreur.v} ${erreur.op} ${erreur.s}`)) p.push(`le canvas montre « ${si.c} » au lieu du test du texte`);
  }
  return p;
}

function corrigerQuelleModification(q: Q): string[] {
  try {
    const prog = programme(q.text);
    const v = (prog[0] as any).v as string;
    const F = num(q.text.match(new RegExp(`se termine avec ${v} = (−?\\d+)`))?.[1] ?? "NaN");
    const T = num(q.text.match(new RegExp(`(?:obtenir ${v} = |${v} vaille |${v} égal à )(−?\\d+)`))?.[1] ?? "NaN");
    const p: string[] = [];
    const fin = executer(prog).env[v];
    if (fin !== F) p.push(`le texte dit ${v} = ${F} à la fin, l'exécution donne ${fin}`);
    const appliquer = (ch: string): number | null => {
      let m: RegExpMatchArray | null;
      let s = ser(prog);
      if ((m = ch.match(/^remplacer « (.+?) » par « (.+?) »$/))) {
        if (!s.includes(m[1])) return null;
        s = s.replace(m[1], m[2]);
      } else if ((m = ch.match(/^supprimer « (.+?) »$/))) {
        if (!s.endsWith(` ; ${m[1]}`)) return null;
        s = s.slice(0, -(m[1].length + 3));
      } else if ((m = ch.match(/^ajouter le bloc « (.+?) » après la boucle$/))) s = `${s} ; ${m[1]}`;
      else return null;
      return executer(couper(s).map(lireIns)).env[v];
    };
    p.push(...qcmUnique(q, (ch) => appliquer(ch) === T));
    p.push(...memeCanvas(q, prog));
    return p;
  } catch (e) {
    return [(e as Error).message];
  }
}

// ─── algo_defi ──────────────────────────────────────────────────────────────

const POLYGONES: Record<number, string> = { 3: "un triangle équilatéral", 4: "un carré", 5: "un pentagone régulier", 6: "un hexagone régulier", 8: "un octogone régulier", 10: "un décagone régulier" };

function corrigerRobot(q: Q): string[] {
  if (/figure|forme/.test(question(q.text))) {
    const prog = programme(q.text);
    const r = prog[0];
    if (prog.length !== 1 || r.k !== "rep") return ["programme de polygone illisible"];
    const tourne = r.corps.find((i) => i.k === "tourner") as { n: number } | undefined;
    if (!tourne || r.n * tourne.n !== 360) return [`${r.n} × ${tourne?.n}° ≠ 360° : le trajet ne se referme pas`];
    return [...qcmUnique(q, (c) => c === POLYGONES[r.n]), ...memeCanvas(q, prog)];
  }
  return parExecution({ canvas: "programme" })(q);
}

function corrigerDebugErreur(q: Q): string[] {
  const o = objectif(q.text.match(/quand (.+?)\. Le programme/)?.[1] ?? "");
  const pr = condSimple(q.text.match(/« si (.+?) alors/)?.[1] ?? "");
  if (!o || !pr) return ["objectif ou programme illisible"];
  const xs = Array.from({ length: 601 }, (_, i) => i - 200);
  const diff = xs.filter((x) => comparer(x, o.op, o.s) !== comparer(x, pr.op, pr.s));
  const decrit = (ch: string): boolean => {
    let m: RegExpMatchArray | null;
    if ((m = ch.match(/^il oublie le cas où \S+ vaut exactement (−?\d+)$/))) return diff.length === 1 && diff[0] === num(m[1]) && comparer(diff[0], o.op, o.s);
    if ((m = ch.match(/^il accepte à tort le cas où \S+ vaut exactement (−?\d+)$/))) return diff.length === 1 && diff[0] === num(m[1]) && !comparer(diff[0], o.op, o.s);
    if ((m = ch.match(/^le test est à l’envers : il réagit aux valeurs trop (petites|grandes)$/))) {
      const bas = o.s - 50, haut = o.s + 50;
      return diff.length > 1 && (m[1] === "petites" ? comparer(bas, pr.op, pr.s) && !comparer(bas, o.op, o.s) : comparer(haut, pr.op, pr.s) && !comparer(haut, o.op, o.s));
    }
    if (ch === "il n’y a aucune erreur") return diff.length === 0;
    return false;
  };
  return [...qcmUnique(q, decrit), ...memeCanvas(q, [programme(q.text)[0]])];
}

function corrigerValeurQuiRevele(q: Q): string[] {
  const o = objectif(q.text.match(/quand (.+?)\. Le programme/)?.[1] ?? "");
  const pr = condSimple(q.text.match(/« si (.+?) alors/)?.[1] ?? "");
  if (!o || !pr) return ["objectif ou programme illisible"];
  return [...qcmUnique(q, (ch) => comparer(num(ch), o.op, o.s) !== comparer(num(ch), pr.op, pr.s)), ...memeCanvas(q, [programme(q.text)[0]])];
}

function corrigerValeurDepart(q: Q): string[] {
  try {
    const corps = programme(q.text);
    const v = (corps[0] as any).v as string;
    const visee = question(q.text).match(/“(.+?)”/)?.[1];
    if (!visee) return ["message visé illisible"];
    const p = qcmUnique(q, (ch) => executer(corps, { [v]: num(ch) }).dits[0] === visee);
    p.push(...memeCanvas(q, [{ k: "set", v, e: "?" }, ...corps]));
    return p;
  } catch (e) {
    return [(e as Error).message];
  }
}

const CORRIGER: CorrecteursMaths = {
  // algo_condition
  "4e_algo_condition_tpl_1_comparaison_superieur": parExecution({ canvas: canvasTest(true) }),
  "4e_algo_condition_tpl_7_lire_symbole": corrigerLireSymbole,
  "4e_algo_condition_tpl_2_comparaison_inferieur": parExecution({ canvas: canvasTest(true) }),
  "4e_algo_condition_tpl_3_egalite": corrigerEgalite,
  "4e_algo_condition_tpl_4_relatif": parExecution({ canvas: canvasTest(false) }),
  "4e_algo_condition_tpl_6_quelle_valeur": corrigerQuelleValeur,
  "4e_algo_condition_tpl_5_expression": parExecution({ canvas: canvasTest(true) }),
  "4e_algo_condition_tpl_5_expression_2": parExecution({ canvas: canvasTest(true) }),
  // algo_instruction_conditionnelle
  "4e_algo_instruction_conditionnelle_tpl_1_si_simple": parExecution({ canvas: "programme" }),
  "4e_algo_instruction_conditionnelle_tpl_1_si_simple_2": corrigerSiModifie,
  "4e_algo_instruction_conditionnelle_tpl_2_si_sinon": parExecution({ canvas: "programme" }),
  "4e_algo_instruction_conditionnelle_tpl_2_si_sinon_2": parExecution({ canvas: "programme" }),
  "4e_algo_instruction_conditionnelle_tpl_3_variable_modifiee": parExecution({ canvas: "programme" }),
  "4e_algo_instruction_conditionnelle_tpl_4_si_sinon_variable": parExecution({ canvas: "programme" }),
  "4e_algo_instruction_conditionnelle_tpl_5_trois_cas": parExecution({ canvas: "programme" }),
  "4e_algo_instruction_conditionnelle_tpl_6_si_dans_boucle": parExecution({ canvas: "programme" }),
  "4e_algo_instruction_conditionnelle_tpl_7_valeur_depart": corrigerValeurDepart,
  // algo_variable
  "4e_algo_variable_tpl_1_initialisation": parExecution({ canvas: "programme" }),
  "4e_algo_variable_tpl_2_increment": parExecution({ canvas: "programme" }),
  "4e_algo_variable_tpl_6_set_then_change": parExecution({ canvas: "programme" }),
  "4e_algo_variable_tpl_3_plusieurs_modifications": parExecution({ canvas: "programme" }),
  "4e_algo_variable_tpl_4_variable_negative": parExecution({ canvas: "programme" }),
  "4e_algo_variable_tpl_5_boucle_variable": parExecution({ canvas: "programme" }),
  "4e_algo_variable_tpl_7_variables_liees": parExecution({ canvas: "programme" }),
  // algo_programme_objectif
  "4e_algo_programme_objectif_tpl_6_choisir_bloc": corrigerChoisirBloc,
  "4e_algo_programme_objectif_tpl_7_but_simple": corrigerBut,
  "4e_algo_programme_objectif_tpl_1_choisir_condition": corrigerConditionObjectif,
  "4e_algo_programme_objectif_tpl_2_choisir_programme_calcul": corrigerProgrammeCalcul,
  "4e_algo_programme_objectif_tpl_5_choisir_condition": corrigerBut,
  "4e_algo_programme_objectif_tpl_3_objectif_score": corrigerObjectifValeur,
  "4e_algo_programme_objectif_tpl_4_objectif_si_sinon": corrigerObjectifMessage,
  // algo_modifier
  "4e_algo_modifier_tpl_1_modifier_seuil": corrigerModifierCondition,
  "4e_algo_modifier_tpl_2_modifier_bonus": corrigerModifierNombre,
  "4e_algo_modifier_tpl_5_seuil": corrigerConditionObjectif,
  "4e_algo_modifier_tpl_6_increment": corrigerModifierNombre,
  "4e_algo_modifier_tpl_3_corriger_condition": corrigerCorriger,
  "4e_algo_modifier_tpl_4_changer_objectif": corrigerQuelleModification,
  // algo_defi
  "4e_algo_defi_tpl_7_repeter_jusqua": parExecution({ canvas: false }),
  "4e_algo_defi_tpl_8_robot": corrigerRobot,
  "4e_algo_defi_tpl_1_condition_variable_boucle": parExecution({ canvas: "programme" }),
  "4e_algo_defi_tpl_2_debug_condition": corrigerDebugErreur,
  "4e_algo_defi_tpl_3_score_final": parExecution({ canvas: "programme" }),
  "4e_algo_defi_tpl_4_message": parExecution({ canvas: "programme" }),
  "4e_algo_defi_tpl_5_debug": corrigerValeurQuiRevele,
  "4e_algo_defi_tpl_6_double_boucle": parExecution({ canvas: "programme" }),
};

/** « Le bloc « ajouter 3 à v » est-il exécuté ? » ou une valeur finale. */
function corrigerSiModifie(q: Q): string[] {
  const Qn = question(q.text);
  if (!/exécuté(e)? \?/.test(Qn)) return parExecution({ canvas: "programme" })(q);
  try {
    const prog = programme(q.text);
    const iSi = prog.findIndex((i) => i.k === "si");
    const si = prog[iSi] as Extract<Ins, { k: "si" }>;
    const st = executer(prog.slice(0, iSi));
    const p = qcmUnique(q, (c) => c === (evalCond(si.c, st.env) ? "oui" : "non"));
    const bloc = Qn.match(/« (.+?) »/)?.[1];
    if (bloc && bloc !== "si" && ser(si.alors) !== norm(bloc)) p.push(`le bloc « ${bloc} » n'est pas celui du « si »`);
    return [...p, ...plausible(q, executer(prog)), ...memeCanvas(q, prog)];
  } catch (e) {
    return [(e as Error).message];
  }
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles(CORRIGER);
