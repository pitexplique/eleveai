// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Les aires : triangle,
// disque et figures composées » de 3e (lib/fiches-exercices/maths-3e-aires.tsx).
//
// ⭐ L'AUTRE CHEMIN : le corrigé ANNONCE « 9 × 4 ÷ 2 = 18 cm² » ; ici chaque
// aire est aussi refaite par la FORMULE DU LACET sur les coordonnées que la
// figure DESSINE. Un disque est un polygone régulier de 100 000 côtés, dont on
// prend l'aire par le même lacet : π n'est jamais tapé, il est MESURÉ. Les
// conversions passent par les carrés : 1 m² = 100 × 100 cm², 1 ha = 100 × 100
// m², 1 km² = 1 000 × 1 000 m².
//
// ⭐ LES DESSINS : chaque `plan("unité", [...])` est relu dans le source et
// évalué. Chaque cote chiffrée (« 4,5 cm », « r = 3 cm », « 2,5 m » sur un plan
// en cm) doit mesurer sur le dessin ce qu'elle annonce ; chaque hauteur doit
// partir d'un sommet et tomber PERPENDICULAIREMENT sur la droite d'un côté ;
// chaque angle droit marqué doit en être un ; et les surfaces ombrées (les
// trous en négatif) doivent valoir les aires du corrigé.
//
//   node scripts/verifier-exercices-aires-3e.mjs

import { lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Calcul ─────────────────────────────────────────────────────────────── */

/** Formule du lacet (aire géométrique, sans signe). */
const lacet = (pts) => {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
};
const N = 100000;
/** Un disque, par un polygone régulier de N côtés. */
const polyDisque = (cx, cy, r) => Array.from({ length: N }, (_, i) => [cx + r * Math.cos((2 * Math.PI * i) / N), cy + r * Math.sin((2 * Math.PI * i) / N)]);
/** Un secteur : le centre, puis l'arc de a0 à a1 (degrés), N pas. */
const polySecteur = (cx, cy, r, a0, a1) => [
  [cx, cy],
  ...Array.from({ length: N + 1 }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / N) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }),
];
/** π MESURÉ : l'aire du disque de rayon 1. */
const PI_ = lacet(polyDisque(0, 0, 1));

/** √y par dichotomie. */
const racine = (y) => {
  let a = 0, b = Math.max(1, y);
  for (let i = 0; i < 80; i++) {
    const m = (a + b) / 2;
    if (m * m > y) b = m;
    else a = m;
  }
  return (a + b) / 2;
};
const arr = (x, n) => Math.round(x * 10 ** n) / 10 ** n;
const proche = (x, y, eps = 1e-9) => Math.abs(x - y) < eps;
/** Écrit comme dans la feuille : 1\,681, 28{,}09. */
function fr(x, d = null) {
  const s = d === null ? String(+x.toFixed(6)) : x.toFixed(d);
  const [e, f] = s.split(".");
  const groupe = e.length >= 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : e;
  return f ? `${groupe}{,}${f}` : groupe;
}

/** Les carrés des conversions. */
const M2 = 100 * 100; // cm² dans 1 m²
const HA = 100 * 100; // m² dans 1 ha
const KM2 = 1000 * 1000; // m² dans 1 km²
/** Une longueur, en mètres. */
const EN_METRES = { km: 1000, m: 1, cm: 0.01, mm: 0.001 };

/* ── Les figures dessinées, relues dans le source ──────────────────────── */

/** Chaque `plan("u", [ ... ])` du bloc : son unité, ses formes (évaluées), son texte brut. */
function plans(bloc) {
  const out = [];
  let i = 0;
  while ((i = bloc.indexOf('plan("', i)) >= 0) {
    const unite = bloc.slice(i + 6, bloc.indexOf('"', i + 6));
    const debut = bloc.indexOf("[", i);
    let prof = 0, j = debut, dansChaine = false;
    for (; j < bloc.length; j++) {
      const c = bloc[j];
      if (c === '"' && bloc[j - 1] !== "\\") dansChaine = !dansChaine;
      if (dansChaine) continue;
      if (c === "[") prof++;
      else if (c === "]" && --prof === 0) break;
    }
    const brut = bloc.slice(debut, j + 1);
    out.push({ unite, formes: new Function(`return ${brut}`)(), brut });
    i = j;
  }
  return out;
}
/** La longueur annoncée par une étiquette, convertie dans l'unité du plan ; null sans longueur. */
function longueurDe(label, unite) {
  const apres = label.split(/[=≈]/).at(-1);
  const m = apres.match(/(\d+(?:,\d+)?)\s*(km|cm|mm|m)(?![a-z²])/);
  return m ? (Number(m[1].replace(",", ".")) * EN_METRES[m[2]]) / EN_METRES[unite] : null;
}
const dist = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
/** L'aire signée d'une forme de fond (négative pour un trou), null si ce n'est pas une surface. */
function aireForme(f) {
  let a = null;
  if (f.poly) a = lacet(f.poly);
  else if (f.disque) a = lacet(polyDisque(...f.disque));
  else if (f.secteur) a = lacet(polySecteur(...f.secteur));
  if (a === null) return null;
  return f.fond === "trou" ? -a : a;
}

