// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Problèmes de
// géométrie plane » de seconde (lib/fiches-exercices/maths-seconde-geometrie.tsx).
//
// ⭐ L'AUTRE CHEMIN : chaque valeur est refaite ici (trigonométrie en degrés,
// Pythagore, identités), puis le corrigé doit ÉCRIRE le bon arrondi. Et chaque
// TRIANGLE dessiné est relu dans le source : l'angle droit est-il au sommet
// marqué ? Les côtés étiquetés d'un nombre sont-ils proportionnels à ces
// nombres ? Les angles étiquetés en degrés sont-ils ceux du dessin ? Un
// triangle 3-4-5 doit être DESSINÉ 3-4-5.
//
//   node scripts/verifier-exercices-geometrie.mjs

import { lireFeuille, outilsEgalites, lancer } from "./verifier-exercices-commun.mjs";

const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;
const arr = (x, n) => Math.round(x * 10 ** n) / 10 ** n;
const fr = (x, n) => arr(x, n).toFixed(n).replace(".", "{,}");

/** Les triangles d'un bloc : sommets et options, relus dans le source. */
function triangles(bloc) {
  return [...bloc.matchAll(/triangle\(\{ A: \[([-\d.]+), ([-\d.]+)\], B: \[([-\d.]+), ([-\d.]+)\], C: \[([-\d.]+), ([-\d.]+)\] \}, \{([^\n]*)\}\)/g)].map((m) => {
    const [ax, ay, bx, by, cx, cy] = m.slice(1, 7).map(Number);
    const o = m[7];
    const cotes = Object.fromEntries([...(o.match(/cotes: \{([^}]*)\}/)?.[1] ?? "").matchAll(/(AB|BC|CA): "([^"]*)"/g)].map((x) => [x[1], x[2]]));
    const angles = Object.fromEntries([...(o.match(/angles: \{([^}]*)\}/)?.[1] ?? "").matchAll(/([ABC]): "([^"]*)"/g)].map((x) => [x[1], x[2]]));
    const droit = o.match(/droit: "([ABC])"/)?.[1];
    return { P: { A: [ax, ay], B: [bx, by], C: [cx, cy] }, cotes, angles, droit };
  });
}
const long = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
const angle = (S, P, Q) => deg(Math.acos(((P[0] - S[0]) * (Q[0] - S[0]) + (P[1] - S[1]) * (Q[1] - S[1])) / (long(S, P) * long(S, Q))));
const autres = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };

