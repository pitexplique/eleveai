// Énigmes à projeter — 5e, notion polygones_reguliers (périmètre, angle au
// centre, angles, axes de symétrie, pavages). 20/11/2026.
// ⚠️ Notion masquée en France (hors programme, micros-masquees.ts), gardée pour /pays.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const etiq = (x: number, y: number, t: string, c: string = C.craie, taille = 24) =>
  `<text x="${x}" y="${y}" fill="${c}" font-size="${taille}" text-anchor="middle">${t}</text>`;

// Les sommets d'un polygone régulier à n côtés, centre (cx ; cy), rayon r, départ a0 (degrés, sens horaire à l'écran).
const sommets = (n: number, cx: number, cy: number, r: number, a0: number) =>
  Array.from({ length: n }, (_, k) => {
    const a = ((a0 + (360 / n) * k) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
  });
const trace = (p: [number, number][]) => "M" + p.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L") + " Z";

const tomette = () => {
  const p = sommets(6, 240, 200, 140, 0);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une tomette en hexagone régulier de 5 cm de côté">
  <path d="${trace(p)}" fill="${C.rose}" fill-opacity=".2" stroke="${C.rose}" stroke-width="5" stroke-linejoin="round"/>
  ${etiq(240, 352, "5 cm", C.craie)}
  ${etiq(240, 210, "périmètre : ?", C.craie, 28)}
  ${etiq(240, 395, "6 côtés de même longueur", C.pale, 20)}
  </svg>`;
};

const pentagone = () => {
  const p = sommets(5, 240, 220, 150, -90);
  const [a, b] = [p[0], p[1]];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un pentagone régulier et son angle au centre">
  <path d="${trace(p)}" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M${a[0].toFixed(1)} ${a[1].toFixed(1)} L240 220 L${b[0].toFixed(1)} ${b[1].toFixed(1)}" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <circle cx="240" cy="220" r="6" fill="${C.craie}"/>
  <path d="M240 175 A45 45 0 0 1 282.8 206.1" stroke="${C.rose}" stroke-width="3" fill="none"/>
  ${etiq(285, 180, "?", C.rose, 30)}
  ${etiq(240, 410, "l'angle au centre", C.pale, 20)}
  </svg>`;
};

// Alvéoles : hexagones de côté 50, pointe en haut.
const ruche = () => {
  let s = "";
  const h = 50 * Math.sqrt(3);
  for (let l = 0; l < 3; l++) for (let k = 0; k < 4; k++) {
    const cx = 105 + h * k + (l % 2 ? h / 2 : 0), cy = 110 + 75 * l;
    s += `<path d="${trace(sommets(6, cx, cy, 50, -90))}" fill="${C.jaune}" fill-opacity="${l === 1 && k === 1 ? 0.45 : 0.15}" stroke="${C.jaune}" stroke-width="3" stroke-linejoin="round"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Des alvéoles de ruche en hexagones réguliers">
  ${s}
  ${etiq(240, 390, "angle d'une alvéole : ?", C.rose, 26)}
  </svg>`;
};

const stop = () => {
  const p = sommets(8, 240, 200, 150, 22.5);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un panneau stop en octogone régulier">
  <path d="${trace(p)}" fill="${C.rose}" fill-opacity=".35" stroke="${C.rose}" stroke-width="6" stroke-linejoin="round"/>
  ${etiq(240, 222, "STOP", C.craie, 64)}
  <path d="M240 350 L240 410" stroke="${C.pale}" stroke-width="10"/>
  </svg>`;
};

const losange = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un losange aux quatre côtés égaux">
  <path d="M240 70 L360 210 L240 350 L120 210 Z" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M293.2 145.9 L306.8 134.1 M173.2 134.1 L186.8 145.9 M173.2 285.9 L186.8 274.1 M293.2 274.1 L306.8 285.9" stroke="${C.rose}" stroke-width="3"/>
  ${etiq(240, 40, "« 4 côtés égaux : il est régulier ! »", C.rose, 24)}
  ${etiq(240, 395, "4 côtés de même longueur", C.pale, 20)}
  </svg>`;

// Trois pentagones réguliers autour d'un même sommet V (240 ; 230), côté 90 : il reste un trou de 36°.
const pavage = () => {
  const V: [number, number] = [240, 230];
  const penta = (a0: number) => {
    const p: [number, number][] = [V];
    let [x, y] = V, d = a0;
    for (let i = 0; i < 4; i++) {
      x += 90 * Math.cos((d * Math.PI) / 180);
      y -= 90 * Math.sin((d * Math.PI) / 180);
      p.push([x, y]);
      d += 72;
    }
    return trace(p);
  };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois pentagones réguliers autour d'un sommet laissent un trou">
  <path d="${penta(0)}" fill="${C.rose}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="${penta(108)}" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="${penta(216)}" fill="${C.bleu}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  ${etiq(400, 258, "un trou !", C.rose, 26)}
  ${etiq(240, 400, "carré ? hexagone ? pentagone ?", C.pale, 20)}
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "polygones_reguliers",
  titre: "Énigmes sur les polygones réguliers",
  description: "Polygones réguliers : tomette hexagonale, angle au centre du pentagone, alvéoles de la ruche, axes du panneau stop, piège du losange, quels polygones pavent le sol. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Le carrelage",
      titre: "La tomette hexagonale",
      question: `Une tomette est un <b>hexagone régulier</b> de <b>5 cm</b> de côté.<br><br><b>Quel est son périmètre ?</b>`,
      reponse: `Un hexagone a 6 côtés, tous égaux.<br>6 × 5 = <span class="big">30 cm</span>.`,
      consigne: "Quel est le périmètre de la tomette, en cm ?",
      verification: { type: "courte", attendus: ["30"], unite: "cm" },
      dessin: tomette(),
    },
    {
      tag: "Énigme 2 · L'angle au centre",
      titre: "Le pentagone",
      question: `On relie le centre d'un <b>pentagone régulier</b> à deux sommets voisins.<br><br><b>Combien mesure l'angle au centre ?</b>`,
      reponse: `Les 5 angles au centre se partagent le tour complet : 360°.<br>360 ÷ 5 = <span class="big">72°</span>.`,
      consigne: "Combien mesure l'angle au centre du pentagone régulier ?",
      verification: { type: "courte", attendus: ["72"], unite: "°" },
      dessin: pentagone(),
    },
    {
      tag: "Énigme 3 · Dans la ruche",
      titre: "L'angle de l'alvéole",
      question: `Les alvéoles d'une ruche sont des <b>hexagones réguliers</b>.<br>Trois alvéoles se touchent en un même sommet, sans trou.<br><br><b>Combien mesure un angle</b> d'une alvéole ?`,
      reponse: `Autour du sommet, les 3 angles font un tour complet : 360°.<br>360 ÷ 3 = <span class="big">120°</span>.`,
      consigne: "Combien mesure un angle d'un hexagone régulier ?",
      verification: { type: "qcm", choix: ["60°", "90°", "120°"], bonne: 2 },
      dessin: ruche(),
    },
    {
      tag: "Énigme 4 · Sur la route",
      titre: "Le panneau stop",
      question: `Le panneau stop est un <b>octogone régulier</b> (8 côtés égaux).<br>On oublie les lettres.<br><br><b>Combien a-t-il d'axes de symétrie ?</b>`,
      reponse: `Un polygone régulier à n côtés a n axes de symétrie : 4 passent par des sommets, 4 par des milieux de côtés.<br>Il en a <span class="big">8</span>.`,
      consigne: "Combien d'axes de symétrie a un octogone régulier ?",
      verification: { type: "courte", attendus: ["8"], unite: "axes" },
      dessin: stop(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le losange régulier ?",
      sorte: "piege",
      question: `Un losange a ses <b>4 côtés égaux</b>.<br>Rose dit : « C'est donc un polygone régulier. »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! Un polygone régulier a ses côtés égaux <b>et</b> ses angles égaux.<br>Ici, les angles ne sont pas tous égaux. Le seul losange régulier, c'est le <span class="big">carré</span>.`,
      consigne: "Ce losange est-il un polygone régulier ?",
      verification: { type: "qcm", choix: ["Non : ses angles ne sont pas tous égaux", "Oui", "Oui, s'il est grand"], bonne: 0 },
      dessin: losange(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Paver le sol",
      sorte: "defi",
      question: `On veut couvrir un sol avec un seul polygone régulier, sans trou ni chevauchement.<br><br><b>Lequel ne marche pas</b> : l'hexagone, le carré ou le pentagone ?`,
      reponse: `Il faut que les angles fassent 360° autour d'un sommet. Carré : 4 × 90°. Hexagone : 3 × 120°.<br>Pentagone : 108°, et 3 × 108 = 324° : il reste un trou. C'est <span class="big">le pentagone</span>.`,
      consigne: "Quel polygone régulier ne pave pas le sol ?",
      verification: { type: "qcm", choix: ["L'hexagone", "Le carré", "Le pentagone"], bonne: 2 },
      dessin: pavage(),
    },
  ],
};

export default problemes;
