// Recalcul indépendant de la feuille « Algorithmique et programmation » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-algo-programmation.tsx.
//
// ⭐ L'AUTRE CHEMIN : chaque programme dessiné (`scratch([…])`) est RELU dans le
// source et EXÉCUTÉ par un petit interprète de blocs écrit ici (quand drapeau,
// stylo, avancer, tourner à gauche / à droite, répéter … fois, dire). Ce qu'il
// dit, la distance, le nombre de blocs exécutés et le trait du stylo sont
// comparés au corrigé ; chaque trajet du lutin (`lutin(…)`) est relu et
// comparé, sommet par sommet, au chemin de la tortue. Les programmes écrits EN
// MOTS dans un énoncé (ex. 7, 18) sont relus dans l'énoncé et exécutés de même.
// ⭐ Les LIMITES DE LA 6e sont vérifiées : aucun bloc de 5e (variable,
// « demander », « si »), aucune boucle dans une boucle.
// ⭐ La LECTURE (Frédéric, 30/09) : phrases de 20 mots au plus, 13 en moyenne.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-algo-programmation.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-algo-programmation.tsx", "algo_programmation", ["scratch", "lutin"], "6e");
const { c, e, vrai, verif, dit, enonceDit, dessin, essai, feuille } = f;

/* ── L'interprète de blocs ─────────────────────────────────────────────────── */

function analyser(lignes) {
  const L = lignes.map((x) => ({ niv: x.match(/^ */)[0].length / 2, t: x.trim() }));
  let i = 0;
  const bloc = (niv) => {
    const out = [];
    while (i < L.length && L[i].niv === niv) {
      const n = { t: L[i].t };
      i++;
      if (/^répéter/.test(n.t)) n.corps = bloc(niv + 1);
      out.push(n);
    }
    return out;
  };
  const arbre = bloc(0);
  if (i !== L.length) throw new Error(`indentation illisible à la ligne ${i + 1} : ${lignes[i]}`);
  return arbre;
}

