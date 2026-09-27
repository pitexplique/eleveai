// components/defis/SceneBD.tsx
//
// Le dessin d'une case des « Défis de Ti Margo » (27/09/2026) : le jardin, la
// feuille aux dix places, les coccinelles, et les deux amis.
//
// ⭐ Style validé par Frédéric sur les maquettes du 26/09 : « coloré, vivant,
// naïf, nature, respirant » — encre brune plutôt que noire, aplats francs.
// ⭐ Ti Margo est redessiné en SVG (et non le PNG officiel du cahier) parce qu'il
// doit RÉAGIR : sourire malicieux quand il pose la question, rire quand c'est
// juste, « hum ? » quand c'est faux. Mêmes traits que le PNG : vert à taches,
// ventre jaune, grands yeux bleus, queue en spirale, sac à dos bleu.
// ⭐ Pic est le paille-en-queue VALIDÉ le 27/09 d'après la photo de Frédéric
// (`public/personnages/pic/`) : ailes longues, petite tache noire à l'œil, bec
// orange, deux longs fils blancs.
//
// Les dessins sont des chaînes SVG assemblées : c'est le code même des
// maquettes que Frédéric a validées, repris sans le retraduire en JSX.

import type { Parleur, Scene } from "@/lib/defis-ti-margo/planches";

export type Humeur = "malin" | "joie" | "hum";

const K = "#3b2a1a";
const I = "#1f4d1f";
const V = "#7cc242";
const VF = "#3f8f2a";
const J = "#f2df6b";

function decor(ciel: string): string {
  let s = `<rect width="760" height="420" fill="${ciel}"/><circle cx="700" cy="60" r="34" fill="#ffd23f" stroke="${K}" stroke-width="4"/>`;
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5;
    s += `<line x1="${700 + Math.cos(a) * 44}" y1="${60 + Math.sin(a) * 44}" x2="${700 + Math.cos(a) * 58}" y2="${60 + Math.sin(a) * 58}" stroke="#ffb703" stroke-width="6" stroke-linecap="round"/>`;
  }
  s += `<path d="M0 300 Q180 230 380 290 T760 270 V420 H0Z" fill="#b7e4a0" stroke="${K}" stroke-width="4"/><path d="M0 350 Q220 310 420 350 T760 340 V420 H0Z" fill="#74c69d" stroke="${K}" stroke-width="4"/>`;
  for (const [x, y, c] of [[40, 385, "#ff595e"], [270, 398, "#ffca3a"], [560, 395, "#c77dff"]] as const) {
    s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 22}" stroke="#2d6a4f" stroke-width="4"/>`;
    for (let k = 0; k < 5; k++) {
      const a = k * 1.2566;
      s += `<circle cx="${x + Math.cos(a) * 8}" cy="${y + Math.sin(a) * 8}" r="7" fill="${c}" stroke="${K}" stroke-width="2"/>`;
    }
    s += `<circle cx="${x}" cy="${y}" r="5" fill="#ffd23f" stroke="${K}" stroke-width="2"/>`;
  }
  return s;
}

