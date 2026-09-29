// Recalcul indépendant de la feuille « Algorithmique et programmation » de 5e
// (29/09/2026) : lib/fiches-exercices/maths-5e-algo-programmation.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque programme dessiné (`scratch([…])`) est RELU dans le
// source et EXÉCUTÉ par un petit interprète de blocs écrit ici (mettre,
// ajouter, dire, demander, répéter … fois, si … alors, avancer, tourner à
// gauche / à droite). Ce qu'il dit est comparé au corrigé ; chaque trace
// (`trace(…)`) est relue et comparée, case par case, à l'exécution ; chaque
// trajet du lutin (`lutin(…)`) est relu et comparé, sommet par sommet, au
// chemin de la tortue. Les programmes écrits EN MOTS dans un énoncé (ex. 5, 10)
// sont relus dans l'énoncé et exécutés de même.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-algo-programmation.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-algo-programmation.tsx", "algo_programmation", ["scratch", "lutin"]);
const { c, e, vrai, verif, dit, enonceDit, dessin, dessins, essai } = f;

/* ── L'interprète de blocs ─────────────────────────────────────────────────── */

/** Les lignes indentées (2 espaces par niveau) → un arbre de blocs. */
function analyser(lignes) {
  const L = lignes.map((x) => ({ niv: x.match(/^ */)[0].length / 2, t: x.trim() }));
  let i = 0;
  const bloc = (niv) => {
    const out = [];
    while (i < L.length && L[i].niv === niv) {
      const n = { t: L[i].t };
      i++;
      if (/^(répéter|si )/.test(n.t)) {
        n.corps = bloc(niv + 1);
        if (/^si /.test(n.t) && i < L.length && L[i].niv === niv && L[i].t === "sinon") {
          i++;
          n.sinon = bloc(niv + 1);
        }
      }
      out.push(n);
    }
    return out;
  };
  const arbre = bloc(0);
  if (i !== L.length) throw new Error(`indentation illisible à la ligne ${i + 1} : ${lignes[i]}`);
  return arbre;
}

const traduire = (x) => x.replace(/−/g, "-").replace(/≥/g, ">=").replace(/≤/g, "<=").replace(/ = /g, " == ");

/** Exécute le programme. `entrees` : les réponses aux « demander », dans l'ordre. */
function executer(lignes, entrees = []) {
  const s = { réponse: undefined };
  const dits = [];
  const pas = [];
  const tours = [];
  let questions = 0;
  const tortue = { x: 0, y: 0, cap: 0, dist: 0, sommets: [[0, 0]] };
  const file = [...entrees];
  const ev = (x) => new Function("s", `with (s) { return (${traduire(x)}); }`)(s);
  let garde = 0;
  const run = (blocs) => {
    for (const n of blocs) {
      if (++garde > 200000) throw new Error("boucle infinie");
      let m;
      if (/^(quand |stylo)/.test(n.t)) continue;
      else if (/^demander '/.test(n.t)) {
        if (!file.length) throw new Error(`plus d'entrée pour : ${n.t}`);
        questions++;
        s.réponse = file.shift();
      } else if ((m = /^mettre (\S+) à (.+)$/.exec(n.t))) {
        s[m[1]] = ev(m[2]);
        pas.push({ ...s });
      } else if ((m = /^ajouter (.+) à (\S+)$/.exec(n.t))) {
        s[m[2]] = ev(m[2]) + ev(m[1]);
        pas.push({ ...s });
      } else if ((m = /^dire (.+)$/.exec(n.t))) dits.push(ev(m[1]));
      else if ((m = /^répéter (\d+) fois$/.exec(n.t))) {
        for (let k = 0; k < Number(m[1]); k++) {
          run(n.corps);
          tours.push({ ...s });
        }
      } else if ((m = /^si (.+) alors$/.exec(n.t))) run(ev(m[1]) ? n.corps : n.sinon ?? []);
      else if ((m = /^avancer de (\d+)$/.exec(n.t))) {
        const d = Number(m[1]);
        tortue.dist += d;
        tortue.x += d * Math.cos((tortue.cap * Math.PI) / 180);
        tortue.y += d * Math.sin((tortue.cap * Math.PI) / 180);
        tortue.sommets.push([Math.round(tortue.x * 1e6) / 1e6 + 0, Math.round(tortue.y * 1e6) / 1e6 + 0]);
      } else if ((m = /^tourner à (gauche|droite) de (\d+)°$/.exec(n.t))) tortue.cap += (m[1] === "gauche" ? 1 : -1) * Number(m[2]);
      else throw new Error(`bloc inconnu : ${n.t}`);
    }
  };
  run(analyser(lignes));
  const ferme = tortue.sommets.length > 1 && tortue.sommets.at(-1).join(";") === "0;0";
  const distincts = new Set(tortue.sommets.map((p) => p.join(";"))).size;
  const [x, y] = tortue.sommets.at(-1);
  return { dits, pas, tours, s, questions, tortue: { ...tortue, x, y, cap: ((tortue.cap % 360) + 360) % 360, ferme, distincts } };
}