function verifier(source, v) {
  const { corrections, blocs } = lireFeuille(source);
  const c = (k) => corrections[k - 1] ?? "";
  const dit = (k, phrase, quoi = phrase) => v.ok(`${k}. « ${quoi} »`, c(k).includes(phrase), "absent du corrigé");

  /** Toutes les figures de l'exercice k sont fidèles à leurs étiquettes. */
  const fidele = (k) => {
    const ps = plans(blocs[k - 1] ?? "");
    v.ok(`${k}. le corrigé a sa figure dessinée`, ps.length > 0);
    for (const { unite, formes, brut } of ps) {
      const sommets = formes.filter((f) => f.poly).flatMap((f) => f.poly);
      const cotes = [];
      for (const f of formes) {
        const seg = f.cote ?? f.haut;
        if (!seg || !f.label) continue;
        const n = longueurDe(f.label, unite);
        if (n !== null) cotes.push([f.label, dist(seg[0], seg[1]), n]);
      }
      const faux = cotes.filter(([, l, n]) => Math.abs(l / n - 1) > 0.005);
      v.ok(`${k}. les ${cotes.length} longueurs chiffrées sont dessinées à l'échelle (${unite})`, cotes.length > 0 && faux.length === 0, JSON.stringify(faux));
      for (const f of formes.filter((f) => f.haut)) {
        const [S, H] = f.haut;
        const sommet = sommets.some((p) => proche(p[0], S[0], 1e-9) && proche(p[1], S[1], 1e-9));
        const bases = formes.filter((g) => g.poly).flatMap((g) => g.poly.map((p, i) => [p, g.poly[(i + 1) % g.poly.length]]));
        const surBase = bases.some(([Q, R]) => {
          const e = [R[0] - Q[0], R[1] - Q[1]];
          const L = Math.hypot(...e);
          const aligne = Math.abs(e[0] * (H[1] - Q[1]) - e[1] * (H[0] - Q[0])) / L < 1e-6;
          const perp = Math.abs(e[0] * (S[0] - H[0]) + e[1] * (S[1] - H[1])) / (L * dist(S, H)) < 1e-6;
          return aligne && perp;
        });
        v.ok(`${k}. la hauteur part d'un sommet et tombe perpendiculairement sur la droite d'un côté`, sommet && surBase, `sommet : ${sommet} ; perpendiculaire à un côté : ${surBase}`);
      }
      for (const f of formes.filter((f) => f.droit)) {
        const [V, U, W] = f.droit;
        const cos = ((U[0] - V[0]) * (W[0] - V[0]) + (U[1] - V[1]) * (W[1] - V[1])) / (dist(V, U) * dist(V, W));
        v.ok(`${k}. l'angle droit marqué en (${V}) en est un`, Math.abs(cos) < 1e-9);
      }
      v.ok(`${k}. pas de $ ni de \\ dans le dessin`, !/[$\\]/.test(brut));
    }
    return ps;
  };
  /** Les surfaces ombrées de chaque plan de k valent les aires attendues (dans l'unité du plan). */
  const ombre = (k, attendues) => {
    const ps = fidele(k);
    v.ok(`${k}. ${attendues.length} figure(s) attendue(s)`, ps.length === attendues.length, `${ps.length} dessinée(s)`);
    ps.forEach((p, i) => {
      const lues = p.formes.map(aireForme).filter((a) => a !== null).sort((a, b) => a - b);
      const att = [...(attendues[i] ?? [])].sort((a, b) => a - b);
      const ok = lues.length === att.length && lues.every((a, j) => Math.abs(a - att[j]) <= 1e-6 * Math.max(1, Math.abs(att[j])));
      v.ok(`${k}. surfaces ombrées de la figure ${i + 1} : ${att.map((a) => +a.toFixed(4)).join(" ; ")} ${p.unite}²`, ok, `lues : ${lues.map((a) => +a.toFixed(4)).join(" ; ")}`);
    });
  };

  v.titre(`★ Un seul geste   (π mesuré : ${PI_.toFixed(9)})`);
  v.ok("π mesuré par le lacet, à 1e-8 près", proche(PI_, 3.14159265, 1e-8));

  // 1 — les conversions par les carrés
  dit(1, `$3 \\times ${fr(M2)} = ${fr(3 * M2)}$ cm²`);
  dit(1, `$45\\,000 \\div ${fr(M2)} = ${fr(45000 / M2)}$ m²`);
  dit(1, `$1$ ha $= 100 \\times 100 = ${fr(HA)}$ m². Donc $2{,}5$ ha $= ${fr(2.5 * HA)}$ m²`);
  dit(1, `$1\\,000 \\times 1\\,000 = ${fr(KM2)}$ m², c'est-à-dire $${fr(KM2 / HA)}$ ha. Donc $0{,}6$ km² $= ${fr((0.6 * KM2) / HA)}$ ha`);
  dit(1, `$3$ m² $= ${3 * 100}$ cm²`);
  dit(1, `Réponse : $${fr(3 * M2)}$ cm² ; $${fr(45000 / M2)}$ m² ; $${fr(2.5 * HA)}$ m² ; $${fr((0.6 * KM2) / HA)}$ ha.`);
  ombre(1, [[1 * M2]]);

  // 2 — deux unités, une surface
  const a2cm = 250 * 80;
  const a2m = a2cm / M2;
  v.ok(`2. 250 × 80 = ${a2cm} cm² = ${a2m} m²`, a2m === 2);
  dit(2, `$\\mathcal{A} = 2{,}5 \\times 0{,}8 = ${fr(a2m)}$ m²`);
  dit(2, `$\\mathcal{A} = 250 \\times 80 = ${fr(a2cm)}$ cm²`);
  dit(2, `$${fr(a2m)}$ m² $= ${fr(a2m)} \\times 10\\,000 = ${fr(a2m * M2)}$ cm²`);
  dit(2, `$2{,}5 \\times 80 = ${fr(2.5 * 80)}$`);
  dit(2, `Réponse : $${fr(a2m)}$ m², soit $${fr(a2cm)}$ cm².`);
  ombre(2, [[a2cm]]);

  // 3 — la moitié du rectangle
  const a3 = (9 * 4) / 2;
  dit(3, `$\\mathcal{A} = \\dfrac{9 \\times 4}{2} = \\dfrac{${9 * 4}}{2} = ${a3}$ cm²`);
  dit(3, `répondre $${9 * 4}$ cm²`);
  dit(3, `Réponse : $\\mathcal{A} = ${a3}$ cm².`);
  ombre(3, [[a3]]);

  // 4 — la hauteur, pas le côté
  const a4 = (12 * 4.5) / 2;
  const cote4 = racine(6 * 6 + 4.5 * 4.5);
  v.ok(`4. le côté penché mesure ${cote4} (Pythagore sur le dessin), plus que la hauteur`, proche(cote4, 7.5, 1e-9) && cote4 > 4.5);
  dit(4, `\\dfrac{12 \\times 4{,}5}{2} = \\dfrac{${fr(12 * 4.5)}}{2} = ${fr(a4)}$ cm²`);
  dit(4, `$\\dfrac{12 \\times 7{,}5}{2} = ${fr((12 * 7.5) / 2)}$ cm²`);
  dit(4, `Réponse : $\\mathcal{A} = ${fr(a4)}$ cm².`);
  ombre(4, [[a4]]);

  // 5 — la hauteur dehors : le grand triangle moins le petit
  const a5 = (5 * 6) / 2;
  const g5 = ((5 + 3) * 6) / 2, p5 = (3 * 6) / 2;
  v.ok(`5. ${g5} − ${p5} = ${a5}`, g5 - p5 === a5);
  dit(5, `$\\mathcal{A} = \\dfrac{EF \\times GK}{2} = \\dfrac{5 \\times 6}{2} = ${a5}$ cm²`);
  dit(5, `$\\dfrac{8 \\times 6}{2} = ${g5}$ cm²`);
  dit(5, `$\\dfrac{3 \\times 6}{2} = ${p5}$ cm²`);
  dit(5, `$${g5} - ${p5} = ${a5}$ cm²`);
  dit(5, `environ $${fr(arr(racine(3 * 3 + 6 * 6), 1), 1)}$ cm`);
  dit(5, `Réponse : $\\mathcal{A} = ${a5}$ cm².`);
  ombre(5, [[a5]]);

  // 6 — le rayon d'abord
  const r6 = 12 / 2;
  const a6 = r6 * r6 * PI_;
  dit(6, `$r = 12 \\div 2 = ${r6}$ cm`);
  dit(6, `$${r6 * r6}\\pi \\approx ${fr(arr(a6, 3), 3)}$, donc $\\mathcal{A} \\approx ${fr(arr(a6, 1), 1)}$ cm²`);
  v.ok(`6. ${a6.toFixed(3)} ÷ 144 = ${(a6 / 144).toFixed(3)} : un peu plus des trois quarts`, a6 / 144 > 0.75 && a6 / 144 < 0.8);
  dit(6, `$\\pi \\times d \\approx ${fr(arr(12 * PI_, 1), 1)}$`);
  dit(6, `$\\pi \\times 12^2 \\approx ${fr(arr(144 * PI_, 1), 1)}$ cm², quatre fois trop`);
  dit(6, `Réponse : $\\mathcal{A} = ${r6 * r6}\\pi \\approx ${fr(arr(a6, 1), 1)}$ cm².`);
  ombre(6, [[a6]]);

  // 7 — le carré d'un décimal
  const c7 = 1.5 * 1.5;
  const a7 = c7 * PI_;
  dit(7, `$\\mathcal{A} = \\pi \\times 1{,}5^2 = \\pi \\times ${fr(c7)} = ${fr(c7)}\\pi$ m²`);
  dit(7, `$${fr(c7)}\\pi \\approx ${fr(arr(a7, 4), 4)}$, donc $\\mathcal{A} \\approx ${fr(arr(a7, 2), 2)}$ m²`);
  dit(7, `$3\\pi \\approx ${fr(arr(3 * PI_, 2), 2)}$ m², un tiers de trop`);
  v.ok("7. 3 ÷ 2,25 = 4/3 : un tiers de trop", proche(3 / c7, 4 / 3));
  dit(7, `Réponse : $\\mathcal{A} = ${fr(c7)}\\pi \\approx ${fr(arr(a7, 2), 2)}$ m².`);
  ombre(7, [[a7]]);

  // 8 — ×3 sur les longueurs, ×9 sur l'aire
  const a8 = (2 * 6) / 2, b8 = (6 * 18) / 2, c8 = (1 * 3) / 2;
  v.ok(`8. ${a8}, ${b8}, ${c8} : rapports ${b8 / a8} et ${a8 / c8}`, b8 / a8 === 9 && a8 / c8 === 4);
  dit(8, `$\\mathcal{A} = \\dfrac{2 \\times 6}{2} = ${a8}$ cm²`);
  dit(8, `$\\dfrac{6 \\times 18}{2} = ${b8}$ cm². L'aire est multipliée par $${b8} \\div ${a8} = ${b8 / a8} = 3^2$`);
  dit(8, `$\\dfrac{1 \\times 3}{2} = ${fr(c8)}$ cm²`);
  dit(8, `répondre $${a8 * 3}$ cm²`);
  dit(8, `Réponse : $${a8}$ cm², puis $${b8}$ cm², puis $${fr(c8)}$ cm².`);
  ombre(8, [[a8, b8]]);

  v.titre("★★ Type devoir");

  // 9 — rectangle + triangle
  const a9 = [8 * 5, (8 * 3) / 2];
  dit(9, `$\\mathcal{A}_1 = 8 \\times 5 = ${a9[0]}$ cm²`);
  dit(9, `$\\mathcal{A}_2 = \\dfrac{8 \\times 3}{2} = ${a9[1]}$ cm²`);
  dit(9, `$\\mathcal{A} = ${a9[0]} + ${a9[1]} = ${a9[0] + a9[1]}$ cm²`);
  dit(9, `On trouverait $${a9[0] + 8 * 3}$ cm², l'aire du carré de $8$ cm`);
  v.ok("9. 40 + 24 = 64 = 8 × 8 : le carré qui entoure la figure", a9[0] + 8 * 3 === 8 * 8);
  dit(9, `Réponse : l'aire de la figure est $${a9[0] + a9[1]}$ cm².`);
  ombre(9, [a9]);

  // 10 — rectangle + demi-disque
  const d10 = (3 * 3 * PI_) / 2;
  const t10 = 60 + d10;
  dit(10, `$r = 6 \\div 2 = 3$ cm`);
  dit(10, `$\\mathcal{A}_2 = \\dfrac{\\pi \\times 3^2}{2} = \\dfrac{9\\pi}{2} = ${fr(9 / 2)}\\pi$ cm²`);
  dit(10, `À la calculatrice, $\\mathcal{A} \\approx ${fr(arr(t10, 2), 2)}$ cm²`);
  dit(10, `$\\dfrac{36\\pi}{2} \\approx ${fr(arr(18 * PI_, 1), 1)}$ cm²`);
  dit(10, `Réponse : $\\mathcal{A} = 60 + 4{,}5\\pi \\approx ${fr(arr(t10, 2), 2)}$ cm².`);
  ombre(10, [[10 * 6, d10]]);

  // 11 — la plaque moins le trou
  const trou11 = 2 * 2 * PI_;
  const a11 = 96 - trou11;
  v.ok(`11. 12 × 8 = ${12 * 8} ; trou ${trou11.toFixed(3)} : plus d'un huitième (${(trou11 / 96).toFixed(3)})`, 12 * 8 === 96 && trou11 / 96 > 1 / 8);
  dit(11, `$\\mathcal{A} = 96 - 4\\pi \\approx ${fr(arr(a11, 2), 2)}$ cm²`);
  dit(11, `environ $${fr(arr(trou11, 1), 1)}$ cm²`);
  dit(11, `$96 + 4\\pi \\approx ${fr(arr(96 + trou11, 2), 2)}$ cm²`);
  dit(11, `$96 - 16\\pi \\approx ${fr(arr(96 - 16 * PI_, 2), 2)}$ cm²`);
  dit(11, `Réponse : il reste $96 - 4\\pi \\approx ${fr(arr(a11, 2), 2)}$ cm² de métal.`);
  ombre(11, [[96, -trou11]]);

  // 12 — deux bases, une même aire
  const a12 = (9 * 12) / 2;
  const ah12 = (2 * a12) / 15;
  v.ok(`12. 9² + 12² = 15² (le triangle dessiné est bien rectangle)`, 9 * 9 + 12 * 12 === 15 * 15);
  dit(12, `$\\mathcal{A} = \\dfrac{AB \\times AC}{2} = \\dfrac{9 \\times 12}{2} = ${a12}$ cm²`);
  dit(12, `$15 \\times AH = ${2 * a12}$ et $AH = ${2 * a12} \\div 15 = ${fr(ah12)}$ cm`);
  v.ok(`12. AH = ${ah12} est plus court que 9 et 12`, ah12 < 9 && ah12 < 12);
  dit(12, `$\\dfrac{9 \\times 15}{2} = ${fr((9 * 15) / 2)}$ cm²`);
  dit(12, `Réponse : $\\mathcal{A} = ${a12}$ cm² et $AH = ${fr(ah12)}$ cm.`);
  ombre(12, [[a12]]);

  // 13 — l'échelle au carré
  const k13 = 200;
  const plan13 = 6 * 5;
  const reelCm13 = plan13 * k13 * k13;
  const reelM13 = reelCm13 / M2;
  const direct13 = ((6 * k13) / 100) * ((5 * k13) / 100);
  v.ok(`13. ${plan13} × ${k13}² = ${reelCm13} cm² = ${reelM13} m² ; par les longueurs ${direct13} m²`, reelM13 === direct13);
  dit(13, `$\\mathcal{A} = 6 \\times 5 = ${plan13}$ cm²`);
  dit(13, `$k^2 = 200^2 = ${fr(k13 * k13)}$`);
  dit(13, `$30 \\times 40\\,000 = ${fr(reelCm13)}$ cm²`);
  dit(13, `$${fr(reelCm13)} \\div 10\\,000 = ${reelM13}$ m²`);
  dit(13, `$12 \\times 10 = ${direct13}$ m²`);
  dit(13, `$30 \\times 200 = ${fr(plan13 * k13)}$ cm², soit $${fr((plan13 * k13) / M2)}$ m²`);
  dit(13, `Réponse : $${plan13}$ cm² sur le plan, une aire multipliée par $${fr(k13 * k13)}$, et $${reelM13}$ m² en vrai.`);
  ombre(13, [[plan13], [direct13]]);

  // 14 — de l'aire au rapport
  const q14 = 125 / 20;
  const k14 = racine(q14);
  v.ok(`14. 125 ÷ 20 = ${q14}, √ = ${k14}`, q14 === 6.25 && proche(k14, 2.5, 1e-12));
  dit(14, `$125 \\div 20 = ${fr(q14)}$`);
  dit(14, `$k = \\sqrt{${fr(q14)}} = ${fr(k14, 1)}$`);
  dit(14, `$5 \\times 2{,}5 = ${fr(5 * 2.5)}$ cm et $4 \\times 2{,}5 = ${fr(4 * 2.5)}$ cm`);
  dit(14, `$12{,}5 \\times 10 = ${12.5 * 10}$ cm²`);
  dit(14, `$${fr(5 * q14)}$ cm et $${fr(4 * q14)}$ cm, et l'aire $${fr(5 * q14 * 4 * q14)}$ cm²`);
  v.ok("14. l'aire du piège fait plus de six fois 125", (5 * q14 * 4 * q14) / 125 > 6);
  dit(14, `Réponse : l'aire est multipliée par $${fr(q14)}$, $k = ${fr(k14, 1)}$, et le rectangle agrandi mesure $${fr(5 * k14, 1)}$ cm sur $${fr(4 * k14)}$ cm.`);
  ombre(14, [[20, 125]]);

  // 15 — le trapèze découpé
  const a15 = [8 * 5, ((14 - 8) * 5) / 2];
  const penche15 = racine(6 * 6 + 5 * 5);
  dit(15, `$\\mathcal{A}_1 = 8 \\times 5 = ${a15[0]}$ m²`);
  dit(15, `$14 - 8 = ${14 - 8}$ m`);
  dit(15, `$\\mathcal{A}_2 = \\dfrac{6 \\times 5}{2} = ${a15[1]}$ m²`);
  dit(15, `$\\mathcal{A} = ${a15[0]} + ${a15[1]} = ${a15[0] + a15[1]}$ m²`);
  v.ok(`15. le côté penché dessiné mesure ${penche15.toFixed(3)} m : « environ 7,8 m »`, arr(penche15, 1) === 7.8);
  dit(15, `$\\dfrac{6 \\times 7{,}8}{2} = ${fr((6 * 7.8) / 2)}$ m²`);
  dit(15, `Réponse : la parcelle a une aire de $${a15[0] + a15[1]}$ m².`);
  ombre(15, [a15]);

  // 16 — l'anneau
  const R16 = 12 / 2, r16 = 1.5 / 2;
  const a16 = (R16 * R16 - r16 * r16) * PI_;
  const faux16 = (R16 - r16) ** 2 * PI_;
  dit(16, `$R = 12 \\div 2 = ${R16}$ cm et $r = 1{,}5 \\div 2 = ${fr(r16)}$ cm`);
  dit(16, `$\\pi \\times 0{,}75^2 = ${fr(r16 * r16)}\\pi$ cm²`);
  dit(16, `$\\mathcal{A} = 36\\pi - 0{,}5625\\pi = ${fr(R16 * R16 - r16 * r16)}\\pi \\approx ${fr(arr(a16, 2), 2)}$ cm²`);
  dit(16, `$\\pi \\times (6 - 0{,}75)^2 = ${fr((R16 - r16) ** 2)}\\pi \\approx ${fr(arr(faux16, 2), 2)}$ cm²`);
  dit(16, `Réponse : l'anneau a une aire de $${fr(R16 * R16 - r16 * r16)}\\pi \\approx ${fr(arr(a16, 2), 2)}$ cm².`);
  ombre(16, [[R16 * R16 * PI_, -r16 * r16 * PI_]]);

  v.titre("★★★ Problèmes");

  // 17 — le terrain, l'hectare, la forêt
  const a17 = 105 * 68;
  const ha17 = a17 / HA;
  const terrains17 = 20800 / ha17;
  const km17 = 20800 / (KM2 / HA);
  dit(17, `$\\mathcal{A} = 105 \\times 68 = ${fr(a17)}$ m²`);
  dit(17, `$${fr(a17)} \\div 10\\,000 = ${fr(ha17)}$ ha`);
  v.ok(`17. ${ha17} ha : moins d'un hectare, environ les trois quarts`, ha17 < 1 && Math.abs(ha17 - 0.75) < 0.05);
  v.ok("17. le carré d'un hectare : moins long (100 < 105), plus large (100 > 68)", 100 < 105 && 100 > 68);
  dit(17, `$20\\,800 \\div ${fr(ha17)} \\approx ${fr(Math.round(terrains17))}$, soit environ $${fr(Math.round(terrains17 / 1000) * 1000)}$ terrains`);
  dit(17, `soit $${fr(KM2)}$ m² $= ${fr(KM2 / HA)}$ ha`);
  dit(17, `$20\\,800 \\div 100 = ${km17}$ km²`);
  v.ok(`17. ${km17} km² ≈ deux fois Paris (105 km²)`, Math.round(km17 / 105) === 2);
  dit(17, `trouver $${fr(a17 / 100)}$ ha pour un seul terrain`);
  dit(17, `Réponse : $${fr(a17)}$ m², soit $${fr(ha17)}$ ha, moins d'un hectare ; la forêt brûlée représente environ $${fr(Math.round(terrains17 / 1000) * 1000)}$ terrains, soit $${km17}$ km².`);
  ombre(17, [[a17, 1 * HA]]);

  // 18 — les pizzas
  const p18 = 10 * 10 * PI_, g18 = 20 * 20 * PI_;
  dit(18, `$\\pi \\times 10^2 = 100\\pi \\approx ${Math.round(p18)}$ cm²`);
  dit(18, `$\\pi \\times 20^2 = 400\\pi \\approx ${fr(Math.round(g18))}$ cm²`);
  v.ok(`18. rapport des aires ${(g18 / p18).toFixed(6)} = 2²`, proche(g18 / p18, 4, 1e-9));
  dit(18, `$400\\pi \\div 100\\pi = ${Math.round(g18 / p18)}$ : l'aire est multipliée par $${Math.round(g18 / p18)}$.`);
  dit(18, `$4 \\times 9 = ${4 * 9}$ €`);
  dit(18, `$9 \\div 314 \\approx ${fr(arr(9 / Math.round(p18), 3), 3)}$ €`);
  dit(18, `$24 \\div 1\\,257 \\approx ${fr(arr(24 / Math.round(g18), 3), 3)}$ €`);
  dit(18, `deux petites ($${2 * 9}$ €)`);
  v.ok("18. deux petites = la moitié d'une grande", proche((2 * p18) / g18, 0.5));
  dit(18, `Réponse : environ $${Math.round(p18)}$ cm² et $${fr(Math.round(g18))}$ cm² ; l'aire est multipliée par $4$ ; il faut quatre petites pizzas ($${4 * 9}$ €)`);
  ombre(18, [[g18, p18]]);

  // 19 — le pignon
  const r19 = 6 * 2.5, t19 = (6 * 1.5) / 2, f19 = 1.2 * 1;
  const a19 = r19 + t19 - f19;
  const litres19 = (2 * a19) / 10;
  const pots19 = Math.ceil(litres19 / 2.5);
  dit(19, `$6 \\times 2{,}5 = ${fr(r19)}$ m²`);
  dit(19, `$\\dfrac{6 \\times 1{,}5}{2} = ${fr(t19)}$ m²`);
  dit(19, `$1{,}2 \\times 1 = ${fr(f19)}$ m²`);
  dit(19, `$\\mathcal{A} = 15 + 4{,}5 - 1{,}2 = ${fr(a19)}$ m².`);
  dit(19, `$2 \\times 18{,}3 = ${fr(2 * a19)}$ m²`);
  dit(19, `$36{,}6 \\div 10 = ${fr(litres19)}$ L`);
  dit(19, `$3{,}66 \\div 2{,}5 = ${fr(litres19 / 2.5)}$`);
  dit(19, `($${fr(6 * 1.5)}$ m² au lieu de $4{,}5$)`);
  dit(19, `Réponse : $${fr(a19)}$ m² à peindre, $${fr(litres19)}$ L de peinture, donc $${pots19}$ pots.`);
  ombre(19, [[r19, t19, -f19]]);

  // 20 — les panneaux solaires
  const pan20 = 1.7 * 1;
  const ter20 = 250 * 120;
  const n20 = Math.floor((0.4 * ter20) / pan20);
  const ter20b = 500 * 240;
  const n20b = Math.floor((0.4 * ter20b) / pan20);
  dit(20, `$\\mathcal{A} = 1{,}7 \\times 1 = ${fr(pan20)}$ m². En cm² : $1{,}7 \\times 10\\,000 = ${fr(pan20 * M2)}$ cm² (ou $170 \\times 100 = ${fr(170 * 100)}$ cm²)`);
  dit(20, `$250 \\times 120 = ${fr(ter20)}$ m², soit $30\\,000 \\div 10\\,000 = ${ter20 / HA}$ ha`);
  dit(20, `$0{,}4 \\times 30\\,000 = ${fr(0.4 * ter20)}$ m²`);
  dit(20, `$12\\,000 \\div 1{,}7 \\approx ${fr(arr((0.4 * ter20) / pan20, 1), 1)}$`);
  dit(20, `au maximum $${fr(n20)}$ panneaux`);
  dit(20, `$500 \\times 240 = ${fr(ter20b)}$ m², quatre fois plus`);
  v.ok(`20. ${ter20b} ÷ ${ter20} = ${ter20b / ter20} = 2²`, ter20b / ter20 === 4);
  dit(20, `$0{,}4 \\times 120\\,000 = ${fr(0.4 * ter20b)}$ m², et $48\\,000 \\div 1{,}7 \\approx ${fr(arr((0.4 * ter20b) / pan20, 1), 1)}$, soit $${fr(n20b)}$ panneaux au maximum`);
  dit(20, `Réponse : $1{,}7$ m² $= ${fr(pan20 * M2)}$ cm² par panneau ; $${ter20 / HA}$ ha ; au plus $${fr(n20)}$ panneaux, et $${fr(n20b)}$ sur le terrain`);
  ombre(20, [[ter20b, ter20]]);

  v.titre("Les dessins");
  const dessines = blocs.filter((b) => b.includes('plan("')).length;
  v.ok(`${dessines} corrigés dessinés sur 20`, dessines === 20);
}

