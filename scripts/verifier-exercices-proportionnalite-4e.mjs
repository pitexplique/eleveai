// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Proportionnalité :
// tableaux, coefficient, produit en croix » de 4e
// (lib/fiches-exercices/maths-4e-proportionnalite.tsx).
//
//   node scripts/verifier-exercices-proportionnalite-4e.mjs
//
// ⭐ DEUX CHEMINS pour chaque valeur :
// 1. le calcul, refait ici en fractions EXACTES à partir des données de
//    l'énoncé (recopiées ici), puis le corrigé doit ÉCRIRE la bonne valeur à sa
//    place, dans sa phrase ;
// 2. les DESSINS relus dans le source : chaque `tableauCoef([…], haut, bas,
//    coef)` doit vérifier bas = haut × coef case par case ; chaque case trouvée
//    (« !45 ») doit être une case « ? » du tableau de l'énoncé, et les autres
//    cases doivent recopier l'énoncé ; les graphiques (`repere`) sont évalués :
//    la droite A passe par l'origine, la B non, les points marqués sont sur
//    leur droite ; le cadran de la Terre tourne de 6 h × 15°.
//
// ⚠️ POURQUOI CE SCRIPT NE PASSE PAS PAR `lancer()` DU SOCLE (25/09/2026) :
// `controlesCommuns` lit les micros avec `id`, `label`, `notionId` qui se
// suivent. Dans `lib/tutor-v4/knowledge/maths/4e/microSkills.ts`, la micro
// `prop_defi` porte un COMMENTAIRE entre `id` et `label` (« Le libellé disait…
// ») : le socle n'en lit que cinq sur six, et déclare `prop_defi` « micro
// d'une autre notion » — mesuré, 5 lues. Plutôt que de toucher un fichier
// partagé (d'autres feuilles s'écrivent en parallèle), ce script emprunte les
// briques pures du socle et refait ici la passe et les contrôles négatifs, avec
// une lecture des micros qui tolère les commentaires. Les casses sont jouées EN
// MÉMOIRE, comme là-bas : le fichier n'est jamais touché.

import fs from "node:fs";
import path from "node:path";
import { RACINE, Q, D, fois, div, plus, moins, egal, tex, lireFeuille, creerVerif, outilsCourbes } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-4e-proportionnalite.tsx";
const NOTION = "prop_proportionnalite";

/** Un prix : toujours deux décimales (`8{,}50`), ce que `tex()` ne fait pas. */
function prix(a) {
  const centimes = fois(a, Q(100));
  if (centimes.d !== 1n) throw new Error(`pas un nombre de centimes : ${a.n}/${a.d}`);
  const s = centimes.n.toString().padStart(3, "0");
  return `${s.slice(0, -2)}{,}${s.slice(-2)}`;
}
const N = (x) => (typeof x === "object" ? x : typeof x === "number" && Number.isInteger(x) ? Q(x) : D(String(x)));
const x_ = (a, b) => fois(N(a), N(b));
const d_ = (a, b) => div(N(a), N(b));

/** Une case de tableau : « 1 000 » → 1000, « !7 680 » → 7680, « 2 kg » → 2000 g. */
function caseNombre(s) {
  let t = s.replace(/^!/, "").trim();
  let k = Q(1);
  if (/ kg$/.test(t)) k = Q(1000);
  t = t.replace(/ k?g$/, "").replace(/[\s  ]/g, "");
  return fois(D(t), k);
}
const cellules = (t) => [...t.matchAll(/"([^"]*)"/g)].map((m) => m[1]);

