// Recalcul indépendant de la feuille « Ratios : simplifier, partager, enchaîner »
// de 4e (02/10/2026) : lib/fiches-exercices/maths-4e-prop-ratio.tsx.
//
// ⭐ Trois étages :
//   1. TOUTE égalité d'un corrigé (« $a = b = c$ », sans lettre) est lue et ses
//      membres comparés en fractions exactes — et une égalité de RATIOS
//      (« $24 : 30 = 4 : 5$ ») est vérifiée terme à terme (mêmes proportions) ;
//   2. chaque dessin est contrôlé pour lui-même : les parts d'une barre redonnent
//      son total, chaque valeur vaut parts × une part, l'écart d'une comparaison
//      vaut la différence des parts × une part, et les textes tiennent dans leur
//      case (8,8 par signe en corps 14 gras) ;
//   3. chaque exercice est RECALCULÉ à partir des nombres lus dans son énoncé ou
//      dans son dessin (simplification par le pgcd, partage, écart, ajout,
//      enchaînement de deux ratios), et la « Réponse : » doit dire ce que le
//      script trouve.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-4e-prop-ratio.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
import { evalTex, tex, Q, D, plus, moins, fois, div, egal, inf } from "./verifier-exercices-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-4e-prop-ratio.tsx", "prop_ratio", ["barre", "comparer", "rectangles", "engrenages", "tableauParts", "table"], "4e");
const { e, vrai, dit, enonceDit, dessin, appels, essai, feuille } = f;

const ev = (s) => evalTex(String(s).replace(/\\div\s*(\([^()]*\)|[\d{},\\]+)/g, "*F{1}{$1}"), Q(0));
const T = (q) => tex(q);
/** Un texte de dessin (« 1 200 € », « 0,25 kg », « !49 ») → fraction exacte, ou null s'il n'a pas de chiffre. */
const n = (s) => {
  const t = String(s).replace(/^!/, "").replace(/[^\d,]/g, "");
  return /\d/.test(t) ? D(t.replace(",", ".")) : null;
};
const meme = (nom, a, b) => vrai(`${nom} : ${a && T(a)} = ${b && T(b)}`, !!a && !!b && egal(a, b));
const somme = (xs) => xs.reduce(plus, Q(0));
const L = (s) => String(s).length * 8.8;

/** Les nombres $…$ d'un texte, dans l'ordre (« $1\,400$ », « $2{,}5$ »). */
const nombres = (txt) => [...txt.matchAll(/\$(\d+(?:\\,\d{3})*(?:\{,\}\d+)?)\$/g)].map((m) => ev(m[1]));
/** Les ratios $a : b$ ou $a : b : c$ d'un texte, dans l'ordre (aussi « fraises : bananes $= 3 : 2$ »). */
const ratios = (txt) => [...txt.matchAll(/\$(?:= )?(\d+(?:\{,\}\d+)?(?: : \d+(?:\{,\}\d+)?)+)\$/g)].map((m) => m[1].split(" : ").map(ev));

/** pgcd de deux entiers BigInt. */
const pgcd = (a, b) => (b === 0n ? (a < 0n ? -a : a) : pgcd(b, a % b));
/** Un ratio de nombres (fractions) → ses plus petits ENTIERS (pgcd), en BigInt. */
function simplifie(r) {
  const den = r.reduce((d, x) => (d * x.d) / pgcd(d, x.d), 1n);
  const ent = r.map((x) => (x.n * den) / x.d);
  const g = ent.reduce((a, b) => pgcd(a, b));
  return ent.map((x) => x / g);
}
const R = (ents) => ents.map(String).join(" : ");
const proportionnels = (a, b) => a.length === b.length && a.every((x, i) => egal(fois(x, b[0]), fois(b[i], a[0])));
/** Partager `total` selon des parts entières : [une part, les quantités]. */
const partage = (total, parts) => {
  const u = div(total, Q(parts.reduce((s, p) => s + BigInt(p), 0n)));
  return [u, parts.map((p) => fois(Q(p), u))];
};

