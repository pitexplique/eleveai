// Énigmes à projeter — 5e, notion triangle_figure (somme des angles,
// inégalité triangulaire, triangles particuliers). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

// Triangle A(80 ; 320), B(400 ; 320), C(303,2 ; 54) : angles 50°, 70°, 60° au bon rapport.
const toit = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un triangle avec deux angles de 50 et 70 degrés, le troisième inconnu">
  <path d="M80 320 L400 320 L303.2 54 Z" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M130 320 A50 50 0 0 0 112.1 281.7" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <text x="140" y="305" fill="${C.bleu}" font-size="26">50°</text>
  <path d="M350 320 A50 50 0 0 1 382.9 273" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <text x="300" y="305" fill="${C.bleu}" font-size="26">70°</text>
  <text x="300" y="125" fill="${C.rose}" font-size="30" text-anchor="middle">?</text>
  <text x="80" y="350" fill="${C.craie}" font-size="22" text-anchor="middle">A</text>
  <text x="400" y="350" fill="${C.craie}" font-size="22" text-anchor="middle">B</text>
  <text x="303" y="40" fill="${C.craie}" font-size="22" text-anchor="middle">C</text>
  </svg>`;

// Trois lots de baguettes : 16 px par cm.
const lot = (y: number, n: string, l: number[], c: string) => {
  let x = 70, s = `<text x="30" y="${y + 8}" fill="${c}" font-size="24">${n}</text>`;
  for (const v of l) {
    s += `<path d="M${x} ${y} L${x + 16 * v} ${y}" stroke="${c}" stroke-width="8" stroke-linecap="round"/><text x="${x + 8 * v}" y="${y - 14}" fill="${C.craie}" font-size="18" text-anchor="middle">${v} cm</text>`;
    x += 16 * v + 14;
  }
  return s;
};
const baguettes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois lots de baguettes : 3, 4 et 9 cm ; 5, 6 et 10 cm ; 2, 3 et 5 cm">
  ${lot(100, "A", [3, 4, 9], C.bleu)}
  ${lot(210, "B", [5, 6, 10], C.jaune)}
  ${lot(320, "C", [2, 3, 5], C.rose)}
  </svg>`;

// Isocèle : sommet (240 ; 60), côtés égaux de 280 px, base à 70° de chaque côté.
const isocele = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un triangle isocèle : 40 degrés au sommet, les angles de la base inconnus">
  <path d="M240 60 L335.8 323.1 L144.2 323.1 Z" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M184.5 188.8 L199.5 194.2 M280.5 194.2 L295.5 188.8" stroke="${C.rose}" stroke-width="3"/>
  <path d="M227.7 93.8 A36 36 0 0 0 252.3 93.8" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <text x="240" y="140" fill="${C.jaune}" font-size="24" text-anchor="middle">40°</text>
  <text x="185" y="310" fill="${C.rose}" font-size="28">?</text>
  <text x="280" y="310" fill="${C.rose}" font-size="28">?</text>
  <text x="240" y="380" fill="${C.pale}" font-size="20" text-anchor="middle">deux côtés de même longueur</text>
  </svg>`;

// Panneau triangulaire équilatéral de côté 260.
const panneau = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un panneau de danger en forme de triangle équilatéral">
  <path d="M110 330 L370 330 L240 104.8 Z" fill="none" stroke="${C.rose}" stroke-width="14" stroke-linejoin="round"/>
  <text x="240" y="300" fill="${C.craie}" font-size="90" text-anchor="middle">!</text>
  <path d="M240 330 L240 400" stroke="${C.pale}" stroke-width="8"/>
  <text x="400" y="200" fill="${C.jaune}" font-size="30" text-anchor="middle">? °</text>
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un segment avec un angle droit à chaque bout : les deux côtés ne se rejoignent jamais">
  <path d="M100 320 L380 320" stroke="${C.craie}" stroke-width="4"/>
  <path d="M100 320 L100 80 M380 320 L380 80" stroke="${C.bleu}" stroke-width="4" stroke-dasharray="10 8"/>
  <path d="M100 300 L120 300 L120 320 M380 300 L360 300 L360 320" stroke="${C.craie}" stroke-width="2" fill="none"/>
  <text x="240" y="160" fill="${C.rose}" font-size="40" text-anchor="middle">?</text>
  <text x="240" y="370" fill="${C.pale}" font-size="22" text-anchor="middle">deux angles droits…</text>
  </svg>`;

