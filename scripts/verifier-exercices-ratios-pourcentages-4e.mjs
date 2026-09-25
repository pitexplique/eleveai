// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Ratios, partages et
// pourcentages » de 4e (lib/fiches-exercices/maths-4e-ratios-pourcentages.tsx).
//
//   node scripts/verifier-exercices-ratios-pourcentages-4e.mjs
//
// ⭐ DEUX CHEMINS pour chaque valeur :
// 1. le calcul, refait ici en fractions EXACTES à partir des données de
//    l'énoncé (recopiées ici), puis le corrigé doit ÉCRIRE la bonne valeur à sa
//    place, dans sa phrase — pas le nombre seul, qui traîne toujours quelque part ;
// 2. les DESSINS relus dans le source de chaque exercice :
//    · `barre([{ nom, parts, valeur }], total, unePart)` : chaque valeur vaut
//      parts × une part, leur somme vaut le total, et les parts sont bien celles
//      du ratio de l'exercice ;
//    · `pourcents(total, unité, [[p, v]])` : v = p × total ÷ 100 ;
//    · `evolution(unité, [{ nom, valeur, taux }])` : chaque valeur est la
//      précédente × (1 + taux ÷ 100) ;
//    · `tableauParts([…], haut, bas, coef)` : bas = haut × coef, case par case ;
//    · le `tableau` des coefficients (ex. 7) et le camembert (ex. 16).
//    Et leurs étiquettes tiennent dans le cadre (280 de large, corps 14 : 8,8 px
//    par signe en gras) et dans leur segment.
//
// Passe par `lancer()` du socle, classe « 4e » : les huit micros de
// `prop_ratio_pourcentage` ont `id`, `label`, `notionId` qui se suivent, sans
// commentaire entre eux (vérifié le 25/09) — le socle les lit toutes les huit.

