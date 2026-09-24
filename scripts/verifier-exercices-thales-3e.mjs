// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Le théorème de
// Thalès » de 3e (lib/fiches-exercices/maths-3e-thales.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE une longueur par un produit en croix
// (« AN = 15 × 4 / 10 = 6 ») ; ici on la recalcule en fractions EXACTES, puis on
// la MESURE sur la figure dessinée — la distance entre les deux points, à
// l'échelle des longueurs écrites dessus. Chaque figure `thales({ … })` est relue
// dans le source : A, M, B alignés ; A, N, C alignés ; (MN) // (BC) quand la
// figure le dit (et PAS parallèles quand elle dit le contraire) ; chaque
// longueur écrite sur un côté est proportionnelle à la longueur dessinée.
// Une réciproque se tranche par les produits en croix, jamais par les décimaux.
//
//   node scripts/verifier-exercices-thales-3e.mjs

import { lireFeuille, lancer, Q, D, fois, div, plus, moins, egal, tex, versNombre } from "./verifier-exercices-commun.mjs";

const q = (x) => (typeof x === "object" ? x : D(String(x)));

/** Les appels `thales({ … })` d'un bloc, relus : points, étiquettes, options, rôle. */
function figures(bloc) {
  const out = [];
  for (const m of bloc.matchAll(/thales\(\{(.*)\}\)/g)) {
    const t = m[1];
    const avant = bloc.slice(0, m.index);
    const role = avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
    const P = {};
    for (const [, k, x, y] of t.matchAll(/\b([ABCMN]): \[(-?[\d.]+), (-?[\d.]+)\]/g)) P[k] = [Number(x), Number(y)];
    const cotes = {};
    const bc = /cotes: \{([^}]*)\}/.exec(t);
    if (bc) for (const [, k, v] of bc[1].matchAll(/\b(AM|AB|AN|AC|MN|BC|MB|NC): "([^"]*)"/g)) cotes[k] = v;
    const trouve = (/trouve: \[([^\]]*)\]/.exec(t)?.[1].match(/[A-Z]{2}/g)) ?? [];
    out.push({ role, P, cotes, trouve, paralleles: !/paralleles: false/.test(t), echelle: !/echelle: false/.test(t), texte: t });
  }
  return out;
}

const dist = (P, k) => Math.hypot(P[k[0]][0] - P[k[1]][0], P[k[0]][1] - P[k[1]][1]);
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
const vec = (P, a, b) => [P[b][0] - P[a][0], P[b][1] - P[a][1]];
/** Paramètre de r sur (p q) : 0 en p, 1 en q. */
const param = (P, p, qq, r) => {
  const u = vec(P, p, qq);
  const w = vec(P, p, r);
  return (u[0] * w[0] + u[1] * w[1]) / (u[0] * u[0] + u[1] * u[1]);
};
/** Le nombre écrit sur une étiquette (« AB = 7,5 cm » → 7.5), null pour « ? ». */
const nombre = (s) => {
  const m = /(?:= )?(\d+(?:,\d+)?)/.exec(s.includes("=") ? s.split("=")[1] : s);
  return m ? Number(m[1].replace(",", ".")) : null;
};