function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const egalites = outilsEgalites(v, f);
  const ecrit = (k, texte) => v.ok(`${k}. le corrigé écrit ${texte}`, c(k).includes(texte), texte);
  /** Le triangle dessiné est fidèle à ses étiquettes. */
  const fidele = (k) => {
    const ts = triangles(f.blocs[k - 1]);
    v.ok(`${k}. un triangle dessiné`, ts.length > 0);
    for (const { P, cotes, angles, droit } of ts) {
      if (droit) v.ok(`${k}. l'angle droit est bien en ${droit}`, Math.abs(angle(P[droit], P[autres[droit][0]], P[autres[droit][1]]) - 90) < 0.3);
      const L = { AB: long(P.A, P.B), BC: long(P.B, P.C), CA: long(P.C, P.A) };
      const chiffres = Object.entries(cotes).map(([s, t]) => [s, Number(t.replace(/[^\d,]/g, "").replace(",", ".")), t]).filter(([, n, t]) => n > 0 && !/[?√/]/.test(t));
      if (chiffres.length >= 2) {
        const r = chiffres.map(([s, n]) => L[s] / n);
        v.ok(`${k}. les côtés ${chiffres.map((x) => x[0]).join(", ")} sont dessinés à l'échelle`, r.every((x) => Math.abs(x / r[0] - 1) < 0.01), JSON.stringify(r));
      }
      for (const [s, t] of Object.entries(angles)) {
        const d = Number(t.replace("°", "").replace(",", "."));
        if (!/°/.test(t) || !(d > 0)) continue;
        v.ok(`${k}. l'angle ${t} en ${s} est celui du dessin`, Math.abs(angle(P[s], P[autres[s][0]], P[autres[s][1]]) - d) < 0.5, String(angle(P[s], P[autres[s][0]], P[autres[s][1]])));
      }
    }
  };

  v.titre("★ Un seul geste");
  v.ok("1. 3-4-5 : cos B = 0,8, sin B = 0,6, tan B = 0,75", 4 / 5 === 0.8 && 3 / 5 === 0.6 && 3 / 4 === 0.75 && 3 ** 2 + 4 ** 2 === 25);
  egalites(1, "0{,}8^2 + 0{,}6^2 = 0{,}64 + 0{,}36 = 1");
  fidele(1);

  ecrit(2, `$BC = 10 \\times \\sin 35° \\approx ${fr(10 * Math.sin(rad(35)), 2)}$ cm`);
  ecrit(2, `$AB = 10 \\times \\cos 35° \\approx ${fr(10 * Math.cos(rad(35)), 2)}$ cm`);
  v.ok("2. en radians, sin 35 ≈ −0,43", fr(Math.sin(35), 2) === "-0{,}43" && c(2).includes("$-0{,}43$"));
  fidele(2);

  ecrit(3, `$\\widehat{A} \\approx ${fr(deg(Math.atan(8 / 6)), 1)}°$`);
  ecrit(3, `$90° - ${fr(deg(Math.atan(8 / 6)), 1)}° = ${fr(90 - arr(deg(Math.atan(8 / 6)), 1), 1)}°$`);
  fidele(3);

  v.ok("4. sin x = 0,8", Math.abs(Math.sqrt(1 - 0.36) - 0.8) < 1e-12);
  ecrit(4, "$\\sin x = \\sqrt{0{,}64} = 0{,}8$");
  fidele(4);

  v.ok("5. cos x = 12/13, tan x = 5/12", Math.abs(Math.sqrt(1 - (5 / 13) ** 2) - 12 / 13) < 1e-12);
  ecrit(5, "$\\cos x = \\dfrac{12}{13}$");
  ecrit(5, "= \\dfrac{5}{12}$");
  fidele(5);

  v.ok("6. CH = 3√3 ≈ 5,20", Math.abs(Math.sqrt(27) - 3 * Math.sqrt(3)) < 1e-12 && fr(Math.sqrt(27), 2) === "5{,}20");
  ecrit(6, "$CH = \\sqrt{27} = 3\\sqrt{3} \\approx 5{,}20$ cm");
  fidele(6);
  const t6 = triangles(f.blocs[5])[0].P;
  v.ok("6. le triangle dessiné est équilatéral", Math.abs(long(t6.A, t6.B) - long(t6.B, t6.C)) < 0.01 && Math.abs(long(t6.A, t6.B) - long(t6.C, t6.A)) < 0.01);

  v.ok("7. CH = 3, aire 12", Math.abs(6 * Math.sin(rad(30)) - 3) < 1e-9 && (8 * 3) / 2 === 12);
  ecrit(7, "= \\dfrac{8 \\times 3}{2} = 12$ cm²");
  fidele(7);
  const t7 = triangles(f.blocs[6])[0].P;
  v.ok("7. la hauteur dessinée vaut 3 (ordonnée de C)", Math.abs(t7.C[1] - 3) < 0.01);

  v.ok("8. MH = 12", 169 - 25 === 144);
  ecrit(8, "donc $MH = 12$ m");
  fidele(8);

  v.titre("★★ Type devoir");
  const AC9 = 12 * Math.sin(rad(40)), AB9 = 12 * Math.cos(rad(40));
  ecrit(9, `$AC = 12 \\times \\sin 40° \\approx ${fr(AC9, 2)}$ cm`);
  ecrit(9, `$AB = 12 \\times \\cos 40° \\approx ${fr(AB9, 2)}$ cm`);
  ecrit(9, `\\approx ${fr((AC9 * AB9) / 2, 1)}$ cm²`);
  ecrit(9, `\\approx ${fr((AC9 * AB9) / 2, 2)}$`);
  fidele(9);

  v.ok("10. (0,8 + 0,6)² = 1,96 = 1 + 2 × 0,48", Math.abs((0.8 + 0.6) ** 2 - 1.96) < 1e-12 && Math.abs(1 + 2 * 0.6 * 0.8 - 1.96) < 1e-12);
  ecrit(10, "$(0{,}8 + 0{,}6)^2 = 1{,}4^2 = 1{,}96$");
  fidele(10);

  v.ok("11. AC = 2√13, BC = 6√2, aire 30, B = 45°", Math.abs(Math.sqrt(52) - 2 * Math.sqrt(13)) < 1e-12 && Math.abs(Math.sqrt(72) - 6 * Math.sqrt(2)) < 1e-12);
  ecrit(11, "$AC = \\sqrt{16 + 36} = \\sqrt{52} = 2\\sqrt{13}$ cm");
  ecrit(11, "$BC = \\sqrt{36 + 36} = \\sqrt{72} = 6\\sqrt{2}$ cm");
  ecrit(11, "= \\dfrac{10 \\times 6}{2} = 30$ cm²");
  fidele(11);

  v.ok("12. hauteur 2√3, aire 14√3 ≈ 24,25", Math.abs(4 * Math.sin(rad(60)) - 2 * Math.sqrt(3)) < 1e-12 && fr(14 * Math.sqrt(3), 2) === "24{,}25");
  ecrit(12, "7 \\times 2\\sqrt{3} = 14\\sqrt{3} \\approx 24{,}25$ cm²");
  fidele(12);

  const B13 = deg(Math.acos(3 / 5));
  v.ok("13. AI = 4, aire 12, B ≈ 53,1°, A ≈ 73,7° (73,8 avec l'arrondi)", Math.sqrt(25 - 9) === 4 && fr(B13, 1) === "53{,}1" && fr(180 - 2 * B13, 1) === "73{,}7" && fr(180 - 2 * 53.1, 1) === "73{,}8");
  ecrit(13, "$\\widehat{B} \\approx 53{,}1°$");
  ecrit(13, "\\approx 73{,}7°$");
  fidele(13);

  const A14 = (x) => x * (10 - x);
  v.ok("14. A(2) = 16, A(4) = 24, A(5) = 25, A(6) = 24, et A(x) = 25 − (x − 5)²", A14(2) === 16 && A14(4) === 24 && A14(5) === 25 && A14(6) === 24 && [0, 1.5, 3, 7, 9.2].every((x) => Math.abs(A14(x) - (25 - (x - 5) ** 2)) < 1e-12));
  const b14 = [...f.blocs[13].matchAll(/value: (\d+)/g)].map((m) => Number(m[1]));
  v.ok("14. le diagramme porte A(1) à A(9)", String(b14) === String([1, 2, 3, 4, 5, 6, 7, 8, 9].map(A14)), String(b14));

  v.ok("15. cos 30 = √3/2, tan 30 = √3/3", Math.abs(Math.cos(rad(30)) - Math.sqrt(3) / 2) < 1e-12 && Math.abs(Math.tan(rad(30)) - Math.sqrt(3) / 3) < 1e-12);
  ecrit(15, "$\\cos 30° = \\dfrac{\\sqrt{3}}{2}$");
  ecrit(15, "= \\dfrac{\\sqrt{3}}{3}$");
  fidele(15);

  v.ok("16. H sur y = x, OH² + AH² = OA² (32 + 2 = 34), AB = 2 pour B(5 ; 5)", 32 + 2 === 34 && (4 - 3) ** 2 + (4 - 5) ** 2 === 2 && (5 - 3) ** 2 + (5 - 5) ** 2 === 4 && (3 - 4) * 1 + (5 - 4) * 1 === 0);
  ecrit(16, "$OH^2 + AH^2 = 32 + 2 = 34 = OA^2$");
  v.ok("16. la droite dessinée est y = x et le segment va de A à H", f.blocs[15].includes("{ a: 1, b: -1, c: 0 }") && f.blocs[15].includes("{ de: [3, 5], vers: [4, 4]"));

  v.titre("★★★ Problèmes");
  const h17 = 30 * Math.tan(rad(40));
  ecrit(17, `$PS = 30 \\times \\tan 40° \\approx ${fr(h17, 2)}$ m`);
  ecrit(17, `$${fr(h17, 2)} + 1{,}60 \\approx ${fr(h17 + 1.6, 1)}$ m`);
  fidele(17);

  const a18 = Math.atan(0.12);
  v.ok("18. α ≈ 6,8°, dénivelé ≈ 238 m, horizontale ≈ 1 986 m", fr(deg(a18), 1) === "6{,}8" && Math.round(2000 * Math.sin(a18)) === 238 && Math.round(2000 * Math.cos(a18)) === 1986 && Math.round(0.12 * 2000 * Math.cos(a18)) === 238);
  ecrit(18, "$\\alpha \\approx 6{,}8°$");
  ecrit(18, "$2\\,000 \\times \\sin\\alpha \\approx 238$ m");
  ecrit(18, "$2\\,000 \\times \\cos\\alpha \\approx 1\\,986$ m");
  fidele(18);
  const t18 = triangles(f.blocs[17])[0].P;
  v.ok("18. le triangle dessiné a bien une pente de 12 %", Math.abs((t18.C[1] - t18.B[1]) / (t18.B[0] - t18.A[0]) - 0.12) < 0.001);

  const A19 = (x) => x * (60 - 2 * x);
  v.ok("19. 250, 400, 450, 400, 250 ; max 450 en x = 15 ; A = 450 − 2(x − 15)²", String([5, 10, 15, 20, 25].map(A19)) === "250,400,450,400,250" && [0, 7, 15, 22.5, 30].every((x) => Math.abs(A19(x) - (450 - 2 * (x - 15) ** 2)) < 1e-9));
  const b19 = [...f.blocs[18].matchAll(/value: (\d+)/g)].map((m) => Number(m[1]));
  v.ok("19. le diagramme porte les cinq aires", String(b19) === "250,400,450,400,250");
  ecrit(19, "l'enclos le plus grand fait $15$ m sur $30$ m, soit $450$ m²");

  v.ok("20. PH = 400, OH = 400√3 ≈ 693", Math.abs(800 * Math.sin(rad(30)) - 400) < 1e-9 && Math.round(800 * Math.cos(rad(30))) === 693);
  ecrit(20, "$PH = 800 \\times \\sin 30° = 800 \\times 0{,}5 = 400$ m");
  ecrit(20, "= 400\\sqrt{3} \\approx 693$ m");
  fidele(20);
}

