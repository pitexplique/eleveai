// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Algorithmique et
// programmation » de 4e (lib/fiches-exercices/maths-4e-algorithmique.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque programme dessiné (`programme([…])`) est RELU dans
// le source et EXÉCUTÉ par un petit interprète de blocs façon Scratch écrit
// ici (mettre, ajouter, dire, demander, répéter … fois, répéter jusqu'à,
// si … alors … sinon, avancer, tourner à gauche / à droite). Ce qu'il dit est
// comparé au corrigé ; chaque trace (`trace(…)`) est relue et comparée, case par
// case, à l'exécution ; chaque tracé du lutin (`lutin([…])`) est relu et
// comparé, sommet par sommet, au chemin de la tortue.
//
//   node scripts/verifier-exercices-algorithmique-4e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── L'interprète de blocs ─────────────────────────────────────────────────── */

/** Les lignes indentées (2 espaces par niveau) → un arbre de blocs. */
function analyser(lignes) {
  const L = lignes.map((t) => ({ niv: t.match(/^ */)[0].length / 2, t: t.trim() }));
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

const traduire = (e) => e.replace(/≥/g, ">=").replace(/≤/g, "<=").replace(/ = /g, " == ");

/** Exécute le programme. `entrees` : la liste des réponses aux « demander ». */
function executer(lignes, entrees = []) {
  const s = { réponse: undefined };
  const dits = [];
  const pas = [];
  const tours = [];
  const tortue = { x: 0, y: 0, cap: 0, dist: 0, sommets: [[0, 0]] };
  const file = [...entrees];
  const ev = (e) => new Function("s", `with (s) { return (${traduire(e)}); }`)(s);
  let garde = 0;
  const run = (blocs) => {
    for (const n of blocs) {
      if (++garde > 200000) throw new Error("boucle infinie");
      let m;
      if (/^stylo/.test(n.t)) continue;
      else if (/^demander /.test(n.t)) {
        if (!file.length) throw new Error(`plus d'entrée pour : ${n.t}`);
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
      } else if ((m = /^répéter jusqu'à (.+)$/.exec(n.t))) {
        while (!ev(m[1])) {
          run(n.corps);
          tours.push({ ...s });
          if (++garde > 200000) throw new Error("boucle infinie");
        }
      } else if ((m = /^si (.+) alors$/.exec(n.t))) run(ev(m[1]) ? n.corps : n.sinon ?? []);
      else if ((m = /^avancer de (.+)$/.exec(n.t))) {
        const d = ev(m[1]);
        tortue.dist += d;
        tortue.x += d * Math.cos((tortue.cap * Math.PI) / 180);
        tortue.y += d * Math.sin((tortue.cap * Math.PI) / 180);
        tortue.sommets.push([Math.round(tortue.x * 1e6) / 1e6 + 0, Math.round(tortue.y * 1e6) / 1e6 + 0]);
      } else if ((m = /^tourner à (gauche|droite) de (.+)$/.exec(n.t))) {
        tortue.cap += (m[1] === "gauche" ? 1 : -1) * ev(m[2]);
      } else throw new Error(`bloc inconnu : ${n.t}`);
    }
  };
  run(analyser(lignes));
  const distincts = new Set(tortue.sommets.map((p) => p.join(";"))).size;
  const ferme = tortue.sommets.length > 1 && tortue.sommets.at(-1).join(";") === "0;0";
  return { dits, pas, tours, s, tortue: { ...tortue, distincts, ferme } };
}

/* ── Lecture du source ─────────────────────────────────────────────────────── */

/** Les programmes d'un bloc, dans l'ordre (énoncé puis corrigé). */
const programmes = (bloc) =>
  [...bloc.matchAll(/programme\(\[([\s\S]*?)\](?:, \d+)?\)/g)].map((m) => [...m[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]));
/** Les lignes de la (première) trace d'un bloc, cases en texte (« −3 » lu « -3 »). */
const traceDe = (bloc) => {
  const m = bloc.match(/trace\((\[[^\]]*\]), (\[\[[\s\S]*?\]\])\)/);
  return m ? JSON.parse(m[2]).map((l) => l.map((c) => String(c).replace(/−/g, "-"))) : null;
};
/** Les tracés du lutin d'un bloc : leurs sommets, dans l'ordre. */
const lutinsDe = (bloc) => [...bloc.matchAll(/lutin\((\[\[[\s\S]*?\]\]), "/g)].map((m) => JSON.parse(m[1]));
const texte = (rangs) => rangs.map((l) => l.map((c) => String(c)));
const vf = (b) => (b ? "vrai" : "faux");
const virgule = (x) => String(x).replace(".", ",");

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const ecrit = (k, t) => v.ok(`${k}. le corrigé écrit ${t}`, c(k).includes(t), "absent");
  const prog = (k, i = 0) => programmes(f.blocs[k - 1] ?? "")[i] ?? [];
  const tr = (k) => traceDe(f.blocs[k - 1] ?? "");
  const memeTrace = (k, attendu) => {
    const lu = tr(k);
    const at = JSON.stringify(texte(attendu));
    v.ok(`${k}. la trace est celle de l'exécution`, JSON.stringify(lu) === at, `lu ${JSON.stringify(lu)} ; calculé ${at}`);
  };
  const dit = (k, entrees, attendu, i = 0) => {
    const r = executer(prog(k, i), entrees);
    v.ok(`${k}. le programme ${i ? "corrigé " : ""}dit ${JSON.stringify(attendu)} (entrées ${JSON.stringify(entrees)})`, JSON.stringify(r.dits) === JSON.stringify(attendu), JSON.stringify(r.dits));
    return r;
  };
  const premierDit = (lignes, e) => executer(lignes, [e]).dits[0];
  /** Le tracé dessiné est-il, sommet par sommet, celui de la tortue ? */
  const memeChemin = (k, j, lignes) => {
    const dessin = lutinsDe(f.blocs[k - 1] ?? "")[j];
    const chemin = executer(lignes).tortue.sommets;
    const ok = !!dessin && dessin.length === chemin.length && dessin.every(([x, y], i) => Math.abs(x - chemin[i][0]) < 1e-6 && Math.abs(y - chemin[i][1]) < 1e-6);
    v.ok(`${k}. le tracé n° ${j + 1} du lutin est celui de l'exécution`, ok, `dessin ${JSON.stringify(dessin)} ; exécution ${JSON.stringify(chemin)}`);
  };

  v.titre("Les dessins");
  const longues = f.blocs.flatMap((b) => programmes(b)).flat().filter((l) => l.length > 30);
  v.ok("aucune ligne de programme au-delà de 30 signes (375 px)", longues.length === 0, longues.join(" | "));
  const schemas = (f.series.match(/^\s*schema:/gm) ?? []).length;
  v.ok(`un schéma dans chaque corrigé : ${schemas}/20`, schemas === 20, String(schemas));

  v.titre("★ Un seul geste");
  // 1
  const r1 = dit(1, [], [15]);
  memeTrace(1, ["mettre à 20", "+ 6", "mettre à 9", "+ 6"].map((b, j) => [b, r1.pas[j].billes]));
  ecrit(1, "le lutin dit $15$");
  v.ok("1. tout additionner donne 41", 20 + 6 + 9 + 6 === 41 && c(1).includes("= 41$"));
  // 2
  const r2 = dit(2, [], [10, 10]);
  memeTrace(2, ["a à 4", "b à 10", "a à b", "b à a"].map((b, j) => [b, r2.pas[j].a, r2.pas[j].b ?? "—"]));
  ecrit(2, "le lutin dit $10$, puis $10$");
  const e2 = executer(prog(2, 1)).dits;
  v.ok("2. le programme corrigé échange vraiment (10 puis 4)", JSON.stringify(e2) === "[10,4]" && c(2).includes("Le lutin dit alors $10$, puis $4$"), JSON.stringify(e2));
  // 3
  const lu3 = tr(3) ?? [];
  // `\n` : les énoncés relus gardent le « \n » ÉCRIT du source (deux signes).
  const conds3 = /a\) « ([^»]+) »\\nb\) « ([^»]+) »\\nc\) « ([^»]+) »\\nd\) « ([^»]+) »\\ne\) « ([^»]+) »/.exec(f.enonces[2] ?? "")?.slice(1) ?? [];
  const vals3 = conds3.map((cd) => vf(executer([`mettre v à 7`, `si ${cd} alors`, "  dire 1", "sinon", "  dire 0"]).dits[0] === 1));
  v.ok("3. la trace reprend les cinq conditions de l'énoncé", conds3.length === 5 && JSON.stringify(lu3.map((l) => l[0])) === JSON.stringify(conds3), JSON.stringify(conds3));
  memeTrace(3, conds3.map((cd, j) => [cd, vals3[j]]));
  ecrit(3, `Réponse : ${vals3.join(", ")}.`);
  // 4
  const e4 = [-4, 0, 15];
  const lu4 = e4.map((t) => premierDit(prog(4), t));
  v.ok("4. glace, glace, eau liquide", JSON.stringify(lu4) === JSON.stringify(["glace", "glace", "eau liquide"]), JSON.stringify(lu4));
  ecrit(4, "Réponse : « glace », « glace », « eau liquide »");
  memeTrace(4, e4.map((t, j) => [t, vf(t <= 0), lu4[j]]));
  v.ok("4. 120 °C : encore « eau liquide »", premierDit(prog(4), 120) === "eau liquide");
  // 5
  const e5 = [3, 6, 11];
  const lu5 = e5.map((a) => premierDit(prog(5), a));
  v.ok("5. 2, 4, 4", JSON.stringify(lu5) === "[2,4,4]", JSON.stringify(lu5));
  ecrit(5, "Réponse : $2$ €, $4$ €, $4$ €");
  memeTrace(5, e5.map((a, j) => [a, vf(a < 6), lu5[j]]));
  // 6
  const p6 = prog(6, 1);
  const ok6 = [...Array(61).keys()].map((k) => k + 90).every((t) => premierDit(p6, t) === (t >= 120 ? "tu peux monter" : "trop petit"));
  v.ok("6. la condition corrigée accepte exactement 120 et plus", ok6 && p6[2] === "si t ≥ 120 alors" && c(6).includes("Réponse : « si t ≥ 120 alors »"));
  const faux6 = ["t > 120", "t < 120", "t = 120"].every((cd) => {
    const p = p6.map((l) => (l === "si t ≥ 120 alors" ? `si ${cd} alors` : l));
    return [119, 120, 121].some((t) => premierDit(p, t) !== premierDit(p6, t));
  });
  v.ok("6. les trois autres conditions se trompent sur 119, 120 ou 121", faux6);
  memeTrace(6, [119, 120, 121].map((t) => [t, vf(t >= 120), premierDit(p6, t)]));
  v.ok("6. le programme de l'énoncé est celui du corrigé, pointillés à part", JSON.stringify(prog(6).filter((l) => l !== "si ... alors")) === JSON.stringify(p6.filter((l) => l !== "si t ≥ 120 alors")));
  // 7
  const e7 = [2, 3, 5];
  const av7 = e7.map((u) => premierDit(prog(7), u));
  const ap7 = e7.map((u) => premierDit(prog(7, 1), u));
  v.ok("7. après : risque faible, protège-toi, protège-toi", JSON.stringify(ap7) === JSON.stringify(["risque faible", "protège-toi", "protège-toi"]), JSON.stringify(ap7));
  v.ok("7. un seul bloc modifié", prog(7).filter((l, j) => l !== prog(7, 1)[j]).length === 1 && prog(7).length === prog(7, 1).length);
  v.ok("7. le corrigé alerte exactement dès 3 (indices 0 à 11)", [...Array(12).keys()].every((u) => (premierDit(prog(7, 1), u) === "protège-toi") === u >= 3));
  ecrit(7, "Réponse : « risque faible », « protège-toi », « protège-toi »");
  memeTrace(7, e7.map((u, j) => [u, av7[j], ap7[j]]));
  // 8
  const r8 = dit(8, [], [22]);
  memeTrace(8, [["départ", 50], ...r8.tours.map((t, j) => [j + 1, t.gourde])]);
  ecrit(8, "le lutin dit $22$");
  v.ok("8. le piège : 50 + 28 = 78", 50 + 4 * 7 === 78 && c(8).includes("$50 + 28 = 78$"));

  v.titre("★★ Type devoir");
  // 9 — chaque colonne recalculée à la main, pas par le programme
  const e9 = [20, 100, -40];
  const lu9 = e9.map((x) => premierDit(prog(9), x));
  v.ok("9. le programme dit 68, 212, −40", JSON.stringify(lu9) === "[68,212,-40]", JSON.stringify(lu9));
  memeTrace(9, e9.map((x) => [x, x * 9, (x * 9) / 5, (x * 9) / 5 + 32]));
  v.ok("9. le programme calcule 1,8c + 32 (c de −50 à 50)", [...Array(101).keys()].every((k) => Math.abs(premierDit(prog(9), k - 50) - (1.8 * (k - 50) + 32)) < 1e-9) && c(9).includes("soit $1{,}8c + 32$"));
  v.ok("9. −40 est le seul entier fixe (de −200 à 200)", [...Array(401).keys()].map((k) => k - 200).filter((x) => premierDit(prog(9), x) === x).join() === "-40");
  v.ok("9. le piège : (20 + 32) × 9 ÷ 5 = 93,6", ((20 + 32) * 9) / 5 === 93.6 && c(9).includes("= 93{,}6$"));
  ecrit(9, "Réponse : $68$ °F");
  ecrit(9, "l'eau bout à $212$ °F");
  // 10
  const p10 = prog(10, 1);
  dit(10, [20, 8], [68], 1);
  v.ok("10. le bloc complété vaut 3v + n (v, n de 0 à 38)", [...Array(39).keys()].every((vv) => [0, 5, 12].every((n) => executer(p10, [vv, n]).dits[0] === 3 * vv + n)));
  v.ok("10. 20 + 8 + 6 = 34 matchs (18 clubs)", 20 + 8 + 6 === 2 * (18 - 1));
  const faux10 = executer(p10.map((l) => (l === "mettre pts à 3 * v + n" ? "mettre pts à 3 * (v + n)" : l)), [20, 8]).dits[0];
  v.ok("10. la version fausse dit 84", faux10 === 84 && c(10).includes("= 3 \\times 28 = 84$"), String(faux10));
  ecrit(10, "Réponse : le lutin dit $68$");
  // 11
  const des = [6, 2, 6, 5, 1];
  const r11 = dit(11, des, [9]);
  memeTrace(11, r11.tours.map((t, j) => [j + 1, des[j], t.pièces]));
  let min11 = Infinity;
  let max11 = -Infinity;
  for (let n = 0; n < 6 ** 5; n++) {
    const lancers = [0, 1, 2, 3, 4].map((i) => (Math.floor(n / 6 ** i) % 6) + 1);
    const p = executer(prog(11), lancers).dits[0];
    min11 = Math.min(min11, p);
    max11 = Math.max(max11, p);
  }
  v.ok("11. les 7 776 suites de lancers : de 5 à 15 pièces", min11 === 5 && max11 === 15 && c(11).includes("au moins $5$ pièces, au plus $15$"), `${min11} à ${max11}`);
  const deux11 = des.reduce((t, d) => t + (d === 6 ? 4 : 1), 0);
  v.ok("11. les deux branches à la fois donneraient 11", deux11 === 11 && c(11).includes("$11$ au lieu de $9$"));
  // 12
  const e12 = [11, 12, 13];
  const lu12 = e12.map((k) => premierDit(prog(12), k));
  v.ok("12. cabine, soute, soute", JSON.stringify(lu12) === JSON.stringify(["en cabine", "en soute", "en soute"]), JSON.stringify(lu12));
  ecrit(12, "Réponse : « en cabine », « en soute », « en soute »");
  v.ok("12. le corrigé : cabine exactement jusqu'à 12 kg (0 à 30 kg, pas de 0,5)", [...Array(61).keys()].map((k) => k / 2).every((k) => (premierDit(prog(12, 1), k) === "en cabine") === k <= 12));
  v.ok("12. seule la valise de 12 kg change de réponse", e12.filter((k) => premierDit(prog(12), k) !== premierDit(prog(12, 1), k)).join() === "12");
  v.ok("12. 5 kg et 20 kg ne voient pas l'erreur", [5, 20].every((k) => premierDit(prog(12), k) === premierDit(prog(12, 1), k)));
  memeTrace(12, e12.map((k) => [k, vf(k < 12), vf(k <= 12)]));
  // 13
  const t13 = executer(prog(13)).tortue;
  v.ok("13. rectangle : 4 sommets, fermé, 220 pas", t13.ferme && t13.distincts === 4 && t13.dist === 220 && c(13).includes("le tracé mesure $220$ pas"));
  const xs13 = t13.sommets.map((p) => p[0]);
  const ys13 = t13.sommets.map((p) => p[1]);
  v.ok("13. dimensions 80 sur 30", Math.max(...xs13) - Math.min(...xs13) === 80 && Math.max(...ys13) - Math.min(...ys13) === 30 && c(13).includes("un rectangle de $80$ pas sur $30$ pas"));
  memeChemin(13, 0, prog(13));
  const t13b = executer(prog(13, 1)).tortue;
  const cotes13 = t13b.sommets.slice(1).map((p, i) => Math.hypot(p[0] - t13b.sommets[i][0], p[1] - t13b.sommets[i][1]));
  v.ok("13. le corrigé trace un carré de côté 50 (4 sommets, fermé, 200 pas)", t13b.ferme && t13b.distincts === 4 && t13b.dist === 200 && cotes13.every((d) => Math.abs(d - 50) < 1e-9) && c(13).includes("$4 \\times 50 = 200$"));
  const t13c = executer(["répéter 2 fois", "  avancer de 50", "  tourner à gauche de 90"]).tortue;
  v.ok("13. le piège : 2 fois un seul côté, pas fermé", !t13c.ferme && t13c.sommets.length === 3);
  // 14
  const r14 = dit(14, [], [6]);
  memeTrace(14, r14.tours.map((t) => [t.sem, t.argent]));
  v.ok("14. 107 € à la fin ; 95 € après 5 semaines", r14.s.argent === 107 && r14.tours[4].argent === 95 && c(14).includes("Léa a $107$ €") && c(14).includes("= 95$ €"));
  v.ok("14. 65 ÷ 12 ≈ 5,4", Math.round((65 / 12) * 10) / 10 === 5.4 && 100 - 35 === 65);
  ecrit(14, "Réponse : le lutin dit $6$");
  // 15
  const e15 = [2, 7, 8.1];
  const lu15 = e15.map((p) => premierDit(prog(15), p));
  v.ok("15. acide, neutre, basique", JSON.stringify(lu15) === JSON.stringify(["acide", "neutre", "basique"]), JSON.stringify(lu15));
  v.ok("15. un seul « dire » à chaque fois (pH de 0 à 14, pas de 0,1)", [...Array(141).keys()].every((k) => executer(prog(15), [k / 10]).dits.length === 1));
  ecrit(15, "Réponse : « acide », « neutre », « basique »");
  memeTrace(15, e15.map((p, j) => [virgule(p), vf(p < 7), p < 7 ? "—" : vf(p === 7), lu15[j]]));
  // 16
  const e16 = [17, 19, 21];
  const lu16 = e16.map((t) => premierDit(prog(16), t));
  v.ok("16. on chauffe, on arrête, on arrête", JSON.stringify(lu16) === JSON.stringify(["on chauffe", "on arrête", "on arrête"]), JSON.stringify(lu16));
  ecrit(16, "Réponse : « on chauffe », « on arrête », « on arrête »");
  const p16 = prog(16, 1);
  const avec19 = p16.map((l) => (l === "mettre consigne à 16" ? "mettre consigne à 19" : l));
  v.ok("16. avec consigne à 19, le programme réécrit dit la même chose (0 à 30 °C)", avec19 !== p16 && [...Array(61).keys()].every((k) => premierDit(avec19, k / 2) === premierDit(prog(16), k / 2)));
  v.ok("16. consigne à 16 : 17 °C → « on arrête », 15 °C → « on chauffe »", p16[0] === "mettre consigne à 16" && premierDit(p16, 17) === "on arrête" && premierDit(p16, 15) === "on chauffe" && c(16).includes("Réponse : le programme dit « on arrête »"));

  v.titre("★★★ Problèmes");
  // 17
  const comptes = [520, 480, 495, 450, 410];
  const r17 = dit(17, comptes, [3]);
  memeTrace(17, r17.tours.map((t, j) => [j + 2, comptes[j + 1], comptes[j + 1] < comptes[j] ? "oui" : "non", t.baisses]));
  const deplace = prog(17).filter((l) => l !== "  mettre avant à réponse");
  deplace.splice(deplace.indexOf("  demander 'Année suivante ?'") + 1, 0, "  mettre avant à réponse");
  const b17 = executer(deplace, comptes).dits[0];
  v.ok("17. « avant » mis à jour avant le test : 0", b17 === 0 && c(17).includes("Réponse : le lutin dit $0$"), String(b17));
  dit(17, comptes, [3, comptes[0] - comptes.at(-1)], 1);
  ecrit(17, "Réponse : le lutin dit $3$, puis $520 - 410 = 110$");
  // 18
  const r18 = dit(18, [], [2, 3]);
  memeTrace(18, r18.tours.map((t, j) => [j + 1, t.reste, t.billets]));
  const p18 = prog(18, 1);
  v.ok("18. le programme complet commence par celui de l'énoncé", JSON.stringify(p18.slice(0, prog(18).length)) === JSON.stringify(prog(18)));
  dit(18, [], [2, 3, 1, 1], 1);
  const avec17 = p18.map((l) => (l === "mettre reste à 13" ? "mettre reste à 17" : l));
  const d17 = executer(avec17).dits;
  v.ok("18. avec 17 € : 3, 2, 1, 0", JSON.stringify(d17) === "[3,2,1,0]" && 3 * 5 + 2 === 17 && c(18).includes("le lutin dit $3$, $2$, $1$, puis $0$"), JSON.stringify(d17));
  const le15 = executer(prog(18).map((l) => (l === "mettre reste à 13" ? "mettre reste à 15" : l.replace("reste < 5", "reste ≤ 5")))).dits;
  v.ok("18. le piège « ≤ 5 » avec 15 € : 2 billets, 5 € restent", JSON.stringify(le15) === "[2,5]", JSON.stringify(le15));
  ecrit(18, "Réponse : le lutin dit $2$ (billets), puis $3$");
  // 19
  const e19 = [10, 15, 20];
  const lu19 = e19.map((t) => premierDit(prog(19), t));
  v.ok("19. tickets, tickets, pass", JSON.stringify(lu19) === JSON.stringify(["garde les tickets", "garde les tickets", "prends le pass"]), JSON.stringify(lu19));
  const p19 = prog(19, 1);
  memeTrace(19, e19.map((t) => [t, 2 * t, premierDit(p19, t)]));
  v.ok("19. le corrigé dit « même prix » à 15 trajets seulement (0 à 60)", [...Array(61).keys()].every((t) => (premierDit(p19, t) === "même prix") === (2 * t === 30)));
  v.ok("19. hors 15, le corrigé dit comme l'original", [...Array(61).keys()].filter((t) => t !== 15).every((t) => premierDit(p19, t) === premierDit(prog(19), t)));
  const seuil19 = [...Array(61).keys()].find((t) => premierDit(prog(19), t) === "prends le pass");
  v.ok("19. le pass devient moins cher à 16 trajets (32 €)", seuil19 === 16 && 2 * 16 === 32 && c(19).includes("à partir de $16$ trajets, qui coûtent $32$ €"), String(seuil19));
  // 20
  const t20 = executer(prog(20)).tortue;
  const fin20 = t20.sommets.at(-1);
  v.ok("20. 3 marches : 120 pas, arrivée (60 ; 60)", t20.dist === 120 && fin20.join(";") === "60;60" && c(20).includes("= 120$ pas") && c(20).includes("$60$ pas plus à droite et $60$ pas plus haut"));
  memeChemin(20, 0, prog(20));
  const p20 = prog(20, 1);
  const t20b = executer(p20).tortue;
  v.ok("20. 5 marches de 12 : même arrivée, 120 pas", t20b.dist === 120 && t20b.sommets.at(-1).join(";") === "60;60" && p20[1] === "répéter 5 fois" && c(20).includes("$60 \\div 5 = 12$") && c(20).includes("le tracé mesure encore $120$ pas"));
  memeChemin(20, 1, p20);
  const t20c = executer(["répéter 10 fois", "  avancer de 6", "  tourner à gauche de 90", "  avancer de 6", "  tourner à droite de 90"]).tortue;
  v.ok("20. 10 marches de 6 : encore 120 pas", t20c.dist === 120 && t20c.sommets.at(-1).join(";") === "60;60");
  const t20d = executer(prog(20).map((l) => l.replace("à droite", "à gauche"))).tortue;
  const xs20 = t20d.sommets.map((p) => p[0]);
  const ys20 = t20d.sommets.map((p) => p[1]);
  v.ok("20. le piège (deux fois à gauche) : un carré de côté 20", t20d.distincts === 4 && Math.max(...xs20) - Math.min(...xs20) === 20 && Math.max(...ys20) - Math.min(...ys20) === 20 && c(20).includes("un carré de côté $20$"));
}