function verifier(source, v) {
  const { corrections, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const figs = (k) => figures(blocs[k - 1] ?? "");
  const fig = (k, i = 0, role = "schema") => {
    const f = figs(k).filter((x) => x.role === role)[i];
    if (!f) throw new Error(`exercice ${k} : pas de figure ${role} n° ${i + 1}`);
    return f;
  };
  /** La longueur d'un côté MESURÉE sur la figure, dans l'unité de ses étiquettes. */
  const echelleDe = (f) => {
    const [k, s] = Object.entries(f.cotes).find(([, s]) => nombre(s) !== null) ?? [];
    return k ? nombre(s) / dist(f.P, k) : 1;
  };
  const mesure = (f, cle) => dist(f.P, cle) * echelleDe(f);

  /** a × b ÷ c en fractions exactes, lu « NOM = \dfrac{a \times b}{c} = r$ », et
   *  mesuré sur la figure (si un côté est donné). */
  const q4 = (k, nom, a, b, cc, { cote, f } = {}) => {
    const r = div(fois(q(a), q(b)), q(cc));
    let ecrit;
    try {
      ecrit = tex(r);
    } catch {
      v.ok(`${k}. ${nom} = ${a} × ${b} ÷ ${cc} est un décimal fini`, false);
      return r;
    }
    dit(k, `${nom} = \\dfrac{${tex(q(a))} \\times ${tex(q(b))}}{${tex(q(cc))}} = ${ecrit}$`);
    if (cote) {
      const fg = f ?? fig(k);
      const m = mesure(fg, cote);
      v.ok(`${k}. ${nom} mesuré sur la figure : ${m.toFixed(3)} ≈ ${versNombre(r)}`, Math.abs(m - versNombre(r)) < 0.01 * versNombre(r));
    }
    return r;
  };
  /** Le quotient a/b écrit « \dfrac{a}{b} = valeur$ », valeur recalculée. */
  const quot = (k, a, b) => {
    const r = div(q(a), q(b));
    dit(k, `\\dfrac{${tex(q(a))}}{${tex(q(b))}} = ${tex(r)}$`);
    return r;
  };

  v.titre("Les figures, relues dans le source");
  let n = 0;
  const fautes = [];
  blocs.forEach((bloc, i) => {
    for (const f of figures(bloc)) {
      n++;
      const P = f.P;
      const k = i + 1;
      if (Object.keys(P).length !== 5) {
        fautes.push(`${k} : ${Object.keys(P).length} points lus`);
        continue;
      }
      const al1 = Math.abs(cross(vec(P, "A", "M"), vec(P, "A", "B"))) / (dist(P, "AM") * dist(P, "AB"));
      const al2 = Math.abs(cross(vec(P, "A", "N"), vec(P, "A", "C"))) / (dist(P, "AN") * dist(P, "AC"));
      if (al1 > 1e-4) fautes.push(`${k} : A, M, B pas alignés`);
      if (al2 > 1e-4) fautes.push(`${k} : A, N, C pas alignés`);
      const par = Math.abs(cross(vec(P, "M", "N"), vec(P, "B", "C"))) / (dist(P, "MN") * dist(P, "BC"));
      if (f.paralleles && par > 1e-4) fautes.push(`${k} : (MN) et (BC) dessinées NON parallèles (écart ${par.toExponential(1)})`);
      if (!f.paralleles && par < 0.01) fautes.push(`${k} : (MN) et (BC) dessinées parallèles alors que la figure dit le contraire`);
      if (f.paralleles && Math.abs(param(P, "A", "B", "M") - param(P, "A", "C", "N")) > 1e-4) fautes.push(`${k} : AM/AB ≠ AN/AC sur la figure`);
      if (f.echelle) {
        const rapports = Object.entries(f.cotes)
          .filter(([, s]) => nombre(s) !== null)
          .map(([cle, s]) => [cle, nombre(s) / dist(P, cle)]);
        for (const [cle, r] of rapports) if (Math.abs(r / rapports[0][1] - 1) > 0.01) fautes.push(`${k} : « ${f.cotes[cle]} » pas à l'échelle (${cle} dessiné ${dist(P, cle).toFixed(3)})`);
      }
      for (const s of Object.values(f.cotes)) if (/[$\\^]/.test(s)) fautes.push(`${k} : notation LaTeX dans « ${s} »`);
      for (const t of f.trouve) if (!f.cotes[t]) fautes.push(`${k} : « ${t} » trouvé mais sans étiquette`);
    }
  });
  v.ok(`${n} figures : alignements, parallèles (ou non) comme annoncé, longueurs à l'échelle, texte nu`, fautes.length === 0, fautes.slice(0, 3).join(" | "));
  const dessines = blocs.filter((b) => figures(b).some((f) => f.role === "schema")).length;
  v.ok(`${dessines} corrigés dessinés sur 20 (au moins 18)`, dessines >= 18);
  v.ok("aucun $ dans un appel thales()", !/thales\(\{[^\n]*\$/.test(source));

  /** Emboîtés (M du côté de B) ou papillon (M de l'autre côté de A) ? */
  const papillon = (f) => param(f.P, "A", "B", "M") < 0 && param(f.P, "A", "C", "N") < 0;
  const emboites = (f) => param(f.P, "A", "B", "M") > 0 && param(f.P, "A", "B", "M") < 1 && param(f.P, "A", "C", "N") > 0 && param(f.P, "A", "C", "N") < 1;

  v.titre("★ Un seul geste");
  v.ok("1. figure a) emboîtée, figure b) papillon, toutes deux parallèles", emboites(fig(1, 0)) && papillon(fig(1, 1)) && fig(1, 0).paralleles && fig(1, 1).paralleles);
  dit(1, "Réponse : a) triangles emboîtés ; b) papillon");

  const f2 = fig(2, 0, "figure");
  v.ok("2. la figure de l'énoncé et celle du corrigé ont les mêmes points", JSON.stringify(f2.P) === JSON.stringify(fig(2).P));
  v.ok("2. R sur [ES], T sur [EU] : triangles emboîtés, sommet E", emboites(f2) && /A: "E"/.test(f2.texte) && /M: "R"/.test(f2.texte) && /B: "S"/.test(f2.texte));
  // Chaque quotient : deux points d'une même sécante (ou les deux parallèles), le PETIT en haut.
  const r2 = [["ER", "ES"], ["ET", "EU"], ["RT", "SU"]];
  const nomsVers = { E: "A", R: "M", S: "B", T: "N", U: "C" };
  const val2 = r2.map(([h, b]) => dist(f2.P, [...h].map((x) => nomsVers[x]).join("").replace(/^(.)(.)$/, "$1$2")) / dist(f2.P, [...b].map((x) => nomsVers[x]).join("")));
  v.ok(`2. les trois quotients mesurés sur la figure sont égaux (${val2.map((x) => x.toFixed(4)).join(" ; ")})`, val2.every((x) => Math.abs(x - val2[0]) < 1e-6));
  dit(2, `Réponse : $${r2.map(([h, b]) => `\\dfrac{${h}}{${b}}`).join(" = ")}$.`);

  const f3 = fig(3);
  v.ok("3. O entre K et L, entre P et Q : papillon, et (KP) // (LQ)", papillon(f3) && f3.paralleles);
  const r3 = quot(3, 4, 8);
  v.ok("3. OP/OQ mesuré sur la figure = OK/OL", Math.abs(dist(f3.P, "AN") / dist(f3.P, "AC") - versNombre(r3)) < 1e-6);
  dit(3, `ce quotient vaut $${tex(r3)}$`);

  q4(4, "AN", 15, 4, 10, { cote: "AN" });
  dit(4, "Réponse : $AN = 6$ cm.");
  q4(5, "MN", 12, 5, 8, { cote: "MN" });
  v.ok("5. le piège 8 × 5 ÷ 12 donne autre chose", !egal(div(Q(40), Q(12)), Q(15, 2)));
  dit(5, "Réponse : $MN = 7{,}5$ cm.");

  const AB6 = plus(Q(6), Q(4));
  dit(6, `$AB = AM + MB = 6 + 4 = ${tex(AB6)}$ cm`);
  const AC6 = q4(6, "AC", tex(AB6), 9, 6);
  const NC6 = moins(AC6, Q(9));
  dit(6, `$NC = AC - AN = ${tex(AC6)} - 9 = ${tex(NC6)}$ cm`);
  v.ok(`6. NC = ${tex(NC6)} mesuré sur la figure`, Math.abs(mesure(fig(6), "NC") - versNombre(NC6)) < 0.01);
  q4(6, "AC", 4, 9, 6);
  v.ok("6. le piège AM/MB donne un AC plus court que AN", versNombre(div(fois(Q(4), Q(9)), Q(6))) < 9);

  // Réciproques : produits en croix EXACTS, et l'ordre des points sur la figure.
  const recip = (k, am, ab, an, ac, attendu) => {
    const eg = egal(fois(q(am), q(ac)), fois(q(ab), q(an)));
    const f = fig(k);
    const ordre = Math.sign(param(f.P, "A", "B", "M")) === Math.sign(param(f.P, "A", "C", "N"));
    v.ok(`${k}. AM × AC ${eg ? "=" : "≠"} AB × AN, ordre ${ordre ? "identique" : "différent"} : ${eg && ordre ? "parallèles" : "PAS parallèles"}`, (eg && ordre) === attendu && f.paralleles === attendu);
    return eg;
  };
  recip(7, "3.6", 6, "4.2", 7, true);
  quot(7, "3.6", 6);
  quot(7, "4.2", 7);
  dit(7, "Réponse : oui, $(MN)$ et $(BC)$ sont parallèles.");

  recip(8, 5, 8, 6, 10, false);
  quot(8, 5, 8);
  quot(8, 6, 10);
  dit(8, `$5 \\times 10 = ${5 * 10}$ et $8 \\times 6 = ${8 * 6}$`);
  dit(8, "Réponse : non, $(MN)$ et $(BC)$ ne sont pas parallèles.");

  v.titre("★★ Type devoir");
  quot(9, "2.4", 6);
  q4(9, "AN", "7.5", "2.4", 6, { cote: "AN" });
  q4(9, "MN", "4.5", "2.4", 6, { cote: "MN" });
  v.ok("9. le triangle dessiné a bien AC = 7,5 et BC = 4,5", Math.abs(dist(fig(9).P, "AC") - 7.5) < 1e-6 && Math.abs(dist(fig(9).P, "BC") - 4.5) < 1e-6);
  dit(9, "Réponse : $AN = 3$ cm et $MN = 1{,}8$ cm.");

  const f10 = fig(10);
  v.ok("10. papillon, (MN) // (BC), et le triangle dessiné a AB = 4, AC = 5, BC = 6", papillon(f10) && f10.paralleles && [["AB", 4], ["AC", 5], ["BC", 6]].every(([k2, l]) => Math.abs(dist(f10.P, k2) - l) < 1e-4));
  q4(10, "AN", 5, 6, 4, { cote: "AN" });
  q4(10, "BC", 4, 9, 6, { cote: "BC" });
  dit(10, "Réponse : un papillon ; $AN = 7{,}5$ cm et $BC = 6$ cm.");

  const eg11 = recip(11, 2, 5, 3, "7.5", false);
  v.ok("11. les quotients sont pourtant égaux", eg11);
  quot(11, 2, 5);
  quot(11, 3, "7.5");
  v.ok("11. M sur [AB], A sur [NC] (lu sur la figure)", param(fig(11).P, "A", "B", "M") > 0 && param(fig(11).P, "A", "C", "N") < 0);
  dit(11, "l'élève a tort");

  recip(12, "4.2", 6, "5.6", 8, true);
  v.ok("12. c'est un papillon", papillon(fig(12)));
  quot(12, "4.2", 6);
  quot(12, "5.6", 8);

  dit(13, "$AB = AM + MB = 4 + 6 = 10$ cm");
  const AN13 = q4(13, "AN", "12.5", 4, 10, { cote: "AN" });
  const NC13 = moins(D("12.5"), AN13);
  dit(13, `$NC = 12{,}5 - ${tex(AN13)} = ${tex(NC13)}$ cm`);
  const MN13 = q4(13, "MN", 9, 4, 10, { cote: "MN" });
  const per13 = [Q(6), Q(9), NC13, MN13].reduce(plus);
  // Le périmètre, MESURÉ sur la figure : les quatre côtés du trapèze.
  const f13 = fig(13);
  const perFig = ["MB", "BC", "NC", "MN"].reduce((s, k2) => s + mesure(f13, k2), 0);
  v.ok(`13. périmètre ${tex(per13)} = ${perFig.toFixed(3)} mesuré`, Math.abs(perFig - versNombre(per13)) < 0.02);
  dit(13, `$6 + 9 + 7{,}5 + 3{,}6 = ${tex(per13)}$ cm`);

  const ac2 = 12 * 12 + 5 * 5;
  let AC14 = 0;
  while (AC14 * AC14 < ac2) AC14++;
  v.ok(`14. AC² = ${ac2} = ${AC14}²`, AC14 * AC14 === ac2);
  dit(14, `= 144 + 25 = ${ac2}$, donc $AC = \\sqrt{${ac2}} = ${AC14}$ cm`);
  const f14 = fig(14);
  v.ok("14. la figure est rectangle en B, MN ⟂ AB", Math.abs(vec(f14.P, "B", "A")[0] * vec(f14.P, "B", "C")[0] + vec(f14.P, "B", "A")[1] * vec(f14.P, "B", "C")[1]) < 1e-9 && vec(f14.P, "M", "N")[0] === 0);
  q4(14, "AN", AC14, 9, 12, { cote: "AN" });
  q4(14, "MN", 5, 9, 12, { cote: "MN" });

  recip(15, 3, 12, "2.5", 10, true);
  quot(15, 3, 12);
  quot(15, "2.5", 10);
  v.ok("15. le triangle dessiné a BC = 14", Math.abs(dist(fig(15).P, "BC") - 14) < 1e-4);
  q4(15, "MN", 14, 3, 12, { cote: "MN" });

  const AN16 = q4(16, "AN", 12, 3, 8, { cote: "AN" });
  v.ok("16. la copie de l'élève (12 × 3 ÷ 5 = 7,2) est bien fausse", egal(div(Q(36), Q(5)), D("7.2")) && !egal(AN16, D("7.2")));
  v.ok("16. 7,2 dépasse le milieu de [AC], 4,5 non", versNombre(D("7.2")) > 6 && versNombre(AN16) < 6);
  dit(16, "Réponse : $AN = 4{,}5$ cm, et non $7{,}2$ cm.");

  v.titre("★★★ Problèmes");
  const OR = plus(D("3.2"), D("9.6"));
  dit(17, `$OR = OP + PR = 3{,}2 + 9{,}6 = ${tex(OR)}$ m`);
  q4(17, "RS", tex(OR).replace("{,}", "."), 2, "3.2", { cote: "BC" });
  v.ok("17. le jalon et l'arbre sont dessinés verticaux", vec(fig(17).P, "M", "N")[0] === 0 && vec(fig(17).P, "B", "C")[0] === 0);
  dit(17, `$${tex(div(OR, D("3.2")))} \\times 2 = 8$ m`);

  // La passerelle : x/(x + 8) = 12/15, cherché au décimètre près sur 0..100.
  let x18 = null;
  for (let i = 1; i <= 1000; i++) if (egal(div(Q(i, 10), plus(Q(i, 10), Q(8))), Q(12, 15))) x18 = Q(i, 10);
  v.ok(`18. x/(x + 8) = 12/15 donne x = ${x18 && tex(x18)}`, !!x18);
  if (x18) {
    dit(18, `$x = ${tex(x18)}$ m`);
    v.ok("18. AM mesuré sur la figure = x", Math.abs(mesure(fig(18), "AM") - versNombre(x18)) < 0.05);
    dit(18, `$\\dfrac{${tex(x18)}}{${tex(plus(x18, Q(8)))}} = ${tex(div(x18, plus(x18, Q(8))))}$`);
  }
  dit(18, `donnerait $AM = ${tex(div(fois(Q(8), Q(12)), Q(15)))}$ m`);

  const MN19 = q4(19, "MN", 85, 40, 100, { cote: "MN" });
  const an2 = 40 * 40 + versNombre(MN19) ** 2;
  dit(19, `= 1\\,600 + 1\\,156 = ${tex(Q(an2))}$`);
  dit(19, `\\approx ${tex(D(Math.sqrt(an2).toFixed(1)))}$ m`);
  v.ok("19. AN mesuré sur la figure ≈ 52,5", Math.abs(mesure(fig(19), "AN") - 52.5) < 0.05);
  q4(19, "AM", 100, 51, 85);
  dit(19, `\\approx ${tex(D(Math.hypot(100, 85).toFixed(1)))}$ m`);

  const f20 = fig(20);
  v.ok("20. papillon, (MN) // (BC), figure déclarée « pas à l'échelle »", papillon(f20) && f20.paralleles && !f20.echelle);
  const BC20 = q4(20, "BC", "10000", 36, 50);
  dit(20, `soit $${tex(div(BC20, Q(1000)))}$ m`);
  const AB20 = (330000 * 50) / 36;
  dit(20, `\\approx ${tex(Q(Math.round(AB20)))}$ mm, soit environ $${tex(D((AB20 / 1000).toFixed(1)))}$ m`);
  dit(20, `\\dfrac{458\\,000 \\times 36}{50} = ${tex(div(fois(Q(458000), Q(36)), Q(50)))}$ mm`);
  v.ok("20. à 458 m la tour ne tient pas, à 459 m elle tient", (458000 * 36) / 50 < 330000 && (459000 * 36) / 50 >= 330000);
  dit(20, `au moins $${Math.ceil(AB20 / 1000)}$ m`);
}

lancer({
  nom: "LE THÉORÈME DE THALÈS · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-thales.tsx",
  notionId: "thales_theoreme",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : le papillon dessiné emboîté", "M: [-3, 0], N: [-1.8, -2.4], remplir: true, titre", "M: [3, 0], N: [1.8, 2.4], remplir: true, titre"],
    ["ex. 2 : les quotients à l'envers", "Réponse : $\\\\dfrac{ER}{ES} = \\\\dfrac{ET}{EU}", "Réponse : $\\\\dfrac{ER}{ES} = \\\\dfrac{EU}{ET}"],
    ["ex. 3 : le quotient inversé", "ce quotient vaut $0{,}5$", "ce quotient vaut $2$"],
    ["ex. 4 : N dessiné hors de la parallèle", "M: [4, 0], N: [3.6, 4.8], cotes: { AM: \"4 cm\", AB: \"AB = 10 cm\"", "M: [4, 0], N: [4.2, 4.8], cotes: { AM: \"4 cm\", AB: \"AB = 10 cm\""],
    ["ex. 5 : le produit en croix raté", "$MN = \\\\dfrac{12 \\\\times 5}{8} = 7{,}5$", "$MN = \\\\dfrac{8 \\\\times 5}{12} = 7{,}5$"],
    ["ex. 6 : AM/MB au lieu de AM/AB", "$AC = \\\\dfrac{10 \\\\times 9}{6} = 15$ cm.", "$AC = \\\\dfrac{4 \\\\times 9}{6} = 6$ cm."],
    ["ex. 7 : la réciproque retournée", "Réponse : oui, $(MN)$ et $(BC)$ sont parallèles.", "Réponse : non, $(MN)$ et $(BC)$ ne sont pas parallèles."],
    ["ex. 8 : le quotient arrondi", "\\\\dfrac{5}{8} = 0{,}625$", "\\\\dfrac{5}{8} = 0{,}6$"],
    ["ex. 8 : dessinées parallèles", "C: [6, 8], M: [5, 0], N: [3.6, 4.8]", "C: [6, 8], M: [5, 0], N: [3.75, 5]"],
    ["ex. 9 : MN faux", "\\\\dfrac{4{,}5 \\\\times 2{,}4}{6} = 1{,}8$", "\\\\dfrac{4{,}5 \\\\times 2{,}4}{6} = 2$"],
    ["ex. 10 : BC du papillon faux", "$BC = \\\\dfrac{4 \\\\times 9}{6} = 6$", "$BC = \\\\dfrac{6 \\\\times 9}{4} = 13{,}5$"],
    ["ex. 11 : l'ordre des points rendu identique", "M: [2, 0], N: [-1.8, -2.4]", "M: [2, 0], N: [1.8, 2.4]"],
    ["ex. 12 : une étiquette pas à l'échelle", "AN: \"5,6 cm\", AC: \"8 cm\"", "AN: \"6,5 cm\", AC: \"8 cm\""],
    ["ex. 13 : périmètre faux", "= 26{,}1$ cm.\\n", "= 29{,}1$ cm.\\n"],
    ["ex. 14 : AC faux", "AC = \\\\sqrt{169} = 13$ cm", "AC = \\\\sqrt{169} = 17$ cm"],
    ["ex. 15 : MN faux", "$MN = \\\\dfrac{14 \\\\times 3}{12} = 3{,}5$ cm.", "$MN = \\\\dfrac{14 \\\\times 3}{12} = 4$ cm."],
    ["ex. 16 : la copie recopiée", "$AN = \\\\dfrac{12 \\\\times 3}{8} = 4{,}5$ cm.", "$AN = \\\\dfrac{12 \\\\times 3}{5} = 7{,}2$ cm."],
    ["ex. 17 : l'arbre dessiné trop petit", "N: [3.2, 2], C: [12.8, 8]", "N: [3.2, 2], C: [12.8, 6]"],
    ["ex. 18 : la passerelle par AM/MB", "Donc $3x = 96$ et $x = 32$ m.", "Donc $3x = 96$ et $x = 6{,}4$ m."],
    ["ex. 19 : la piste = somme des côtés", "AN = \\\\sqrt{2\\\\,756} \\\\approx 52{,}5$ m", "AN = \\\\sqrt{2\\\\,756} \\\\approx 74$ m"],
    ["ex. 20 : la distance minimale arrondie au plus proche", "au moins $459$ m", "au moins $458$ m"],
    ["une micro d'une autre notion", "micros: [\"thales_reciproque\"],\n        },\n      ],", "micros: [\"trigo_triangle_rectangle\"],\n        },\n      ],"],
    ["un $ dans une figure", "cotes: { AM: \"4 cm\", AB: \"8 cm\" }", "cotes: { AM: \"$4$ cm\", AB: \"8 cm\" }"],
  ],
});