/* ═══ 1. Toutes les égalités des corrigés ═══ */
feuille.corrections.forEach((txt, i) => {
  for (const [, m] of txt.matchAll(/\$([^$]*)\$/g)) {
    if (!m.includes(" = ")) continue;
    const membres = m.split(" = ");
    if (/^[a-z]$/.test(membres[0])) membres.shift();
    if (membres.length < 2 || /\\approx|[a-zA-Z]/.test(membres.join(" ").replace(/\\(times|div|dfrac|,)/g, ""))) continue;
    try {
      if (membres.some((x) => x.includes(" : "))) {
        const rs = membres.map((x) => x.split(" : ").map(ev));
        vrai(`${i + 1}. « ${m} » : ratios égaux`, rs.every((r) => proportionnels(r, rs[0])));
      } else {
        const vals = membres.map(ev);
        vrai(`${i + 1}. « ${m} » : membres égaux`, vals.every((v) => egal(v, vals[0])));
      }
    } catch {
      vrai(`${i + 1}. « ${m} » lisible`, false);
    }
  }
});

/* ═══ 2. Les dessins, chacun pour lui-même ═══ */
for (const { args } of appels("barre").filter((a) => a.args)) {
  const [segs, total, unePart] = args;
  const nb = segs.reduce((s, x) => s + x.parts, 0);
  const u = 260 / nb;
  const vals = segs.map((s) => n(s.valeur));
  if (vals.every(Boolean) && n(total)) meme(`barre ${total} : les parts redonnent le total`, somme(vals), n(total));
  let x = 10;
  let finPrec = 0;
  for (const [i, s] of segs.entries()) {
    if (vals[i] && n(unePart)) meme(`barre ${total} : ${s.nom} = ${s.parts} × ${unePart}`, fois(Q(s.parts), n(unePart)), vals[i]);
    vrai(`barre ${total} : « ${s.nom} » tient dans sa part`, L(s.nom) <= s.parts * u - 4);
    const c = x + (s.parts * u) / 2;
    if (s.valeur) {
      vrai(`barre ${total} : la valeur « ${s.valeur} » ne touche pas sa voisine`, c - L(s.valeur) / 2 >= finPrec + 3 && c + L(s.valeur) / 2 <= 280);
      finPrec = c + L(s.valeur) / 2;
    }
    x += s.parts * u;
  }
  vrai(`barre ${total} : titre et bas dans le cadre`, L(total) <= 270 && L(`1 part = ${unePart}`) <= 270);
}
for (const { args } of appels("comparer").filter((a) => a.args)) {
  const [lignes, unePart, ecart] = args;
  const max = Math.max(...lignes.map((l) => l.parts));
  const min = Math.min(...lignes.map((l) => l.parts));
  const u = 200 / max;
  for (const l of lignes) {
    vrai(`comparer : le nom « ${l.nom} » tient dans sa colonne`, L(l.nom) <= 80);
    const w = l.parts * u;
    const dedans = L(l.valeur) + 8 <= w;
    vrai(`comparer : « ${l.valeur} » tient (dans la barre ou après)`, dedans || 90 + w + 6 + L(l.valeur) <= 298);
    if (n(l.valeur) && n(unePart)) meme(`comparer : ${l.nom} = ${l.parts} × ${unePart}`, fois(Q(l.parts), n(unePart)), n(l.valeur));
  }
  if (ecart && n(unePart)) meme(`comparer : écart = ${max - min} parts × ${unePart}`, fois(Q(max - min), n(unePart)), n(ecart));
  if (ecart) {
    const vals = lignes.map((l) => n(l.valeur));
    if (vals.every(Boolean)) meme("comparer : écart = la plus grande − la plus petite", moins(vals[lignes.findIndex((l) => l.parts === max)], vals[lignes.findIndex((l) => l.parts === min)]), n(ecart));
    vrai("comparer : « écart : … » tient dans 300", L(`écart : ${ecart}`) <= 292);
  }
}
for (const { args } of appels("tableauParts").filter((a) => a.args)) {
  const [, haut, bas, coef] = args;
  haut.forEach((h, i) => meme(`tableauParts : ${h} × ${coef}`, fois(n(h), n(coef)), n(bas[i])));
}
for (const { args } of appels("rectangles").filter((a) => a.args)) {
  const [liste] = args;
  const k = (288 - 14 * (liste.length - 1)) / liste.reduce((s, r) => s + r.L, 0);
  let x = 6;
  let finPrec = 0;
  for (const r of liste) {
    const c = x + (r.L * k) / 2;
    vrai(`rectangles : « ${r.texte} » ne touche pas son voisin`, c - L(r.texte) / 2 >= finPrec + 3 && c + L(r.texte) / 2 <= 300);
    finPrec = c + L(r.texte) / 2;
    x += r.L * k + 14;
  }
}