/* ── Lecture ───────────────────────────────────────────────────────────────── */

const prog = (k, role = "figure") => dessin("scratch", k, role)[0];
/** Une case de trace comme la feuille l'écrit : « 7,5 », « −3 ». */
const virg = (v) => String(v).replace(".", ",").replace("-", "−");
const memeTrace = (k, attendu) => {
  const [, lignes] = dessin("trace", k);
  const lu = JSON.stringify(lignes.map((l) => l.map(String)));
  const at = JSON.stringify(attendu.map((l) => l.map(virg)));
  vrai(`${k}. la trace est celle de l'exécution`, lu === at, `lu ${lu} ; calculé ${at}`);
};
const memeChemin = (k, j, sommets) => {
  const [chemins] = dessin("lutin", k);
  const d = chemins[j];
  const ok = !!d && d.length === sommets.length && d.every(([x, y], i) => Math.abs(x - sommets[i][0]) < 1e-6 && Math.abs(y - sommets[i][1]) < 1e-6);
  vrai(`${k}. le chemin n° ${j + 1} du lutin est celui de l'exécution`, ok, `dessin ${JSON.stringify(d)} ; exécution ${JSON.stringify(sommets)}`);
};
/** Un programme écrit en mots : « avancer de 30 ; tourner à gauche de 90° ; … ». */
const enMots = (texte) => texte.split(" ; ").map((b) => b.trim());
const premierDit = (lignes, x) => executer(lignes, [x]).dits[0];

