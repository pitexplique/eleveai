// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Grandeurs composées :
// vitesse, énergie, conversions » de 4e (lib/fiches-exercices/maths-4e-grandeurs-composees.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque valeur est refaite ici en fractions EXACTES à partir
// des données de l'énoncé, les conversions passent par une TABLE DE FACTEURS
// écrite à part (1 km = 1 000 m, 1 m² = 10 000 cm²…), puis le résultat doit se
// LIRE dans la phrase du corrigé — pas le nombre seul.
//
// ⭐ LES DESSINS SONT RELUS :
// - trajets à l'échelle : chaque graduation est à sa vraie place, ce qui est
//   écrit au-dessus (durée) et dessous (distance) correspond à la position avec
//   la vitesse du corrigé ; la partie colorée s'arrête au bon endroit ; les
//   étiquettes tiennent dans le cadre et ne se chevauchent pas ;
// - rectangles-produits : l'étiquette dit bien largeur × hauteur, et tient à sa
//   place (dedans, dessus, à droite) sans mordre sur un autre rectangle ;
// - tableaux de conversion : les chiffres, lus dans l'unité de DÉPART, redonnent
//   le nombre de l'énoncé, et lus dans l'unité d'ARRIVÉE, la réponse du corrigé,
//   recalculée par la table de facteurs ;
// - tableaux de calcul : toute case « a × b = c » ou « a ÷ b = c » est refaite ;
// - le terrain, le km² et ses habitants, le cube, les barres : leurs nombres.
// Les corrigés dessinés sont COMPTÉS : vingt sur vingt. Et la taille du texte à
// 375 px : 12 × 235 ÷ 240 ≈ 11,75 px effectifs (≥ 11).
//
//   node scripts/verifier-exercices-grandeurs-composees-4e.mjs
//
// Sort en code 1 à la première divergence, ou si un contrôle négatif passe
// inaperçu. Le socle (structure, dollars, micros, casses) : verifier-exercices-commun.mjs.

import { Q, D, fois, div, plus, moins, egal, inf, versNombre, tex, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Écritures ─────────────────────────────────────────────────────────── */

/** Un arrondi écrit comme la feuille : 51{,}4 ; 1\,233 ; 0{,}017. */
function fr(x, n = 0) {
  const r = Math.round(x * 10 ** n) / 10 ** n;
  let [e, f] = Math.abs(r).toFixed(n).split(".");
  if (e.length >= 4) e = e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
  return (r < 0 ? "-" : "") + e + (f ? `{,}${f}` : "");
}
/** Un prix : deux décimales (`7{,}20`), ce que `tex()` ne fait pas. */
function prix(a) {
  const c = fois(a, Q(100));
  if (c.d !== 1n) throw new Error(`pas un nombre de centimes : ${a.n}/${a.d}`);
  const s = c.n.toString().padStart(3, "0");
  return `${s.slice(0, -2)}{,}${s.slice(-2)}`;
}
const N = (x) => (typeof x === "object" ? x : D(String(x)));
/** Le premier nombre d'une étiquette : « ≈ 1 087 cm³ » → 1087, « 2,40 » → 2,4. */
function nb(s) {
  const m = String(s).match(/(\d[\d ]*(?:,\d+)?)/);
  return m ? D(m[1].replace(/ /g, "").trim()) : null;
}
/** Le nombre juste avant une unité : « en 1 h : 1,5 kWh » → 1,5. */
function nbAvant(s, unite) {
  const m = [...String(s).matchAll(new RegExp(`(\\d[\\d ]*(?:,\\d+)?) ${unite.replace(/[/]/g, "\\/")}`, "g"))].at(-1);
  return m ? D(m[1].replace(/ /g, "")) : null;
}
/** Une durée écrite « 45 min », « 1 h », « 0 h » → en heures. */
function heures(s) {
  const m = s.match(/^(\d+(?:,\d+)?) (h|min)$/);
  if (!m) return null;
  return m[2] === "h" ? D(m[1]) : div(D(m[1]), Q(60));
}

/* ── La table des facteurs, écrite à part ────────────────────────────────── */

const LONG = { km: Q(1000), hm: Q(100), dam: Q(10), m: Q(1), dm: Q(1, 10), cm: Q(1, 100), mm: Q(1, 1000) };
const AIRE = Object.fromEntries(Object.entries(LONG).map(([u, f]) => [`${u}²`, fois(f, f)]));
const FACTEUR = { ...LONG, ...AIRE };
/** n unités `de`, exprimées en `vers`. */
const convertir = (n, de, vers) => div(fois(N(n), FACTEUR[de]), FACTEUR[vers]);

/* ── La mise en page des SVG (mêmes nombres que le fichier de données) ───── */

const L = 240;
const X0 = 18;
const X1 = 222;
const SIGNE = 7.44; // 12 gras
const SIGNE_FIN = 6.7; // 12 maigre
const largeur = (t) => [...t].length * SIGNE;
const garde = (x, t) => Math.min(Math.max(x, 2 + largeur(t) / 2), L - 2 - largeur(t) / 2);

/* ── Relire les dessins d'un exercice ────────────────────────────────────── */

function trajetsDe(bloc) {
  const m = bloc.match(/trajets\(([\d.]+), \[/);
  if (!m) return null;
  const max = Number(m[1]);
  const lignes = [...bloc.matchAll(/\{\s*legende: "([^"]*)",\s*plein: ([\d.]+),\s*marques: \[((?:\[[^\]]*\],?\s*)*)\],?(?:\s*couleur: (\w+),?)?\s*\}/g)].map((l) => ({
    legende: l[1],
    plein: D(l[2]),
    marques: [...l[3].matchAll(/\[([\d.]+), "([^"]*)", "([^"]*)"\]/g)].map((q) => ({ pos: D(q[1]), haut: q[2], bas: q[3] })),
  }));
  return { max: D(m[1]), maxN: max, lignes };
}

function produitDe(bloc) {
  const m = bloc.match(/produit\(\s*([\d.]+),\s*([\d.]+),\s*\[([\s\S]*?)\],\s*\{ x: \[((?:\[[^\]]*\],?\s*)*)\], y: \[((?:\[[^\]]*\],?\s*)*)\], ux: "([^"]*)", uy: "([^"]*)" \}/);
  if (!m) return null;
  const rects = [...m[3].matchAll(/\{ l: ([\d.]+), h: ([\d.]+), texte: "([^"]*)", ou: "(\w+)"([^}]*)\}/g)].map((r) => ({ l: D(r[1]), h: D(r[2]), texte: r[3], ou: r[4] }));
  const ticks = (t) => [...t.matchAll(/\[([\d.]+), "([^"]*)"\]/g)].map((q) => ({ v: D(q[1]), t: q[2] }));
  return { xmax: Number(m[1]), ymax: Number(m[2]), rects, x: ticks(m[4]), y: ticks(m[5]), ux: m[6], uy: m[7] };
}

function conversionsDe(bloc) {
  return [...bloc.matchAll(/conversion\(\[([^\]]*)\], (\d), \[([\s\S]*?)\]\)/g)].map((m) => ({
    unites: JSON.parse(`[${m[1]}]`),
    larg: Number(m[2]),
    lignes: [...m[3].matchAll(/\{ cases: \[([^\]]*)\], de: "([^"]+)", vers: "([^"]+)" \}/g)].map((l) => ({ cases: JSON.parse(`[${l[1]}]`), de: l[2], vers: l[3] })),
  }));
}
/** Le nombre que les chiffres du tableau forment, lu dans l'unité `u`. Refuse un
 *  trou entre deux chiffres, ou des zéros manquants avant la virgule. */