function margo(x: number, y: number, sc: number, h: Humeur): string {
  let s = `<g transform="translate(${x},${y}) scale(${sc}) rotate(${h === "hum" ? -6 : 0})" stroke="${I}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">`;
  s += `<path d="M28 150 q70 30 96 -20 q20 -46 -20 -58 q-34 -8 -34 22 q2 22 22 18" fill="none" stroke="${I}" stroke-width="30"/><path d="M28 150 q70 30 96 -20 q20 -46 -20 -58 q-34 -8 -34 22 q2 22 22 18" fill="none" stroke="${V}" stroke-width="22"/>`;
  s += `<path d="M-26 150 q-10 40 -30 58 h40 l10 -50z" fill="${V}"/><path d="M26 150 q14 40 30 58 h-38 l-12 -50z" fill="${V}"/>`;
  s += `<path d="M-44 70 q-12 60 8 96 q36 18 72 0 q20 -36 8 -96 q-44 -24 -88 0z" fill="${V}"/><path d="M-24 76 q-8 50 6 84 q18 8 36 0 q12 -34 4 -84 q-24 -10 -46 0z" fill="${J}"/>`;
  s += `<path d="M-40 76 q-6 40 2 70" fill="none" stroke="#1d4e89" stroke-width="10"/><path d="M40 76 q6 40 -2 70" fill="none" stroke="#1d4e89" stroke-width="10"/>`;
  const bras = (d: string) => `<path d="${d}" fill="none" stroke="${I}" stroke-width="18"/><path d="${d}" fill="none" stroke="${V}" stroke-width="11"/>`;
  s += h === "joie"
    ? bras("M-40 84 q-40 -20 -46 -64") + bras("M40 84 q40 -20 46 -64")
    : h === "hum"
      ? bras("M40 88 q34 10 20 -30") + bras("M-40 88 q-26 24 -20 50")
      : bras("M40 88 q40 -4 70 -24") + bras("M-40 88 q-26 24 -20 50");
  s += `<path d="M-64 10 q-10 -62 50 -74 q54 -8 74 30 q34 8 40 34 q4 34 -40 44 q-56 16 -104 -6 q-26 -10 -20 -28z" fill="${V}"/>`;
  ([[-40, -40], [-28, -54], [-8, -58], [-50, -18], [40, -30], [60, -12]] as const).forEach(([a, b], k) => {
    s += `<circle cx="${a}" cy="${b}" r="${k % 3 ? 4 : 6}" fill="${VF}" stroke="none"/>`;
  });
  const dx = h === "hum" ? 4 : 0, dy = h === "hum" ? -4 : 0;
  for (const [ex, ey] of [[-24, -40], [28, -44]] as const) {
    s += `<ellipse cx="${ex}" cy="${ey}" rx="22" ry="24" fill="${V}"/><ellipse cx="${ex}" cy="${ey}" rx="16" ry="18" fill="#fff"/><circle cx="${ex + 3 + dx}" cy="${ey + 2 + dy}" r="10" fill="#1d4e89"/><circle cx="${ex + 3 + dx}" cy="${ey + 2 + dy}" r="6" fill="#000"/><circle cx="${ex + 7 + dx}" cy="${ey - 3 + dy}" r="3.5" fill="#fff" stroke="none"/>`;
  }
  if (h === "hum") s += `<path d="M12 -76 q16 -12 34 -2" fill="none" stroke-width="5"/>`;
  s += h === "joie"
    ? `<path d="M-50 12 q60 60 130 4 q-60 14 -130 -4z" fill="#8c1c13"/><path d="M-20 26 q40 22 76 4 q-30 22 -76 -4z" fill="#ef6f6c" stroke="none"/>`
    : h === "hum"
      ? `<path d="M-30 18 q40 14 80 -2" fill="none"/>`
      : `<path d="M-44 10 q60 40 124 -6" fill="none"/>`;
  s += `<ellipse cx="-44" cy="0" rx="10" ry="6" fill="#ff8fa3" stroke="none" opacity=".55"/></g>`;
  if (h === "hum") s += `<text x="${x + 95 * sc}" y="${y - 70 * sc}" font-size="${50 * sc}" font-weight="700" fill="#7209b7" stroke="${I}" stroke-width="2" font-family="sans-serif">?</text>`;
  return s;
}

/** Pic sur sa branche : le dessin validé, posé tel quel. */
function pic(x: number, y: number, largeur: number): string {
  const hauteur = largeur * (170 / 345);
  return `<path d="M${x - 10} ${y + hauteur * 0.62} q${largeur * 0.55} -10 ${largeur + 20} 6" stroke="#8d5524" stroke-width="10" fill="none" stroke-linecap="round"/><image href="/personnages/pic/pic-pose-sans-branche.svg" x="${x}" y="${y}" width="${largeur}" height="${hauteur}"/>`;
}

function coccinelle(cx: number, cy: number, r: number): string {
  let s = `<g stroke="${K}" stroke-width="${r > 14 ? 3 : 2}"><circle cx="${cx}" cy="${cy - r * 0.75}" r="${r * 0.45}" fill="${K}"/><ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.85}" fill="#e63946"/><line x1="${cx}" y1="${cy - r * 0.7}" x2="${cx}" y2="${cy + r * 0.85}"/>`;
  for (const [a, b] of [[-0.45, -0.1], [0.45, -0.1], [-0.35, 0.45], [0.35, 0.45]] as const) {
    s += `<circle cx="${cx + a * r}" cy="${cy + b * r}" r="${r * 0.17}" fill="${K}" stroke="none"/>`;
  }
  return s + "</g>";
}

