// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les probabilités » de
// 4e (lib/fiches-exercices/maths-4e-probabilites.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE une probabilité ; ici on la RETROUVE en
// ÉNUMÉRANT les cas, un à un : chaque jeton ou bonbon de l'urne DESSINÉE, les 32
// cartes construites couleur par couleur, les jours de la semaine lettre par
// lettre, les faces d'un dé, les secteurs d'une roue découpée en parts égales,
// les places de la Coupe du monde. Le résultat est ensuite LU dans la phrase du
// corrigé, à sa place. Les dessins sont relus dans le source : les cases d'un
// tableau sont recalculées, les cases surlignées sont EXACTEMENT celles de
// l'événement, les poids d'une roue sont ceux de l'énoncé, les points de
// l'échelle des probabilités sont les nombres de l'exercice.
//
// ⛔ Programme de 4e : une seule épreuve. Le script refuse tout `arbre(` et
// toute « fréquence » dans la feuille (`proba_frequence` a la sienne).
//
//   node scripts/verifier-exercices-probabilites-4e.mjs

import { Q, plus, moins, fois, div, egal, inf, tex, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const F = (n, d = 1) => Q(BigInt(n), BigInt(d));
const D = (s) => { const t = String(s).replace(",", "."); const neg = t.startsWith("-"); const [e, dec = ""] = t.replace("-", "").split("."); return F((neg ? -1 : 1) * Number(e + dec), 10 ** dec.length); };
const somme = (l) => l.reduce(plus, F(0));
/** P(événement) sur un univers de cas équiprobables, par comptage. */
const compte = (univers, pred) => F(univers.filter(pred).length, univers.length);
/** `\dfrac{n}{d}`, ou l'entier. */
const tf = (q) => (q.d === 1n ? `${q.n}` : `\\dfrac{${q.n}}{${q.d}}`);
/** « 0,75 » tel qu'écrit dans une case de canvas. */
const nu = (q) => tex(q).replace("{,}", ",");
/** « $1$, $2$, $4$ et $8$ ». */
const liste = (l) => l.map((x) => `$${x}$`).join(", ").replace(/, ([^,]*)$/, " et $1");
const memes = (a, b) => a.length === b.length && [...a].sort().join("|") === [...b].sort().join("|");
const cle = (i, j) => `${i},${j}`;

/** Tous les arguments-tableaux des appels `nom([...])` du bloc, en JSON. */
function arguments_(bloc, nom) {
  const out = [];
  let i = bloc.indexOf(`${nom}(`);
  while (i >= 0) {
    const j = i + nom.length + 1;
    let prof = 0, k = j;
    for (; k < bloc.length; k++) {
      if (bloc[k] === "[") prof++;
      if (bloc[k] === "]") { prof--; if (prof === 0) break; }
    }
    const brut = bloc.slice(j, k + 1).replace(/(\w+):/g, '"$1":').replace(/,(\s*[\]}])/g, "$1");
    out.push(JSON.parse(brut.replace(/couleur": (\w+)/g, 'couleur": "$1"')));
    i = bloc.indexOf(`${nom}(`, k);
  }
  return out;
}
const argument = (bloc, nom) => arguments_(bloc, nom)[0] ?? null;
/** Les arguments de `tableauProba(entetes, lignes, surligne)`. */
function tableauDe(bloc) {
  const i = bloc.indexOf("tableauProba(");
  if (i < 0) throw new Error("pas de tableauProba");
  const s = bloc.slice(i + "tableauProba(".length);
  let prof = 0, k = 0;
  for (; k < s.length; k++) { if (s[k] === "(") prof++; if (s[k] === ")") { if (prof === 0) break; prof--; } }
  return JSON.parse(`[${s.slice(0, k)}]`.replace(/,(\s*[\]}])/g, "$1"));
}
/** Les bornes d'une `echelle([...], min, max)`. */
function bornesEchelle(bloc) {
  const m = /echelle\(\[[\s\S]*?\](?:, (-?[\d.]+), (-?[\d.]+))?\)/.exec(bloc);
  return m ? [m[1] === undefined ? 0 : Number(m[1]), m[2] === undefined ? 1 : Number(m[2])] : null;
}
/** Une roue relue, découpée en parts ÉGALES (pgcd des poids) : l'univers équiprobable. */
function partsDeRoue(segments) {
  const pgcd = (a, b) => (b ? pgcd(b, a % b) : a);
  const g = segments.reduce((x, s) => pgcd(x, s.poids), 0);
  return segments.flatMap((s) => Array(s.poids / g).fill(s.label.split(" ")[0]));
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const blocs = f.blocs;
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit « ${texte} »`, c(k).includes(texte), "absent du corrigé");
  const dit = (k, texte) => v.ok(`${k}. l'énoncé dit « ${texte} »`, e(k).includes(texte), "absent de l'énoncé");
  /** Les cases surlignées d'un tableau sont-elles EXACTEMENT celles attendues ? */
  const surlignees = (k, surl, attendues, quoi) =>
    v.ok(`${k}. ${quoi} (${attendues.length} cases)`, memes(surl.map(([i, j]) => cle(i, j)), attendues), JSON.stringify(surl));
  /** « \dfrac{n}{d} = \dfrac{a}{b} = 0{,}4 », la fraction simplifiée seulement si elle change. */
  const chaine = (n, d) => { const q = F(n, d); const s = `\\dfrac{${n}}{${d}}`; return (q.n === BigInt(n) ? s : `${s} = ${tf(q)}`) + ` = ${tex(q)}`; };

  /* ── Ce qui vaut pour toute la feuille ─────────────────────────────────── */
  v.titre("Les dessins et le programme de 4e");
  const dessines = blocs.filter((bl) => /\n\s+schema:/.test(bl)).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20, "Frédéric : des schémas dans la grande majorité des corrigés");
  const figures = blocs.filter((bl) => /\n\s+figure:/.test(bl)).length;
  v.ok(`${figures} énoncé avec sa figure (la roue de l'exercice 11)`, figures === 1);
  const sansReponse = f.corrections.findIndex((t) => !t.split("\\n").at(-1).startsWith("Réponse : "));
  v.ok("chaque corrigé finit par sa ligne « Réponse : »", sansReponse === -1, `corrigé ${sansReponse + 1}`);
  const sansPiege = f.corrections.findIndex((t) => !t.includes("⛔ Le piège"));
  v.ok("chaque corrigé nomme son piège", sansPiege === -1, `corrigé ${sansPiege + 1}`);
  v.ok("aucun arbre : une seule épreuve en 4e", !/\barbre\(/.test(f.series) && !/deux épreuves|deux tirages|arbre/i.test(f.textes.join(" ")));
  v.ok("aucune fréquence observée (feuille de proba_frequence)", !/fréquence/i.test(f.textes.join(" ")));
  v.ok("aucun $ ni \\ dans un dessin (roue, billes, échelle, tableau)", !/(roue|billes|echelle|tableauProba|diagramme)\([^\n]*[$\\]/.test(f.series));
  // ⛔ Lisible à 375 px : la roue et l'échelle sont LOCALES, avec leur largeur minimale.
  v.ok("la roue est la roue locale, pas celle de figures.tsx", !/import \{[^}]*\broue\b[^}]*\} from "@\/lib\/fiches-exercices\/figures"/.test(source) && /const roue = [\s\S]*?min-w-\[17\.5rem\][\s\S]*?overflow-x-auto|const roue = [\s\S]*?overflow-x-auto[\s\S]*?min-w-\[17\.5rem\]/.test(source));
  const rem = (r) => r * 16;
  v.ok(`roue : 14 × ${rem(17.5) - 26} ÷ 320 = ${((14 * (rem(17.5) - 26)) / 320).toFixed(1)} px ≥ 11`, (14 * (rem(17.5) - 26)) / 320 >= 11);
  const mEch = /const echelle = [\s\S]*?min-w-\[([\d.]+)rem\][\s\S]*?viewBox="0 0 (\d+) \d+"[\s\S]*?fontSize="(\d+)"/.exec(source);
  const pxEch = mEch ? (Number(mEch[3]) * rem(Number(mEch[1]))) / Number(mEch[2]) : 0;
  v.ok(`échelle : ${pxEch.toFixed(1)} px effectifs ≥ 11`, pxEch >= 11);

  v.titre("★ Un seul geste");
  // 1 — le dé à 12 faces
  const faces1 = Array.from({ length: 12 }, (_, i) => i + 1);
  dit(1, "numérotées de $1$ à $12$");
  const m5 = faces1.filter((x) => x % 5 === 0);
  ecrit(1, `sont les nombres de $1$ à $12$ : $${faces1.length}$ issues`);
  ecrit(1, `sur le dé : ${liste(m5)}. $A$ est réalisé par $${m5.length}$ issues`);
  v.ok("1. « obtenir 7 » : une seule issue", faces1.filter((x) => x === 7).length === 1);
  v.ok("1. « obtenir 13 » : aucune issue", !faces1.includes(13));
  ecrit(1, "il est IMPOSSIBLE et sa probabilité vaut $0$");
  const [, l1, s1] = tableauDe(blocs[0]);
  v.ok("1. le tableau montre les faces 1 à 12, chacune une fois", l1.flatMap((l) => l.slice(1)).map(Number).join() === faces1.join());
  surlignees(1, s1, l1.flatMap((l, i) => l.slice(1).map((x, j) => [i, j + 1, Number(x)])).filter(([, , x]) => x % 5 === 0).map(([i, j]) => cle(i, j)), "les cases surlignées sont les multiples de 5");

  // 2 — PARAPLUIE : on compte les JETONS
  const b2 = argument(blocs[1], "billes");
  const lettres = b2.map((x) => x.label);
  v.ok("2. l'urne dessinée porte les lettres de PARAPLUIE, dans l'ordre", lettres.join("") === "PARAPLUIE" && e(2).includes("PARAPLUIE") && e(2).includes(`les $${lettres.length}$ jetons`));
  const voy = (x) => "AEIOUY".includes(x);
  v.ok("2. voyelles en orange, consonnes en gris", b2.every((x) => x.couleur === (voy(x.label) ? "O" : "G")));
  const distinctes = [...new Set(lettres)];
  ecrit(2, `: $${lettres.length}$ cas`);
  ecrit(2, `${distinctes.join(", ").replace(/, ([^,]*)$/, " et $1")} : $${distinctes.length}$ lettres différentes`);
  ecrit(2, `portent un A : $P(\\text{A}) = ${tf(compte(lettres, (x) => x === "A"))}$`);
  ecrit(2, `$P(\\text{R}) = ${tf(compte(lettres, (x) => x === "R"))}$`);
  ecrit(2, `$${lettres.filter(voy).length}$ jetons. $P(\\text{voyelle}) = ${tf(compte(lettres, voy))}$`);
  v.ok("2. le piège : diviser par 7 donne autre chose", !egal(F(2, distinctes.length), compte(lettres, (x) => x === "A")));

  // 3 — les jours de la semaine, lettre par lettre
  const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
  const A3 = jours.filter((j) => j.startsWith("m"));
  const nonA3 = jours.filter((j) => !j.startsWith("m"));
  ecrit(3, `Les issues sont les $${jours.length}$ jours`);
  v.ok("3. A n'est ni certain ni impossible", A3.length > 0 && A3.length < 7);
  ecrit(3, `$A$ : ${A3.join(" et ")} le réalisent`);
  v.ok("3. tous les noms contiennent un i : B est certain", jours.every((j) => j.includes("i")));
  ecrit(3, "$B$ est CERTAIN");
  const long = Math.max(...jours.map((j) => j.length));
  v.ok(`3. le plus long nom a ${long} lettres : C est impossible`, long === 8 && jours.filter((j) => j.length === long).join() === "mercredi,vendredi,dimanche");
  ecrit(3, `ont $${long}$ lettres, pas plus. Aucun jour ne réalise $C$ : il est IMPOSSIBLE`);
  ecrit(3, `réalisé par les $${nonA3.length}$ autres jours : ${nonA3.join(", ").replace(/, ([^,]*)$/, " et $1")}`);
  const [, l3, s3] = tableauDe(blocs[2]);
  v.ok("3. chaque ligne du tableau : le jour, ses lettres, son initiale", l3.length === 7 && l3.every((l, i) => l[0] === jours[i] && l[1] === String(jours[i].length) && l[2] === (jours[i].startsWith("m") ? "oui" : "non")));
  surlignees(3, s3, jours.map((j, i) => [i, j]).filter(([, j]) => j.startsWith("m")).map(([i]) => cle(i, 2)), "les cases surlignées sont les jours en M");

  // 4 — la roue moitié / quart / quart
  const r4 = argument(blocs[3], "roue");
  const tot4 = r4.reduce((s, x) => s + x.poids, 0);
  v.ok("4. la roue : jaune la moitié, violet et vert un quart chacun", r4[0].label === "jaune" && r4[0].poids * 2 === tot4 && r4[1].poids * 4 === tot4 && r4[2].poids * 4 === tot4);
  const u4 = partsDeRoue(r4);
  for (const col of ["jaune", "violet", "vert"]) ecrit(4, `$P(\\text{${col}}) = ${tf(compte(u4, (x) => x === col))}$`);
  v.ok("4. les trois font 1", egal(somme(["jaune", "violet", "vert"].map((col) => compte(u4, (x) => x === col))), F(1)));
  ecrit(4, `chaque carte a la même chance, $${tf(F(1, 32))}$`);

  // 5 — le jeu de 32 cartes, construit carte par carte
  const vals = ["7", "8", "9", "10", "valet", "dame", "roi", "as"];
  const courts = ["7", "8", "9", "10", "V", "D", "R", "A"];
  const coul = ["cœur", "carreau", "trèfle", "pique"], sym = ["♥", "♦", "♣", "♠"];
  const jeu = vals.flatMap((val) => coul.map((co) => ({ val, co })));
  v.ok("5. 32 cartes", jeu.length === 32 && e(5).includes("jeu de $32$ cartes"));
  const fig = (x) => ["valet", "dame", "roi"].includes(x.val);
  ecrit(5, `donc $${jeu.filter((x) => x.val === "roi").length}$ rois : $P(\\text{roi}) = \\dfrac{4}{32} = ${tf(compte(jeu, (x) => x.val === "roi"))}$`);
  ecrit(5, `$P(\\text{cœur}) = \\dfrac{8}{32} = ${tf(compte(jeu, (x) => x.co === "cœur"))}$`);
  ecrit(5, `$3 \\times 4 = ${jeu.filter(fig).length}$ cartes. $P(\\text{figure}) = \\dfrac{12}{32} = ${tf(compte(jeu, fig))}$`);
  const avecAs = jeu.filter((x) => fig(x) || x.val === "as").length;
  ecrit(5, `et trouver $\\dfrac{${avecAs}}{32}$`);
  const [ent5, l5, s5] = tableauDe(blocs[4]);
  v.ok("5. le tableau : 4 couleurs, 8 valeurs, chaque case est sa carte", ent5.slice(1).join() === coul.join() && l5.length === 8 && l5.every((l, i) => l[0] === vals[i] && l.slice(1).every((x, j) => x === `${courts[i]}${sym[j]}`)));
  surlignees(5, s5, vals.flatMap((val, i) => (["valet", "dame", "roi"].includes(val) ? [1, 2, 3, 4].map((j) => cle(i, j)) : [])), "les cases surlignées sont les 12 figures");

  // 6 — trois écritures
  const [, l6] = tableauDe(blocs[5]);
  const fr6 = l6.map(([fr]) => fr.split("/").map(Number));
  v.ok("6. chaque ligne du tableau : fraction, décimal, pourcentage du même nombre", l6.every(([fr, d, p]) => { const [n, dd] = fr.split("/").map(Number); const q = F(n, dd); return d === nu(q) && p === `${nu(fois(q, F(100)))} %`; }));
  fr6.slice(0, 4).forEach(([n, d]) => {
    dit(6, `$\\dfrac{${n}}{${d}}$`);
    const q = F(n, d);
    ecrit(6, `$${n} \\div ${d} = ${tex(q)}$, soit $${tex(fois(q, F(100)))}$ %`);
  });
  const [n65, d65] = fr6[4], [n66, d66] = fr6[5];
  v.ok("6. les deux dernières lignes sont celles du e)", egal(F(n65, d65), D("0,6")) && egal(F(n66, d66), F(5, 100)));
  ecrit(6, `$0{,}6 = \\dfrac{6}{10} = ${tf(D("0,6"))}$`);
  ecrit(6, `$5$ % s'écrit $\\dfrac{5}{100} = ${tf(F(5, 100))}$`);
  v.ok("6. le piège 2,5 dépasse 1", inf(F(1), D("2,5")));

  // 7 — deux sacs
  const [sA, sB] = arguments_(blocs[6], "billes");
  const nV = (s) => s.filter((x) => x.couleur === "V").length, nG = (s) => s.filter((x) => x.couleur === "G").length;
  dit(7, `Le sac A contient $${nV(sA)}$ billes vertes et $${nG(sA)}$ grises ; le sac B, $${nV(sB)}$ vertes et $${nG(sB)}$ grises`);
  const pA7 = compte(sA, (x) => x.couleur === "V"), pB7 = compte(sB, (x) => x.couleur === "V");
  ecrit(7, `$\\dfrac{3}{8} = ${tex(pA7)}$ et $\\dfrac{4}{10} = ${tex(pB7)}$`);
  v.ok("7. le sac B est meilleur, bien qu'il ait PLUS de grises", inf(pA7, pB7) && nG(sA) < nG(sB));
  ecrit(7, `$P_A = ${tex(pA7)}$ et $P_B = ${tex(pB7)}$ : je choisis le sac B`);

  // 8 — le feu tricolore
  const r8 = argument(blocs[7], "roue");
  const d8 = Object.fromEntries(r8.map((x) => [x.label, x.poids]));
  v.ok("8. la roue suit les durées de l'énoncé, 100 s en tout", r8.reduce((s, x) => s + x.poids, 0) === 100 && e(8).includes(`$${d8.vert}$ s au vert, $${d8.orange}$ s à l'orange et $${d8.rouge}$ s au rouge`));
  const u8 = partsDeRoue(r8);
  const p8 = (col) => compte(u8, (x) => x === col);
  for (const col of ["vert", "orange", "rouge"]) ecrit(8, `$P(\\text{${col}}) = \\dfrac{${d8[col]}}{100} = ${tex(p8(col))}$`);
  const pasVert = compte(u8, (x) => x !== "vert");
  ecrit(8, `$1 - ${tex(p8("vert"))} = ${tex(pasVert)}$`);
  ecrit(8, `$${tex(p8("orange"))} + ${tex(p8("rouge"))} = ${tex(pasVert)}$`);
  ecrit(8, `$${tex(fois(pasVert, F(100)))}$ % de ne pas avoir le vert`);

  v.titre("★★ Type devoir");
  // 9 — les bonbons
  const b9 = argument(blocs[8], "billes").map((x) => x.couleur);
  const gouts = { fraise: "R", citron: "J", menthe: "V" };
  const n9 = (g) => b9.filter((x) => x === gouts[g]).length;
  dit(9, `$${b9.length}$ bonbons de même forme : $${n9("fraise")}$ à la fraise, $${n9("citron")}$ au citron et $${n9("menthe")}$ à la menthe`);
  for (const g of Object.keys(gouts)) ecrit(9, `$P(\\text{${g}}) = ${chaine(n9(g), b9.length)}$, soit $${tex(F(n9(g) * 100, b9.length))}$ %`);
  const ordre9 = Object.keys(gouts).sort((a, b) => n9(b) - n9(a));
  ecrit(9, `la ${ordre9[0]}, puis le ${ordre9[1]}, puis la ${ordre9[2]}`);
  v.ok("9. les trois probabilités font 1", egal(somme(Object.keys(gouts).map((g) => F(n9(g), b9.length))), F(1)));

  // 10 — le dé à 8 faces
  const f10 = Array.from({ length: 8 }, (_, i) => i + 1);
  const A10 = f10.filter((x) => 8 % x === 0), B10 = f10.filter((x) => x % 3 === 0), nonA10 = f10.filter((x) => 8 % x !== 0);
  ecrit(10, `$8$ exactement : ${liste(A10)}. $P(A) = \\dfrac{${A10.length}}{8} = ${tf(F(A10.length, 8))}$`);
  ecrit(10, `sur le dé : ${liste(B10)}. $P(B) = \\dfrac{${B10.length}}{8} = ${tf(F(B10.length, 8))}$`);
  ecrit(10, `$P(C) = ${tf(compte(f10, (x) => x > 8))}$`);
  ecrit(10, `$P(D) = ${tf(compte(f10, (x) => x <= 8))}$`);
  ecrit(10, `réalisé par ${liste(nonA10)}. $P = 1 - ${tf(F(A10.length, 8))} = ${tf(F(nonA10.length, 8))}$`);
  const [, l10, s10] = tableauDe(blocs[9]);
  v.ok("10. chaque ligne du tableau : la face, divise 8 ?, multiple de 3 ?", l10.length === 8 && l10.every((l, i) => l[0] === String(i + 1) && l[1] === (A10.includes(i + 1) ? "oui" : "non") && l[2] === (B10.includes(i + 1) ? "oui" : "non")));
  surlignees(10, s10, A10.map((x) => cle(x - 1, 1)), "les cases surlignées sont les diviseurs de 8");

  // 11 — la roue à angles
  const r11 = argument(blocs[10], "roue");
  v.ok("11. la roue de l'énoncé : ses angles, 360° en tout", r11.reduce((s, x) => s + x.poids, 0) === 360 && e(11).includes(r11.map((x) => `${x.label} ($${x.poids}°$)`).join(", ").replace(/, ([^,]*)$/, " et $1")));
  const u11 = partsDeRoue(r11);
  const p11 = (col) => compte(u11, (x) => x === col);
  for (const x of r11) ecrit(11, `$P(\\text{${x.label}}) = \\dfrac{${x.poids}}{360} = ${tf(p11(x.label))}$`);
  const tri11 = [...r11].sort((a, b) => b.poids - a.poids);
  ecrit(11, `le ${tri11[0].label} est le plus probable, le ${tri11.at(-1).label} le moins probable`);
  ecrit(11, `$${r11.map((x) => tf(fois(p11(x.label), F(12))).replace(/^(\d+)$/, "\\dfrac{$1}{12}")).join(" + ")} = 1$`);
  const [, l11, s11] = tableauDe(blocs[10]);
  v.ok("11. le tableau : chaque angle et sa probabilité", l11.slice(0, 4).every((l, i) => l[0] === r11[i].label && l[1] === `${r11[i].poids}°` && l[2] === (({ n, d }) => `${n}/${d}`)(p11(r11[i].label))) && l11[4].join() === "total,360°,1");
  surlignees(11, s11, [cle(r11.indexOf(tri11[0]), 2)], "la case surlignée est la plus grande probabilité");

  // 12 — la tombola
  const [, l12, s12] = tableauDe(blocs[11]);
  const nb12 = Object.fromEntries(l12.map((l) => [l[0], Number(l[1])]));
  v.ok("12. le tableau : 1 + 15 + 184 = 200, comme l'énoncé", nb12["gros lot"] + nb12["petit lot"] + nb12.perdant === nb12.total && e(12).includes(`$${nb12.total}$ tickets`) && e(12).includes(`$${nb12["petit lot"]}$ tickets gagnent un petit lot`));
  v.ok("12. chaque ligne du tableau : nombre, probabilité, pourcentage", l12.every(([, n, p, pc]) => { const q = F(Number(n), nb12.total); return p === nu(q) && pc === `${nu(fois(q, F(100)))} %`; }));
  const t12 = Array.from({ length: nb12.total }, (_, i) => (i < nb12["gros lot"] ? "G" : i < nb12["gros lot"] + nb12["petit lot"] ? "p" : "-"));
  const gros = compte(t12, (x) => x === "G"), petit = compte(t12, (x) => x === "p"), gagne = compte(t12, (x) => x !== "-");
  ecrit(12, `$P(\\text{gros lot}) = \\dfrac{1}{200} = ${tex(gros)}$, soit $${tex(fois(gros, F(100)))}$ %`);
  ecrit(12, `$P(\\text{petit lot}) = \\dfrac{15}{200} = ${tex(petit)}$, soit $${tex(fois(petit, F(100)))}$ %`);
  ecrit(12, `$P = \\dfrac{16}{200} = ${tex(gagne)}$, soit $${tex(fois(gagne, F(100)))}$ %`);
  ecrit(12, `$1 - ${tex(gagne)} = ${tex(compte(t12, (x) => x === "-"))}$, soit $92$ %`);
  surlignees(12, s12, [cle(2, 3)], "la case surlignée est le pourcentage de « rien »");

  // 13 — quatre stands
  const stands = { A: F(1, 4), B: D("0,4"), C: F(35, 100), D: F(3, 5) };
  dit(13, "stand A, « une chance sur $4$ » ; stand B, $0{,}4$ ; stand C, $35$ % ; stand D, $\\dfrac{3}{5}$");
  const tri13 = Object.keys(stands).sort((a, b) => (inf(stands[a], stands[b]) ? -1 : 1));
  ecrit(13, `$${tri13.map((k) => tex(stands[k])).join(" < ")}$`);
  ecrit(13, `L'ordre est ${tri13.join(", ")} : le stand ${tri13.at(-1)} donne le plus de chances`);
  ecrit(13, `C : $\\dfrac{35}{100} = ${tex(stands.C)}$ ; D : $\\dfrac{3}{5} = ${tex(stands.D)}$`);
  v.ok("13. le piège : 35 > 0,4 mais 35 % < 0,4", 35 > 0.4 && inf(stands.C, stands.B));
  const pts13 = argument(blocs[12], "echelle");
  v.ok("13. l'échelle place A, B, C, D à leurs valeurs, de 0 à 1", pts13.length === 4 && pts13.every((p) => egal(D(String(p.valeur)), stands[p.label])) && JSON.stringify(bornesEchelle(blocs[12])) === "[0,1]");

  // 14 — la classe et le cross
  const [eff, filles, club, fillesClub] = [25, 14, 9, 5];
  dit(14, `classe de $${eff}$ élèves, $${filles}$ sont des filles. $${club}$ élèves font du sport en club, dont $${fillesClub}$ filles`);
  const garcons = eff - filles, garconsClub = club - fillesClub;
  const tab14 = [["Filles", fillesClub, filles - fillesClub, filles], ["Garçons", garconsClub, garcons - garconsClub, garcons], ["Total", club, eff - club, eff]];
  const [, l14, s14] = tableauDe(blocs[13]);
  v.ok("14. le tableau des effectifs, case par case", JSON.stringify(l14) === JSON.stringify(tab14.map((l) => l.map(String))));
  const eleves = tab14.slice(0, 2).flatMap(([s, cl, ncl]) => [...Array(cl).fill(`${s}|club`), ...Array(ncl).fill(`${s}|non`)]);
  v.ok("14. 25 élèves énumérés", eleves.length === eff);
  ecrit(14, `$P(\\text{fille}) = \\dfrac{${filles}}{${eff}} = ${tex(compte(eleves, (x) => x.startsWith("Filles")))}$`);
  ecrit(14, `$P(\\text{en club}) = \\dfrac{${club}}{${eff}} = ${tex(compte(eleves, (x) => x.endsWith("club")))}$`);
  const gc = compte(eleves, (x) => x === "Garçons|club");
  ecrit(14, `$${garconsClub}$ élèves. $P = \\dfrac{${garconsClub}}{${eff}} = ${tex(gc)}$, soit $${tex(fois(gc, F(100)))}$ %`);
  surlignees(14, s14, [cle(1, 1)], "la case surlignée est « garçon en club »");

  // 15 — les intrus
  dit(15, "$5$ jetons : $3$ jaunes et $2$ noirs");
  const cand = { "5/3": F(5, 3), "0,6": D("0,6"), "-0,4": D("-0,4"), "120 %": F(120, 100), "2/5": F(2, 5) };
  const horsBornes = Object.keys(cand).filter((k) => inf(cand[k], F(0)) || inf(F(1), cand[k]));
  v.ok(`15. les impossibles : ${horsBornes.join(", ")}`, horsBornes.join() === "5/3,-0,4,120 %");
  ecrit(15, "Réponse : $\\dfrac{5}{3}$, $-0{,}4$ et $120$ % sont impossibles");
  ecrit(15, `$P(\\text{jaune}) = \\dfrac{3}{5} = ${tex(F(3, 5))}$`);
  ecrit(15, `$P(\\text{noir}) = \\dfrac{2}{5} = ${tex(F(2, 5))}$`);
  v.ok("15. l'erreur 5/3 est le quotient renversé (total ÷ jaunes)", egal(cand["5/3"], div(F(5), F(3))));
  const pts15 = argument(blocs[14], "echelle");
  const val15 = { "−0,4": cand["-0,4"], "2/5": cand["2/5"], "0,6": cand["0,6"], "120 %": cand["120 %"], "5/3": cand["5/3"] };
  v.ok("15. l'échelle place les cinq nombres de Nina, à 0,001 près", pts15.length === 5 && pts15.every((p) => val15[p.label] && Math.abs(p.valeur - Number(val15[p.label].n) / Number(val15[p.label].d)) < 1e-3));
  const [mi15, ma15] = bornesEchelle(blocs[14]);
  v.ok("15. l'échelle montre tous les points, et 0 et 1", pts15.every((p) => p.valeur > mi15 && p.valeur < ma15) && mi15 < 0 && ma15 > 1);

  // 16 — la couleur qui manque
  const p16 = { rouge: D("0,35"), bleu: D("0,25"), vert: D("0,3") };
  dit(16, "$P(\\text{rouge}) = 0{,}35$, $P(\\text{bleu}) = 0{,}25$ et $P(\\text{vert}) = 0{,}3$");
  const jaune16 = moins(F(1), somme(Object.values(p16)));
  ecrit(16, `= 1 - ${tex(somme(Object.values(p16)))} = ${tex(jaune16)}$`);
  ecrit(16, `$1 - 0{,}35 = ${tex(moins(F(1), p16.rouge))}$, soit $${tex(fois(moins(F(1), p16.rouge), F(100)))}$ %`);
  ecrit(16, `$${tex(jaune16)} \\times 360 = ${tex(fois(jaune16, F(360)))}$`);
  const r16 = argument(blocs[15], "roue");
  const w16 = Object.fromEntries(r16.map((x) => [x.label.split(" ")[0], x.poids]));
  v.ok("16. la roue : chaque secteur vaut 100 × sa probabilité", egal(F(w16.rouge, 100), p16.rouge) && egal(F(w16.bleu, 100), p16.bleu) && egal(F(w16.vert, 100), p16.vert) && egal(F(w16.jaune, 100), jaune16));
  v.ok("16. les étiquettes de la roue disent les probabilités", r16.slice(0, 3).every((x) => x.label.endsWith(nu(F(x.poids, 100)))));

  v.titre("★★★ Problèmes");
  // 17 — la météorite
  dit(17, "environ $510$ millions de km², dont environ $361$ millions de km² d'océans");
  const oc = 361 / 510, fr17 = 0.55 / 510;
  v.ok(`17. 361 / 510 = ${oc.toFixed(4)} ≈ 0,71`, oc.toFixed(2) === "0.71");
  ecrit(17, "$P(\\text{océan}) = \\dfrac{361}{510} \\approx 0{,}71$, soit environ $71$ %");
  ecrit(17, `$1 - 0{,}71 = ${tex(moins(F(1), D("0,71")))}$, soit environ $29$ %`);
  v.ok(`17. 0,55 / 510 = ${fr17.toFixed(5)} ≈ 0,001, soit 0,1 %`, fr17.toFixed(3) === "0.001" && (fr17 * 100).toFixed(1) === "0.1");
  ecrit(17, "\\approx 0{,}001$, soit environ $0{,}1$ %");
  v.ok(`17. océan / terre = ${(0.71 / 0.29).toFixed(2)} : « presque deux fois et demie »`, 0.71 / 0.29 > 2.3 && 0.71 / 0.29 < 2.5);
  const r17 = argument(blocs[16], "roue");
  v.ok("17. la roue : 361 et 149 millions de km², étiquetés 71 % et 29 %", r17[0].poids === 361 && r17[0].poids + r17[1].poids === 510 && r17[0].label.endsWith(`${Math.round((100 * r17[0].poids) / 510)} %`) && r17[1].label.endsWith(`${Math.round((100 * r17[1].poids) / 510)} %`));

  // 18 — la Liste rouge
  const barres = [...blocs[17].matchAll(/label: "([^"]+)", value: (\d+)/g)].map((m) => [m[1], Number(m[2])]);
  v.ok("18. le diagramme : les trois pourcentages de l'énoncé", barres.length === 3 && e(18).includes(`$${barres[0][1]}$ % des espèces d'amphibiens`) && e(18).includes(`$${barres[1][1]}$ % des espèces de mammifères et $${barres[2][1]}$ % des espèces d'oiseaux`));
  for (const [nom, pc] of barres) ecrit(18, `${nom} $\\dfrac{${pc}}{100} = ${tex(F(pc, 100))}$`);
  const tri18 = [...barres].sort((a, b) => b[1] - a[1]);
  ecrit(18, `$${tri18.map(([, pc]) => tex(F(pc, 100))).join(" > ")}$ : les ${tri18[0][0]}, puis les ${tri18[1][0]}, puis les ${tri18[2][0]}`);
  v.ok("18. le plus menacé est surligné", /\], 0\)/.test(blocs[17]) && tri18[0][0] === barres[0][0]);
  v.ok("18. « plus de trois fois » : 41 / 12 > 3", tri18[0][1] / tri18[2][1] > 3);
  const oiseaux = barres.find(([n]) => n === "oiseaux")[1];
  ecrit(18, `$1 - ${tex(F(oiseaux, 100))} = ${tex(moins(F(1), F(oiseaux, 100)))}$, soit $${100 - oiseaux}$ %`);
  v.ok("18. 2/5 est proche de 0,41, un peu en dessous", inf(F(2, 5), F(41, 100)) && inf(moins(F(41, 100), F(2, 5)), F(2, 100)));
  ecrit(18, `$\\dfrac{2}{5} = ${tex(F(2, 5))}$, très proche de $0{,}41$`);

  // 19 — la Coupe du monde 2026
  const [, l19, s19] = tableauDe(blocs[18]);
  const places = l19.slice(0, -1).map((l) => [l[0], Number(l[1])]);
  const tot19 = places.reduce((s, [, n]) => s + n, 0);
  v.ok("19. le tableau : 7 zones, 48 places, chaque probabilité n / 48", tot19 === 48 && l19.at(-1).join() === "Total,48,1" && l19.slice(0, -1).every((l) => l[2] === `${l[1]}/48`));
  const pl = Object.fromEntries(places);
  dit(19, `Europe $${pl.Europe}$, Afrique $${pl.Afrique}$, Asie $${pl.Asie}$, Amérique du Sud $${pl["Am. du Sud"]}$, Amérique du Nord, centrale et Caraïbes $${pl["Am. du Nord"]}$, Océanie $${pl["Océanie"]}$, et $${pl.Barrages}$ places`);
  const u19 = places.flatMap(([z, n]) => Array(n).fill(z));
  /** L'arrondi au centième, écrit comme dans la feuille. */
  const ap = (q) => tex(F(Math.round((100 * Number(q.n)) / Number(q.d)), 100));
  const pz = (pred) => compte(u19, pred);
  const europe = pz((z) => z === "Europe"), pasEurope = pz((z) => z !== "Europe");
  ecrit(19, `$P(\\text{Europe}) = \\dfrac{16}{48} = ${tf(europe)} \\approx ${ap(europe)}$`);
  ecrit(19, `$P(\\text{Afrique}) = \\dfrac{9}{48} = ${tf(pz((z) => z === "Afrique"))} = ${tex(pz((z) => z === "Afrique"))}$`);
  ecrit(19, `$1 - ${tf(europe)} = ${tf(pasEurope)} \\approx ${ap(pasEurope)}$`);
  ecrit(19, `$48 - 16 = ${u19.filter((z) => z !== "Europe").length}$ places`);
  const asie = pz((z) => z === "Asie"), amer = pz((z) => z.startsWith("Am."));
  ecrit(19, `Asie : $\\dfrac{8}{48} = ${tf(asie)} \\approx ${ap(asie)}$`);
  ecrit(19, `$\\dfrac{12}{48} = ${tf(amer)} = ${tex(amer)}$`);
  v.ok("19. l'Amérique est plus probable que l'Asie", inf(asie, amer));
  v.ok("19. le piège 1/7 est faux", !egal(F(1, places.length), pz((z) => z === "Europe")) && places.length === 7);
  surlignees(19, s19, [cle(0, 1), cle(0, 2)], "les cases surlignées sont celles de l'Europe");

  // 20 — le sac des insectes
  const pAb = D("0,25"), pPa = D("0,4");
  const pCo = moins(moins(F(1), pAb), pPa);
  ecrit(20, `$P(\\text{coccinelle}) = 1 - 0{,}25 - 0{,}4 = ${tex(pCo)}$`);
  ecrit(20, `$0{,}25 = \\dfrac{25}{100} = ${tf(pAb)}$ et $0{,}4 = \\dfrac{4}{10} = ${tf(pPa)}$`);
  let N = 1;
  while (fois(pAb, F(N)).d !== 1n || fois(pPa, F(N)).d !== 1n) N++;
  const nAb = Number(fois(pAb, F(N)).n), nPa = Number(fois(pPa, F(N)).n), nCo = N - nAb - nPa;
  ecrit(20, `Le plus petit est $${N}$`);
  ecrit(20, `soit $${nAb}$ ; papillons : $\\dfrac{2}{5}$ de $${N}$, soit $${nPa}$ ; coccinelles : $${N} - ${nAb} - ${nPa} = ${nCo}$`);
  ecrit(20, `$\\dfrac{${nCo}}{${N}} = ${tex(F(nCo, N))}$, comme au a)`);
  const k20 = 60 / N;
  ecrit(20, `$${nAb * k20}$ abeilles, $${nPa * k20}$ papillons et $${nCo * k20}$ coccinelles`);
  const b20 = argument(blocs[19], "billes");
  const cpt = (l) => b20.filter((x) => x.label === l).length;
  v.ok(`20. le sac dessiné : ${nAb} A, ${nPa} P, ${nCo} C`, b20.length === N && cpt("A") === nAb && cpt("P") === nPa && cpt("C") === nCo);
}