function lire(conv, cases, u) {
  const w = conv.larg;
  if (cases.length !== conv.unites.length) throw new Error("nombre de cases ≠ nombre d'unités");
  if (cases.some((c) => c !== "" && [...c].length !== w)) throw new Error(`une case n'a pas ${w} signe(s) : ${JSON.stringify(cases)}`);
  const s = cases.map((c) => (c === "" ? " ".repeat(w) : c)).join("");
  if (/\d\s+\d/.test(s)) throw new Error(`trou entre deux chiffres : « ${s} »`);
  const fin = (conv.unites.indexOf(u) + 1) * w;
  if (fin === 0) throw new Error(`unité absente : ${u}`);
  const ent = s.slice(0, fin);
  const dec = s.slice(fin);
  if (ent.trim() && /\s$/.test(ent)) throw new Error(`zéros manquants avant la virgule (lecture en ${u})`);
  if (!ent.trim() && /^\s+\d/.test(dec)) throw new Error(`zéros manquants après la virgule (lecture en ${u})`);
  return D(`${ent.trim() || "0"}${dec.trimEnd() ? "," + dec.trimEnd() : ""}`);
}

function tableauDe(bloc) {
  const i = bloc.indexOf("tableau([");
  if (i < 0) return null;
  const j = bloc.indexOf("])", i);
  return [...bloc.slice(i, j + 2).matchAll(/\[\s*("(?:[^"\\]|\\.)*"(?:,\s*"(?:[^"\\]|\\.)*")+)\s*,?\s*\]/g)].map((m) => JSON.parse(`[${m[1]}]`));
}

/* ── Le recalcul ─────────────────────────────────────────────────────────── */

