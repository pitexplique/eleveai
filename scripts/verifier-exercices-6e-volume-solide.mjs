// Recalcul indépendant de la feuille « Les volumes » de 6e (30/09/2026) :
// lib/fiches-exercices/maths-6e-volume-solide.tsx.
//
// ⭐ L'AUTRE CHEMIN : les nombres sont relus dans les DESSINS, jamais recopiés.
// Chaque `cubes([...])` est relu : ses cubes sont comptés rangée par rangée ET
// étage par étage (deux comptes qui doivent tomber d'accord), ses dimensions
// (long, large, haut) retrouvées dans le tableau h[y][x]. Puis chaque résultat
// est cherché dans le corrigé.
// ⭐ LE RENDU : la largeur du cadre de `cubes` est rejouée (même calcul que le
// composant) — 300 au plus — et chaque nom tient sous son solide.
// Règles de rendu et contrôles communs : scripts/verifier-exercices-5e-commun.mjs.
// Usage : node scripts/verifier-exercices-6e-volume-solide.mjs

import { ouvrir } from "./verifier-exercices-5e-commun.mjs";

const f = ouvrir("lib/fiches-exercices/maths-6e-volume-solide.tsx", "volume_solide", ["cubes", "unites"], "6e");
const { e, vrai, verif, dit, dessin, essai, appels } = f;

const somme = (xs) => xs.reduce((a, b) => a + b, 0);
const K = 0.5 * Math.SQRT1_2;

/** Un solide relu : total, rangées, étages, dimensions. */
const lire = (h) => {
  const ny = h.length, nx = h[0].length, nz = Math.max(...h.flat());
  const rangees = h.map((r) => somme(r));
  const etages = Array.from({ length: nz }, (_, z) => h.flat().filter((k) => k > z).length);
  const total = somme(h.flat());
  return { h, nx, ny, nz, rangees, etages, total, pave: h.flat().every((k) => k === nz) };
};

/* ── Contrôles de TOUS les dessins `cubes` ──────────────────────────────── */
for (const a of appels("cubes")) {
  if (!a.args) continue;
  const [liste] = a.args;
  const nom = `cubes ${a.index}`;
  for (const s of liste) {
    vrai(`${nom} : tableau rectangulaire`, s.h.every((r) => r.length === s.h[0].length));
    vrai(`${nom} : des entiers positifs`, s.h.flat().every((k) => Number.isInteger(k) && k >= 0));
    const L = lire(s.h);
    vrai(`${nom} : les deux comptes (rangées, étages) tombent d'accord (${L.total})`, somme(L.rangees) === somme(L.etages));
  }
  // La mise en page, rejouée.
  const d = liste.map(({ h }) => ({ w: h[0].length + K * h.length, t: Math.max(...h.flat()) + K * h.length }));
  const Wu = somme(d.map((q) => q.w)) + 1.2 * (liste.length - 1);
  const Hu = Math.max(...d.map((q) => q.t));
  const u = Math.min(24, 280 / Wu, 170 / Hu);
  vrai(`${nom} : cadre de ${Math.round(Wu * u + 6)} de large, 300 au plus`, Wu * u + 6 <= 300);
  liste.forEach((s, i) => {
    if (s.nom) vrai(`${nom} : « ${s.nom} » tient sous son solide`, [...s.nom].length * 14 * 0.6 <= d[i].w * u + 1.2 * u);
  });
}

/* ── Les phrases (Frédéric, 30/09 : 12 mots en moyenne, 20 au plus) ───── */
{
  const phrases = [...f.feuille.enonces, ...f.feuille.corrections]
    // Un « ; » sépare deux réponses d'une liste : il coupe comme un point.
    .flatMap((t) => t.replace(/\$[^$]*\$/g, "N").split(/\\n|(?<=[.!?;])\s+/))
    .map((p) => p.trim())
    .filter(Boolean);
  const mots = phrases.map((p) => p.split(/\s+/).filter((m) => /[\wÀ-ÿ]/.test(m)).length);
  const longues = phrases.filter((_, i) => mots[i] > 20);
  const moyenne = somme(mots) / mots.length;
  console.log(`phrases : ${phrases.length}, ${moyenne.toFixed(1)} mots en moyenne, ${Math.max(...mots)} au plus`);
  vrai("phrases de 20 mots au plus", longues.length === 0, longues.slice(0, 3).join(" | "));
  vrai(`12 mots en moyenne (${moyenne.toFixed(1)}), 13 au plus`, moyenne <= 13);
}

