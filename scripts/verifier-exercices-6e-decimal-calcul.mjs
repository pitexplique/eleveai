// Recalcul indépendant de la feuille « Calculer avec les nombres décimaux » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-decimal-calcul.tsx.
//
// ⭐ Calcul EXACT (fractions de verifier-exercices-commun.mjs) : aucun 0,1 + 0,2
// flottant. Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN, jamais
// recopiés ici. Chaque OPÉRATION POSÉE est refaite (somme, différence, produit
// et ses produits partiels) ; chaque DIVISION EN POTENCE est refaite chiffre
// par chiffre, reste abaissé par reste abaissé ; chaque ligne du tableau de
// numération est relue ; chaque flèche du programme de calcul est vérifiée
// dans les deux sens.
// ⭐ Consigne de Frédéric (30/09) : des phrases de 12 mots en moyenne, 20 au
// plus. Le script compte les mots de chaque phrase des énoncés et des corrigés.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-decimal-calcul.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";
import { D, Q, plus, moins, fois, div, egal, tex, versNombre } from "./verifier-exercices-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-decimal-calcul.tsx", "decimal_calcul", ["posee", "potence", "numeration", "demiDroite", "chaine", "table"], "6e");
const { c, e, vrai, dit, enonceDit, dessin, appels, essai, feuille } = f;

/** « 14{,}6 », « 1\,250 », « 14,60 », « 20 » → fraction exacte. */
const X = (s) => D(String(s).replace(/\{,\}/g, ",").replace(/\\,/g, "").replace(/\s/g, "").replace(/\$/g, ""));
/** Les nombres $…$ d'un texte, tels qu'écrits (« 14{,}6 »). */
const brutsDe = (texte) => [...texte.matchAll(/\$(\d[\d\\,{}]*)\$/g)].map((m) => m[1]);
/** Les lignes a), b)… de l'énoncé k. */
const lignesAbc = (k) => e(k).split("\\n").filter((l) => /^[a-e]\) /.test(l));
/** Les formules d'une ligne : « $14{,}6 + 3{,}85$ » → ["14{,}6", "+", "3{,}85"]. */
const operation = (l) => {
  const m = l.match(/\$([\d\\,{}]+) (\+|-|\\times|\\div) ([\d\\,{}]+)\$/);
  return { a: m[1], op: m[2], b: m[3] };
};
const calc = (a, op, b) => (op === "+" ? plus(X(a), X(b)) : op === "-" ? moins(X(a), X(b)) : op === "\\times" ? fois(X(a), X(b)) : div(X(a), X(b)));
const decimales = (s) => (String(s).split(",")[1] ?? "").length;
const sansVirgule = (s) => BigInt(String(s).replace(",", ""));

