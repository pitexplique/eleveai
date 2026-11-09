// Le son de Saphir, entièrement calculé ici (aucun droit à payer) :
// vent du Grand Nord, patins dans la neige, clochette du chien de tête, halètement des chiens, cœur, souffle, boîte à musique.
// son = { vitesse: [une valeur par 1/12 s], vent: [[t, niveau]...], coeur: [[a, b]...], souffles: [t...], notes: [[t, midi, force]...] }
import { writeFileSync } from 'node:fs';

const TAUX = 44100;

// repliques = [[début, durée]...] : le fond (vent, clochette, chiens) s'efface pendant que le vieil homme parle.
export function fabriquerSonSaphir(chemin, duree, son = {}, repliques = []) {
  const { vitesse = [], vent = [[0, 1]], coeur = [], souffles = [], notes = [] } = son;
  const n = Math.round(duree * TAUX), g = new Float32Array(n), d = new Float32Array(n);
  let graine = 2026; const hasard = () => ((graine = (graine * 16807) % 2147483647) / 2147483647) * 2 - 1;
  const ss = (a, b, x) => { x = Math.max(0, Math.min(1, (x - a) / (b - a))); return x * x * (3 - 2 * x); };
  const courbe = (pts, t) => { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; return va + (vb - va) * ss(a, b, t); } return pts.at(-1)[1]; };
  const vit = t => { const k = t * 12, i = Math.floor(k), u = k - i; return ((vitesse[i] ?? 0) * (1 - u) + (vitesse[i + 1] ?? 0) * u); };

  /* Vent et patins */
  let a1 = 0, a2 = 0, c1 = 0, c2 = 0, crisse = 0;
  for (let i = 0; i < n; i++) {
    const t = i / TAUX, b = hasard();
    const ouv = .01 + .011 * (1 + Math.sin(t * .53) * Math.sin(t * .17 + 1)); a1 += ouv * (b - a1); a2 += .5 * ouv * (a1 - a2);
    const nv = courbe(vent, t) * (.7 + .45 * Math.sin(t * .41 + 2) * Math.sin(t * .13));
    const w = a2 * 4 * nv * .42;
    /* patins : bruit aigu, granuleux, proportionnel à la vitesse */
    const v = Math.min(1.3, vit(t)); c1 += .45 * (b - c1); c2 += .08 * (c1 - c2);
    if (hasard() > .9985) crisse = 1; crisse *= .9993;
    const p = (c1 - c2) * v * (.09 + .07 * crisse) * (.8 + .2 * Math.sin(t * 7.1));
    g[i] += w * (1 + .15 * Math.sin(t * .29)) + p * .9; d[i] += w * (1 - .15 * Math.sin(t * .29)) + p;
  }
  /* Clochette : un coup à chaque foulée du chien de tête quand l'attelage avance */
  let prochain = 0;
  for (let t0 = 0; t0 < duree; t0 += 1 / 120) {
    const v = vit(t0); if (v < .25 || t0 < prochain) continue;
    prochain = t0 + .95 / Math.min(1.2, v + .3);
    const force = Math.min(1, v) * .05, i0 = Math.round(t0 * TAUX);
    for (let j = 0; j < 1.6 * TAUX && i0 + j < n; j++) { const t = j / TAUX, e = Math.exp(-t * 4.2) * Math.min(1, t * 900) * force;
      const s = (Math.sin(6.2832 * 2093 * t) + .5 * Math.sin(6.2832 * 3140 * t) * Math.exp(-t * 3) + .25 * Math.sin(6.2832 * 5230 * t) * Math.exp(-t * 8)) * e; g[i0 + j] += s * .8; d[i0 + j] += s; }
  }
  /* Halètement : petits souffles rapides quand les chiens avancent, plus lents à l'arrêt (chiens: false = aucun, épisode 2 dans la cabane) */
  if (son.chiens !== false) for (let t0 = 0; t0 < duree; t0 += .33) {
    const v = vit(t0), f = .006 + .012 * Math.min(1, v); if (v < .05 && (Math.floor(t0 / .33) % 3)) continue;
    const i0 = Math.round(t0 * TAUX); let x = 0;
    for (let j = 0; j < .16 * TAUX && i0 + j < n; j++) { const t = j / TAUX; x += .25 * (hasard() - x); const e = Math.sin(Math.PI * t / .16) ** 2 * f; g[i0 + j] += x * e * 1.2; d[i0 + j] += x * e * .8; }
  }
  /* Le cœur du vieil homme */
  for (const [a, b] of coeur) for (let t0 = a; t0 < b; t0 += 1.05) for (const [dt, f] of [[0, 1], [.24, .7]]) {
    const k = ss(a, a + 3, t0) * (1 - ss(b - 3, b, t0)), i0 = Math.round((t0 + dt) * TAUX);
    for (let j = 0; j < .25 * TAUX && i0 + j < n; j++) { const t = j / TAUX, e = Math.exp(-t * 22) * Math.min(1, t * 400) * .32 * f * k, s = Math.sin(6.2832 * (48 - t * 40) * t) * e; g[i0 + j] += s; d[i0 + j] += s; }
  }
  /* Le souffle de la petite fille */
  for (const t0 of souffles) { const i0 = Math.round(t0 * TAUX); let x = 0;
    for (let j = 0; j < 1.1 * TAUX && i0 + j < n; j++) { const t = j / TAUX; x += .12 * (hasard() - x); const e = Math.sin(Math.PI * t / 1.1) ** 2 * .1; g[i0 + j] += x * e; d[i0 + j] += x * e; } }
  /* Boîte à musique : mélodie originale, très lente */
  for (const [t0, m, force = 1] of notes) {
    const f = 440 * 2 ** ((m - 69) / 12), i0 = Math.round(t0 * TAUX);
    for (let j = 0; j < 3.2 * TAUX && i0 + j < n; j++) { const t = j / TAUX, e = Math.exp(-t * 1.9) * Math.min(1, t * 300) * .06 * force;
      const s = (Math.sin(6.2832 * f * t) + .3 * Math.sin(6.2832 * f * 2.01 * t) * Math.exp(-t * 3) + .12 * Math.sin(6.2832 * f * 4.2 * t) * Math.exp(-t * 7)) * e; g[i0 + j] += s * (m % 2 ? 1 : .8); d[i0 + j] += s * (m % 2 ? .8 : 1); }
  }
  /* Dans la cabane (épisode 2) : feu de bois, crayon sur le papier, pas sur le plancher, petits chocs de bois */
  const { feu = null, crayon = [], pas = [], toc = [], respire = [] } = son;
  if (feu) { let r1 = 0, r2 = 0, pop = 0;
    for (let i = 0; i < n; i++) { const t = i / TAUX, b = hasard(), nv = courbe(feu, t);
      r1 += .02 * (b - r1); r2 += .02 * (r1 - r2);
      if (hasard() > .99965) pop = .5 + .5 * Math.abs(hasard()); pop *= .992;
      const s = r2 * 3 * nv * .5 + (b * pop) * nv * .16; g[i] += s * 1.05; d[i] += s * .9; } }
  for (const [a, b] of crayon) { let c1 = 0, c2 = 0;
    for (let i = Math.round(a * TAUX); i < Math.min(n, b * TAUX); i++) { const t = i / TAUX; c1 += .5 * (hasard() - c1); c2 += .12 * (c1 - c2);
      const e = ss(a, a + .3, t) * (1 - ss(b - .3, b, t)) * (.55 + .45 * Math.abs(Math.sin(t * 11.3) * Math.sin(t * 3.1 + 1))) * .05; g[i] += (c1 - c2) * e; d[i] += (c1 - c2) * e * .8; } }
  for (const [t0, f = 1] of pas.map(x => [].concat(x))) { const i0 = Math.round(t0 * TAUX);
    for (let j = 0; j < .18 * TAUX && i0 + j < n; j++) { const t = j / TAUX, e = Math.exp(-t * 30) * Math.min(1, t * 600) * .09 * f, s = Math.sin(6.2832 * (75 - t * 60) * t) * e + hasard() * e * .15; g[i0 + j] += s; d[i0 + j] += s; } }
  for (const [t0, f = 1] of toc.map(x => [].concat(x))) { const i0 = Math.round(t0 * TAUX);
    for (let j = 0; j < .3 * TAUX && i0 + j < n; j++) { const t = j / TAUX, e = Math.exp(-t * 26) * Math.min(1, t * 900) * .1 * f, s = (Math.sin(6.2832 * 310 * t) + .4 * Math.sin(6.2832 * 720 * t) * Math.exp(-t * 40)) * e; g[i0 + j] += s; d[i0 + j] += s * .9; } }
  /* respiration lente (le chien endormi, la petite) : [début, fin, période] */
  for (const [a, b, per = 3.2] of respire) { let x = 0;
    for (let i = Math.round(a * TAUX); i < Math.min(n, b * TAUX); i++) { const t = i / TAUX; x += .08 * (hasard() - x); const e = Math.sin(Math.PI * ((t - a) % per) / per) ** 4 * .05 * ss(a, a + 1, t) * (1 - ss(b - 1, b, t)); g[i] += x * e; d[i] += x * e; } }
  /* Grand espace : quelques échos lointains (echos: false dans la cabane) */
  if (son.echos !== false) for (const [r, a] of [[.23, .25], [.41, .17], [.67, .1]]) { const k = Math.round(r * TAUX); for (let i = n - 1; i >= k; i--) { g[i] += d[i - k] * a * .5; d[i] += g[i - k] * a * .5; } }
  /* Sous les répliques : le fond descend à 30 % (-10 dB), avec 0,4 s d'entrée et de sortie */
  for (const [t0, dt] of repliques) { const a = Math.max(0, Math.round((t0 - .6) * TAUX)), b = Math.min(n, Math.round((t0 + dt + .8) * TAUX));
    for (let i = a; i < b; i++) { const t = i / TAUX, k = ss(t0 - .6, t0 - .2, t) * (1 - ss(t0 + dt + .4, t0 + dt + .8, t)), f = 1 - .7 * k; g[i] *= f; d[i] *= f; } }
  let max = 0; for (let i = 0; i < n; i++) max = Math.max(max, Math.abs(g[i]), Math.abs(d[i]));
  const fois = .8 / max;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(TAUX, 24); buf.writeUInt32LE(TAUX * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) { buf.writeInt16LE(Math.round(g[i] * fois * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(d[i] * fois * 32767), 46 + i * 4); }
  writeFileSync(chemin, buf);
}
