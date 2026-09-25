// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Le théorème de
// Thalès » de 4e (lib/fiches-exercices/maths-4e-thales.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE une longueur par un produit en croix
// (« AN = 10 × 6 / 8 = 7,5 ») ; ici on la recalcule en fractions EXACTES, puis on
// la MESURE sur la figure dessinée — la distance entre les deux points, à
// l'échelle des longueurs écrites dessus. Chaque figure `thales({ … })` est relue
// dans le source : A, M, B alignés ; A, N, C alignés ; M sur [AB] et N sur [AC]
// (des triangles EMBOÎTÉS, jamais de papillon en 4e) ; (MN) // (BC) quand la
// figure le dit (et PAS parallèles quand elle dit le contraire) ; chaque
// longueur écrite sur un côté est proportionnelle à la longueur dessinée.
// Chaque `tableauThales(…)` est relu : les colonnes vont par paires (AM sous AB,
// AN sous AC, MN sous BC), tous les quotients petit / grand sont égaux, au
// coefficient écrit, et aux longueurs écrites sur la figure voisine.
// Une réciproque se tranche par les produits en croix, jamais par les décimaux.
//
//   node scripts/verifier-exercices-thales-4e.mjs

import { lireFeuille, lancer, Q, D, fois, div, plus, moins, egal, tex, versNombre } from "./verifier-exercices-commun.mjs";

const q = (x) => (typeof x === "object" ? x : D(String(x)));

/** Les appels `thales({ … })` d'un bloc, relus : points, étiquettes, options, rôle. */
function figures(bloc) {
  const out = [];
  for (const m of bloc.matchAll(/\bthales\(\{(.*)\}\)/g)) {
    const t = m[1];
    const avant = bloc.slice(0, m.index);
    const role = avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
    const P = {};
    for (const [, k, x, y] of t.matchAll(/\b([ABCMN]): \[(-?[\d.]+), (-?[\d.]+)\]/g)) P[k] = [Number(x), Number(y)];
    const cotes = {};
    const bc = /cotes: \{([^}]*)\}/.exec(t);
    if (bc) for (const [, k, v] of bc[1].matchAll(/\b(AM|AB|AN|AC|MN|BC|MB|NC): "([^"]*)"/g)) cotes[k] = v;
    const trouve = /trouve: \[([^\]]*)\]/.exec(t)?.[1].match(/[A-Z]{2}/g) ?? [];
    out.push({ role, P, cotes, trouve, paralleles: !/paralleles: false/.test(t), neutre: /neutre: true/.test(t), echelle: !/echelle: false/.test(t), texte: t });
  }
  return out;
}

/** Les appels `tableauThales([noms du haut], [noms du bas], [haut], [bas], "coef"?)` d'un bloc. */
function tableaux(bloc) {
  const out = [];
  for (const m of bloc.matchAll(/tableauThales\((\[[^\]]*\]), (\[[^\]]*\]), (\[[^\]]*\]), (\[[^\]]*\])(?:, "([^"]*)")?\)/g)) {
    const avant = bloc.slice(0, m.index);
    const role = avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
    out.push({ role, nomsHaut: JSON.parse(m[1]), nomsBas: JSON.parse(m[2]), haut: JSON.parse(m[3]), bas: JSON.parse(m[4]), coef: m[5] });
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
/** Le nombre écrit sur une étiquette (« RS = 7,5 cm » → 7.5), null pour « ? ». */
const nombre = (s) => {
  const m = /(\d+(?:,\d+)?)/.exec(s.includes("=") ? s.split("=")[1] : s);
  return m ? Number(m[1].replace(",", ".")) : null;
};
/** L'angle entre (MN) et (BC), en degrés. */
const angle = (P) => (Math.asin(Math.abs(cross(vec(P, "M", "N"), vec(P, "B", "C"))) / (dist(P, "MN") * dist(P, "BC"))) * 180) / Math.PI;
const emboites = (P) => {
  const tM = param(P, "A", "B", "M");
  const tN = param(P, "A", "C", "N");
  return tM > 0 && tM < 1 && tN > 0 && tN < 1;
};
const PAIRE = { AM: "AB", AN: "AC", MN: "BC" };