/* ═════ Les dessins, chacun pour lui-même ═════ */
for (const { args } of appels("posee").filter((a) => a.args)) {
  const [op, nombres, resultat, partiels = []] = args;
  const nom = `posee ${nombres.join(` ${op} `)}`;
  const r = op === "+" ? nombres.map(X).reduce(plus) : op === "−" ? moins(X(nombres[0]), X(nombres[1])) : nombres.map(X).reduce(fois);
  vrai(`${nom} = ${resultat}`, egal(r, X(resultat)));
  if (op !== "×") vrai(`${nom} : autant de chiffres après la virgule partout (zéros écrits)`, [...nombres, resultat].every((s) => decimales(s) === decimales(resultat)));
  else {
    vrai(`${nom} : le résultat a ${decimales(nombres[0]) + decimales(nombres[1])} chiffres après la virgule`, decimales(resultat) === decimales(nombres[0]) + decimales(nombres[1]));
    const [a, b] = nombres.map(sansVirgule);
    const chiffresB = String(b).split("").reverse().map(BigInt);
    if (partiels.length) {
      vrai(`${nom} : un produit partiel par chiffre`, partiels.length === chiffresB.length);
      partiels.forEach((p, k) => vrai(`${nom} : partiel ${k + 1} = ${a} × ${chiffresB[k]} × ${10 ** k}`, BigInt(p) === a * chiffresB[k] * 10n ** BigInt(k)));
      vrai(`${nom} : somme des partiels = ${a} × ${b}`, partiels.map(BigInt).reduce((s, p) => s + p, 0n) === a * b);
    }
  }
  const largeur = Math.max(...[...nombres, ...partiels, resultat].map((s) => s.replace(",", "").length)) + 1;
  vrai(`${nom} : tient en largeur (${largeur} colonnes)`, largeur * 20 <= 260);
}
/** La division posée, refaite : les étapes écrites sous le dividende. */
const refaire = (dividende, diviseur) => {
  const ch = dividende.replace(",", "").split("").map(Number);
  const d = Number(diviseur);
  let k = 0, cur = ch[0];
  while (cur < d && k < ch.length - 1) cur = cur * 10 + ch[++k];
  const etapes = [];
  for (let i = k + 1; i < ch.length; i++) {
    const r = cur % d;
    etapes.push({ texte: `${r}${ch[i]}`, fin: i });
    cur = r * 10 + ch[i];
  }
  etapes.push({ texte: String(cur % d), fin: ch.length - 1 });
  return etapes;
};
for (const { args } of appels("potence").filter((a) => a.args)) {
  const [dividende, diviseur, quotient, etapes] = args;
  const nom = `potence ${dividende} ÷ ${diviseur}`;
  vrai(`${nom} = ${quotient}`, egal(div(X(dividende), X(diviseur)), X(quotient)));
  vrai(`${nom} : le quotient a autant de chiffres après la virgule que le dividende`, decimales(quotient) === decimales(dividende));
  vrai(`${nom} : les restes abaissés (${JSON.stringify(etapes)})`, JSON.stringify(etapes) === JSON.stringify(refaire(dividende, diviseur)));
  vrai(`${nom} : la division tombe juste`, etapes.at(-1).texte === "0");
  vrai(`${nom} : tient en largeur`, dividende.replace(",", "").length * 20 + 12 + Math.max(diviseur.length, quotient.length) * 13 + 16 <= 290);
}
const RANGS = ["C", "D", "U", "d", "c", "m"];
const valeur = (colonnes, chiffres) => {
  const u = colonnes.indexOf("U");
  return X(`${chiffres.slice(0, u + 1).join("") || "0"},${chiffres.slice(u + 1).join("") || "0"}`);
};
for (const { args } of appels("numeration").filter((a) => a.args)) {
  const [colonnes, lignes] = args;
  vrai(`numeration ${colonnes} : des rangs dans l'ordre, six au plus`, colonnes.length <= 6 && colonnes.every((x, i) => i === 0 || RANGS.indexOf(x) === RANGS.indexOf(colonnes[i - 1]) + 1));
  vrai(`numeration ${colonnes} : tient dans 230 px`, colonnes.length * 26 + Math.max(...lignes.map((l) => (l.nom ?? "").length)) * 8 + 14 <= 230);
  for (const li of lignes) {
    vrai(`numeration : un chiffre par case (${li.chiffres})`, li.chiffres.length === colonnes.length && li.chiffres.every((x) => /^\d?$/.test(x)));
    vrai(`numeration : la ligne « ${li.nom} » écrit bien ce nombre`, egal(valeur(colonnes, li.chiffres), X(li.nom)));
  }
}
for (const { args } of appels("demiDroite").filter((a) => a.args)) {
  const [min, max, pas, points, opts = {}] = args;
  const nombres = opts.nombres ?? pas;
  const n = Math.round((max - min) / nombres) + 1;
  vrai(`demiDroite [${min} ; ${max}] : rien sous zéro, ${n} nombres écrits (2 à 11)`, min >= 0 && n >= 2 && n <= 11 && (max - min) / pas <= 60);
  for (const p of points) vrai(`demiDroite : point ${p.value} dans le cadre`, p.value >= min && p.value <= max);
}
/** « × 4 » → la fonction ; « ÷ 4 », « − 1,3 »… */
const fleche = (s) => {
  const [op, n] = s.split(" ");
  return (a) => (op === "×" ? fois(a, X(n)) : op === "÷" ? div(a, X(n)) : op === "+" ? plus(a, X(n)) : moins(a, X(n)));
};
for (const { args } of appels("chaine").filter((a) => a.args)) {
  const [valeurs, aller, retour] = args;
  aller.forEach((a, i) => vrai(`chaine : ${valeurs[i]} ${a} = ${valeurs[i + 1]}`, egal(fleche(a)(X(valeurs[i])), X(valeurs[i + 1]))));
  retour.forEach((r, i) => vrai(`chaine : ${valeurs[i + 1]} ${r} = ${valeurs[i]}`, egal(fleche(r)(X(valeurs[i + 1])), X(valeurs[i]))));
}