lancer({
  nom: "LES PROBABILITÉS · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-probabilites.tsx",
  notionId: "proba_experience",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : le 10 oublié", "sur le dé : $5$ et $10$. $A$ est réalisé par $2$ issues", "sur le dé : $5$. $A$ est réalisé par $1$ issues"],
    ["ex. 1 : une case surlignée fausse", "[[1, 1], [2, 2]]", "[[1, 1], [2, 1]]"],
    ["ex. 2 : diviser par les 7 lettres", "portent un A : $P(\\\\text{A}) = \\\\dfrac{2}{9}$", "portent un A : $P(\\\\text{A}) = \\\\dfrac{2}{7}$"],
    ["ex. 2 : une voyelle coloriée en consonne", "{ label: \"U\", couleur: O }", "{ label: \"U\", couleur: G }"],
    ["ex. 3 : mercredi a 9 lettres", "[\"mercredi\", \"8\", \"oui\"]", "[\"mercredi\", \"9\", \"oui\"]"],
    ["ex. 4 : la roue en trois tiers", "{ label: \"jaune\", poids: 180, couleur: J }", "{ label: \"jaune\", poids: 90, couleur: J }"],
    ["ex. 5 : l'as compté parmi les figures", "$P(\\\\text{figure}) = \\\\dfrac{12}{32} = \\\\dfrac{3}{8}$", "$P(\\\\text{figure}) = \\\\dfrac{12}{32} = \\\\dfrac{1}{2}$"],
    ["ex. 5 : une figure surlignée de travers", "[6, 3], [6, 4]],", "[6, 3], [7, 4]],"],
    ["ex. 6 : 2/5 = 0,25 dans le tableau", "[\"2/5\", \"0,4\", \"40 %\"]", "[\"2/5\", \"0,25\", \"25 %\"]"],
    ["ex. 6 : 1/8 = 0,125 mal écrit", "$1 \\\\div 8 = 0{,}125$, soit $12{,}5$ %", "$1 \\\\div 8 = 0{,}125$, soit $1{,}25$ %"],
    ["ex. 7 : une bille de trop dans le sac A", "nomme(\"Sac A\", billes([{ couleur: V }, { couleur: V }, { couleur: V }, { couleur: G }", "nomme(\"Sac A\", billes([{ couleur: V }, { couleur: V }, { couleur: V }, { couleur: V }, { couleur: G }"],
    ["ex. 8 : le contraire mal calculé", "$1 - 0{,}45 = 0{,}55$", "$1 - 0{,}45 = 0{,}65$"],
    ["ex. 9 : un bonbon au citron devenu menthe", "{ couleur: J }, { couleur: V }, { couleur: V }", "{ couleur: V }, { couleur: V }, { couleur: V }"],
    ["ex. 10 : le 1 oublié des diviseurs", "[[0, 1], [1, 1], [3, 1], [7, 1]]", "[[1, 1], [3, 1], [7, 1]]"],
    ["ex. 11 : la roue ne fait plus 360°", "{ label: \"vert\", poids: 120, couleur: V }", "{ label: \"vert\", poids: 150, couleur: V }"],
    ["ex. 12 : 0,5 au lieu de 0,005", "$P(\\\\text{gros lot}) = \\\\dfrac{1}{200} = 0{,}005$", "$P(\\\\text{gros lot}) = \\\\dfrac{1}{200} = 0{,}5$"],
    ["ex. 13 : C placé à 0,45 sur l'échelle", "{ label: \"C\", valeur: 0.35 }", "{ label: \"C\", valeur: 0.45 }"],
    ["ex. 13 : l'ordre faux", "L'ordre est A, C, B, D", "L'ordre est A, B, C, D"],
    ["ex. 14 : diviser par les 11 garçons", "$P = \\\\dfrac{4}{25} = 0{,}16$", "$P = \\\\dfrac{4}{11} = 0{,}36$"],
    ["ex. 14 : une case du tableau fausse", "[\"Garçons\", \"4\", \"7\", \"11\"]", "[\"Garçons\", \"4\", \"8\", \"11\"]"],
    ["ex. 15 : 2/5 placé hors de l'échelle", "{ label: \"2/5\", valeur: 0.4 }", "{ label: \"2/5\", valeur: 2.5 }"],
    ["ex. 16 : le jaune à 0,2", "= 1 - 0{,}9 = 0{,}1$", "= 1 - 0{,}9 = 0{,}2$"],
    ["ex. 16 : un secteur de la roue faux", "{ label: \"bleu 0,25\", poids: 25", "{ label: \"bleu 0,25\", poids: 20"],
    ["ex. 17 : la roue des océans à 300", "{ label: \"océans 71 %\", poids: 361", "{ label: \"océans 71 %\", poids: 300"],
    ["ex. 18 : une barre fausse", "{ label: \"mammifères\", value: 26 }", "{ label: \"mammifères\", value: 36 }"],
    ["ex. 18 : 12 % pris pour « pas menacée »", "$1 - 0{,}12 = 0{,}88$, soit $88$ %", "$1 - 0{,}12 = 0{,}12$, soit $12$ %"],
    ["ex. 19 : une place de trop pour l'Afrique", "[\"Afrique\", \"9\", \"9/48\"]", "[\"Afrique\", \"10\", \"10/48\"]"],
    ["ex. 20 : 100 jetons « pour lire les pourcentages »", "Le plus petit est $20$", "Le plus petit est $100$"],
    ["ex. 20 : un papillon de moins dans le sac", "{ label: \"P\", couleur: B }, { label: \"C\", couleur: R }", "{ label: \"C\", couleur: R }, { label: \"C\", couleur: R }"],
    ["un arbre à deux épreuves", "schema: roue([{ label: \"vert\", poids: 45", "schema: arbre([]), x: roue([{ label: \"vert\", poids: 45"],
    ["la roue de figures.tsx, illisible à 375 px", "<div className=\"min-w-[17.5rem] print:min-w-0\">", "<div className=\"print:min-w-0\">"],
    ["une micro d'une autre notion", "micros: [\"proba_equiprobabilite\"],", "micros: [\"proba_frequence_calculer\"],"],
    ["un $ dans un canvas", "{ label: \"océans 71 %\"", "{ label: \"océans $71$ %\""],
  ],
});
