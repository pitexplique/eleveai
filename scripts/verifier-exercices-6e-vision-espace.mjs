// Recalcul indépendant de la feuille « La vision dans l'espace » de 6e
// (30/09/2026) : lib/fiches-exercices/maths-6e-vision-espace.tsx.
//
// ⭐ L'AUTRE CHEMIN : rien n'est recopié.
// - Les cubes de chaque `cubes([...])` sont comptés rangée par rangée ET étage
//   par étage.
// - Les VUES (dessus, face, droite, gauche) sont RECALCULÉES depuis h, puis
//   comparées carreau par carreau aux vues dessinées (en `cubes(…, vues)` ou en
//   `carreaux(…)`). Convention : y = 0 est la rangée de devant ; de droite, le
//   devant est à gauche ; de gauche, le derrière est à gauche.
// - Chaque PATRON est plié : on fait rouler un cube sur ses carreaux (celui
//   qui touche le carreau est la face qui y sera). Six faces différentes = un
//   patron ; les faces opposées se lisent à la fin.
// - Le cube peint est démonté petit cube par petit cube.
// ⭐ LE RENDU : la largeur de chaque planche et de chaque pavé cavalier est
// rejouée (300 au plus), et la longueur des phrases est mesurée (consigne de
// Frédéric, 30/09 : 12 mots en moyenne, 20 au plus).
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-vision-espace.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-vision-espace.tsx", "vision_espace", ["cubes", "carreaux", "cavalier"], "6e");
const { vrai, verif, dit, dessin, essai, appels, feuille } = f;

const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const K = 0.5 * Math.SQRT1_2;
const TAILLE = 14;

/* ── Solides et vues ─────────────────────────────────────────────────────── */
const lire = (h) => {
  const ny = h.length, nx = h[0].length, nz = Math.max(...h.flat());
  return {
    h, nx, ny, nz,
    total: somme(h.flat()),
    rangees: h.map(somme),
    etages: Array.from({ length: nz }, (_, z) => h.flat().filter((k) => k > z).length),
  };
};
/** Un ensemble de carreaux « colonne,ligne depuis le bas ». */
const ens = (cols) => new Set(cols.flatMap((haut, k) => Array.from({ length: haut }, (_, r) => `${k},${r}`)));
const vueDessus = (h) => new Set(h.flatMap((r, y) => r.map((k, x) => (k > 0 ? `${x},${y}` : null)).filter(Boolean)));
const vueFace = (h) => ens(h[0].map((_, x) => Math.max(...h.map((r) => r[x]))));
const vueDroite = (h) => ens(h.map((r) => Math.max(...r)));
const vueGauche = (h) => ens(h.map((r) => Math.max(...r)).reverse());
/** Une vue dessinée : ses lignes, du haut vers le bas → carreaux depuis le bas. */
const dessinee = (lignes) => new Set(lignes.flatMap((l, r) => [...l].map((ch, k) => (ch === "." ? null : `${k},${lignes.length - 1 - r}`)).filter(Boolean)));
const pareil = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
const nb = (lignes) => dessinee(lignes).size;
/** Le plan à nombres → h (la ligne du bas est la rangée de devant). */
const planVersH = (lignes) => [...lignes].reverse().map((l) => [...l].map((ch) => (ch === "." ? 0 : Number(ch))));