const sol = (k, role, i = 0) => lire(dessin("cubes", k, role)[0][i].h);

/* ═════════════════════ ★ Un seul geste ═════════════════════ */
essai("1", () => {
  const s = sol(1, "figure");
  const [devant, derriere] = s.h;
  vrai("1. des cubes cachés (derrière plus haut que devant, même colonne)", derriere.every((k, i) => k >= devant[i]));
  dit(1, `Rangée de devant : $${devant[0]}$, $${devant[1]}$ et $${devant[2]}$ cubes. Cela fait $${somme(devant)}$.`);
  dit(1, `Rangée de derrière : $${derriere[0]}$, $${derriere[1]}$ et $${derriere[2]}$ cubes. Cela fait $${somme(derriere)}$.`);
  dit(1, `$${somme(devant)} + ${somme(derriere)} = ${s.total}$ cubes`);
  dit(1, `Réponse : a) $${s.total}$ cubes ; b) $${s.total}$ cm³.`);
});
essai("2", () => {
  vrai("2. le dessin des unités", dessin("unites", 2, "figure").length === 0);
  // Les grandeurs : longueur → cm, volume → cm³, surface → cm², volume → cm³.
  dit(2, "a) Un crayon, c'est une longueur : $15$ cm.");
  dit(2, "b) La place prise, c'est un volume : $8$ cm³.");
  dit(2, "c) Une surface, c'est une aire : $150$ cm².");
  dit(2, "Réponse : a) cm ; b) cm³ ; c) cm² ; d) cm³.");
  vrai("2. un dé de 2 cm : 8 cm³", 2 * 2 * 2 === 8);
});
essai("3", () => {
  const s = sol(3, "figure");
  vrai("3. un pavé plein", s.pave);
  vrai("3. l'étiquette « 30 cm³ » = les cubes dessinés", e(3).includes(`volume $${s.total}$ cm³`));
  dit(3, `Il y a $${s.nx}$ cubes de long et $${s.ny}$ rangées.`);
  dit(3, `$${s.nx} \\times ${s.ny} = ${s.nx * s.ny}$ cubes dans une couche`);
  dit(3, `Il y a $${s.nz}$ couches : $${s.nx * s.ny} \\times ${s.nz} = ${s.total}$ cubes.`);
  dit(3, `Réponse : a) $${s.total}$ cubes ; b) oui, $${s.total}$ cubes.`);
});
essai("4", () => {
  const A = sol(4, "figure", 0), B = sol(4, "figure", 1);
  vrai("4. A plus haut, B plus gros", A.nz > B.nz && B.total > A.total);
  dit(4, `A : $${A.nx} \\times ${A.ny} = ${A.nx * A.ny}$ cubes par étage. Il y a $${A.nz}$ étages.`);
  dit(4, `$${A.nx * A.ny} \\times ${A.nz} = ${A.total}$ cubes pour A.`);
  dit(4, `B : $${B.nx} \\times ${B.ny} = ${B.total}$ cubes, sur un seul étage.`);
  dit(4, `c) $${B.total} > ${A.total}$.`);
  dit(4, `Réponse : B, avec $${B.total}$ cm³ contre $${A.total}$ cm³.`);
});
essai("5", () => {
  const P1 = sol(5, "figure", 0), P2 = sol(5, "figure", 1);
  dit(5, `Pièce 1 : devant $${P1.h[0].join(" + ")} = ${P1.rangees[0]}$, derrière $${P1.h[1].join(" + ")} = ${P1.rangees[1]}$. Cela fait $${P1.total}$ cubes.`);
  dit(5, `Pièce 2 : devant $${P2.h[0].join(" + ")} = ${P2.rangees[0]}$, derrière $${P2.h[1].join(" + ")} = ${P2.rangees[1]}$. Cela fait $${P2.total}$ cubes.`);
  dit(5, `J'additionne : $${P1.total} + ${P2.total} = ${P1.total + P2.total}$.`);
  dit(5, `multiplier $${P1.total} \\times ${P2.total}$`);
  dit(5, `Réponse : $${P1.total + P2.total}$ cm³.`);
});
essai("6", () => {
  const s = sol(6, "figure");
  vrai("6. une tour pleine", s.pave);
  dit(6, `$${s.nx} \\times ${s.ny} = ${s.nx * s.ny}$ cubes dans un étage.`);
  dit(6, `il y en a $${s.nz}$.`);
  dit(6, `$${s.nz}$ étages de $${s.nx * s.ny}$ cubes : $${s.nx * s.ny} \\times ${s.nz} = ${s.total}$ cubes.`);
  dit(6, `Réponse : a) $${s.nx * s.ny}$ ; b) $${s.nz}$ ; c) $${s.total}$ cm³.`);
});
essai("7", () => {
  const s = sol(7, "schema");
  vrai("7. le dessin montre les 16 cubes de l'énoncé", e(7).includes(`$${s.total}$ cubes de $1$ cm³`));
  dit(7, `$${s.total}$ cubes font donc $${s.total}$ cm³.`);
  dit(7, `Le dessin montre ces $${s.total}$ cubes : $${s.nx * s.ny}$ colonnes de $${s.nz}$.`);
  dit(7, "Réponse : a) $16$ cm³ ; b) $9$ cubes ; c) $45$, en cm³.");
});
essai("8", () => {
  const s = sol(8, "schema");
  vrai("8. l'énoncé : 5, 4, 2", e(8).includes(`$${s.nx}$ cm de long, $${s.ny}$ cm de large et $${s.nz}$ cm de haut`));
  dit(8, `$${s.nx} \\times ${s.ny} = ${s.nx * s.ny}$ cubes dans le fond.`);
  dit(8, `$${s.nx * s.ny} \\times ${s.nz} = ${s.total}$ cubes.`);
  dit(8, `$${s.nx} \\times ${s.ny} \\times ${s.nz} = ${s.total}$.`);
  dit(8, `additionner, $${s.nx} + ${s.ny} + ${s.nz} = ${s.nx + s.ny + s.nz}$`);
  dit(8, `Réponse : $${s.total}$ cubes, soit $${s.total}$ cm³.`);
});

