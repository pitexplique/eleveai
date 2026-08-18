// Audit statique du graphe de prérequis (maths CP -> terminale).
// Parsing statique des fichiers microSkills.ts (structure régulière).
import fs from "node:fs";
import path from "node:path";

const SUBJECT = process.argv[2] || "maths";
const ROOT = path.resolve(`lib/tutor-v4/knowledge/${SUBJECT}`);
const LEVELS_BY_SUBJECT = {
  maths: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere-spe", "terminale-spe"],
  francais: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde"],
};
const LEVELS = LEVELS_BY_SUBJECT[SUBJECT] || LEVELS_BY_SUBJECT.maths;

function parseMicro(file) {
  const src = fs.readFileSync(file, "utf8");
  // Découpe en blocs d'objets contenant un id.
  const ids = [...src.matchAll(/\bid:\s*"([^"]+)"/g)].map((m) => m[1]);
  const notions = [...src.matchAll(/\bnotionId:\s*"([^"]+)"/g)].map((m) => m[1]);
  const prereqRaw = [...src.matchAll(/\bprerequis:\s*\[([^\]]*)\]/gs)].map((m) => m[1]);
  if (!(ids.length === notions.length && ids.length === prereqRaw.length)) {
    return { ok: false, ids: ids.length, notions: notions.length, prereq: prereqRaw.length };
  }
  const nodes = ids.map((id, i) => ({
    id,
    notionId: notions[i],
    prereq: [...prereqRaw[i].matchAll(/"([^"]+)"/g)].map((m) => m[1]),
  }));
  return { ok: true, nodes };
}

function analyze(level, nodes) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const ids = new Set(nodes.map((n) => n.id));

  // Orphelins : prereq pointant vers un id inexistant.
  const orphans = [];
  for (const n of nodes) for (const p of n.prereq) if (!ids.has(p)) orphans.push(`${n.id} -> ${p}`);

  // Liens inter-notions (le sel du diagnostic : un prereq dans une autre notion).
  let crossNotion = 0;
  for (const n of nodes) for (const p of n.prereq) {
    const pn = byId.get(p);
    if (pn && pn.notionId !== n.notionId) crossNotion++;
  }

  // Détection de cycles (DFS coloration).
  const color = new Map(); // 0=blanc 1=gris 2=noir
  const cycles = [];
  function dfs(id, stack) {
    color.set(id, 1);
    stack.push(id);
    for (const p of byId.get(id)?.prereq ?? []) {
      if (!ids.has(p)) continue;
      const c = color.get(p) ?? 0;
      if (c === 1) {
        const i = stack.indexOf(p);
        cycles.push(stack.slice(i).concat(p).join(" -> "));
      } else if (c === 0) dfs(p, stack);
    }
    stack.pop();
    color.set(id, 2);
  }
  for (const n of nodes) if ((color.get(n.id) ?? 0) === 0) dfs(n.id, []);

  // Degré entrant direct (combien dépendent directement de ce noeud).
  const inDeg = new Map(nodes.map((n) => [n.id, 0]));
  for (const n of nodes) for (const p of n.prereq) if (inDeg.has(p)) inDeg.set(p, inDeg.get(p) + 1);

  // Levier transitif : nb de descendants (compétences débloquées en aval).
  // children[p] = liste des noeuds qui ont p en prereq.
  const children = new Map(nodes.map((n) => [n.id, []]));
  for (const n of nodes) for (const p of n.prereq) if (children.has(p)) children.get(p).push(n.id);
  function descendants(id) {
    const seen = new Set();
    const stack = [...children.get(id)];
    while (stack.length) {
      const x = stack.pop();
      if (seen.has(x)) continue;
      seen.add(x);
      for (const c of children.get(x) ?? []) stack.push(c);
    }
    return seen.size;
  }
  const leverage = nodes
    .map((n) => ({ id: n.id, direct: inDeg.get(n.id), down: descendants(n.id) }))
    .sort((a, b) => b.down - a.down || b.direct - a.direct);

  const roots = nodes.filter((n) => n.prereq.length === 0).length;
  const leaves = nodes.filter((n) => (children.get(n.id) ?? []).length === 0).length;

  return { count: nodes.length, roots, leaves, orphans, crossNotion, cycles, leverage };
}

console.log(`\n=== AUDIT GRAPHE DE PRÉREQUIS — ${SUBJECT.toUpperCase()} (${LEVELS.join(", ")}) ===\n`);
let totalNodes = 0, totalCross = 0, totalCycles = 0, totalOrphans = 0;
const spine = [];
for (const lvl of LEVELS) {
  const file = path.join(ROOT, lvl, "microSkills.ts");
  if (!fs.existsSync(file)) { console.log(`${lvl}: (absent)`); continue; }
  const parsed = parseMicro(file);
  if (!parsed.ok) { console.log(`${lvl}: ⚠️ parsing désaligné (id=${parsed.ids} notion=${parsed.notions} prereq=${parsed.prereq})`); continue; }
  const a = analyze(lvl, parsed.nodes);
  totalNodes += a.count; totalCross += a.crossNotion; totalCycles += a.cycles.length; totalOrphans += a.orphans.length;
  console.log(`${lvl.toUpperCase().padEnd(13)} micros=${String(a.count).padStart(3)}  racines=${String(a.roots).padStart(3)}  feuilles=${String(a.leaves).padStart(3)}  liens_inter-notions=${String(a.crossNotion).padStart(3)}  cycles=${a.cycles.length}  orphelins=${a.orphans.length}`);
  if (a.cycles.length) a.cycles.slice(0, 5).forEach((c) => console.log(`    ⛔ CYCLE: ${c}`));
  if (a.orphans.length) a.orphans.slice(0, 5).forEach((o) => console.log(`    ⚠️ ORPHELIN: ${o}`));
  const top = a.leverage.filter((x) => x.down > 0).slice(0, 5);
  console.log(`    🔑 maillons à fort levier: ${top.map((x) => `${x.id}(↓${x.down})`).join(", ")}`);
  top.slice(0, 3).forEach((x) => spine.push({ level: lvl, ...x }));
}

console.log(`\n--- TOTAUX ---`);
console.log(`micros=${totalNodes}  liens_inter-notions=${totalCross}  cycles=${totalCycles}  orphelins=${totalOrphans}`);
console.log(`\n--- COLONNE VERTÉBRALE (à étiqueter en priorité, top 3/niveau) ---`);
spine.sort((a, b) => b.down - a.down).slice(0, 20).forEach((s) => console.log(`  ${s.level.padEnd(13)} ${s.id.padEnd(34)} débloque ↓${s.down}`));
console.log("");