/* ── Plier un patron : on fait rouler un cube sur ses carreaux ──────────── */
function plier(lignes) {
  const cases = new Map();
  lignes.forEach((l, r) => [...l].forEach((ch, k) => ch !== "." && cases.set(`${r},${k}`, ch)));
  const depart = [...cases.keys()][0];
  const tampon = new Map([[depart, "bas"]]);
  const pile = [[depart, { bas: "bas", haut: "haut", nord: "nord", sud: "sud", est: "est", ouest: "ouest" }]];
  const rouler = (o, dir) =>
    dir === "est" ? { ...o, bas: o.est, est: o.haut, haut: o.ouest, ouest: o.bas }
    : dir === "ouest" ? { ...o, bas: o.ouest, ouest: o.haut, haut: o.est, est: o.bas }
    : dir === "sud" ? { ...o, bas: o.sud, sud: o.haut, haut: o.nord, nord: o.bas }
    : { ...o, bas: o.nord, nord: o.haut, haut: o.sud, sud: o.bas };
  while (pile.length) {
    const [c, o] = pile.pop();
    const [r, k] = c.split(",").map(Number);
    for (const [dr, dk, dir] of [[0, 1, "est"], [0, -1, "ouest"], [1, 0, "sud"], [-1, 0, "nord"]]) {
      const v = `${r + dr},${k + dk}`;
      if (!cases.has(v) || tampon.has(v)) continue;
      const o2 = rouler(o, dir);
      tampon.set(v, o2.bas);
      pile.push([v, o2]);
    }
  }
  const faces = [...tampon.values()];
  const valide = cases.size === 6 && tampon.size === 6 && new Set(faces).size === 6;
  const contraire = { bas: "haut", haut: "bas", nord: "sud", sud: "nord", est: "ouest", ouest: "est" };
  const opposee = (ch) => {
    const c = [...cases].find(([, x]) => x === ch)[0];
    const face = contraire[tampon.get(c)];
    return cases.get([...tampon].find(([, fa]) => fa === face)[0]);
  };
  return { valide, opposee };
}