function verifier(source, v) {
  const { corrections, enonces, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");
  const figs = (k) => figures(blocs[k - 1] ?? "");
  const fig = (k, i = 0, role = "schema") => {
    const f = figs(k).filter((x) => x.role === role)[i];
    if (!f) throw new Error(`exercice ${k} : pas de figure ${role} n° ${i + 1}`);
    return f;
  };
  /** L'échelle d'une figure : longueur écrite ÷ longueur dessinée, sur la première étiquette chiffrée. */
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
  /** Même chose, avec un résultat arrondi « \approx arrondi$ » : l'écart doit
   *  rester sous la demi-unité du dernier chiffre écrit. */
  const q4env = (k, nom, a, b, cc, arrondi) => {
    const r = versNombre(div(fois(q(a), q(b)), q(cc)));
    const decimales = (arrondi.split(".")[1] ?? "").length;
    dit(k, `${nom} = \\dfrac{${tex(q(a))} \\times ${tex(q(b))}}{${tex(q(cc))}} \\approx ${tex(D(arrondi))}$`);
    v.ok(`${k}. ${nom} = ${r.toFixed(5)} s'arrondit à ${arrondi}`, Math.abs(r - Number(arrondi)) <= 0.5 * 10 ** -decimales);
    return r;
  };
  /** Le quotient a/b écrit « \dfrac{a}{b} = valeur$ », valeur recalculée. */
  const quot = (k, a, b) => {
    const r = div(q(a), q(b));
    dit(k, `\\dfrac{${tex(q(a))}}{${tex(q(b))}} = ${tex(r)}$`);
    return r;
  };
  /** Réciproque : produits en croix EXACTS, ordre des points lu sur la figure,
   *  et la figure dessinée parallèle si et seulement si c'est la conclusion. */
  const recip = (k, am, ab, an, ac, attendu) => {
    const eg = egal(fois(q(am), q(ac)), fois(q(ab), q(an)));
    const f = fig(k);
    const ordre = emboites(f.P);
    v.ok(`${k}. AM × AC ${eg ? "=" : "≠"} AB × AN, points dans le même ordre : ${eg && ordre ? "parallèles" : "PAS parallèles"}`, (eg && ordre) === attendu && f.paralleles === attendu);
    const ecrits = [["AM", am], ["AB", ab], ["AN", an], ["AC", ac]].every(([cle, x]) => f.cotes[cle] && Math.abs(nombre(f.cotes[cle]) - versNombre(q(x))) < 1e-9);
    v.ok(`${k}. la figure porte les quatre longueurs de l'énoncé`, ecrits);
    return eg;
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
      // ⛔ 4e : des triangles emboîtés, jamais de papillon.
      if (!emboites(P)) fautes.push(`${k} : M hors de [AB] ou N hors de [AC] (pas des triangles emboîtés)`);
      const par = Math.abs(cross(vec(P, "M", "N"), vec(P, "B", "C"))) / (dist(P, "MN") * dist(P, "BC"));
      if (f.paralleles && par > 1e-4) fautes.push(`${k} : (MN) et (BC) dessinées NON parallèles (écart ${par.toExponential(1)})`);
      if (!f.paralleles && par < 0.01) fautes.push(`${k} : (MN) et (BC) dessinées parallèles alors que la figure dit le contraire`);
      if (f.neutre && f.paralleles) fautes.push(`${k} : une figure « neutre » doit être déclarée non parallèle`);
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
  v.ok(`${n} figures : triangles emboîtés, alignements, parallèles (ou non) comme annoncé, longueurs à l'échelle, texte nu`, fautes.length === 0, fautes.slice(0, 3).join(" | "));
  const dessines = blocs.filter((b) => figures(b).some((f) => f.role === "schema")).length;
  v.ok(`${dessines} corrigés dessinés sur 20 (tous)`, dessines === 20);
  v.ok("aucun $ dans un appel thales() ou tableauThales()", !/\bthales\(\{[^\n]*\$/.test(source) && !/tableauThales\([^\n]*\$/.test(source));

  v.titre("Les tableaux de proportionnalité, relus");
  let nt = 0;
  const fautesT = [];
  blocs.forEach((bloc, i) => {
    const k = i + 1;
    for (const t of tableaux(bloc)) {
      nt++;
      t.nomsHaut.forEach((h, j) => {
        if (PAIRE[h] !== t.nomsBas[j]) fautesT.push(`${k} : colonne ${h} / ${t.nomsBas[j]} ne vont pas ensemble`);
      });
      const val = (s) => (s === "?" ? null : D(s.replace("!", "")));
      const quotients = t.haut.map((h, j) => (val(h) && val(t.bas[j]) ? div(val(h), val(t.bas[j])) : null)).filter(Boolean);
      if (quotients.length < 1) fautesT.push(`${k} : aucune colonne complète`);
      if (quotients.some((x) => !egal(x, quotients[0]))) fautesT.push(`${k} : les quotients petit / grand ne sont pas tous égaux`);
      if (t.coef && !egal(D(t.coef), quotients[0])) fautesT.push(`${k} : coefficient écrit ${t.coef}, calculé ${tex(quotients[0])}`);
      // Les nombres du tableau sont ceux de la figure voisine.
      const voisine = figures(bloc).find((f) => f.role === t.role);
      if (voisine)
        [...t.nomsHaut.map((nm, j) => [nm, t.haut[j]]), ...t.nomsBas.map((nm, j) => [nm, t.bas[j]])].forEach(([nm, s]) => {
          if (s !== "?" && voisine.cotes[nm] && Math.abs(nombre(voisine.cotes[nm]) - versNombre(val(s))) > 1e-9) fautesT.push(`${k} : ${nm} = ${s} dans le tableau, « ${voisine.cotes[nm]} » sur la figure`);
        });
    }
  });
  v.ok(`${nt} tableaux : colonnes appariées, un seul coefficient, le même que sur la figure`, fautesT.length === 0 && nt === 4, fautesT.slice(0, 3).join(" | ") || `${nt} tableaux lus`);

  v.titre("★ Un seul geste");
  const f1a = fig(1, 0, "figure");
  const f1b = fig(1, 1, "figure");
  v.ok("1. figure a) codée parallèle, figure b) neutre ET vraiment pas parallèle", f1a.paralleles && !f1a.neutre && f1b.neutre && angle(f1b.P) > 3);
  v.ok("1. le corrigé redessine les mêmes points, b) en rouge", JSON.stringify(fig(1, 0).P) === JSON.stringify(f1a.P) && JSON.stringify(fig(1, 1).P) === JSON.stringify(f1b.P) && !fig(1, 1).paralleles && !fig(1, 1).neutre);
  dit(1, "Réponse : figure a) oui ; figure b) non");

  const f2 = fig(2, 0, "figure");
  v.ok("2. la figure de l'énoncé et celle du corrigé ont les mêmes points", JSON.stringify(f2.P) === JSON.stringify(fig(2).P));
  v.ok("2. sommet D, E sur [DF], G sur [DH]", /A: "D"/.test(f2.texte) && /M: "E"/.test(f2.texte) && /B: "F"/.test(f2.texte) && /N: "G"/.test(f2.texte) && /C: "H"/.test(f2.texte));
  const val2 = [["AM", "AB"], ["AN", "AC"], ["MN", "BC"]].map(([h, b]) => dist(f2.P, h) / dist(f2.P, b));
  v.ok(`2. les trois rapports mesurés sur la figure sont égaux (${val2.map((x) => x.toFixed(4)).join(" ; ")})`, val2.every((x) => Math.abs(x - val2[0]) < 1e-6));
  dit(2, "Réponse : $\\dfrac{DE}{DF} = \\dfrac{DG}{DH} = \\dfrac{EG}{FH}$.");

  const AB3 = plus(D("3.5"), D("1.5"));
  dit(3, `$AB = AM + MB = 3{,}5 + 1{,}5 = ${tex(AB3)}$ cm`);
  const r3 = quot(3, "3.5", tex(AB3));
  v.ok("3. AN/AC mesuré sur la figure = AM/AB", Math.abs(dist(fig(3).P, "AN") / dist(fig(3).P, "AC") - versNombre(r3)) < 1e-6);
  v.ok("3. AB mesuré sur la figure", Math.abs(mesure(fig(3), "AB") - versNombre(AB3)) < 1e-6);
  dit(3, `$\\dfrac{AN}{AC} = ${tex(r3)}$.`);

  q4(4, "AN", 10, 6, 8, { cote: "AN" });
  dit(4, "Réponse : $AN = 7{,}5$ cm.");
  q4(5, "BC", "7.5", 2, 3, { cote: "BC" });
  dit(5, "Réponse : $BC = 5$ cm.");
  q4(6, "MN", "6.5", 4, 10, { cote: "MN" });
  dit(6, "Réponse : $MN = 2{,}6$ cm.");

  recip(7, "2.4", 4, 3, 5, true);
  quot(7, "2.4", 4);
  quot(7, 3, 5);
  dit(7, `$2{,}4 \\times 5 = ${tex(fois(D("2.4"), Q(5)))}$ et $4 \\times 3 = ${4 * 3}$`);

  recip(8, 4, 9, 3, 7, false);
  dit(8, `$4 \\times 7 = ${4 * 7}$ et $9 \\times 3 = ${9 * 3}$`);
  v.ok(`8. l'angle entre (MN) et (BC) dessinées : ${angle(fig(8).P).toFixed(2)}° (moins de 2°, comme écrit)`, angle(fig(8).P) < 2 && c(8).includes("moins de $2$ degrés"));
  v.ok("8. 4/9 et 3/7 écrits avec leurs premières décimales", c(8).includes(`$0{,}${String(Math.floor((4 / 9) * 1000))}\\ldots$`) && c(8).includes(`$0{,}${String(Math.floor((3 / 7) * 1000))}\\ldots$`));
  dit(8, "Réponse : non, $(MN)$ et $(BC)$ ne sont pas parallèles.");

  v.titre("★★ Type devoir");
  quot(9, "4.5", "7.5");
  q4(9, "RV", 9, "4.5", "7.5", { cote: "AN" });
  q4(9, "UV", 6, "4.5", "7.5", { cote: "MN" });
  v.ok("9. le triangle dessiné a RS = 7,5, RT = 9, ST = 6", [["AB", 7.5], ["AC", 9], ["BC", 6]].every(([k2, l]) => Math.abs(dist(fig(9).P, k2) - l) < 1e-4));

  const AB10 = plus(Q(5), Q(3));
  dit(10, `$AB = AM + MB = 5 + 3 = ${tex(AB10)}$ cm`);
  const AC10 = q4(10, "AC", tex(AB10), "7.5", 5);
  const NC10 = moins(AC10, D("7.5"));
  dit(10, `$NC = AC - AN = ${tex(AC10)} - 7{,}5 = ${tex(NC10)}$ cm`);
  v.ok(`10. NC = ${tex(NC10)} mesuré sur la figure`, Math.abs(mesure(fig(10), "NC") - versNombre(NC10)) < 0.01);
  const piege10 = q4(10, "AC", 3, "7.5", 5);
  v.ok("10. le piège AM/MB donne un AC plus court que AN", versNombre(piege10) < 7.5);

  const f11 = fig(11);
  v.ok("11. rectangle en B, (MN) et (BC) verticales, (AB) horizontale, angles droits marqués", vec(f11.P, "B", "C")[0] === 0 && vec(f11.P, "M", "N")[0] === 0 && vec(f11.P, "A", "B")[1] === 0 && /droits: \["B", "M"\]/.test(f11.texte));
  q4(11, "MN", 1, 3, 4, { cote: "MN" });

  recip(12, "2.8", 7, "3.4", "8.5", true);
  quot(12, "2.8", 7);
  quot(12, "3.4", "8.5");
  v.ok("12. le triangle dessiné a BC = 6", Math.abs(dist(fig(12).P, "BC") - 6) < 1e-4);
  q4(12, "MN", 6, "2.8", 7, { cote: "MN" });

  recip(13, "3.2", 8, "2.8", "6.8", false);
  quot(13, "3.2", 8);
  v.ok("13. 2,8 ÷ 6,8 ≈ 0,41 (écrit au centième)", Math.abs(2.8 / 6.8 - 0.41) < 0.005 && c(13).includes("\\dfrac{2{,}8}{6{,}8} \\approx 0{,}41$"));
  dit(13, `$3{,}2 \\times 6{,}8 = ${tex(fois(D("3.2"), D("6.8")))}$ et $8 \\times 2{,}8 = ${tex(fois(Q(8), D("2.8")))}$`);
  dit(13, "Réponse : l'élève a tort");

  const MN14 = q4(14, "MN", 7, 4, 10, { cote: "MN" });
  const copie14 = div(fois(Q(7), Q(10)), Q(4));
  v.ok(`14. la copie (7 × 10 ÷ 4 = ${tex(copie14)}) est écrite dans l'énoncé, et dépasse BC = 7`, enonces[13].includes(`MN = \\dfrac{7 \\times 10}{4} = ${tex(copie14)}$`) && versNombre(copie14) > 7 && !egal(copie14, MN14));
  dit(14, `Réponse : $MN = ${tex(MN14)}$ cm, et non $${tex(copie14)}$ cm.`);

  const k15 = quot(15, "4.8", 12);
  q4(15, "AM", 10, "4.8", 12, { cote: "AM", f: fig(15) });
  q4(15, "MN", 8, "4.8", 12, { cote: "MN", f: fig(15) });
  v.ok("15. le tableau de l'énoncé a deux « ? », celui du corrigé est complet", tableaux(blocs[14]).find((t) => t.role === "figure")?.haut.filter((s) => s === "?").length === 2);
  quot(15, 12, "4.8");
  v.ok("15. le mauvais coefficient donne AM > AB", versNombre(fois(Q(10), div(Q(12), D("4.8")))) > 10 && c(15).includes("$AM = 25$ cm") && egal(fois(Q(10), div(Q(12), D("4.8"))), Q(25)));
  v.ok("15. coefficient 0,4 dans la réponse", egal(k15, D("0.4")) && c(15).includes("le coefficient vaut $0{,}4$ ;"));

  const AC16 = q4(16, "AC", 5, "4.2", 3, { cote: "AC" });
  const BC16 = q4(16, "BC", 5, "2.4", 3, { cote: "BC" });
  const p16a = [Q(3), D("4.2"), D("2.4")].reduce(plus);
  const p16b = [Q(5), AC16, BC16].reduce(plus);
  dit(16, `$3 + 4{,}2 + 2{,}4 = ${tex(p16a)}$`);
  dit(16, `$5 + ${tex(AC16)} + ${tex(BC16)} = ${tex(p16b)}$`);
  const r16 = quot(16, tex(p16a).replace("{,}", "."), tex(p16b));
  v.ok("16. le rapport des périmètres est le coefficient 3/5", egal(r16, Q(3, 5)));
  const f16 = fig(16);
  const perFig = (ks) => ks.reduce((s, k2) => s + mesure(f16, k2), 0);
  v.ok(`16. périmètres mesurés sur la figure : ${perFig(["AM", "AN", "MN"]).toFixed(3)} et ${perFig(["AB", "AC", "BC"]).toFixed(3)}`, Math.abs(perFig(["AM", "AN", "MN"]) - versNombre(p16a)) < 0.02 && Math.abs(perFig(["AB", "AC", "BC"]) - versNombre(p16b)) < 0.02);

  v.titre("★★★ Problèmes");
  const f17b = fig(17, 0);
  const f17c = fig(17, 1);
  v.ok("17. la tente dessinée : AB = AC = 1,25, BC = 1,5, (MN) horizontale", [f17b, f17c].every((f) => Math.abs(dist(f.P, "AB") - 1.25) < 1e-9 && Math.abs(dist(f.P, "AC") - 1.25) < 1e-9 && Math.abs(dist(f.P, "BC") - 1.5) < 1e-9 && vec(f.P, "M", "N")[1] === 0));
  q4(17, "MN", "1.5", "0.5", "1.25", { cote: "MN", f: f17b });
  q4(17, "AM", "1.25", "0.9", "1.5", { cote: "AM", f: f17c });

  const AB18 = plus(D("6.4"), D("11.885"));
  dit(18, `$AB = AM + MB = 6{,}4 + 11{,}885 = ${tex(AB18)}$ m`);
  const BC18 = q4env(18, "BC", tex(AB18).replace("{,}", "."), "0.914", "6.4", "2.61");
  v.ok("18. BC mesuré sur la figure ≈ 2,61", Math.abs(mesure(fig(18), "BC") - BC18) < 0.01);
  const MN18 = q4env(18, "MN", "2.4", "6.4", tex(AB18).replace("{,}", "."), "0.84");
  v.ok("18. à 2,40 m, la balle passe SOUS le haut du filet", MN18 < 0.914);
  v.ok("18. le filet dessiné mesure 0,914 à l'échelle, vertical comme le joueur", Math.abs(mesure(fig(18), "MN") - 0.914) < 1e-3 && vec(fig(18).P, "M", "N")[0] === 0 && vec(fig(18).P, "B", "C")[0] === 0);

  const f19 = fig(19);
  // Figure de principe : les hauteurs sont multipliées par un même nombre, ce
  // qui garde les rapports sur chaque droite. Les longueurs HORIZONTALES sont
  // les vraies, et MN / BC dessinés ont le même rapport que 0,6 / 3.
  v.ok("19. figure déclarée « pas à l'échelle », longueurs au sol exactes", !f19.echelle && Math.abs(dist(f19.P, "AB") - 24) < 1e-9 && Math.abs(dist(f19.P, "AM") - 4.8) < 1e-9);
  v.ok("19. hauteurs dessinées dans le rapport 0,6 / 3", Math.abs(dist(f19.P, "MN") / dist(f19.P, "BC") - 0.6 / 3) < 1e-9);
  const AM19 = q4(19, "AM", 24, "0.6", 3);
  dit(19, `$24 - ${tex(AM19)} = ${tex(moins(Q(24), AM19))}$ m`);
  const AM19b = q4(19, "AM", 24, 1, 3);
  v.ok("19. un tiers de la plage pour 1 m", egal(div(AM19b, Q(24)), Q(1, 3)));
  v.ok("19. la hausse de 0,6 m est dans la fourchette du GIEC (0,28 à 1,01 m)", 0.28 <= 0.6 && 0.6 <= 1.01 && 1 <= 1.01);

  const f20 = fig(20);
  v.ok("20. figure déclarée « pas à l'échelle », diamètres parallèles", !f20.echelle && f20.paralleles);
  const fois20 = div(Q(1400000), Q(3500));
  dit(20, `$1\\,400\\,000 \\div 3\\,500 = ${tex(fois20)}$`);
  const AB20 = q4(20, "AB", "380000", "1400000", "3500");
  dit(20, `$${tex(fois20)} \\times 380\\,000 = ${tex(AB20)}$ km`);
  const faux20 = div(fois(Q(380000), Q(3500)), Q(1400000));
  dit(20, `$AB = ${tex(faux20)}$ km, plus près que la Lune`);
  const ecart = (versNombre(AB20) - 150e6) / 150e6;
  v.ok(`20. écart de ${(ecart * 100).toFixed(2)} % avec 150 millions : « à peine plus de 1 % »`, ecart > 0.01 && ecart < 0.015 && c(20).includes("à peine plus de $1$ %"));
}

lancer({
  nom: "LE THÉORÈME DE THALÈS · 4e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-4e-thales.tsx",
  notionId: "thales_theoreme",
  classe: "4e",
  verifier,
  casses: [
    ["ex. 1 : la figure b) de l'énoncé dessinée parallèle", "N: [3.36, 4.48], noms: { A: \"R\", M: \"S\", B: \"T\", N: \"U\", C: \"V\" }, paralleles: false, neutre: true", "N: [2.88, 3.84], noms: { A: \"R\", M: \"S\", B: \"T\", N: \"U\", C: \"V\" }, paralleles: false, neutre: true"],
    ["ex. 2 : un rapport à l'envers", "Réponse : $\\\\dfrac{DE}{DF} = \\\\dfrac{DG}{DH}", "Réponse : $\\\\dfrac{DE}{DF} = \\\\dfrac{DH}{DG}"],
    ["ex. 3 : AB faux", "3{,}5 + 1{,}5 = 5$ cm", "3{,}5 + 1{,}5 = 6$ cm"],
    ["ex. 4 : N dessiné hors de la parallèle", "M: [6, 0], N: [4.5, 6]", "M: [6, 0], N: [4.8, 6.4]"],
    ["ex. 4 : le tableau porte une autre valeur", "[\"6\", \"!7,5\"]", "[\"6\", \"!8\"]"],
    ["ex. 5 : un papillon en 4e", "M: [3, 0], N: [1.8, 1.6]", "M: [-3, 0], N: [-1.8, -1.6]"],
    ["ex. 6 : MN faux", "\\\\dfrac{6{,}5 \\\\times 4}{10} = 2{,}6$ cm.", "\\\\dfrac{6{,}5 \\\\times 4}{10} = 2{,}8$ cm."],
    ["ex. 7 : produit en croix faux", "$4 \\\\times 3 = 12$", "$4 \\\\times 3 = 13$"],
    ["ex. 8 : dessinées parallèles", "C: [4.2, 5.6], M: [4, 0], N: [1.8, 2.4]", "C: [4.2, 5.6], M: [4, 0], N: [1.866667, 2.488889]"],
    ["ex. 9 : UV faux", "UV = \\\\dfrac{6 \\\\times 4{,}5}{7{,}5} = 3{,}6$", "UV = \\\\dfrac{6 \\\\times 4{,}5}{7{,}5} = 3{,}8$"],
    ["ex. 10 : AM/MB au lieu de AM/AB", "$AC = \\\\dfrac{8 \\\\times 7{,}5}{5} = 12$ cm.", "$AC = \\\\dfrac{3 \\\\times 7{,}5}{5} = 4{,}5$ cm."],
    ["ex. 11 : le pied de soutien penché", "M: [3, 0], N: [3, 0.75]", "M: [3, 0], N: [3.1, 0.775]"],
    ["ex. 12 : une étiquette pas à l'échelle", "AN: \"3,4 cm\", AC: \"AC = 8,5 cm\"", "AN: \"3,5 cm\", AC: \"AC = 8,5 cm\""],
    ["ex. 13 : l'élève a raison (arrondi)", "Réponse : l'élève a tort", "Réponse : l'élève a raison"],
    ["ex. 14 : la copie recopiée", "$MN = \\\\dfrac{7 \\\\times 4}{10} = 2{,}8$ cm.", "$MN = \\\\dfrac{7 \\\\times 10}{4} = 17{,}5$ cm."],
    ["ex. 15 : le coefficient à l'envers", "[\"10\", \"12\", \"8\"], \"0,4\")", "[\"10\", \"12\", \"8\"], \"2,5\")"],
    ["ex. 16 : périmètre faux", "$5 + 7 + 4 = 16$", "$5 + 7 + 4 = 17$"],
    ["ex. 17 : la cordelette pas parallèle au sol", "M: [-0.3, 0.6], N: [0.3, 0.6]", "M: [-0.3, 0.6], N: [0.36, 0.52]"],
    ["ex. 18 : l'arrondi coupé", "\\\\approx 2{,}61$ m.\\nc)", "\\\\approx 2{,}6$ m.\\nc)"],
    ["ex. 18 : la balle passe (conclusion inversée)", "N: [6.4, 0.914]", "N: [6.4, 0.84]"],
    ["ex. 19 : la mer avance de MN", "$AM = \\\\dfrac{24 \\\\times 0{,}6}{3} = 4{,}8$", "$AM = \\\\dfrac{24 \\\\times 0{,}6}{3} = 0{,}6$"],
    ["ex. 20 : un zéro perdu", "= 152\\\\,000\\\\,000$ km.\\n⭐", "= 15\\\\,200\\\\,000$ km.\\n⭐"],
    ["une micro d'une autre notion", "micros: [\"thales_reciproque_verifier\"],", "micros: [\"pythagore_reconnaitre\"],"],
    ["un $ dans une figure", "cotes: { AM: \"3 m\", AB: \"AB = 4 m\"", "cotes: { AM: \"$3$ m\", AB: \"AB = 4 m\""],
  ],
});