/** La feuille de la famille : deux rangées de cinq places — la « boîte de dix », en nature. */
const F = { x: 285, y: 205, w: 360 };
function place(k: number): [number, number] {
  const h = F.w * 0.42;
  const r = Math.floor(k / 5), c = k % 5;
  return [F.x + F.w * 0.18 + c * F.w * 0.16, F.y + h * 0.32 + r * h * 0.38];
}
function feuille(presents: number, opacite = 1, gouter = false): string {
  const h = F.w * 0.42;
  let s = `<g stroke="${K}" stroke-width="4" opacity="${opacite}"><path d="M${F.x} ${F.y + h / 2} q${F.w * 0.5} ${-h * 0.9} ${F.w} 0 q${-F.w * 0.5} ${h * 0.9} ${-F.w} 0z" fill="#95d5b2"/><path d="M${F.x + 6} ${F.y + h / 2} h${F.w - 12}" stroke="#52b788" stroke-width="3" fill="none"/>`;
  for (let k = 0; k < 10; k++) {
    const [cx, cy] = place(k);
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${F.w * 0.065}" ry="${F.w * 0.055}" fill="#d8f3dc" stroke-width="2" stroke-dasharray="4 3"/>`;
    if (k < presents) {
      s += coccinelle(cx, cy, F.w * 0.055);
      if (gouter) s += `<circle cx="${cx + 16}" cy="${cy - 12}" r="3.5" fill="#80b918" stroke="none"/><circle cx="${cx + 21}" cy="${cy - 5}" r="3" fill="#80b918" stroke="none"/>`;
    }
  }
  return s + "</g>";
}

/** Des feuilles tombées recouvrent les places à partir de `visibles` : on ne peut pas les compter. */
function feuillesTombees(visibles: number): string {
  let s = "";
  for (const [debut, fin] of [[Math.max(visibles, 0), 4], [Math.max(visibles, 5), 9]] as const) {
    if (debut > fin) continue;
    const [x0, y0] = place(debut), [x1] = place(fin);
    const cx = (x0 + x1) / 2, larg = x1 - x0 + 70;
    s += `<g stroke="${K}" stroke-width="4"><path d="M${cx - larg / 2} ${y0 + 4} q${larg / 2} -58 ${larg} -8 q-${larg / 2} 58 -${larg} 8z" fill="#f4a259" transform="rotate(-6 ${cx} ${y0})"/><path d="M${cx - larg / 2 + 10} ${y0 + 2} q${larg / 2} -6 ${larg - 20} -8" fill="none" stroke="#bc6c25" stroke-width="3" transform="rotate(-6 ${cx} ${y0})"/></g>`;
  }
  return s;
}

function egalite(gauche: string, droite: string): string {
  return feuille(0, 0.35) + `<text x="465" y="300" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="64" fill="${K}" stroke="#fff" stroke-width="8" paint-order="stroke">${gauche} = ${droite}</text>`;
}

const CIELS = ["#c9f0ff", "#e0f4ff", "#ffe8d6", "#fff0f6", "#e9ffe0", "#fdf0d5"];

export function SceneBD({ scene, qui, humeur, indice }: { scene: Scene; qui: Parleur; humeur: Humeur; indice: number }) {
  let s = decor(CIELS[indice % CIELS.length]);
  if (scene.type === "feuille") s += feuille(scene.presents, 1, scene.gouter);
  if (scene.type === "cachees") s += feuille(scene.visibles) + feuillesTombees(scene.visibles);
  if (scene.type === "egalite") s += egalite(scene.gauche, scene.droite);
  // Celui qui parle est devant, à gauche ; l'ami est là aussi, plus petit.
  // ⛔ Pic était d'abord en haut à droite : la bulle le cachait (vu le 27/09).
  if (qui === "margo") s += margo(118, 215, 0.6, humeur) + pic(612, 300, 140);
  else s += pic(0, 190, 270) + margo(705, 312, 0.34, humeur === "hum" ? "hum" : humeur === "joie" ? "joie" : "malin");
  return (
    <svg viewBox="0 0 760 420" className="block h-auto w-full" role="img" aria-label="Le jardin de la famille Coccinelle"
      dangerouslySetInnerHTML={{ __html: s }} />
  );
}