// Triangle rectangle en B : A(80 ; 320), B(400 ; 320), C(400 ; 135,2) — angles 30°, 90°, 60°.
const defi = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un triangle dont les angles valent x, 2x et 3x">
  <path d="M80 320 L400 320 L400 135.2 Z" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <text x="150" y="308" fill="${C.bleu}" font-size="28">x</text>
  <text x="355" y="305" fill="${C.bleu}" font-size="28">3x</text>
  <text x="358" y="205" fill="${C.bleu}" font-size="28">2x</text>
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">le plus grand angle : ?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "triangle_figure",
  titre: "Énigmes sur les triangles",
  description: "Triangles en 5e : somme des angles, inégalité triangulaire avec des baguettes, triangle isocèle, panneau équilatéral, piège des deux angles droits, angles x, 2x et 3x. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · La charpente",
      titre: "Le troisième angle",
      question: `Un triangle a deux angles de <b>50°</b> et <b>70°</b>.<br><br><b>Combien mesure le troisième angle ?</b>`,
      reponse: `Les trois angles d'un triangle font 180°.<br>180 − 50 − 70 = <span class="big">60°</span>.`,
      consigne: "Combien mesure le troisième angle ?",
      verification: { type: "courte", attendus: ["60"], unite: "°" },
      dessin: toit(),
    },
    {
      tag: "Énigme 2 · Les baguettes",
      titre: "Le triangle possible",
      question: `Avec trois baguettes, on veut fermer un triangle.<br><br><b>Quel lot</b> permet de construire un triangle ?`,
      reponse: `Le plus grand côté doit être plus petit que la somme des deux autres.<br>A : 3 + 4 = 7 &lt; 9, non. C : 2 + 3 = 5, c'est plat. B : 5 + 6 = 11 &gt; 10, oui : <span class="big">le lot B</span>.`,
      consigne: "Quel lot permet de construire un triangle ?",
      verification: { type: "qcm", choix: ["A : 3, 4 et 9 cm", "B : 5, 6 et 10 cm", "C : 2, 3 et 5 cm"], bonne: 1 },
      dessin: baguettes(),
    },
    {
      tag: "Énigme 3 · Le triangle isocèle",
      titre: "Les angles de la base",
      question: `Un triangle est <b>isocèle</b>. L'angle au sommet mesure <b>40°</b>.<br><br><b>Combien mesure chaque angle de la base ?</b>`,
      reponse: `Les deux angles de la base sont égaux. Ensemble : 180 − 40 = 140°.<br>Chacun : 140 ÷ 2 = <span class="big">70°</span>.`,
      consigne: "Combien mesure chaque angle de la base ?",
      verification: { type: "courte", attendus: ["70"], unite: "°" },
      dessin: isocele(),
    },
    {
      tag: "Énigme 4 · Sur la route",
      titre: "Le panneau de danger",
      question: `Un panneau de danger est un triangle <b>équilatéral</b> : ses trois côtés sont égaux.<br><br><b>Combien mesure chacun de ses angles ?</b>`,
      reponse: `Ses trois angles sont égaux aussi. 180 ÷ 3 = <span class="big">60°</span>.`,
      consigne: "Combien mesure chaque angle du panneau ?",
      verification: { type: "courte", attendus: ["60"], unite: "°" },
      dessin: panneau(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Deux angles droits ?",
      sorte: "piege",
      question: `Mila dit : « Je peux tracer un triangle avec <b>deux angles droits</b>. »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! 90 + 90 = 180 : il ne resterait 0° pour le troisième angle.<br>Les deux côtés sont parallèles, ils ne se rejoignent jamais. Réponse : <span class="big">non</span>.`,
      consigne: "Un triangle peut-il avoir deux angles droits ?",
      verification: { type: "qcm", choix: ["Non", "Oui", "Oui, s'il est très grand"], bonne: 0 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "x, 2x et 3x",
      sorte: "defi",
      question: `Les angles d'un triangle mesurent <b>x</b>, <b>2x</b> et <b>3x</b>.<br><br><b>Combien mesure le plus grand angle ?</b>`,
      reponse: `x + 2x + 3x = 6x = 180, donc x = 30°.<br>Le plus grand : 3 × 30 = <span class="big">90°</span>. C'est un triangle rectangle !`,
      consigne: "Combien mesure le plus grand angle ?",
      verification: { type: "courte", attendus: ["90"], unite: "°" },
      dessin: defi(),
    },
  ],
};

export default problemes;