/** Les `tableauCoef(…)` d'un bloc, relus. */
function tableauxCoef(bloc) {
  return [...bloc.matchAll(/tableauCoef\(\[("[^"]*"), ("[^"]*")\], \[([^\]]*)\], \[([^\]]*)\], "([^"]*)"\)/g)].map((m) => ({
    titres: [m[1], m[2]],
    haut: cellules(m[3]),
    bas: cellules(m[4]),
    coef: m[5],
    brut: m[0],
  }));
}
/** Les `tableau([…], […])` d'un bloc, avec leur rôle (figure de l'énoncé ou schéma du corrigé). */
function tableauxSimples(bloc) {
  return [...bloc.matchAll(/\btableau\(\[([^\]]*)\], \[([^\]]*)\]/g)].map((m) => {
    const avant = bloc.slice(0, m.index);
    return {
      role: avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema",
      entete: cellules(m[1]),
      ligne: cellules(m[2]),
    };
  });
}

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const e = (k) => f.enonces[k - 1] ?? "";
  const bloc = (k) => f.blocs[k - 1] ?? "";
  const dit = (k, phrase) => v.ok(`${k}. « ${phrase} »`, c(k).includes(phrase), "absent du corrigé");
  const enonceDit = (k, phrase) => v.ok(`${k}. énoncé : « ${phrase} »`, e(k).includes(phrase), "absent de l'énoncé");
  const courbes = outilsCourbes(v, f, source);

  /** Chaque tableauCoef de l'exercice : bas = haut × coef, et aucune case « ? ». */
  const tableauJuste = (k, attendus = 1) => {
    const ts = tableauxCoef(bloc(k));
    v.ok(`${k}. ${attendus} tableau(x) de proportionnalité dessiné(s)`, ts.length === attendus, `${ts.length} lu(s)`);
    for (const t of ts) {
      const coef = caseNombre(t.coef);
      const fautes = [];
      if (t.haut.length !== t.bas.length) fautes.push("lignes de longueurs différentes");
      t.haut.forEach((h, i) => {
        if (h.includes("?") || (t.bas[i] ?? "").includes("?")) fautes.push(`case « ? » en colonne ${i + 1}`);
        else if (!egal(fois(caseNombre(h), coef), caseNombre(t.bas[i]))) fautes.push(`${h} × ${t.coef} ≠ ${t.bas[i]}`);
      });
      v.ok(`${k}. ${t.titres.join(" / ")} : chaque case du bas = case du haut × ${t.coef}`, fautes.length === 0, fautes.join(" ; "));
      v.ok(`${k}. pas de $ ni de \\ dans le tableau`, !/[$\\]/.test(t.brut));
    }
    return ts;
  };
  /** Le schéma recopie l'énoncé : les cases « ? » de la figure sont exactement les cases trouvées « ! ». */
  const recopie = (k) => {
    const fig = tableauxSimples(bloc(k)).find((t) => t.role === "figure");
    const [t] = tableauxCoef(bloc(k));
    if (!fig || !t) return v.ok(`${k}. figure et schéma relus`, false);
    const haut = fig.entete.slice(1);
    const bas = fig.ligne.slice(1);
    const fautes = [];
    [[haut, t.haut], [bas, t.bas]].forEach(([enonce, schema], ligne) =>
      enonce.forEach((s, i) => {
        const trouvee = (schema[i] ?? "").startsWith("!");
        if (s === "?" && !trouvee) fautes.push(`ligne ${ligne + 1}, colonne ${i + 1} : « ? » non marquée trouvée`);
        if (s !== "?" && trouvee) fautes.push(`ligne ${ligne + 1}, colonne ${i + 1} : donnée marquée trouvée`);
        if (s !== "?" && !egal(caseNombre(s), caseNombre(schema[i] ?? "0"))) fautes.push(`ligne ${ligne + 1}, colonne ${i + 1} : ${s} ≠ ${schema[i]}`);
      }),
    );
    v.ok(`${k}. le tableau du corrigé recopie celui de l'énoncé, cases trouvées = cases « ? »`, fautes.length === 0 && haut.length === t.haut.length, fautes.join(" ; "));
  };
  /** Le schéma de la ligne `k` : un tableau simple, relu. */
  const simple = (k, role = "schema") => tableauxSimples(bloc(k)).find((t) => t.role === role);

  v.titre("★ Un seul geste");
  // 1. 2 → 17 ; 3 → 25,50 ; 5 → 42,50
  {
    const q = [[2, "17"], [3, "25,5"], [5, "42,5"]].map(([n, p]) => d_(p, n));
    v.ok("1. les trois quotients sont égaux", q.every((x) => egal(x, q[0])));
    dit(1, `$17 \\div 2 = ${tex(q[0])}$ ; $25{,}5 \\div 3 = ${tex(q[1])}$ ; $42{,}5 \\div 5 = ${tex(q[2])}$`);
    dit(1, `Le coefficient est $${tex(q[0])}$ : une place coûte $${prix(q[0])}$ €`);
    dit(1, "Réponse : oui");
    const [t] = tableauJuste(1);
    const fig = simple(1, "figure");
    v.ok("1. le tableau de l'énoncé porte les mêmes nombres", !!fig && fig.entete.slice(1).join() === t.haut.join() && fig.ligne.slice(1).join() === t.bas.join());
  }
  // 2. 1 → 3 ; 2 → 5 ; 4 → 9
  {
    const d = [[1, 3], [2, 5], [4, 9]];
    const q = d.map(([h, p]) => d_(p, h));
    v.ok("2. les quotients ne sont pas tous égaux", !q.every((x) => egal(x, q[0])));
    v.ok("2. le tableau est bien régulier : +2 € par heure", egal(d_(9 - 5, 4 - 2), Q(2)) && egal(d_(5 - 3, 2 - 1), Q(2)));
    dit(2, `$3 \\div 1 = ${tex(q[0])}$ ; $5 \\div 2 = ${tex(q[1])}$ ; $9 \\div 4 = ${tex(q[2])}$`);
    dit(2, "Réponse : non");
    const fig = simple(2, "figure");
    const sch = simple(2);
    v.ok("2. l'énoncé porte ces tarifs", !!fig && fig.ligne.slice(1).join() === d.map((x) => x[1]).join() && fig.entete.slice(1).join() === d.map((x) => x[0]).join());
    v.ok("2. le schéma écrit les trois quotients", !!sch && sch.ligne.slice(1).every((s, i) => egal(caseNombre(s), q[i])), sch?.ligne.join());
  }
  // 3. 4 → 6 ; 8, 12, 20 → ?
  {
    const k = d_(6, 4);
    const r = [8, 12, 20].map((h) => x_(h, k));
    v.ok("3. les colonnes : 8 = 2 × 4, 12 = 4 + 8, 20 = 8 + 12", 8 === 2 * 4 && 12 === 4 + 8 && 20 === 8 + 12);
    dit(3, `le double de $6$, soit $${tex(r[0])}$`);
    dit(3, `$6 + 12 = ${tex(plus(Q(6), r[0]))}$`);
    dit(3, `$12 + 18 = ${tex(plus(r[0], r[1]))}$`);
    dit(3, `$6 \\div 4 = ${tex(k)}$`);
    v.ok("3. le piège : 10 ÷ 8 n'est pas le coefficient", !egal(d_(10, 8), k));
    dit(3, `Réponse : les cases valent $${tex(r[0])}$, $${tex(r[1])}$ et $${tex(r[2])}$.`);
    tableauJuste(3);
    recopie(3);
  }
  // 4. 2,5 m → 20 €
  {
    const k = d_(20, "2,5");
    dit(4, `$20 \\div 2{,}5 = ${tex(k)}$`);
    dit(4, `$2{,}5 \\div 20 = ${tex(d_("2,5", 20))}$`);
    dit(4, `Réponse : le coefficient est $${tex(k)}$ ; c'est le prix d'un mètre de tissu, $${tex(k)}$ €.`);
    tableauJuste(4);
  }
  // 5. 4 pots → 30 m² ; 6 pots ?
  {
    const x = d_(x_(30, 6), 4);
    dit(5, `$30 \\times 6 = ${tex(x_(30, 6))}$, puis $180 \\div 4 = ${tex(x)}$`);
    dit(5, `$\\dfrac{30 \\times 4}{6} = ${tex(d_(x_(30, 4), 6))}$`);
    v.ok("5. contrôle : 30 + la moitié de 30", egal(plus(Q(30), d_(30, 2)), x));
    dit(5, `Réponse : avec $6$ pots, on peint $${tex(x)}$ m² de mur.`);
    tableauJuste(5);
  }
  // 6. 4 personnes → 300 g
  {
    const u = d_(300, 4);
    dit(6, `$300 \\div 4 = ${tex(u)}$, soit $${tex(u)}$ g`);
    dit(6, `$7 \\times 75 = ${tex(x_(7, u))}$, soit $${tex(x_(7, u))}$ g`);
    dit(6, `$300 + 3 \\times 75 = ${tex(plus(Q(300), x_(3, u)))}$`);
    dit(6, `Réponse : $${tex(u)}$ g pour une personne, $${tex(x_(7, u))}$ g pour sept personnes.`);
    tableauJuste(6);
  }
  // 7. deux graphiques
  {
    const figs = courbes.reperes(7).filter((r) => r.role === "figure");
    const schs = courbes.reperes(7).filter((r) => r.role === "schema");
    v.ok("7. deux graphiques dans l'énoncé, deux dans le corrigé", figs.length === 2 && schs.length === 2);
    // On évalue les droites dessinées : A passe par l'origine, B non.
    const evalue = (r, x) => {
      const pts = r.courbes[0].pts.map(([a, b]) => [N(a), N(b)]);
      const [[x0, y0], [x1, y1]] = pts;
      return plus(y0, div(fois(moins(N(x), x0), moins(y1, y0)), moins(x1, x0)));
    };
    if (figs.length === 2) {
      v.ok("7. la droite A passe par l'origine", egal(evalue(figs[0], 0), Q(0)));
      v.ok("7. la droite B ne passe pas par l'origine", !egal(evalue(figs[1], 0), Q(0)));
      v.ok("7. A : (2 ; 3) et (4 ; 6)", egal(evalue(figs[0], 2), Q(3)) && egal(evalue(figs[0], 4), Q(6)));
      v.ok("7. B : (2 ; 4) et (4 ; 6), et elle coupe l'axe en 2", egal(evalue(figs[1], 2), Q(4)) && egal(evalue(figs[1], 4), Q(6)) && egal(evalue(figs[1], 0), Q(2)));
      v.ok("7. le corrigé dessine les mêmes droites", schs.length === 2 && JSON.stringify(schs.map((s) => s.courbes)) === JSON.stringify(figs.map((s) => s.courbes)));
    }
    dit(7, `$3 \\div 2 = ${tex(d_(3, 2))}$ et $6 \\div 4 = ${tex(d_(6, 4))}$`);
    dit(7, `$4 \\div 2 = ${tex(d_(4, 2))}$ mais $6 \\div 4 = ${tex(d_(6, 4))}$`);
    dit(7, "coupe l'axe vertical en $2$");
    dit(7, "Réponse : c'est le graphique A");
  }
  // 8. 5 → 3,5 ; ? → 4,9 ; 12 → ?
  {
    const k = d_("3,5", 5);
    dit(8, `$3{,}5 \\div 5 = ${tex(k)}$`);
    dit(8, `$12 \\times 0{,}7 = ${tex(x_(12, k))}$`);
    dit(8, `$4{,}9 \\div 0{,}7 = ${tex(d_("4,9", k))}$`);
    dit(8, `$4{,}9 \\times 0{,}7 = ${tex(x_("4,9", k))}$`);
    dit(8, `Réponse : le coefficient est $${tex(k)}$ ; les cases vides valent $${tex(d_("4,9", k))}$ et $${tex(x_(12, k))}$.`);
    tableauJuste(8);
    recopie(8);
  }

  v.titre("★★ Type devoir");
  // 9. carré : périmètre, aire ; croissants
  {
    v.ok("9. périmètre = 4 × côté : 1 → 4, 3 → 12", 4 * 1 === 4 && 4 * 3 === 12);
    dit(9, "côté $3$ cm, périmètre $12$ cm");
    const sch = simple(9);
    const cotes = sch ? sch.entete.slice(1).map(caseNombre) : [];
    const aires = sch ? sch.ligne.slice(1).map(caseNombre) : [];
    v.ok("9. le tableau des aires : côté × côté", cotes.length === 3 && cotes.every((cc, i) => egal(fois(cc, cc), aires[i])));
    dit(9, `$1 \\div 1 = 1$ mais $4 \\div 2 = ${tex(d_(4, 2))}$`);
    v.ok("9. les quotients des aires changent", !egal(d_(1, 1), d_(4, 2)));
    dit(9, "Réponse : a) oui ; b) non ; c) oui.");
  }
  // 10. confiture : 600 g → 450 g
  {
    const k = d_(450, 600);
    dit(10, `$450 \\div 600 = ${tex(k)}$`);
    dit(10, `$1\\,000 \\times 0{,}75 = ${tex(x_(1000, k))}$`);
    dit(10, `$900 \\div 0{,}75 = ${tex(d_(900, k))}$`);
    dit(10, `$2\\,000 \\times 0{,}75 = ${tex(x_(2000, k))}$`);
    dit(10, `$2 \\times 0{,}75 = ${tex(x_(2, k))}$`);
    dit(10, `Réponse : $${tex(x_(1000, k))}$ g de sucre, $${tex(d_(900, k))}$ g de fruits, $${tex(x_(2000, k))}$ g de sucre.`);
    tableauJuste(10);
    recopie(10);
  }
  // 11. 60 m² → 2,4 kg ; 85 m² ?
  {
    const x = d_(x_("2,4", 85), 60);
    dit(11, `$2{,}4 \\times 85 = ${tex(x_("2,4", 85))}$, puis $204 \\div 60 = ${tex(x)}$`);
    dit(11, `$2{,}4 \\div 60 = ${tex(d_("2,4", 60))}$ kg par m², soit $${tex(x_(d_("2,4", 60), 1000))}$ g par m²`);
    dit(11, `$\\dfrac{60 \\times 85}{2{,}4} = ${tex(d_(x_(60, 85), "2,4"))}$`);
    dit(11, `Réponse : il faut $${tex(x)}$ kg de graines.`);
    tableauJuste(11);
  }
  // 12. 8 baguettes → 1,2 kg
  {
    const u = d_("1,2", 8);
    const max = Math.floor(Number(d_(25, u).n) / Number(d_(25, u).d));
    dit(12, `$1{,}2 \\div 8 = ${tex(u)}$ kg, soit $${tex(x_(u, 1000))}$ g`);
    dit(12, `$50 \\times 0{,}15 = ${tex(x_(50, u))}$, soit $${tex(x_(50, u))}$ kg`);
    v.ok("12. 25 ÷ 0,15 = 166,66… (pas un entier)", egal(d_(25, u), Q(500, 3)));
    dit(12, "$25 \\div 0{,}15 = 166{,}66\\ldots$");
    v.ok("12. l'arrondi par défaut", max === 166 && !(x_(167, u).n * 1n <= 25n * x_(167, u).d));
    dit(12, `$167 \\times 0{,}15 = ${tex(x_(167, u))}$ kg`);
    dit(12, `Réponse : $${tex(x_(50, u))}$ kg de farine pour $50$ baguettes ; $${max}$ baguettes au maximum avec le sac.`);
    tableauJuste(12);
  }
  // 13. le broc : droite passant par l'origine
  {
    const figs = courbes.reperes(13);
    const fig = figs.find((r) => r.role === "figure");
    const sch = figs.find((r) => r.role === "schema");
    const pts = fig ? fig.courbes[0].pts.map(([a, b]) => [N(a), N(b)]) : [[Q(0), Q(0)], [Q(1), Q(0)]];
    const pente = div(moins(pts[1][1], pts[0][1]), moins(pts[1][0], pts[0][0]));
    v.ok("13. la droite dessinée passe par l'origine", egal(pts[0][0], Q(0)) && egal(pts[0][1], Q(0)));
    const lu = fois(pente, Q(4));
    dit(13, `je lis sur l'axe vertical : $${tex(lu)}$ L`);
    dit(13, `$6 \\div 4 = ${tex(d_(lu, 4))}$`);
    dit(13, `$12 \\div 1{,}5 = ${tex(d_(12, pente))}$, soit $${tex(d_(12, pente))}$ brocs`);
    v.ok("13. le piège : 4 ÷ 1,5 ≈ 2,7", Math.abs(4 / 1.5 - 2.7) < 0.05);
    dit(13, "environ $2{,}7$ brocs");
    v.ok("13. le schéma marque (4 ; 6) sur la même droite", !!sch && sch.marques.some((m) => m.x === 4 && m.y === 6) && JSON.stringify(sch.courbes) === JSON.stringify(fig.courbes));
    dit(13, `Réponse : $${tex(lu)}$ L après $4$ brocs ; le coefficient $${tex(pente)}$ est le volume d'un broc ; il faut $${tex(d_(12, pente))}$ brocs pour $12$ L.`);
  }
  // 14. 6 → 15, 10 → 25 ; 16 → ?, 4 → ?
  {
    const k = d_(15, 6);
    v.ok("14. les deux colonnes données ont le même coefficient", egal(k, d_(25, 10)));
    v.ok("14. Tom a tort : 31 ÷ 16 ≠ 2,5", !egal(d_(31, 16), k));
    enonceDit(14, "donc de $25$ j'ajoute aussi $6$ : $31$");
    dit(14, `$16 \\times 2{,}5 = ${tex(x_(16, k))}$ et $4 \\times 2{,}5 = ${tex(x_(4, k))}$`);
    dit(14, `$15 + 25 = ${tex(Q(40))}$`);
    v.ok("14. 16 = 6 + 10 et 4 = 10 − 6, par les colonnes", egal(x_(16, k), Q(15 + 25)) && egal(x_(4, k), Q(25 - 15)));
    dit(14, `$25 - 15 = ${tex(Q(10))}$`);
    dit(14, `$6 \\times 2{,}5 = ${tex(x_(6, k))}$ en bas`);
    dit(14, `Réponse : $16 \\to ${tex(x_(16, k))}$ et $4 \\to ${tex(x_(4, k))}$.`);
    tableauJuste(14);
    recopie(14);
  }
  // 15. jus d'orange
  {
    const p1 = d_("2,70", "1,5");
    const p2 = d_("3,40", 2);
    dit(15, `$2{,}70 \\div 1{,}5 = ${prix(p1)}$ € le litre`);
    dit(15, `$3{,}40 \\div 2 = ${prix(p2)}$ € le litre`);
    v.ok("15. la grande bouteille a le litre le moins cher", p2.n * p1.d < p1.n * p2.d);
    dit(15, "Réponse : la bouteille de $2$ L est la plus avantageuse.");
    tableauJuste(15, 2);
  }
  // 16. les peintres
  {
    enonceDit(16, `$\\dfrac{12 \\times 6}{3} = ${tex(d_(x_(12, 6), 3))}$ jours`);
    const jours = d_(x_(3, 12), 6);
    dit(16, `$12 \\div 2 = ${tex(jours)}$ jours`);
    dit(16, `$3 \\times 12 = ${3 * 12}$ journées de travail ; $6$ peintres pendant $6$ jours, c'est aussi $6 \\times 6 = ${6 * 6}$`);
    const sch = simple(16);
    v.ok("16. le schéma : 3 → 12 et 6 → 6, même produit", !!sch && egal(fois(caseNombre(sch.entete[1]), caseNombre(sch.ligne[1])), fois(caseNombre(sch.entete[2]), caseNombre(sch.ligne[2]))));
    dit(16, `Réponse : ce n'est pas proportionnel ; $6$ peintres mettent $${tex(jours)}$ jours.`);
  }

  v.titre("★★★ Problèmes");
  // 17. la pluie : 12 m², 1 mm = 1 L/m²
  {
    const k = x_(12, 1);
    dit(17, `$15 \\times 12 = ${tex(x_(15, k))}$ : $${tex(x_(15, k))}$ L`);
    dit(17, `$300 \\div 12 = ${tex(d_(300, k))}$, soit $${tex(d_(300, k))}$ mm`);
    dit(17, `$640 \\times 12 = ${tex(x_(640, k))}$`);
    dit(17, `$7\\,680 \\div 300 = ${tex(d_(x_(640, k), 300))}$`);
    dit(17, `Réponse : $${tex(x_(15, k))}$ L ; $${tex(d_(300, k))}$ mm ; environ $${tex(x_(640, k))}$ L par an.`);
    tableauJuste(17);
  }
  // 18. l'orage : 340 m/s
  {
    const k = Q(340);
    dit(18, `$6 \\times 340 = ${tex(x_(6, k))}$`);
    dit(18, `$3 \\times 340 = ${tex(x_(3, k))}$ m`);
    v.ok("18. la règle : 1 020 m à 20 m près de 1 km", egal(moins(x_(3, k), Q(1000)), Q(20)));
    dit(18, "à $20$ m près");
    dit(18, `$5\\,100 \\div 340 = ${tex(d_(5100, k))}$`);
    dit(18, `$12 \\times 340 = ${tex(x_(12, k))}$ m`);
    dit(18, `$4\\,080 - 2\\,040 = ${tex(moins(x_(12, k), x_(6, k)))}$ m`);
    dit(18, `$5{,}1 \\div 340 = ${tex(d_("5,1", k))}$ s`);
    dit(18, `Réponse : $${tex(x_(6, k))}$ m ; la règle est juste ; $${tex(d_(5100, k))}$ s ; l'orage s'est approché de $${tex(moins(x_(12, k), x_(6, k)))}$ m.`);
    tableauJuste(18);
  }
  // 19. Fahrenheit : °F = 1,8 × °C + 32
  {
    const F = (cel) => plus(x_("1,8", cel), Q(32));
    const fig = simple(19, "figure");
    const col = fig ? fig.entete.slice(1).map(caseNombre) : [];
    const fah = fig ? fig.ligne.slice(1).map(caseNombre) : [];
    v.ok("19. le tableau de l'énoncé suit °F = 1,8 × °C + 32", col.length === 4 && col.every((cc, i) => egal(F(cc), fah[i])));
    dit(19, `$0$ °C donne $${tex(F(Q(0)))}$ °F`);
    dit(19, `$50 \\div 10 = ${tex(d_(F(10), 10))}$ mais $68 \\div 20 = ${tex(d_(F(20), 20))}$`);
    dit(19, `$20$ °C font $${tex(F(20))}$ °F, pas $100$ °F`);
    dit(19, `$30 \\times 1{,}8 = ${tex(x_(30, "1,8"))}$, puis $54 + 32 = ${tex(F(30))}$`);
    dit(19, `$50 - 32 = 18$ ; $68 - 32 = 36$ ; $212 - 32 = 180$`);
    v.ok("19. F − 32 = 1,8 × C sur les quatre colonnes", col.every((cc, i) => egal(moins(fah[i], Q(32)), x_("1,8", cc))));
    dit(19, `$18 \\div 10 = ${tex(d_(18, 10))}$ ; $36 \\div 20 = ${tex(d_(36, 20))}$ ; $180 \\div 100 = ${tex(d_(180, 100))}$`);
    const q = simple(19);
    v.ok("19. le schéma des quotients °F ÷ °C", !!q && q.entete.slice(1).every((s, i) => egal(caseNombre(q.ligne[i + 1]), d_(F(caseNombre(s)), caseNombre(s)))), q?.ligne.join());
    dit(19, `$30$ °C font $${tex(F(30))}$ °F ; l'écart`);
    tableauJuste(19);
  }
  // 20. la Terre : 360° en 24 h
  {
    const k = d_(360, 24);
    dit(20, `$360 \\div 24 = ${tex(k)}$, soit $${tex(k)}°$`);
    dit(20, `$6 \\times 15 = ${tex(x_(6, k))}$, soit $${tex(x_(6, k))}°$, un quart de tour`);
    v.ok("20. 90° est un quart de 360°", egal(d_(x_(6, k), 360), Q(1, 4)));
    dit(20, `$45 \\div 15 = ${tex(d_(45, k))}$, soit $${tex(d_(45, k))}$ h plus tard`);
    dit(20, `$15 \\div 60 = ${tex(d_(k, 60))}$, soit $${tex(d_(k, 60))}°$`);
    dit(20, `$1 \\div 0{,}25 = ${tex(d_(1, d_(k, 60)))}$ minutes`);
    dit(20, `Réponse : $${tex(k)}°$ en $1$ h et $${tex(x_(6, k))}°$ en $6$ h ; $${tex(d_(45, k))}$ h plus tard ; $${tex(d_(k, 60))}°$ par minute.`);
    const m = bloc(20).match(/tourDeTerre\((\d+)\)/);
    v.ok("20. le cadran dessine les 6 h de la question a)", !!m && Number(m[1]) === 6);
    v.ok("20. tourDeTerre compte 15° par heure", /const angle = heures \* 15;/.test(source));
    tableauJuste(20);
  }

  v.titre("Les dessins");
  courbes.controlerTout();
  const avecSchema = f.blocs.filter((b) => /\n\s+schema:/.test(b)).length;
  v.ok(`${avecSchema} corrigés dessinés sur 20 (au moins 18)`, avecSchema >= 18);
  const sansReponse = f.corrections.map((t, i) => [i + 1, t.split("\\n").at(-1)] /* les `\n` du source restent écrits, antislash compris */).filter(([, l]) => !l.startsWith("Réponse : "));
  v.ok("les 20 corrigés finissent par une ligne « Réponse : »", sansReponse.length === 0, sansReponse.map(([k]) => k).join(", "));
  const sansPiege = f.corrections.map((t, i) => [i + 1, t]).filter(([, t]) => !t.includes("⛔ Le piège : "));
  v.ok("les 20 corrigés nomment leur piège", sansPiege.length === 0, sansPiege.map(([k]) => k).join(", "));
}