lancer({
  nom: "LES AIRES · 3e · 20 exercices",
  fichier: "lib/fiches-exercices/maths-3e-aires.tsx",
  notionId: "aire_surface",
  classe: "3e",
  verifier,
  casses: [
    ["ex. 1 : ×100 au lieu de ×10 000", "a) $3 \\\\times 10\\\\,000 = 30\\\\,000$ cm².", "a) $3 \\\\times 100 = 300$ cm²."],
    ["ex. 2 : le tableau dessiné trop court", "[[0, 0], [250, 0], [250, 80], [0, 80]]", "[[0, 0], [200, 0], [200, 80], [0, 80]]"],
    ["ex. 3 : le ÷ 2 oublié", "Réponse : $\\\\mathcal{A} = 18$ cm².", "Réponse : $\\\\mathcal{A} = 36$ cm²."],
    ["ex. 4 : le côté penché pris pour la hauteur", "Réponse : $\\\\mathcal{A} = 27$ cm².", "Réponse : $\\\\mathcal{A} = 45$ cm²."],
    ["ex. 4 : la hauteur dessinée penchée", "haut: [[6, 4.5], [6, 0]]", "haut: [[6, 4.5], [4, 0]]"],
    ["ex. 5 : le sommet G dessiné trop bas", '{ poly: [[0, 0], [5, 0], [8, 6]], fond: "bleu" }', '{ poly: [[0, 0], [5, 0], [8, 5]], fond: "bleu" }'],
    ["ex. 6 : πd au lieu de πr²", "Réponse : $\\\\mathcal{A} = 36\\\\pi \\\\approx 113{,}1$ cm².", "Réponse : $\\\\mathcal{A} = 12\\\\pi \\\\approx 37{,}7$ cm²."],
    ["ex. 6 : le disque dessiné trop petit", '{ disque: [0, 0, 6], fond: "bleu" },\n            { trait: [[-6, -6]', '{ disque: [0, 0, 5], fond: "bleu" },\n            { trait: [[-6, -6]'],
    ["ex. 7 : 1,5² = 3", "$2{,}25\\\\pi \\\\approx 7{,}0686$, donc $\\\\mathcal{A} \\\\approx 7{,}07$ m²", "$3\\\\pi \\\\approx 9{,}4248$, donc $\\\\mathcal{A} \\\\approx 9{,}42$ m²"],
    ["ex. 8 : l'aire multipliée par 3", "Réponse : $6$ cm², puis $54$ cm², puis $1{,}5$ cm².", "Réponse : $6$ cm², puis $18$ cm², puis $3$ cm²."],
    ["ex. 9 : le toit sans ÷ 2", "$\\\\mathcal{A} = 40 + 12 = 52$ cm²", "$\\\\mathcal{A} = 40 + 24 = 64$ cm²"],
    ["ex. 10 : le demi-disque dessiné avec le diamètre pour rayon", "secteur: [10, 3, 3, -90, 90]", "secteur: [10, 3, 6, -90, 90]"],
    ["ex. 11 : le trou ajouté", "Réponse : il reste $96 - 4\\\\pi \\\\approx 83{,}43$ cm² de métal.", "Réponse : il reste $96 + 4\\\\pi \\\\approx 108{,}57$ cm² de métal."],
    ["ex. 11 : le trou dessiné plein", '{ disque: [8, 4, 2], fond: "trou" }', '{ disque: [8, 4, 2], fond: "bleu" }'],
    ["ex. 12 : l'hypoténuse prise pour hauteur", "Réponse : $\\\\mathcal{A} = 54$ cm² et $AH = 7{,}2$ cm.", "Réponse : $\\\\mathcal{A} = 67{,}5$ cm² et $AH = 9$ cm."],
    ["ex. 12 : le pied H au milieu de [BC]", "haut: [[0, 0], [5.76, 4.32]]", "haut: [[0, 0], [4.5, 6]]"],
    ["ex. 13 : l'aire multipliée par 200 seulement", "Réponse : $30$ cm² sur le plan, une aire multipliée par $40\\\\,000$, et $120$ m² en vrai.", "Réponse : $30$ cm² sur le plan, une aire multipliée par $200$, et $0{,}6$ m² en vrai."],
    ["ex. 14 : k = 6,25", "$k = \\\\sqrt{6{,}25} = 2{,}5$", "$k = 6{,}25$"],
    ["ex. 15 : le côté penché pris pour hauteur", "Réponse : la parcelle a une aire de $55$ m².", "Réponse : la parcelle a une aire de $63{,}4$ m²."],
    ["ex. 16 : les rayons soustraits avant le carré", "Réponse : l'anneau a une aire de $35{,}4375\\\\pi \\\\approx 111{,}33$ cm².", "Réponse : l'anneau a une aire de $27{,}5625\\\\pi \\\\approx 86{,}59$ cm²."],
    ["ex. 17 : ÷ 100 au lieu de ÷ 10 000", "Donc $7\\\\,140 \\\\div 10\\\\,000 = 0{,}714$ ha.", "Donc $7\\\\,140 \\\\div 100 = 71{,}4$ ha."],
    ["ex. 17 : le terrain dessiné carré", "[[0, 0], [105, 0], [105, 68], [0, 68]]", "[[0, 0], [105, 0], [105, 105], [0, 105]]"],
    ["ex. 18 : diamètre doublé = aire doublée", "$400\\\\pi \\\\div 100\\\\pi = 4$ : l'aire est multipliée par $4$.", "$400\\\\pi \\\\div 100\\\\pi = 2$ : l'aire est multipliée par $2$."],
    ["ex. 19 : la fenêtre pas enlevée", "$\\\\mathcal{A} = 15 + 4{,}5 - 1{,}2 = 18{,}3$ m².", "$\\\\mathcal{A} = 15 + 4{,}5 = 19{,}5$ m²."],
    ["ex. 19 : la fenêtre dessinée trop large", "[[1, 0.8], [2.2, 0.8], [2.2, 1.8], [1, 1.8]]", "[[1, 0.8], [2.6, 0.8], [2.6, 1.8], [1, 1.8]]"],
    ["ex. 20 : deux fois plus de panneaux", "soit $28\\\\,235$ panneaux au maximum", "soit $14\\\\,117$ panneaux au maximum"],
    ["un $ dans un dessin", 'label: "r = 1,5 m"', 'label: "$r = 1,5$ m"'],
    ["une micro d'une autre notion", 'micros: ["aire_comprendre"],\n        },\n        {\n          enonce: "Le triangle $ABC$ a une base', 'micros: ["pythagore_reciproque"],\n        },\n        {\n          enonce: "Le triangle $ABC$ a une base'],
  ],
});
