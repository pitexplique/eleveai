// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Algorithmique et
// programmation » de 3e (lib/fiches-exercices/maths-3e-algorithmique.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque programme dessiné (`programme([…])`) est RELU dans
// le source et EXÉCUTÉ par un petit interprète de blocs façon Scratch écrit
// ici (mettre, ajouter, dire, demander, répéter … fois, répéter jusqu'à,
// si … alors … sinon, avancer, tourner). Ce qu'il dit est comparé au corrigé ;
// chaque trace (`trace(…)`) est relue et comparée, case par case, à l'exécution.
//
//   node scripts/verifier-exercices-algorithmique-3e.mjs

import { lireFeuille, lancer, identiques } from "./verifier-exercices-commun.mjs";

/* ── L'interprète de blocs ─────────────────────────────────────────────────── */

/** Les lignes indentées (2 espaces par niveau) → un arbre de blocs. */
function analyser(lignes) {
  const L = lignes.map((t) => ({ niv: (t.match(/^ */)[0].length) / 2, t: t.trim() }));
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

const traduire = (e) => e.replace(/ = /g, " == ").replace(/ et /g, " && ").replace(/ ou /g, " || ");

/** Exécute le programme. `entrees` : liste, ou fonction (dits jusque-là) → réponse. */
function executer(lignes, entrees = []) {
  const s = { réponse: undefined };
  const dits = [];
  const pas = [];
  const tours = [];
  const tortue = { x: 0, y: 0, cap: 0, dist: 0, angle: 0, sommets: [[0, 0]] };
  const file = Array.isArray(entrees) ? [...entrees] : null;
  const lire = () => (file ? file.shift() : entrees(dits));
  const ev = (e) => new Function("s", `with (s) { return (${traduire(e)}); }`)(s);
  let garde = 0;
  const run = (blocs) => {
    for (const n of blocs) {
      if (++garde > 200000) throw new Error("boucle infinie");
      let m;
      if (/^stylo/.test(n.t)) continue;
      else if (/^demander /.test(n.t)) s.réponse = lire();
      else if ((m = /^mettre (\S+) à (.+)$/.exec(n.t))) {
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
      } else if ((m = /^tourner de (.+) degrés$/.exec(n.t))) {
        tortue.cap += ev(m[1]);
        tortue.angle += ev(m[1]);
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
/** Les lignes de la trace d'un bloc, cases en texte (« −3 » lu « -3 »). */
const traceDe = (bloc) => {
  const m = bloc.match(/trace\((\[[^\]]*\]), (\[\[[\s\S]*?\]\])\)/);
  return m ? JSON.parse(m[2]).map((l) => l.map((c) => String(c).replace(/−/g, "-"))) : null;
};
const texte = (rangs) => rangs.map((l) => l.map((c) => String(c)));
const vf = (b) => (b ? "vrai" : "faux");

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

  v.titre("★ Un seul geste");
  // 1
  const r1 = dit(1, [2], [15]);
  ecrit(1, "le lutin dit $15$");
  memeTrace(1, ["réponse", "+ 3", "× 4", "- 5"].map((b, j) => [b, r1.pas[j].x]));
  v.ok("1. sans parenthèses on trouve bien 9", 2 + 3 * 4 - 5 === 9);
  // 2
  const ok2 = [-3, 0, 1, 5, 7].every((x) => executer(prog(2), [x]).dits[0] === 3 * x - 3);
  v.ok("2. le programme calcule 3x − 3 pour x = −3, 0, 1, 5, 7", ok2);
  v.ok("2. 3(x − 1) ≡ 3x − 3", identiques("3(x - 1)", "3x - 3"));
  ecrit(2, "$3(x - 1) = 3x - 3$");
  const r2 = executer(prog(2), [5]);
  memeTrace(2, [["réponse", r2.pas[0].x], ["− 1", r2.pas[1].x], ["× 3", r2.pas[2].x]].map(([b, x]) => [b.replace(/−/g, "-"), x]));
  // 3
  const r3 = dit(3, [], [12]);
  memeTrace(3, ["mettre à 0", "+ 2", "+ 3", "+ 1", "× 2"].map((b, j) => [b, r3.pas[j].score]));
  ecrit(3, "le lutin dit $12$");
  // 4
  const r4 = dit(4, [], [8100]);
  memeTrace(4, [["départ", 100], ...r4.tours.map((t, j) => [j + 1, t.n])]);
  ecrit(4, "le lutin dit $8\\,100$");
  // 5
  const lu5 = [3, 18, 25].map((t) => executer(prog(5), [t]).dits[0]);
  v.ok("5. on reste, on court, on reste", JSON.stringify(lu5) === JSON.stringify(["on reste", "on court", "on reste"]), JSON.stringify(lu5));
  ecrit(5, "« on reste », « on court », « on reste »");
  memeTrace(5, [3, 18, 25].map((t, j) => [t, vf(t > 5), vf(t < 25), lu5[j]]));
  // 6
  const cas6 = [[30, 3], [45, 1], [35, 1.5]];
  const lu6 = cas6.map((e) => executer(prog(6), e).dits[0]);
  v.ok("6. annulée, annulée, on part", JSON.stringify(lu6) === JSON.stringify(["sortie annulée", "sortie annulée", "on part"]), JSON.stringify(lu6));
  const et6 = executer(prog(6).map((l) => l.replace(" ou ", " et ")), cas6[0]).dits[0];
  v.ok("6. avec « et », le cas a) donne bien « on part »", et6 === "on part" && c(6).includes("le cas a) donnerait « on part »"));
  memeTrace(6, cas6.map(([vv, h], j) => [["a)", "b)", "c)"][j], vf(vv > 40), vf(h > 2), lu6[j]]));
  // 7
  dit(7, [18, 9], [45]);
  dit(7, [18, 9], [2 * (18 + 9)], 1);
  ecrit(7, "Réponse : il dit $45$");
  ecrit(7, "Réponse : $54$ m");
  // 8
  const ok8 = [0, 1, 4, 10].every((h) => executer(prog(8, 1), [h]).dits[0] === 12 + 3 * h);
  v.ok("8. le bloc complété calcule 12 + 3h", ok8);
  dit(8, [4], [24], 1);
  ecrit(8, "Réponse : $24$ €");

  v.titre("★★ Type devoir");
  // 9
  const r9 = [7, -3].map((x) => executer(prog(9), [x]));
  v.ok("9. 14 et −6", r9[0].dits[0] === 14 && r9[1].dits[0] === -6);
  v.ok("9. le programme double pour x = −5 … 5", [-5, -1, 0, 2, 5].every((x) => executer(prog(9), [x]).dits[0] === 2 * x));
  const ch9 = "2(x + 5) - 10 = 2x + 10 - 10 = 2x";
  v.ok("9. la chaîne d'égalités est juste", ch9.split(" = ").every((m) => identiques(m, "2x")) && c(9).includes(`$${ch9}$`));
  memeTrace(9, [7, -3].map((x, j) => [x, ...r9[j].pas.slice(1).map((p) => p.x)]));
  // 10
  const r10 = executer(prog(10), [-2]);
  v.ok("10. −2 donne −10", r10.dits[0] === -10);
  const sol10 = [...Array(201).keys()].map((k) => k - 100).filter((x) => executer(prog(10), [x]).dits[0] === 20);
  v.ok("10. seul 8 donne 20 (entiers de −100 à 100)", JSON.stringify(sol10) === "[8]", JSON.stringify(sol10));
  ecrit(10, "Réponse : il faut choisir $8$");
  memeTrace(10, [-2, 8].map((x) => [x, ...executer(prog(10), [x]).pas.slice(1).map((p) => p.x)]));
  // 11
  const r11 = dit(11, [], [2035]);
  v.ok("11. 9 tours, 2 892 m", r11.tours.length === 9 && r11.s.L === 2892 && c(11).includes("tourné $9$ fois") && c(11).includes("mesure $2\\,892$ m"));
  memeTrace(11, r11.tours.map((t, j) => [j + 1, t.L, t.an]));
  // 12
  const pas12 = [8200, 12500, 10000, 6400, 11000, 9999, 15000];
  dit(12, pas12, [3]);
  dit(12, pas12, [pas12.filter((p) => p >= 10000).length], 1);
  ecrit(12, "le lutin dit $3$");
  ecrit(12, "il y a $4$ bons jours");
  // 13
  const t13 = executer(prog(13)).tortue;
  v.ok("13. hexagone : 6 sommets, fermé, 240 pas, 360°", t13.ferme && t13.distincts === 6 && t13.dist === 240 && t13.angle === 360);
  const t13b = executer(prog(13, 1)).tortue;
  v.ok("13. octogone : 8 sommets, fermé, 200 pas, 45°", t13b.ferme && t13b.distincts === 8 && t13b.dist === 200 && prog(13, 1).length === 4 && prog(13, 1)[1] === "répéter 8 fois");
  const t13c = executer(prog(13).map((l) => l.replace("60 degrés", "120 degrés"))).tortue;
  v.ok("13. avec 120° : un triangle (3 sommets)", t13c.ferme && t13c.distincts === 3);
  ecrit(13, "le tracé mesure $240$ pas");
  ecrit(13, "$360 \\div 8 = 45$");
  // 14
  const r14 = dit(14, [], [65]);
  dit(14, [], [(10 * 11) / 2], 1);
  memeTrace(14, r14.tours.map((t, j) => [j + 1, t.i, t.s]));
  ecrit(14, "le lutin dit $65$");
  // 15
  const ages = [8, 12, 64, 65];
  const prix15 = ages.map((a) => executer(prog(15), [a]).dits[0]);
  v.ok("15. 5, 9, 9, 5", JSON.stringify(prix15) === "[5,9,9,5]", JSON.stringify(prix15));
  ecrit(15, "Réponse : $5$ €, $9$ €, $9$ €, $5$ €");
  const cond15 = /Réponse : « (a [^»]+) »/.exec(c(15))?.[1] ?? "faux";
  const ok15 = [...Array(101).keys()].every((a) => new Function("a", `return ${traduire(cond15)};`)(a) === (a >= 12 && a <= 17));
  v.ok(`15. « ${cond15} » ⇔ 12 ≤ a ≤ 17`, ok15);
  memeTrace(15, ages.map((a, j) => [a, vf(a < 12), vf(a > 64), prix15[j]]));
  // 16
  const r16 = [5, -3].map((x) => executer(prog(16), [x]));
  v.ok("16. 16 et 0", r16[0].dits[0] === 16 && r16[1].dits[0] === 0);
  v.ok("16. (x − 3)(x + 3) ≡ x² − 9, et le programme le calcule", identiques("(x - 3)(x + 3)", "x^2 - 9") && [-4, 0, 2, 7].every((x) => executer(prog(16), [x]).dits[0] === x * x - 9) && c(16).includes("$(x - 3)(x + 3) = x^2 - 9$"));
  const zeros = [...Array(41).keys()].map((k) => k - 20).filter((x) => executer(prog(16), [x]).dits[0] === 0);
  const seize = [...Array(41).keys()].map((k) => k - 20).filter((x) => executer(prog(16), [x]).dits[0] === 16);
  v.ok("16. 0 pour −3 et 3 ; 16 pour −5 et 5", JSON.stringify(zeros) === "[-3,3]" && JSON.stringify(seize) === "[-5,5]" && c(16).includes("$3$ et $-3$ donnent $0$") && c(16).includes("$5$ et $-5$ donnent $16$"));
  memeTrace(16, [5, -3].map((x, j) => [x, r16[j].s.a, r16[j].s.b, r16[j].s.r]));

  v.titre("★★★ Problèmes");
  // 17
  const temp = [28, 31, 33, 29, 34];
  const r17 = dit(17, temp, [31, 3]);
  memeTrace(17, r17.tours.map((t, j) => [j + 1, t.réponse, t.somme, t.chauds]));
  const deplace = prog(17).filter((l) => l !== "mettre somme à 0");
  deplace.splice(deplace.indexOf("répéter 5 fois") + 1, 0, "  mettre somme à 0");
  const b17 = executer(deplace, temp).dits[0];
  v.ok("17. somme remise à 0 dans la boucle : 6,8", b17 === 6.8 && c(17).includes("$34 \\div 5 = 6{,}8$"), String(b17));
  dit(17, temp, [31, 3, Math.max(...temp)], 1);
  ecrit(17, "puis $3$ (le nombre de jours");
  // 18
  const A = prog(18, 0);
  const B = prog(18, 1);
  const egauxAB = [-10, -3, -1, 0, 2, 4, 9, 49.5].every((x) => executer(A, [x]).dits[0] === executer(B, [x]).dits[0]);
  v.ok("18. A et B donnent le même résultat partout", egauxAB);
  const ch18 = "(x + 1)^2 - x^2 = x^2 + 2x + 1 - x^2 = 2x + 1";
  v.ok("18. la chaîne d'égalités est juste", ch18.split(" = ").every((m) => identiques(m, "2x + 1")) && c(18).includes(`$${ch18}$`));
  v.ok("18. 49,5 donne 100", executer(B, [49.5]).dits[0] === 100 && executer(A, [49.5]).dits[0] === 100 && c(18).includes("il faut choisir $49{,}5$"));
  memeTrace(18, [4, -3].map((x) => [x, executer(A, [x]).dits[0], executer(B, [x]).dits[0]]));
  // 19
  const r19 = dit(19, [], [10]);
  memeTrace(19, r19.tours.map((t) => [t.sem, t.total]));
  v.ok("19. total = n(n + 2) à chaque semaine", r19.tours.every((t) => t.total === t.sem * (t.sem + 2)));
  v.ok("19. semaine 9 : 99, pas plus de 100", r19.tours[8].total === 99 && c(19).includes("le total vaut $99$"));
  ecrit(19, "Réponse : le lutin dit $10$");
  // 20
  const joueur = (essais) => {
    const f = [...essais];
    return () => f.shift();
  };
  const r20 = dit(20, joueur([50, 25, 37]), ["plus petit", "plus grand", 3]);
  memeTrace(20, [[1, 50, r20.dits[0]], [2, 25, r20.dits[1]], [3, 37, r20.dits[2]]]);
  // La stratégie du milieu, jouée contre le VRAI programme pour chaque secret.
  let pire = 0;
  for (let secret = 1; secret <= 100; secret++) {
    let lo = 1;
    let hi = 100;
    let dernier = null;
    const strat = (dits) => {
      if (dernier !== null) {
        const msg = dits.at(-1);
        if (msg === "plus grand") lo = dernier + 1;
        else if (msg === "plus petit") hi = dernier - 1;
      }
      dernier = Math.floor((lo + hi) / 2);
      return dernier;
    };
    const lignes = prog(20).map((l) => (l === "mettre n à 37" ? `mettre n à ${secret}` : l));
    pire = Math.max(pire, executer(lignes, strat).dits.at(-1));
  }
  v.ok("20. au pire 7 essais avec la stratégie du milieu", pire === 7 && c(20).includes("$7$ essais suffisent toujours"), String(pire));
  v.ok("20. 2⁶ = 64 < 100", 2 ** 6 === 64 && c(20).includes("= 64$ cas"));
}

lancer({
  nom: "ALGORITHMIQUE ET PROGRAMMATION · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-algorithmique.tsx",
  notionId: "algo_programmation",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : un bloc du programme changé", "\"mettre x à x * 4\"", "\"mettre x à x * 5\""],
    ["ex. 1 : la trace fausse", "[\"× 4\", 20]", "[\"× 4\", 24]"],
    ["ex. 2 : le développement faux", "$3(x - 1) = 3x - 3$", "$3(x - 1) = 3x - 1$"],
    ["ex. 4 : une ligne de trace fausse", "[3, 2700]", "[3, 2400]"],
    ["ex. 5 : la borne 25 incluse", "\"si t > 5 et t < 25 alors\"", "\"si t > 5 et t < 26 alors\""],
    ["ex. 6 : un « vrai » faux dans la trace", "[\"b)\", \"vrai\", \"faux\"", "[\"b)\", \"vrai\", \"vrai\""],
    ["ex. 7 : la correction garde une erreur", "\"mettre p à 2 * (L + l)\"", "\"mettre p à 2 * L + 2 * 1\""],
    ["ex. 8 : forfait payé à chaque heure", "\"mettre prix à 12 + 3 * h\"", "\"mettre prix à (12 + 3) * h\""],
    ["ex. 9 : la trace de −3 fausse", "[\"−3\", 2, 4, \"−6\"]", "[\"−3\", 2, 4, \"−4\"]"],
    ["ex. 11 : le recul annuel changé", "\"  mettre L à L - 12\"", "\"  mettre L à L - 10\""],
    ["ex. 12 : la correction garde > 10000", "\"  si réponse > 9999 alors\"", "\"  si réponse > 10000 alors\""],
    ["ex. 13 : l'octogone ne ferme pas", "\"  tourner de 45 degrés\"", "\"  tourner de 40 degrés\""],
    ["ex. 14 : la trace de la boucle fausse", "[9, 10, 54]", "[9, 10, 55]"],
    ["ex. 15 : les bornes exclues", "Réponse : « a > 11 et a < 18 »", "Réponse : « a > 12 et a < 18 »"],
    ["ex. 16 : le développement faux", "$(x - 3)(x + 3) = x^2 - 9$", "$(x - 3)(x + 3) = x^2 - 6$"],
    ["ex. 17 : une somme fausse dans la trace", "[3, 33, 92, 2]", "[3, 33, 93, 2]"],
    ["ex. 18 : le programme B changé", "\"mettre r à 2 * x + 1\"", "\"mettre r à 2 * x + 2\""],
    ["ex. 19 : la semaine 9 dépasse 100", "[9, 99]", "[9, 100]"],
    ["ex. 20 : six essais", "$7$ essais suffisent toujours", "$6$ essais suffisent toujours"],
  ],
});
