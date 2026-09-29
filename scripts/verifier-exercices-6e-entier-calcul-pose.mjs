// Recalcul indépendant de la feuille « Le calcul posé » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-entier-calcul-pose.tsx.
//
// ⭐ Le script POSE LUI-MÊME chaque opération, comme un élève, colonne par
// colonne : les retenues de l'addition et de la multiplication, les chiffres
// CASSÉS de la soustraction (leur valeur finale), les lignes de la
// multiplication par deux chiffres, et chaque pas de la division en potence.
// Puis il compare, case par case, aux dessins relus dans le source (`pose`,
// `potence`) et cherche dans le corrigé les calculs de chaque colonne. Enfin,
// TOUTE égalité numérique d'un corrigé est recalculée.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-entier-calcul-pose.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-entier-calcul-pose.tsx", "entier_calcul_pose", ["pose", "potence"], "6e");
const { c, e, vrai, dit, dessin, dessins, essai } = f;

/** Une formule LaTeX de nombres → valeur (× ÷ + − et parenthèses seulement), ou null. */
const valeur = (s) => {
  const js = s.replace(/\\times/g, "*").replace(/\\div/g, "/").replace(/\\,/g, "").replace(/\{,\}/g, ".").trim();
  return /^[\d\s+\-*/().]+$/.test(js) ? Function(`return (${js})`)() : null;
};
let total = 0;
for (let k = 1; k <= 20; k++)
  for (const [, formule] of c(k).matchAll(/\$([^$]*=[^$]*)\$/g)) {
    const membres = formule.split("=").map(valeur);
    if (membres.some((m) => m === null)) continue;
    total++;
    vrai(`${k}. $${formule}$ juste`, membres.every((m) => m === membres[0]), membres.join(" / "));
  }
vrai(`au moins 100 égalités recalculées (${total})`, total >= 100);

/** Les entiers d'un texte (« 3\,587 » compris). */
const entiers = (texte) => [...texte.matchAll(/\d+(?:\\,\d{3})*/g)].map((m) => Number(m[0].replace(/\\,/g, "")));
const chiffresDe = (n) => String(n).split("").reverse().map(Number); // [unités, dizaines, …]
/** `dessus` d'un dessin → { rang: texte } (rangs comptés depuis les unités, cases vides ignorées). */
const parRang = (dessus) => Object.fromEntries(dessus.map((d, j) => [dessus.length - 1 - j, d]).filter(([, d]) => d.trim()));
const memeObjet = (a, b) => JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());