function verifier(source, v) {
  const { corrections, enonces, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const b = (k) => blocs[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");

  /** Un trajet : mise en page, puis chaque graduation par `regle(ligne, marque)`. */
  const trajet = (k, regle, pleinAttendu) => {
    const t = trajetsDe(b(k));
    if (!t) return v.ok(`${k}. le corrigé a son trajet dessiné`, false);
    const x = (d) => X0 + (versNombre(d) * (X1 - X0)) / t.maxN;
    t.lignes.forEach((li, i) => {
      const fautes = [];
      if ([...li.legende].length * SIGNE_FIN > L - 4) fautes.push(`légende trop longue`);
      if (inf(t.max, li.plein)) fautes.push("la partie colorée dépasse l'axe");
      for (const tier of ["haut", "bas"]) {
        const boites = li.marques
          .filter((m) => m[tier])
          .map((m) => ({ t: m[tier], g: garde(x(m.pos), m[tier]) - largeur(m[tier]) / 2, d: garde(x(m.pos), m[tier]) + largeur(m[tier]) / 2 }))
          .sort((p, q) => p.g - q.g);
        for (let j = 1; j < boites.length; j++) if (boites[j].g < boites[j - 1].d + 4) fautes.push(`« ${boites[j - 1].t} » et « ${boites[j].t} » se touchent`);
      }
      for (const m of li.marques) {
        if (inf(t.max, m.pos)) fautes.push(`graduation ${versNombre(m.pos)} hors de l'axe`);
        const r = regle(i, m);
        if (r !== true) fautes.push(`graduation ${versNombre(m.pos)} : ${r}`);
      }
      if (pleinAttendu && !pleinAttendu(i, li.plein)) fautes.push(`partie colorée jusqu'à ${versNombre(li.plein)}`);
      v.ok(`${k}. trajet ${i + 1} (« ${li.legende} ») : ${li.marques.length} graduations à leur place, étiquettes lisibles`, fautes.length === 0, fautes.join(" ; "));
    });
    return t;
  };

  /** Les rectangles-produits : aire = étiquette (facteur `f` d'unités), et mise en page. */
  const produitVerifie = (k, unite, f = Q(1)) => {
    const p = produitDe(b(k));
    if (!p) return v.ok(`${k}. le corrigé a ses rectangles`, false);
    const G = 44, Dr = 228, HAUT = 22, BAS = 136;
    const px = (u) => G + (versNombre(u) * (Dr - G)) / p.xmax;
    const py = (u) => BAS - (versNombre(u) * (BAS - HAUT)) / p.ymax;
    const boites = p.rects.map((r) => ({ x0: px(Q(0)), x1: px(r.l), y0: py(r.h), y1: py(Q(0)) }));
    p.rects.forEach((r, i) => {
      const aire = fois(fois(r.l, r.h), f);
      const lu = nbAvant(r.texte, unite);
      v.ok(`${k}. rectangle ${versNombre(r.l)} × ${versNombre(r.h)} : « ${r.texte} »`, !!lu && egal(lu, aire), `aire ${versNombre(aire)}`);
      const w = largeur(r.texte);
      const bx = boites[i];
      let ok = true;
      let texte;
      if (r.ou === "dedans") ok = bx.x1 - bx.x0 >= w + 6 && bx.y1 - bx.y0 >= 16;
      else {
        texte =
          r.ou === "dessus"
            ? { g: (bx.x0 + bx.x1) / 2 - w / 2, d: (bx.x0 + bx.x1) / 2 + w / 2, h: bx.y0 - 15, b: bx.y0 - 3 }
            : { g: bx.x1 + 5, d: bx.x1 + 5 + w, h: (bx.y0 + bx.y1) / 2 - 6, b: (bx.y0 + bx.y1) / 2 + 6 };
        ok = texte.g >= 2 && texte.d <= L - 2 && texte.h >= 18;
        boites.forEach((o, j) => {
          if (j !== i && texte.g < o.x1 && texte.d > o.x0 && texte.h < o.y1 && texte.b > o.y0) ok = false;
        });
      }
      v.ok(`${k}. l'étiquette « ${r.texte} » tient à sa place (${r.ou})`, ok);
    });
    const graduations = [...p.x, ...p.y].every((g) => nb(g.t) && egal(nb(g.t), g.v));
    const bords = p.y.every((g) => G - 7 - largeur(g.t) >= 0) && [...p.uy].length * SIGNE_FIN <= L - 4 && [...p.ux].length * SIGNE_FIN <= Dr - 2;
    v.ok(`${k}. graduations des axes à leur valeur, légendes dans le cadre`, graduations && bords);
    return p;
  };

  /** Chaque ligne d'un tableau de conversion : départ = énoncé, arrivée = facteur. */
  const conversionVerifiee = (k, attendus, i = 0) => {
    const conv = conversionsDe(b(k))[i];
    if (!conv) return v.ok(`${k}. le corrigé a son tableau de conversion`, false);
    v.ok(`${k}. tableau de conversion : ${conv.lignes.length} lignes`, conv.lignes.length === attendus.length);
    const unitesOk = conv.unites.every((u, j) => j === 0 || egal(div(FACTEUR[conv.unites[j - 1]], FACTEUR[u]), Q(conv.larg === 1 ? 10 : 100)));
    v.ok(`${k}. colonnes dans l'ordre, ${conv.larg} chiffre(s) par unité`, unitesOk && (conv.larg === 1 ? conv.unites.every((u) => u in LONG) : conv.unites.every((u) => u in AIRE)));
    attendus.forEach(([n, de, vers], j) => {
      const li = conv.lignes[j];
      if (!li) return;
      try {
        const depart = lire(conv, li.cases, li.de);
        const arrivee = lire(conv, li.cases, li.vers);
        const juste = convertir(n, de, vers);
        v.ok(`${k}. ligne ${j + 1} : ${n} ${de} lu au départ, ${tex(juste)} ${vers} lu à l'arrivée`, li.de === de && li.vers === vers && egal(depart, N(n)) && egal(arrivee, juste), `lu ${tex(depart)} ${li.de} → ${tex(arrivee)} ${li.vers}`);
      } catch (e) {
        v.ok(`${k}. ligne ${j + 1} du tableau de conversion`, false, e.message);
      }
    });
  };

  /** Toute case « a × b = c » ou « a ÷ b = c » d'un tableau est refaite. */
  const calculsDuTableau = (k) => {
    const t = tableauDe(b(k)) ?? [];
    const fautes = [];
    let n = 0;
    for (const cell of t.flat()) {
      const m = cell.match(/(\d[\d ]*(?:,\d+)?) ([×÷]) (\d[\d ]*(?:,\d+)?) = (\d[\d ]*(?:,\d+)?)/);
      if (!m) continue;
      n++;
      const [a, bb, r] = [m[1], m[3], m[4]].map((s) => D(s.replace(/ /g, "")));
      if (!egal(m[2] === "×" ? fois(a, bb) : div(a, bb), r)) fautes.push(cell);
    }
    v.ok(`${k}. les ${n} calculs écrits dans le tableau sont justes`, n > 0 && fautes.length === 0, fautes.join(" | "));
    return t;
  };

  v.titre("Les dessins");
  {
    const vb = (source.match(/viewBox=/g) ?? []).length;
    const vbL = (source.match(/viewBox=\{`0 0 \$\{L\} /g) ?? []).length;
    const tailles = [...source.matchAll(/fontSize=\{([^}]+)\}/g)].map((m) => m[1]);
    const Lval = Number(source.match(/const L = (\d+);/)?.[1]);
    const police = Number(source.match(/const POLICE = (\d+);/)?.[1]);
    const effectif = (police * 235) / Lval;
    v.ok(`${vb} SVG, tous de ${Lval} de large ; ${tailles.length} textes, tous en ${police} : ${effectif.toFixed(2)} px effectifs à 375 px (≥ 11)`, vb > 0 && vb === vbL && tailles.every((t) => t === "POLICE") && effectif >= 11 && Lval === L);
    const cadres = [...source.matchAll(/const CADRE = "([^"]*)"/g)].map((m) => m[1]);
    v.ok("les dessins ne sont pas plus étroits que 16rem sur papier, 22rem à l'écran", cadres.length === 1 && /max-w-\[22rem\]/.test(cadres[0]) && /print:max-w-\[16rem\]/.test(cadres[0]));
  }
  const dessines = blocs.filter((x) => /\bschema:/.test(x)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);

  v.titre("★ Un seul geste");
  // 1. 1,5 kW pendant 40 min.
  {
    const h = div(Q(40), Q(60));
    v.ok("1. 40/60 = 2/3", egal(h, Q(2, 3)));
    const E = fois(D("1,5"), h);
    dit(1, "$40$ min $= \\dfrac{40}{60}$ h $= \\dfrac{2}{3}$ h");
    dit(1, `$E = 1{,}5 \\times \\dfrac{2}{3} = ${tex(E)}$ kWh`);
    dit(1, `$1{,}5 \\times 0{,}40 = ${tex(fois(D("1,5"), D("0,40")))}$ kWh au lieu de $${tex(E)}$`);
    dit(1, `Réponse : la plaque consomme $${tex(E)}$ kWh.`);
    const p = produitVerifie(1, "kWh", Q(1, 60));
    v.ok("1. le rectangle bleu fait 40 min sur 1,5 kW", !!p && p.rects.some((r) => egal(r.l, Q(40)) && egal(r.h, D("1,5")) && egal(nbAvant(r.texte, "kWh") ?? Q(-1), E)));
  }

  // 2. 1 500 m en 25 min.
  {
    const vit = div(Q(1500), Q(25));
    dit(2, `$v = 1\\,500 \\div 25 = ${tex(vit)}$ m/min`);
    dit(2, `$5 \\times ${tex(vit)} = ${tex(fois(Q(5), vit))}$ m`);
    dit(2, `$25 \\div 1\\,500 \\approx ${fr(25 / 1500, 3)}$`);
    dit(2, `Réponse : sa vitesse moyenne est $${tex(vit)}$ m/min.`);
    trajet(
      2,
      (_, m) => (m.bas && !egal(nb(m.bas), m.pos) ? `« ${m.bas} » dessous` : m.haut && !egal(fois(nb(m.haut), vit), m.pos) ? `« ${m.haut} » min × ${tex(vit)} ≠ position` : true),
      (_, p) => egal(p, Q(1500)),
    );
  }

  // 3. Les unités composées : l'unité suit l'opération.
  {
    const attendus = [["€", "÷", "L"], ["W", "×", "h"], ["hab", "÷", "km²"], ["g", "÷", "cm³"]];
    const t = tableauDe(b(3)) ?? [];
    const lignes = t.slice(1);
    const reps = [];
    attendus.forEach(([a, op, u], i) => {
      const unite = op === "÷" ? `${a}/${u}` : `${a}${u}`;
      const famille = op === "÷" ? "quotient" : "produit";
      const li = lignes[i] ?? [];
      v.ok(`3. ${a} ${op} ${u} → ${unite} (${famille})`, li[0] === `${a} ${op} ${u}` && li[1] === unite && li[2] === famille, li.join(" | "));
      reps.push(`${unite} (${famille})`);
      const mot = a === "hab" ? "habitants" : a;
      dit(3, `${mot} ${op} ${u} donne ${unite}`);
    });
    dit(3, `Réponse : ${reps.join(" ; ")}.`);
  }

  // 4. 2,40 €/kg.
  {
    const pk = D("2,40");
    const t = tableauDe(b(4)) ?? [];
    const masses = (t[0] ?? []).slice(1).map((s) => D(s));
    const prixL = (t[1] ?? []).slice(1).map((s) => nb(s));
    v.ok(`4. tableau : ${masses.length} colonnes, prix = 2,40 × masse`, masses.length === 4 && masses.every((m, i) => prixL[i] && egal(prixL[i], fois(m, pk))));
    v.ok("4. le tableau contient 1 kg, 3 kg, 500 g et 6 €", egal(masses[0] ?? Q(0), Q(1)) && egal(masses[1] ?? Q(0), Q(3)) && egal(masses[2] ?? Q(0), div(Q(500), Q(1000))) && egal(prixL[3] ?? Q(0), Q(6)));
    dit(4, `$3 \\times 2{,}40 = ${prix(fois(Q(3), pk))}$ €`);
    dit(4, `$500$ g $= ${tex(div(Q(500), Q(1000)))}$ kg`);
    dit(4, `$0{,}5 \\times 2{,}40 = ${prix(fois(D("0,5"), pk))}$ €`);
    dit(4, `$6 \\div 2{,}40 = ${tex(div(Q(6), pk))}$ kg`);
    dit(4, `$500 \\times 2{,}40 = ${tex(fois(Q(500), pk))}$ €`);
    dit(4, `Réponse : $2{,}40$ € pour $1$ kg ; $${prix(fois(Q(3), pk))}$ € ; $${prix(fois(D("0,5"), pk))}$ € ; $${tex(div(Q(6), pk))}$ kg.`);
  }

  // 5. Longueurs en mètres.
  {
    const donnees = [["3,7", "km", "m"], ["45", "mm", "m"], ["280", "cm", "m"]];
    conversionVerifiee(5, donnees);
    const r = donnees.map(([n, de]) => convertir(n, de, "m"));
    dit(5, `$3{,}7$ km $= 3{,}7 \\times 1\\,000 = ${tex(r[0])}$ m`);
    dit(5, `$45$ mm $= 45 \\div 1\\,000 = ${tex(r[1])}$ m`);
    dit(5, `$280$ cm $= 280 \\div 100 = ${tex(r[2])}$ m`);
    v.ok("5. le piège : deux rangs au lieu de trois donnent 0,45", egal(div(Q(45), Q(100)), D("0,45")) && c(5).includes("$45$ mm $= 0{,}45$ m"));
    dit(5, `Réponse : ${r.map((x) => `$${tex(x)}$ m`).join(" ; ")}.`);
  }

  // 6. Aires : 1 cm² = 100 mm².
  {
    v.ok("6. la figure (sans le compte) et le schéma (avec) dessinent le carré de 1 cm", /figure: grilleMm\(false\)/.test(b(6)) && /grilleMm\(true\)/.test(b(6)));
    const grille = source.slice(source.indexOf("const grilleMm"), source.indexOf("const terrain"));
    v.ok("6. le carré est découpé en 10 × 10 : 11 traits par sens", /Array\.from\(\{ length: 11 \}/.test(grille) && /10 \* c/.test(grille));
    v.ok("6. 1 cm² = (10 mm)² = 100 mm²", egal(AIRE["cm²"], fois(Q(100), AIRE["mm²"])));
    const donnees = [["6", "cm²", "mm²"], ["45000", "cm²", "m²"], ["3,2", "dm²", "cm²"]];
    conversionVerifiee(6, donnees);
    const r = donnees.map(([n, de, vers]) => convertir(n, de, vers));
    dit(6, `$6$ cm² $= 6 \\times 100 = ${tex(r[0])}$ mm²`);
    dit(6, `$45\\,000$ cm² $= 45\\,000 \\div 10\\,000 = ${tex(r[1])}$ m²`);
    dit(6, `$3{,}2$ dm² $= 3{,}2 \\times 100 = ${tex(r[2])}$ cm²`);
    dit(6, `$1$ m² $= 100 \\times 100 = ${tex(div(AIRE["m²"], AIRE["cm²"]))}$ cm²`);
    v.ok("6. le piège : le facteur des longueurs donne 60", egal(fois(Q(6), div(LONG.cm, LONG.mm)), Q(60)) && c(6).includes("$6$ cm² $= 60$ mm²"));
    dit(6, `Réponse : $1$ cm² $= 100$ mm² ; $${tex(r[0])}$ mm² ; $${tex(r[1])}$ m² ; $${tex(r[2])}$ cm².`);
  }

  // 7. L'unité, puis la valeur.
  {
    const DIM = { m: "longueur", "m²": "aire", "m³": "volume", "m/h": "vitesse", "km/h": "vitesse", kWh: "énergie" };
    // Les ordres de grandeur du monde, dans l'unité de l'énoncé : un escargot
    // avance d'environ 1 mm/s (3,6 m/h) ; un marcheur fait 4 à 6 km/h ; un four
    // de 2 à 3 kW tient une soirée en 0,5 à 5 kWh.
    const items = [
      ["a", "aire", "540 m", null],
      ["b", "vitesse", "3 m/h", [0.5, 10]],
      ["c", "volume", "75 m²", null],
      ["d", "vitesse", "50 km/h", [3, 7]],
      ["e", "énergie", "2 kWh", [0.5, 5]],
    ];
    const t = tableauDe(b(7)) ?? [];
    const fauxU = [], fauxV = [], bons = [];
    items.forEach(([l, g, texte, plage], i) => {
      const [n, u] = [nb(texte), texte.split(" ").at(-1)];
      const uniteOk = DIM[u] === g;
      const valeurOk = uniteOk && versNombre(n) >= plage[0] && versNombre(n) <= plage[1];
      const attendu = [`${l}) ${texte}`, uniteOk ? "✓" : "✗", uniteOk ? (valeurOk ? "✓" : "✗") : "–"];
      v.ok(`7. ${l}) ${texte} pour une ${g} : unité ${uniteOk ? "juste" : "fausse"}${uniteOk ? `, valeur ${valeurOk ? "plausible" : "absurde"}` : ""}`, JSON.stringify(t[i + 1] ?? []) === JSON.stringify(attendu), (t[i + 1] ?? []).join(" | "));
      if (!uniteOk) fauxU.push(`${l})`);
      else if (!valeurOk) fauxV.push(`${l})`);
      else bons.push(`${l})`);
      v.ok(`7. ${l}) l'énoncé dit « ${texte} »`, (enonces[6] ?? "").includes(`${l}) `) && (enonces[6] ?? "").includes(`$${tex(n)}$ ${u}`));
    });
    v.ok("7. 3 m/h, c'est moins d'un millimètre par seconde", inf(div(Q(3000), Q(3600)), Q(1)));
    dit(7, `Réponse : ${fauxU.join(" et ")} sont faux par l'unité ; ${fauxV.join(" et ")} est faux par la valeur ; ${bons.join(" et ")} sont possibles.`);
  }

  // 8. Le cube d'aluminium.
  {
    const m = b(8).match(/cube\((\d+), "([^"]*)", \[([^\]]*)\], "([^"]*)"\)/);
    const n = m ? Number(m[1]) : 0;
    const V = Q(n * n * n);
    const rho = div(D("21,6"), V);
    v.ok("8. le cube dessiné a l'arête de l'énoncé (2 cm)", n === 2 && m[2] === "2 cm");
    const droite = m ? JSON.parse(`[${m[3]}]`) : [];
    v.ok("8. à droite du cube : son volume et sa masse", egal(nbAvant(droite[0] ?? "", "cm³") ?? Q(0), V) && egal(nbAvant(droite[1] ?? "", "g") ?? Q(0), D("21,6")) && droite.every((t) => largeur(t) <= L - 2 - 160));
    v.ok("8. sous le cube : la masse d'UN cm³", !!m && egal(nbAvant(m[4], "g") ?? Q(0), rho) && largeur(m[4]) <= L - 4);
    dit(8, `$V = 2 \\times 2 \\times 2 = ${tex(V)}$ cm³`);
    dit(8, `$21{,}6 \\div 8 = ${tex(rho)}$ g/cm³`);
    dit(8, `$50 \\times 2{,}7 = ${tex(fois(Q(50), rho))}$ g`);
    dit(8, `$8 \\div 21{,}6 \\approx ${fr(8 / 21.6, 2)}$`);
    dit(8, `Réponse : $${tex(V)}$ cm³ ; $${tex(rho)}$ g/cm³ ; $${tex(fois(Q(50), rho))}$ g.`);
  }

  v.titre("★★ Type devoir");
  // 9. Le guépard : 29 m/s.
  {
    const parHeure = fois(Q(29), Q(3600));
    const kmh = div(parHeure, Q(1000));
    dit(9, `$29 \\times 3\\,600 = ${tex(parHeure)}$ m, soit $${tex(kmh)}$ km`);
    dit(9, `$29 \\times 3{,}6 = ${tex(fois(Q(29), D("3,6")))}$`);
    v.ok("9. ×3 600 ÷ 1 000 = ×3,6", egal(div(Q(3600), Q(1000)), D("3,6")));
    const ms = 130 / 3.6;
    dit(9, `$130 \\div 3{,}6 \\approx ${fr(ms, 1)}$ m/s`);
    dit(9, `$130\\,000 \\div 3\\,600 \\approx ${fr(130000 / 3600, 1)}$ m`);
    dit(9, `$29 \\times 60 = ${tex(fois(Q(29), Q(60)))}$ m`);
    v.ok("9. le guépard est moins rapide que 130 km/h", inf(kmh, Q(130)) && c(9).includes("la voiture va plus vite"));
    dit(9, `Réponse : $${tex(kmh)}$ km/h ; environ $${fr(ms, 1)}$ m/s ; la voiture est plus rapide.`);
    const t = calculsDuTableau(9);
    const derniere = t.at(-1) ?? [];
    v.ok("9. tableau : la dernière ligne convertit 104 400 m en km", derniere[0] === "1 h" && egal(nbAvant(derniere[1] ?? "", "km") ?? Q(0), kmh));
    v.ok("9. tableau : 29 m en 1 s", JSON.stringify(t[1]) === JSON.stringify(["1 s", "29 m"]));
  }

  // 10. Le radiateur.
  {
    const kW = div(Q(1500), Q(1000));
    const jour = fois(kW, Q(6));
    const mois = fois(jour, Q(30));
    const cout = fois(mois, D("0,20"));
    dit(10, `$1\\,500$ W $= ${tex(kW)}$ kW`);
    dit(10, `$1{,}5 \\times 6 = ${tex(jour)}$ kWh`);
    dit(10, `$9 \\times 30 = ${tex(mois)}$ kWh`);
    dit(10, `$270 \\times 0{,}20 = ${tex(cout)}$ €`);
    const piege = fois(Q(1500), Q(6));
    dit(10, `$1\\,500 \\times 6 = ${tex(piege)}$`);
    dit(10, `serait de $${tex(fois(fois(piege, Q(30)), D("0,20")))}$ €`);
    dit(10, `Réponse : $${tex(jour)}$ kWh par jour ; $${tex(mois)}$ kWh dans le mois ; $${tex(cout)}$ €.`);
    const t = calculsDuTableau(10);
    v.ok("10. tableau : 1 500 W = 1,5 kW", (t[1] ?? [])[1] === `1 500 W = ${tex(kW).replace("{,}", ",")} kW`);
  }

  // 11. Le terrain de basket.
  {
    const aire = fois(Q(28), Q(15));
    const cm2 = convertir(aire, "m²", "cm²");
    const litres = div(aire, Q(12));
    const pots = div(litres, D("2,5"));
    dit(11, `$28 \\times 15 = ${tex(aire)}$ m²`);
    dit(11, `$420 \\times 10\\,000 = ${tex(cm2)}$ cm²`);
    dit(11, `$420 \\div 12 = ${tex(litres)}$ L`);
    dit(11, `$35 \\div 2{,}5 = ${tex(pots)}$ pots`);
    dit(11, `écrire $${tex(fois(aire, Q(100)))}$ cm²`);
    dit(11, `Réponse : $${tex(aire)}$ m² ; $${tex(cm2)}$ cm² ; $${tex(litres)}$ L ; $${tex(pots)}$ pots.`);
    const m = b(11).match(/terrain\((\d+), (\d+), "([^"]*)", "([^"]*)", "([^"]*)"\)/);
    const [lo, la] = m ? [Number(m[1]), Number(m[2])] : [0, 0];
    v.ok("11. le terrain dessiné : 28 × 15 carrés de 1 m², et la légende les compte", lo === 28 && la === 15 && m[3] === "28 m" && m[4] === "15 m" && egal(nb(m[5]) ?? Q(0), Q(lo * la)));
    v.ok("11. le terrain et sa légende tiennent dans le cadre", 30 + lo * 7 <= L - 2 && !!m && 30 + (lo * 7) / 2 + largeur(m[5]) / 2 <= L - 2 && 30 + (lo * 7) / 2 - largeur(m[5]) / 2 >= 2);
    conversionVerifiee(11, [[tex(aire), "m²", "cm²"]]);
  }

  // 12. Densités.
  {
    const france = div(Q(66000000), Q(550000));
    const paris = div(Q(2100000), Q(105));
    const rapport = versNombre(div(paris, france));
    dit(12, `$66\\,000\\,000 \\div 550\\,000 = ${tex(france)}$ hab/km²`);
    dit(12, `$2\\,100\\,000 \\div 105 = ${tex(paris)}$ hab/km²`);
    dit(12, `$20\\,000 \\div 120 \\approx ${fr(rapport, 0)}$`);
    const inverse = 550000 / 66000000;
    dit(12, `$\\approx ${fr(inverse, 4)}$, est en km²/hab`);
    dit(12, `environ $${fr(Math.round((inverse * 1e6) / 100) * 100, 0)}$ m²`);
    dit(12, `Réponse : $${tex(france)}$ hab/km² ; $${tex(paris)}$ hab/km² ; environ $${fr(rapport, 0)}$ fois ; des km² par habitant.`);
    const m = b(12).match(/points\((\d+), (\d+), "([^"]*)"\)/);
    v.ok("12. le km² dessiné porte autant de points que d'habitants par km²", !!m && egal(Q(Number(m[1]) * Number(m[2])), france) && egal(nb(m[3].split(":")[1] ?? "") ?? Q(0), france) && largeur(m[3]) <= L - 4);
  }

  // 13. L'allure et la vitesse.
  {
    const allure = div(Q(50), Q(10));
    const h = div(Q(50), Q(60));
    const vit = div(Q(10), h);
    v.ok("13. 50/60 = 5/6", egal(h, Q(5, 6)));
    dit(13, "$50$ min $= \\dfrac{50}{60}$ h $= \\dfrac{5}{6}$ h");
    dit(13, `$v = 10 \\div \\dfrac{5}{6} = 10 \\times \\dfrac{6}{5} = ${tex(vit)}$ km/h`);
    dit(13, `$60 \\div 5 = ${tex(div(Q(60), allure))}$ km`);
    dit(13, `$5 \\times 60 = ${tex(fois(allure, Q(60)))}$ km en une heure`);
    dit(13, `Réponse : $${tex(allure)}$ min/km, soit $5$ minutes par kilomètre ; $${tex(vit)}$ km/h ; « $5$ km/min » ferait $${tex(fois(allure, Q(60)))}$ km/h.`);
    trajet(
      13,
      (_, m) => (!egal(nb(m.bas) ?? Q(-1), m.pos) ? `« ${m.bas} » dessous` : !egal(nb(m.haut) ?? Q(-1), fois(m.pos, allure)) ? `« ${m.haut} » min ≠ ${tex(allure)} min/km × position` : true),
      (_, p) => egal(p, Q(10)),
    );
  }

  // 14. La glace.
  {
    const V = Q(27);
    const masse = fois(V, D("0,92"));
    const glace = 1000 / 0.92;
    dit(14, `$V = 3 \\times 3 \\times 3 = ${tex(V)}$ cm³`);
    dit(14, `$27 \\times 0{,}92 = ${tex(masse)}$ g`);
    dit(14, `le glaçon donne $${tex(masse)}$ cm³ d'eau`);
    dit(14, `$1\\,000 \\div 0{,}92 \\approx ${fr(glace, 0)}$ cm³`);
    dit(14, `La glace prend $${Math.round(glace) - 1000}$ cm³ de plus`);
    dit(14, `$1\\,000 \\times 0{,}92 = ${tex(fois(Q(1000), D("0,92")))}$ cm³`);
    dit(14, `Réponse : $27$ cm³ et $${tex(masse)}$ g ; $${tex(masse)}$ cm³ d'eau ; environ $${fr(glace, 0)}$ cm³ de glace.`);
    const m = b(14).match(/barres\((\d+), \[([\s\S]*?)\]\)/);
    const items = m ? [...m[2].matchAll(/\{ label: "([^"]*)", valeur: ([\d.]+), texte: "([^"]*)"/g)].map((x) => ({ label: x[1], valeur: Number(x[2]), texte: x[3] })) : [];
    const max = m ? Number(m[1]) : 1;
    const eau = items.find((x) => x.label === "eau");
    const gl = items.find((x) => x.label === "glace");
    v.ok("14. barres : l'eau à 1 000 cm³, la glace à 1 000 ÷ 0,92 arrondi", !!eau && !!gl && eau.valeur === 1000 && gl.valeur === Math.round(glace) && egal(nb(eau.texte), Q(1000)) && egal(nb(gl.texte), Q(Math.round(glace))) && gl.texte.startsWith("≈"));
    v.ok("14. barres : chaque texte tient dans sa barre, chaque nom à gauche", items.length === 2 && items.every((x) => largeur(x.texte) + 10 <= (x.valeur * 180) / max && largeur(x.label) <= 46) && Math.max(...items.map((x) => x.valeur)) <= max);
  }

  // 15. La douche.
  {
    const [cl, eco] = [fois(Q(12), Q(7)), fois(Q(6), Q(7))];
    const par = moins(cl, eco);
    const an = fois(par, Q(365));
    dit(15, `$12 \\times 7 = ${tex(cl)}$ L`);
    dit(15, `$6 \\times 7 = ${tex(eco)}$ L`);
    dit(15, `$84 - 42 = ${tex(par)}$ L`);
    dit(15, `$42 \\times 365 = ${tex(an)}$ L`);
    dit(15, `L $= 15\\,330 \\div 1\\,000 = ${tex(div(an, Q(1000)))}$ m³`);
    dit(15, `Réponse : $${tex(cl)}$ L et $${tex(eco)}$ L par douche ; $${tex(an)}$ L, soit $${tex(div(an, Q(1000)))}$ m³ par an.`);
    produitVerifie(15, "L");
  }

  // 16. Lou et Enzo.
  {
    const h = div(Q(45), Q(60));
    const lou = div(Q(18), h);
    const enzo = div(fois(Q(7), Q(3600)), Q(1000));
    dit(16, `$45$ min $= \\dfrac{45}{60}$ h $= ${tex(h)}$ h`);
    dit(16, `$v = 18 \\div 0{,}75 = ${tex(lou)}$ km/h`);
    dit(16, `$7 \\times 3\\,600 = ${tex(fois(Q(7), Q(3600)))}$ m, soit $${tex(enzo)}$ km`);
    v.ok("16. Enzo va plus vite", inf(lou, enzo) && c(16).includes("Enzo va un peu plus vite"));
    dit(16, `Réponse : $${tex(lou)}$ km/h ; $${tex(enzo)}$ km/h ; Enzo va plus vite, $${tex(enzo)}$ km contre $${tex(lou)}$ km en une heure.`);
    const vitesses = [lou, enzo];
    trajet(
      16,
      (i, m) => {
        const t = heures(m.haut);
        if (!t) return `durée illisible « ${m.haut} »`;
        if (!egal(fois(t, vitesses[i]), m.pos)) return `${m.haut} à ${tex(vitesses[i])} km/h ne mène pas à ${versNombre(m.pos)} km`;
        if (m.bas && !egal(nb(m.bas), m.pos)) return `« ${m.bas} » dessous`;
        return true;
      },
      (i, p) => egal(p, vitesses[i]),
    );
    v.ok("16. deux trajets à la même échelle", trajetsDe(b(16))?.lignes.length === 2);
  }

  v.titre("★★★ Problèmes");
  // 17. La barge rousse.
  {
    const d = Q(13560);
    const parJour = versNombre(div(d, Q(11)));
    const h = fois(Q(11), Q(24));
    const kmh = versNombre(div(d, h));
    const s = fois(h, Q(3600));
    const ms = versNombre(div(fois(d, Q(1000)), s));
    dit(17, `$13\\,560 \\div 11 \\approx ${fr(parJour, 0)}$ km par jour`);
    dit(17, `$11 \\times 24 = ${tex(h)}$ h`);
    dit(17, `$v = 13\\,560 \\div 264 \\approx ${fr(kmh, 1)}$ km/h`);
    dit(17, `$${fr(kmh, 2)} \\div 3{,}6 \\approx ${fr(Math.round(kmh * 100) / 100 / 3.6, 1)}$ m/s`);
    v.ok("17. les deux chemins vers les m/s donnent le même dixième", fr(Math.round(kmh * 100) / 100 / 3.6, 1) === fr(ms, 1));
    dit(17, `$264 \\times 3\\,600 = ${tex(s)}$ s, et $13\\,560\\,000 \\div 950\\,400 \\approx ${fr(ms, 1)}$`);
    v.ok("17. 1 233 km/h dépasserait un avion de ligne (900 km/h)", parJour > 900);
    dit(17, `Réponse : environ $${fr(parJour, 0)}$ km par jour ; environ $${fr(kmh, 1)}$ km/h ; environ $${fr(ms, 1)}$ m/s ; des km par jour pris pour des km/h.`);
    v.ok(`17. l'énoncé cite le titre fautif « ${fr(parJour, 0)} km/h »`, (enonces[16] ?? "").includes(`$${fr(parJour, 0)}$ km/h`));
    trajet(
      17,
      (_, m) => (!egal(nb(m.bas) ?? Q(-1), m.pos) ? `« ${m.bas} » dessous` : !egal(fois(nb(m.haut) ?? Q(-1), div(d, Q(11))), m.pos) ? `« ${m.haut} » jours ne mènent pas à ${versNombre(m.pos)} km` : true),
      (_, p) => egal(p, d),
    );
  }

  // 18. Le Rhône.
  {
    const jour = fois(Q(1700), Q(86400));
    v.ok("18. une journée compte 86 400 s", egal(fois(fois(Q(24), Q(60)), Q(60)), Q(86400)));
    const litres = fois(Q(66000000), Q(150));
    const m3 = div(litres, Q(1000));
    const sec = versNombre(div(m3, Q(1700)));
    const min = Math.round(sec / 60);
    dit(18, `$1\\,700 \\times 86\\,400 = ${tex(jour)}$ m³`);
    dit(18, `$66\\,000\\,000 \\times 150 = ${tex(litres)}$ L`);
    dit(18, `$9\\,900\\,000\\,000 \\div 1\\,000 = ${tex(m3)}$ m³`);
    dit(18, `$9\\,900\\,000 \\div 1\\,700 \\approx ${fr(sec, 0)}$ s`);
    dit(18, `$${fr(sec, 0)} \\div 60 \\approx ${min}$ min, soit $${Math.floor(min / 60)}$ h $${min % 60}$ min`);
    v.ok("18. moins de 7 % du débit du jour", inf(div(m3, jour), Q(7, 100)) && c(18).includes("moins de $7$ %"));
    dit(18, `Réponse : $${tex(jour)}$ m³ ; $${tex(litres)}$ L, soit $${tex(m3)}$ m³ ; environ $${Math.floor(min / 60)}$ h $${min % 60}$ min.`);
    trajet(
      18,
      (_, m) => {
        if (m.haut && !egal(fois(nb(m.haut) ?? Q(-1), Q(60)), m.pos)) return `« ${m.haut} » n'est pas à ${versNombre(m.pos)} min`;
        if (m.bas) {
          const hm = m.bas.match(/^(\d+) h (\d+)$/);
          if (!hm || !egal(Q(Number(hm[1]) * 60 + Number(hm[2])), m.pos) || Number(m.pos.n) !== min) return `« ${m.bas} » ne dit pas ${min} min`;
        }
        return true;
      },
      (_, p) => Math.abs(versNombre(p) - sec / 60) < 0.5,
    );
    v.ok("18. le trajet couvre 24 h, en minutes", trajetsDe(b(18))?.maxN === 1440);
  }

  // 19. Le corps humain.
  {
    const wh = fois(Q(100), Q(24));
    const kwh = div(wh, Q(1000));
    const four = div(kwh, D("2,4"));
    const cout = fois(kwh, D("0,20"));
    dit(19, `$100 \\times 24 = ${tex(wh)}$ Wh`);
    dit(19, `$2\\,400$ Wh $= ${tex(kwh)}$ kWh`);
    dit(19, `$2{,}4 \\div 2{,}4 = ${tex(four)}$ h`);
    dit(19, `$2{,}4 \\times 0{,}20 = ${prix(cout)}$ €`);
    dit(19, `$2\\,400 \\times 0{,}20 = ${tex(fois(Q(2400), D("0,20")))}$ € par jour`);
    dit(19, `$100$ W, c'est $${tex(div(Q(100), Q(1000)))}$ kW`);
    dit(19, `Réponse : $${tex(wh)}$ Wh, soit $${tex(kwh)}$ kWh ; $${tex(four)}$ h ; $${prix(cout)}$ € ; il confond Wh et kWh.`);
    const p = produitVerifie(19, "kWh");
    v.ok("19. deux rectangles de même aire, 24 h × 0,1 kW et 1 h × 2,4 kW", !!p && p.rects.length === 2 && egal(fois(p.rects[0].l, p.rects[0].h), fois(p.rects[1].l, p.rects[1].h)) && egal(p.rects[0].l, Q(24)) && egal(p.rects[1].h, D("2,4")));
  }

  // 20. Le record de l'heure.
  {
    const m = Q(56792);
    const ms = versNombre(div(m, Q(3600)));
    const tours = div(m, Q(250));
    const parTour = versNombre(div(Q(3600), tours));
    dit(20, `$56\\,792 \\div 3\\,600 \\approx ${fr(ms, 1)}$ m/s`);
    dit(20, `$56\\,792 \\div 250 = ${tex(tours)}$ : $${Math.floor(versNombre(tours))}$ tours complets`);
    dit(20, `$3\\,600 \\div 227{,}168 \\approx ${fr(parTour, 1)}$ s par tour`);
    dit(20, `$250 \\div 15{,}78 \\approx ${fr(250 / 15.78, 1)}$ s`);
    v.ok("20. 15,78 est bien la vitesse au centième", fr(ms, 2) === "15{,}78");
    dit(20, `$56{,}792 \\times 3{,}6 \\approx ${fr(56.792 * 3.6, 0)}$`);
    dit(20, `$56{,}792 \\div 3\\,600 \\approx ${fr(56.792 / 3600, 3)}$`);
    dit(20, `Réponse : $56{,}792$ km/h ; environ $${fr(ms, 1)}$ m/s ; $${Math.floor(versNombre(tours))}$ tours ; environ $${fr(parTour, 1)}$ s par tour ; $${fr(56.792 * 3.6, 0)}$ km/h, c'est absurde.`);
    const kmParMin = div(D("56,792"), Q(60));
    trajet(
      20,
      (_, mq) => {
        if (!egal(nb(mq.haut) ?? Q(-1), mq.pos)) return `« ${mq.haut} » n'est pas à ${versNombre(mq.pos)} min`;
        if (mq.bas && !egal(nb(mq.bas), fois(mq.pos, kmParMin))) return `« ${mq.bas} » km ≠ ${versNombre(mq.pos)} min × 56,792 ÷ 60`;
        return true;
      },
      (_, p) => egal(p, Q(60)),
    );
  }
}