/* ── Largeur des blocs dessinés (la même règle que `scratch()`) ────────────── */
const largeurBloc = (ligne) => {
  const brut = /^demander /.test(ligne) ? `${ligne} et attendre` : ligne;
  const morceaux = brut.split(/('[^']*')/).map((m) => m.trim()).filter(Boolean);
  const w = morceaux.reduce((s, m, j) => s + (m.startsWith("'") ? (m.length - 2) * 7.6 + 18 : m.length * 8) + (j ? 6 : 0), 0);
  return Math.max(56, 20 + w, /^(répéter|si )/.test(ligne) ? 96 : 0);
};
for (const a of f.appels("scratch")) {
  if (!a.args) continue;
  for (const l of a.args[0]) {
    const niv = l.match(/^ */)[0].length / 2;
    const w = 4 + 16 * niv + largeurBloc(l.trim());
    vrai(`bloc « ${l.trim()} » : ${Math.round(w)} de large, 300 au plus`, w <= 300);
    vrai(`bloc « ${l.trim()} » : ni guillemet double ni signe moins ASCII`, !/["-]/.test(l));
  }
}
for (const a of f.appels("lutin")) if (a.args) vrai(`lutin : légende de 30 signes au plus (${a.args[1]})`, a.args[1].length <= 30);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const p = prog(1);
  const r = executer(p);
  const i1 = p.indexOf("ajouter 6 à score"), i2 = p.indexOf("mettre score à score * 2");
  const ech = [...p];
  [ech[i1], ech[i2]] = [p[i2], p[i1]];
  const rb = executer(ech);
  vrai("1. deux blocs échangés trouvés", i1 > 0 && i2 > 0);
  dit(1, `Le lutin dit $${r.dits[0]}$.`);
  dit(1, `Le lutin dit $${rb.dits[0]}$.`);
  dit(1, `Réponse : a) $${r.dits[0]}$ ; b) $${rb.dits[0]}$ ; c) oui`);
  vrai("1. l'ordre change bien le résultat", r.dits[0] !== rb.dits[0]);
  memeTrace(1, ["1er", "2e", "3e"].map((n, j) => [n, r.pas[j].score, rb.pas[j].score]));
});
essai("2", () => {
  const p = prog(2);
  enonceDit(2, "elle met $4$ minutes pour faire $1$ km");
  verif("2. 15 km/h : 60 ÷ 15 = 4 min par km", 60 / 15, 4);
  vrai("2. le programme multiplie par 4", p.includes("mettre minutes à km * 4"));
  const d12 = premierDit(p, 12);
  dit(2, `Le lutin dit $${d12}$`);
  const d = [...Array(401).keys()].map((k) => k / 20).find((x) => premierDit(p, x) === 30);
  dit(2, `$30 \\div 4 = ${t(d)}$`);
  dit(2, `on avait tapé $${t(d)}$ km`);
  memeTrace(2, [[12, d12], [d, 30]]);
  vrai("2. une entrée, une sortie", executer(p, [1]).questions === 1 && executer(p, [1]).dits.length === 1);
});
essai("3", () => {
  const exprs = [...e(3).matchAll(/[a-d]\) « ([^»]+) »/g)].map((m) => m[1]);
  vrai(`3. quatre blocs lus (${exprs.length})`, exprs.length === 4);
  const vals = exprs.map((x) => executer(["mettre x à 7", `dire ${x}`]).dits[0]);
  dit(3, `Réponse : ${vals.map((v, i) => `${"abcd"[i]}) $${t(v)}$`).join(" ; ")}.`);
  memeTrace(3, exprs.map((x, i) => [x, vals[i]]));
  dit(3, `$7 \\times 4 - 9 = 28 - 9 = ${vals[0]}$`);
  dit(3, `$(7 + 3) \\times 2 = 10 \\times 2 = ${vals[1]}$`);
  dit(3, `$7 \\times 7 - 10 = 49 - 10 = ${vals[2]}$`);
  dit(3, `$3 \\times 7 + 7 = 21 + 7 = ${vals[3]}$`);
});
essai("4", () => {
  const p = prog(4);
  const [r2, r10] = [executer(p, [2]), executer(p, [10])];
  dit(4, `Le lutin dit $${r2.dits[0]}$.`);
  dit(4, `Le lutin dit $${r10.dits[0]}$.`);
  dit(4, `$(2 + 5) \\times 3 = ${r2.dits[0]}$`);
  dit(4, `$2 + 5 \\times 3 = 2 + 15 = ${2 + 5 * 3}$`);
  dit(4, `Réponse : a) $${r2.dits[0]}$ et $${r10.dits[0]}$`);
  memeTrace(4, [r2, r10].map((r) => [r.pas[0].n, r.pas[1].n, r.pas[2].n]));
});
essai("5", () => {
  const A = enMots(/Programme A : (.*?)\.\\n/.exec(e(5))[1]);
  const B = enMots(/Programme B : (.*?)\.\\n/.exec(e(5))[1]);
  vrai("5. mêmes blocs, autre ordre", JSON.stringify([...A].sort()) === JSON.stringify([...B].sort()) && A.join() !== B.join());
  const [tA, tB] = [executer(A).tortue, executer(B).tortue];
  memeChemin(5, 0, tA.sommets);
  // B : les deux « avancer » se suivent — le dessin garde le sommet intermédiaire.
  memeChemin(5, 1, tB.sommets);
  vrai("5. A arrive en (40 ; 30), B en (0 ; 70)", tA.sommets.at(-1).join(";") === "40;30" && tB.sommets.at(-1).join(";") === "0;70");
  dit(5, `Il arrive $${tA.x}$ pas à droite et $${tA.y}$ pas plus haut que son départ.`);
  dit(5, `Il arrive $${tB.y}$ pas plus haut`);
  vrai("5. 70 pas chacun", tA.dist === 70 && tB.dist === 70);
  dit(5, `$40 + 30 = ${tA.dist}$ pas`);
});
essai("6", () => {
  const [d, tt] = [240, 3];
  enonceDit(6, `la variable d vaut $${d}$ et la variable t vaut $${tt}$`);
  enonceDit(6, `Un train parcourt $${d}$ km en $${tt}$ heures.`);
  const r = executer([`mettre d à ${d}`, `mettre t à ${tt}`, "mettre v à d / t", "dire d / t", "dire t / d", "dire d + v * 2"]).dits;
  dit(6, `$240 \\div 3 = ${t(r[0])}$`);
  dit(6, `$3 \\div 240 = ${t(r[1])}$`);
  dit(6, `$240 + 80 \\times 2 = 240 + 160 = ${t(r[2])}$`);
  dit(6, `Réponse : a) $${t(r[0])}$ km/h ; b) $${t(r[1])}$`);
  memeTrace(6, [["d / t", r[0]], ["t / d", r[1]], ["d + v * 2", r[2]]]);
});
essai("7", () => {
  const p = ["mettre x à 0", "dire x * 10 + 1"];
  enonceDit(7, "« x * 10 + 1 »");
  const g = (x) => executer([`mettre x à ${x}`, p[1]]).dits[0];
  const x91 = [...Array(101).keys()].find((x) => g(x) === 91);
  dit(7, `Réponse : a) $${g(4)}$ ; b) de $${g(5) - g(4)}$ ; c) x valait $${x91}$.`);
  memeTrace(7, [4, 5, x91].map((x) => [x, g(x)]));
});
essai("8", () => {
  const p = prog(8, "schema");
  enonceDit(8, `le bloc « ${p.find((l) => l.startsWith("  ")).trim()} »`);
  enonceDit(8, "répète $3$ fois");
  const r = executer(p);
  dit(8, `Le lutin dit $${r.dits[0]}$`);
  vrai("8. le bloc de la boucle tourne 3 fois", r.tours.length === 3);
  const tours10 = [...Array(20).keys()].find((n) => executer(p.map((l) => l.replace("répéter 3 fois", `répéter ${n} fois`))).dits[0] === 10);
  dit(8, `$90 \\div 15 = ${tours10}$`);
  dit(8, `Réponse : a) $${r.dits[0]}$ ; b) $${r.tours.length}$ fois ; c) $${tours10}$ tours.`);
  memeTrace(8, [["départ", 100], ...r.tours.map((s, j) => [j + 1, s.batterie])]);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const p = prog(9);
  const [a, b] = [premierDit(p, 4), premierDit(p, 9)];
  const n420 = [...Array(50).keys()].find((n) => premierDit(p, n) === 420);
  dit(9, `Réponse : b) $${a}$ g et $${b}$ g ; c) pour $${n420}$ personnes.`);
  dit(9, `$420 \\div 60 = ${n420}$`);
  memeTrace(9, [[4, a], [9, b], [n420, 420]]);
});
essai("10", () => {
  const blocs = enMots(/dans l'ordre : (.*?)\.\\n/.exec(e(10))[1]);
  const tt = executer(blocs).tortue;
  memeChemin(10, 0, tt.sommets);
  dit(10, `$30 + 20 + 10 + 10 = ${tt.dist}$ pas`);
  dit(10, `$${tt.dist} \\times 10 = ${tt.dist * 10}$ cm, soit $${(tt.dist * 10) / 100}$ m`);
  dit(10, `Il est $${tt.x}$ pas plus à droite que son départ.`);
  vrai("10. il regarde vers le haut à la fin", tt.cap === 90 && c(10).includes("d) À la fin, il regarde vers le haut."));
  const [, , opts] = dessin("lutin", 10);
  vrai("10. les quatre côtés sont cotés", opts.cotes === 4);
});
essai("11", () => {
  const p = prog(11);
  const r = executer(p, [5, 4]);
  vrai("11. deux entrées, une sortie", r.questions === 2 && r.dits.length === 1);
  const faux = executer(p.map((l) => (l === "mettre total à p * q + 3" ? "mettre total à p * (q + 3)" : l)), [5, 4]).dits[0];
  dit(11, `Le lutin dit $${r.dits[0]}$`);
  dit(11, `$5 \\times (4 + 3) = 5 \\times 7 = ${faux}$`);
  dit(11, `Réponse : a) deux entrées, une sortie ; b) $${r.dits[0]}$ ; c) $${faux}$`);
  memeTrace(11, [["5 et 4", r.dits[0], faux]]);
});
essai("12", () => {
  const p = prog(12);
  const rs = [25, 30, 34].map((x) => executer(p, [x]).dits);
  dit(12, `Réponse : $${rs[0].length}$, $${rs[1].length}$ et $${rs[2].length}$ messages.`);
  vrai("12. à 34 : Bonjour, Bois souvent, Bonne journée", rs[2].join("|") === "Bonjour|Bois souvent|Bonne journée");
  vrai("12. à 30 : pas de conseil", !rs[1].includes("Bois souvent"));
  memeTrace(12, [25, 30, 34].map((x, j) => [x, x > 30 ? "vrai" : "faux", rs[j].length]));
});
essai("13", () => {
  const ex = Object.fromEntries([...e(13).matchAll(/([A-D]) : « ([^»]+) »/g)].map((m) => [m[1], m[2]]));
  vrai("13. quatre blocs lus", Object.keys(ex).length === 4);
  const g = (nom, x) => executer([`mettre x à ${x}`, `dire ${ex[nom]}`]).dits[0];
  const pareils = [...Array(71).keys()].map((k) => k - 20).every((x) => g("A", x) === g("B", x) && g("C", x) === g("B", x));
  vrai("13. A, B et C égaux de −20 à 50", pareils);
  vrai("13. D diffère en 4 et 10, égal en 1", g("D", 4) !== g("B", 4) && g("D", 10) !== g("B", 10) && g("D", 1) === g("B", 1));
  dit(13, `D : $(4 + 2) \\times 4 = 6 \\times 4 = ${g("D", 4)}$`);
  dit(13, `Avec $10$ : A dit $${g("A", 10)}$, B dit $${g("B", 10)}$, C dit $${g("C", 10)}$ et D dit $${g("D", 10)}$.`);
  dit(13, `D dit $(1 + 2) \\times 1 = ${g("D", 1)}$`);
  memeTrace(13, [4, 10, 1].map((x) => [x, g("A", x), g("D", x)]));
});
essai("14", () => {
  const melange = prog(14);
  const [range, enCouleur] = dessin("scratch", 14, "schema");
  vrai("14. le programme rangé reprend les quatre blocs mélangés", JSON.stringify(range.slice(1).sort()) === JSON.stringify([...melange].sort()) && range[0].startsWith("quand"));
  const r = executer(range);
  dit(14, `Le lutin dit $${r.dits[0]}$`);
  const ech = [range[0], range[2], range[1], ...range.slice(3)];
  vrai("14. les deux premiers blocs échangés : même résultat", executer(ech).dits[0] === r.dits[0]);
  enonceDit(14, "de $8$ m sur $5$ m");
  vrai("14. le rangé met 8 et 5", range.includes("mettre long à 8") && range.includes("mettre larg à 5"));
  vrai("14. la ligne entourée est le calcul", range[enCouleur].startsWith("mettre p à"));
  dit(14, `Réponse : b) $${r.dits[0]}$ ; c) oui.`);
});
essai("15", () => {
  const p = prog(15);
  const r = executer(p, [15]);
  vrai("15. une seule question", r.questions === 1);
  const x60 = [...Array(101).keys()].find((x) => premierDit(p, x) === 60);
  dit(15, `Le lutin dit $${r.dits[0]}$.`);
  dit(15, `$40 \\div 4 = ${x60}$ € par semaine`);
  dit(15, `Réponse : a) une fois ; b) $${r.dits[0]}$ ; c) $${x60}$ € par semaine.`);
  memeTrace(15, [["départ", 20], ...r.tours.map((s, j) => [j + 1, s.tirelire])]);
});
essai("16", () => {
  enonceDit(16, "range $0{,}1$ dans la variable e, répète $5$ fois le bloc « mettre e à e * 2 »");
  const p = (n) => ["mettre e à 0.1", `répéter ${n} fois`, "  mettre e à e * 2", "dire e"];
  const r5 = executer(p(5));
  const r7 = executer(p(7));
  const arr = (x) => Math.round(x * 1000) / 1000;
  dit(16, `Le lutin dit $${t(arr(r5.dits[0]))}$`);
  dit(16, `Le lutin dirait $${t(arr(r7.dits[0]))}$ mm`);
  vrai("16. le calcul de Tom donne 1", arr(0.1 * 2 * 5) === 1);
  memeTrace(16, [["départ", 0.1], ...r5.tours.map((s, j) => [j + 1, arr(s.e)])]);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const p = prog(17);
  const pluies = [...(/pour l'exercice\) : (.*?) mm\./.exec(e(17))[1]).matchAll(/\$(\d+)\$/g)].map((m) => Number(m[1]));
  vrai(`17. sept pluies lues (${pluies})`, pluies.length === 7);
  const r = executer(p, pluies);
  vrai("17. sept entrées", r.questions === 7);
  dit(17, `Le lutin dit $${r.dits[0]}$`);
  const total = pluies.reduce((a, b) => a + b, 0);
  dit(17, `$${pluies.join(" + ")} = ${total}$ mm`);
  vrai("17. 5 mm n'est pas compté", executer(p, [5, 0, 0, 0, 0, 0, 0]).dits[0] === 0);
  dit(17, `Réponse : b) $${r.dits[0]}$ jours ; c) non ; d) $${total}$ mm`);
  memeTrace(17, pluies.map((x, j) => [x, x > 5 ? "oui" : "non", r.tours[j].jours]));
});
essai("18", () => {
  const p = prog(18);
  const r = executer(p);
  const code = r.dits.join("");
  dit(18, `Le lutin dit $${r.dits[0]}$, puis $${r.dits[1]}$.`);
  dit(18, `b) Le code est $${code}$.`);
  const r5 = executer(p.map((l) => (l === "mettre a à 3" ? "mettre a à 5" : l)));
  dit(18, `le code devient $${r5.dits.join("")}$`);
  vrai("18. au bloc « b à a * 2 », a ne vaut plus 3", r.pas[2].a !== 3);
  const noms = ["a à 3", "b à 7", "a à a + b", "b à a * 2", "a à b − a"];
  memeTrace(18, r.pas.map((s, j) => [noms[j], s.a, s.b ?? "—"]));
  vrai("18. les noms de la trace suivent les blocs", noms.every((nm, j) => p[j + 1] === `mettre ${nm}`));
  dit(18, `Réponse : a) $${r.dits[0]}$ puis $${r.dits[1]}$ ; b) $${code}$ ; c) $${r5.dits.join("")}$ ; d) non.`);
});
essai("19", () => {
  const p = prog(19);
  const tt = executer(p).tortue;
  memeChemin(19, 0, tt.sommets);
  dit(19, `Deux tours : $2 \\times 140 = ${tt.dist}$ pas.`);
  dit(19, `$${tt.dist} \\times 10 = 2\\,800$ cm, soit $28$ m`);
  vrai("19. 280 pas = 28 m", tt.dist * 10 === 2800);
  vrai("19. arrivée 40 pas au-dessus du départ", tt.sommets.at(-1).join(";") === "0;40" && c(19).includes("elle arrive $40$ pas plus haut que son départ"));
  const n100 = [...Array(12).keys()].find((n) => executer(p.map((l) => l.replace("répéter 2 fois", `répéter ${n} fois`))).tortue.y === 100);
  dit(19, `$100 \\div 20 = ${n100}$ tours`);
  const piege = executer(p.map((l) => l.replace("à droite", "à gauche"))).tortue;
  const xs = piege.sommets.map((q) => q[0]), ys = piege.sommets.map((q) => q[1]);
  vrai("19. le piège : un rectangle de 60 sur 10, parcouru en rond", piege.ferme && piege.distincts === 4 && Math.max(...xs) - Math.min(...xs) === 60 && Math.max(...ys) - Math.min(...ys) === 10);
  dit(19, "un rectangle de $60$ pas sur $10$");
});
essai("20", () => {
  const p = prog(20);
  const rs = [3, 8, 100].map((x) => executer(p, [x]));
  vrai("20. 5 à chaque fois", rs.every((r) => r.dits[0] === 5));
  vrai("20. toujours 5, de −50 à 200", [...Array(251).keys()].every((k) => premierDit(p, k - 50) === 5));
  dit(20, `puis $8 - 3 = ${rs[0].dits[0]}$. Le lutin dit $5$.`);
  dit(20, `puis $13 - 8 = ${rs[1].dits[0]}$`);
  dit(20, `puis $105 - 100 = ${rs[2].dits[0]}$`);
  const p14 = p.map((l) => (l === "ajouter 10 à x" ? "ajouter 14 à x" : l));
  vrai("20. avec « ajouter 14 à x » : toujours 7", [0, 3, 8, 100].every((x) => premierDit(p14, x) === 7) && c(20).includes("« ajouter 14 à x »"));
  memeTrace(20, rs.map((r, j) => [[3, 8, 100][j], r.pas[2].x, r.dits[0]]));
});

f.fin();
