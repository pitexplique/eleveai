// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les triangles » de 3e
// (lib/fiches-exercices/maths-3e-triangles.tsx).
//
// ⭐ DEUX CHEMINS POUR CHAQUE ANGLE : le corrigé TROUVE un angle par
// soustraction (« 180 − 48 − 67 = 65 ») ; ici on le refait, puis on MESURE le
// même angle sur le triangle dessiné — produit scalaire des côtés, en degrés.
// Chaque `tri(…)` est relu dans le source : ses angles étiquetés doivent être
// ceux du dessin (à 0,5° près), l'angle droit au sommet marqué, les côtés codés
// égaux égaux, les longueurs étiquetées à l'échelle (à 1 % près), l'angle
// extérieur supplémentaire de l'angle intérieur. Les inégalités sont refaites
// par balayage (toutes les longueurs entières), l'équation x + 2x + 3x = 180
// aussi, les isocèles à 54° par énumération des sommets, la poutre en treillis
// par sa hauteur, et les distances Paris-Lyon-Marseille par la formule de
// haversine depuis les coordonnées des trois hôtels de ville.
//
//   node scripts/verifier-exercices-triangles-3e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;
const long = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
const angle = (S, P, Q) => deg(Math.acos(((P[0] - S[0]) * (Q[0] - S[0]) + (P[1] - S[1]) * (Q[1] - S[1])) / (long(S, P) * long(S, Q))));
const autres = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };
const num = (t) => Number(t.replace(/[^\d,.]/g, "").replace(",", "."));