lancer({
  nom: "GRANDEURS COMPOSÉES ET UNITÉS · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-grandeurs-composees.tsx",
  notionId: "grandeur_composee",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : 40 min lues 0,40 h", "Réponse : la plaque consomme $1$ kWh.", "Réponse : la plaque consomme $0{,}6$ kWh."],
    ["ex. 1 schéma : le rectangle dessiné à 45 min", "{ l: 40, h: 1.5, texte: \"1 kWh\", ou: \"dedans\" }", "{ l: 45, h: 1.5, texte: \"1 kWh\", ou: \"dedans\" }"],
    ["ex. 2 : le quotient à l'envers", "Réponse : sa vitesse moyenne est $60$ m/min.", "Réponse : sa vitesse moyenne est $0{,}017$ m/min."],
    ["ex. 2 schéma : une graduation mal placée", "[900, \"15\", \"900\"]", "[900, \"16\", \"900\"]"],
    ["ex. 2 schéma : deux étiquettes qui se chevauchent", "[1200, \"20\", \"\"]", "[1200, \"20\", \"1 200\"]"],
    ["ex. 3 : W × h donne « W/h »", "[\"W × h\", \"Wh\", \"produit\"]", "[\"W × h\", \"W/h\", \"produit\"]"],
    ["ex. 4 schéma : 500 g sans conversion", "[\"Prix (€)\", \"2,40\", \"7,20\", \"1,20\", \"6\"]", "[\"Prix (€)\", \"2,40\", \"7,20\", \"1 200\", \"6\"]"],
    ["ex. 5 schéma : un rang oublié, 45 mm lus 0,45 m", "{ cases: [\"\", \"\", \"\", \"0\", \"0\", \"4\", \"5\"], de: \"mm\", vers: \"m\" }", "{ cases: [\"\", \"\", \"\", \"0\", \"4\", \"5\", \"\"], de: \"mm\", vers: \"m\" }"],
    ["ex. 6 schéma : une seule colonne par unité d'aire", "{ cases: [\"\", \"\", \" 6\", \"00\"], de: \"cm²\", vers: \"mm²\" }", "{ cases: [\"\", \"\", \"\", \"60\"], de: \"cm²\", vers: \"mm²\" }"],
    ["ex. 6 : 6 cm² = 60 mm²", "Réponse : $1$ cm² $= 100$ mm² ; $600$ mm²", "Réponse : $1$ cm² $= 100$ mm² ; $60$ mm²"],
    ["ex. 7 schéma : le marcheur à 50 km/h déclaré plausible", "[\"d) 50 km/h\", \"✓\", \"✗\"]", "[\"d) 50 km/h\", \"✓\", \"✓\"]"],
    ["ex. 8 : la masse volumique à l'envers", "Réponse : $8$ cm³ ; $2{,}7$ g/cm³", "Réponse : $8$ cm³ ; $0{,}37$ g/cm³"],
    ["ex. 8 schéma : un cube de 3 cm dessiné", "cube(2, \"2 cm\"", "cube(3, \"2 cm\""],
    ["ex. 9 schéma : un calcul faux dans le tableau", "\"1 740 × 60 = 104 400 m\"", "\"1 740 × 60 = 104 000 m\""],
    ["ex. 10 : des W pris pour des kW", "Réponse : $9$ kWh par jour", "Réponse : $9\\\\,000$ kWh par jour"],
    ["ex. 11 schéma : le terrain dessiné trop court", "terrain(28, 15,", "terrain(26, 15,"],
    ["ex. 11 schéma : le m² sur une seule colonne", "[{ cases: [\" 4\", \"20\", \"00\", \"00\"], de: \"m²\", vers: \"cm²\" }]", "[{ cases: [\"\", \" 4\", \"20\", \"00\"], de: \"m²\", vers: \"cm²\" }]"],
    ["ex. 12 schéma : 100 points dans le km²", "points(12, 10,", "points(10, 10,"],
    ["ex. 12 : la densité à l'envers", "Réponse : $120$ hab/km²", "Réponse : $0{,}0083$ hab/km²"],
    ["ex. 13 : l'allure lue comme une vitesse", "Réponse : $5$ min/km", "Réponse : $5$ km/min"],
    ["ex. 13 schéma : 6 min par km", "[4, \"20\", \"4\"]", "[4, \"24\", \"4\"]"],
    ["ex. 14 schéma : multiplier au lieu de diviser", "{ label: \"glace\", valeur: 1087", "{ label: \"glace\", valeur: 920"],
    ["ex. 15 schéma : le rectangle économe trop haut", "{ l: 7, h: 6, texte", "{ l: 7, h: 8, texte"],
    ["ex. 16 schéma : Enzo à 7 km/h", "plein: 25.2", "plein: 7"],
    ["ex. 17 : des km par jour pris pour des km/h", "; environ $51{,}4$ km/h ;", "; environ $1\\\\,233$ km/h ;"],
    ["ex. 17 schéma : la mi-parcours au mauvais jour", "[6780, \"5,5\", \"6 780\"]", "[6780, \"6\", \"6 780\"]"],
    ["ex. 18 : des litres divisés par des m³/s", "environ $1$ h $37$ min.", "environ $1$ h $47$ min."],
    ["ex. 18 schéma : le trait bleu trop long", "plein: 97,", "plein: 197,"],
    ["ex. 19 schéma : 24 h × 1 kW", "{ l: 24, h: 0.1, texte", "{ l: 24, h: 1, texte"],
    ["ex. 19 : Wh et kWh confondus dans le coût", "; $1$ h ; $0{,}48$ € ;", "; $1$ h ; $480$ € ;"],
    ["ex. 20 : 227,168 arrondi à 228 tours", "$227$ tours complets", "$228$ tours complets"],
    ["ex. 20 schéma : une distance arrondie sur le trajet", "[30, \"30\", \"28,396\"]", "[30, \"30\", \"28,4\"]"],
    ["un texte de SVG trop petit", "const POLICE = 12;", "const POLICE = 10;"],
    ["un dollar dans une consigne", "Une règle par exercice.", "Une règle par $x$ exercice."],
    ["une micro d'une autre notion", "micros: [\"grandeur_coherence\"],", "micros: [\"aire_rectangle\"],"],
  ],
});