/** ADDITION posée : les retenues écrites (rangs où l'un des nombres a un chiffre) et le calcul de chaque colonne. */
function addition(nombres) {
  const ch = nombres.map(chiffresDe);
  const larg = Math.max(...ch.map((x) => x.length));
  const retenues = {}, formules = [];
  let r = 0;
  for (let col = 0; col < larg; col++) {
    const termes = ch.filter((x) => col < x.length).map((x) => x[col]);
    if (r) termes.push(r);
    const s = termes.reduce((a, b) => a + b, 0);
    formules.push(`$${termes.join(" + ")} = ${s}$`);
    r = Math.floor(s / 10);
    if (r && col + 1 < larg) retenues[col + 1] = String(r);
  }
  return { somme: nombres.reduce((a, b) => a + b, 0), retenues, formules };
}
/** SOUSTRACTION posée en cassant : la valeur finale de chaque chiffre du haut modifié, et le calcul de chaque colonne. */
function soustraction(a, b) {
  const cur = chiffresDe(a), bas = chiffresDe(b);
  const change = {}, formules = [];
  for (let col = 0; col < cur.length; col++) {
    const d = bas[col] ?? 0;
    if (cur[col] < d) {
      let k = col + 1;
      while (cur[k] === 0) k++;
      cur[k]--;
      change[k] = true;
      for (let j = k - 1; j > col; j--) {
        cur[j] += 9;
        change[j] = true;
      }
      cur[col] += 10;
      change[col] = true;
    }
    if (col < bas.length) formules.push(`$${cur[col]} - ${d} = ${cur[col] - d}$`);
  }
  const dessus = Object.fromEntries(Object.keys(change).map((k) => [k, String(cur[k])]));
  return { diff: a - b, dessus, formules };
}
/** MULTIPLICATION par un chiffre : les retenues écrites au-dessus et le calcul de chaque chiffre. */
function multUn(a, m) {
  const ch = chiffresDe(a);
  const retenues = {}, formules = [];
  let r = 0;
  ch.forEach((d, col) => {
    const p = d * m;
    formules.push(r ? `$${d} \\times ${m} = ${p}$, plus $${r}$ : $${p + r}$` : `$${d} \\times ${m} = ${p}$`);
    r = Math.floor((p + r) / 10);
    if (r && col + 1 < ch.length) retenues[col + 1] = String(r);
  });
  return { produit: a * m, retenues, formules };
}
/** DIVISION en potence : les lignes [texte, colonne], comme au cahier. */
function division(dvd, dvs) {
  const s = String(dvd);
  let i = 0, cur = 0;
  while (i < s.length && (cur < dvs || i === 0)) {
    cur = cur * 10 + Number(s[i]);
    i++;
    if (cur >= dvs) break;
  }
  let col = i - 1;
  const lignes = [];
  let q = "";
  for (;;) {
    const qq = Math.floor(cur / dvs), r = cur - qq * dvs;
    q += qq;
    lignes.push([`−${qq * dvs}`, col]);
    if (i < s.length) {
      lignes.push([`${r}${s[i]}`, col + 1]);
      cur = r * 10 + Number(s[i]);
      col++;
      i++;
    } else {
      lignes.push([String(r), col]);
      return { quotient: Number(q), reste: r, lignes };
    }
  }
}