/* ═════ Phrases courtes (Frédéric, 30/09 : « ils ont parfois du mal à LIRE ») ═════ */
{
  const phrases = [...feuille.enonces, ...feuille.corrections]
    .flatMap((txt) => txt.split("\\n"))
    .flatMap((l) => l.split(/(?<=[.!?])\s+| ; /))
    .map((p) => ({ p, n: p.replace(/\$[^$]*\$/g, "F").split(/\s+/).filter((m) => /[\p{L}\dF]/u.test(m)).length }))
    .filter((x) => x.n > 0);
  const moyenne = phrases.reduce((s, x) => s + x.n, 0) / phrases.length;
  console.log(`phrases : ${phrases.length}, ${moyenne.toFixed(1)} mots en moyenne, la plus longue ${Math.max(...phrases.map((x) => x.n))}`);
  vrai(`phrases de 13 mots en moyenne au plus (${moyenne.toFixed(1)})`, moyenne <= 13);
  for (const x of phrases) vrai(`phrase de ${x.n} mots, 20 au plus : « ${x.p.slice(0, 70)}… »`, x.n <= 20);
}

/** Réponse : a) … ; b) … construite à partir de résultats exacts. */
const reponse = (rs) => `Réponse : ${rs.map((r, i) => `${"abcde"[i]}) $${tex(r)}$`).join(" ; ")}.`;

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const ops = lignesAbc(1).map(operation);
  const rs = ops.map((o) => calc(o.a, o.op, o.b));
  ops.forEach((o, i) => dit(1, `$${o.a} + ${o.b} = ${tex(rs[i])}$.`));
  dit(1, reponse(rs));
  const [, nombres, resultat] = dessin("posee", 1);
  vrai("1. l'addition posée est le a)", egal(X(nombres[0]), X(ops[0].a)) && egal(X(nombres[1]), X(ops[0].b)) && egal(X(resultat), rs[0]));
});
essai("2", () => {
  const ops = lignesAbc(2).map(operation);
  const rs = ops.map((o) => calc(o.a, o.op, o.b));
  ops.forEach((o, i) => dit(2, `$${o.a} - ${o.b} = ${tex(rs[i])}$.`));
  ops.forEach((o, i) => dit(2, `Contrôle : $${tex(rs[i])} + ${o.b} = ${tex(X(o.a))}$.`));
  dit(2, reponse(rs));
  const [, nombres] = dessin("posee", 2);
  vrai("2. la soustraction posée est le a)", egal(X(nombres[0]), X(ops[0].a)) && egal(X(nombres[1]), X(ops[0].b)));
});
essai("3", () => {
  const ops = lignesAbc(3).map(operation);
  const rs = ops.map((o) => calc(o.a, o.op, o.b));
  ops.forEach((o, i) => {
    dit(3, `$${o.a} \\times ${o.b} = ${tex(rs[i])}$`);
    dit(3, `$${tex(Q(sansVirgule(o.a.replace("{,}", ","))))} \\times ${o.b} = ${tex(Q(sansVirgule(o.a.replace("{,}", ",")) * BigInt(o.b)))}$`);
  });
  dit(3, reponse(rs));
  const [, nombres] = dessin("posee", 3);
  vrai("3. la multiplication posée est le a)", egal(X(nombres[0]), X(ops[0].a)) && nombres[1] === ops[0].b);
});
essai("4", () => {
  const ops = lignesAbc(4).map(operation);
  const rs = ops.map((o) => calc(o.a, o.op, o.b));
  ops.forEach((o) => {
    const [a, b] = [o.a, o.b].map((s) => sansVirgule(s.replace("{,}", ",")));
    dit(4, `$${a} \\times ${b} = ${a * b}$`);
  });
  dit(4, reponse(rs));
  dit(4, "$3{,}50$, soit $3{,}5$");
  const [, nombres] = dessin("posee", 4);
  vrai("4. la multiplication posée est le a)", egal(X(nombres[0]), X(ops[0].a)) && egal(X(nombres[1]), X(ops[0].b)));
});
essai("5", () => {
  const ops = lignesAbc(5).map(operation);
  const rs = ops.map((o) => calc(o.a, o.op, o.b));
  ops.forEach((o, i) => dit(5, `$${o.a} \\div ${tex(div(Q(1), X(o.b)))} = ${tex(rs[i])}$.`));
  dit(5, reponse(rs));
  const [, lignes] = dessin("numeration", 5);
  vrai("5. le tableau : a) puis b)", egal(X(lignes[0].nom), X(ops[0].a)) && egal(X(lignes[1].nom), rs[0]) && egal(X(lignes[2].nom), X(ops[1].a)) && egal(X(lignes[3].nom), rs[1]));
});
essai("6", () => {
  const ops = lignesAbc(6).map(operation);
  const rs = ops.map((o) => calc(o.a, o.op, o.b));
  ops.forEach((o, i) => dit(6, `Donc $${o.a} \\div ${o.b} = ${tex(rs[i])}$.`));
  dit(6, reponse(rs));
  dit(6, `Contrôle du b) : $${tex(rs[1])} \\times ${ops[1].b} = ${ops[1].a}$.`);
  const [dividende, diviseur] = dessin("potence", 6);
  vrai("6. la potence est le b)", egal(X(dividende), X(ops[1].a)) && diviseur === ops[1].b);
});
essai("7", () => {
  const ops = lignesAbc(7).map(operation);
  const rs = ops.map((o) => calc(o.a, o.op, o.b));
  ops.forEach((o, i) => dit(7, `Donc $${o.a} \\div ${o.b} = ${tex(rs[i])}$.`));
  dit(7, reponse(rs));
  const [dividende, diviseur] = dessin("potence", 7);
  vrai("7. la potence est le a)", egal(X(dividende), X(ops[0].a)) && diviseur === ops[0].b);
});
essai("8", () => {
  const lignes = lignesAbc(8);
  const choix = lignes.map((l) => {
    const o = operation(l);
    const exact = calc(o.a, o.op, o.b);
    const options = brutsDe(l.split(" : ")[1]).map(X);
    const arrondi = (s) => Math.round(versNombre(X(s)));
    const estime = versNombre(calc(String(arrondi(o.a)), o.op, String(arrondi(o.b))));
    const proche = options.reduce((p, q) => (Math.abs(versNombre(q) - estime) < Math.abs(versNombre(p) - estime) ? q : p));
    vrai(`8. ${o.a} ${o.op} ${o.b} : l'option la plus proche de ${estime} est le résultat exact`, egal(proche, exact) && options.some((q) => egal(q, exact)));
    dit(8, `Je choisis $${tex(exact)}$.`);
    return { exact, estime };
  });
  dit(8, reponse(choix.map((x) => x.exact)));
  const [, rangees] = dessin("table", 8);
  vrai("8. le tableau : environ et résultat", rangees.every((r, i) => Number(r[1]) === choix[i].estime && egal(X(r[2]), choix[i].exact)));
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const prix = [...e(9).matchAll(/à \$([^$]*)\$ €/g)].map((m) => X(m[1]));
  const total = prix.reduce(plus);
  const billet = X(e(9).match(/billet de \$(\d+)\$/)[1]);
  const rendu = moins(billet, total);
  dit(9, `Elle paie $${tex(total)}$ €.`);
  dit(9, `$20 - ${tex(total)} = ${tex(rendu)}$.`);
  dit(9, `Réponse : a) $${tex(total)}$ € ; b) $${tex(rendu)}$ €.`);
  const [, nombres, resultat] = dessin("posee", 9);
  vrai("9. l'addition posée porte les trois prix", nombres.length === 3 && nombres.every((s, i) => egal(X(s), prix[i])) && egal(X(resultat), total));
});
essai("10", () => {
  const [pour, voulu] = [e(10).match(/pour \$(\d+)\$ personnes demande/)[1], e(10).match(/des crêpes pour \$(\d+)\$ personnes/)[1]].map(Number);
  const k = voulu / pour;
  dit(10, `$${voulu} \\div ${pour} = ${k}$.`);
  const qte = [...e(10).matchAll(/\$([^$]*)\$ (L|kg) de/g)].map((m) => ({ q: m[1], u: m[2] }));
  vrai("10. trois quantités lues", qte.length === 3);
  qte.forEach((x) => dit(10, `$${x.q} \\times ${k} = ${tex(fois(X(x.q), Q(k)))}$ ${x.u}.`));
  const [, rangees] = dessin("table", 10);
  vrai("10. le tableau, ligne par ligne", rangees.every((r, i) => egal(X(r[1].split(" ")[0]), X(qte[i].q)) && egal(X(r[2].split(" ")[0]), fois(X(qte[i].q), Q(k)))));
});
essai("11", () => {
  const somme = X(e(11).match(/restaurant : \$([^$]*)\$/)[1]);
  const q = div(somme, Q(4));
  dit(11, `Chacun paie $${tex(q)}$ €.`);
  dit(11, `$${tex(q)} \\times 4 = ${tex(somme)}$.`);
  const [dividende, diviseur, quotient] = dessin("potence", 11);
  vrai("11. la potence de l'énoncé", egal(X(dividende), somme) && diviseur === "4" && egal(X(quotient), q));
});
essai("12", () => {
  const lignes = lignesAbc(12);
  const rs = lignes.map((l) => {
    const facteur = X(l.match(/\$1\$ \w+ \$= ([^$]*)\$/)[1]);
    const v = X(l.match(/font \$([^$]*)\$/)[1]);
    return fois(v, facteur);
  });
  lignes.forEach((l, i) => dit(12, `= ${tex(rs[i])}$. Cela fait $${tex(rs[i])}$`));
  const [, lignesT] = dessin("numeration", 12);
  vrai("12. le tableau : 175 puis 1,75", egal(X(lignesT[0].nom), Q(175)) && egal(X(lignesT[1].nom), rs[0]));
});
essai("13", () => {
  const base = Q(24);
  const facteurs = lignesAbc(13).map((l) => X(operation(l).b));
  const rs = facteurs.map((k) => fois(base, k));
  facteurs.forEach((k, i) => vrai(`13. ${tex(k)} : plus grand que 24 ssi facteur > 1`, (versNombre(rs[i]) > 24) === versNombre(k) > 1));
  dit(13, reponse(rs));
  const [, , , points] = dessin("demiDroite", 13);
  vrai("13. la droite porte les quatre produits", points.length === 4 && facteurs.every((k, i) => points.some((p) => p.value === versNombre(rs[i]) && p.label === `× ${tex(k).replace("{,}", ",")}`)));
});
essai("14", () => {
  const temps = [...e(14).matchAll(/\$(\d+\{,\}\d+)\$ s/g)].map((m) => X(m[1]));
  const [t1, t2, t3, t4, record] = temps;
  const s12 = plus(t1, t2), s123 = plus(s12, t3), total = plus(s123, t4);
  dit(14, `$11{,}80 + 12{,}05 = ${tex(s12)}$. Puis $${tex(s12)} + 11{,}60 = ${tex(s123)}$.`);
  vrai("14. les sommes intermédiaires", tex(s12) === "23{,}85" && tex(s123) === "35{,}45");
  dit(14, `$35{,}45 + 12{,}30 = ${tex(total)}$`);
  const ecart = moins(record, total);
  vrai("14. le record est battu", versNombre(total) < versNombre(record));
  dit(14, `Réponse : a) $${tex(total)}$ s ; b) oui, de $${tex(ecart)}$ s.`);
  const [, nombres, resultat] = dessin("posee", 14);
  vrai("14. l'addition posée porte les quatre temps", nombres.every((s, i) => egal(X(s), temps[i])) && egal(X(resultat), total));
});
essai("15", () => {
  const q = div(Q(10), Q(8));
  dit(15, `Chaque morceau mesure $${tex(q)}$ m.`);
  const tiers = versNombre(div(Q(10), Q(3)));
  dit(15, `Je garde $${String(Math.round(tiers * 100) / 100).replace(".", "{,}")}$ m.`);
  dit(15, `Contrôle du a) : $8 \\times ${tex(q)} = 10$.`);
  const [dividende, diviseur] = dessin("potence", 15);
  vrai("15. la potence : 10 ÷ 8", egal(X(dividende), Q(10)) && diviseur === "8");
});
essai("16", () => {
  const [L, l] = [...e(16).matchAll(/\$([^$]*)\$ m de/g)].map((m) => m[1]);
  const aire = fois(X(L), X(l));
  const [a, b] = [L, l].map((s) => sansVirgule(s.replace("{,}", ",")));
  dit(16, `$${a} \\times ${b}$`);
  dit(16, `Donc $${a} \\times ${b} = ${a * b}$.`);
  dit(16, `L'aire est $${L} \\times ${l} = ${tex(aire)}$ m².`);
  const est = Math.round(versNombre(X(L))) * Math.round(versNombre(X(l)));
  dit(16, `$4 \\times 2 = ${est}$`);
  const [, nombres] = dessin("posee", 16);
  vrai("16. la multiplication posée est celle du tapis", egal(X(nombres[0]), X(L)) && egal(X(nombres[1]), X(l)));
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const n = Number(e(17).match(/classe de \$(\d+)\$ élèves/)[1]);
  const billet = X(e(17).match(/billet coûte \$([^$]*)\$/)[1]);
  const car = X(e(17).match(/car coûte \$([^$]*)\$/)[1]);
  const don = X(e(17).match(/donnent \$([^$]*)\$/)[1]);
  const billets = fois(billet, Q(n)), parCar = div(car, Q(n)), unEleve = plus(billet, parCar);
  const manque = moins(unEleve, don);
  dit(17, `$12{,}5 \\times ${n} = ${tex(billets)}$.`);
  dit(17, `Chaque élève paie $${tex(parCar)}$ € pour le car.`);
  dit(17, `$12{,}5 + ${tex(parCar)} = ${tex(unEleve)}$ €.`);
  dit(17, `$${tex(unEleve)} - 30 = ${tex(manque)}$ € par élève.`);
  dit(17, `$${tex(manque)} \\times ${n} = ${tex(fois(manque, Q(n)))}$ €.`);
  dit(17, `Réponse : a) $${tex(billets)}$ € ; b) $${tex(parCar)}$ € ; c) $${tex(unEleve)}$ € ; d) $${tex(fois(manque, Q(n)))}$ €.`);
  const [, rangees] = dessin("table", 17);
  const attendu = [[billets, billet], [car, parCar], [plus(billets, car), unEleve]];
  vrai("17. le tableau des dépenses", rangees.every((r, i) => egal(X(r[1].split(" ")[0]), attendu[i][0]) && egal(X(r[2].split(" ")[0]), attendu[i][1])));
});
essai("18", () => {
  const masses = [...e(18).matchAll(/\$([^$]*)\$ kg/g)].map((m) => X(m[1]));
  const total = masses.reduce(plus);
  const confiture = fois(total, D("0.1"));
  const reste = moins(total, confiture);
  const part = div(reste, Q(4));
  dit(18, `Il a récolté $${tex(total)}$ kg.`);
  dit(18, `Il garde $${tex(confiture)}$ kg pour la confiture.`);
  dit(18, `Il reste $${tex(total)} - ${tex(confiture)} = ${tex(reste)}$ kg.`);
  dit(18, `Réponse : a) $${tex(total)}$ kg ; b) $${tex(confiture)}$ kg ; c) $${tex(part)}$ kg.`);
  const [dividende, diviseur, quotient] = dessin("potence", 18);
  vrai("18. la potence : le reste partagé en 4", egal(X(dividende), reste) && diviseur === "4" && egal(X(quotient), part));
});
essai("19", () => {
  const [normal, econome] = [...e(19).matchAll(/\$(\d+\{,\}\d+)\$ L/g)].map((m) => X(m[1]));
  const minutes = Q(Number(e(19).match(/douche \$(\d+)\$ minutes/)[1]));
  const [vn, ve] = [fois(normal, minutes), fois(econome, minutes)];
  const jour = moins(vn, ve), mois = fois(jour, Q(30));
  const litre = div(Q(4), Q(1000));
  const gain = fois(mois, litre);
  dit(19, `Normale : $12{,}5 \\times 8 = ${tex(vn)}$ L. Économe : $7{,}5 \\times 8 = ${tex(ve)}$ L.`);
  dit(19, `$${tex(vn)} - ${tex(ve)} = ${tex(jour)}$ L par jour.`);
  dit(19, `$${tex(jour)} \\times 30 = ${tex(mois)}$ L`);
  dit(19, `$4 \\times 0{,}001 = ${tex(litre)}$ €.`);
  dit(19, `soit $${tex(gain)}$ €.`);
  dit(19, `Réponse : a) $${tex(vn)}$ L et $${tex(ve)}$ L ; b) $${tex(jour)}$ L ; c) $${tex(mois)}$ L ; d) $${tex(litre)}$ € par litre, et $${tex(gain)}$ € en $30$ jours.`);
  const [, rangees] = dessin("table", 19);
  const attendu = [[normal, vn], [econome, ve], [moins(normal, econome), jour]];
  vrai("19. le tableau de la douche", rangees.every((r, i) => egal(X(r[1].split(" ")[0]), attendu[i][0]) && egal(X(r[2].split(" ")[0]), attendu[i][1])));
});
essai("20", () => {
  const [k, ajout, fin] = [...e(20).split("\\n")[0].matchAll(/\$([^$]*)\$/g)].map((m) => X(m[1]));
  const avant = moins(fin, ajout), depart = div(avant, k);
  dit(20, `$11{,}7 - 1{,}3 = ${tex(avant)}$.`);
  dit(20, `$10{,}4 \\div 4 = ${tex(depart)}$.`);
  vrai("20. le programme refait donne 11,7", egal(plus(fois(depart, k), ajout), fin));
  dit(20, `Réponse : a) $${tex(avant)}$ ; b) $${tex(depart)}$.`);
  const [valeurs] = dessin("chaine", 20);
  vrai("20. la chaîne : départ, milieu, arrivée", egal(X(valeurs[0]), depart) && egal(X(valeurs[1]), avant) && egal(X(valeurs[2]), fin));
});

f.fin();
