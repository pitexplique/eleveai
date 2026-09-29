// Recalcul indépendant de la feuille « Construire un programme » de 5e
// (29/09/2026) : lib/fiches-exercices/maths-5e-algo-construire.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque programme dessiné (`scratch([…])`) est RELU dans le
// source et EXÉCUTÉ par un petit interprète de blocs écrit ici (mettre,
// ajouter, dire, demander, attendre, répéter … fois, si … alors … sinon,
// avancer, tourner à gauche / à droite, avec des paramètres calculés comme
// « 360 / n »). Ce qu'il dit est comparé au corrigé ; chaque trace est relue et
// comparée à l'exécution ; chaque tracé du lutin (`lutin(…)`) est relu et
// comparé, sommet par sommet, au chemin de la tortue — et le script vérifie
// les LONGUEURS des côtés, la SOMME DES ANGLES de rotation (360° pour une
// figure fermée) et si la figure est FERMÉE.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-5e-algo-construire.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-5e-algo-construire.tsx", "algo_construire", ["scratch", "lutin"]);
const { c, e, vrai, verif, dit, enonceDit, dessin, dessins, essai } = f;

/* ── L'interprète de blocs ─────────────────────────────────────────────────── */

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

function executer(lignes, entrees = []) {
  const s = { réponse: undefined };
  const dits = [];
  const pas = [];
  const tours = [];
  let questions = 0;
  let temps = 0;
  const virages = [];
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
      else if ((m = /^attendre (\d+) secondes$/.exec(n.t))) temps += Number(m[1]);
      else if ((m = /^répéter (.+) fois$/.exec(n.t))) {
        const nb = ev(m[1]);
        for (let k = 0; k < nb; k++) {
          run(n.corps);
          tours.push({ ...s, temps });
        }
      } else if ((m = /^si (.+) alors$/.exec(n.t))) run(ev(m[1]) ? n.corps : n.sinon ?? []);
      else if ((m = /^avancer de (.+)$/.exec(n.t))) {
        const d = ev(m[1]);
        tortue.dist += d;
        tortue.x += d * Math.cos((tortue.cap * Math.PI) / 180);
        tortue.y += d * Math.sin((tortue.cap * Math.PI) / 180);
        tortue.sommets.push([Math.round(tortue.x * 1e6) / 1e6 + 0, Math.round(tortue.y * 1e6) / 1e6 + 0]);
      } else if ((m = /^tourner à (gauche|droite) de (.+?)°?$/.exec(n.t))) {
        const a = (m[1] === "gauche" ? 1 : -1) * ev(m[2]);
        virages.push(a);
        tortue.cap += a;
      } else throw new Error(`bloc inconnu : ${n.t}`);
    }
  };
  run(analyser(lignes));
  const [x, y] = tortue.sommets.at(-1);
  const ferme = tortue.sommets.length > 1 && Math.hypot(x, y) < 1e-6;
  const distincts = new Set(tortue.sommets.map((p) => p.map((v) => v.toFixed(3)).join(";"))).size;
  const cotes = tortue.sommets.slice(1).map((p, i) => Math.hypot(p[0] - tortue.sommets[i][0], p[1] - tortue.sommets[i][1]));
  const tourTotal = virages.reduce((a, b) => a + b, 0);
  return { dits, pas, tours, s, questions, temps, tortue: { ...tortue, x, y, ferme, distincts, cotes, virages, tourTotal } };
}

/* ── Lecture ───────────────────────────────────────────────────────────────── */