lancer({
  nom: "PROBLÈMES DE GÉOMÉTRIE PLANE · seconde · 20 exercices",
  fichier: "lib/fiches-exercices/maths-seconde-geometrie.tsx",
  notionId: "geometrie_problemes_plan",
  verifier,
  casses: [
    ["ex. 1 : le triangle dessiné n'est plus 3-4-5", "triangle({ A: [0, 0], B: [4, 0], C: [0, 3] }", "triangle({ A: [0, 0], B: [4, 0], C: [0, 4] }"],
    ["ex. 2 : sinus et cosinus échangés", "$BC = 10 \\\\times \\\\sin 35° \\\\approx 5{,}74$ cm", "$BC = 10 \\\\times \\\\sin 35° \\\\approx 8{,}19$ cm"],
    ["ex. 3 : l'angle faux", "$\\\\widehat{A} \\\\approx 53{,}1°$", "$\\\\widehat{A} \\\\approx 36{,}9°$"],
    ["ex. 4 : sin = 1 − cos", "$\\\\sin x = \\\\sqrt{0{,}64} = 0{,}8$", "$\\\\sin x = \\\\sqrt{0{,}64} = 0{,}4$"],
    ["ex. 6 : un triangle pas équilatéral", "triangle({ A: [0, 0], B: [6, 0], C: [3, 5.196] }", "triangle({ A: [0, 0], B: [6, 0], C: [3, 4] }"],
    ["ex. 7 : le côté oblique pris pour hauteur", "= \\\\dfrac{8 \\\\times 3}{2} = 12$ cm²", "= \\\\dfrac{8 \\\\times 3}{2} = 24$ cm²"],
    ["ex. 8 : l'angle droit mal placé", "{ noms: { A: \"H\", B: \"A\", C: \"M\" }, droit: \"A\"", "{ noms: { A: \"H\", B: \"A\", C: \"M\" }, droit: \"B\""],
    ["ex. 9 : l'aire arrondie trop tôt", "\\\\approx 35{,}5$ cm²", "\\\\approx 35{,}3$ cm²"],
    ["ex. 11 : BC faux", "$BC = \\\\sqrt{36 + 36} = \\\\sqrt{72} = 6\\\\sqrt{2}$ cm", "$BC = \\\\sqrt{36 + 36} = \\\\sqrt{72} = 8\\\\sqrt{2}$ cm"],
    ["ex. 12 : l'angle dessiné n'est plus 60°", "triangle({ A: [0, 0], B: [7, 0], C: [2, 3.464] }", "triangle({ A: [0, 0], B: [7, 0], C: [3, 3.464] }"],
    ["ex. 14 : une barre fausse", "{ label: \"6\", value: 24 }", "{ label: \"6\", value: 26 }"],
    ["ex. 17 : la hauteur des yeux oubliée", "\\\\approx 26{,}8$ m", "\\\\approx 25{,}2$ m"],
    ["ex. 18 : la pente dessinée fausse", "B: [1985.75, 0], C: [1985.75, 238.3]", "B: [1985.75, 0], C: [1985.75, 300]"],
    ["ex. 19 : l'enclos carré", "l'enclos le plus grand fait $15$ m sur $30$ m, soit $450$ m²", "l'enclos le plus grand fait $20$ m sur $20$ m, soit $400$ m²"],
    ["ex. 20 : OH faux", "= 400\\\\sqrt{3} \\\\approx 693$ m", "= 400\\\\sqrt{3} \\\\approx 639$ m"],
  ],
});