const r6 = (x) => Math.round(x * 1e6) / 1e6 + 0;
/** Exécute le programme : ce qu'il dit, les blocs exécutés, le chemin de la tortue, le trait du stylo. */
function executer(lignes) {
  const dits = [];
  const caps = [];
  let avancer = 0, garde = 0, stylo = false, trait = 0, tourne = 0;
  const t = { x: 0, y: 0, cap: 0, dist: 0, sommets: [[0, 0]] };
  const run = (blocs) => {
    for (const n of blocs) {
      if (++garde > 100000) throw new Error("boucle infinie");
      let m;
      if (/^quand drapeau vert cliqué$/.test(n.t)) continue;
      else if (/^stylo en position d'écriture$/.test(n.t)) stylo = true;
      else if ((m = /^dire '([^']*)'$/.exec(n.t))) dits.push(m[1]);
      else if ((m = /^répéter (\d+) fois$/.exec(n.t))) {
        vrai(`« ${n.t} » : pas de boucle dans une boucle (6e)`, n.corps.every((b) => !b.corps));
        for (let k = 0; k < Number(m[1]); k++) run(n.corps);
      } else if ((m = /^avancer de (\d+)$/.exec(n.t))) {
        const d = Number(m[1]);
        avancer++;
        t.dist += d;
        if (stylo) trait += d;
        t.x += d * Math.cos((t.cap * Math.PI) / 180);
        t.y += d * Math.sin((t.cap * Math.PI) / 180);
        t.sommets.push([r6(t.x), r6(t.y)]);
      } else if ((m = /^tourner à (gauche|droite) de (\d+)°$/.exec(n.t))) {
        const a = Number(m[2]);
        tourne += a;
        t.cap += (m[1] === "gauche" ? 1 : -1) * a;
        caps.push(((t.cap % 360) + 360) % 360);
      } else throw new Error(`bloc inconnu (ou hors programme de 6e) : ${n.t}`);
    }
  };
  run(analyser(lignes));
  const [x, y] = t.sommets.at(-1);
  const ferme = t.sommets.length > 1 && x === 0 && y === 0;
  const distincts = new Set(t.sommets.map((p) => p.join(";"))).size;
  return { dits, caps, avancer, trait, tourne, tortue: { ...t, x, y, cap: ((t.cap % 360) + 360) % 360, ferme, distincts } };
}
const DIRECTION = { 0: "vers la droite", 90: "vers le haut", 180: "vers la gauche", 270: "vers le bas" };

/* ── Lecture ───────────────────────────────────────────────────────────────── */

const prog = (k, role = "figure") => dessin("scratch", k, role)[0];
const memeChemin = (k, j, sommets) => {
  const [chemins] = dessin("lutin", k);
  const d = chemins[j];
  const ok = !!d && d.length === sommets.length && d.every(([x, y], i) => Math.abs(x - sommets[i][0]) < 1e-6 && Math.abs(y - sommets[i][1]) < 1e-6);
  vrai(`${k}. le chemin n° ${j + 1} du lutin est celui de l'exécution`, ok, `dessin ${JSON.stringify(d)} ; exécution ${JSON.stringify(sommets)}`);
};
/** Un programme écrit en mots : « avancer de 30 ; tourner à gauche de 90° ; … ». */
const enMots = (texte) => texte.split(" ; ").map((b) => b.trim());
const sousLeDrapeau = (lignes) => lignes.filter((l) => !/^quand /.test(l)).length;

/* ── Largeur des blocs dessinés et limites de la 6e ────────────────────────── */
const largeurBloc = (ligne) => {
  const morceaux = ligne.split(/('[^']*')/).map((m) => m.trim()).filter(Boolean);
  const w = morceaux.reduce((s, m, j) => s + (m.startsWith("'") ? (m.length - 2) * 7.6 + 18 : m.length * 8) + (j ? 6 : 0), 0);
  return Math.max(56, 20 + w, /^répéter/.test(ligne) ? 96 : 0);
};
for (const a of f.appels("scratch")) {
  if (!a.args) continue;
  for (const l of a.args[0]) {
    const niv = l.match(/^ */)[0].length / 2;
    const w = 4 + 16 * niv + largeurBloc(l.trim());
    vrai(`bloc « ${l.trim()} » : ${Math.round(w)} de large, 300 au plus`, w <= 300);
    vrai(`bloc « ${l.trim()} » : ni guillemet double ni signe moins ASCII`, !/["-]/.test(l));
    vrai(`bloc « ${l.trim()} » : un bloc de 6e`, /^(quand drapeau vert cliqué|stylo en position d'écriture|avancer de \d+|tourner à (gauche|droite) de \d+°|répéter \d+ fois|dire '[^']*')$/.test(l.trim()));
  }
}
for (const a of f.appels("lutin")) if (a.args) vrai(`lutin : légende de 30 signes au plus (${a.args[1]})`, a.args[1].length <= 30);
// (Aucune variable, aucun « demander », aucun « si » : la liste blanche des blocs ci-dessus l'assure.)
vrai("aucun bloc de 5e nommé dans les énoncés", !/« (mettre|ajouter|demander|si) /.test(feuille.series));

/* ── La lecture : des phrases courtes (Frédéric, 30/09) ──────────────────── */
{
  const textes = [...feuille.enonces, ...feuille.corrections];
  const phrases = textes.flatMap((t) => t.split(/\\n|(?<=[.?!])\s+/u)).map((p) => p.trim()).filter(Boolean);
  const mots = (p) => p.split(/\s+/).filter((m) => /[\p{L}\p{N}]/u.test(m)).length;
  const longues = phrases.filter((p) => mots(p) > 20);
  vrai(`phrases de 20 mots au plus (${longues.length} trop longues)`, longues.length === 0, longues.slice(0, 3).join(" | "));
  const moyenne = phrases.reduce((s, p) => s + mots(p), 0) / phrases.length;
  vrai(`phrases de 13 mots en moyenne au plus (${moyenne.toFixed(1)})`, moyenne <= 13);
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const p = prog(1);
  const r = executer(p);
  dit(1, `Sous le drapeau, je compte $${sousLeDrapeau(p)}$ blocs.`);
  vrai("1. le 2e bloc est « dire Bonjour ! »", p[2] === "dire 'Bonjour !'");
  dit(1, `$30 + 20 = ${r.tortue.dist}$`);
  dit(1, `Réponse : a) $${sousLeDrapeau(p)}$ blocs ; b) « dire ${r.dits[0]} » ; c) $${r.tortue.dist}$ pas.`);
});
essai("2", () => {
  const r = executer(prog(2));
  dit(2, `Après un quart de tour, il regarde ${DIRECTION[r.caps[0]]}.`);
  dit(2, `il regarde ${DIRECTION[r.caps[1]]}.`);
  dit(2, `$20 + 20 + 20 = ${r.tortue.dist}$ pas.`);
  dit(2, `Réponse : a) ${DIRECTION[r.caps[0]]} ; b) ${DIRECTION[r.caps[1]]} ; c) $${r.tortue.dist}$ pas.`);
  memeChemin(2, 0, r.tortue.sommets);
});
essai("3", () => {
  const p = prog(3);
  enonceDit(3, `répète $6$ fois le bloc « ${p[2].trim()} »`);
  const r = executer(p);
  dit(3, `Il est donc exécuté $${r.avancer}$ fois.`);
  dit(3, `$6 \\times 15 = ${r.tortue.dist}$.`);
  dit(3, `Réponse : a) $${r.avancer}$ fois ; b) $${r.tortue.dist}$ pas.`);
});
essai("4", () => {
  const long = prog(4);
  const court = prog(4, "schema");
  const [rl, rc] = [executer(long), executer(court)];
  vrai("4. même trajet, avec ou sans boucle", JSON.stringify(rl.tortue.sommets) === JSON.stringify(rc.tortue.sommets));
  vrai("4. un carré de côté 25 : fermé, 4 sommets, 4 côtés de 25", rc.tortue.ferme && rc.tortue.distincts === 4 && rc.tortue.dist === 100);
  dit(4, `Le programme passe de $${sousLeDrapeau(long)}$ blocs à $${sousLeDrapeau(court)}$ blocs.`);
  dit(4, "Réponse : le programme ci-dessous. Il trace un carré.");
});
essai("5", () => {
  const p = prog(5);
  const r = executer(p);
  vrai("5. deux messages : Je pars !, Arrivé !", r.dits.join("|") === "Je pars !|Arrivé !");
  vrai("5. « Je pars ! » avant le premier avancer, « Arrivé ! » après le dernier", p.indexOf("dire 'Je pars !'") < p.indexOf("avancer de 40") && p.indexOf("dire 'Arrivé !'") === p.length - 1);
  dit(5, `c) Il y a deux blocs « dire » : $${r.dits.length}$ messages.`);
  dit(5, `d) $40 + 10 = ${r.tortue.dist}$ pas.`);
  dit(5, `Réponse : a) « ${r.dits[0]} » ; b) avant, puis après ; c) $${r.dits.length}$ ; d) $${r.tortue.dist}$ pas.`);
});
essai("6", () => {
  const p = prog(6);
  enonceDit(6, `répète $4$ fois : « ${p[3].trim()} », puis « ${p[4].trim()} »`);
  const r = executer(p);
  vrai("6. un carré fermé de côté 40", r.tortue.ferme && r.tortue.distincts === 4 && r.tortue.dist === 160 && r.tortue.cap === 0);
  dit(6, `c) $4 \\times 40 = ${r.tortue.dist}$ pas.`);
  memeChemin(6, 0, r.tortue.sommets);
});
essai("7", () => {
  const A = enMots(/Programme A : (.*?)\.\\n/.exec(e(7))[1]);
  const B = enMots(/Programme B : (.*?)\.\\n/.exec(e(7))[1]);
  vrai("7. mêmes blocs, autre ordre", JSON.stringify([...A].sort()) === JSON.stringify([...B].sort()) && A.join() !== B.join());
  const [tA, tB] = [executer(A).tortue, executer(B).tortue];
  memeChemin(7, 0, tA.sommets);
  memeChemin(7, 1, tB.sommets);
  dit(7, `Il arrive $${tA.x}$ pas à droite et $${tA.y}$ pas plus haut.`);
  dit(7, `$${tB.y}$ pas plus haut.`);
  vrai("7. B n'est pas allé à droite", tB.x === 0);
  dit(7, `Réponse : A arrive $${tA.x}$ pas à droite et $${tA.y}$ plus haut ; B arrive $${tB.y}$ pas plus haut.`);
});
essai("8", () => {
  const p = prog(8);
  enonceDit(8, "répète $5$ fois deux blocs : « avancer de 10 », puis « dire Hop ! »");
  const r = executer(p);
  dit(8, `a) $5$ tours : le lutin dit « Hop ! » $${r.dits.filter((d) => d === "Hop !").length}$ fois.`);
  dit(8, `b) $5 \\times 10 = ${r.tortue.dist}$ pas.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const r = executer(prog(9));
  memeChemin(9, 0, r.tortue.sommets);
  dit(9, `b) $60 + 30 + 60 = ${r.tortue.dist}$ pas.`);
  vrai("9. arrivée à la verticale du départ, 30 plus haut", r.tortue.x === 0 && r.tortue.y === 30);
  dit(9, `Il est $${r.tortue.y}$ pas plus haut que son départ.`);
  vrai("9. après le 2e tourner, il regarde vers la gauche", r.caps[1] === 180);
});
essai("10", () => {
  const r = executer(prog(10));
  memeChemin(10, 0, r.tortue.sommets);
  const xs = r.tortue.sommets.map((q) => q[0]), ys = r.tortue.sommets.map((q) => q[1]);
  const [L, l] = [Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
  vrai("10. un rectangle fermé de 80 sur 40", r.tortue.ferme && r.tortue.distincts === 4 && L === 80 && l === 40);
  dit(10, `c) $80 + 40 + 80 + 40 = ${r.tortue.dist}$ pas.`);
  dit(10, `$2 \\times 2 = ${r.avancer}$.`);
  dit(10, `Réponse : a) un rectangle ; b) $${L}$ et $${l}$ pas ; c) $${r.tortue.dist}$ pas ; d) $${r.avancer}$.`);
});
essai("11", () => {
  const p = prog(11);
  const r = executer(p);
  vrai("11. triangle fermé, 3 côtés de 60", r.tortue.ferme && r.tortue.distincts === 3 && r.tortue.dist === 180);
  dit(11, `$3 \\times 120 = ${r.tourne}$ degrés`);
  const z = executer(p.map((l) => l.replace("120°", "60°")));
  vrai("11. avec 60° : figure ouverte", !z.tortue.ferme);
  dit(11, `$3 \\times 60 = ${z.tourne}$ degrés seulement`);
  memeChemin(11, 0, r.tortue.sommets);
  memeChemin(11, 1, z.tortue.sommets);
});
essai("12", () => {
  enonceDit(12, "répéter 4 fois « avancer de 30 »");
  const nina = executer(["répéter 4 fois", "  avancer de 30"]);
  const juste = executer(["répéter 4 fois", "  avancer de 30", "  tourner à gauche de 90°"]);
  const dehors = executer(["répéter 4 fois", "  avancer de 30", "tourner à gauche de 90°"]);
  vrai("12. Nina : un trait droit de 120", nina.tortue.y === 0 && nina.tortue.x === 120);
  vrai("12. corrigé : un carré fermé", juste.tortue.ferme && juste.tortue.distincts === 4);
  vrai("12. tourner hors de la boucle : une seule fois, pas de carré", dehors.caps.length === 1 && !dehors.tortue.ferme);
  dit(12, `$4 \\times 30 = ${nina.tortue.dist}$ pas`);
  memeChemin(12, 0, nina.tortue.sommets);
  memeChemin(12, 1, juste.tortue.sommets);
});
essai("13", () => {
  const melange = prog(13);
  const [range, enCouleur] = dessin("scratch", 13, "schema");
  vrai("13. le programme rangé reprend les trois blocs", JSON.stringify(range.slice(1).sort()) === JSON.stringify([...melange].sort()) && range[0].startsWith("quand"));
  const r = executer(range);
  vrai("13. rangé : un trait de 50, puis « Fini ! »", r.trait === 50 && r.dits.join() === "Fini !");
  const tard = executer(["quand drapeau vert cliqué", "avancer de 50", "stylo en position d'écriture", "dire 'Fini !'"]);
  vrai("13. stylo posé trop tard : aucun trait", tard.trait === 0);
  vrai("13. la ligne entourée est le stylo", range[enCouleur].startsWith("stylo"));
});
essai("14", () => {
  const [chemins] = dessin("lutin", 14, "figure");
  const r = executer(prog(14, "schema"));
  memeChemin(14, 0, r.tortue.sommets);
  vrai("14. le programme a 5 blocs", sousLeDrapeau(prog(14, "schema")) === 5 && c(14).includes("en $5$ blocs"));
  vrai("14. le trajet lu a 3 côtés", chemins[0].length === 4);
});
essai("15", () => {
  const r = executer(prog(15));
  memeChemin(15, 0, r.tortue.sommets);
  dit(15, `Trois tours : $3 \\times 40 = ${r.tortue.dist}$ pas.`);
  vrai("15. arrivée 60 à droite, 60 plus haut, regard vers la droite", r.tortue.x === 60 && r.tortue.y === 60 && r.tortue.cap === 0);
  dit(15, `c) Il va $3 \\times 20 = ${r.tortue.x}$ pas à droite et $${r.tortue.y}$ pas plus haut.`);
});
essai("16", () => {
  const p = prog(16, "schema");
  const r = executer(p);
  vrai("16. carré fermé de côté 35", r.tortue.ferme && r.tortue.distincts === 4 && r.tortue.dist === 140 && r.trait === 140);
  const [p200] = [...e(16).matchAll(/périmètre \$(\d+)\$/g)].map((m) => Number(m[1]));
  const c50 = p200 / 4;
  dit(16, `$200 \\div 4 = ${c50}$`);
  const r50 = executer(p.map((l) => l.replace("avancer de 35", `avancer de ${c50}`)));
  vrai("16. avec 50 : périmètre 200", r50.tortue.dist === p200 && r50.tortue.ferme);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const r = executer(prog(17));
  memeChemin(17, 0, r.tortue.sommets);
  dit(17, `$4 + 4 = ${r.dits.length}$ graines`);
  dit(17, `$120 + 20 + 120 = ${r.tortue.dist}$ pas.`);
  vrai("17. arrivée 20 pas au-dessus du départ", r.tortue.x === 0 && r.tortue.y === 20);
  dit(17, `Réponse : a) $${r.dits.length}$ ; b) $${r.tortue.dist}$ pas ; c) $20$ pas ; d) $${r.tortue.y}$ pas au-dessus du départ.`);
  dit(17, `au lieu des blocs exécutés ($${r.dits.length}$)`);
});
essai("18", () => {
  const blocs = [...e(18).matchAll(/avance de (\d+)|tourne à (droite|gauche) de (\d+)°/g)].map((m) => (m[1] ? `avancer de ${m[1]}` : `tourner à ${m[2]} de ${m[3]}°`));
  vrai(`18. sept blocs lus dans l'énoncé (${blocs.length})`, blocs.length === 7);
  const r = executer(blocs);
  memeChemin(18, 0, r.tortue.sommets);
  const xs = r.tortue.sommets.map((q) => q[0]), ys = r.tortue.sommets.map((q) => q[1]);
  vrai("18. un rectangle fermé de 50 sur 30", r.tortue.ferme && r.tortue.distincts === 4 && Math.max(...xs) - Math.min(...xs) === 50 && Math.max(...ys) - Math.min(...ys) === 30);
  dit(18, `$50 + 30 + 50 + 30 = ${r.tortue.dist}$ pas`);
  const boucle = executer(["répéter 2 fois", "  avancer de 50", "  tourner à droite de 90°", "  avancer de 30", "  tourner à droite de 90°"]);
  vrai("18. la version en boucle fait le même trajet, et finit tournée comme au départ", JSON.stringify(boucle.tortue.sommets) === JSON.stringify(r.tortue.sommets) && boucle.tortue.cap === 0);
  dit(18, "Répéter 2 fois : avancer de 50, tourner à droite de 90°, avancer de 30, tourner à droite de 90°.");
  dit(18, `$3 \\times 160 = ${3 * r.tortue.dist}$ m`);
});
essai("19", () => {
  const [n] = [...e(19).matchAll(/répète \$(\d+)\$ fois/g)].map((m) => Number(m[1]));
  const a = 360 / n;
  dit(19, `$360 \\div 6 = ${a}$`);
  const r = executer([`répéter ${n} fois`, "  avancer de 30", `  tourner à gauche de ${a}°`]);
  vrai("19. l'hexagone se ferme", r.tortue.ferme && r.tortue.distincts === 6);
  memeChemin(19, 0, r.tortue.sommets);
  dit(19, `b) $6 \\times 30 = ${r.tortue.dist}$ pas.`);
  const n72 = [...Array(12).keys()].slice(1).find((k) => executer([`répéter ${k} fois`, "  avancer de 30", "  tourner à gauche de 72°"]).tortue.ferme);
  dit(19, `$360 \\div 72 = ${n72}$`);
  dit(19, `Réponse : a) $${a}°$ ; b) $${r.tortue.dist}$ pas ; c) $${n72}$ tours.`);
});
essai("20", () => {
  const r = executer(prog(20));
  memeChemin(20, 0, r.tortue.sommets);
  const [tx, ty] = [...e(20).matchAll(/\$(\d+)\$ pas/g)].map((m) => Number(m[1]));
  vrai("20. arrivée sur le trésor", r.tortue.x === tx && r.tortue.y === ty);
  dit(20, `b) $30 + 20 + 20 + 10 = ${r.tortue.dist}$ pas.`);
  dit(20, `$1$ bloc avant la boucle, $2$ dans la boucle, $1$ après : $${r.avancer}$.`);
  vrai("20. trois blocs « avancer » écrits", prog(20).filter((l) => l.includes("avancer")).length === 3);
  vrai("20. « Trésor ! » dit à la fin", r.dits.at(-1) === "Trésor !");
});

f.fin();