import { Q, D, fois, div, plus, moins, egal, tex, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Nombres ────────────────────────────────────────────────────────────── */

/** « 1 200 », « 8,80 », « 362,1 », « −25 » → fraction exacte. */
const N = (s) => D(String(s).replace(/[\s  ]/g, "").replace(/−/g, "-"));
/** Le nombre en tête d'une étiquette : « 20 € » → 20, « 42 enfants » → 42. */
const tete = (s) => N(String(s).match(/^[\d\s  ,]+/)[0].trim());
const pc = (t) => div(typeof t === "object" ? t : Q(t), Q(100));
const coef = (t) => plus(Q(1), pc(t));
const pgcd = (a, b) => (b === 0 ? a : pgcd(b, a % b));
/** Un prix : toujours deux décimales (`8{,}80`). */
function prix(a) {
  const c = fois(a, Q(100));
  if (c.d !== 1n) throw new Error(`pas un nombre de centimes : ${a.n}/${a.d}`);
  const s = c.n.toString().padStart(3, "0");
  return `${s.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,")}{,}${s.slice(-2)}`;
}
/** Un arrondi à n décimales, écrit comme dans la feuille. */
const arr = (q, n) => (Math.round((Number(q.n) / Number(q.d)) * 10 ** n) / 10 ** n).toFixed(n).replace(".", "{,}");
const long = (s) => [...s].length;

/* ── Les dessins, relus dans le source ──────────────────────────────────── */

const cellules = (t) => [...t.matchAll(/"([^"]*)"/g)].map((m) => m[1]);

function barres(bloc) {
  return [...bloc.matchAll(/\bbarre\(\[([^\]]*)\], "([^"]*)", "([^"]*)"\)/g)].map((m) => ({
    segments: [...m[1].matchAll(/\{ nom: "([^"]*)", parts: (\d+), valeur: "([^"]*)" \}/g)].map((s) => ({ nom: s[1], parts: Number(s[2]), valeur: s[3] })),
    total: m[2],
    unePart: m[3],
  }));
}
function pourcentsDe(bloc) {
  return [...bloc.matchAll(/\bpourcents\("([^"]*)", "([^"]*)", \[((?:\[[^\]]*\](?:, )?)*)\]\)/g)].map((m) => ({
    total: m[1],
    unite: m[2],
    marques: [...m[3].matchAll(/\[([\d.]+), "([^"]*)"\]/g)].map((x) => [Number(x[1]), x[2]]),
  }));
}
function evolutions(bloc) {
  return [...bloc.matchAll(/\bevolution\("([^"]*)", \[([^\]]*)\]\)/g)].map((m) => ({
    unite: m[1],
    lignes: [...m[2].matchAll(/\{ nom: "([^"]*)", valeur: "([^"]*)"(?:, taux: (-?\d+))? \}/g)].map((l) => ({ nom: l[1], valeur: l[2], taux: l[3] === undefined ? undefined : Number(l[3]) })),
  }));
}
function tableauxParts(bloc) {
  return [...bloc.matchAll(/\btableauParts\(\["([^"]*)", "([^"]*)"\], \[([^\]]*)\], \[([^\]]*)\], "([^"]*)"\)/g)].map((m) => ({
    titres: [m[1], m[2]],
    haut: cellules(m[3]),
    bas: cellules(m[4]),
    coef: m[5],
  }));
}
const brut = (c) => c.replace(/^!/, "");

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const bloc = (k) => f.blocs[k - 1] ?? "";
  const dit = (k, phrase) => v.ok(`${k}. « ${phrase} »`, c(k).includes(phrase), "absent du corrigé");
  const donne = (k, phrase) => v.ok(`${k}. énoncé : « ${phrase} »`, e(k).includes(phrase), "absent de l'énoncé");

  /** Tout ce qu'une barre affirme : valeurs, total, et place des étiquettes. */
  const barreJuste = (k, parts, valeurs, total) => {
    const [b] = barres(bloc(k));
    v.ok(`${k}. la barre des parts est dessinée`, !!b);
    if (!b) return;
    const S = b.segments.reduce((s, x) => s + x.parts, 0);
    const une = tete(b.unePart);
    v.ok(`${k}. barre : parts ${JSON.stringify(parts)}`, JSON.stringify(b.segments.map((s) => s.parts)) === JSON.stringify(parts), JSON.stringify(b.segments.map((s) => s.parts)));
    v.ok(`${k}. barre : chaque valeur = parts × ${b.unePart}`, b.segments.every((s) => egal(tete(s.valeur), fois(Q(s.parts), une))), b.segments.map((s) => s.valeur).join(", "));
    v.ok(`${k}. barre : valeurs ${valeurs.map(tex).join(", ")} (recalculées)`, b.segments.every((s, i) => valeurs[i] && egal(tete(s.valeur), valeurs[i])));
    const somme = b.segments.reduce((s, x) => plus(s, tete(x.valeur)), Q(0));
    v.ok(`${k}. barre : la somme vaut le total ${b.total}`, egal(somme, tete(b.total)) && egal(somme, total), `${tex(somme)} contre ${b.total}`);
    // La place : chaque nom DANS son segment, chaque valeur SOUS le sien.
    const u = 260 / S;
    const fautes = b.segments.filter((s) => long(s.nom) * 8.8 > s.parts * u - 4 || long(s.valeur) * 8.8 > s.parts * u - 2).map((s) => s.nom);
    v.ok(`${k}. barre : noms et valeurs tiennent dans leur segment`, fautes.length === 0, fautes.join(", "));
    v.ok(`${k}. barre : le total et « 1 part » tiennent dans le cadre`, long(`total : ${b.total}`) * 8.8 <= 270 && long(`1 part = ${b.unePart}`) * 8 <= 270);
  };

  /** Une barre de 0 à 100 % : v = p × total ÷ 100, étiquettes sans chevauchement. */
  const pourcentsJuste = (k, total, attendu) => {
    const [p] = pourcentsDe(bloc(k));
    v.ok(`${k}. la barre de 0 à 100 % est dessinée`, !!p);
    if (!p) return;
    v.ok(`${k}. pourcents : le total est ${tex(total)}`, egal(N(p.total), total), p.total);
    v.ok(`${k}. pourcents : chaque valeur = pourcentage × total ÷ 100`, p.marques.every(([q, val]) => egal(N(val), fois(pc(D(String(q))), total))), JSON.stringify(p.marques));
    v.ok(`${k}. pourcents : la marque ${attendu[0]} % vaut ${tex(attendu[1])}`, p.marques.some(([q, val]) => q === attendu[0] && egal(N(val), attendu[1])));
    const X = (q) => 14 + 2.52 * q;
    const intervalles = (textes) => textes.map(([x, t, fin]) => (fin ? [x - long(t) * 8.8, x] : [x - (long(t) * 8.8) / 2, x + (long(t) * 8.8) / 2])).sort((a, b) => a[0] - b[0]);
    const libre = (iv) => iv.every(([a, b], i) => a >= 0 && b <= 280 && (i === 0 || a >= iv[i - 1][1] + 2));
    const haut = intervalles([...p.marques.map(([q]) => [X(q), `${String(q).replace(".", ",")} %`, false]), [266, "100 %", true]]);
    const bas = intervalles([...p.marques.map(([q, val]) => [X(q), val, false]), [266, p.total, true]]);
    v.ok(`${k}. pourcents : les étiquettes du haut ne se chevauchent pas`, libre(haut), JSON.stringify(haut));
    v.ok(`${k}. pourcents : les étiquettes du bas ne se chevauchent pas`, libre(bas), JSON.stringify(bas));
    v.ok(`${k}. pourcents : « en ${p.unite} » tient dans le cadre`, long(`en ${p.unite}`) * 8 <= 276);
  };

  /** Une évolution : chaque ligne = la précédente × (1 + taux ÷ 100). */
  const evolutionJuste = (k, valeurs, taux) => {
    const [ev] = evolutions(bloc(k));
    v.ok(`${k}. l'évolution est dessinée`, !!ev);
    if (!ev) return;
    const lues = ev.lignes.map((l) => N(l.valeur));
    v.ok(`${k}. évolution : valeurs ${valeurs.map(tex).join(" → ")}`, lues.length === valeurs.length && lues.every((x, i) => egal(x, valeurs[i])), ev.lignes.map((l) => l.valeur).join(" → "));
    v.ok(`${k}. évolution : taux ${taux.join(", ")} %`, JSON.stringify(ev.lignes.slice(1).map((l) => l.taux)) === JSON.stringify(taux) && ev.lignes[0].taux === undefined);
    const enchaine = ev.lignes.slice(1).every((l, i) => egal(lues[i + 1], fois(lues[i], coef(l.taux))));
    v.ok(`${k}. évolution : chaque ligne = la précédente × (1 + taux ÷ 100)`, enchaine);
    v.ok(`${k}. évolution : les noms tiennent dans leur colonne`, ev.lignes.every((l) => long(l.nom) * 8.8 <= 56), ev.lignes.map((l) => l.nom).join(", "));
    v.ok(`${k}. évolution : les valeurs tiennent dans le cadre`, ev.lignes.every((l) => 214 + long(`${l.valeur}${ev.unite ? " " + ev.unite : ""}`) * 8.8 <= 278));
    const legende = ev.lignes.slice(1).map((l) => `× ${tex(coef(l.taux))}`).join(" puis ");
    v.ok(`${k}. évolution : la légende « ${legende} » tient dans le cadre`, long(legende) * 9.4 <= 276);
  };

  /** Un tableau des parts : bas = haut × coef, et les cases trouvées sont les réponses. */
  const partsJuste = (k, i, haut, bas, coefAttendu) => {
    const t = tableauxParts(bloc(k))[i];
    v.ok(`${k}. le tableau des parts n° ${i + 1} est dessiné`, !!t);
    if (!t) return;
    v.ok(`${k}. tableau ${i + 1} : ↓ × ${tex(coefAttendu)}`, egal(N(t.coef), coefAttendu), t.coef);
    v.ok(`${k}. tableau ${i + 1} : chaque case du bas = case du haut × ${t.coef}`, t.haut.length === t.bas.length && t.haut.every((h, j) => egal(N(brut(t.bas[j])), fois(N(brut(h)), N(t.coef)))));
    v.ok(`${k}. tableau ${i + 1} : haut ${haut.map(tex).join(", ")}`, t.haut.every((h, j) => egal(N(brut(h)), haut[j])));
    v.ok(`${k}. tableau ${i + 1} : bas ${bas.map(tex).join(", ")}`, t.bas.every((b, j) => egal(N(brut(b)), bas[j])));
  };

  /* ── ★ Un seul geste ─────────────────────────────────────────────────── */
  v.titre("★ Un seul geste");

  // 1. 18 filles, 24 garçons
  {
    const g = pgcd(18, 24);
    dit(1, `$18 : 24$`);
    dit(1, `$18 \\div ${g} = ${18 / g}$ et $24 \\div ${g} = ${24 / g}$ : le ratio simplifié est $${18 / g} : ${24 / g}$`);
    dit(1, `le ratio garçons : filles est $${24 / g} : ${18 / g}$`);
    dit(1, `$${(18 + 24) / g}$ parts de $${g}$ enfants`);
    dit(1, `donnerait $${18 - 15} : ${24 - 15}$`);
    v.ok(`1. le piège 3 : 9 n'est pas le même club`, (18 - 15) * (24 / g) !== (24 - 15) * (18 / g));
    barreJuste(1, [18 / g, 24 / g], [Q(18), Q(24)], Q(42));
  }

  // 2. x : y = 5 : 2, x = 35
  {
    const part = div(Q(35), Q(5));
    const y = fois(Q(2), part);
    dit(2, `$\\dfrac{35}{5} = ${tex(part)}$`);
    dit(2, `$y = 2 \\times ${tex(part)} = ${tex(y)}$`);
    dit(2, `$\\dfrac{${tex(y)}}{2} = ${tex(part)}$`);
    dit(2, `$\\dfrac{35}{2} = ${tex(div(Q(35), Q(2)))}$`);
    dit(2, `Réponse : $\\dfrac{x}{5} = \\dfrac{y}{2}$ et $y = ${tex(y)}$.`);
    partsJuste(2, 0, [Q(5), Q(2)], [Q(35), y], part);
  }

  // 3. or : argent : bronze = 2 : 3 : 4, argent = 12
  {
    const part = div(Q(12), Q(3));
    const [o, b] = [fois(Q(2), part), fois(Q(4), part)];
    const t = plus(plus(o, Q(12)), b);
    dit(3, `$\\dfrac{12}{3} = ${tex(part)}$`);
    dit(3, `$o = 2 \\times ${tex(part)} = ${tex(o)}$`);
    dit(3, `$b = 4 \\times ${tex(part)} = ${tex(b)}$`);
    dit(3, `$${tex(o)} + 12 + ${tex(b)} = ${tex(t)}$ médailles, soit $${2 + 3 + 4}$ parts de $${tex(part)}$`);
    dit(3, `Réponse : $${tex(o)}$ médailles d'or, $${tex(b)}$ de bronze, $${tex(t)}$ en tout.`);
    barreJuste(3, [2, 3, 4], [o, Q(12), b], t);
  }

  // 4. 45 € selon 4 : 5
  {
    const part = div(Q(45), Q(9));
    const [i, n] = [fois(Q(4), part), fois(Q(5), part)];
    dit(4, `$4 + 5 = 9$ parts`);
    dit(4, `$45 \\div 9 = ${tex(part)}$ €`);
    dit(4, `$${tex(i)} + ${tex(n)} = 45$ €`);
    dit(4, `$${prix(div(Q(45), Q(2)))}$ € chacun`);
    dit(4, `Réponse : Inès reçoit $${tex(i)}$ € et Noé $${tex(n)}$ €.`);
    barreJuste(4, [4, 5], [i, n], Q(45));
  }

  // 5. 60 % de 70 kg
  {
    const eau = fois(pc(60), Q(70));
    dit(5, `$0{,}6 \\times 70 = ${tex(eau)}$`);
    dit(5, `$10\\,\\%$ de $70$ font $${tex(fois(pc(10), Q(70)))}$, donc $60\\,\\%$ font $6 \\times ${tex(fois(pc(10), Q(70)))} = ${tex(eau)}$`);
    dit(5, `Réponse : environ $${tex(eau)}$ kg d'eau.`);
    pourcentsJuste(5, Q(70), [60, eau]);
  }

  // 6. 30 g de sucres sur 250 g
  {
    const p = div(Q(30), Q(250));
    dit(6, `$30 \\div 250 = ${tex(p)}$`);
    dit(6, `$30 \\div 2{,}5 = ${tex(div(Q(30), D("2,5")))}$ g`);
    dit(6, `$250 \\div 30 \\approx ${arr(div(Q(250), Q(30)), 1)}$`);
    dit(6, `Réponse : $${tex(fois(p, Q(100)))}\\,\\%$ de sucres.`);
    pourcentsJuste(6, Q(250), [Number(fois(p, Q(100)).n), Q(30)]);
  }

  // 7. les coefficients
  {
    dit(7, `$1 + 0{,}08 = ${tex(coef(8))}$`);
    dit(7, `$1 - 0{,}25 = ${tex(coef(-25))}$`);
    dit(7, `$1{,}3 - 1 = ${tex(moins(D("1,3"), Q(1)))}$, c'est une hausse de $${tex(fois(moins(D("1,3"), Q(1)), Q(100)))}\\,\\%$`);
    dit(7, `$1 - 0{,}9 = ${tex(moins(Q(1), D("0,9")))}$, c'est une baisse de $${tex(fois(moins(Q(1), D("0,9")), Q(100)))}\\,\\%$`);
    dit(7, `Réponse : a) $\\times ${tex(coef(8))}$ ; b) $\\times ${tex(coef(-25))}$ ; c) une hausse de $30\\,\\%$ ; d) une baisse de $10\\,\\%$.`);
    // Le tableau : chaque coefficient = 1 + taux ÷ 100.
    const m = bloc(7).match(/\btableau\((\[[^\]]*\]), (\[[^\]]*\]), true\)/);
    v.ok("7. le tableau des coefficients est dessiné", !!m);
    if (m) {
      const [ent, lig] = [cellules(m[1]).slice(1), cellules(m[2]).slice(1)];
      const justes = ent.length === 4 && ent.every((t, i) => egal(N(lig[i].replace("× ", "")), coef(N(t.replace(" %", "").replace("+", "")))));
      v.ok(`7. tableau : ${ent.map((t, i) => `${t} → ${lig[i]}`).join(" ; ")}`, justes);
    }
  }

  // 8. 1 200 € + 5 %
  {
    const apres = fois(Q(1200), coef(5));
    dit(8, `$1\\,200 \\times 1{,}05 = ${tex(apres)}$`);
    dit(8, `$0{,}05 \\times 1\\,200 = ${tex(fois(pc(5), Q(1200)))}$ €`);
    dit(8, `répondre $${tex(plus(Q(1200), Q(5)))}$ €`);
    dit(8, `c'est $${tex(div(Q(1200), Q(100)))}$ fois plus`);
    dit(8, `Réponse : le nouveau prix est $${tex(apres)}$ €.`);
    evolutionJuste(8, [Q(1200), apres], [5]);
  }

  /* ── ★★ Type devoir ─────────────────────────────────────────────────── */
  v.titre("★★ Type devoir");

  // 9. vinaigrette 3 : 1
  {
    const h = fois(Q(3), Q(12));
    const g = pgcd(20, 8);
    dit(9, `$h = 3 \\times 12 = ${tex(h)}$ cL`);
    dit(9, `$\\dfrac{20}{3} \\approx ${arr(div(Q(20), Q(3)), 2)}$ et $\\dfrac{8}{1} = 8$`);
    dit(9, `Son ratio est $20 : 8$, soit $${20 / g} : ${8 / g}$ en divisant par $${g}$`);
    dit(9, `il faut $3 \\times 8 = ${3 * 8}$ cL d'huile : il doit en ajouter $${3 * 8} - 20 = ${3 * 8 - 20}$ cL`);
    dit(9, `verser $${12 + 2}$ cL d'huile pour $12$ cL`);
    dit(9, `Réponse : a) $3 : 1$ ; b) $${tex(h)}$ cL d'huile ; c) non, il doit ajouter $${3 * 8 - 20}$ cL d'huile.`);
    partsJuste(9, 0, [Q(3), Q(1)], [h, Q(12)], Q(12));
  }

  // 10. 24 kg selon 3 : 4 : 5
  {
    const part = div(Q(24), Q(12));
    const [s, l, m] = [3, 4, 5].map((p) => fois(Q(p), part));
    dit(10, `$3 + 4 + 5 = 12$ parts`);
    dit(10, `$24 \\div 12 = ${tex(part)}$ kg`);
    dit(10, `Sam : $3 \\times ${tex(part)} = ${tex(s)}$ kg. Lou : $4 \\times ${tex(part)} = ${tex(l)}$ kg. Maé : $5 \\times ${tex(part)} = ${tex(m)}$ kg.`);
    dit(10, `$${tex(div(Q(24), Q(3)))}$ kg chacun`);
    dit(10, `Réponse : Sam porte $${tex(s)}$ kg, Lou $${tex(l)}$ kg et Maé $${tex(m)}$ kg.`);
    barreJuste(10, [3, 4, 5], [s, l, m], Q(24));
  }

  // 11. 15 fruitiers, 25 chênes ; Léna ; 2,5 : 4
  {
    const g = pgcd(15, 25);
    dit(11, `$15 \\div ${g} = ${15 / g}$ et $25 \\div ${g} = ${25 / g}$. Le ratio simplifié est $${15 / g} : ${25 / g}$`);
    donne(11, `trouvé $${15 - 10} : ${25 - 10}$`);
    dit(11, `$\\dfrac{25}{15} \\approx ${arr(div(Q(25), Q(15)), 2)}$`);
    v.ok("11. Léna a tort : 15/5 ≠ 25/15", !egal(div(Q(15), Q(5)), div(Q(25), Q(15))));
    dit(11, `$2{,}5 \\times 2 = ${tex(fois(D("2,5"), Q(2)))}$ et $4 \\times 2 = 8$. Le ratio est $5 : 8$`);
    v.ok("11. 5 : 8 est irréductible", pgcd(5, 8) === 1);
    dit(11, `c'est $${5 / pgcd(5, 15)}$ fruitier pour $${15 / pgcd(5, 15)}$ chênes`);
    dit(11, `Réponse : a) $${15 / g} : ${25 / g}$ ; b) non, Léna a tort ; c) $5 : 8$.`);
    barreJuste(11, [15 / g, 25 / g], [Q(15), Q(25)], Q(40));
  }

  // 12. 71 % de 510 millions de km²
  {
    const o = fois(pc(71), Q(510));
    const t = fois(pc(100 - 71), Q(510));
    dit(12, `$0{,}71 \\times 510 = ${tex(o)}$`);
    dit(12, `$100 - 71 = ${100 - 71}\\,\\%$. Et $0{,}29 \\times 510 = ${tex(t)}$`);
    dit(12, `$${tex(o)} + ${tex(t)} = ${tex(plus(o, t))}$`);
    v.ok("12. la somme redonne 510", egal(plus(o, t), Q(510)));
    dit(12, `$510 - 71 = ${510 - 71}$`);
    dit(12, `Réponse : environ $${tex(o)}$ millions de km² d'océans, et $${tex(t)}$ millions de km² de terres, soit $${100 - 71}\\,\\%$.`);
    pourcentsJuste(12, Q(510), [71, o]);
  }

  // 13. LED 9 W contre 60 W
  {
    const k = div(Q(9), Q(60));
    const baisse = fois(moins(Q(1), k), Q(100));
    dit(13, `$9 \\div 60 = ${tex(k)}$`);
    dit(13, `$${tex(k)} = 1 - ${tex(moins(Q(1), k))}$ : c'est une baisse de $${tex(baisse)}\\,\\%$`);
    dit(13, `$60 - 9 = ${60 - 9}$ W, et $\\dfrac{51}{60} = ${tex(div(Q(51), Q(60)))}$`);
    dit(13, `Avant : $10 \\times 60 = 600$ W. Après : $600 \\times ${tex(k)} = ${tex(fois(Q(600), k))}$ W. Économie : $600 - ${tex(fois(Q(600), k))} = ${tex(moins(Q(600), fois(Q(600), k)))}$ W`);
    dit(13, `Réponse : a) $\\times ${tex(k)}$ ; b) une baisse de $${tex(baisse)}\\,\\%$ ; c) $${tex(moins(Q(600), fois(Q(600), k)))}$ W économisés.`);
    evolutionJuste(13, [Q(60), Q(9)], [-Number(baisse.n)]);
  }

  // 14. 250 → 310 bouquetins
  {
    const k = div(Q(310), Q(250));
    const t = fois(moins(k, Q(1)), Q(100));
    dit(14, `$310 - 250 = ${310 - 250}$ bouquetins`);
    dit(14, `$310 \\div 250 = ${tex(k)}$. Le coefficient est $${tex(k)}$`);
    dit(14, `$\\dfrac{60}{250} = ${tex(div(Q(60), Q(250)))}$`);
    dit(14, `$\\dfrac{60}{310} \\approx ${arr(div(Q(60), Q(310)), 2)}$`);
    dit(14, `Réponse : $60$ bouquetins de plus ; le coefficient est $${tex(k)}$ ; c'est une hausse de $${tex(t)}\\,\\%$.`);
    evolutionJuste(14, [Q(250), Q(310)], [Number(t.n)]);
  }

  // 15. cerises 8 €, +10 %, +20 %
  {
    const mai = fois(Q(8), coef(10));
    const juin = fois(mai, coef(20));
    const k = fois(coef(10), coef(20));
    const faux = fois(Q(8), coef(30));
    dit(15, `$8 \\times 1{,}1 = ${prix(mai)}$ €`);
    dit(15, `$${prix(mai)} \\times 1{,}2 = ${prix(juin)}$ €`);
    dit(15, `$1{,}1 \\times 1{,}2 = ${tex(k)}$. C'est une hausse de $${tex(fois(moins(k, Q(1)), Q(100)))}\\,\\%$`);
    dit(15, `$8 \\times ${tex(k)} = ${prix(juin)}$ €`);
    dit(15, `$8 \\times 1{,}3 = ${prix(faux)}$ € : il manque $${prix(moins(juin, faux))}$ €`);
    dit(15, `Réponse : $${prix(mai)}$ € en mai, $${prix(juin)}$ € en juin ; en tout $\\times ${tex(k)}$, soit une hausse de $${tex(fois(moins(k, Q(1)), Q(100)))}\\,\\%$.`);
    evolutionJuste(15, [Q(8), mai, juin], [10, 20]);
  }

  // 16. possession 3 : 2, 55 minutes
  {
    const [a, b] = [div(Q(3), Q(5)), div(Q(2), Q(5))];
    const part = div(Q(55), Q(5));
    dit(16, `$\\dfrac{3}{5} = ${tex(a)}$, soit $${tex(fois(a, Q(100)))}\\,\\%$`);
    dit(16, `$\\dfrac{2}{5} = ${tex(b)}$, soit $${tex(fois(b, Q(100)))}\\,\\%$`);
    dit(16, `$55 \\div 5 = ${tex(part)}$ minutes. B a $2$ parts : $2 \\times ${tex(part)} = ${tex(fois(Q(2), part))}$ minutes`);
    dit(16, `A a $3 \\times ${tex(part)} = ${tex(fois(Q(3), part))}$ minutes, et $${tex(fois(Q(3), part))} + ${tex(fois(Q(2), part))} = 55$`);
    dit(16, `$\\dfrac{3}{2} = ${tex(div(Q(3), Q(2)))}$ donnerait « $${tex(fois(div(Q(3), Q(2)), Q(100)))}\\,\\%$ »`);
    dit(16, `Réponse : a) $${tex(fois(a, Q(100)))}\\,\\%$ pour A et $${tex(fois(b, Q(100)))}\\,\\%$ pour B ; b) $${tex(fois(Q(2), part))}$ minutes pour B.`);
    const m = bloc(16).match(/\bcamembert\(\[\{ nom: "([^"]*)", valeur: (\d+) \}, \{ nom: "([^"]*)", valeur: (\d+) \}\]\)/);
    v.ok("16. le camembert est dessiné", !!m);
    if (m) {
      v.ok(`16. camembert : A ${m[2]}, B ${m[4]} = 3/5 et 2/5 de 100`, egal(Q(m[2]), fois(a, Q(100))) && egal(Q(m[4]), fois(b, Q(100))));
      // Légende en corps 15 gras (≈ 9,4 px par signe) à partir de x = 162, viewBox 240.
      v.ok("16. camembert : la légende tient dans le cadre", [m[1], m[3]].every((t) => 162 + long(t) * 9.4 <= 240));
    }
  }

  /* ── ★★★ Problèmes ──────────────────────────────────────────────────── */
  v.titre("★★★ Problèmes");

  // 17. le braquet : 52/13 puis 36/24, roue de 2,1 m, 1,26 km
  {
    const g1 = pgcd(52, 13);
    const r1 = div(Q(52), Q(13));
    const d1 = fois(r1, D("2,1"));
    const n1 = div(Q(1260), d1);
    const g2 = pgcd(36, 24);
    const r2 = div(Q(36), Q(24));
    const d2 = fois(r2, D("2,1"));
    const n2 = div(Q(1260), d2);
    dit(17, `je divise les deux nombres par $${g1}$ : le ratio simplifié est $${52 / g1} : ${13 / g1}$`);
    dit(17, `$52 \\div 13 = ${tex(r1)}$. La roue fait $${tex(r1)}$ tours`);
    dit(17, `$\\dfrac{p}{1} = \\dfrac{r}{${tex(r1)}}$`);
    dit(17, `$${tex(r1)} \\times 2{,}1 = ${tex(d1)}$ m`);
    dit(17, `$1{,}26$ km $= 1\\,260$ m, et $1\\,260 \\div ${tex(d1)} = ${tex(n1)}$ tours de pédale`);
    dit(17, `je divise par $${g2}$, le ratio est $${36 / g2} : ${24 / g2}$. La roue fait $3 \\div 2 = ${tex(r2)}$ tour par tour de pédale, soit $${tex(r2)} \\times 2{,}1 = ${tex(d2)}$ m`);
    dit(17, `$1\\,260 \\div ${tex(d2)} = ${tex(n2)}$ tours de pédale`);
    dit(17, `$1{,}26 \\div ${tex(d1)} = ${tex(div(D("1,26"), d1))}$ tour`);
    dit(17, `Réponse : a) $4 : 1$ ; b) $${tex(r1)}$ tours ; c) $${tex(d1)}$ m, et $${tex(n1)}$ tours de pédale ; d) $3 : 2$, $${tex(d2)}$ m, et $${tex(n2)}$ tours de pédale.`);
    partsJuste(17, 0, [Q(1), n1], [r1, fois(n1, r1)], r1);
    partsJuste(17, 1, [r1, fois(n1, r1)], [d1, Q(1260)], D("2,1"));
  }

  // 18. le déclin : −73 %, 10 000 grenouilles, puis +73 %
  {
    const k = coef(-73);
    const a2020 = fois(Q(10000), k);
    const apres = fois(a2020, coef(73));
    const retour = div(Q(10000), a2020);
    dit(18, `garder $100 - 73 = 27\\,\\%$ : le coefficient est $${tex(k)}$`);
    dit(18, `$10\\,000 \\times ${tex(k)} = ${tex(a2020)}$ grenouilles`);
    dit(18, `$${tex(a2020)} \\times 1{,}73 = ${tex(apres)}$`);
    v.ok("18. 4 671 est moins de la moitié de 10 000", fois(apres, Q(2)).n < 10000n * fois(apres, Q(2)).d);
    dit(18, `$10\\,000 \\div ${tex(a2020)} \\approx ${arr(retour, 1)}$`);
    dit(18, `une hausse d'environ $${Math.round(((Number(retour.n) / Number(retour.d)) - 1) * 10) * 10}\\,\\%$`);
    dit(18, `$73\\,\\%$ de $10\\,000$ font $${tex(fois(pc(73), Q(10000)))}$, mais $73\\,\\%$ de $${tex(a2020)}$ ne font que $${tex(fois(pc(73), a2020))}$`);
    dit(18, `Réponse : a) $\\times ${tex(k)}$ ; b) $${tex(a2020)}$ grenouilles ; c) non, $${tex(apres)}$ seulement ; d) environ $\\times ${arr(retour, 1)}$.`);
    evolutionJuste(18, [Q(10000), a2020, apres], [-73, 73]);
  }

  // 19. le CO₂ : 280 → 420 ppm, 21 % de dioxygène
  {
    const part = div(Q(420), Q(1000000));
    const k = div(Q(420), Q(280));
    const ecart = 420 - 280;
    const o2 = fois(pc(21), Q(1000000));
    const g = pgcd(Number(o2.n), 420);
    dit(19, `$\\dfrac{420}{1\\,000\\,000} = ${tex(part).replace("0{,}00042", "0{,}000\\,42")} = ${tex(fois(part, Q(100)))}\\,\\%$`);
    dit(19, `$420 \\div 280 = ${tex(k)}$. C'est une hausse de $${tex(fois(moins(k, Q(1)), Q(100)))}\\,\\%$`);
    dit(19, `$420 - 280 = ${ecart}$ ppm`);
    dit(19, `$\\dfrac{${ecart}}{280} = ${tex(div(Q(ecart), Q(280)))}$`);
    dit(19, `$0{,}21 \\times 1\\,000\\,000 = ${tex(o2)}$ molécules`);
    dit(19, `$${tex(o2)} : 420$, soit $${Number(o2.n) / g} : ${420 / g}$ en divisant par $${g}$`);
    dit(19, `$280 \\times 2{,}4 = ${tex(fois(Q(280), coef(ecart)))}$ ppm`);
    v.ok("19. 2,4 est le coefficient d'une hausse de 140 %", egal(coef(ecart), D("2,4")));
    dit(19, `Réponse : a) $420 : 1\\,000\\,000$, soit $${tex(fois(part, Q(100)))}\\,\\%$ ; b) une hausse de $${tex(fois(moins(k, Q(1)), Q(100)))}\\,\\%$ ; c) non, c'est $+${ecart}$ ppm, soit $+50\\,\\%$ ; d) $${Number(o2.n) / g}$ molécules`);
    evolutionJuste(19, [Q(280), Q(420)], [Number(fois(moins(k, Q(1)), Q(100)).n)]);
  }

  // 20. la coopérative : 3 000, 4 500, 7 500 € ; 1 200 € ; −15 %
  {
    const g = pgcd(pgcd(3000, 4500), 7500);
    const r = [3000 / g, 4500 / g, 7500 / g];
    const S = r[0] + r[1] + r[2];
    const part = div(Q(1200), Q(S));
    const [a, b, cc] = r.map((x) => fois(Q(x), part));
    const total2 = fois(Q(1200), coef(-15));
    const part2 = div(total2, Q(S));
    dit(20, `Les trois nombres se divisent par $1\\,500$ : le ratio simplifié est $${r.join(" : ")}$`);
    v.ok(`20. le plus grand diviseur commun est ${g}`, g === 1500);
    dit(20, `$2 + 3 + 5 = ${S}$ parts, et une part vaut $1\\,200 \\div ${S} = ${tex(part)}$ €`);
    dit(20, `Diaz : $2 \\times ${tex(part)} = ${tex(a)}$ €. Roy : $3 \\times ${tex(part)} = ${tex(b)}$ €. Petit : $5 \\times ${tex(part)} = ${tex(cc)}$ €.`);
    dit(20, `$\\dfrac{5}{10} = ${tex(div(Q(5), Q(10)))}$, soit $${tex(fois(div(Q(5), Q(10)), Q(100)))}\\,\\%$`);
    v.ok("20. les Petit ont apporté la moitié de l'argent", egal(div(Q(7500), Q(15000)), div(Q(r[2]), Q(S))));
    dit(20, `$1\\,200 \\times 0{,}85 = ${tex(total2)}$ €. Une part vaut $${tex(total2)} \\div 10 = ${tex(part2)}$ €, et les Diaz reçoivent $2 \\times ${tex(part2)} = ${tex(fois(Q(2), part2))}$ €`);
    dit(20, `$${tex(a)} \\times 0{,}85 = ${tex(fois(a, coef(-15)))}$ €`);
    v.ok("20. les deux chemins donnent le même montant", egal(fois(Q(2), part2), fois(a, coef(-15))));
    dit(20, `$${tex(div(Q(1200), Q(3)))}$ € chacune`);
    dit(20, `Réponse : a) $${r.join(" : ")}$ ; b) $${tex(a)}$ €, $${tex(b)}$ € et $${tex(cc)}$ € ; c) $50\\,\\%$ ; d) $${tex(fois(Q(2), part2))}$ €.`);
    barreJuste(20, r, [a, b, cc], Q(1200));
  }

  /* ── Toute la feuille ───────────────────────────────────────────────── */
  v.titre("Les corrigés et les dessins");
  const sansReponse = f.corrections.map((t, i) => (/\\nRéponse : (?:(?!\\n).)+$/.test(t) ? null : i + 1)).filter(Boolean);
  v.ok("chaque corrigé finit par sa ligne « Réponse : … »", sansReponse.length === 0, sansReponse.join(", "));
  const sansPiege = f.corrections.map((t, i) => (t.includes("⛔ Le piège : ") ? null : i + 1)).filter(Boolean);
  v.ok("chaque corrigé nomme son piège", sansPiege.length === 0, sansPiege.join(", "));
  const dessines = f.blocs.filter((b) => /\n\s*schema: /.test(b)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
  // Le texte d'un SVG ne passe pas par KaTeX : pas de `$` ni de `\` dans les appels.
  const appels = f.series.split("\n").filter((l) => /\b(barre|pourcents|evolution|tableauParts|tableau|camembert)\(/.test(l));
  v.ok(`aucun $ ni \\ dans les ${appels.length} appels de dessin`, appels.every((l) => !/[$\\]/.test(l)), appels.find((l) => /[$\\]/.test(l))?.trim());
}

lancer({
  nom: "RATIOS, PARTAGES ET POURCENTAGES · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-ratios-pourcentages.tsx",
  notionId: "prop_ratio_pourcentage",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : le ratio mal simplifié", "le ratio simplifié est $3 : 4$", "le ratio simplifié est $3 : 5$"],
    ["ex. 1 : la barre dessine 2 parts de filles", '{ nom: "filles", parts: 3, valeur: "18" }', '{ nom: "filles", parts: 2, valeur: "18" }'],
    ["ex. 2 : x divisé par la part de y", "et $y = 14$.", "et $y = 17{,}5$."],
    ["ex. 3 : le bronze faux", "$b = 4 \\\\times 4 = 16$", "$b = 4 \\\\times 4 = 12$"],
    ["ex. 4 : partage en deux moitiés", "Inès reçoit $20$ € et Noé $25$ €", "Inès reçoit $22{,}50$ € et Noé $22{,}50$ €"],
    ["ex. 5 : le pourcentage pris pour une masse", "Réponse : environ $42$ kg d'eau.", "Réponse : environ $60$ kg d'eau."],
    ["ex. 5 : la barre des pourcentages fausse", '[[10, "7"], [60, "42"]]', '[[10, "7"], [60, "40"]]'],
    ["ex. 6 : total divisé par la partie", "Réponse : $12\\\\,\\\\%$ de sucres.", "Réponse : $8{,}3\\\\,\\\\%$ de sucres."],
    ["ex. 7 : × 0,08 pour une hausse de 8 %", "a) $\\\\times 1{,}08$ ;", "a) $\\\\times 0{,}08$ ;"],
    ["ex. 7 : un coefficient faux dans le tableau", '"× 0,75"', '"× 0,25"'],
    ["ex. 8 : 5 € au lieu de 5 %", "le nouveau prix est $1\\\\,260$ €.", "le nouveau prix est $1\\\\,205$ €."],
    ["ex. 9 : le même écart au lieu du même rapport", '["!36", "12"], "12"', '["!14", "12"], "12"'],
    ["ex. 9 : l'huile à ajouter fausse", "c) non, il doit ajouter $4$ cL d'huile.", "c) non, il doit ajouter $2$ cL d'huile."],
    ["ex. 10 : partage égal", "Sam porte $6$ kg, Lou $8$ kg et Maé $10$ kg", "Sam porte $8$ kg, Lou $8$ kg et Maé $8$ kg"],
    ["ex. 10 : le total de la barre faux", '], "24 kg", "2 kg")', '], "26 kg", "2 kg")'],
    ["ex. 11 : Léna a raison", "b) non, Léna a tort", "b) oui, Léna a raison"],
    ["ex. 12 : 510 − 71", "et $147{,}9$ millions de km² de terres, soit", "et $439$ millions de km² de terres, soit"],
    ["ex. 12 : la barre des pourcentages arrondie", '[[71, "362,1"]]', '[[71, "362"]]'],
    ["ex. 13 : le coefficient lu comme la baisse", "b) une baisse de $85\\\\,\\\\%$ ;", "b) une baisse de $15\\\\,\\\\%$ ;"],
    ["ex. 13 : l'évolution dessinée à −80 %", 'valeur: "9", taux: -85', 'valeur: "9", taux: -80'],
    ["ex. 14 : rapporté à l'arrivée", "$1{,}24$ ; c'est une hausse de $24\\\\,\\\\%$.", "$1{,}24$ ; c'est une hausse de $19\\\\,\\\\%$."],
    ["ex. 15 : les évolutions additionnées", "soit une hausse de $32\\\\,\\\\%$.", "soit une hausse de $30\\\\,\\\\%$."],
    ["ex. 15 : juin dessiné à 10,40 €", 'valeur: "10,56", taux: 20', 'valeur: "10,40", taux: 20'],
    ["ex. 16 : les minutes de A données pour B", "b) $22$ minutes pour B.", "b) $33$ minutes pour B."],
    ["ex. 16 : le camembert rapporte A à B", '{ nom: "équipe A", valeur: 60 }', '{ nom: "équipe A", valeur: 66 }'],
    ["ex. 16 : une légende qui sort du camembert", '{ nom: "équipe B", valeur: 40 }', '{ nom: "l\'équipe B", valeur: 40 }'],
    ["ex. 17 : les tours de pédale du grand braquet", "et $400$ tours de pédale.", "et $150$ tours de pédale."],
    ["ex. 17 : le tableau des distances faux", '["!8,4", "1 260"], "2,1"', '["!8,4", "1 200"], "2,1"'],
    ["ex. 18 : +73 % efface −73 %", "c) non, $4\\\\,671$ seulement", "c) oui, $10\\\\,000$ seulement"],
    ["ex. 18 : la mare dessinée au niveau de 1970", 'valeur: "4 671", taux: 73', 'valeur: "10 000", taux: 73'],
    ["ex. 19 : l'écart pris pour un pourcentage", "b) une hausse de $50\\\\,\\\\%$ ;", "b) une hausse de $140\\\\,\\\\%$ ;"],
    ["ex. 19 : 0,042 % lu 0,42 %", "soit $0{,}042\\\\,\\\\%$ ;", "soit $0{,}42\\\\,\\\\%$ ;"],
    ["ex. 20 : la baisse oubliée", "d) $204$ €.", "d) $240$ €."],
    ["ex. 20 : la barre dessine 4 parts pour les Petit", '{ nom: "Petit", parts: 5, valeur: "600 €" }', '{ nom: "Petit", parts: 4, valeur: "600 €" }'],
    ["une étiquette qui déborde de son segment", '{ nom: "Diaz", parts: 2', '{ nom: "les Diaz", parts: 2'],
    ["un schéma retiré", '          schema: tableauParts(["Parts", "Nombres"], ["5", "2"], ["35", "!14"], "7"),\n', ""],
    ["un corrigé sans sa ligne « Réponse : »", "\\nRéponse : Sam porte", "\\nDonc Sam porte"],
    ["un $ dans une consigne", 'consigne: "Des situations réelles,', 'consigne: "Des situations $réelles$,'],
    ["une micro d'une autre notion", 'micros: ["prop_ratio_quotients"],', 'micros: ["prop_quatrieme"],'],
  ],
});