/** Les triangles `tri(…)` d'un bloc, relus dans le source. */
function triangles(bloc) {
  return [...(bloc ?? "").matchAll(/tri\(\{ A: \[([-\d.]+), ([-\d.]+)\], B: \[([-\d.]+), ([-\d.]+)\], C: \[([-\d.]+), ([-\d.]+)\] \}, \{([^\n]*?)\}\)/g)].map((m) => {
    const [ax, ay, bx, by, cx, cy] = m.slice(1, 7).map(Number);
    const o = m[7];
    const dict = (cle, motif) => Object.fromEntries([...(o.match(new RegExp(`${cle}: \\{([^}]*)\\}`))?.[1] ?? "").matchAll(motif)].map((x) => [x[1], x[2]]));
    const liste = (cle) => [...(o.match(new RegExp(`${cle}: \\[([^\\]]*)\\]`))?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    const ext = o.match(/exterieur: \{ en: "([ABC])", depuis: "([ABC])", label: "([^"]*)" \}/);
    return {
      P: { A: [ax, ay], B: [bx, by], C: [cx, cy] },
      cotes: dict("cotes", /(AB|BC|CA): "([^"]*)"/g),
      angles: dict("angles", /([ABC]): "([^"]*)"/g),
      trouve: liste("trouve"),
      egaux: liste("egaux"),
      droit: o.match(/droit: "([ABC])"/)?.[1],
      exterieur: ext ? { en: ext[1], depuis: ext[2], label: ext[3] } : null,
    };
  });
}
const mesure = (P, s) => angle(P[s], P[autres[s][0]], P[autres[s][1]]);

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const b = (k) => f.blocs[k - 1] ?? "";
  const dit = (k, phrase) => v.ok(`${k}. « ${phrase} »`, c(k).includes(phrase), "absent du corrigé");
  let dessines = 0;

  /** Le(s) triangle(s) dessiné(s) sont fidèles à leurs étiquettes. Rend les triangles lus. */
  const fidele = (k, attendus = 1) => {
    const ts = triangles(b(k));
    v.ok(`${k}. ${attendus} triangle(s) dessiné(s)`, ts.length === attendus, `${ts.length} lu(s)`);
    if (ts.length) dessines++;
    for (const { P, cotes, angles, trouve, egaux, droit, exterieur } of ts) {
      for (const [s, t] of Object.entries(angles)) {
        const d = num(t), m = mesure(P, s);
        v.ok(`${k}. l'angle ${t} en ${s} est celui du dessin (${m.toFixed(2)}°)`, Math.abs(m - d) < 0.5, m.toFixed(2));
      }
      const valeurs = Object.values(angles).map(num);
      if (valeurs.length === 3) v.ok(`${k}. les trois angles étiquetés font 180°`, Math.abs(valeurs.reduce((x, y) => x + y) - 180) < 1e-9, valeurs.join(" + "));
      if (droit) v.ok(`${k}. l'angle droit est bien en ${droit}`, Math.abs(mesure(P, droit) - 90) < 0.3, mesure(P, droit).toFixed(2));
      for (const s of trouve) {
        v.ok(`${k}. l'angle trouvé en ${s} est étiqueté`, !!angles[s]);
        const n = angles[s] ? String(num(angles[s])) : "?";
        v.ok(`${k}. l'angle trouvé ${n}° est écrit dans le corrigé`, c(k).includes(`${n}°`) || c(k).includes(`${n} degrés`), n);
      }
      if (egaux.length >= 2) {
        const L = egaux.map((cote) => long(P[cote[0]], P[cote[1]]));
        v.ok(`${k}. les côtés codés égaux (${egaux.join(", ")}) le sont sur le dessin`, L.every((x) => Math.abs(x / L[0] - 1) < 0.01), L.map((x) => x.toFixed(3)).join(" / "));
      }
      const chiffres = Object.entries(cotes).map(([s, t]) => [s, num(t)]).filter(([, n]) => n > 0);
      if (chiffres.length >= 2) {
        const r = chiffres.map(([s, n]) => long(P[s[0]], P[s[1]]) / n);
        v.ok(`${k}. les côtés ${chiffres.map((x) => x[0]).join(", ")} sont dessinés à l'échelle`, r.every((x) => Math.abs(x / r[0] - 1) < 0.01), r.map((x) => x.toFixed(4)).join(" / "));
      }
      if (exterieur) {
        const e = num(exterieur.label), i = mesure(P, exterieur.en);
        v.ok(`${k}. l'angle extérieur ${exterieur.label} complète l'angle intérieur en ${exterieur.en} (${i.toFixed(2)}°)`, Math.abs(e + i - 180) < 0.5);
        v.ok(`${k}. le prolongement part du côté [${exterieur.depuis}${exterieur.en}]`, autres[exterieur.en].includes(exterieur.depuis));
      }
    }
    return ts;
  };
  /** Les cas `{ grand, petits }` du schéma des longueurs. */
  const barres = (k) => [...b(k).matchAll(/\{ grand: ([\d.]+), petits: \[([\d.]+), ([\d.]+)\] \}/g)].map((m) => [Number(m[1]), Number(m[2]), Number(m[3])]);
  /** Un triangle existe-t-il ? Par l'autre chemin : chaque côté contre les deux autres. */
  const existe = (x, y, z) => x < y + z && y < x + z && z < x + y;

  v.titre("★ Un seul geste");
  const C1 = 180 - 48 - 67;
  v.ok(`1. Ĉ = ${C1}, et 48, 67, ${C1} tous différents`, C1 === 65 && new Set([48, 67, C1]).size === 3);
  dit(1, `\\widehat{C} = 180° - 115° = ${C1}°$`);
  dit(1, `$${360 - 115}°$`);
  fidele(1);

  const H2 = 90 - 75;
  dit(2, `\\widehat{H} = 90° - 75° = ${H2}°$`);
  dit(2, `$75 + 90 + ${H2} = 180$`);
  const t2 = fidele(2)[0];
  v.ok("2. l'angle en H du dessin vaut 15°, l'échelle à 75° (tan 75° × MP = MH)", !!t2 && Math.abs(mesure(t2.P, "C") - H2) < 0.05);

  const base3 = (180 - 36) / 2;
  dit(3, `$144 \\div 2 = ${base3}$`);
  dit(3, `$36 + 90 + 90 = ${36 + 180}$`);
  fidele(3);

  const som4 = 180 - 2 * 38;
  dit(4, `$180 - 76 = ${som4}$`);
  v.ok("4. 104° > 90° : obtusangle", som4 > 90);
  dit(4, `$180 - 38 = ${180 - 38}$`);
  fidele(4);

  const L5 = 180 - 45 - 45;
  dit(5, `\\widehat{L} = 180° - 45° - 45° = ${L5}°$`);
  v.ok("5. b) H = I = 75 : le sommet différent est G", 180 - 75 - 75 === 30);
  dit(5, "Réponse : a) équilatéral, donc isocèle ; b) isocèle en $G$ ; c) rectangle isocèle en $L$ ; d) isocèle en $N$.");
  fidele(5, 2);

  const cas6 = [[4, 6, 11], [5, 7, 9], [10, 2, 9]];
  const verdicts6 = cas6.map(([x, y, z]) => existe(x, y, z));
  v.ok("6. non, oui, oui (chaque côté contre la somme des deux autres)", JSON.stringify(verdicts6) === "[false,true,true]");
  for (const t of cas6) {
    const g = Math.max(...t), [p, q] = [...t].sort((x, y) => x - y).slice(0, 2);
    dit(6, `$${p} + ${q} = ${p + q}$`);
  }
  dit(6, `Réponse : ${verdicts6.map((x, i) => `${"abc"[i]}) ${x ? "oui" : "non"}`).join(" ; ")}.`);
  const l6 = barres(6);
  v.ok("6. le schéma porte les trois cas de l'énoncé", l6.length === 3 && l6.every(([g, p, q], i) => g === Math.max(...cas6[i]) && [p, q, g].sort((x, y) => x - y).join() === [...cas6[i]].sort((x, y) => x - y).join()), JSON.stringify(l6));
  dessines += l6.length ? 1 : 0;

  const sommes7 = [[62, 58, 60], [95, 45, 45], [30, 90, 60]].map((t) => t.reduce((x, y) => x + y));
  v.ok("7. sommes 180, 185, 180", sommes7.join() === "180,185,180");
  dit(7, `$95 + 45 + 45 = ${sommes7[1]}$`);
  dit(7, `$180 - 95 - 45 = ${180 - 95 - 45}$`);
  dit(7, `Réponse : ${sommes7.map((s, i) => `${"abc"[i]}) ${s === 180 ? "oui" : "non"}`).join(" ; ")}.`);
  fidele(7, 2);

  dit(8, `$180 - 60 - 60 = ${180 - 120}$`);
  dit(8, `$180 \\div 3 = ${180 / 3}$`);
  const t8 = fidele(8)[0];
  v.ok("8. le panneau dessiné est équilatéral", !!t8 && ["A", "B", "C"].every((s) => Math.abs(mesure(t8.P, s) - 60) < 0.05));

  v.titre("★★ Type devoir");
  const x9 = [...Array(181).keys()].filter((x) => x + 2 * x + 3 * x === 180);
  v.ok(`9. x trouvé par balayage : ${x9}`, x9.length === 1 && x9[0] === 30);
  dit(9, `$x = 180 \\div 6 = ${x9[0]}$`);
  dit(9, `\\widehat{C} = 3 \\times 30° = ${3 * x9[0]}°$`);
  fidele(9);

  const L10 = [...Array(40).keys()].filter((L) => existe(5, 9, L));
  v.ok(`10. L possibles par balayage : ${L10.join(", ")}`, L10.length === 9 && L10[0] === 5 && L10.at(-1) === 13);
  dit(10, `$13 - 5 + 1 = ${L10.length}$`);
  const iso10 = L10.filter((L) => L === 5 || L === 9);
  v.ok("10. isocèle pour 5 et 9", iso10.join() === "5,9");
  dit(10, `Réponse : $${L10.length}$ valeurs, de $${L10[0]}$ à $${L10.at(-1)}$ cm`);
  v.ok("10. les bornes 4 et 14 aplatissent le triangle", 4 + 5 === 9 && 5 + 9 === 14 && !existe(5, 9, 4) && !existe(5, 9, 14));
  fidele(10, 2);

  const C11 = 180 - 35 - 50;
  dit(11, `\\widehat{C} = 180° - 35° - 50° = ${C11}°$`);
  // L'autre chemin : C comme intersection des deux demi-droites de la construction.
  const tA = Math.tan(rad(35)), tB = Math.tan(rad(50));
  const xC = (8 * tB) / (tA + tB), yC = xC * tA;
  const t11 = fidele(11)[0];
  v.ok(`11. C construit (${xC.toFixed(3)} ; ${yC.toFixed(3)}) = C dessiné`, !!t11 && Math.abs(t11.P.C[0] - xC) < 0.01 && Math.abs(t11.P.C[1] - yC) < 0.01);

  v.ok("12. a) 9 < 14 ; c) 180 ; d) 185", existe(6, 8, 9) && 40 + 65 + 75 === 180 && 40 + 65 + 80 === 185);
  dit(12, "$40 + 65 + 80 = 185$");
  dit(12, "Réponse : a) oui ; b) oui ; c) non, une infinité ; d) aucun.");
  const t12 = fidele(12, 2);
  v.ok("12. deux tailles différentes (4 et 7), mêmes angles", t12.length === 2 && Math.abs(long(t12[1].P.A, t12[1].P.B) / long(t12[0].P.A, t12[0].P.B) - 7 / 4) < 1e-9);

  dit(13, `$90 \\div 2 = ${90 / 2}$`);
  dit(13, `$180 - 90 - 30 = ${60}$`);
  v.ok("13. 45 + 30 = 75 et 45 + 60 = 105", 45 + 30 === 75 && 45 + (180 - 90 - 30) === 105);
  fidele(13, 2);

  const C14 = 180 - 120, B14 = 180 - 45 - C14;
  dit(14, `\\widehat{ACB} = 180° - 120° = ${C14}°$`);
  dit(14, `\\widehat{B} = 180° - 45° - ${C14}° = ${B14}°$`);
  v.ok("14. Â + B̂ = angle extérieur", 45 + B14 === 120);
  fidele(14);

  const cas15 = [[4, 6, 10], [4, 6, 10.5], [4, 6, 9]];
  v.ok("15. aplati, impossible, triangle", 4 + 6 === 10 && !existe(4, 6, 10) && 4 + 6 < 10.5 && existe(4, 6, 9));
  dit(15, "$AB + BC = 4 + 6 = 10$");
  dit(15, "Réponse : les stations sont alignées, $B$ est sur $[AC]$ ; $10{,}5$ km est impossible, $9$ km donne un vrai triangle.");
  const l15 = barres(15);
  if (l15.length) dessines++;
  v.ok("15. le schéma porte les trois cas", JSON.stringify(l15) === JSON.stringify(cas15.map(([p, q, g]) => [g, p, q])), JSON.stringify(l15));

  // Isocèles contenant 54° : on énumère l'angle au sommet, degré par degré.
  const iso = [];
  for (let s = 1; s < 180; s++) {
    const base = (180 - s) / 2;
    if (s === 54 || base === 54) iso.push([s, base, base].sort((x, y) => x - y).join("-"));
  }
  v.ok(`16. deux isocèles contenant 54° : ${iso.join(" ; ")}`, iso.length === 2 && iso.includes("54-63-63") && iso.includes("54-54-72"));
  v.ok("16. 110° ne peut pas être à la base", 2 * 110 > 180 && (180 - 110) / 2 === 35);
  dit(16, "$70 \\div 2 = 35$");
  dit(16, "126 \\div 2 = 63$");
  dit(16, "Réponse : a) $35°$ et $35°$ ; b) $54°$, $63°$, $63°$ ou bien $54°$, $54°$, $72°$.");
  fidele(16, 2);

  v.titre("★★★ Problèmes");
  const poutres = [...b(17).matchAll(/treillis\(([\d.]+), \["([^"]+)", "([^"]+)", "([^"]+)"\]\)/g)];
  v.ok("17. deux poutres dessinées", poutres.length === 2);
  if (poutres.length) dessines++;
  for (const m of poutres) {
    const base = deg(Math.atan(Number(m[1]) / 1));
    const [g, s, d] = m.slice(2).map(num);
    v.ok(`17. hauteur ${m[1]} : angle à la base ${base.toFixed(2)}°, étiquettes ${g}, ${s}, ${d}`, Math.abs(base - g) < 0.5 && Math.abs(base - d) < 0.5 && Math.abs(180 - 2 * base - s) < 0.5 && g + s + d === 180);
  }
  dit(17, "$65 + 50 + 65 = 180$");
  dit(17, `130 \\div 2 = ${(180 - 50) / 2}$`);

  const louvre = deg(Math.atan(Math.hypot(21.64, 35.42 / 2) / (35.42 / 2)));
  v.ok(`18. les vraies faces du Louvre : angle à la base ${louvre.toFixed(2)}°, « environ 58° »`, Math.round(louvre) === 58);
  dit(18, `$180 - 116 = ${180 - 2 * 58}$`);
  v.ok("18. 17 + 17 < 35,42 et 35,42 ÷ 2 = 17,71", 17 + 17 < 35.42 && !existe(17, 17, 35.42) && Math.abs(35.42 / 2 - 17.71) < 1e-9);
  dit(18, "$a > 35{,}42 \\div 2 = 17{,}71$ m");
  const arete = Math.hypot(Math.hypot(21.64, 17.71), 17.71);
  v.ok(`18. l'arête réelle ≈ ${arete.toFixed(1)} m, « environ 33 m »`, Math.round(arete) === 33);
  fidele(18);

  const hav = ([p1, l1], [p2, l2]) => 2 * 6371 * Math.asin(Math.sqrt(Math.sin(rad(p2 - p1) / 2) ** 2 + Math.cos(rad(p1)) * Math.cos(rad(p2)) * Math.sin(rad(l2 - l1) / 2) ** 2));
  const [PA, LY, MA] = [[48.8566, 2.3522], [45.764, 4.8357], [43.2965, 5.3698]];
  const d19 = [hav(PA, LY), hav(LY, MA), hav(PA, MA)].map(Math.round);
  v.ok(`19. distances recalculées : ${d19.join(", ")} km`, d19.join() === "391,278,660");
  dit(19, `$${d19[0]} + ${d19[1]} = ${d19[0] + d19[1]}$`);
  dit(19, `$${d19[0] + d19[1]} - ${d19[2]} = ${d19[0] + d19[1] - d19[2]}$`);
  v.ok("19. vrai triangle, et 680 impossible", existe(...d19) && !existe(d19[0], d19[1], 680));
  const t19 = fidele(19)[0];
  v.ok("19. le dessin a Paris en haut et Marseille en bas (carte)", !!t19 && t19.P.A[1] > t19.P.C[1] && t19.P.C[1] > t19.P.B[1]);

  const E20 = 90 - 22;
  dit(20, `\\widehat{E} = 90° - 22° = ${E20}°$`);
  const T20 = deg(Math.atan(3.6 / 9));
  v.ok(`20. l'angle en tête d'une voile 9 m × 3,6 m : ${T20.toFixed(2)}°, « environ 22° »`, Math.round(T20) === 22);
  // Les bornes de la chute, par balayage au centimètre (en entiers : pas d'arrondi flottant).
  const chutes = [...Array(2000).keys()].filter((x) => existe(900, 360, x));
  v.ok(`20. chute de ${chutes[0]} à ${chutes.at(-1)} cm (balayage), donc bornes 5,4 et 12,6 m exclues`, chutes[0] === 541 && chutes.at(-1) === 1259 && !existe(900, 360, 1280));
  dit(20, "$TE > 9 - 3{,}6 = 5{,}4$");
  dit(20, "$TE < 9 + 3{,}6 = 12{,}6$");
  fidele(20);

  v.titre("Les schémas");
  v.ok(`${dessines} corrigés sur 20 ont leur dessin relu`, dessines === 20, String(dessines));
}

lancer({
  nom: "LES TRIANGLES · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-triangles.tsx",
  notionId: "triangle_figure",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : le sommet C déplacé, les angles ne sont plus ceux du dessin", "C: [4.078, 4.529]", "C: [4.5, 4.529]"],
    ["ex. 1 : un angle faux", "\\\\widehat{C} = 180° - 115° = 65°$", "\\\\widehat{C} = 180° - 115° = 75°$"],
    ["ex. 2 : l'angle droit au mauvais sommet", "trouve: [\"C\"], droit: \"B\"", "trouve: [\"C\"], droit: \"A\""],
    ["ex. 3 : 180 divisé par deux", "$144 \\\\div 2 = 72$", "$180 \\\\div 2 = 90$"],
    ["ex. 4 : un seul angle à la base retiré", "C: \"104°\"", "C: \"142°\""],
    ["ex. 5 : rectangle oublié", "c) rectangle isocèle en $L$ ; d)", "c) isocèle en $L$ ; d)"],
    ["ex. 6 : les barres ne sont plus celles de l'énoncé", "{ grand: 11, petits: [4, 6] }", "{ grand: 11, petits: [5, 6] }"],
    ["ex. 7 : 185° accepté", "Réponse : a) oui ; b) non ; c) oui.", "Réponse : a) oui ; b) oui ; c) oui."],
    ["ex. 8 : le panneau n'est plus équilatéral", "C: [2, 3.464]", "C: [2, 3]"],
    ["ex. 9 : x faux", "$x = 180 \\\\div 6 = 30$", "$x = 180 \\\\div 6 = 36$"],
    ["ex. 10 : les bornes comptées", "$13 - 5 + 1 = 9$", "$14 - 4 + 1 = 11$"],
    ["ex. 10 : le côté de 13 cm pas à l'échelle", "C: [-3.5, 3.571]", "C: [-3.5, 4.5]"],
    ["ex. 11 : C dessiné ailleurs", "C: [5.039, 3.529]", "C: [4, 3.529]"],
    ["ex. 14 : l'angle extérieur faux", "label: \"120°\"", "label: \"130°\""],
    ["ex. 16 : le second isocèle oublié", "$63°$ ou bien $54°$, $54°$, $72°$.", "$63°$."],
    ["ex. 17 : la poutre trop plate pour ses 65°", "treillis(2.145,", "treillis(1.9,"],
    ["ex. 18 : l'angle au sommet faux", "$180 - 116 = 64$", "$180 - 116 = 66$"],
    ["ex. 19 : le détour faux", "$669 - 660 = 9$", "$669 - 660 = 19$"],
    ["ex. 19 : Lyon déplacée sur la carte", "C: [187.2, -343.3]", "C: [150, -343.3]"],
    ["ex. 20 : la borne basse fausse", "$TE > 9 - 3{,}6 = 5{,}4$", "$TE > 9 - 3{,}6 = 6{,}4$"],
    ["une micro d'une autre notion", "micros: [\"triangle_inegalite\"],\n        },\n        {\n          enonce: \"Existe-t-il", "micros: [\"pythagore_reconnaitre\"],\n        },\n        {\n          enonce: \"Existe-t-il"],
    ["un $ dans un canvas", "label: \"120°\"", "label: \"$120°$\""],
  ],
});