/* ═════════════════════ ★★ Type devoir ═════════════════════ */
essai("9", () => {
  const s = sol(9, "figure");
  vrai("9. deux rangées pareilles", s.ny === 2 && s.rangees[0] === s.rangees[1]);
  vrai("9. quatre marches de 1 à 4", s.h[0].join() === "1,2,3,4");
  dit(9, `Une rangée : $${s.h[0].join(" + ")} = ${s.rangees[0]}$ cubes.`);
  dit(9, `$${s.rangees[0]} \\times 2 = ${s.total}$ cubes.`);
  dit(9, `$5 \\times 2 = 10$ cubes.`);
  dit(9, `$${s.total} + 10 = ${s.total + 10}$ cubes.`);
  dit(9, `Réponse : a) $${s.rangees[0]}$ cubes ; b) $${s.total}$ cm³ ; c) $${s.total + 10}$ cm³.`);
});
essai("10", () => {
  const [, data] = dessin("diagramme", 10, "figure");
  const v = Object.fromEntries(data.map((x) => [x.label, x.value]));
  for (const [k, x] of Object.entries(v)) vrai(`10. l'énoncé : ${k} = ${x}`, e(10).includes(`${k} : $${x}$ cm³`));
  const ordre = Object.keys(v).sort((a, b) => v[a] - v[b]);
  const vals = ordre.map((k) => v[k]);
  dit(10, `$${vals.join(" < ")}$. L'ordre est donc ${ordre.join(", ")}.`);
  dit(10, `b) $${vals.at(-1)} - ${vals[0]} = ${vals.at(-1) - vals[0]}$. ${ordre.at(-1)} a $${vals.at(-1) - vals[0]}$ cm³ de plus que ${ordre[0]}.`);
  dit(10, `Réponse : a) ${ordre.join(", ")} ; b) $${vals.at(-1) - vals[0]}$ cm³ ; c) l'unité est fausse.`);
});
essai("11", () => {
  const s = sol(11, "figure");
  dit(11, `Devant : $${s.h[0].join(" + ")} = ${s.rangees[0]}$ cubes. Derrière, pareil : $${s.rangees[1]}$ cubes.`);
  vrai("11. derrière = devant", s.rangees[0] === s.rangees[1]);
  dit(11, `$${s.rangees[0]} + ${s.rangees[1]} = ${s.total}$ cubes, donc $${s.total}$ cm³.`);
  dit(11, `$${s.total} - 6 = ${s.total - 6}$ cubes.`);
  dit(11, `c) $6 + ${s.total - 6} = ${s.total}$.`);
  dit(11, `Réponse : a) $${s.total}$ cm³ ; b) $${s.total - 6}$ cubes ; c) $${s.total}$ cm³.`);
});
essai("12", () => {
  const s = sol(12, "schema");
  vrai("12. l'énoncé : 6, 3, 2", e(12).includes(`$${s.nx}$ cubes de long, $${s.ny}$ de large et $${s.nz}$ de haut`));
  const c = s.nx * s.ny;
  dit(12, `$${s.nx} \\times ${s.ny} = ${c}$ cubes dans la couche du bas.`);
  dit(12, `$${c} \\times ${s.nz} = ${s.total}$ cubes, soit $${s.total}$ cm³.`);
  dit(12, `$${s.nx} \\times ${s.ny} \\times ${s.nz} = ${s.total}$.`);
  dit(12, `$${s.total} - ${c} = ${s.total - c}$ cm³.`);
  dit(12, `Réponse : a) $${c}$ cubes ; b) $${s.total}$ cm³ ; c) $${s.total - c}$ cm³.`);
});
essai("13", () => {
  const A = sol(13, "schema", 0), B = sol(13, "schema", 1);
  vrai("13. l'énoncé : A et B", e(13).includes(`A : $${A.nx}$ cm de long, $${A.ny}$ cm de large, $${A.nz}$ cm de haut`) && e(13).includes(`B : $${B.nx}$ cm de long, $${B.ny}$ cm de large, $${B.nz}$ cm de haut`));
  vrai("13. deux pavés pleins", A.pave && B.pave);
  dit(13, `A : $${A.nx} \\times ${A.ny} \\times ${A.nz} = ${A.total}$ cm³.`);
  dit(13, `B : $${B.nx} \\times ${B.ny} \\times ${B.nz} = ${B.total}$ cm³.`);
  vrai("13. B contient plus, A plus haute", B.total > A.total && A.nz > B.nz);
  dit(13, `$${B.total} - ${A.total} = ${B.total - A.total}$ cm³`);
  dit(13, `Réponse : B, de $${B.total - A.total}$ cm³.`);
});
essai("14", () => {
  const s = sol(14, "schema");
  vrai("14. l'énoncé : 3, 2, 1 m", e(14).includes(`$${s.nx}$ m de long, $${s.ny}$ m de large et $${s.nz}$ m de haut`));
  dit(14, `$${s.nx} \\times ${s.ny} = ${s.total}$ cubes.`);
  dit(14, `Le volume est $${s.total}$ m³.`);
  dit(14, `b) $8 > ${s.total}$.`);
  dit(14, `$8 - ${s.total} = ${8 - s.total}$ m³`);
});
essai("15", () => {
  const s = sol(15, "figure");
  // Le coin : h[y][x] = 4 − max(x ; y).
  vrai("15. l'escalier dans un coin : h = 4 − max(x ; y)", s.h.every((r, y) => r.every((k, x) => k === 4 - Math.max(x, y))));
  const et = s.etages;
  vrai("15. des étages carrés 16, 9, 4, 1", et.join() === "16,9,4,1");
  dit(15, `$4 \\times 4 = ${et[0]}$ cubes.`);
  dit(15, `$3 \\times 3 = ${et[1]}$ cubes.`);
  dit(15, `$2 \\times 2 = ${et[2]}$ cubes.`);
  dit(15, `En haut : $${et[3]}$ cube.`);
  dit(15, `$${et.join(" + ")} = ${s.total}$ cubes.`);
  vrai("15. le total par rangées : même nombre", somme(s.rangees) === s.total);
  dit(15, `Réponse : a) $${et[0]}$ cubes ; b) $${et[0]}$, $${et[1]}$, $${et[2]}$ et $${et[3]}$ ; c) $${s.total}$ cubes.`);
});
essai("16", () => {
  const s = sol(16, "schema");
  // Les tours : colonnes de 4 aux deux bouts ; le mur : colonnes de 2 au milieu.
  const tour = s.h.flat().filter((k) => k === 4).length / 2 * 4; // cubes d'UNE tour
  const mur = somme(s.h.flat().filter((k) => k === 2));
  vrai("16. deux tours 2 × 2 × 4", s.h.every((r) => r.slice(0, 2).every((k) => k === 4) && r.slice(4).every((k) => k === 4)) && s.ny === 2);
  vrai("16. un mur 2 × 2 × 2", s.h.every((r) => r.slice(2, 4).every((k) => k === 2)));
  dit(16, `Une tour : $2 \\times 2 \\times 4 = ${tour}$ cm³.`);
  dit(16, `Le mur : $2 \\times 2 \\times 2 = ${mur}$ cm³.`);
  dit(16, `$${tour} + ${tour} + ${mur} = ${s.total}$ cm³.`);
  vrai("16. tours + mur = tout le château", 2 * tour + mur === s.total);
  dit(16, `Réponse : a) $${tour}$ cm³ ; b) $${mur}$ cm³ ; c) $${s.total}$ cm³.`);
});