const prog = (k, role = "figure") => dessin("scratch", k, role)[0];
const virg = (v) => String(v).replace(".", ",").replace("-", "−");
const memeTrace = (k, attendu) => {
  const [, lignes] = dessin("trace", k);
  const lu = JSON.stringify(lignes.map((l) => l.map(String)));
  const at = JSON.stringify(attendu.map((l) => l.map(virg)));
  vrai(`${k}. la trace est celle de l'exécution`, lu === at, `lu ${lu} ; calculé ${at}`);
};
/** Le tracé dessiné `d` est-il le chemin de la tortue ? (au centième : les sommets irrationnels sont arrondis dans le source) */
const memeChemin = (nom, d, sommets) => {
  const ok = !!d && d.length === sommets.length && d.every(([x, y], i) => Math.abs(x - sommets[i][0]) < 0.006 && Math.abs(y - sommets[i][1]) < 0.006);
  vrai(`${nom} : le tracé dessiné est celui de l'exécution`, ok, `dessin ${JSON.stringify(d)} ; exécution ${JSON.stringify(sommets.map((p) => p.map((v) => Math.round(v * 100) / 100)))}`);
};
const cheminsDe = (k, j = 0) => dessins("lutin", k)[j].args[0];
const premierDit = (lignes, x) => executer(lignes, [x]).dits[0];
const remplace = (lignes, avant, apres) => {
  const i = lignes.findIndex((l) => l.trim() === avant);
  if (i < 0) throw new Error(`bloc introuvable : ${avant}`);
  return lignes.map((l, j) => (j === i ? l.replace(avant, apres) : l));
};

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
  const [p, rouge] = dessin("scratch", 1, "schema");
  enonceDit(1, "$4$ € de prise en charge, puis $2$ € par kilomètre");
  vrai("1. le programme suit la formule 4 + 2 × km (0 à 30 km)", [...Array(31).keys()].every((k) => premierDit(p, k) === 4 + 2 * k));
  vrai("1. la ligne entourée est le calcul", p[rouge] === "mettre prix à 4 + 2 * km");
  const r = premierDit(p, 7);
  const faux = premierDit(remplace(p, "mettre prix à 4 + 2 * km", "mettre prix à (4 + 2) * km"), 7);
  dit(1, `Le lutin dit $${r}$`);
  dit(1, `$(4 + 2) \\times 7 = 6 \\times 7 = ${faux}$`);
  dit(1, `Réponse : b) $${r}$ € ; c) $${faux}$ €`);
});
essai("2", () => {
  const options = [...e(2).matchAll(/\((\d)\) « mettre d à ([^»]+) »/g)].map((m) => ({ n: m[1], x: m[2] }));
  vrai("2. quatre blocs proposés", options.length === 4);
  const g = (x, tt) => executer(["mettre v à 30", `mettre t à ${tt}`, `mettre d à ${x}`, "dire d"]).dits[0];
  const bons = options.filter((o) => [1, 2, 4, 7].every((tt) => g(o.x, tt) === 30 * tt));
  vrai("2. un seul bloc traduit la formule : le (2)", bons.length === 1 && bons[0].n === "2");
  const p = prog(2, "schema");
  const d = executer(p).dits[0];
  const un = g(options[0].x, 4);
  dit(2, "C'est le bloc (2).");
  dit(2, `$30 \\times 4 = ${d}$`);
  dit(2, `$30 + 4 = ${un}$`);
  dit(2, `Réponse : a) le bloc (2) ; b) $${d}$ m ; c) $${un}$`);
});
essai("3", () => {
  const conds = ["humidité > 30", "humidité < 30", "humidité = 30"];
  const lance = (cond, x) => executer([`mettre humidité à ${x}`, `si ${cond} alors`, "  dire 'Arrose'"]).dits[0] ?? "rien";
  const juste = conds.filter((cd) => [...Array(101).keys()].every((x) => (lance(cd, x) === "Arrose") === x < 30));
  vrai("3. seule « humidité < 30 » arrose exactement sous 30 %", juste.length === 1 && juste[0] === "humidité < 30");
  conds.forEach((cd) => enonceDit(3, `« ${cd} »`));
  const xs = [25, 30, 45];
  memeTrace(3, xs.map((x) => [x, x < 30 ? "vrai" : "faux", lance("humidité < 30", x)]));
  dit(3, `Réponse : a) « humidité < 30 » ; b) ${xs.map((x) => (lance("humidité < 30", x) === "rien" ? "rien" : `« ${lance("humidité < 30", x)} »`)).join(", ")}.`);
});
essai("4", () => {
  const p = prog(4);
  const [p2, rouge] = dessin("scratch", 4, "schema");
  const avant = [52, 75].map((x) => executer(p, [x]).dits.join("|"));
  const apres = [52, 75].map((x) => executer(p2, [x]).dits.join("|"));
  vrai(`4. avant : ${avant}`, avant[0] === "Bravo|Médaille" && avant[1] === "Médaille");
  vrai(`4. après : ${apres}`, apres[0] === "Bravo|Médaille" && apres[1] === "");
  vrai("4. seul le dernier bloc a bougé (glissé dans le « si »)", p.length === p2.length && p.slice(0, -1).join() === p2.slice(0, -1).join() && p2.at(-1) === `  ${p.at(-1)}` && rouge === p2.length - 1);
  dit(4, "Réponse : a) « Bravo » et « Médaille », puis « Médaille » seul ; c) « Bravo » et « Médaille », puis rien.");
});
essai("5", () => {
  const p = prog(5);
  const tt = executer(p).tortue;
  vrai("5. carré : 4 côtés de 60, fermé, 360° en tout", tt.ferme && tt.cotes.length === 4 && tt.cotes.every((d) => Math.abs(d - 60) < 1e-9) && tt.tourTotal === 360);
  dit(5, `$4 \\times 60 = ${tt.dist}$ pas`);
  const t25 = executer(remplace(p, "avancer de 60", "avancer de 25")).tortue;
  vrai("5. « avancer de 25 » : côté 25", t25.ferme && t25.cotes.every((d) => Math.abs(d - 25) < 1e-9));
  const t45 = executer(remplace(p, "avancer de 60", "avancer de 45")).tortue;
  vrai("5. « avancer de 45 » : 180 pas", t45.dist === 180 && t45.ferme);
  dit(5, `$180 \\div 4 = ${180 / 4}$`);
  memeChemin("5. carré de 60", cheminsDe(5)[0], tt.sommets);
  memeChemin("5. carré de 45", cheminsDe(5)[1], t45.sommets);
  dit(5, "Réponse : a) $60$ pas et $240$ pas ; b) « avancer de 25 » ; c) « avancer de 45 ».");
});
essai("6", () => {
  enonceDit(6, "répète $4$ fois « avancer de 30 » puis « tourner à gauche de 90° »");
  const A = ["répéter 4 fois", "  avancer de 30", "  tourner à gauche de 90°"];
  const B = A.map((l) => l.replace("à gauche", "à droite"));
  const [tA, tB] = [executer(A).tortue, executer(B).tortue];
  memeChemin("6. A", cheminsDe(6)[0], tA.sommets);
  memeChemin("6. B", cheminsDe(6)[1], tB.sommets);
  vrai("6. deux carrés de côté 30, fermés", [tA, tB].every((q) => q.ferme && q.distincts === 4 && q.cotes.every((d) => d === 30)));
  vrai("6. A au-dessus, B en dessous", tA.sommets.every((p) => p[1] >= 0) && tB.sommets.every((p) => p[1] <= 0));
  dit(6, `$4 \\times 90 = ${tA.tourTotal}$°`);
});
essai("7", () => {
  const p = prog(7);
  const [q, rouge] = dessin("scratch", 7, "schema");
  const [r, r2] = [executer(p).dits[0], executer(q).dits[0]];
  vrai("7. les deux programmes disent 30", r === 30 && r2 === 30);
  const [n1, n2] = [p.length - 1, q.length - 1];
  dit(7, `il y avait $${n1}$ blocs sous le drapeau ; avec la boucle, il en reste $${n2}$. Je gagne $${n1 - n2}$ blocs`);
  vrai("7. la ligne entourée est la boucle", q[rouge] === "répéter 6 fois");
  const r15 = executer(remplace(q, "répéter 6 fois", "répéter 15 fois")).dits[0];
  dit(7, `$15 \\times 5 = ${r15}$`);
  const dedans = executer(["mettre points à 0", "répéter 6 fois", "  mettre points à 0", "  ajouter 5 à points", "dire points"]).dits[0];
  dit(7, `le lutin dirait $${dedans}$`);
  dit(7, `Réponse : a) $${r}$ ; b) $${n1 - n2}$ blocs de moins ; c) « répéter 15 fois », $${r15}$ points.`);
});
essai("8", () => {
  const p = prog(8, "schema");
  const r = executer(p);
  vrai("8. la table de 7, de 7 à 70", r.dits.join() === [...Array(10).keys()].map((k) => 7 * (k + 1)).join());
  dit(8, `$70 \\div 7 = ${r.tours.length}$`);
  const ech = [p[0], p[1], p[2], p[4], p[3]];
  const rb = executer(ech).dits;
  vrai("8. dans l'autre ordre : de 0 à 63", rb[0] === 0 && rb.at(-1) === 63 && rb.length === 10);
  dit(8, `Réponse : a) n, qui commence à $0$ ; b) $${r.tours.length}$ tours ; c) de $${rb[0]}$ à $${rb.at(-1)}$.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const p = prog(9, "schema");
  vrai("9. le programme calcule 4 × n − 3 (n de −10 à 30)", [...Array(41).keys()].every((k) => premierDit(p, k - 10) === 4 * (k - 10) - 3));
  const [a, b] = [premierDit(p, 5), premierDit(p, 2.5)];
  const n45 = [...Array(100).keys()].find((n) => premierDit(p, n) === 45);
  dit(9, `Le lutin dit $${a}$.`);
  dit(9, `Le lutin dit $${b}$.`);
  dit(9, `$48 \\div 4 = ${n45}$`);
  const ech = [p[0], p[1], p[2], p[4], p[3], p[5]];
  dit(9, `$(5 - 3) \\times 4 = ${premierDit(ech, 5)}$`);
  dit(9, `Réponse : b) $${a}$ et $${b}$ ; c) $${n45}$ ; d) $4 \\times n - 3$.`);
});
essai("10", () => {
  const [p, rouge] = dessin("scratch", 10, "schema");
  const tt = executer(p).tortue;
  vrai("10. triangle : 3 côtés de 80, fermé, 3 × 120 = 360°", tt.ferme && tt.cotes.length === 3 && tt.cotes.every((d) => Math.abs(d - 80) < 1e-6) && tt.tourTotal === 360);
  vrai("10. la ligne entourée est le virage", p[rouge] === "  tourner à gauche de 120°");
  const tom = executer(remplace(p, "tourner à gauche de 120°", "tourner à gauche de 60°")).tortue;
  vrai("10. Tom : 180° en tout, figure ouverte", !tom.ferme && tom.tourTotal === 180);
  memeChemin("10. le triangle", cheminsDe(10)[0], tt.sommets);
  memeChemin("10. le tracé de Tom", cheminsDe(10)[1], tom.sommets);
  dit(10, `$360 \\div 3 = ${360 / 3}$`);
  dit(10, `$3 \\times 60 = ${tom.tourTotal}$°`);
  dit(10, `$3 \\times 80 = ${tt.dist}$ pas`);
});
essai("11", () => {
  const p = prog(11, "schema");
  const xs = [37.5, 38, 39.2];
  const lu = xs.map((x) => premierDit(p, x));
  vrai(`11. ${lu}`, lu.join() === "Normal,Normal,Fièvre");
  memeTrace(11, xs.map((x, j) => [x, x > 38 ? "vrai" : "faux", lu[j]]));
  const q = remplace(p, "si réponse > 38 alors", "si réponse > 37.9 alors");
  vrai("11. avec > 37.9 : fièvre exactement à partir de 38 (36,0 à 41,0 au dixième)", [...Array(51).keys()].map((k) => (360 + k) / 10).every((x) => (premierDit(q, x) === "Fièvre") === x >= 38));
  dit(11, "Réponse : b) « Normal », « Normal », « Fièvre » ; c) « réponse > 37.9 ».");
});
essai("12", () => {
  const p = prog(12);
  const tt = executer(p).tortue;
  vrai("12. pentagone : 5 côtés de 30, fermé, 5 × 72 = 360°", tt.ferme && tt.cotes.length === 5 && tt.cotes.every((d) => Math.abs(d - 30) < 1e-6) && tt.tourTotal === 360);
  dit(12, `$5 \\times 30 = ${tt.dist}$ pas`);
  const t45 = executer(remplace(p, "avancer de 30", "avancer de 45")).tortue;
  dit(12, `$5 \\times 45 = ${t45.dist}$ pas`);
  const lina = executer(remplace(p, "répéter 5 fois", "répéter 4 fois")).tortue;
  vrai("12. Lina : 4 côtés, 288°, ouvert", !lina.ferme && lina.cotes.length === 4 && lina.tourTotal === 288);
  dit(12, `$4 \\times 72 = ${lina.tourTotal}$°`);
  memeChemin("12. le pentagone", cheminsDe(12, 0)[0], tt.sommets);
  memeChemin("12. le tracé de Lina", cheminsDe(12, 1)[0], lina.sommets);
});
essai("13", () => {
  const [p, rouge] = dessin("scratch", 13, "schema");
  const r = executer(p);
  vrai("13. 10, 9, … 1, puis Décollage", r.dits.join() === "10,9,8,7,6,5,4,3,2,1,Décollage" && r.tours.length === 10);
  vrai("13. la ligne entourée est « dire Décollage », sous la boucle", p[rouge] === "dire 'Décollage'");
  const ech = executer([p[0], p[1], p[2], p[4], p[3], p[5]]).dits;
  vrai("13. dans l'autre ordre : 9 … 0", ech.join() === "9,8,7,6,5,4,3,2,1,0,Décollage");
  const dedans = executer([...p.slice(0, 5), "  dire 'Décollage'"]).dits.filter((x) => x === "Décollage").length;
  vrai("13. « Décollage » dans la boucle : dit 10 fois", dedans === 10);
  dit(13, `Réponse : b) $${r.tours.length}$ tours ; c) de $9$ à $0$`);
});
essai("14", () => {
  const [p, rouge] = dessin("scratch", 14, "schema");
  const tt = executer(p).tortue;
  memeChemin("14. l'escalier", cheminsDe(14)[0], tt.sommets);
  vrai("14. 160 pas, arrivée (100 ; 60), virages +90 puis −90", tt.dist === 160 && tt.x === 100 && tt.y === 60 && tt.tourTotal === 0);
  vrai("14. la ligne entourée est le virage à droite", p[rouge] === "  tourner à droite de 90°");
  dit(14, `$4 \\times 40 = ${tt.dist}$ pas`);
  dit(14, `$4 \\times 25 = ${tt.x}$ pas plus à droite et $4 \\times 15 = ${tt.y}$ pas plus haut`);
  const piege = executer(p.map((l) => l.replace("à droite", "à gauche"))).tortue;
  const xs = piege.sommets.map((q) => q[0]), ys = piege.sommets.map((q) => q[1]);
  vrai("14. le piège : un rectangle de 25 sur 15, parcouru deux fois", piege.ferme && piege.distincts === 4 && piege.dist === 2 * 2 * (25 + 15) && Math.max(...xs) - Math.min(...xs) === 25 && Math.max(...ys) - Math.min(...ys) === 15);
  dit(14, "un rectangle de $25$ sur $15$, parcouru deux fois");
});
essai("15", () => {
  const [p, rouge] = dessin("scratch", 15, "schema");
  const r = executer(p, [12, 15]).dits[0];
  const faux = executer(remplace(p, "mettre moy à (a + b) / 2", "mettre moy à a + b / 2"), [12, 15]).dits[0];
  vrai("15. la ligne entourée est la formule", p[rouge] === "mettre moy à (a + b) / 2");
  dit(15, `$(12 + 15) \\div 2 = 27 \\div 2 = ${t(r)}$`);
  dit(15, `$12 + 7{,}5 = ${t(faux)}$`);
  vrai("15. la moyenne est entre les deux notes, pas la fausse", r > 12 && r < 15 && faux > 15);
  memeTrace(15, [["(a + b) / 2", r], ["a + b / 2", faux]]);
  dit(15, `Réponse : a) « mettre moy à (a + b) / 2 » ; b) $${t(r)}$ ; c) $${t(faux)}$.`);
});
essai("16", () => {
  const [p, rouge] = dessin("scratch", 16, "schema");
  const proposes = [...(/On propose ces blocs : (.*?)\.\\na\)/.exec(e(16))[1]).matchAll(/« ([^»]+) »/g)].map((m) => m[1]);
  const ranges = p.slice(1).map((l) => l.trim().replace(/'/g, ""));
  vrai("16. le programme rangé emploie exactement les blocs proposés", JSON.stringify([...proposes].sort()) === JSON.stringify([...ranges].sort()), `${proposes} | ${ranges}`);
  vrai("16. la ligne entourée est la condition", p[rouge] === "  si réponse > record alors");
  const scores = [120, 95, 180, 150];
  enonceDit(16, "Les scores sont $120$, $95$, $180$ et $150$.");
  const r = executer(p, scores);
  dit(16, `Le lutin dit $${r.dits[0]}$.`);
  memeTrace(16, scores.map((x, j) => [x, x > (j ? r.tours[j - 1].record : 0) ? "oui" : "non", r.tours[j].record]));
  const dedans = executer([p[0], p[2], "  mettre record à 0", ...p.slice(3)], scores).dits[0];
  const sansSi = executer(["mettre record à 0", "répéter 4 fois", "  demander 'Score ?'", "  mettre record à réponse", "dire record"], scores).dits[0];
  vrai("16. remise à zéro dans la boucle, ou sans condition : 150", dedans === 150 && sansSi === 150);
  dit(16, `Réponse : b) $${r.dits[0]}$ ; c) sinon, le lutin dirait $${dedans}$.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const p = prog(17);
  const trace = (n) => executer(p, [n]).tortue;
  for (const n of [3, 4, 6]) {
    const tt = trace(n);
    vrai(`17. n = ${n} : virages de ${360 / n}°, ${n} côtés de 40, fermé`, tt.virages.every((a) => Math.abs(a - 360 / n) < 1e-9) && tt.cotes.length === n && tt.cotes.every((d) => Math.abs(d - 40) < 1e-6) && tt.ferme);
    dit(17, `$360 \\div ${n} = ${360 / n}$°`);
  }
  vrai("17. fermé pour tout n de 3 à 40, 360° en tout", [...Array(38).keys()].every((k) => {
    const tt = trace(k + 3);
    return tt.ferme && Math.abs(tt.tourTotal - 360) < 1e-9;
  }));
  const n40 = [...Array(40).keys()].find((n) => n > 0 && Math.abs(360 / n - 40) < 1e-9);
  vrai("17. virages de 40° pour n = 9", n40 === 9 && trace(9).virages[0] === 40);
  dit(17, `$360 \\div 40 = ${n40}$`);
  const t36 = trace(36);
  dit(17, `$36 \\times 40 = 1\\,440$ pas`);
  vrai("17. n = 36 : 1 440 pas, virages de 10°", t36.dist === 1440 && Math.abs(t36.virages[0] - 10) < 1e-9);
  memeChemin("17. le triangle", cheminsDe(17)[0], trace(3).sommets);
  memeChemin("17. l'hexagone", cheminsDe(17)[1], trace(6).sommets);
});
essai("18", () => {
  const p = prog(18, "schema");
  const xs = [31, 20, 8, 28];
  const lu = xs.map((x) => executer(p, [x]).dits[0] ?? "rien");
  vrai(`18. ${lu}`, lu.join() === "Ouvre,rien,Chauffe,rien");
  memeTrace(18, xs.map((x, j) => [x, lu[j]]));
  const q = remplace(remplace(p, "si réponse > 28 alors", "si réponse > 26 alors"), "si réponse < 12 alors", "si réponse < 14 alors");
  vrai("18. tomates : 27 → Ouvre, 13 → Chauffe", executer(q, [27]).dits.join() === "Ouvre" && executer(q, [13]).dits.join() === "Chauffe");
  vrai("18. jamais deux messages (−20 à 50 °C)", [...Array(71).keys()].every((k) => executer(p, [k - 20]).dits.length <= 1));
  const niche = ["demander 'Degrés ?'", "si réponse > 28 alors", "  dire 'Ouvre'", "  si réponse < 12 alors", "    dire 'Chauffe'"];
  vrai("18. le piège : « si » rangé dans l'autre, jamais « Chauffe »", [...Array(71).keys()].every((k) => !executer(niche, [k - 20]).dits.includes("Chauffe")));
  dit(18, "Réponse : b) « Ouvre », rien, « Chauffe », rien ; c) « Ouvre » et « Chauffe » ; d) non.");
});
essai("19", () => {
  enonceDit(19, "mesure $12$ m sur $8$ m. Sur l'écran, $1$ m est représenté par $5$ pas");
  const [rect, carre] = dessins("scratch", 19).map((a) => a.args[0]);
  vrai("19. les longueurs des blocs : 12 × 5 et 8 × 5, puis 10 × 5", rect.includes("  avancer de 60") && rect.includes("  avancer de 40") && carre.includes("  avancer de 50"));
  const [tR, tC] = [executer(rect).tortue, executer(carre).tortue];
  memeChemin("19. le rectangle", cheminsDe(19)[0], tR.sommets);
  memeChemin("19. le carré", cheminsDe(19)[1], tC.sommets);
  vrai("19. même clôture : 200 pas chacun, deux figures fermées", tR.dist === 200 && tC.dist === 200 && tR.ferme && tC.ferme && tR.tourTotal === 360 && tC.tourTotal === 360);
  dit(19, `$2 \\times (60 + 40) = 2 \\times 100 = ${tR.dist}$ pas`);
  dit(19, `$${tR.dist} \\div 5 = ${tR.dist / 5}$ m`);
  dit(19, `$40 \\div 4 = 10$ m, soit $10 \\times 5 = ${tC.cotes[0]}$ pas`);
  const [aR, aC] = [(60 / 5) * (40 / 5), (50 / 5) ** 2];
  dit(19, `Rectangle : $12 \\times 8 = ${aR}$ m². Carré : $10 \\times 10 = ${aC}$ m²`);
  vrai("19. le carré est plus grand", aC > aR);
});
essai("20", () => {
  const p = prog(20);
  const r = executer(p);
  const durees = p.filter((l) => /attendre/.test(l)).map((l) => Number(/(\d+)/.exec(l)[1]));
  const cycle = durees.reduce((a, b) => a + b, 0);
  vrai("20. 3 cycles de 60 s = 180 s ; « Orange » 3 fois", cycle === 60 && r.temps === 180 && r.dits.filter((x) => x === "Orange").length === 3);
  dit(20, `$30 + 3 + 27 = ${cycle}$ secondes`);
  dit(20, `$3 \\times 60 = ${r.temps}$ secondes`);
  const heure = executer(remplace(p, "répéter 3 fois", "répéter 60 fois"));
  vrai("20. « répéter 60 fois » : 3 600 s", heure.temps === 3600);
  const pointe = remplace(remplace(p, "attendre 30 secondes", "attendre 45 secondes"), "attendre 27 secondes", "attendre 12 secondes");
  vrai("20. pointe : 45 + 3 + 12 = 60", executer(pointe).temps === 180);
  dit(20, `$60 - 48 = ${60 - 45 - 3}$ secondes de rouge`);
  dit(20, `$45 + 3 + 27 = ${45 + 3 + 27}$ secondes`);
  memeTrace(20, [["Vert", durees[0]], ["Orange", durees[1]], ["Rouge", durees[2]], ["un cycle", cycle]]);
});

f.fin();
