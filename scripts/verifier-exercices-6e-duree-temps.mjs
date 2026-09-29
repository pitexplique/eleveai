// Recalcul indépendant de la feuille « Horaires et durées » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-duree-temps.tsx.
//
// ⭐ Les nombres sont relus dans l'ÉNONCÉ ou dans le DESSIN (frise, bande,
// table), jamais recopiés ici. Le script compte TOUT en minutes depuis minuit
// (ou en secondes), fait ses calculs sur des entiers, puis réécrit les horaires
// et les durées comme la feuille les écrit ($16$ h $15$, $2$ h $30$ min) et les
// cherche dans le corrigé. Chaque ligne du temps est relue : chaque bond dit
// l'écart entre ses deux horaires (minuit compris), les bonds font le total, et
// rien ne sort du cadre ni ne se touche.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-duree-temps.mjs

import { ouvrir, t } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-duree-temps.tsx", "duree_temps", ["frise", "bande", "table"], "6e");
const { e, vrai, dit, enonceDit, dessin, appels, essai } = f;

const L = (s) => s.length * 8.8;
const nb = (s) => Number(String(s).replace(/\{,\}/g, ".").replace(/\\,/g, "").replace(/\s/g, "").replace(",", "."));
/** « 14 h 35 », « 16 h », « minuit » → minutes depuis minuit. */
const horaire = (s) => {
  if (s === "minuit") return 0;
  const m = /^(\d+) h(?: (\d+))?$/.exec(s);
  if (!m) throw new Error(`horaire illisible : ${s}`);
  return 60 * Number(m[1]) + Number(m[2] ?? 0);
};
/** « 1 h 40 min », « 25 min », « 2 h », « 1 h 10 », « 2 h 08 » → minutes. */
const duree = (s) => {
  const m = /^(?:(\d+) h)? ?(?:(\d+)(?: min)?)?$/.exec(s.trim());
  if (!m || (!m[1] && !m[2])) throw new Error(`durée illisible : ${s}`);
  return 60 * Number(m[1] ?? 0) + Number(m[2] ?? 0);
};
/** Un horaire comme la feuille l'écrit : « $16$ h $15$ », « $11$ h $05$ », « $12$ h ». */
const H = (x) => {
  const m = ((x % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60), mm = m % 60;
  return mm ? `$${h}$ h $${String(mm).padStart(2, "0")}$` : `$${h}$ h`;
};
/** Une durée comme la feuille l'écrit : « $2$ h $30$ min », « $25$ min », « $2$ h ». */
const D = (x) => {
  const h = Math.floor(x / 60), mm = x % 60;
  return h && mm ? `$${h}$ h $${mm}$ min` : h ? `$${h}$ h` : `$${mm}$ min`;
};
/** Les horaires « $9$ h $50$ » d'un texte, en minutes (sans les durées « … min »). */
const horairesDe = (texte) => [...texte.matchAll(/\$(\d+)\$ h(?: \$(\d+)\$)?(?! min)(?! \$\d+\$ min)/g)].map((m) => 60 * Number(m[1]) + Number(m[2] ?? 0));
/** Le premier nombre $…$ après un morceau. */
const apres = (texte, morceau) => {
  const i = texte.indexOf(morceau);
  if (i < 0) throw new Error(`« ${morceau} » introuvable`);
  return nb(/\$([\d\\,{} ]+)\$/.exec(texte.slice(i + morceau.length))[1]);
};
/** L'écart d'un horaire à l'autre, en passant minuit si besoin. */
const ecart = (a, b) => (((b - a) % 1440) + 1440) % 1440;

/* ═════ Toutes les lignes du temps ═════ */
for (const { args } of appels("frise").filter((a) => a.args)) {
  const [hs, sauts, total] = args;
  const nom = `frise ${hs[0]} → ${hs.at(-1)}`;
  vrai(`${nom} : un bond entre deux horaires`, sauts.length === hs.length - 1);
  const m = hs.map(horaire);
  sauts.forEach((s, i) => vrai(`${nom} : ${hs[i]} + ${s} = ${hs[i + 1]}`, ecart(m[i], m[i + 1]) === duree(s)));
  if (total) vrai(`${nom} : les bonds font ${total}`, sauts.reduce((a, s) => a + duree(s), 0) === duree(total));
  // Rendu : mêmes calculs que le dessin.
  const pas = 252 / (hs.length - 1);
  const deuxRangs = Math.max(...hs.map(L)) + 4 > pas;
  sauts.forEach((s) => vrai(`${nom} : « ${s} » tient au-dessus de son bond`, L(s) + 4 <= pas));
  const boites = hs.map((h, i) => {
    const demi = L(h) / 2;
    const cx = Math.min(Math.max(24 + i * pas, demi + 2), 298 - demi);
    return { rang: deuxRangs && i % 2 === 1 ? 1 : 0, g: cx - demi, d: cx + demi };
  });
  boites.forEach((b, i) => {
    vrai(`${nom} : « ${hs[i]} » dans le cadre`, b.g >= 0 && b.d <= 300);
    boites.forEach((c, j) => j > i && b.rang === c.rang && vrai(`${nom} : « ${hs[i]} » et « ${hs[j]} » ne se touchent pas`, c.g >= b.d + 4));
  });
  if (total) vrai(`${nom} : le total tient`, L(`total : ${total}`) <= 290);
}
/* ═════ Toutes les bandes (règles de la feuille de 5e) ═════ */
for (const { args } of appels("bande").filter((a) => a.args)) {
  const [total, morceaux, bornes = []] = args;
  const somme = morceaux.reduce((s, m) => s + m.valeur, 0);
  const u = 276 / somme;
  vrai(`bande ${total} : le titre tient`, L(`total : ${total}`) <= 290);
  vrai(`bande ${total} : une borne par frontière`, bornes.length === 0 || bornes.length === morceaux.length + 1);
  let x = 12, fin = -Infinity;
  for (const m of morceaux) {
    const w = m.valeur * u;
    if (L(m.label) > w - 6) {
      const demi = L(m.label) / 2;
      const cx = Math.min(Math.max(x + w / 2, 12 + demi), 288 - demi);
      vrai(`bande ${total} : « ${m.label} » (dessous) ne touche pas sa voisine`, cx - demi >= fin + 4);
      fin = cx + demi;
    }
    x += w;
  }
  let finB = -Infinity;
  bornes.forEach((b, i) => {
    if (!b) return;
    const xb = 12 + morceaux.slice(0, i).reduce((s, m) => s + m.valeur, 0) * u;
    const [g, d] = i === 0 ? [xb, xb + L(b)] : i === morceaux.length ? [xb - L(b), xb] : [xb - L(b) / 2, xb + L(b) / 2];
    vrai(`bande ${total} : « ${b} » tient et ne touche pas son voisin`, g >= finB + 4 && g >= 0 && d <= 300);
    finB = d;
  });
}

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const [debut] = horairesDe(e(1));
  const d = 60 * apres(e(1), "Il dure") + apres(e(1), "Il dure $1$ h");
  const fin = debut + d;
  const jusqua = 60 - (debut % 60);
  dit(1, `De ${H(debut)} à ${H(debut + jusqua)} : $${jusqua}$ min.`);
  dit(1, `Il reste $${d} - ${jusqua} = ${d - jusqua}$ min, soit ${D(d - jusqua)}.`);
  // Le piège : l'heure pleine suivante, et les minutes additionnées sans retenue.
  dit(1, `écrire « $${Math.floor(debut / 60) + Math.floor(d / 60)}$ h $${(debut % 60) + (d % 60)}$ »`);
  vrai("1. le piège dépasse bien 59 minutes", (debut % 60) + (d % 60) >= 60);
  dit(1, `Réponse : le match finit à ${H(fin)}.`);
  const [hs, , total] = dessin("frise", 1);
  vrai("1. la frise part de l'énoncé et va à la réponse", horaire(hs[0]) === debut && horaire(hs.at(-1)) === fin && duree(total) === d);
});
essai("2", () => {
  const [a, b] = horairesDe(e(2));
  dit(2, `En tout : ${D(Math.floor((b - a) / 60) * 60).replace(" min", "")} et $${60 - (a % 60)} + ${b % 60} = ${60 - (a % 60) + (b % 60)}$ min.`);
  dit(2, `Réponse : la balade a duré ${D(b - a)}.`);
  const [hs, , total] = dessin("frise", 2);
  vrai("2. la frise", horaire(hs[0]) === a && horaire(hs.at(-1)) === b && duree(total) === b - a);
});
essai("3", () => {
  const ds = [120, 4 * 60 + 15, 60 + 45];
  enonceDit(3, "a) $2$ h\\nb) $4$ h $15$ min\\nc) $1$ h $45$ min");
  dit(3, `a) $2 \\times 60 = ${ds[0]}$ min.`);
  dit(3, `b) $4 \\times 60 = 240$, puis $240 + 15 = ${ds[1]}$ min.`);
  dit(3, `c) $60 + 45 = ${ds[2]}$ min.`);
  dit(3, `Réponse : a) $${ds[0]}$ min ; b) $${ds[1]}$ min ; c) $${ds[2]}$ min.`);
  const [, lignes] = dessin("table", 3);
  vrai("3. le tableau", lignes.every((l) => duree(l[0].replace(" min", "")) === nb(l[1]) || duree(l[0]) === nb(l[1])));
});
essai("4", () => {
  const ms = [...e(4).matchAll(/\$(\d+)\$ min/g)].map((m) => Number(m[1]));
  vrai("4. trois durées", ms.length === 3);
  ms.forEach((m, i) => {
    const h = Math.floor(m / 60);
    dit(4, h === 1 ? `$${m} = 60 + ${m % 60}$ : ${D(m)}.` : `$${m} = ${h} \\times 60 + ${m % 60}$ : ${D(m)}.`);
  });
  dit(4, `Réponse : a) ${D(ms[0])} ; b) ${D(ms[1])} ; c) ${D(ms[2])}.`);
  const [total, morceaux] = dessin("bande", 4);
  vrai("4. la bande du b)", morceaux.reduce((s, m) => s + m.valeur, 0) === ms[1] && total === `${ms[1]} min = ${Math.floor(ms[1] / 60)} h ${ms[1] % 60} min`);
});
essai("5", () => {
  const xs = [...e(5).matchAll(/\$(\d+(?:\{,\}\d+)?)\$ h/g)].map((m) => nb(m[1]));
  const mins = xs.map((x) => Math.round(x * 60));
  dit(5, `$1{,}5$ h $= 60 + 30 = ${mins[0]}$ min`);
  dit(5, `$0{,}2 \\times 60 = ${mins[1]}$ min`);
  dit(5, `$2{,}25$ h $= 120 + 15 = ${mins[2]}$ min`);
  dit(5, `Réponse : a) $${mins[0]}$ min ; b) $${mins[1]}$ min ; c) $${mins[2]}$ min.`);
  const [, morceaux, bornes] = dessin("bande", 5);
  let cumul = 0;
  vrai("5. les repères de la bande : 0 ; 0,25 h ; 0,5 h ; 0,75 h ; 1 h", bornes.every((b, i) => {
    const ok = Math.round(nb(b.replace(" h", "")) * 60) === cumul;
    cumul += morceaux[i]?.valeur ?? 0;
    return ok;
  }));
});
essai("6", () => {
  const x = apres(e(6), "durée");
  const m = Math.round(x * 60), faux = 60 + 20;
  dit(6, `$= 0{,}2 \\times 60 = ${m - 60}$ min`);
  dit(6, `Donc $1{,}2$ h $= ${Math.floor(m / 60)}$ h $${m % 60}$ min, et non $1$ h $20$ min.`);
  dit(6, `$1{,}2$ h $= ${m}$ min, mais $1$ h $20$ min $= ${faux}$ min`);
  dit(6, `Réponse : non, Nina se trompe : $1{,}2$ h $= ${D(m).slice(1)}.`);
});
essai("7", () => {
  const s = 60 * apres(e(7), "dure") + apres(e(7), "min");
  const b = apres(e(7), "Une autre dure");
  dit(7, `$3 \\times 60 = 180$, puis $180 + 45 = ${s}$ s.`);
  dit(7, `$${b} = ${Math.floor(b / 60)} \\times 60 + ${b % 60}$ : $${Math.floor(b / 60)}$ min $${b % 60}$ s.`);
  dit(7, `Réponse : a) $${s}$ s ; b) $${Math.floor(b / 60)}$ min $${b % 60}$ s.`);
  const [total, morceaux] = dessin("bande", 7);
  vrai("7. la bande", parseInt(total, 10) === s && morceaux.reduce((a, m) => a + m.valeur, 0) === s);
});
essai("8", () => {
  const d = apres(e(8), "cuire");
  const [pret] = horairesDe(e(8));
  const debut = pret - d;
  dit(8, `Il reste à reculer $${d} - ${pret % 60} = ${d - (pret % 60)}$ min.`);
  dit(8, `Réponse : il faut le mettre au four à ${H(debut)}.`);
  dit(8, `il y a $${d - (pret % 60)} + ${pret % 60} = ${d}$ min`);
  const [hs, , total] = dessin("frise", 8);
  vrai("8. la frise", horaire(hs[0]) === debut && horaire(hs.at(-1)) === pret && duree(total) === d);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const [, lignes] = dessin("table", 9, "figure");
  const [gare, ecole, piscine] = lignes.map((l) => l.slice(1).map(horaire));
  const trajet = piscine[0] - gare[0];
  vrai("9. même trajet pour les deux bus", piscine[1] - gare[1] === trajet);
  dit(9, `En tout : $${trajet}$ min.`);
  const [arrivee, cours] = horairesDe(e(9));
  const bus = gare.findIndex((g) => g >= arrivee);
  vrai("9. c'est le bus B", bus === 1);
  dit(9, `$${60 - (arrivee % 60)} + ${gare[bus] % 60} = ${gare[bus] - arrivee}$ min d'attente`);
  dit(9, `C'est $${cours - ecole[bus]}$ min avant ${H(cours)}`);
  dit(9, `Réponse : $${trajet}$ min ; le bus B, $${gare[bus] - arrivee}$ min d'attente ; oui, de justesse.`);
});
essai("10", () => {
  const j = apres(e(10), "cours"), c = apres(e(10), "il a"), d = apres(e(10), "cours de");
  const n = j * c, tot = n * d;
  dit(10, `$${j} \\times ${c} = ${n}$ cours`);
  dit(10, `$${n} \\times ${d} = ${t(tot)}$ min`);
  dit(10, `$${Math.floor(tot / 60)} \\times 60 = ${t(Math.floor(tot / 60) * 60)}$`);
  dit(10, `$${t(tot)}$ min $= ${Math.floor(tot / 60)}$ h $${tot % 60}$ min`);
  dit(10, `Réponse : $${n}$ cours ; $${t(tot)}$ min ; ${D(tot)}.`);
});
essai("11", () => {
  const j = apres(e(11), "dans"), h = apres(e(11), "Écris"), js = apres(e(11), "c) Écris");
  dit(11, `a) $${j} \\times 24 = ${j * 24}$ h.`);
  dit(11, `b) $${Math.floor(h / 24)} \\times 24 = ${Math.floor(h / 24) * 24}$, et $${h} - ${Math.floor(h / 24) * 24} = ${h % 24}$`);
  dit(11, `c) $${Math.floor(js / 7)} \\times 7 = ${Math.floor(js / 7) * 7}$, et $${js} - ${Math.floor(js / 7) * 7} = ${js % 7}$`);
  dit(11, `Réponse : a) $${j * 24}$ h ; b) $${Math.floor(h / 24)}$ jours et $${h % 24}$ h ; c) $${Math.floor(js / 7)}$ semaines et $${js % 7}$ jours.`);
});
essai("12", () => {
  const x = apres(e(12), "trajet de");
  const [dep] = horairesDe(e(12));
  const d = Math.round(x * 60), arr = dep + d;
  dit(12, `Donc $2{,}75$ h $= ${D(d).slice(1)}.`);
  dit(12, `Réponse : a) ${D(d)} ; b) on arrive à ${H(arr)}.`);
  const [hs, , total] = dessin("frise", 12);
  vrai("12. la frise", horaire(hs[0]) === dep && horaire(hs.at(-1)) === arr && duree(total) === d);
});
essai("13", () => {
  const n1 = apres(e(13), "Inès fait"), d1 = apres(e(13), "natation de"), n2 = apres(e(13), "Son frère fait");
  const d2 = 60 * apres(e(13), "foot de") + apres(e(13), "foot de $1$ h");
  dit(13, `Inès : $${n1} \\times ${d1} = ${n1 * d1}$ min.`);
  dit(13, `$2 \\times ${d2} = ${n2 * d2}$ min`);
  dit(13, `$${n2 * d2} - ${n1 * d1} = ${n2 * d2 - n1 * d1}$ min.`);
  vrai("13. le frère fait plus", n2 * d2 > n1 * d1);
  dit(13, `Réponse : son frère fait $${n2 * d2 - n1 * d1}$ min de plus.`);
  const [, lignes] = dessin("table", 13);
  vrai("13. le tableau", duree(lignes[0][2]) === n1 * d1 && duree(lignes[1][2]) === n2 * d2);
});
essai("14", () => {
  const [a, b] = horairesDe(e(14));
  const d = ecart(a, b);
  dit(14, `Réponse : la traversée dure ${D(d)}.`);
  const [hs] = dessin("frise", 14);
  vrai("14. la frise passe par minuit", hs.includes("minuit") && horaire(hs[0]) === a && horaire(hs.at(-1)) === b);
});
essai("15", () => {
  const p = apres(e(15), "préparer"), c = 60 * apres(e(15), "cuire") + apres(e(15), "cuire $1$ h"), r = apres(e(15), "reposer");
  const [dep] = horairesDe(e(15));
  const tot = p + c + r;
  dit(15, `Plus $1$ h : ${D(tot)}.`);
  dit(15, `${H(dep + p)}.`);
  dit(15, `${H(dep + p).slice(0, -1)} + 1$ h $10$ min $= ${H(dep + p + c).slice(1)}.`);
  dit(15, `Contrôle : ${H(dep).slice(0, -1)} + 1$ h $50$ min $= ${H(dep + tot).slice(1)}.`);
  dit(15, `Réponse : a) ${D(tot)} ; b) le gratin est prêt à ${H(dep + tot)}.`);
  const [hs] = dessin("frise", 15);
  vrai("15. la frise : les trois étapes", JSON.stringify(hs.slice(1).map(horaire)) === JSON.stringify([dep + p, dep + p + c, dep + tot]));
});
essai("16", () => {
  const s = apres(e(16), "a duré");
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  dit(16, `$${t(s)} - 3\\,600 = ${s - 3600}$ s`);
  dit(16, `$${s % 3600} = ${m} \\times 60 + ${sec}$`);
  dit(16, `Réponse : $${h}$ h $${m}$ min $${sec}$ s.`);
  const [, lignes] = dessin("table", 16);
  vrai("16. le tableau", nb(lignes[0][1]) === 3600 && nb(lignes[1][1]) === s - 3600 && nb(lignes[2][1]) === 60 * m && nb(lignes[3][1]) === sec);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const [, lignes] = dessin("table", 17, "figure");
  const [[d1, a1], [d2, a2]] = lignes.map((l) => l.slice(1).map(horaire));
  const retard = apres(e(17), "a");
  dit(17, `soit $${Math.floor((a1 - d1) / 60)}$ h $${(a1 - d1) % 60}$ min`);
  dit(17, `Elle attend $${d2 - a1}$ min.`);
  dit(17, `En tout : ${D(a2 - d1)}.`);
  dit(17, `Avec le retard : ${H(a1).slice(0, -1)} + ${retard}$ min $= ${H(a1 + retard).slice(1)}.`);
  vrai("17. elle rate le train", a1 + retard > d2);
  dit(17, `Réponse : $${Math.floor((a1 - d1) / 60)}$ h $${(a1 - d1) % 60}$ min ; $${d2 - a1}$ min ; ${D(a2 - d1)} ; non, elle rate le deuxième train.`);
  const [hs] = dessin("frise", 17);
  vrai("17. la frise", JSON.stringify(hs.map(horaire)) === JSON.stringify([d1, a1, d2, a2]));
});
essai("18", () => {
  const x = apres(e(18), "marathon en"), amie = 60 * apres(e(18), "Son amie met") + apres(e(18), "Son amie met $3$ h");
  const [dep] = horairesDe(e(18));
  const d = Math.round(x * 60);
  dit(18, `a) $3{,}5$ h, c'est $3$ h et une demi-heure : ${D(d)}.`);
  dit(18, `${D(amie).slice(0, -4)} min $- ${D(d).slice(1, -4)} min $= ${amie - d}$ min.`);
  dit(18, `${H(dep).slice(0, -1)} + 3$ h $= ${H(dep + 180).slice(1)}.`);
  dit(18, `Elle arrive $${amie - d}$ min après lui : ${H(dep + d).slice(0, -1)} + ${amie - d}$ min $= ${H(dep + amie).slice(1)}.`);
  dit(18, `Réponse : a) ${D(d)} ; b) ${H(dep + d)} ; c) $${amie - d}$ min ; d) ${H(dep + amie)}.`);
  const [hs, , total] = dessin("frise", 18);
  vrai("18. la frise", horaire(hs[0]) === dep && hs.map(horaire).includes(dep + d) && horaire(hs.at(-1)) === dep + amie && duree(total) === amie);
});
essai("19", () => {
  const [couche, leve, samedi] = horairesDe(e(19));
  const nuits = apres(e(19), "pareil");
  const d = ecart(couche, leve);
  dit(19, `En tout : ${D(d)}.`);
  const h5 = nuits * Math.floor(d / 60), m5 = nuits * (d % 60);
  dit(19, `$${nuits} \\times ${Math.floor(d / 60)} = ${h5}$ h et $${nuits} \\times ${d % 60} = ${m5}$ min.`);
  dit(19, `En tout : ${D(nuits * d)}.`);
  dit(19, `De ${H(samedi)} à minuit : $${ecart(samedi, 0)}$ min.`);
  dit(19, `Réponse : a) ${D(d)} ; b) ${D(nuits * d)} ; c) ${H(samedi + d)}.`);
});
essai("20", () => {
  const mo = apres(e(20), "montée"), pa = apres(e(20), "pause"), de = apres(e(20), "descente");
  const [dep, limite] = horairesDe(e(20));
  const [m1, m2] = [Math.round(mo * 60), Math.round(de * 60)];
  const refuge = dep + m1, repart = refuge + pa, retour = repart + m2;
  dit(20, `$2{,}5$ h $= ${D(m1).slice(1)}.`);
  dit(20, `$1{,}75$ h $= ${D(m2).slice(1)}, car`);
  dit(20, `$= ${H(refuge).slice(1)}.`);
  dit(20, `$= ${H(repart).slice(1)}.`);
  dit(20, `$= ${H(retour).slice(1)}.`);
  dit(20, `Soit ${D(limite - retour)} d'avance.`);
  dit(20, `Réponse : a) ${D(m1)} et ${D(m2)} ; b) ${H(refuge)}, puis ${H(repart)}.`);
  dit(20, `c) ${H(retour)} ; d) ${D(limite - retour)} d'avance.`);
  const [hs, , total] = dessin("frise", 20);
  vrai("20. la frise", JSON.stringify(hs.map(horaire)) === JSON.stringify([dep, refuge, repart, retour]) && duree(total) === retour - dep);
});

f.fin();