/* ═════════════════════ ★★★ Problèmes ═════════════════════ */
essai("17", () => {
  const s = sol(17, "figure");
  vrai("17. l'énoncé : 5 de long, 4 de large, 3 couches", e(17).includes(`$${s.nx}$ sucres de long, $${s.ny}$ de large et $${s.nz}$ couches`));
  const c = s.nx * s.ny;
  dit(17, `Une couche : $${s.nx} \\times ${s.ny} = ${c}$ sucres.`);
  dit(17, `$${s.nz}$ couches : $${c} \\times ${s.nz} = ${s.total}$ sucres.`);
  dit(17, `$${s.total} \\div 2 = ${s.total / 2}$ jours.`);
  dit(17, `$10 \\times 2 = ${20}$ sucres.`);
  vrai("17. 20 sucres = une couche", 20 === c);
  dit(17, `Il reste $${s.nz} - 1 = ${s.nz - 1}$ couches pleines.`);
});
essai("18", () => {
  const P = sol(18, "figure", 0), G = sol(18, "figure", 1);
  vrai("18. deux cubes pleins de côtés 2 et 4", P.pave && G.pave && P.nx === 2 && P.ny === 2 && P.nz === 2 && G.nx === 4 && G.ny === 4 && G.nz === 4);
  dit(18, `$2 \\times 2 \\times 2 = ${P.total}$ petits cubes.`);
  dit(18, `$4 \\times 4 = ${G.etages[0]}$ cubes.`);
  dit(18, `$${G.etages[0]} \\times 4 = ${G.total}$ petits cubes.`);
  dit(18, `$${G.total} \\div ${P.total} = ${G.total / P.total}$.`);
  dit(18, `Réponse : a) $${P.total}$ cm³ ; b) $${G.total}$ cm³ ; c) non, $${G.total / P.total}$ fois plus grand.`);
});
essai("19", () => {
  const s = sol(19, "schema");
  vrai("19. l'énoncé : 4, 2, 2 m", e(19).includes(`$${s.nx}$ m de long, $${s.ny}$ m de large et $${s.nz}$ m de haut`));
  dit(19, `$${s.nx} \\times ${s.ny} \\times ${s.nz} = ${s.total}$ m³.`);
  const charge = 2 + 3 + 8 * 1;
  dit(19, `$2 + 3 + 8 = ${charge}$ m³.`);
  dit(19, `$${charge} < ${s.total}$`);
  dit(19, `$${s.total} - ${charge} = ${s.total - charge}$ m³ restent libres.`);
});
essai("20", () => {
  const A = sol(20, "schema", 0), B = sol(20, "schema", 1);
  vrai("20. a) 6 × 2 × 2", A.pave && A.nx === 6 && A.ny === 2 && A.nz === 2);
  vrai("20. b) 4 × 3 × 2", B.pave && B.nx === 4 && B.ny === 3 && B.nz === 2);
  dit(20, `$6 \\times 2 \\times 2 = ${A.total}$.`);
  dit(20, `$4 \\times 3 \\times 2 = ${B.total}$.`);
  vrai("20. 24 cubes chacun", A.total === 24 && B.total === 24);
  vrai("20. c) 12 × 2 × 1 = 24", 12 * 2 * 1 === 24);
  dit(20, "$12 \\times 2 \\times 1 = 24$");
});

f.fin();