/** Relit un `pose(…)` de l'exercice k et le compare à l'opération refaite ici. */
function controlePose(k, args, nom) {
  const [signe, nombres, resultat, opts = {}] = args;
  const ns = nombres.map(Number);
  if (signe === "+") {
    const a = addition(ns);
    vrai(`${k}. ${nom} : ${nombres.join(" + ")} = ${a.somme}`, Number(resultat) === a.somme);
    vrai(`${k}. ${nom} : les retenues écrites`, memeObjet(parRang(opts.dessus ?? []), a.retenues), JSON.stringify(opts.dessus));
    return a;
  }
  if (signe === "−") {
    const s = soustraction(ns[0], ns[1]);
    vrai(`${k}. ${nom} : ${nombres.join(" − ")} = ${s.diff}`, Number(resultat) === s.diff && s.diff >= 0);
    vrai(`${k}. ${nom} : les chiffres cassés`, memeObjet(parRang(opts.dessus ?? []), s.dessus), JSON.stringify(opts.dessus));
    return s;
  }
  const [a, m] = ns;
  vrai(`${k}. ${nom} : ${a} × ${m} = ${a * m}`, Number(resultat) === a * m);
  if (m < 10) {
    const u = multUn(a, m);
    vrai(`${k}. ${nom} : les retenues écrites`, memeObjet(parRang(opts.dessus ?? []), u.retenues), JSON.stringify(opts.dessus));
    return u;
  }
  const lignes = chiffresDe(m).map((d, r) => a * d * 10 ** r);
  vrai(`${k}. ${nom} : les lignes ${lignes.join(" et ")}`, JSON.stringify((opts.partiels ?? []).map(Number)) === JSON.stringify(lignes));
  return { lignes };
}
/** Relit un `potence(…)` et le compare à la division refaite ici. */
function controlePotence(k, args) {
  const [dvd, dvs, q, lignes] = args;
  const d = division(Number(dvd), Number(dvs));
  vrai(`${k}. potence ${dvd} ÷ ${dvs} : quotient ${d.quotient}, reste ${d.reste}`, Number(q) === d.quotient && d.reste < Number(dvs));
  vrai(`${k}. potence ${dvd} ÷ ${dvs} : chaque ligne à sa place`, JSON.stringify(lignes) === JSON.stringify(d.lignes), JSON.stringify(d.lignes));
  vrai(`${k}. potence : dividende = diviseur × quotient + reste`, Number(dvd) === Number(dvs) * d.quotient + d.reste);
  return d;
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [a, b] = entiers(e(1));
  const args = dessin("pose", 1);
  vrai("1. le dessin pose l'énoncé", args[1].map(Number).join() === `${a},${b}`);
  const r = controlePose(1, args, "pose");
  r.formules.forEach((x) => dit(1, x));
  dit(1, `Réponse : $${t(a)} + ${b} = ${t(a + b)}$.`);
});
essai("2", () => {
  const [a, b] = entiers(e(2));
  const args = dessin("pose", 2);
  vrai("2. le dessin pose l'énoncé", args[1].map(Number).join() === `${a},${b}`);
  const r = controlePose(2, args, "pose");
  r.formules.forEach((x) => dit(2, x));
  dit(2, `Réponse : $${t(a)} - ${t(b)} = ${t(a - b)}$.`);
  dit(2, `$${t(a - b)} + ${t(b)} = ${t(a)}$`);
});
essai("3", () => {
  const [a, m] = entiers(e(3));
  const args = dessin("pose", 3);
  vrai("3. le dessin pose l'énoncé", args[1].map(Number).join() === `${a},${m}`);
  const r = controlePose(3, args, "pose");
  r.formules.forEach((x) => dit(3, x));
  dit(3, `Réponse : $${t(a)} \\times ${m} = ${t(a * m)}$.`);
});
essai("4", () => {
  const [a, b] = entiers(e(4));
  const d = controlePotence(4, dessin("potence", 4));
  dit(4, `Le quotient est $${d.quotient}$, le reste est $${d.reste}$.`);
  dit(4, `Réponse : $${a} = ${b} \\times ${d.quotient} + ${d.reste}$.`);
});
essai("5", () => {
  const [a1, b1, r1] = entiers(e(5).split("\\n")[1]);
  const [a2, b2, r2] = entiers(e(5).split("\\n")[2]);
  vrai("5a. juste", a1 - b1 === r1);
  vrai("5b. faux", a2 - b2 !== r2);
  dit(5, `$${r2} + ${b2} = ${t(r2 + b2)}$`);
  dit(5, `Réponse : a) juste ; b) faux, c'est $${a2 - b2}$.`);
  const args = dessin("pose", 5);
  vrai("5. le dessin : la bonne vérification", args[1].map(Number).join() === `${a2 - b2},${b2}` && Number(args[2]) === a2);
  controlePose(5, args, "vérification");
});
essai("6", () => {
  const ns = entiers(e(6));
  const args = dessin("pose", 6);
  vrai("6. le dessin pose l'énoncé", args[1].map(Number).join() === ns.join());
  const r = controlePose(6, args, "pose");
  r.formules.forEach((x) => dit(6, x));
  dit(6, `Réponse : $${ns.map(t).join(" + ")} = ${t(r.somme)}$.`);
  vrai("6. une retenue de 2 aux unités", r.retenues[1] === "2");
});
essai("7", () => {
  const [a, m] = entiers(e(7));
  const args = dessin("pose", 7);
  vrai("7. le dessin pose l'énoncé", args[1].map(Number).join() === `${a},${m}`);
  const { lignes } = controlePose(7, args, "pose");
  dit(7, `$${a} \\times ${m % 10} = ${t(lignes[0])}$`);
  dit(7, `$${t(lignes[0])} + ${t(lignes[1])} = ${t(a * m)}$`);
  dit(7, `Réponse : $${a} \\times ${m} = ${t(a * m)}$.`);
});
essai("8", () => {
  const [a, b] = entiers(e(8));
  const d = controlePotence(8, dessin("potence", 8));
  dit(8, `Le quotient est $${d.quotient}$, le reste est $${d.reste}$.`);
  vrai("8. un 0 dans le quotient", String(d.quotient).includes("0") && d.reste === 0);
  dit(8, `Réponse : $${t(a)} \\div ${b} = ${d.quotient}$.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [stock, recu, prete] = entiers(e(9).split("\\n")[0]);
  const apres = stock + recu, reste = apres - prete;
  const add = addition([stock, recu]);
  vrai("9. les colonnes de l'addition", add.somme === apres);
  dit(9, `Réponse : a) $${t(apres)}$ livres ; b) $${t(reste)}$ livres.`);
  const args = dessin("pose", 9);
  vrai("9. le dessin pose la soustraction", args[1].map(Number).join() === `${apres},${prete}`);
  const s = controlePose(9, args, "soustraction");
  s.formules.forEach((x) => dit(9, x));
});
essai("10", () => {
  const sols = [];
  for (let x = 0; x < 10; x++) for (let y = 0; y < 10; y++) for (let z = 0; z < 10; z++) if (407 + 10 * x + 100 * y + 58 === 610 + z) sols.push([x, y, z]);
  vrai(`10. une seule solution (${JSON.stringify(sols)})`, sols.length === 1);
  const [x, y] = sols[0];
  const a = 407 + 10 * x, b = 100 * y + 58;
  dit(10, `L'addition est $${a} + ${b} = ${a + b}$.`);
  const args = dessin("pose", 10);
  vrai("10. le dessin : l'addition retrouvée", args[1].map(Number).join() === `${a},${b}`);
  controlePose(10, args, "pose");
});
essai("11", () => {
  const [n, prix] = entiers(e(11).split("\\n")[0]);
  const args = dessin("pose", 11);
  vrai("11. le dessin pose 38 × 24", args[1].map(Number).join() === `${n},${prix}`);
  const { lignes } = controlePose(11, args, "pose");
  dit(11, `J'additionne : $${lignes[0]} + ${lignes[1]} = ${n * prix}$.`);
  dit(11, `Réponse : le club paie $${n * prix}$ €.`);
  vrai("11. ordre de grandeur", Math.abs(40 * 25 - n * prix) < 150);
});
essai("12", () => {
  const [dvd, dvs, q, r] = entiers(e(12).split("\\n")[0]);
  vrai("12. l'égalité de Sam est juste", dvs * q + r === dvd);
  vrai("12. mais son reste est trop grand", r >= dvs);
  const d = controlePotence(12, dessin("potence", 12));
  dit(12, `Réponse : quotient $${d.quotient}$, reste $${d.reste}$.`);
  dit(12, `J'ajoute $1$ au quotient : $${q + 1}$. Il reste $${r} - ${dvs} = ${r - dvs}$.`);
});
essai("13", () => {
  const [a, b] = entiers(e(13));
  const args = dessin("pose", 13);
  vrai("13. le dessin pose l'énoncé", args[1].map(Number).join() === `${a},${b}`);
  const s = controlePose(13, args, "pose");
  dit(13, s.formules.join(" ; ") + ".");
  dit(13, `Il reste $${t(a - b)}$ arbres.`);
});
essai("14", () => {
  const [n, cag] = entiers(e(14));
  const d = controlePotence(14, dessin("potence", 14));
  vrai("14. le potence porte l'énoncé", dessin("potence", 14)[0] === String(n) && dessin("potence", 14)[1] === String(cag));
  dit(14, `Réponse : $${d.quotient}$ cagettes.`);
  dit(14, `$${cag} \\times ${d.quotient} = ${n}$`);
});
essai("15", () => {
  const [a, m, ...choix] = entiers(e(15));
  vrai("15. le bon résultat est proposé, seul près de 30 000", choix.includes(a * m) && choix.filter((x) => Math.abs(x - 30000) < 10000).length === 1);
  const args = dessin("pose", 15);
  const { lignes } = controlePose(15, args, "vérification");
  dit(15, `$${a} \\times ${m % 10} = ${t(lignes[0])}$ et $${a} \\times ${m - (m % 10)} = ${t(lignes[1])}$`);
  dit(15, `Réponse : $${a} \\times ${m} = ${t(a * m)}$.`);
});
essai("16", () => {
  const [pers, places] = entiers(e(16));
  const d = controlePotence(16, dessin("potence", 16));
  const cars = Math.ceil(pers / places);
  dit(16, `Réponse : $${pers} = ${places} \\times ${d.quotient} + ${d.reste}$ ; il faut $${cars}$ cars.`);
  vrai("16. le reste oblige à un car de plus", d.reste > 0 && cars === d.quotient + 1);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [eleves, prix] = entiers(e(17).split("\\n")[0]);
  const [aide1, aide2] = entiers(e(17).split("\\n")[2]);
  const tot = eleves * prix, reste = tot - aide1 - aide2, part = reste / eleves;
  vrai("17. le partage tombe juste", Number.isInteger(part));
  dit(17, `Réponse : a) $${t(tot)}$ € ; b) $${t(reste)}$ € ; c) $${part}$ €.`);
  const args = dessin("pose", 17);
  vrai("17. la multiplication posée", args[1].map(Number).join() === `${prix},${eleves}`);
  controlePose(17, args, "multiplication");
  const pot = dessin("potence", 17);
  vrai("17. la division posée", pot[0] === String(reste) && pot[1] === String(eleves));
  controlePotence(17, pot);
  vrai("17. la division est à l'écran seulement", /ecranSeulement\(potence\(/.test(f.bloc(17)));
});
essai("18", () => {
  const [ruches, kg] = entiers(e(18).split("\\n")[0]);
  const prixPot = entiers(e(18).split("\\n")[2]).at(-1);
  const depense = entiers(e(18).split("\\n")[3])[0];
  const miel = ruches * kg, gain = miel * prixPot, reste = gain - depense;
  dit(18, `Réponse : a) $${miel}$ kg ; b) $${t(gain)}$ € ; c) $${reste}$ €.`);
  const args = dessin("pose", 18);
  vrai("18. le dessin pose 252 × 9", args[1].map(Number).join() === `${miel},${prixPot}`);
  const u = controlePose(18, args, "pose");
  u.formules.forEach((x) => dit(18, x));
  // Sans la retenue 4 : les centaines valent 2 × 9 = 18 au lieu de 22.
  const sans = 2 * 9 * 100 + 6 * 10 + 8;
  dit(18, `trouver $${t(sans)}$`);
});
essai("19", () => {
  const [a, m, l1, l2, faux] = entiers(e(19).split("\\n")[0]);
  const vrais = chiffresDe(m).map((d, r) => a * d * 10 ** r);
  vrai("19. la première ligne de Noé est juste", l1 === vrais[0]);
  vrai("19. la deuxième a perdu son 0", l2 * 10 === vrais[1] && l1 + l2 === faux);
  vrai("19. l'ordre de grandeur accuse", 4000 * 30 > 3 * faux);
  const args = dessin("pose", 19);
  controlePose(19, args, "pose corrigée");
  dit(19, `Réponse : $${t(a)} \\times ${m} = ${t(a * m)}$.`);
});
essai("20", () => {
  const [taille, sachets, reste] = entiers(e(20).split("\\n")[0]);
  const n = taille * sachets + reste;
  dit(20, `Elle avait $${n}$ perles.`);
  const d = controlePotence(20, dessin("potence", 20));
  vrai("20. la division redonne 47 et 9", d.quotient === sachets && d.reste === reste && dessin("potence", 20)[0] === String(n));
  dit(20, `Le plus grand reste possible est $${taille - 1}$.`);
  dit(20, `$${taille * sachets} + ${taille - 1} = ${taille * sachets + taille - 1}$`);
});

// Chaque exercice a bien UN dessin d'opération au moins (pose ou potence).
for (let k = 1; k <= 20; k++) vrai(`${k}. une opération dessinée`, dessins("pose", k).length + dessins("potence", k).length >= 1);

f.fin();