/* ═══ 3. Chaque exercice recalculé ═══ */
essai("1", () => {
  const [g, p] = nombres(e(1));
  const a = simplifie([g, p]);
  const b = simplifie([p, g]);
  const c = simplifie([g, plus(g, p)]);
  dit(1, `Réponse : a) $${R(a)}$ ; b) $${R(b)}$ ; c) $${R(c)}$.`);
  const [segs, total, unePart] = dessin("barre", 1);
  vrai("1. la barre : les parts du ratio simplifié", segs[0].parts === Number(a[0]) && segs[1].parts === Number(a[1]));
  meme("1. la barre : gagnés", n(segs[0].valeur), g);
  meme("1. la barre : total", n(total), plus(g, p));
  meme("1. la barre : une part", n(unePart), div(g, Q(a[0])));
});
essai("2", () => {
  const [r1, r2] = ratios(e(2));
  const [pause, heures] = nombres(e(2));
  const c = simplifie([pause, fois(heures, Q(60))]);
  dit(2, `Réponse : a) $${R(simplifie(r1))}$ ; b) $${R(simplifie(r2))}$ ; c) $${R(c)}$.`);
  const [, lignes] = dessin("table", 2);
  meme("2. tableau : 45 : 120", n(lignes[2][0].split(" : ")[1]), fois(heures, Q(60)));
  lignes.forEach((l, i) => vrai(`2. tableau ligne ${i + 1} : simplifié`, l[2] === R([simplifie(r1), simplifie(r2), c][i])));
});
essai("3", () => {
  const [r] = ratios(e(3));
  const m = ev(/\$m = (\d+)\$/.exec(e(3))[1]);
  const nn = ev(/\$n = (\d+)\$/.exec(e(3))[1]);
  const nTrouve = fois(div(m, r[0]), r[1]);
  const mTrouve = fois(div(nn, r[1]), r[0]);
  dit(3, `Réponse : a) $\\dfrac{m}{${T(r[0])}} = \\dfrac{n}{${T(r[1])}}$ ; b) $n = ${T(nTrouve)}$ ; c) $m = ${T(mTrouve)}$.`);
  const [, haut, bas] = dessin("tableauParts", 3);
  meme("3. tableau : n", n(bas[1]), nTrouve);
  vrai("3. tableau : les parts", egal(n(haut[0]), r[0]) && egal(n(haut[1]), r[1]));
});
essai("4", () => {
  const [r] = ratios(e(4));
  const [liste] = dessin("rectangles", 4, "figure");
  enonceDit(4, "a) $90$ cm sur $60$ cm.");
  enonceDit(4, "b) $120$ cm sur $75$ cm.");
  enonceDit(4, "c) $1{,}5$ m sur $1$ m.");
  vrai("4. les rectangles redisent l'énoncé (cm)", liste.map((x) => `${x.L}×${x.l}`).join(" ") === "90×60 120×75 150×100");
  const ok = liste.map((x) => egal(div(Q(x.L), r[0]), div(Q(x.l), r[1])));
  const oui = liste.filter((_, i) => ok[i]).map((x) => x.nom);
  const non = liste.filter((_, i) => !ok[i]).map((x) => x.nom);
  dit(4, `Réponse : ${oui.join(") et ")}) respectent le ratio, pas ${non.join(", ")}).`);
  const [, lignes] = dessin("table", 4, "schema");
  // Le tableau écrit c) en mètres : 1,5 ÷ 3 et 1 ÷ 2.
  const enM = [[Q(90), Q(60)], [Q(120), Q(75)], [D("1.5"), Q(1)]];
  lignes.forEach((l, i) => {
    meme(`4. tableau ${l[0]} : longueur ÷ 3`, n(l[1]), div(enM[i][0], r[0]));
    meme(`4. tableau ${l[0]} : largeur ÷ 2`, n(l[2]), div(enM[i][1], r[1]));
  });
});
essai("5", () => {
  const [r] = ratios(e(5));
  const [verre] = nombres(e(5));
  const u = div(verre, r[1]);
  const [bois, metal] = [fois(r[0], u), fois(r[2], u)];
  const tot = somme([bois, verre, metal]);
  dit(5, `Réponse : $${T(bois)}$ perles en bois, $${T(metal)}$ en métal ; $${T(tot)}$ perles en tout.`);
  const [segs] = dessin("barre", 5, "figure");
  vrai("5. la barre : les parts du ratio", segs.every((s, i) => egal(Q(s.parts), r[i])));
});
essai("6", () => {
  const [r] = ratios(e(6));
  const [total] = nombres(e(6));
  const [, [foot, judo]] = partage(total, r.map((x) => x.n));
  dit(6, `Réponse : $${T(foot)}$ € pour le football, $${T(judo)}$ € pour le judo.`);
  const [segs, tot] = dessin("barre", 6, "figure");
  meme("6. la barre : total", n(tot), total);
  vrai("6. la barre : les parts", segs.every((s, i) => egal(Q(s.parts), r[i])));
});
essai("7", () => {
  const [r] = ratios(e(7));
  const [total] = nombres(e(7));
  const [u, [a, b, c]] = partage(total, r.map((x) => x.n));
  dit(7, `Réponse : $${T(a)}$ cordes, $${T(b)}$ cuivres et $${T(c)}$ bois.`);
  dit(7, `$${T(total)} \\div 9 = ${T(u)}$`);
});
essai("8", () => {
  const [r] = ratios(e(8));
  const [terreau, total] = nombres(e(8));
  const sable = fois(div(terreau, r[0]), r[1]);
  const [, [t2, s2]] = partage(total, r.map((x) => x.n));
  dit(8, `Réponse : a) $${T(sable)}$ L de sable ; b) $${T(t2)}$ L de terreau et $${T(s2)}$ L de sable.`);
});
essai("9", () => {
  const [, lignes] = dessin("table", 9, "figure");
  const olym = lignes.map((l) => n(l[1]));
  const sprint = lignes.map((l) => n(l[2]));
  const s = simplifie(olym);
  const parts = s.map((x) => Q(x));
  const qS = sprint.map((x, i) => div(x, parts[i]));
  const longue = nombres(e(9)).slice(-3);
  const qL = longue.map((x, i) => div(x, parts[i]));
  vrai("9. la longue distance : 3,8 ; 180 ; 42,2", T(longue[0]) === "3{,}8" && T(longue[1]) === "180" && T(longue[2]) === "42{,}2");
  const oui = (q) => (q.every((x) => egal(x, q[0])) ? "oui" : "non");
  dit(9, `Réponse : a) $${R(s)}$ ; b) ${oui(qS)} ; c) ${oui(qL)}.`);
  const [, sol] = dessin("table", 9, "schema");
  sol.forEach((l, i) => {
    meme(`9. schéma ${l[0]} : olympique`, n(l[1]), div(olym[i], parts[i]));
    meme(`9. schéma ${l[0]} : sprint`, n(l[2]), qS[i]);
  });
});
essai("10", () => {
  const [r] = ratios(e(10));
  const [ecart] = nombres(e(10));
  const u = div(ecart, moins(r[0], r[1]));
  const [fl, he] = [fois(r[0], u), fois(r[1], u)];
  dit(10, `Réponse : a) $${T(moins(r[0], r[1]))}$ parts ; b) $${T(fl)}$ flamants, $${T(he)}$ hérons, $${T(plus(fl, he))}$ oiseaux.`);
  const [lignes, , ec] = dessin("comparer", 10, "figure");
  vrai("10. le dessin : 7 et 4 parts, écart 27", egal(Q(lignes[0].parts), r[0]) && egal(Q(lignes[1].parts), r[1]) && egal(n(ec), ecart));
});
essai("11", () => {
  const [total, p, a] = nombres(e(11));
  const s = simplifie([p, a]);
  const [, [paul, anne]] = partage(total, s);
  dit(11, `Réponse : a) $${R(s)}$ ; b) Paul paie $${T(paul)}$ €, Anne $${T(anne)}$ €.`);
});
essai("12", () => {
  const [brunes, vertes] = nombres(e(12));
  const [cible] = ratios(e(12));
  const s = simplifie([brunes, vertes]);
  const ajout = moins(fois(div(vertes, cible[1]), cible[0]), brunes);
  dit(12, `Réponse : a) $${R(s)}$ ; b) il doit ajouter $${T(ajout)}$ L de matières brunes.`);
  const [lignes, unePart] = dessin("comparer", 12, "figure");
  vrai("12. le dessin du bac : les parts simplifiées", lignes[0].parts === Number(s[0]) && lignes[1].parts === Number(s[1]));
  meme("12. le dessin du bac : une part", n(unePart), div(brunes, Q(s[0])));
});
essai("13", () => {
  const [r1, r2] = ratios(e(13));
  const S = ev(/\$x \+ y = (\d+)\$/.exec(e(13))[1]);
  const Df = ev(/\$a - b = (\d+)\$/.exec(e(13))[1]);
  const u1 = div(S, plus(r1[0], r1[1]));
  const u2 = div(Df, moins(r2[0], r2[1]));
  dit(13, `Réponse : a) $x = ${T(fois(r1[0], u1))}$ et $y = ${T(fois(r1[1], u1))}$ ; b) $a = ${T(fois(r2[0], u2))}$ et $b = ${T(fois(r2[1], u2))}$.`);
});
essai("14", () => {
  const [b, m, p, total] = nombres(e(14));
  const s = simplifie([b, m, p]);
  const [, [b2, m2, p2]] = partage(total, s);
  dit(14, `Réponse : a) $${R(s)}$ ; b) $${T(b2)}$ ha de blé, $${T(m2)}$ ha de maïs, $${T(p2)}$ ha de prairie ; c) $${T(moins(p2, p))}$ ha.`);
});
essai("15", () => {
  const [[a, b1], [b2, c]] = ratios(e(15));
  const [chev] = nombres(e(15));
  // Le terme commun (chevreuils) ramené au plus petit multiple commun.
  const ppcm = (b1.n * b2.n) / pgcd(b1.n, b2.n);
  const chaine = simplifie([fois(a, Q(ppcm / b1.n)), Q(ppcm), fois(c, Q(ppcm / b2.n))]);
  const u = div(chev, Q(chaine[1]));
  dit(15, `Réponse : a) $${R(chaine)}$ ; b) $${T(fois(Q(chaine[0]), u))}$ carreaux bleus et $${T(fois(Q(chaine[2]), u))}$ carreaux verts.`);
  const [, lignes] = dessin("table", 15);
  vrai("15. tableau : 8, 12, 12, 15", lignes[0][1] === String(chaine[0]) && lignes[1][1] === String(chaine[1]) && lignes[1][2] === String(chaine[1]) && lignes[2][2] === String(chaine[2]));
});
essai("16", () => {
  const [leo, mia] = ratios(e(16));
  const pLeo = div(leo[0], plus(leo[0], leo[1]));
  const pMia = div(mia[0], plus(mia[0], mia[1]));
  vrai("16. le thé de Mia est le plus fort", inf(pLeo, pMia));
  dit(16, `Réponse : a) celui de ${inf(pLeo, pMia) ? "Mia" : "Léo"} ;`);
  const barres = appels("barre", f.bloc(16)).map((x) => x.args);
  vrai("16. les deux barres redisent les ratios", barres.length === 2 && barres[0][0].every((s, i) => egal(Q(s.parts), leo[i])) && barres[1][0].every((s, i) => egal(Q(s.parts), mia[i])));
});
essai("17", () => {
  const lu = (re) => ev(re.exec(e(17))[1]);
  const [pl, pi] = nombres(e(17));
  const tour = lu(/avance de \$([\d{},]+)\$ m/);
  const cadence = lu(/pédale à \$(\d+)\$ tours par minute/);
  const pl2 = lu(/plateau de \$(\d+)\$ dents/);
  const s = simplifie([pl, pi]);
  const roue2 = div(fois(Q(2), pl), pi);
  const roue1 = div(pl, pi);
  const dist = fois(roue1, tour);
  const minute = fois(cadence, dist);
  const heure = div(fois(minute, Q(60)), Q(1000));
  const pignon2 = div(pl2, Q(2));
  dit(17, `Réponse : a) $${R(s)}$ ; b) $${T(roue2)}$ tours, et $${T(roue1)}$ tours pour un tour de pédale ; c) $${T(dist)}$ m ; d) $${T(minute)}$ m, et $${T(heure)}$ km en une heure ; e) $${T(pignon2)}$ dents.`);
  const [a, b] = dessin("engrenages", 17);
  vrai("17. le dessin : 50 et 20 dents", egal(Q(a), pl) && egal(Q(b), pi));
});
essai("18", () => {
  const [r1, r2] = ratios(e(18));
  const [sac, gros] = nombres(e(18));
  const [u, [g, t, fl]] = partage(sac, r1.map((x) => x.n));
  const u2 = div(g, r2[0]);
  vrai("18. les trèfles restent dans le nouveau ratio", egal(fois(r2[1], u2), t));
  const ajout = moins(fois(r2[2], u2), fl);
  const nouveau = plus(sac, ajout);
  const [, [, , fl3]] = partage(gros, r2.map((x) => x.n));
  dit(18, `Réponse : a) $${T(g)}$ kg de graminées, $${T(t)}$ kg de trèfles, $${T(fl)}$ kg de fleurs ; b) $${T(ajout)}$ kg de fleurs ; c) $${T(nouveau)}$ kg, et $${T(fl3)}$ kg de fleurs dans le sac de $${T(gros)}$ kg.`);
  const [lignes, unePart] = dessin("comparer", 18);
  meme("18. le dessin : une part", n(unePart), u);
  vrai("18. le dessin : 6, 3, 1 parts", lignes.every((l, i) => egal(Q(l.parts), r1[i])));
});
essai("19", () => {
  const [[a, b1], [b2, c]] = ratios(e(19));
  const [ecart, benef] = nombres(e(19));
  const ppcm = (b1.n * b2.n) / pgcd(b1.n, b2.n);
  const ch = simplifie([fois(a, Q(ppcm / b1.n)), Q(ppcm), fois(c, Q(ppcm / b2.n))]);
  const u = div(ecart, Q(ch[2] - ch[0]));
  const apports = ch.map((x) => fois(Q(x), u));
  const [, gains] = partage(benef, ch);
  dit(19, `Réponse : a) $${R(ch)}$ ; b) Ana $${T(apports[0])}$ €, Ben $${T(apports[1])}$ €, Chloé $${T(apports[2])}$ € ; c) Ana $${T(gains[0])}$ €, Ben $${T(gains[1])}$ €, Chloé $${T(gains[2])}$ €.`);
  const [segs, tot] = dessin("barre", 19);
  meme("19. la barre : total", n(tot), benef);
  vrai("19. la barre : les parts 3, 4, 6", segs.every((s, i) => s.parts === Number(ch[i])));
});
essai("20", () => {
  const [r] = ratios(e(20));
  const [eau, h, o, atomesH] = nombres(e(20));
  const [, [mH, mO]] = partage(eau, r.map((x) => x.n));
  const besoinO = fois(div(h, r[0]), r[1]);
  vrai("20. l'oxygène suffit", !inf(o, besoinO));
  const masseEau = plus(h, besoinO);
  const reste = moins(o, besoinO);
  // Deux atomes H pèsent 1 part, un atome O 8 parts : O / H = 8 × 2.
  const rapport = div(fois(r[1], atomesH), r[0]);
  dit(20, `Réponse : a) $${T(mH)}$ g d'hydrogène et $${T(mO)}$ g d'oxygène ; b) $${T(masseEau)}$ g d'eau, et il reste $${T(reste)}$ g d'oxygène ; c) $${T(rapport)}$ fois plus lourd.`);
  const [lignes] = dessin("comparer", 20);
  vrai("20. le dessin : 1 et 8 parts", egal(Q(lignes[0].parts), r[0]) && egal(Q(lignes[1].parts), r[1]));
});

f.fin();