/** Ce qui est vrai de toute feuille — le contrôle commun, avec une lecture des
 *  micros qui tolère un commentaire entre `id` et `label`. */
function controles(source, v) {
  const f = lireFeuille(source);
  v.titre("Le texte de la feuille");
  v.ok("20 énoncés, 20 corrigés", f.enonces.length === 20 && f.corrections.length === 20, `${f.enonces.length} / ${f.corrections.length}`);
  v.ok("8 + 8 + 4 : le format arrêté", JSON.stringify(f.nbParSerie) === "[8,8,4]", JSON.stringify(f.nbParSerie));
  const impaires = f.textes.filter((t) => (t.match(/\$/g) ?? []).length % 2 === 1);
  v.ok(`dollars appariés dans ${f.textes.length} chaînes`, impaires.length === 0, impaires[0]?.slice(0, 120));
  const fuites = f.textes.filter((t) => /[\\^]/.test(t.replace(/\$[^$]*\$/g, "").replace(/\\n/g, "")));
  v.ok("aucune notation LaTeX hors formule", fuites.length === 0, fuites[0]?.slice(0, 120));
  const formules = f.textes.flatMap((t) => t.match(/\$[^$]*\$/g) ?? []);
  const pourcentNu = formules.filter((m) => /(^|[^\\])%/.test(m));
  v.ok(`aucun « % » nu dans ${formules.length} formules`, pourcentNu.length === 0, pourcentNu[0]);
  const lignesCanvas = f.series.split("\n").filter((l) => /tableau\(|tableauCoef\(|repere\(|label:|values:/.test(l));
  const dollarsCanvas = lignesCanvas.filter((l) => l.includes("$"));
  v.ok("aucun $ dans un tableau ou un canvas", dollarsCanvas.length === 0, dollarsCanvas[0]?.trim().slice(0, 120));
  const consignes = [...f.series.matchAll(/consigne: "((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  v.ok("aucune formule dans les 3 consignes (badge du mode classe)", consignes.length === 3 && consignes.every((t) => !/[$\\^]/.test(t)), consignes.find((t) => /[$\\^]/.test(t)));
  // ⛔ Hors notion : ni pourcentage, ni échelle (feuilles voisines).
  const horsSujet = f.enonces.filter((t) => /\\%|%|échelle/.test(t));
  v.ok("aucun pourcentage ni échelle dans les énoncés (notions voisines)", horsSujet.length === 0, horsSujet[0]?.slice(0, 80));

  const cites = new Set([...source.matchAll(/micros: \[([^\]]*)\]/g)].flatMap((m) => (m[1].match(/"([^"]+)"/g) ?? []).map((s) => s.slice(1, -1))));
  const micros = fs.readFileSync(path.join(RACINE, "lib/tutor-v4/knowledge/maths/4e/microSkills.ts"), "utf8");
  // `id`, puis (commentaires permis) `label`, puis (commentaires permis) `notionId`.
  const entre = String.raw`(?:\s*\/\/[^\n]*)*\s*`;
  const deLaNotion = [...micros.matchAll(new RegExp(String.raw`\{\s*id: "([a-z0-9_]+)",${entre}label: "(?:[^"\\]|\\.)*",${entre}notionId: "([a-z0-9_]+)"`, "g"))]
    .filter((m) => m[2] === NOTION)
    .map((m) => m[1]);
  v.ok(`${deLaNotion.length} micros lues pour ${NOTION}`, deLaNotion.length === 6, deLaNotion.join(", "));
  const inconnues = [...cites].filter((id) => !micros.includes(`id: "${id}"`));
  v.ok(`${cites.size} micros citées, toutes connues du coach`, inconnues.length === 0, inconnues.join(", "));
  const sansExercice = deLaNotion.filter((id) => !cites.has(id));
  v.ok("chaque micro de la notion a un exercice", sansExercice.length === 0, sansExercice.join(", "));
  const horsNotion = [...cites].filter((id) => !deLaNotion.includes(id));
  v.ok("aucune micro d'une autre notion", horsNotion.length === 0, horsNotion.join(", "));
}

/* ── La passe, puis les contrôles négatifs EN MÉMOIRE ────────────────────── */

const chemin = path.join(RACINE, FICHIER);
const source = fs.readFileSync(chemin, "utf8");
const passe = (src, bavard) => {
  const v = creerVerif(bavard);
  try {
    verifier(src, v);
  } catch (e) {
    v.ok("le recalcul s'exécute", false, String(e?.stack ?? e));
  }
  controles(src, v);
  return v.erreurs();
};

console.log("\nLA PROPORTIONNALITÉ · 4e · 20 exercices");
const e = passe(source, true);
console.log(e ? `\n✗ ${e} divergence(s)` : "\n✓ les vingt corrigés sont recalculés sans écart");

// [ce qu'on casse, le morceau du SOURCE (antislashs doublés), son remplaçant]
const CASSES = [
  ["ex. 1 : un prix d'énoncé faux sur le dessin", '["17", "25,50", "42,50"], "8,5"', '["17", "25,50", "42"], "8,5"'],
  ["ex. 2 : le parking devient proportionnel dans la conclusion", "Réponse : non, le prix n'est pas proportionnel à la durée.", "Réponse : oui, le prix est proportionnel à la durée."],
  ["ex. 3 : l'écart +2 copié (10 au lieu de 12)", '["6", "!12", "!18", "!30"]', '["6", "!10", "!18", "!30"]'],
  ["ex. 4 : le coefficient pris à l'envers", "Réponse : le coefficient est $8$ ;", "Réponse : le coefficient est $0{,}125$ ;"],
  ["ex. 5 : la mauvaise diagonale", "on peint $45$ m² de mur.", "on peint $20$ m² de mur."],
  ["ex. 6 : 303 g (trois grammes de plus)", "$525$ g pour sept personnes.", "$303$ g pour sept personnes."],
  ["ex. 7 : la droite A ne passe plus par l'origine (énoncé)", "repere([-1, 7, -1, 10], [{ pts: [[0, 0], [6, 9]] }]),\n            repere([-1, 7, -1, 10], [{ pts: [[0, 2], [6, 8]], couleur: ORANGE }]),\n            [\"Graphique A\"", "repere([-1, 7, -1, 10], [{ pts: [[0, 1], [6, 9]] }]),\n            repere([-1, 7, -1, 10], [{ pts: [[0, 2], [6, 8]], couleur: ORANGE }]),\n            [\"Graphique A\""],
  ["ex. 7 : un point marqué hors de sa droite", "[{ x: 2, y: 3 }, { x: 4, y: 6 }, { x: 0, y: 0 }]", "[{ x: 2, y: 4 }, { x: 4, y: 6 }, { x: 0, y: 0 }]"],
  ["ex. 8 : multiplier pour remonter (3,43)", "les cases vides valent $7$ et $8{,}4$.", "les cases vides valent $3{,}43$ et $8{,}4$."],
  ["ex. 8 : une donnée de l'énoncé marquée « trouvée »", '["5", "!7", "12"], ["3,5", "4,9", "!8,4"]', '["5", "!7", "!12"], ["3,5", "4,9", "!8,4"]'],
  ["ex. 10 : 1,5 g au lieu de 1 500 g", '["450", "!750", "900", "!1 500"]', '["450", "!750", "900", "!1,5"]'],
  ["ex. 11 : la mauvaise diagonale écrite", "il faut $3{,}4$ kg de graines.", "il faut $2\\\\,125$ kg de graines."],
  ["ex. 12 : arrondi vers le haut (167)", "$166$ baguettes au maximum avec le sac.", "$167$ baguettes au maximum avec le sac."],
  ["ex. 13 : la droite du broc à 2 L par broc", "[{ pts: [[0, 0], [7, 10.5]] }], [{ x: 4, y: 6", "[{ pts: [[0, 0], [5, 10]] }], [{ x: 4, y: 6"],
  ["ex. 14 : Tom a raison (31)", "Réponse : $16 \\\\to 40$ et", "Réponse : $16 \\\\to 31$ et"],
  ["ex. 15 : le prix au litre de la petite bouteille faux", "$2{,}70 \\\\div 1{,}5 = 1{,}80$ €", "$2{,}70 \\\\div 1{,}5 = 1{,}60$ €"],
  ["ex. 16 : le produit en croix de Léo retenu", "$6$ peintres mettent $6$ jours.", "$6$ peintres mettent $24$ jours."],
  ["ex. 17 : la surface oubliée (15 L)", "Réponse : $180$ L ;", "Réponse : $15$ L ;"],
  ["ex. 18 : 5,1 km sans conversion", '["1", "3", "6", "!15"], ["340", "!1 020", "!2 040", "5 100"]', '["1", "3", "6", "!15"], ["340", "!1 020", "!2 040", "5 000"]'],
  ["ex. 19 : 20 °C « font » 100 °F dans le tableau", '["°F", "32", "50", "68", "212"]', '["°F", "32", "50", "100", "212"]'],
  ["ex. 20 : le cadran à 5 h", "tourDeTerre(6)", "tourDeTerre(5)"],
  ["ex. 20 : 15° par minute", "$0{,}25°$ par minute.", "$15°$ par minute."],
  ["un schéma retiré", "schema: tableau([\"Peintres\", \"3\", \"6\"], [\"Jours\", \"12\", \"6\"]),\n", ""],
  ["un $ dans une consigne", "consigne: \"Des situations réelles.", "consigne: \"Des situations $réelles$."],
  ["une micro d'une autre notion", 'micros: ["prop_quatrieme"],\n        },\n        {\n          enonce: "Pour $4$ personnes', 'micros: ["prop_pourcentage"],\n        },\n        {\n          enonce: "Pour $4$ personnes'],
  ["un corrigé sans sa ligne « Réponse : »", "\\nRéponse : c'est le graphique A qui représente", "\\nDonc : c'est le graphique A qui représente"],
];

console.log("\nContrôles négatifs — joués en mémoire, le fichier n'est jamais touché");
if (e > 0) {
  console.log("  ✗ NON PROBANTS : la passe sur le fichier propre n'est pas verte");
  process.exitCode = 1;
} else {
  let ratees = 0;
  for (const [quoi, avant, apres] of CASSES) {
    const occurrences = source.split(avant).length - 1;
    if (occurrences !== 1) {
      ratees++;
      console.log(`  ✗ NON joué (${occurrences} occurrence(s) du morceau) : ${quoi}`);
      continue;
    }
    const n = passe(source.replace(avant, apres), false);
    if (n > 0) console.log(`  ✓ attrapée (${n} écart${n > 1 ? "s" : ""}) : ${quoi}`);
    else {
      ratees++;
      console.log(`  ✗ PASSÉE INAPERÇUE : ${quoi}`);
    }
  }
  const intact = fs.readFileSync(chemin, "utf8") === source;
  if (!intact) ratees++;
  console.log(`  ${intact ? "✓" : "✗"} le fichier sur le disque est identique à l'octet`);
  console.log(ratees ? `\n✗ ${ratees} contrôle(s) négatif(s) en défaut` : `\n✓ ${CASSES.length} casses sur ${CASSES.length} attrapées`);
  process.exitCode = ratees ? 1 : 0;
}