/* ── Le rendu, rejoué ─────────────────────────────────────────────────── */
function largeurPlanche(liste, vues) {
  const d = liste.map(({ h }) => ({ w: h[0].length + K * h.length, t: Math.max(...h.flat()) + K * h.length }));
  const Wu = somme(d.map((q) => q.w)) + 1.2 * Math.max(0, liste.length - 1);
  const Hu = liste.length ? Math.max(...d.map((q) => q.t)) : 0;
  const u = liste.length ? Math.min(24, 280 / Wu, 150 / Hu) : 0;
  const bs = liste.map((s, i) => Math.max(d[i].w * u, [...(s.nom ?? "")].length * TAILLE * 0.6));
  const SW = somme(bs) + 1.2 * u * Math.max(0, liste.length - 1);
  const nc = vues.map((v) => Math.max(...v.lignes.map((l) => [...l].length)));
  const nr = vues.map((v) => v.lignes.length);
  const c = vues.length ? Math.min(20, (280 - 20 * (vues.length - 1)) / somme(nc), 90 / Math.max(...nr)) : 0;
  const bw = vues.map((v, i) => Math.max(nc[i] * c, [...v.nom].length * TAILLE * 0.6));
  const VW = somme(bw) + 20 * Math.max(0, vues.length - 1);
  return { W: Math.max(SW, VW) + 6, c, ecrit: vues.some((v) => v.lignes.some((l) => /[^#.]/.test(l))) };
}
const controlePlanche = (nom, liste, vues) => {
  const r = largeurPlanche(liste, vues);
  vrai(`${nom} : cadre de ${Math.round(r.W)} de large, 300 au plus`, r.W <= 300);
  if (r.ecrit) vrai(`${nom} : carreaux de ${r.c.toFixed(1)} px, 18 au moins pour y écrire en 14`, r.c >= 18);
  for (const v of vues) vrai(`${nom} : vue « ${v.nom} » rectangulaire`, v.lignes.every((l) => [...l].length === [...v.lignes[0]].length));
  for (const s of liste) {
    vrai(`${nom} : tableau rectangulaire`, s.h.every((r) => r.length === s.h[0].length));
    const L = lire(s.h);
    vrai(`${nom} : rangées et étages tombent d'accord (${L.total})`, somme(L.rangees) === somme(L.etages));
  }
};
for (const a of appels("cubes")) if (a.args) controlePlanche(`cubes ${a.index}`, a.args[0], a.args[1] ?? []);
for (const a of appels("carreaux")) if (a.args) controlePlanche(`carreaux ${a.index}`, [], a.args[0]);
for (const a of appels("cavalier")) {
  if (!a.args) continue;
  const [L, P, H, o = {}] = a.args;
  const s = Math.min(170 / (L + K * P), 120 / (H + K * P));
  vrai(`cavalier(${L}, ${P}, ${H}) : cadre de ${Math.round(88 + (L + K * P) * s)} de large, 300 au plus`, 88 + (L + K * P) * s <= 300);
  vrai(`cavalier : pas de noms ET de cotes à la fois (les étiquettes se toucheraient)`, !(o.noms && o.cotes));
  // Une fuyante dessinée vaut la moitié de sa vraie longueur.
  verif(`cavalier : une fuyante de ${P} dessinée ${P / 2}`, Math.hypot(K * P, K * P), P / 2, 1e-9);
}

/* ── Les phrases (Frédéric, 30/09 : 12 mots en moyenne, 20 au plus) ───── */
{
  const phrases = [...feuille.enonces, ...feuille.corrections]
    // Un « ; » sépare deux réponses d'une liste : il coupe comme un point.
    .flatMap((t) => t.replace(/\$[^$]*\$/g, "N").split(/\\n|(?<=[.!?;])\s+/))
    .map((p) => p.trim())
    .filter(Boolean);
  const mots = phrases.map((p) => p.split(/\s+/).filter((m) => /[\wÀ-ÿ]/.test(m)).length);
  const longues = phrases.filter((_, i) => mots[i] > 20);
  const moyenne = somme(mots) / mots.length;
  console.log(`phrases : ${phrases.length}, ${moyenne.toFixed(1)} mots en moyenne, ${Math.max(...mots)} au plus`);
  vrai(`phrases de 20 mots au plus`, longues.length === 0, longues.slice(0, 3).join(" | "));
  vrai(`12 mots en moyenne (${moyenne.toFixed(1)}), 13 au plus`, moyenne <= 13);
}

const sol = (k, role, i = 0) => lire(dessin("cubes", k, role)[0][i].h);
const vuesDe = (nom, k, role) => (nom === "cubes" ? dessin("cubes", k, role)[1] : dessin("carreaux", k, role)[0]);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const s = sol(1, "figure");
  const [a, b, c] = s.etages;
  dit(1, `$3 \\times 3 = ${a}$ cubes.`);
  dit(1, `Il y en a $${b}$.`);
  dit(1, `Il y en a $${c}$.`);
  dit(1, `$${a} + ${b} + ${c} = ${s.total}$ cubes.`);
  dit(1, `Réponse : a) $${a}$ ; b) $${b}$ et $${c}$ ; c) $${s.total}$ cubes.`);
});
essai("2", () => {
  const s = sol(2, "figure");
  const [v] = vuesDe("carreaux", 2, "schema");
  vrai("2. la vue de dessus dessinée = celle du solide", pareil(dessinee(v.lignes), vueDessus(s.h)));
  const piles = s.h.flat().filter((k) => k > 0);
  dit(2, `Il y a $${piles.length}$ piles, donc $${piles.length}$ carreaux.`);
  dit(2, `$${[...piles].sort((x, y) => y - x).join(" + ")} = ${s.total}$ cubes.`);
  dit(2, `Réponse : a) $${piles.length}$ carreaux ; b) $${s.total}$ cubes`);
});
essai("3", () => {
  const s = sol(3, "figure");
  const [A, B, C] = vuesDe("cubes", 3, "figure");
  const face = vueFace(s.h);
  vrai("3. B est la vue de face", pareil(dessinee(B.lignes), face));
  vrai("3. A = la rangée de devant seule (le piège)", pareil(dessinee(A.lignes), ens(s.h[0])));
  vrai("3. C = la rangée de derrière seule", pareil(dessinee(C.lignes), ens(s.h[1])));
  vrai("3. A et C ne sont pas la vue de face", !pareil(dessinee(A.lignes), face) && !pareil(dessinee(C.lignes), face));
  const cols = s.h[0].map((_, x) => Math.max(...s.h.map((r) => r[x])));
  s.h[0].forEach((_, x) => dit(3, `devant $${s.h[0][x]}$, derrière $${s.h[1][x]}$. Je vois $${cols[x]}$ carreaux.`));
  dit(3, `La vue a donc $${cols[0]}$, $${cols[1]}$ et $${cols[2]}$ carreaux : c'est B.`);
});
essai("4", () => {
  const s = sol(4, "schema");
  const [dessus, face, droite] = vuesDe("cubes", 4, "schema");
  vrai("4. l'énoncé : 5, 2, 3", f.e(4).includes(`$${s.nx}$ de long, $${s.ny}$ de large, $${s.nz}$ de haut`));
  vrai("4. vues dessinées = vues du pavé", pareil(dessinee(dessus.lignes), vueDessus(s.h)) && pareil(dessinee(face.lignes), vueFace(s.h)) && pareil(dessinee(droite.lignes), vueDroite(s.h)));
  dit(4, `$${s.nx} \\times ${s.ny} = ${vueDessus(s.h).size}$ carreaux.`);
  dit(4, `$${s.nx} \\times ${s.nz} = ${vueFace(s.h).size}$ carreaux.`);
  dit(4, `$${s.ny} \\times ${s.nz} = ${vueDroite(s.h).size}$ carreaux.`);
});
essai("5", () => {
  const [L, P, H, o] = dessin("cavalier", 5, "figure");
  vrai("5. un vrai pavé, sommets nommés", L > 0 && P > 0 && H > 0 && o.noms === true);
  // 12 arêtes, dont les 3 qui partent du sommet caché E.
  dit(5, "$12 - 9 = 3$");
  dit(5, "$[AE]$, $[EF]$ et $[EH]$");
  dit(5, "Réponse : a) $9$ ; b) $3$, les arêtes cachées ; c) la face $ABCD$.");
});
essai("6", () => {
  const [A, B, C] = vuesDe("carreaux", 6, "figure");
  for (const v of [A, B, C]) vrai(`6. ${v.nom} a 6 carrés`, nb(v.lignes) === 6);
  vrai("6. A n'est pas un patron", !plier(A.lignes).valide);
  vrai("6. B est un patron", plier(B.lignes).valide);
  vrai("6. C n'est pas un patron", !plier(C.lignes).valide);
  dit(6, "Réponse : B.");
});
essai("7", () => {
  const [v] = vuesDe("carreaux", 7, "figure");
  const h = planVersH(v.lignes);
  vrai("7. le schéma dessine le même empilement", JSON.stringify(sol(7, "schema").h) === JSON.stringify(h));
  const lignes = v.lignes.map((l) => [...l].filter((ch) => ch !== ".").map(Number));
  dit(7, `Ligne du haut : $${lignes[0].join(" + ")} = ${somme(lignes[0])}$.`);
  dit(7, `Ligne du milieu : $${lignes[1].join(" + ")} = ${somme(lignes[1])}$.`);
  dit(7, `Ligne du bas : $${lignes[2].join(" + ")} = ${somme(lignes[2])}$.`);
  dit(7, `En tout : $${lignes.map(somme).join(" + ")} = ${somme(h.flat())}$ cubes.`);
  dit(7, `Il y en a $${nb(v.lignes)}$`);
});
essai("8", () => {
  const s = sol(8, "figure");
  const [P, Q] = vuesDe("cubes", 8, "figure");
  vrai("8. Q est la vue de droite", pareil(dessinee(Q.lignes), vueDroite(s.h)));
  vrai("8. P est la vue de gauche", pareil(dessinee(P.lignes), vueGauche(s.h)));
  vrai("8. les deux vues diffèrent", !pareil(dessinee(P.lignes), dessinee(Q.lignes)));
  vrai("8. la pile de 3 est devant", Math.max(...s.h[0]) === 3);
  dit(8, "Réponse : Q est la vue de droite.");
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const s = sol(9, "schema");
  const [face, droite, gauche] = vuesDe("cubes", 9, "schema");
  vrai("9. marches 1, 2, 3 sur 2 rangées", s.h.every((r) => r.join() === "1,2,3"));
  vrai("9. vues dessinées = vues calculées", pareil(dessinee(face.lignes), vueFace(s.h)) && pareil(dessinee(droite.lignes), vueDroite(s.h)) && pareil(dessinee(gauche.lignes), vueGauche(s.h)));
  dit(9, `$1 + 2 + 3 = ${vueFace(s.h).size}$ carreaux.`);
  dit(9, `$3 \\times 2 = ${vueDroite(s.h).size}$ carreaux`);
  dit(9, `Réponse : a) $${vueFace(s.h).size}$ ; b) $${vueDroite(s.h).size}$ ; c) $${vueGauche(s.h).size}$.`);
});
essai("10", () => {
  const liste = dessin("cubes", 10, "figure")[0];
  const [dessus, face, droite] = vuesDe("cubes", 10, "figure");
  const colle = (h) => pareil(dessinee(dessus.lignes), vueDessus(h)) && pareil(dessinee(face.lignes), vueFace(h)) && pareil(dessinee(droite.lignes), vueDroite(h));
  const bons = liste.filter((s) => colle(s.h)).map((s) => s.nom);
  vrai(`10. un seul solide a les trois vues (${bons.join(", ")})`, bons.length === 1 && bons[0] === "B");
  vrai("10. même vue de dessus pour les trois", liste.every((s) => pareil(vueDessus(s.h), dessinee(dessus.lignes))));
  vrai("10. C échoue de face, A de droite", !pareil(vueFace(liste[2].h), dessinee(face.lignes)) && pareil(vueFace(liste[0].h), dessinee(face.lignes)) && !pareil(vueDroite(liste[0].h), dessinee(droite.lignes)));
  dit(10, "Réponse : B.");
});
essai("11", () => {
  const s = sol(11, "figure");
  const [a, b, c] = s.etages;
  dit(11, `$${a}$ cubes.`);
  dit(11, `J'en compte $${b}$.`);
  dit(11, `Il y en a $${c}$.`);
  dit(11, `b) $${a} + ${b} + ${c} = ${s.total}$ cubes.`);
  dit(11, `$27 - ${s.total} = ${27 - s.total}$ cubes à ajouter.`);
  vrai("11. tient dans un cube de 3", s.nx <= 3 && s.ny <= 3 && s.nz <= 3);
});
essai("12", () => {
  const [v] = vuesDe("carreaux", 12, "figure");
  const p = plier(v.lignes);
  vrai("12. c'est un patron", p.valide);
  vrai(`12. A ↔ ${p.opposee("A")}, B ↔ ${p.opposee("B")}, C ↔ ${p.opposee("C")}`, p.opposee("A") === "D" && p.opposee("B") === "E" && p.opposee("C") === "F");
  dit(12, `Réponse : a) ${p.opposee("A")} ; b) ${p.opposee("B")} en face de B, ${p.opposee("C")} en face de C.`);
});
essai("13", () => {
  const [debout, couchee] = dessin("cubes", 13, "schema")[0];
  const [v1, v2] = vuesDe("cubes", 13, "schema");
  vrai("13. 4 cubes chacun", lire(debout.h).total === 4 && lire(couchee.h).total === 4);
  vrai("13. les vues de dessus dessinées", pareil(dessinee(v1.lignes), vueDessus(debout.h)) && pareil(dessinee(v2.lignes), vueDessus(couchee.h)));
  dit(13, `Réponse : a) $${vueDessus(debout.h).size}$ et $${vueFace(debout.h).size}$ ; b) $${vueDessus(couchee.h).size}$ et $${vueFace(couchee.h).size}$ ; c) non.`);
});
essai("14", () => {
  const [L, P, H, o] = dessin("cavalier", 14, "schema");
  vrai("14. un cube de 4", L === 4 && P === 4 && H === 4 && Object.values(o.cotes).every((t) => t === "4 cm"));
  vrai("14. fuyante dessinée 2 cm pour 4 cm", Math.hypot(K * 4, K * 4) === 2 || Math.abs(Math.hypot(K * 4, K * 4) - 2) < 1e-12);
  dit(14, "Réponse : a) un carré de $4$ cm ; b) non, toutes font $4$ cm ; c) $3$.");
});
essai("15", () => {
  const s = sol(15, "schema");
  vrai("15. l'énoncé : 4, 3, 2", f.e(15).includes(`$${s.nx}$ cubes de long, $${s.ny}$ de large et $${s.nz}$ de haut`));
  // Caché : un voisin devant (y − 1), au-dessus (z + 1), à droite (x + 1).
  const plein = (x, y, z) => x >= 0 && y >= 0 && x < s.nx && y < s.ny && z >= 0 && z < s.h[y][x];
  let caches = 0;
  for (let y = 0; y < s.ny; y++) for (let x = 0; x < s.nx; x++) for (let z = 0; z < s.h[y][x]; z++) if (plein(x, y - 1, z) && plein(x, y, z + 1) && plein(x + 1, y, z)) caches++;
  dit(15, `$${s.nx} \\times ${s.ny} \\times ${s.nz} = ${s.total}$ cubes.`);
  dit(15, `il reste $${s.ny} - 1 = ${s.ny - 1}$ rangées.`);
  dit(15, `il reste $${s.nx} - 1 = ${s.nx - 1}$ colonnes.`);
  dit(15, `$${s.nx - 1} \\times ${s.ny - 1} = ${caches}$ cubes cachés.`);
  dit(15, `$${s.total} - ${caches} = ${s.total - caches}$ cubes visibles.`);
});
essai("16", () => {
  const s = sol(16, "figure");
  const [v] = vuesDe("carreaux", 16, "schema");
  vrai("16. le plan dessiné = l'empilement", JSON.stringify(planVersH(v.lignes)) === JSON.stringify(s.h));
  dit(16, `Devant, les piles ont $${s.h[0][0]}$, $${s.h[0][1]}$ et $${s.h[0][2]}$ cubes.`);
  dit(16, `Derrière, elles ont $${s.h[1][0]}$, $${s.h[1][1]}$ et $${s.h[1][2]}$ cubes.`);
  dit(16, `$${s.h[0].join(" + ")} = ${s.rangees[0]}$ et $${s.h[1].join(" + ")} = ${s.rangees[1]}$.`);
  dit(16, `$${s.rangees[0]} + ${s.rangees[1]} = ${s.total}$ cubes.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const s = sol(17, "schema");
  const n = s.nx;
  vrai("17. un cube plein de 4", s.nx === 4 && s.ny === 4 && s.nz === 4 && s.total === 64);
  const compte = [0, 0, 0, 0];
  for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) for (let z = 0; z < n; z++) compte[[x, y, z].filter((c) => c === 0 || c === n - 1).length]++;
  dit(17, `$4 \\times 4 \\times 4 = ${s.total}$ petits cubes.`);
  dit(17, `Un cube a $${compte[3]}$ coins.`);
  dit(17, `$12 \\times 2 = ${compte[2]}$.`);
  dit(17, `$6 \\times 4 = ${compte[1]}$.`);
  dit(17, `$2 \\times 2 \\times 2 = ${compte[0]}$.`);
  dit(17, `$${compte[0]} + ${compte[2]} + ${compte[1]} + ${compte[3]} = ${s.total}$.`);
  dit(17, `Réponse : $${s.total}$ ; $${compte[3]}$ ; $${compte[2]}$ ; $${compte[1]}$ ; $${compte[0]}$.`);
});
essai("18", () => {
  const T = sol(18, "figure", 0), Z = sol(18, "figure", 1);
  const [dessus, face, droite] = vuesDe("carreaux", 18, "schema");
  for (const s of [T, Z]) vrai(`18. les vues dessinées sont celles du solide de ${s.total} cubes`, pareil(dessinee(dessus.lignes), vueDessus(s.h)) && pareil(dessinee(face.lignes), vueFace(s.h)) && pareil(dessinee(droite.lignes), vueDroite(s.h)));
  // Le minimum : tous les solides 2 × 2 de piles 0 à 2 qui ont ces trois vues.
  let min = Infinity;
  for (let m = 0; m < 81; m++) {
    const k = [m % 3, Math.floor(m / 3) % 3, Math.floor(m / 9) % 3, Math.floor(m / 27) % 3];
    const h = [[k[0], k[1]], [k[2], k[3]]];
    if (pareil(vueDessus(h), dessinee(dessus.lignes)) && pareil(vueFace(h), dessinee(face.lignes)) && pareil(vueDroite(h), dessinee(droite.lignes))) min = Math.min(min, somme(k));
  }
  dit(18, `Timéo : $${T.h.flat().join(" + ")} = ${T.total}$ cubes. Zoé : $2 \\times 2 \\times 2 = ${Z.total}$ cubes.`);
  dit(18, `Le solide de Timéo y arrive avec $${min}$ cubes. Avec $${min - 1}$, une vue aurait un trou.`);
  dit(18, `Réponse : $${T.total}$ et $${Z.total}$ cubes ; mêmes vues ; au minimum $${min}$ cubes.`);
});
essai("19", () => {
  const [plan] = vuesDe("carreaux", 19, "figure");
  const [face, droite] = vuesDe("carreaux", 19, "schema");
  const h = planVersH(plan.lignes);
  const lignes = plan.lignes.map((l) => [...l].map(Number));
  const total = somme(h.flat());
  vrai("19. vue de face dessinée = calculée", pareil(dessinee(face.lignes), vueFace(h)));
  vrai("19. vue de droite dessinée = calculée", pareil(dessinee(droite.lignes), vueDroite(h)));
  dit(19, `$${lignes.map((l) => `${l.join(" + ")} = ${somme(l)}`).join("$ ; $")}$.`);
  dit(19, `$${lignes.map(somme).join(" + ")} = ${total}$ caisses.`);
  dit(19, `$${h[0].length} \\times ${h.length} = ${vueDessus(h).size}$ carreaux.`);
  const cols = h[0].map((_, x) => Math.max(...h.map((r) => r[x])));
  dit(19, `Colonnes : $${cols.slice(0, -1).join("$, $")}$ et $${cols.at(-1)}$. Cela fait $${cols.join(" + ")} = ${vueFace(h).size}$ carreaux.`);
  const rangs = h.map((r) => Math.max(...r));
  dit(19, `$${rangs.slice(0, -1).join("$, $")}$ et $${rangs.at(-1)}$.`);
  dit(19, `$3 \\times 3 = ${vueDroite(h).size}$ carreaux.`);
  vrai("19. la ligne de devant seule ne suffit pas", Math.max(...h[0]) === 3 && cols.some((c, x) => c > h[0][x]));
  dit(19, `Réponse : $${total}$ caisses ; $${vueDessus(h).size}$ ; $${vueFace(h).size}$ ; $${vueDroite(h).size}$ carreaux.`);
});
essai("20", () => {
  const [v] = vuesDe("carreaux", 20, "figure");
  const p = plier(v.lignes);
  vrai("20. c'est un patron", p.valide);
  const val = { R: 7 - Number(p.opposee("R")), S: 7 - Number(p.opposee("S")), T: 7 - Number(p.opposee("T")) };
  vrai(`20. en face de 1 : ${p.opposee("1")}, de 2 : ${p.opposee("2")}, de 3 : ${p.opposee("3")}`, p.opposee("1") === "T" && p.opposee("2") === "R" && p.opposee("3") === "S");
  vrai("20. les six nombres de 1 à 6", [1, 2, 3, val.R, val.S, val.T].sort().join() === "1,2,3,4,5,6");
  dit(20, `R est en face de $${p.opposee("R")}$ : $7 - ${p.opposee("R")} = ${val.R}$.`);
  dit(20, `S est en face de $${p.opposee("S")}$ : $7 - ${p.opposee("S")} = ${val.S}$.`);
  dit(20, `T est en face de $${p.opposee("T")}$ : $7 - ${p.opposee("T")} = ${val.T}$.`);
  dit(20, `b) R : $${val.R}$, S : $${val.S}$, T : $${val.T}$.`);
});

f.fin();