lancer({
  nom: "ALGORITHMIQUE ET PROGRAMMATION · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-algorithmique.tsx",
  notionId: "algo_programmation",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : « mettre à 9 » devenu « ajouter »", "\"mettre billes à 9\"", "\"ajouter 9 à billes\""],
    ["ex. 1 : la trace fausse", "[\"mettre à 9\", 9]", "[\"mettre à 9\", 35]"],
    ["ex. 2 : l'échange corrigé encore faux", "\"mettre b à c\"", "\"mettre b à a\""],
    ["ex. 3 : une condition mal évaluée", "[\"v ≥ 7\", \"vrai\"]", "[\"v ≥ 7\", \"faux\"]"],
    ["ex. 4 : ≤ devenu <", "\"si réponse ≤ 0 alors\"", "\"si réponse < 0 alors\""],
    ["ex. 5 : un prix faux dans la trace", "[6, \"faux\", 4]", "[6, \"faux\", 2]"],
    ["ex. 6 : la condition corrigée exclut 120", "\"si t ≥ 120 alors\", \"  dire 'tu peux monter'\", \"sinon\", \"  dire 'trop petit'\"], 2)", "\"si t > 120 alors\", \"  dire 'tu peux monter'\", \"sinon\", \"  dire 'trop petit'\"], 2)"],
    ["ex. 7 : le seuil corrigé à > 3", "\"si réponse ≥ 3 alors\"", "\"si réponse > 3 alors\""],
    ["ex. 8 : la gourde perd 8 cL", "\"  ajouter -7 à gourde\"", "\"  ajouter -8 à gourde\""],
    ["ex. 9 : la conversion fausse", "\"mettre f à c * 9 / 5 + 32\"", "\"mettre f à (c + 32) * 9 / 5\""],
    ["ex. 10 : le bloc complété avec parenthèses", "\"mettre pts à 3 * v + n\"", "\"mettre pts à 3 * (v + n)\""],
    ["ex. 11 : un six ne rapporte que 2", "\"    ajouter 3 à pièces\"", "\"    ajouter 2 à pièces\""],
    ["ex. 12 : le corrigé garde < 12", "\"si réponse ≤ 12 alors\"", "\"si réponse < 12 alors\""],
    ["ex. 13 : le rectangle dessiné faux", "[[0, 0], [80, 0], [80, 30], [0, 30], [0, 0]]", "[[0, 0], [80, 0], [80, 40], [0, 40], [0, 0]]"],
    ["ex. 13 : le carré ne ferme pas", "\"  tourner à gauche de 90\"], 1)", "\"  tourner à gauche de 80\"], 1)"],
    ["ex. 14 : 5 semaines annoncées", "Réponse : le lutin dit $6$", "Réponse : le lutin dit $5$"],
    ["ex. 15 : l'eau pure dite basique", "[7, \"faux\", \"vrai\", \"neutre\"]", "[7, \"faux\", \"vrai\", \"basique\"]"],
    ["ex. 16 : la consigne de nuit à 18", "\"mettre consigne à 16\"", "\"mettre consigne à 18\""],
    ["ex. 17 : la mise à jour avant le test", "\"  si réponse < avant alors\", \"    ajouter 1 à baisses\", \"  mettre avant à réponse\", \"dire baisses\"]", "\"  mettre avant à réponse\", \"  si réponse < avant alors\", \"    ajouter 1 à baisses\", \"dire baisses\"]"],
    ["ex. 18 : la boucle des pièces en ≤", "\"répéter jusqu'à reste < 2\"", "\"répéter jusqu'à reste ≤ 2\""],
    ["ex. 19 : le seuil annoncé à 15", "à partir de $16$ trajets", "à partir de $15$ trajets"],
    ["ex. 20 : l'escalier dessiné faux", "[48, 36], [48, 48], [60, 48]", "[48, 36], [48, 50], [60, 50]"],
    ["ex. 20 : une marche corrigée de 10", "\"  avancer de 12\", \"  tourner à droite de 90\"", "\"  avancer de 10\", \"  tourner à droite de 90\""],
  ],
});
